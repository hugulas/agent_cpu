## 主线一子章节 1：微观问题：Kernel Launch Tax

父章节：`5. 主线一：算子下发为什么从 launch overhead 变成调度墙`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| launch tax 在小模型、量化模型和动态 serving 中会从背景噪声变成关键路径 | S005 (CPU slowdown); S038 (vLLM V1); S039 (CUDA Graphs); S040 (Event Tensor) | `19x` dequeue amplification；`1.7x` throughput；graph capture / dynamic megakernel 图 |
| CPU slowdown 不是局部噪声，而会沿多 GPU 同步链被放大 | S005 (CPU slowdown) | `2603.22774_summary.png`、`2603.22774_sync-barrier.png` |
| 图化与 persistent runtime 的价值，来自减少反复的 host 提交动作，而不是单纯“编译更快” | S038 (vLLM V1); S039 (CUDA Graphs); S040 (Event Tensor) | `piecewise CUDA graphs`、`FULL_AND_PIECEWISE`、`dynamic megakernels` |

### 1. 本章核心判断

在很多人仍把推理瓶颈理解成“矩阵算不够快”时，最新一批 serving 证据已经表明：  
**对小模型、量化模型和高度动态的批次来说，host-side kernel launch tax 已足以进入关键路径。** 这个判断并不是来自抽象直觉，而是已经被多 GPU slowdown 研究和 serving runtime 重构材料共同支撑：前者证明 host 侧微小抖动可以被同步链放大，后者证明减少 host 提交动作本身就能给系统带来可观收益。[1][2][3][4]

换句话说，dispatch 问题不是“有一点额外开销”，而是会在某些工作负载下决定单 token 时间预算。

### 2. 为什么小模型和量化模型反而更容易暴露 launch tax

这个结论看起来反直觉，因为很多人会以为模型越大、越复杂，CPU 越容易跟不上。  
但真正的情况恰好相反：

1. **模型越小，单次 GPU 计算时间越短**
   - 当一次 kernel 的有效计算时间缩短时，固定的 host 提交开销占比自然上升。

2. **量化越激进，越可能把原本的内存墙部分移开**
   - 一旦更多权重或中间状态能够驻留在更近的层级中，GPU 端的等待减少，CPU 端提交反而更显眼。

3. **动态 batch 会让同样的调度动作反复发生**
   - 服务化推理不是一次性批处理，而是持续进入、持续退出、持续切换的状态机。
   - 这意味着 host-side 的固定动作不是只做一次，而是持续做很多次。

因此，launch tax 的根源并不神秘：  
**它来自固定控制动作与越来越短的 GPU 执行片段之间的比例失衡。** vLLM V1 把 persistent batch、piecewise CUDA graphs 和 prefix cache 等几件事同时推进，公开给出最高 `1.7x` 的 throughput 提升，本身就说明 host-side 调度和提交动作已经足够重，重构 runtime 可以直接改写系统结果，而不是只带来边角优化。[2]

### 3. 关键证据：为什么这个问题已经不是“感觉上的慢”

现有材料给出的最强信号主要来自两类。

#### 3.1 量化小模型的工程实测

工程 runtime 材料已经开始把“减少 host 发射次数”当成一等优化目标。vLLM V1 不是只优化某个 kernel，而是同时引入 persistent batch、zero-overhead prefix caching 和 piecewise CUDA graphs；Event Tensor 则更进一步，把动态 serving 过程压成 dynamic megakernels，从 runtime 结构上减少 host 不断发射细粒度工作项的需求。[2][4] 这类结果的重要性不在于某一张卡的绝对分数，而在于它们共同表明：

- dispatch 不是可以忽略的固定背景
- 它会在结构上限制系统

#### 3.2 CPU slowdown 论文的多 GPU 诊断

另一类证据更关键：它把“launch tax”从单机微观问题推进成了多 GPU 系统问题。  
因为一旦 CPU 线程抖动、排队或被抢占，launch 和队列延迟就会通过同步点放大。`Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference` 给出的直接信号是：仅仅是 dequeue 延迟，就可能被同步链放大到约 `19x`，而系统退化的成因常常不是 GPU 算不满，而是 host 侧没有及时把下一阶段工作送上去。[1]
这说明 launch tax 不是孤立税费，而是会与：

- queue
- broadcast
- synchronization

一同组成更长的 host-side 关键路径。

### 图 1：CPU slowdown 为什么会被同步链放大

![CPU slowdown summary](../assets/subchapters/01/kernel-launch-cpu-slowdown-summary.png)

图 1 对本节最重要的价值，不是证明“CPU 很忙”，而是说明 host 侧的排队、同步和发射延迟会被多 GPU 协同结构放大，因此 launch tax 很容易从微观开销演化成端到端 slowdown。[1]

### 4. 为什么 `CPU-induced slowdown` 是底层因果，而不是局部噪声

如果只把 CPU 慢看成“偶尔线程调度不好”，那就会低估这个问题。  
它真正危险的地方在于：

1. **它会被同步点放大**
   - 某一 rank 的 host 线程慢一点，不会只影响这一 rank，而会拖住整组协同计算。

2. **它会隐藏在 GPU 利用率指标后面**
   - GPU 低利用不一定说明 GPU 算得慢，也可能是 CPU 没来得及把下一步工作送上去。

3. **它会和服务栈额外开销叠加**
   - HTTP、scheduler、input prep、metadata handling 看起来都不是“计算”，但它们会一起吃掉 token 时间预算。

因此，把 `CPU-induced slowdown` 看成“噪声”是不对的。更准确的说法是：

> 它是 dispatch tax 在多线程、多 GPU、多队列系统里的放大器。[1]

### 5. 为什么这对 agentic workload 特别关键

agentic inference 让这个问题更糟，原因是它比普通 chat 更容易出现：

- 更短但更多的执行片段
- 更频繁的阶段切换
- 更高的状态管理动作密度
- 更不稳定的 batch shape

这些因素共同带来的效果是：  
即便 GPU 端单次计算不重，CPU 侧固定动作也会被重复执行到足以主导整体延迟。也正因如此，后续工业界优化才会集中到 persistent batch、piecewise/full graph capture 和更轻的 runtime path 上；否则单纯优化 GPU kernel，很难消掉这类由阶段切换和频繁发射动作累积出来的 host-side 税负。[2][3][4]

### 6. 这对后续优化意味着什么

如果问题本质是“固定控制动作占比过高”，那么优化方向自然会落到：

- kernel fusion
- persistent batch
- piecewise/full graph capture
- persistent kernels
- 更轻的 scheduler / input path

也就是说，这个子章节和后面两个问题直接相连：

- 为什么要做 graphification
- 为什么不能只盯 GPU kernel，而要重构 runtime

vLLM 的 CUDA Graphs 设计文档把这种取舍说得很清楚：服务化推理里并不是“能 capture 就全 capture”，而是在 `FULL_AND_PIECEWISE`、`FULL_DECODE_ONLY` 等模式间折中，因为完整图化虽然能显著压低 host launch 开销，但会带来 capture memory、warmup 和 dynamic fallback 的额外成本。[3] Event Tensor 则表明，另一条路线是把动态调度逻辑直接搬进 GPU runtime，通过 event-driven 的最小 host runtime 来进一步削弱 CPU 反复参与每个细粒度步骤的必要性。[4]

### 图 2：图化 runtime 为什么能直接缓解 host launch tax

![vLLM CUDA graphs modes](../assets/subchapters/01/vllm-cuda-graphs-modes.png)

图 2 说明服务化推理中的图化不是单一开关，而是多种 capture 粒度之间的折中。它支持本节的关键判断：当 host 提交已经进入关键路径时，系统会主动牺牲一部分灵活性和内存预算来减少每步 launch 动作。[3]

### 7. 小结

本节真正想说明的是：

> `Kernel Launch Tax` 不是一个孤立的低层细节，而是 agentic serving 中 CPU 进入关键路径的最直接微观入口。

当模型更轻、批次更动态、阶段更碎时，固定的 host-side 提交成本就会系统性抬高，进而把“launch overhead”演化成“调度墙”的第一块砖。`19x` 的 dequeue amplification、`1.7x` 的 runtime 重构收益，以及图化/megakernel 路线对 host runtime 的系统性压缩，共同说明这个问题已经不只是“微优化”，而是 agentic inference 时代 AI CPU 设计与 serving runtime 设计共同面对的微观起点。[1][2][3][4]

### 参考文献

[1] Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference. 2026-03-25.

[2] vLLM V1: A Major Upgrade with 1.7x Speedup. 2025-01-27.

[3] vLLM CUDA Graphs Design Document. current.

[4] Event Tensor: Dynamic Megakernels for LLM Serving. 2026-04.

## 主线一子章节 2：宏观问题：状态驱动调度链

父章节：`5. 主线一：算子下发为什么从 launch overhead 变成调度墙`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 调度墙来自一整条 host-side 状态链，而不是单个 launch | S005 (CPU slowdown); S021 (PD disaggregation); S024 (Hidden bottlenecks) | `12ms -> 228ms` dequeue amplification；PD 分离结构图；hidden bottlenecks 图 |
| queue、worker selection、handoff、synchronization 会顺序放大彼此抖动 | S005 (CPU slowdown); S021 (PD disaggregation) | `2603.22774_sync-barrier.png`；`s021-prefill-decode-disaggregation_page_0002-2.png` |
| agentic workload 会把状态切换密度推高，因此更容易把 CPU 推到关键路径 | S021 (PD disaggregation); S024 (Hidden bottlenecks) | prefill compute-bound / decode memory-bound；额外 scheduling、KV management、streaming 开销 |

### 1. 本章核心判断

在 agentic inference 中，真正进入关键路径的常常不是单个 kernel launch，而是 **GPU 开始有效计算之前的一整条 host-side 状态驱动调度链**。这条链至少包括 `request ingress -> queueing -> worker selection -> broadcast / handoff -> synchronization -> state transition -> transfer / prefetch trigger`。只要这条链中的任一环节出现抖动，尾部同步点就会把前面“只慢一点”的控制动作放大成整批 GPU 都看得见的等待。[1][2]

因此，“调度墙”不是一个单点瓶颈，而是一串由 CPU 持续参与、顺序串联并彼此放大的控制动作。`S024`（DigitalOcean Hidden Bottlenecks）这类补充视角材料也没有否认这一点；它只是提醒我们，真实系统里除了 CPU 之外，tokenization、prompt preprocessing、KV management 和 streaming 也会一起争抢同一段前台时间预算。[3]

### 2. 为什么会从微观 launch 税升级成宏观调度墙

如果只看微观层面，kernel launch overhead 似乎只是每次提交几微秒的固定税费。但 agentic workload 会把它放大成系统问题，原因在于：

1. **阶段切换比传统 chat 更频繁**
   - 普通 chat 更接近单条请求连续 decode。
   - agentic inference 更常见的是 `prefill -> decode -> pause -> resume -> fan-out -> fan-in`。
   - `S021`（BentoML PD disaggregation 文档）明确把 prefill 和 decode 视为不同资源特性的阶段：前者更偏 compute-bound，后者更偏 memory-bound。这意味着 CPU 需要更频繁地推动 request state machine 跨阶段前进，而不是只在单一 steady-state decode 循环里提交工作。[2]

2. **控制动作比计算动作更碎**
   - 一个 agentic 请求常常不是“算完一个长序列”，而是不断在多个短阶段间切换。
   - 这会抬高 queue、worker selection、KV state tracking、broadcast 和 completion handling 的占比。`S024`（DigitalOcean Hidden Bottlenecks）把 scheduling、KV management 和 streaming 都列为实际部署中的隐性瓶颈，正说明控制面动作已经不再只是背景噪声。[3]

3. **多 GPU / 多 worker 会放大最慢一环**
   - 一旦进入 tensor parallel、expert parallel 或跨池 handoff，CPU 侧单点抖动会被同步点放大。
   - `S005`（CPU-induced slowdowns 论文）给出的直接证据是：高负载长上下文场景下，vLLM 的广播队列 dequeue 延迟可从 `12ms` 放大到 `228ms`，约 `19x`。这已经不是“调度有点慢”，而是 host-side queueing 反过来主导 GPU 何时能开始下一阶段工作。[1]

也就是说，kernel launch 本身只是入口；真正危险的是 **host-side sequencing cost** 开始累计并串联。

### 3. 证据链：为什么这不是纯理论推断

现有材料已经能提供三段较强的证据链。

第一段是 `S005`（CPU-induced slowdowns 论文）给出的底层因果。多 GPU serving 中，CPU 抖动并不会停留在局部，而是会通过同步链扩散成全局等待。`12ms -> 228ms` 的 dequeue 放大说明，host-side queueing 和 synchronization 足以反过来决定 GPU 有效利用率。[1]

第二段是 `S021`（BentoML PD disaggregation 文档）代表的解耦 serving 架构。当前公开文档已经把 `ingress router / prefill worker / decode worker` 视作可以显式拆开的角色，说明 CPU 需要管理的早已不只是本地 kernel 提交，而是跨阶段的 worker 进入顺序、handoff 时机和资源角色切换。[2]

第三段是 `S024`（DigitalOcean Hidden Bottlenecks）代表的工程边界条件。它指出系统瓶颈常常分散在 tokenization、prompt preprocessing、scheduling、KV management 和 streaming 等多个环节。这反而支持本文的核心判断：问题不是某个 launch 本身，而是整个 host-side execution loop 需要组织的状态动作越来越多。[3]

### 图 1：同步点为什么会把 host 抖动放大成全局等待

![CPU slowdown sync barrier](../../../assets/arxiv-figures/2603.22774_sync-barrier.png)

图 1 支持的不是一个抽象观点，而是具体的放大机制：当多个 rank 或 worker 需要在同一边界重新汇合时，队列抖动和 host 线程延迟会被同步点放大，最终表现成整批 GPU 的空等与尾延迟上升。[1]

### 4. queue、broadcast、synchronization、worker selection 为什么会相互放大

这四个环节并不是并列事项，而是一条顺序放大链。

#### 4.1 queue

queue 决定请求什么时候进入真正可执行状态。  
在 agentic 场景中，请求粒度更碎、状态切换更多，队列不再只是吞吐缓冲，而是阶段管理器。`S005`（CPU-induced slowdowns 论文）的结果说明，哪怕只是队列 dequeue 环节放慢，后续 GPU 批次也可能整体被拖住；`S024`（DigitalOcean Hidden Bottlenecks）则说明队列前面还有 tokenization 和 prompt preprocessing 这类 CPU 前处理，进一步增加了前台排队链的长度。[1][3]

#### 4.2 worker selection

worker selection 不只是“挑一张空闲 GPU”。  
在现代 serving 中，它至少要同时考虑：

- 当前阶段是 prefill 还是 decode
- prefix / KV locality
- current residency
- pool role
- topology
- fairness

`S021`（BentoML PD disaggregation 文档）之所以重要，是因为它把 prefill compute-bound、decode memory-bound 的差异公开化了。只要阶段角色不同，worker selection 就天然从“找空位”升级成“找最合适的执行路径”。选错路径，后面就会产生额外 handoff、warmup 或 KV miss。[2]

#### 4.3 broadcast / handoff

一旦请求跨 worker、跨 rank 或跨池移动，就需要显式广播或 handoff。  
这一步会把之前的 queueing 和 selection 结果变成真正的数据面动作。对于 PD 分离系统来说，handoff 还常常伴随 KV 元数据、阶段状态和优先级信息的传递，因此它不是“发个包就完”，而是一次显式的状态转移。[2] 如果 broadcast 路径慢、共享内存队列抖动、handoff metadata 大，之前做出的调度决策即使正确，也会在执行上失真。

#### 4.4 synchronization

synchronization 是整条链里最容易放大抖动的一环。  
原因很简单：它天然等待最慢的一方。于是 queue 慢一点、selection 多做一点、broadcast 抖一下，最终都会体现在 synchronization 上被放大。`S005`（CPU-induced slowdowns 论文）的核心价值就在这里，它证明多 GPU slowdown 的根本危险不是某次 launch 稍慢，而是同步边界会把局部 host 延迟升级成全局 stall。[1]

因此，这四个环节的关系不是“并列消耗”，而是：

> queue 决定排队形状，selection 决定执行路径，broadcast/handoff 决定数据面落地，synchronization 决定最慢路径如何拖累全局。

### 图 2：PD 分离为什么会把 worker selection 和 handoff 推到前台

![Prefill decode disaggregation](../../../assets/extracted-figures-all/S021/s021-prefill-decode-disaggregation_page_0002-2.png)

图 2 的价值在于把“调度链”可视化了：当 ingress、prefill 和 decode 被拆成不同角色时，CPU 必须显式决定请求先进哪个池、何时切换阶段、如何交接状态对象。这说明 agentic serving 的 host 关键路径已经从单机 dispatch 扩展成跨角色控制链。[2]

### 5. 为什么 agentic workload 比传统 serving 更容易撞上这堵墙

传统 chat inference 的理想化假设通常是：

- 单上下文
- 长 decode
- 平滑批次
- 少状态分叉

但 agentic workload 恰好把这些假设逐条打破：

- `prefill-first`
- `session multiplicity`
- `fan-out / fan-in burst`
- `multimodal ingress`

这些特征共同带来的结果是：CPU 参与的状态动作次数明显增加，而每次动作的收益窗口却更短。`S021`（BentoML PD disaggregation 文档）提供了阶段异构性这一结构性原因，`S024`（DigitalOcean Hidden Bottlenecks）则提供了实际工程中的额外前台开销清单。两者合起来说明，host-side 调度成本比传统单路 decode serving 更容易压过单次 GPU 计算收益。[2][3]

### 6. 对后续章节的衔接

这个子章节的结论会自然引向后面三条主线：

- 到 `KV lifecycle`，状态驱动调度链会变成状态对象的保留、恢复和路由问题。
- 到 `MoE`，这条链会进一步叠加 expert routing、residency 和 topology 组织。
- 到 `PD / Prefill-as-a-Service`，它会从单机 execution loop 演化成分布式 control plane。

### 7. 小结

本节最重要的结论不是“launch overhead 很贵”，而是：

> 在 agentic inference 中，CPU 进入关键路径的主要方式，是把原本分散的 queue、selection、handoff 和 synchronization 串成一条高频状态驱动调度链；GPU 计算只要略微变短或略微被切碎，这条链就会快速变成系统上限。

`12ms -> 228ms` 的 dequeue 放大、PD 分离下的显式角色切换，以及 scheduling/KV management/streaming 等额外控制动作，共同说明调度墙的本质不是某一个 launch 过慢，而是 host-side 状态链已经开始主导系统上限。[1][2][3]

### 参考文献

[1] Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference. 2026-03-25.

[2] Prefill-decode disaggregation. 2026/current.

[3] DigitalOcean: Hidden Bottlenecks in LLM Inference and How to Fix Them. 2026-04.

## 主线一子章节 3：图化编译与运行时图化

父章节：`5. 主线一：算子下发为什么从 launch overhead 变成调度墙`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 图化的核心价值是压低 host dispatch tax，而不是单纯“编译更优雅” | S038 (vLLM V1); S039 (CUDA Graphs); S040 (Event Tensor) | `1.7x` throughput；piecewise CUDA graphs；dynamic megakernels |
| serving 里的图化必须和 runtime 一起设计，而不是离线一次编译完 | S039 (CUDA Graphs); S040 (Event Tensor) | `FULL_AND_PIECEWISE`、`FULL_DECODE_ONLY`、dynamic schedule runtime 图 |
| 激进路线会继续减少 host 参与，但会把复杂度转移到 capture、warmup 和 runtime materialization | S039 (CUDA Graphs); S040 (Event Tensor) | compile/capture memory 开销；minimal runtime 图；e2e compilation flow |

### 1. 本章核心判断

图化编译在服务化推理中的真正意义，不是“把几个 kernel 连起来”这么简单，而是：

> 通过提前结构化一部分执行路径，减少 host-side dispatch 和同步税。[1][2][3]

但只要进入真实 serving，这个问题就会立刻从编译问题变成 runtime 组织问题，因为 batch 是动态的、prefill 和 decode 是混合的、输入模态会变化、backend 可能不同，而且多租户下的 shape 与 state 会持续抖动。[2][3] 因此，图化在服务化推理里的核心矛盾是：**图越完整，稳态越快；图越完整，动态性越难容纳。**

### 2. 为什么图化会在这个时间点重新变重要

图化编译并不是新概念，但它在 agentic inference 里重新变得重要，原因有三条。

第一，**CPU dispatch tax 已经足够显性**。  
`S038`（vLLM V1 博客）给出的信号很直接：vLLM V1 把 persistent batch、zero-overhead prefix caching、scheduler path 和 piecewise CUDA graphs 一起重构后，吞吐最高可提升 `1.7x`。这说明 host-side execution loop 的组织方式已经足以改变端到端结果，而不再只是边角优化。[1]

第二，**状态驱动调度链太碎**。  
agentic workload 下，CPU 参与的动作更频繁，执行路径更容易出现大量小步控制开销。图化的现实作用，是把其中较稳定的一段“冻结”下来，减少每次重复提交。`S039`（vLLM CUDA Graphs 设计文档）之所以区分 `FULL_AND_PIECEWISE` 与 `FULL_DECODE_ONLY`，正是因为 serving 并不存在一个可以无条件全图覆盖的统一稳态。[2]

第三，**工业 serving 栈已经开始同时改 execution loop 和 capture 模式**。  
vLLM V1 没有把图化孤立出来讨论，而是把它和 runtime path 重构打包推进；`S040`（Event Tensor 论文）则更进一步，尝试把动态 serving 的一部分直接组织成 dynamic megakernels，从结构上继续减少 host 反复发射细粒度工作项的需求。[1][3]

### 图 1：vLLM 为什么采用多模式 CUDA Graph 路线

![vLLM CUDA Graph modes](../../../assets/extracted-figures-all/S039/s039-docs-vllm-ai-vLLM%20CUDA%20Graphs%20Design%20Document_page_0008-08.png)

图 1 说明 serving 图化不是一个单开关，而是一组模式选择。它支持本文的关键判断：系统要一边压低 dispatch tax，一边保留对动态 decode 路径的容错，因此更现实的做法是分层 capture，而不是假设所有请求都能稳定命中同一条 full graph。[2]

### 3. piecewise graphs、full graphs、persistent kernels 有什么根本差异

#### 3.1 piecewise CUDA Graphs

piecewise graph 的思路是：  
不强求把整条执行路径一次性固定，而是优先捕获那些相对稳定、收益显著的子图。`S038`（vLLM V1 博客）和 `S039`（vLLM CUDA Graphs 设计文档）共同说明，这条路线之所以先落地，是因为它在保持 runtime 可用性的同时，已经足以显著降低一部分 host 提交动作。[1][2]

它的优点是：

- 对动态 shape 更宽容
- 对 mixed prefill/decode 更友好
- 更容易和现有 runtime 共存

它的代价是：

- 不能完全消除 host-side sequencing
- 图外路径仍然需要 CPU 调度
- capture 边界设计不当时，收益会被来回切换吃掉

所以 piecewise graph 更像是 **runtime-compatible graphification**。

#### 3.2 full graphs

full graph 代表的是更激进的路线：  
尽量把完整执行路径固化下来，让 host 侧每次少做决定、少做提交。`S039`（vLLM CUDA Graphs 设计文档）的模式设计本身就说明 full graph 最适合结构稳定的阶段，尤其是 decode-only 这类重复路径；一旦请求偏离 capture 条件，就更容易退回 eager 或较保守的 piecewise 路径。[2]

它的收益最直接：

- dispatch tax 降得更明显
- steady-state path 更短
- GPU 侧更容易维持高利用率

但问题也很明显：

- 对动态 batch、动态 shape 和模态切换更敏感
- 一旦偏离 capture 条件，就更容易 fallback
- 需要更大的静态资源预留与 capture memory 预算

full graph 更适合结构稳定的阶段，但更难覆盖真实 agentic 请求的全貌。

#### 3.3 persistent kernels / megakernels

persistent kernel 走得更远。  
它试图不是“把已知路径画成图”，而是让 GPU 端持续存在一组更长寿命的执行实体，减少反复跨 kernel 边界的同步和 host 提交。`S040`（Event Tensor 论文）的 Event Tensor 就代表了这条路线：通过 tile-level dependency encoding 和 runtime materialization，把动态 serving 的一部分执行组织成更长生命周期的 `dynamic megakernels`。[3]

这条路的潜力很强，因为它可能进一步降低：

- kernel boundary synchronization
- host launch frequency
- 细碎 dispatch tax

但它也意味着更强的前期结构化、更复杂的图构建和更高的系统工程门槛。[3]

### 图 2：Event Tensor 把动态图化推进到 runtime materialization

![Event Tensor runtime implementation](../../../assets/extracted-figures-all/s040/2604.13327_fig8_dynamic_schedule_runtime_impl.png)

图 2 支持的关键判断是：激进路线不再满足于减少几次 host launch，而是尝试把动态依赖本身编码进更长寿命的执行结构里。这让 runtime-level graphification 与 persistent kernel 的边界开始模糊。[3]

### 4. 为什么说这不是单一编译问题，而是 runtime 组织问题

因为在服务化推理里，图从来不是脱离调度器独立存在的。  
它至少会和下面四件事深度耦合：

1. **scheduler**
   - 谁进图、谁不进图、何时 fallback，本质上都是调度问题。[2]

2. **batch formation**
   - batch 的 shape 是否稳定，决定图能否持续命中。[2]

3. **state reuse**
   - prefix / KV / session state 的存在会改变执行路径是否稳定；这也是为什么 vLLM V1 把 prefix caching 与 graph path 一起放进 runtime 重构叙事里。[1]

4. **backend selection**
   - attention backend、通信模式、MoE runtime 是否能兼容同一图路径，会直接决定 capture 边界能否长期成立。[2][3]

这就是为什么服务化图化编译的现实形态更接近：

> graph-aware runtime

而不是传统离线编译意义上的“图编译完成就结束”。

### 5. Event Tensor 代表了什么，为什么它重要

Event Tensor 的意义不只是“又有一篇更快的论文”，而是它把一个趋势推进得更清楚：

- 未来图化不一定只是在 host 侧捕获 CUDA Graph
- 也可能在 GPU 侧进一步把动态依赖组织成长生命周期执行结构

从综述视角看，Event Tensor 的价值在于：

1. 它说明 dispatch tax 问题已经严重到值得发明更激进的 execution form。[3]
2. 它说明 runtime-level graphification 和 kernel-level persistence 之间的边界正在模糊。[3]
3. 它让我们更容易看清工业界下一步可能怎么走：
   - 先用 vLLM 这类保守路径解决大部分问题
   - 再逐步吸收更激进的 persistent / megakernel 思路

### 6. 对后续 tradeoff 章节的衔接

这一章的重点是把技术谱系讲清楚；  
下一章真正要回答的是：

- 为什么它们有吸引力
- 为什么它们也有代价
- 为什么工业界会先采用保守版，而不是最激进版

### 7. 小结

图化编译在服务化推理中的关键变化是：

> 它已经不再只是离线编译优化，而是在和 scheduler、batch formation、state reuse、backend compatibility 一起构成新的 runtime 组织方式。

`1.7x` 的 runtime 重构收益、vLLM 的多模式 graph capture，以及 Event Tensor 的 dynamic megakernel 路线，共同说明图化路线的本质不是“把图做得更大”，而是“在动态 serving 里找到哪些结构值得提前冻结，哪些部分必须继续交给控制面处理”。[1][2][3]

### 参考文献

[1] vLLM V1: A Major Upgrade with 1.7x Speedup. 2025-01-27.

[2] vLLM CUDA Graphs Design Document. current.

[3] Event Tensor: Dynamic Megakernels for LLM Serving. 2026-04.

## 主线一子章节 4：图化编译在服务化推理中的利弊

父章节：`5. 主线一：算子下发为什么从 launch overhead 变成调度墙`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 图化的收益来自缩短稳态 dispatch 路径，而不是只减少几个 launch | S038 (vLLM V1); S039 (CUDA Graphs) | `1.7x` throughput；多模式 CUDA Graph 图 |
| 图化的代价集中在 capture memory、warmup、fallback 和 backend 兼容性 | S039 (CUDA Graphs); S040 (Event Tensor) | compile/capture memory；dynamic schedule runtime；minimal runtime 图 |
| 工业界优先采用保守版，是因为 stateful inference 受吞吐/时延/成本与互连边界共同约束 | S024 (Hidden bottlenecks); S025 (LLM trilemma) | hidden bottlenecks；throughput / latency / cost trilemma |

### 1. 本章核心判断

图化编译在服务化推理中的确是有效武器，但它从来不是“只赚不赔”的优化。  
它的本质是：

> 用更高的前期结构化约束，去换更低的稳态 dispatch 开销。[1][2]

因此，图化路线的真正问题不是“值不值得做”，而是：

- 在哪些路径上值得做
- 需要付出哪些代价
- 为什么工业界更愿意先采用保守版

### 2. 收益为什么会这么明显

图化编译在服务化推理中的收益主要来自三个方面。

#### 2.1 降低重复提交税

这是最直观的一点。  
如果一段执行路径足够稳定，那么重复 capture 和重放比每次重新提交 kernel 更便宜。`S038`（vLLM V1 博客）的公开结果表明，vLLM V1 把 runtime path 与 piecewise CUDA graphs 一起重构后，吞吐最高可提升 `1.7x`，这说明减少前台 host 提交并不是理论收益，而是可见的系统级收益。[1]

#### 2.2 缩短 host-side sequencing path

图化不是只减少 launch 次数，它还减少了：

- 某些中间调度动作
- 某些重复的 runtime bookkeeping
- 某些 kernel 边界上的 host 参与

这会直接缩短前面章节讲到的状态驱动调度链。`S039`（vLLM CUDA Graphs 设计文档）对 graph modes 的拆分也说明，图化真正要压缩的是 `dispatch + sequencing + replay` 这条路径，而不只是 launch API 的调用次数。[2]

#### 2.3 让 steady-state path 更稳定

在持续 serving 中，最有价值的不只是平均更快，而是稳态更短、更 predictable。  
图化会让那部分可冻结路径更稳定，这对尾延迟和多租户可预测性都很重要。对 stateful inference 来说，这种可预测性本身就有运营价值，因为它决定了系统能否在多租户条件下维持稳定吞吐与时延分布。[2][4]

### 图 1：图化收益来自压缩可重复的 dispatch 路径

![vLLM CUDA Graph modes](../../../assets/extracted-figures-all/S039/s039-docs-vllm-ai-vLLM%20CUDA%20Graphs%20Design%20Document_page_0009-09.png)

图 1 支持的关键判断是：图化收益不是“所有路径都更快”，而是系统把那些重复、稳定、值得冻结的路径优先纳入 graph capture，从而减少稳态 dispatch 成本。[2]

### 3. 代价为什么也必须写清

如果只讲收益，图化编译会显得像显然正确的答案；  
但在真实 serving 里，它至少会带来四类代价。

#### 3.1 capture memory tax

图化往往要求更静态、更明确的资源预留。  
这会直接抬高：

- 静态内存占用
- 预留空间
- 某些 shape 组合的资源浪费

对于多租户和高动态请求场景，这不是小问题。`S039`（vLLM CUDA Graphs 设计文档）已明确把 compile/capture memory 开销列为模式选择的一部分，而不是附带细节；这意味着图化从第一天起就和容量利用率发生交换。[2]

#### 3.2 warmup and compilation overhead

图不是白来的。  
首次 capture、图构建、shape 适配和预热都会消耗时间与资源。  
如果请求分布过于动态，系统可能还没吃到 steady-state 收益，就已经为图付出了很高的前期开销。`S040`（Event Tensor 论文）的路线虽然更激进，但同样暴露出 runtime materialization 与执行结构构建本身就是成本中心，而不是免费午餐。[3]

#### 3.3 dynamic fallback

agentic workload 很容易触发：

- mixed prefill/decode
- shape 波动
- 多模态输入变化
- 不规则 batch

这些场景会迫使系统频繁 fallback 到 eager 或 piecewise 路线。  
一旦 fallback 过于频繁，图化收益就会被稀释，甚至被控制复杂度反噬。`S039`（vLLM CUDA Graphs 设计文档）之所以把 `FULL_AND_PIECEWISE`、`FULL_DECODE_ONLY` 等模式明确区分出来，本质上就是在承认 fallback 频率会直接决定图化是否值得。[2]

#### 3.4 backend compatibility

不是所有 attention backend、通信模式、MoE runtime、定制 kernel 都能自然进入同一图路径。  
于是图化能力越激进，对 backend 和 runtime 一致性的要求越高。`S024`（DigitalOcean Hidden Bottlenecks）与 `S025`（DigitalOcean LLM Trilemma）的共同提醒是，stateful inference 的瓶颈和成本约束来自多个层面，图化不能脱离 backend、互连和服务复杂度单独评估。[4][5]

### 图 2：激进路线会把复杂度转移到 runtime materialization

![Event Tensor minimal runtime](../../../assets/extracted-figures-all/s040/2604.13327_fig9_minimal_runtime.png)

图 2 说明更激进的路线确实能继续减少 host 参与，但代价是把更多动态性压到新的 runtime 结构里处理。它支持本节的核心判断：图化不是免费提速，而是复杂度重分配。[3]

### 4. 为什么工业界更愿意先采用保守版

这也是 vLLM 路径很有代表性的原因。  
工业界更偏好：

- piecewise graph
- gradual capture
- runtime-controlled fallback

而不是一步走到极端的全图化或更激进的 persistent megakernel 路线。

原因很现实：

1. 保守版更容易和现有 runtime 共存
2. 更容易对异常请求回退
3. 更容易逐步上线，而不是一次性替换执行模式

换句话说，工业界并不是不认可图化，而是优先选择 **兼容动态 serving 的图化**。`S025`（DigitalOcean LLM Trilemma）的 trilemma 视角尤其重要：只要系统同时追求 throughput、latency 和 cost，就不可能只按“最快路径”设计，必须保留对异常请求和资源波动的回旋余地。[5]

### 5. 为什么 agentic workload 让这组 tradeoff 更尖锐

普通较稳定的推理服务，图化的收益和代价都更容易预测；  
agentic inference 则会把两边同时放大：

- 收益更大  
  因为 dispatch tax 更高、状态链更碎

- 代价也更大  
  因为 shape 更动态、模态更复杂、阶段切换更多

这意味着 agentic serving 对图化提出的不是“做不做”，而是：

> 如何精确划定哪些路径应图化、哪些路径必须保留动态性。[2][4][5]

### 6. 与后续主线的关系

图化编译不是孤立的。它会和后面的：

- prefix/KV reuse
- MoE routing
- PD disaggregation

一起决定 runtime 组织形态。  
状态越可复用、路径越可预测，图化越有价值；  
状态越分叉、路径越多变，fallback 和 capture tax 就越重要。

### 7. 小结

本节最重要的结论是：

> 图化编译在服务化推理中的意义，从来不是“把图做大”，而是“在动态系统里选择性地冻结稳定路径”，从而用可控的结构化成本去换可观的 dispatch 收益。

`1.7x` 的运行时重构收益、capture memory / fallback 的现实代价，以及 throughput / latency / cost 三角约束，共同说明它会成为 AI 机头 CPU 优化中的关键手段，却又永远不可能完全替代 runtime control plane。[1][2][5]

### 参考文献

[1] vLLM V1: A Major Upgrade with 1.7x Speedup. 2025-01-27.

[2] vLLM CUDA Graphs Design Document. current.

[3] Event Tensor: Dynamic Megakernels for LLM Serving. 2026-04.

[4] DigitalOcean: Hidden Bottlenecks in LLM Inference and How to Fix Them. 2026-04.

[5] DigitalOcean: The LLM Inference Trilemma. 2026-04-22.

## 主线二子章节 1：从 KV Offload 到 KV Lifecycle

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| agentic workload 已把 KV 从“容量补丁”变成“状态生命周期对象” | `S003 S006 S007 S034` | `11.7x` read/write ratio；NOSA memory hierarchy；ScoutAttention layer-ahead 路径 |
| KV 的主价值已从一次写入转向长期保留、恢复和复用 | `S003 S034` | priority-based eviction；token-range retention；event API |
| CPU 的职责因此从搬运者升级为 retention / prefetch / resume 规划器 | `S006 S007` | NOSA 最高 `2.3x` decode throughput；ScoutAttention 约 `2.1x` speedup |

### 1. 本章核心判断

在 agentic inference 中，KV 已经不应被理解成“显存放不下时可以挪出去的一堆缓存”，而应被理解成一个**需要被长期保留、反复恢复、按价值调度的状态对象**。这不是措辞升级，而是问题定义本身已经变了：NVIDIA Dynamo 给出的 agentic 数据表明，KV 访问的读写比可以达到 `11.7x`，也就是同一段状态被读回和复用的频率远高于第一次写入。[1] 一旦读远多于写，系统优化目标就不会再停留在“能不能塞下”，而会转向“能不能在正确时间、正确层级、以正确代价把它拿回来”。

### 2. 为什么“容量问题”这个旧定义已经不够

早期 KV offload 的出发点很简单：上下文更长、批次更大、HBM 不够，于是把问题表述成“如何把 KV 搬到 CPU memory 或 storage”。但 `S006` 和 `S007` 这类材料共同说明，真实瓶颈并不只是容量，而是**locality engineering 与 transfer domination**。NOSA 把 sparse attention 从一开始就设计成 offload-friendly，目标不是只减少 attention FLOPs，而是减少必须跨层级搬运的 selected KV；ScoutAttention 更进一步，让 CPU 在 layer-ahead 阶段参与预计算，证明 CPU 可以从被动搬运者前移成恢复路径的一部分。[2][3]

换句话说，旧定义只回答“KV 放哪儿”；新定义必须同时回答：

- 哪些 KV 值得保留更久；
- 哪些 KV 值得提前回填；
- 哪些 KV 恢复太贵，不值得进入关键路径；
- 哪些 KV 的位置本身就该参与路由决策。

### 图 1：agentic 负载把 KV 的读路径推成主路径

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-read-write-ratio.webp" alt="Agentic KV read-write ratio" width="760">

图 1 的意义在于把“KV lifecycle”从概念落到访问形状上：当读写比达到 `11.7x` 量级时，系统成本中心自然会从初次写入转向保留、恢复和复用。[1]

### 3. `write-once-read-many` 为什么会改写整个问题定义

agentic workload 下的大量状态都带有明显的 `write-once-read-many` 特征。system prompt、tool schema、session trunk、分支上下文和多代理共享前缀往往只在第一次 prefill 时完整写入，但在后续几十次请求里会被多次恢复。`S034` 已经把这类现象工程化为 priority-based KV eviction、token-range retention 与 KV event API，说明工业界不再把 KV 当作“一次性中间结果”，而是把它视为需要显式治理的生命周期对象。[4]

这也是为什么 lifecycle 比 offload 更准确。因为生命周期视角覆盖的是整条链路：

1. 创建：首次 prefill 或 decode 生成状态。
2. 保留：决定哪些高价值块应继续驻留。
3. 迁移：在 HBM、CPU memory、远端缓存间移动。
4. 预取：在 resume 前提前回填。
5. 恢复：把状态重新送回关键路径。
6. 复用：让后续请求直接命中而不是重算。
7. 回收：在价值下降后及时释放。

### 4. retention、prefetch、resume 为什么会变成中心动作

这三件事之所以升格，是因为它们分别对应了 lifecycle 的三个关键成本点。

#### 4.1 retention 决定高价值状态能否跨轮次保留

如果一个 prefix 或 session trunk 后续仍会被访问，过早回收就会把未来收益直接抹掉。`S034` 对 pinned / priority / token-range retention 的强调，说明工业现实已经不是“统一 LRU 是否够用”，而是“高价值块是否该按业务价值被区别对待”。[4]

#### 4.2 prefetch 决定恢复能否隐藏在关键路径之外

ScoutAttention 的核心启发不是单纯把 KV 搬回，而是让 CPU 通过 layer-ahead 预计算提前为后续层准备访问路径，并实现约 `2.1x` 的 speedup，且精度损失控制在 `<2.4%`。[3] 这说明预取并不是锦上添花，而是恢复路径能否变短的主要来源。

#### 4.3 resume 决定 agentic workflow 的尾延迟

一旦工作负载存在 branch、pause-resume 和多代理 fan-out/fan-in，resume 就会从异常处理动作变成主路径动作。NOSA 的结论是：selected KV transfer 仍可能主导成本，因此仅仅“状态在别处存在”并不能保证收益兑现；必须控制恢复路径的 locality 与搬运粒度，系统吞吐才会真正改善，论文给出的最高收益是 `2.3x` decode throughput。[2]

### 图 2：KV 生命周期已经天然跨越多层级内存

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-memory-hierarchy.svg" alt="KV memory hierarchy" width="760">

图 2 强调 lifecycle 的工程本质不是单次 offload，而是状态在 HBM、CPU memory、远端层级之间持续流动。CPU 的职责因此更像层级状态管理，而不是一次性 DMA 触发器。[2][3]

### 5. 为什么这会把 CPU 推到新位置

一旦 retention、prefetch、resume 都进入主路径，CPU 的职责就会自然扩展成：

- `state keeper`：维护哪些状态仍然值得留下；
- `recovery planner`：判断何时回填、从哪里回填；
- `warm-tier manager`：安排哪些状态留在近端 DRAM 或远端 warm tier；
- `prefetch trigger`：根据访问迹象提前组织恢复。

这和传统意义上的“host CPU 发几个 kernel”已经不是同一个角色。`S003`、`S006`、`S007`、`S034` 一起给出的稳定结论是：**KV 的主要难点已从容量管理转向生命周期治理，而生命周期治理天然是 control-plane 问题。**[1][2][3][4]

### 6. 小结

本节要建立的不是一个新名词，而是一条更准确的因果链：当 agentic workload 让 KV 呈现 `write-once-read-many`、高频 resume 和跨阶段复用特征时，KV 就会从“容量补丁”变成“生命周期对象”。读写比 `11.7x`、NOSA 的 `2.3x` 吞吐提升、ScoutAttention 的 `2.1x` 预取收益，以及 TensorRT-LLM 的 retention / event API 共同说明，CPU 的新职责不是把 KV 存下，而是把它留住、找回、复用并以更低代价重新送回关键路径。[1][2][3][4]

### 参考文献

[1] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.

[2] NOSA: Native and Offloadable Sparse Attention. 2025-10-15.

[3] ScoutAttention: Efficient KV Cache Offloading via Layer-Ahead CPU Pre-computation. 2026-03-28.

[4] Introducing New KV Cache Reuse Optimizations in NVIDIA TensorRT-LLM. 2025.

## 主线二子章节 2：稀疏 Attention 与稀疏 KV 访问

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 稀疏 attention 的系统价值在于减少 selected KV transfer，而不只是少算 attention | `S006` | 解码吞吐最高 `2.3x`；memory hierarchy / sparse framework 图 |
| CPU 会从“整块搬运者”变成细粒度选择、预取和恢复的 policy engine | `S006 S007` | ScoutAttention layer-ahead CPU pre-computation；约 `2.1x` speedup |
| 稀疏访问越强，越需要精确的 locality 决策，否则收益会被错取和漏取吃回去 | `S006 S007 S013` | transfer domination；reduced-KV / hybrid attention 降低容量但放大 placement 价值 |

### 1. 本章核心判断

稀疏 attention 在服务化推理中的价值，不只是“少算一些注意力”，而是把 CPU 的工作从大块搬运推进到**更细粒度的选择、保留、预取和恢复**。NOSA 的关键判断非常直接：决定收益的，不是理论上保留了多少 token，而是 selected KV transfer 是否仍然主导成本；其公开结果是 decode throughput 最高可提升 `2.3x`。[1] 这说明 sparse KV access 不会让 CPU 退出关键路径，反而会让 CPU 更像一个状态 policy engine。

### 2. 为什么 sparse access 和普通 offload 不是一回事

如果只有普通 offload，问题更像“KV 太大，搬出去，需要时再搬回来”。但一旦 access 模式变稀疏，问题马上变成：

- 哪些块值得保留在近端；
- 哪些块值得提前拉回；
- 哪些块根本不值得恢复；
- 错取和漏取会不会抵消理论收益。

也就是说，系统已经从容量治理转向访问治理。`S006` 的重要性就在这里：它不是抽象讨论 sparse attention，而是把 sparse pattern 与 offload path 一起设计，把论文目标直接锚定在服务系统里的 KV 迁移成本上。[1]

### 图 1：稀疏 KV 访问的核心不是省容量，而是重写层级访问路径

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/nosa-01.png" alt="NOSA sparse attention memory hierarchy" width="760">

图 1 说明稀疏 attention 真正改变的是 memory hierarchy 上哪些 KV 会被触达。它支撑本节的核心判断：系统需要的不是“大搬运”，而是更细的 locality 决策。[1]

### 3. NOSA 代表了什么

NOSA 之所以关键，不只是因为它用了 sparse attention，而是因为它从一开始就把 sparse attention 设计成 `offload-friendly`。这意味着研究目标已经变成：

- 不是只追求理论上的注意力稀疏；
- 而是追求能减少 CPU-GPU KV transfer 的稀疏。

这很重要，因为它第一次把 sparse attention 的价值直接锚定到 serving 系统成本上。若 selected KV transfer 仍然很大，GPU 少算出来的那些 FLOPs 可能完全不够抵消层级间搬运与恢复的额外延迟。[1]

### 4. 为什么 CPU 会前移成 `policy engine`

ScoutAttention 对这个转变给出了更强的工程化证据。它不是只说“稀疏访问很好”，而是让 CPU 在 layer-ahead 阶段参与预计算，以便更早知道后续层需要哪些 KV，并提前准备恢复路径。公开结果是约 `2.1x` speedup，精度损失控制在 `<2.4%`。[2] 这说明 CPU 的价值不再只是开 DMA，而是在**预测、筛选和编排**将被访问的状态。

从 control-plane 角度看，这意味着 CPU 需要持续回答：

1. 哪些 KV 值得被选入下一层的热路径；
2. 哪些 KV 应保持在更近层级；
3. 哪些恢复动作应提前隐藏在前一层计算期间；
4. 哪些稀疏访问只是噪声，不值得为其预热。

### 图 2：layer-ahead 预计算把 CPU 从搬运者前移成协同计算者

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/scoutattn-1.png" alt="ScoutAttention layer-ahead CPU pre-computation" width="760">

图 2 的价值在于说明稀疏访问收益并非自动发生，而是需要 CPU 提前参与下一层的访问准备。也因此，预取与恢复开始像调度动作，而不只是内存动作。[2]

### 5. reduced-KV 为什么进一步放大了 placement 价值

`S013` 的 Kimi Linear 说明 reduced-KV / hybrid attention 会进一步改变成本结构：论文给出 KV cache usage 最多降低 `75%`，在 `1M` context 下 decode throughput 最多可提升 `6x`。[3] 这类结果看起来像“容量问题被缓解了”，但它真正带来的系统后果是：当 KV 总量下降后，**剩下那些仍需要保留和搬运的状态就更值得被精细放置**。容量压力下降，并不意味着 CPU 变轻；更准确地说，是 CPU 的工作从“是否能放下”转向“如何把少量但更高价值的状态放在更对的位置”。

### 6. 边界：稀疏访问的收益为什么不会自动兑现

这一方向仍有一个必须保留的审慎判断：公开资料已经能证明收益方向，但代价函数还不完整。`material/gap-audit.md` 也明确记录了，sparse KV policy 的 hit quality、event overhead 和生产级误判成本仍缺完整公开指标。因此，本节更稳妥的结论是：

> 稀疏 attention 已经足以证明 CPU 会从“大块搬运者”变成细粒度状态 policy engine；但不同 policy 的误判代价、metadata 开销和线上命中质量，仍需要更多实测补齐。

### 7. 小结

稀疏 attention 和 sparse KV access 并没有让 CPU 离开关键路径，而是把 CPU 推向更细粒度的控制面。NOSA 的 `2.3x` 吞吐提升、ScoutAttention 的 `2.1x` 预取收益，以及 Kimi Linear 对 reduced-KV 的证明，共同支撑一个稳定判断：**当访问从“全量取回”转向“有选择地取回”时，CPU 的核心价值就从搬运带宽转向状态判断质量。**[1][2][3]

### 参考文献

[1] NOSA: Native and Offloadable Sparse Attention. 2025-10-15.

[2] ScoutAttention: Efficient KV Cache Offloading via Layer-Ahead CPU Pre-computation. 2026-03-28.

[3] Kimi Linear: An Expressive, Efficient Attention Architecture. 2025-10-30.

换句话说，NOSA 不是“模型更省算力”这么简单，而是在说：

> sparse access pattern 可以被设计成更适合 host-side state movement。

### 4. ScoutAttention 代表了什么

ScoutAttention 又往前走了一步。  
它不只是在减少需要恢复的 KV，还让 CPU 提前参与部分 layer-ahead 计算。

这个变化的意义非常大：

1. CPU 不再只是数据搬运者
2. CPU 开始承担一部分“为未来恢复做准备”的工作
3. 预取与协同计算开始合并

也就是说，sparse KV access 的终点并不一定是“更少的传输”，而可能是：

> 更早地判断哪些状态值得被准备好。

### 5. 为什么 sparse access 会把 CPU 推向更细粒度 policy

原因非常直接：  
一旦不是所有 KV 都同样重要，CPU 就必须回答更细的问题。

例如：

- 哪些 token range 重要
- 哪些 block 重要
- 哪些会马上被读
- 哪些可以继续留在冷层

这意味着 CPU 的职责会从：

- 统一搬运

变成：

- selective restore
- selective retention
- selective prefetch
- policy-driven eviction

所以 sparse access 的后果，不是让 CPU“做得更少”，而是让 CPU“做得更细”。

### 6. 稀疏访问为什么会放大 metadata 和 policy 的重要性

稀疏访问要成立，系统必须知道更多状态：

- block 对应什么
- token range 对应什么
- parent-child 关系是什么
- 哪些状态在什么 worker 上

于是收益和代价会一起上升：

**收益：**
- 恢复量减少
- 无效搬运减少
- 预取更有针对性

**代价：**
- 元数据更多
- policy 更复杂
- 错误判断的代价更高

这也是为什么 sparse access 很自然会和：

- prefix-aware routing
- event-driven reuse
- retention policy

连成一条线。

### 7. 为什么这对 agentic workload 特别重要

agentic inference 下，状态对象不仅大，而且活得久、读得多、分叉多。  
这会让稀疏访问比传统长文本问答更重要，因为系统更希望知道：

- 哪一部分状态以后还会再被多个 agent 读
- 哪一部分只是一次性中间过程
- 哪一部分值得进入更热的层级

所以 sparse KV access 对 agentic workload 的真正意义是：

> 它让状态对象开始按“未来价值”而不是“已有大小”被管理。

### 8. 小结

本节最重要的结论是：

> 稀疏 attention / 稀疏 KV 访问并不会降低 CPU 的系统重要性；它们只是把 CPU 的职责从“大块数据搬运”改造成“细粒度状态策略执行”。

这也是为什么 sparse access 会自然通向 prefix cache 后续演化、event API 和 KV control plane。

## 主线二子章节 3：Prefix Cache 是第一代状态复用技术

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| APC 应被理解为第一代状态复用控制平面，而不是局部小优化 | `S010 S043` | full-block prefix caching；TTFT 最多 `5x` |
| APC 的第一批系统收益来自避免重复 prefill，而不是“平均省一点算力” | `S043` | block size `64 -> 8` tokens 最多再增 `7%` |
| APC 的边界在于它主要处理 exact shared prefix，本身不解决分布式路由和长期保留 | `S010 S043` | KV cache manager / LRU eviction；early reuse 仍需更细粒度机制 |

### 1. 本章核心判断

`Automatic Prefix Caching` 的历史地位需要被重新定义。它不应被理解成一个局部的小优化，而应被理解成第一代**状态复用控制平面**技术。原因很直接：它第一次把“跨请求共享已有 KV”从经验性技巧变成了 runtime 内建能力。vLLM 的 APC 设计文档已经把 prefix cache manager、full-block matching 和 eviction 机制作为系统组成部分，而 TensorRT-LLM 的 early reuse 结果则表明，这种系统化状态复用可以把 TTFT 压低到最多 `5x`，并且把 block size 从 `64` tokens 缩到 `8` tokens 还能再带来最多 `7%` 的改善。[1][2]

### 2. 为什么 APC 是状态复用控制平面的起点

APC 真正完成了三件此前并不显式的事：

1. 它把“前缀是否相同”的判断从应用层移到推理系统层。
2. 它把“命中缓存”的收益直接转化成 TTFT、prefill token 数和 GPU 时间的减少。
3. 它强迫系统维护一套最基本的状态身份机制，即某段 KV 对应哪段输入、在哪个 block 边界上可复用、何时仍然有效。

因此，APC 的意义远不止“命中了就省 token”。它意味着服务系统开始默认：**状态复用本身值得被系统化对待。**[1][2]

### 图 1：第一代 prefix reuse 的价值首先体现为 TTFT 下降

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-dynamo-agentic-kv-readwrite-2026.webp" alt="Agentic KV reuse and routing" width="760">

图 1 不是 APC 的实现图，而是用来解释为什么 prefix reuse 会迅速变成控制面问题：agentic workload 下共享前缀和高读写比叠加，使“避免重复 prefill”直接决定 TTFT 与调度压力。[2][3]

### 3. APC 解决了什么

第一代 APC 最擅长处理的是 `exact` 或 `near-exact shared prefix`。对于固定 system prompt、工具 schema、共享角色说明、标准模板和子代理公共启动上下文，这类机制可以直接避免重复 prefill。对 agentic inference 来说，这一步尤其关键，因为 shared prefix 不是偶然存在，而是结构性存在。

`S043` 的 early reuse 结果表明，这种收益已经不是理论推断，而是可以显著改写首 token 延迟的现实优化。[2] 因此，APC 的首要价值不是“平均省下一点算力”，而是把状态复用正式引入了服务系统的关键路径。

### 4. APC 没有解决什么

之所以说 APC 只是第一代，是因为它解决的问题仍然有限：

- 它主要回答“同样的前缀能不能重用”，没有回答“不同但相似的状态能不能部分重用”；
- 它更像单机或单 worker 内部的 reuse primitive，没有真正处理分布式 worker 之间的状态可见性；
- 它把问题更多表述为“有没有命中”，而不是“命中是否稳定、是否值得为此牺牲负载均衡”；
- 它对多模态 identity、branching execution 和长期 pinned prefix 的表达能力有限。[1][2]

也正因此，第一代 APC 一落入真实服务环境，很快就会催生后续问题：请求该被路由到哪台更可能命中的 worker，哪些 prefix 值得长期保留，以及命中与均衡冲突时应该优先谁。

### 图 2：APC 的边界来自 block 粒度和 exact prefix 假设

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-read-write-ratio.webp" alt="KV read-write reuse pressure" width="760">

图 2 强调 APC 为什么会迅速触及边界：当复用压力来自大量分叉、resume 和跨 worker 请求时，仅有“本地 exact prefix 命中”已经不够支撑整个系统。[2][3]

### 5. 为什么说它是“第一代”而不是“完整方案”

把 APC 定位成第一代，有两个好处。第一，它承认这项技术已经完成了状态复用的基础抽象：状态可被识别、保留、再利用。第二，它也清楚承认这一步仍然过于朴素，后面还必须引入 routing、retention、events 和更强的 identity 机制。换句话说，APC 为后续控制面铺了路，但它本身并不是终点。

### 6. 小结

本节想建立的是一个历史定位：APC 之所以重要，不是因为它本身足够复杂，而是因为它第一次把 `state reuse` 明确建成了 runtime 能力。vLLM 的 prefix cache manager 与 TensorRT-LLM 的 `5x` TTFT 改善共同说明，第一代 prefix reuse 已经足以改变服务系统的成本中心；同时，它的 block 粒度、exact prefix 假设和分布式可见性边界，也决定了后续必须出现更强的路由、保留和事件化机制。[1][2]

### 参考文献

[1] vLLM Automatic Prefix Caching. current.

[2] 5x Faster Time to First Token with NVIDIA TensorRT-LLM KV Cache Early Reuse. 2024-11-08.

[3] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.
- 如果 worker 之间负载已经失衡，是否还该坚持 cache affinity？
- 在图像、工具描述、会话分支不同但文本前缀相近时，缓存身份应如何定义？

这些问题都不是 APC 第一阶段自身能够完整回答的，但正是这些问题，决定了后续技术演化的方向。换句话说，APC 的真正贡献并不是把状态复用问题彻底解决，而是把它从“看似可以忽略的加速小技巧”升级为“必须由 CPU 和控制平面持续管理的系统对象”。

从 CPU 视角看，这一步尤其关键。只要 APC 仍停留在单机命中层面，CPU 的角色还相对有限，更多像一个支持性缓存维护者；但一旦 APC 的命中与否开始影响请求路由、负载均衡、保留策略和恢复路径，CPU 就不得不承担更中心的控制职责。它至少需要管理三类元数据：

- 哪些 prefix 当前存在、在哪里存在；
- 哪些 prefix 的未来复用概率更高，值得继续保留；
- 哪些请求应优先被送往 cache-affine 的位置，而哪些请求更应该为了整体吞吐牺牲局部命中。

也正是在这个意义上，APC 为后续所有“状态控制平面化”技术打开了入口。后面的 prefix-aware routing、priority retention、event-driven reuse、本地与远端 cache 视图同步，都可以被看作是在 APC 奠定的基础上继续往前走。没有第一代 APC，后续系统甚至缺少一个最起码的默认前提：**已有状态值得被显式看见、标识、保留和调度。**

放回 agentic workload，这一点就更容易理解。Agentic inference 的难点，不是单个请求特别长，而是状态形状变化频繁、共享前缀大量存在、回合经常短促切换、不同分支之间相似但不完全一致。APC 刚好命中了这条演化链的起点。它先用最保守、最直接的方法证明：重复 prefill 不是不可避免的；系统是可以主动识别和重用已有状态的。之后的问题才变成：重用如何更稳定、更细粒度、更分布式、更 aware 于 workload 结构。

因此，对本综述而言，APC 的位置应被清晰界定为：

1. 它不是 prefix 技巧的终点，而是状态复用控制平面的起点。
2. 它证明了“KV 不是一次性副产物，而是可再利用状态对象”。
3. 它的边界直接催生了下一阶段技术，即 cache affinity、retention policy、event-driven reuse 和 state identity design。

本子章节的结论因此可以压缩成一句话：  
`Automatic Prefix Caching` 的历史意义，在于它第一次把“前缀复用”做成了推理系统的显式能力；但也正因为它只解决了“是否命中本地共享前缀”这一最初级问题，后续服务系统才必须继续向更完整的状态复用控制平面演化。

## 主线二子章节 4：Prefix Cache 之后的技术演化

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 1. 本章核心判断

`Automatic Prefix Caching` 只是状态复用控制平面的第一代实现。真正改变 AI CPU 角色的，不是 prefix cache 本身，而是它之后逐步出现的四类能力：`prefix-aware routing`、`selective retention`、`event-driven KV reuse` 与 `multimodal / branch-aware cache identity`。这些能力共同把“命中缓存”推进成“编排状态对象”。[1][2][3][4]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| APC 之后的关键演化是 routing、retention、events 与更强 identity | `S011 S016 S041 S042 S044 S045 S046 S047` | `match_rate_threshold = 0.1`；`50ms -> 500ms+`；`40%` multimodal cache hit |
| 分布式 prefix reuse 的第一难题不是命中本身，而是命中与负载均衡的权衡 | `S011 S016 S041` | affinity routing；失衡时回退 P2C |
| 真实工程问题已经暴露出 dirty cache、pinned prefixes 与 multimodal identity 缺陷 | `S044 S045 S046 S047` | dirty cache impact；persistent/pinned prefix 需求；错误复用 bug |

### 2. 第一步演化：从 cache hit 走向 cache-aware routing

一旦 prefix cache 进入多 worker / 多 executor 部署，系统不再只关心“有没有相同前缀”，而开始关心“请求应该被送到哪里才能命中已有状态”。Ray Serve 的 PrefixCacheAffinityRouter 直接把这个问题写进 routing policy：当 prefix 匹配率超过默认的 `match_rate_threshold = 0.1` 时优先走 affinity；若负载失衡过重，再回退到 P2C 一类更均衡的策略。[3]

这组规则的意义很大，因为它说明：

- 命中率已经高到值得干预路由；
- 但路由偏置本身可能制造新的热点；
- 因此 CPU 必须同时优化 reuse 与 balance，而不是只盯一个指标。

### 图 1：prefix reuse 从本地命中演化成分布式路由问题

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-dynamo-agentic-kv-readwrite-2026.webp" alt="Agentic KV-aware placement and routing" width="760">

图 1 用来支撑一个关键转折：当共享前缀和高复用变成常态，worker 选择本身就开始受状态位置驱动，而不再只是均衡驱动。[3]

### 3. 第二步演化：从统一 eviction 走向 selective retention

Prefix reuse 真正落地后，很快会遇到一个更现实的问题：不是所有 prefix 的价值都一样。`S045` 直接提出 persistent / pinned prefixes 的需求，说明简单 LRU 已不足以表达高价值前缀；`S044` 则从反面揭示 dirty cache impact，会让命中率收益被 block 生命周期管理吃掉。[4][5]

这一步很关键，因为它把“保留多久”从内部实现细节升级成策略问题。高价值状态是否应被 pin 住、何时转入 warm tier、哪些 dirty block 应该更早清理，都会直接改变后续 resume 成本。

### 4. 第三步演化：从静态 cache manager 走向 event-driven reuse

vLLM 的 Kv Events Subscriber 是一个明确信号：KV block state 已被事件化，可被外部控制器订阅。`BlockStored`、`BlockRemoved`、`AllBlocksCleared` 这类事件还会携带 block hash、token ids 和 `cache_salt` 等 metadata。[6] 这说明控制面已经不再满足于“某个 worker 内部自己知道 cache 状态”，而是希望将 KV 可见性提升为可观测、可订阅、可联动的系统接口。

一旦事件化成立，CPU 的角色也就随之升级：

- 监听哪些状态刚变热；
- 决定哪些状态应继续保留；
- 将事件反馈给路由器或 warm-tier 控制器；
- 在状态失效时及时调整 placement。

### 图 2：KV 事件化意味着状态已经成为显式控制面对象

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-memory-hierarchy.svg" alt="KV lifecycle and event-driven state management" width="760">

图 2 对本节的价值不在于展示某个具体 API，而在于说明：只有把状态对象放进完整生命周期中，事件化才会有意义，路由和 retention 也才能联动。[4][6]

### 5. 第四步演化：从文本前缀走向 multimodal / branch-aware identity

真实 bug 报告把 APC 的下一层边界暴露得更清楚。`S046` 显示 prefix caching 的 first-token latency 可能从 `50ms` 波动到 `500ms+`；`S047` 则揭示多模态并发下，如果 cache identity 忽略视觉输入，会出现错误复用，且相关命中率仅约 `40%`。[7][8] 这两类现象共同说明，状态复用的难点已经不只是“有没有共享文本前缀”，而是：

- 共享前缀是否足以代表完整状态身份；
- 分支、视觉输入、并发上下文是否会让错误命中代价变得极高；
- metadata 精度提升是否会带来新的维护开销。

### 6. 小结

Prefix cache 之后的技术演化，本质上是在回答 APC 没有回答完的问题：命中应如何跨 worker 被利用，哪些 prefix 值得长期保留，状态变化如何对外可见，以及多模态和分支负载下状态身份该如何定义。`0.1` 的 routing 阈值、`50ms -> 500ms+` 的抖动症状、persistent/pinned prefix 需求和多模态错误复用 bug，共同支撑一个稳健判断：**状态复用已经从本地命中机制，演化成 AI CPU 需要持续协调的分布式控制面。**[1][2][3][4][5][6][7][8]

### 参考文献

[1] Prefix-aware routing. current.

[2] Ray PrefixCacheAffinityRouter. 2026/current.

[3] Prefix-aware routing — Ray Serve LLM. current.

[4] [Performance]: Improve Prefix Cache Hit Rate and Reduce Dirty Cache Impact. 2025-09-07.

[5] [Feature]: Support Persistent/Pinned Prefixes in Prefix Caching. 2025-08-18.

[6] Kv Events Subscriber — vLLM. current.

[7] [Bug]: The performance for Prefix Caching is very unstable for different requests. 2024-05-09.

[8] [Bug]: Prefix caching ignores visual input, causing incorrect multimodal outputs under concurrency. 2025-06-23.

真正复杂的地方，在于 agentic workload 很快会超出“完全相同的文本前缀”。

典型例子包括：

- subagents 共享 trunk，但后续分支不同
- pause-resume 会话共享主干，但恢复位置不同
- fan-out / fan-in 共享上游上下文，但每支都可能产生不同状态对象
- multimodal GUI/mobile agent 文本骨架相似，但视觉输入不同

因此，prefix cache 很快就会遇到 identity 问题：

- 相同文本是否真的代表相同状态
- 不同图像是否应共享相同前缀缓存
- branch-aware reuse 要不要比 exact prefix 更宽松

多模态错误复用的工程反馈已经表明，只看文本前缀在高并发场景下可能造成错误输出。这说明 prefix cache 的后续演化，必然要从 `prefix identity` 走向更严格的 `state identity` 设计。

### 7. 为什么这些演化都会落到 CPU 身上

表面看，这些都是缓存问题；但真正承担这些职责的仍然是 CPU / control plane：

1. **要维护映射**
   - block、prefix、session、worker、branch 之间的关系必须被记录。

2. **要做取舍**
   - 命中率、均衡性、保留预算、恢复成本之间没有免费的最优解。

3. **要接事件**
   - 如果状态变化通过事件流暴露出来，就需要外部控制器订阅、解释和反馈。

4. **要定义身份**
   - 多模态、分支、session trunk 的状态边界最终都要通过控制面逻辑判定。

因此，这条演化链的实质不是“缓存越来越高级”，而是：

> 状态复用从 runtime 局部优化，演化成 AI CPU 主导的控制平面职责。

### 8. 小结

Prefix cache 之后最值得记住的不是一串新术语，而是一条方向性变化：

> 技术重点已经从 “how to hit a prefix cache” 迁移到 “how to route, retain, identify, and reuse state correctly and stably”。

对综述主线来说，这也是 KV lifecycle 章节最关键的转折点：  
KV 不再只是容量对象，而是可路由、可保留、可事件化、可分支化的长期状态对象。

## 主线二子章节 5：KV 的工业控制平面化趋势

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 1. 本章核心判断

工业界已经不再把 KV 看成“推理过程中顺便产生的一堆缓存”，而是在逐步把它当作需要保留、调度和观测的**控制面实体**。这个判断并不是从抽象趋势推出来的，而是体现在一整套已经公开的接口与机制上：NVIDIA Dynamo 在 agentic inference 场景中直接强调 KV-aware placement、priority scheduling 和 `11.7x` 的 KV 读写比；TensorRT-LLM 引入 priority-based retention 与 token-range reuse；vLLM 则把 KV block state 暴露成可订阅事件；NIXL / Dynamo 又把 GPU、CPU memory 与 storage 间的数据移动统一到显式 transfer API 中。[1][2][3][4]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 工业界已经把 KV 当成可观测、可调度、可迁移的一等系统对象 | `S003 S014 S034 S042` | KV-aware placement；priority scheduling；KV event API；NIXL unified transfer |
| KV control plane 的现实目标是把状态位置、传输和生命周期纳入统一决策 | `S003 S014 S042` | read/write ratio `11.7x`；event subscriber；GPU/CPU/storage unified move |
| agentic workload 是推动控制平面化的直接外因 | `S003 S034` | 高频复用、token-range retention、priority eviction |

### 2. 为什么工业界会先把 KV 控制平面化

原因很直接：相比许多更激进的新算法，KV 问题已经足够现实、足够普遍、也足够痛。

#### 2.1 它直接影响时延和成本

KV 是否命中，直接影响 TTFT、resume latency 和 throughput；KV 放在哪里，又直接影响 GPU 需求、带宽预算和 warm-tier 成本。`S003` 给出的 `11.7x` 读写比就是一个强烈信号，表明这类状态一旦放错位置，系统会为同一段 KV 重复支付代价。[1]

#### 2.2 它天然跨越多个层级

KV 会同时落到 GPU HBM、CPU memory、host DRAM、远端层级甚至 storage。没有一个单层优化能独自回答这个问题，必须由更高层的控制逻辑做分层和取舍。NIXL / Dynamo 的统一移动接口，本身就是对这种跨层级现实的工程回应。[2]

#### 2.3 它和 agentic workload 高度耦合

在 agentic inference 里，KV 的价值更长期：session trunk 会反复被读，工具链前缀会被复用，分支上下文会频繁恢复。也正因此，KV 生命周期不再是 runtime 内部的小事，而是面向整个请求编排的控制对象。[1][3]

### 图 1：Dynamo 已把 KV-aware placement 与调度写成公开系统能力

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-dynamo-agentic-kv-readwrite-2026.webp" alt="NVIDIA Dynamo KV-aware placement" width="760">

图 1 的关键价值是把“KV control plane”从概念落到现成工业机制上：状态位置、优先级与路由已经被拿到前台统一考虑，而不是交给单一 runtime 黑盒处理。[1]

### 3. 控制平面化具体表现在哪里

从现有公开材料看，至少有三类信号已经足够明确。

#### 3.1 状态位置开始决定请求位置

KV-aware placement 的本质是：系统不再只看哪台 worker 空，而是看哪台 worker 或哪一层级已经更接近目标状态。请求位置开始被状态位置反向塑造。[1]

#### 3.2 生命周期开始被显式建模

priority-based eviction、token-range retention、early reuse 和 pinned prefix 需求说明，工业界已经承认不同 KV 的价值不同，回收与保留不该由统一策略粗暴处理。[3]

#### 3.3 状态变化开始对外可见

vLLM 的 Kv Events Subscriber 把 `BlockStored`、`BlockRemoved`、`AllBlocksCleared` 暴露给外部控制器，并附带 hash、token id、`cache_salt` 等 metadata。[4] 这意味着控制器可以基于状态变化调整路由、保留和 warm-tier 策略，而不必依赖猜测。

### 图 2：统一 transfer API 说明 KV movement 已经被纳入控制面

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-k8s-disagg-serving-2026.webp" alt="Disaggregated serving transfer control plane" width="760">

图 2 说明工业控制平面化不仅是“知道状态在哪”，还包括“如何把状态以统一方式跨 GPU / CPU / storage 移动”。这正是 NIXL / Dynamo 一类能力存在的意义。[2]

### 4. 为什么这会把 CPU 固定在关键路径上

一旦 KV 成为控制面对象，CPU 的职责就不再只是辅助 GPU 计算，而是必须持续承担：

- 维护状态目录与可见性；
- 协调路由与状态位置；
- 触发和跟踪 transfer；
- 将生命周期事件反馈给保留与回收策略。

也就是说，KV 工业控制平面化的真正后果是：CPU 从“host”变成“state orchestrator”。这一点已经被 `S003`、`S014`、`S034`、`S042` 共同支撑，而不再只是推断。[1][2][3][4]

### 5. 小结

本节要说明的是，KV 的工业控制平面化已经从趋势判断变成了接口、策略和数据路径的现实。KV-aware placement、priority eviction、event API 和 unified transfer 共同表明：**工业界已把 KV 当成一等系统资源来治理，而 AI CPU 正是这套治理逻辑的主要承载体。**[1][2][3][4]

### 参考文献

[1] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.

[2] NVIDIA Dynamo blog (NIXL section). 2025.

[3] Introducing New KV Cache Reuse Optimizations in NVIDIA TensorRT-LLM. 2025.

[4] Kv Events Subscriber — vLLM. current.
- prefix reuse 会跨请求发生
- pause-resume 会把恢复时延推上台面
- fan-out / fan-in 会放大共享状态的系统价值

因此，KV 很自然会先于很多其他问题进入控制面。

### 3. KV-aware routing：为什么 routing 开始围着状态走

KV-aware routing 的出现，说明工业界已经承认一个现实：

> 请求不应只被送到“最空闲的 worker”，还应被送到“最有价值状态的 worker”。

这一变化的系统意义是巨大的。

过去 routing 更多看：

- 当前负载
- worker 可用性
- 简单公平性

现在 routing 还需要看：

- 哪里有 prefix / KV
- 哪里的 warm tier 更接近
- 哪里的 resume 成本更低

这意味着 CPU 需要持有更强的 `state-location model`，而不是只持有 worker load model。

### 4. warm tier：为什么 CPU memory 已经从 spill layer 升级为服务层

工业材料里最值得重视的变化之一，是 CPU memory 不再被描述成单纯兜底层。  
无论是 coherent CPU memory、host DRAM、CXL 还是更远的 tier，它们都开始被描述为：

- warm tier
- staging layer
- retention layer
- recovery layer

这会直接改变 CPU 设计目标。

如果 CPU memory 只是 spill 层，那么只要容量大就够；  
但如果它是 warm tier，就必须关心：

- sustained bandwidth
- NUMA locality
- pinning / mapping overhead
- page movement predictability

因此，warm tier 的工业化本质上是在把 CPU 从“慢速备份者”推进成“状态服务提供者”。

### 5. event API：为什么可见性本身成为能力

工业界真正前进的一步，不只是让 KV 可被保留，而是让 KV **可被观察**。

一旦有了 event API 或事件订阅能力，外部控制器就可以：

- 感知 block 何时写入
- 感知 block 何时被移除
- 感知缓存何时被整体清空

这意味着控制面不再盲飞。  
CPU 可以开始做：

- state-informed routing
- retention updates
- early reuse orchestration
- warm-tier migration timing

所以 event API 的意义，不只是“多了一个接口”，而是：

> KV state 终于可以被系统性治理。

### 6. cache state visibility：为什么它是控制平面的必要条件

如果没有 state visibility，很多看起来高级的策略都无法真正成立：

- prefix-aware routing 只能靠近似猜测
- selective retention 只能靠局部 heuristics
- resume latency 无法被系统级优化

而一旦 cache state 可见，系统就能从“命中后被动受益”升级成“命中前主动布局”。

这也是 KV 工业控制平面化的核心分界线：

- 旧阶段：KV 存在于 runtime 内部
- 新阶段：KV 对控制器可见、可被决策系统利用

### 7. 为什么这条趋势对 AI CPU 特别关键

KV 工业控制平面化并不是“runtime 多做一点工作”这么简单。  
它会直接塑造 AI CPU 的职责：

1. **state broker**
   - 维护状态所在位置与可用性

2. **tiering controller**
   - 在 HBM、coherent memory、host DRAM、CXL、storage 间做迁移决策

3. **resume-path optimizer**
   - 决定恢复路径是否足够短、足够稳

4. **routing advisor**
   - 把状态可见性转化成调度偏好

因此，对综述主线而言，KV 工业控制平面化正是“AI CPU 从 host 变成 inference control plane”的最具体体现之一。

### 8. 小结

本节最重要的结论是：

> 工业界已经开始把 KV 从“模型缓存”重定义为“状态控制对象”，而 AI CPU 正是在这一重定义中获得新的系统中心地位。

这也是为什么在后续平台章节里，CPU memory、coherent interconnect、DPU / context fabric 会越来越像同一件事的不同层面。

## 主线三子章节 1：稀疏计算优势为何不自动转化成系统收益

父章节：`7. 主线三：MoE 为什么会把 host-side orchestration 推到前台`

本子章节聚焦：

- cold expert、expert miss、同步链为什么会让 MoE 的系统收益打折
- 为什么 GPU 少算不等于系统整体更轻

当前提纲要点：

- cold expert
- expert miss
- synchronization chain

从模型视角看，MoE 最容易给人一种直觉：既然每个 token 只激活少量专家，那么需要计算的参数更少，系统负担理应变轻。但服务化推理的现实恰好说明，这一直觉并不自动成立。`稀疏计算优势` 和 `系统端到端收益` 之间隔着一整条 host-side orchestration 链。也就是说，GPU 上“少算了一些”并不等于整个系统就“自然更快了”。真正决定收益能否兑现的，往往不是 gate 在数学上选中了几个专家，而是这些专家在物理上是否已经就位、是否会制造新的同步等待、是否会把链路和内存层次压成新的瓶颈。

理解这件事的关键，是把 MoE 从“稀疏算子”改看成“稀疏访问系统”。在 dense 模型中，权重集合相对固定，请求更像是在同一组已知参数上重复执行。可在 MoE 中，请求的每一步都可能把访问热点导向不同的专家集合。逻辑路由发生在 token 级别，但物理后果却扩散到 GPU HBM、主机内存、跨 GPU 通信、跨节点链路和批级同步。于是，计算本身虽然稀疏了，访问和协同却更不规则了。

这就是第一个反直觉点：**MoE 省下的是部分计算，但引入的是更难预测的状态运动。**  
只要系统不能保证热点专家大概率已经驻留在正确位置，或者不能足够快地把缺失专家补到位，那么稀疏计算节省出来的时间，很容易又被 `expert miss`、`cold expert load`、`cross-device gather/scatter` 和 `synchronization` 吃回去。

因此，MoE 的系统问题首先不是“激活了几个专家”，而是“被激活的专家此刻在不在、离得远不远、补上来要不要等”。这也是为什么很多 MoE serving 论文讨论的重心最终都不在 gate 本身，而是在 residency、prefetch、placement 和 balance。因为在真实服务里，token 级路由决策只是链条的起点，真正贵的是这条决策在物理系统里引发的一连串后续动作。

这个链条可以分解为四步。

第一步是 `route`。  
模型为当前 token 选择 top-k 专家，看上去只是一项逻辑判断。

第二步是 `locate`。  
系统需要判断这些专家是否已经驻留在当前 GPU、同一节点的其他 GPU、主机内存，或者更远的层次中。

第三步是 `move`。  
如果专家不在位，就需要触发加载、转移、解压、聚合，或者至少安排一次额外的数据交换。

第四步是 `synchronize`。  
即使单个 token 只需要少数专家，整个 batch 的不同 token 仍然需要在某些阶段重新汇合；只要最慢路径没完成，其他更快路径也可能被迫等待。

这四步中，真正被稀疏计算直接改善的，其实主要是第一步之后在 GPU 上的有效算子量；而第二到第四步，恰恰因为稀疏性和不规则性增强，反而更容易变重。于是，系统收益能否兑现，取决于后面三步是否被良好控制，而不是只取决于第一步看起来有多优雅。

`cold expert` 问题正是这种落差最直接的体现。所谓 cold，并不一定意味着该专家绝对很少被访问，而更常意味着它在当前时间、当前节点、当前 GPU 上并不在位。对于服务系统来说，冷专家的代价不是抽象的，而是明确的：

- 需要额外主机到设备的数据搬运；
- 需要等待当前层或当前 step 的依赖完成；
- 需要为少量 miss 支付整段同步链的尾延迟；
- 可能打乱原本稳定的 batch 结构和 steady-state pipeline。

于是，少数几个 `expert miss` 就可能决定整批请求的最慢完成时间。也就是说，MoE 的实际尾延迟并不由平均路由成本决定，而常常由最差的少数冷路径决定。这一点和 KV lifecycle 中的 `resume miss` 非常相似：真正贵的不是平均情况下多花了一点时间，而是状态缺失时整条关键路径被重新拉长。

第二个关键问题是 `expert skew`。即便系统能够避免大量冷启动，也不意味着收益就稳定。因为路由分布往往不均。某些专家可能长期处于热点位置，被频繁命中；另一些则成为低频但偶发重要的专家。热点专家会推高局部 GPU、局部链路、局部 batch shard 的压力，导致即便整体计算量下降，部分资源仍然持续过载。换句话说，MoE 的不规则性不是平均散开的，而是会被 gate 和 workload 分布共同放大成热点。

这就解释了为什么“GPU 少算了”并不足以推出“系统更轻了”。如果热点专家反复集中在少数位置，那么实际系统可能出现这样一种局面：绝大多数专家根本没被用满，但少数热点专家及其所在链路已经决定了吞吐上限。此时瓶颈不是 dense 计算太重，而是稀疏访问太偏。

第三个被低估的问题是 `synchronization chain`。MoE 的路由可以非常稀疏，但 serving 系统不可能无限制地把每个 token 完全独立地执行完再异步拼回去。为了维持吞吐、batch 结构、通信效率和层间依赖，系统仍然要在一些边界处同步。例如，同一层不同 token 的 expert 输出最终仍要被重新聚合；跨 GPU 路由后的结果仍要在后续层继续参与共同计算。于是，只要一部分 token 因为 expert miss 或远端访问而变慢，其余 token 的更快路径未必能把优势完全兑现。

这就形成了 MoE serving 的核心悖论：**逻辑上每个 token 只算少数专家，物理上整个 batch 却可能为少数最慢专家付出同步代价。** 也正因此，MoE 的收益评估如果只看 FLOPs 降低或每 token 激活参数减少，常常会高估真实部署收益。对系统设计者而言，更重要的指标是：

- 热点专家是否稳定；
- 专家 miss 的尾分布有多重；
- 路由偏斜是否会导致链路和节点局部拥塞；
- batch 中最快和最慢 token 的差距是否扩大；
- 为隐藏 miss 而引入的预取、压缩、迁移策略是否本身又制造了额外开销。

这也是为什么近两年的 MoE serving 工作会反复把关注点放在 `residency`、`prefetch`、`dynamic balance` 和 `topology-aware placement` 上。因为这些机制都在回答同一个更根本的问题：如何把“逻辑稀疏”转化成“物理上可承受的不规则性”。如果无法做到这一点，稀疏性带来的数学优势就会被状态迁移和同步等待抵消。

从 CPU 角色看，这一点非常重要。在 dense serving 里，CPU 更多只是调度固定的权重和相对稳定的计算图；而在 MoE serving 里，CPU 必须持续感知：

- 哪些专家处于热状态，值得常驻；
- 哪些专家近期可能被激活，值得预取；
- 当前 batch 的路由是否偏向某些热点；
- 某次 miss 是否会拖慢整个同步链；
- 应该优先优化吞吐、尾延迟，还是热点均衡。

也就是说，CPU 并不是在“辅助”稀疏计算，而是在把稀疏计算翻译成可执行的物理组织。这种组织如果做不好，GPU 上省下来的算力很可能在 host-side orchestration 中被吃回去；做得好，稀疏计算优势才会真正转化成系统收益。

把这点放回本综述的主命题，就能看得更清楚。我们关心的不是 MoE 是否在理论上更高效，而是 agentic inference 下，MoE 是否会进一步把 AI CPU 推到关键路径。答案基本是肯定的。因为 agentic workload 本身就容易带来 burst、resume、session multiplicity 和结构变化，而 MoE 又把 token 级访问模式变得更不规则。两者叠加后，CPU 需要管理的不再只是请求队列和 KV 生命周期，还包括专家热点、路由偏斜和跨层次状态驻留。

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| MoE 省下的是部分计算，但引入的是更难预测的状态运动 | `S008 S035 S036 S037` | FluxMoE 吞吐最高 `3.0x` over vLLM；wide EP / speculative offload 图 |
| cold expert、expert miss 和同步链会把逻辑稀疏性重新吃回去 | `S008 S036 S037` | prefetch / speculative overlap 专门用于隐藏 miss 代价 |
| 决定收益能否兑现的主要不是 gate 本身，而是 route / place / move / synchronize 链条 | `S008 S035` | wide expert parallelism；decoupled expert residency |

### 1. 本章核心判断

从模型视角看，MoE 很容易给人一种直觉：既然每个 token 只激活少量专家，需要计算的参数更少，系统负担理应变轻。但 serving 现实恰好说明，这一结论并不自动成立。GPU 上“少算了一些”并不等于整个系统就自然更快了。真正决定收益能否兑现的，往往不是 gate 在数学上选中了几个专家，而是这些专家在物理上是否已经就位、是否会制造新的同步等待、是否会把链路和内存层次压成新的瓶颈。[1][2]

### 2. 为什么要把 MoE 看成“稀疏访问系统”

在 dense 模型中，权重集合相对固定，请求更像是在同一组已知参数上重复执行。MoE 不一样：token 级路由会把访问热点持续导向不同专家集合，逻辑路由发生在 token 级别，但物理后果会扩散到 GPU HBM、主机内存、跨 GPU 通信、跨节点链路和批级同步。

因此，MoE 省下的是部分计算，但引入的是更难预测的状态运动。`FluxMoE` 的出发点正是承认这点，它将专家驻留与服务路径显式解耦，并给出最高 `3.0x` over vLLM 的吞吐收益，说明真正值得优化的并不是 gate 本身，而是其后续的 residency 与 movement 链条。[1]

### 图 1：MoE 的系统难点不是激活哪个专家，而是专家是否已经就位

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/fluxmoe-01.png" alt="FluxMoE architecture and expert residency" width="760">

图 1 对本节最重要的价值，是把 MoE 的问题从“稀疏算子”改写成“驻留与迁移系统”：逻辑 gate 之后，系统还必须完成 locate、move 和 synchronize。[1]

### 3. cold expert 为什么会吞掉理论收益

所谓 cold expert，并不一定意味着该专家长期冷门，更常见的情况是它在当前时间、当前节点、当前 GPU 上不在位。对 serving 系统来说，冷专家的代价非常具体：

- 需要额外 host-to-device 或 device-to-device 数据搬运；
- 需要等待当前层或当前 step 的依赖完成；
- 需要为少量 miss 支付整段同步链的尾延迟；
- 可能打乱原本稳定的 batch 结构。

这就是为什么论文会反复强调 prefetch 与 overlap。若 miss 代价无关紧要，`FineMoE` 和 `SpecMoEOff` 根本没有存在必要；它们存在本身就说明，逻辑稀疏性若不被组织成物理可承受的不规则性，系统收益会被重新吃回去。[3][4]

### 4. expert skew 为什么比单次 miss 更棘手

真实 serving 中更难的往往不是“这次 miss 了哪个专家”，而是热点专家会把资源持续拉斜。`Wide Expert Parallelism` 这类工业材料之所以重要，不是因为它给出一个局部优化，而是因为它公开承认 expert organization 已经是机架级问题，拓扑、通信图和批级平衡都是一等约束。[2] 这说明系统吞吐上限可能由少数热点专家及其所在链路决定，而不是由理论 FLOPs 决定。

### 图 2：wide expert parallelism 把 MoE 从算子问题推进成拓扑组织问题

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-wide-ep-moe-2025.webp" alt="Wide expert parallelism on rack-scale systems" width="760">

图 2 支撑一个关键判断：当专家组织上升到 rack-scale 层面，CPU 需要处理的就不只是局部 miss，而是跨 GPU / 跨节点的 route 与 placement 平衡。[2]

### 5. 同步链为什么会把“少数慢路径”变成全局尾延迟

MoE 的逻辑可以很稀疏，但 serving 系统不可能无限制地把每个 token 完全异步执行后再自由拼回。为了维持吞吐和批结构，系统仍要在一些边界处同步。于是，只要一部分 token 因为 expert miss 或远端访问而变慢，其余 token 的更快路径也未必能把优势完全兑现。`SpecMoEOff` 利用 speculative decoding 去隐藏 expert offloading 延迟，并给出最高 `2.5x` 的 decode throughput，本质上正是在对抗这条同步链上的慢路径。[4]

### 6. 小结

MoE 的稀疏计算优势之所以不会自动变成系统收益，是因为系统必须先解决 cold expert、expert skew 和 synchronization chain 三类物理代价；而这三类代价都不是 gate 本身的问题，而是 host-side orchestration 的问题。FluxMoE 的 `3.0x`、SpecMoEOff 的 `2.5x` 和 wide expert parallelism 的工业组织信号共同说明：**MoE 真正把 CPU 推到前台的，不是少算，而是为了让“少算”能在物理系统里不被吃回去。**[1][2][3][4]

### 参考文献

[1] FluxMoE: Decoupling Expert Residency for High-Performance MoE Serving. 2026-04-03.

[2] Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack-Scale Systems. 2025-12-18.

[3] FineMoE: Modeling Fine-Grained MoE Residuals for Expert Prefetching in Serving. 2026.

[4] SpecMoEOff: Accelerating Mixture-of-Experts Inference via Speculative Expert Offloading. 2025-08-29.

## 主线三子章节 2：专家驻留、预取与动态平衡

父章节：`7. 主线三：MoE 为什么会把 host-side orchestration 推到前台`

本子章节聚焦：

- `FluxMoE`、`FineMoE`、`SpecMoEOff` 分别解决什么
- 它们如何回答 residency、prefetch、skew 和 latency hiding

当前提纲要点：

- FluxMoE
- FineMoE
- SpecMoEOff

如果上一子章节说明了 MoE 的系统收益为什么不会自动出现，那么这一子章节需要回答的就是：工业和学术界究竟试图怎样把这些收益“救回来”。观察近一轮代表性工作，会发现它们虽然实现路径不同，但都在修复同一条链：`route -> place -> move -> overlap -> rebalance`。也就是说，MoE serving 的关键不再是单次门控选择本身，而是专家在什么地方常驻、何时预取、如何隐藏 miss、以及如何缓和热点偏斜。

`FluxMoE`、`FineMoE` 和 `SpecMoEOff` 可以被看作这条链上的三种典型回答。它们分别强调：

- 如何解耦“逻辑专家身份”和“物理驻留位置”；
- 如何利用访问轨迹和统计规律把专家更合理地放在层级结构中；
- 如何在专家真正被需要之前，利用推测和重叠把 miss 的代价藏起来。

这三者共同说明，MoE 的 host-side orchestration 已经不再是粗糙的“缺哪个专家就搬哪个专家”，而是在朝着更系统化的 residency control 演化。

先看 `FluxMoE`。它最关键的贡献不是再做一次更聪明的预测，而是改变问题的表述方式。传统思路很容易把专家驻留问题理解成“尽量猜准下一个要用哪个专家”，然后把更多精力放在预测是否准确上。`FluxMoE` 的出发点更接近系统现实：预测当然重要，但在复杂、波动和多租户的服务环境里，单靠高精度预测并不稳健。更现实的路径是把“逻辑专家身份”和“物理驻留位置”松绑，让系统能够在不同内存层级之间动态流式化专家参数，并通过更带宽均衡的层次结构降低单次 miss 的惩罚。

这个改变很重要，因为它把问题从“能否完美预测”转成“能否让不完美预测也不至于太贵”。对 CPU 而言，这意味着职责发生了实质变化。CPU 不再只是等待 gate 结果之后去被动触发加载，而要主动维护一幅更广的驻留视图：

- 哪些专家应常驻在 GPU HBM；
- 哪些专家可以停留在主机内存中等待快速流式化；
- 哪些专家最近变热，应该上移；
- 哪些专家变冷，应该下移或延后回收。

在这个框架下，`residency` 不再是简单的二元状态，而更像一个多层级连续控制问题。也正因为如此，MoE 与 KV lifecycle 之间开始出现明显耦合：它们都在争夺 GPU HBM、主机 DRAM、链路带宽和 CPU 决策预算。`FluxMoE` 的价值，正是在于它公开地承认了这种争夺，并试图用更灵活的层级策略来消化它。

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| FluxMoE、FineMoE、SpecMoEOff 分别对应驻留解耦、细粒度预取和延迟隐藏三种路线 | `S008 S036 S037` | FluxMoE `3.0x`；SpecMoEOff `2.5x`；expert map / speculative offload 图 |
| MoE 的关键不是“缺哪个专家就搬哪个”，而是持续治理 route -> place -> move -> overlap -> rebalance 链 | `S008 S036 S037` | decoupled expert residency；trajectory-guided prefetch；speculative overlap |
| CPU 的新职责是维护驻留视图、热点预测和同步窗口，而非被动搬运 | `S008 S036 S037` | residency tiers；fine-grained residual modeling；latency hiding |

### 1. 本章核心判断

如果上一子章节说明了 MoE 的系统收益为什么不会自动出现，这一子章节要回答的就是：工业和学术界究竟怎样把这些收益“救回来”。观察近一轮代表性工作，会发现它们虽然实现路径不同，但都在修复同一条链：`route -> place -> move -> overlap -> rebalance`。也就是说，MoE serving 的关键不再是单次门控选择本身，而是专家在什么地方常驻、何时预取、如何隐藏 miss，以及如何缓和热点偏斜。[1][2][3]

### 2. FluxMoE：把“逻辑专家身份”和“物理驻留位置”解耦

`FluxMoE` 最关键的贡献不是再做一次更聪明的预测，而是改变问题表述方式。它公开承认：在复杂、波动和多租户的服务环境里，单靠“猜准下一个要用哪个专家”并不稳健；更现实的路径是把逻辑专家身份和物理驻留位置松绑，让系统能够在不同内存层级间动态流式化专家参数，并通过更带宽均衡的层次结构降低单次 miss 的惩罚。论文给出的最高结果是吞吐 `3.0x` over vLLM。[1]

这一步对 CPU 角色的意义很直接。CPU 不再是等待 gate 结果后触发一次加载，而要持续维护更广的驻留视图：

- 哪些专家应常驻在 GPU HBM；
- 哪些专家可停留在主机内存等待快速流式化；
- 哪些专家最近变热、应上移；
- 哪些专家变冷、应下移或延后回收。

### 图 1：FluxMoE 证明驻留控制本身就是一等系统对象

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/fluxmoe-01.png" alt="FluxMoE expert residency architecture" width="760">

图 1 支撑的不是某个局部 trick，而是一个更根本的判断：MoE 收益要兑现，系统必须先显式管理“专家此刻在哪一层级”。[1]

### 3. FineMoE：把热点从“噪声”变成可建模结构

`FineMoE` 的意义更偏向“如何理解和利用访问结构”。它强调热点并不是纯随机噪声，而往往具有轨迹性和相似性。某些语义区域、任务类型和批结构会更高概率地重复激活相近专家集合。只要系统能够捕捉这种结构，CPU 就可以把专家放置和预取从“见招拆招”提升为“基于访问图谱的主动布局”。[2]

这一步的工程价值在于，它把动态平衡从事后补救前移到了事前规划：部分热点可以被提前平滑，部分冷 miss 可以被转化成低优先级背景动作，部分批内不均衡也可以在进入关键路径前被削弱。

### 4. SpecMoEOff：把 offload 延迟藏进推测与重叠

`SpecMoEOff` 则提供了第三条路线：不是保证永远不 miss，而是在专家真正被需要之前，用 speculative decoding 与 offloading overlap 把 miss 的代价藏起来。它给出的最高收益是 decode throughput `2.5x`。[3] 这说明工业与研究界已经不再假设“完全避免 miss”才是唯一目标，更现实的目标是：**即便 miss 发生，也尽量不要让它完整暴露在主路径上。**

### 图 2：speculative overlap 的价值在于把 miss 从关键路径中挪走

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/spec-experts-01.png" alt="Speculative expert offloading overlap" width="760">

图 2 说明延迟隐藏已经成为 MoE control plane 的核心能力之一。它支撑本节的判断：CPU 不只是在管驻留，还在管“什么时候让状态移动不再阻塞 token 前进”。[3]

### 5. 这三条路线共同说明了什么

把三篇材料并列看，会得到一个很稳定的结论：

- `FluxMoE` 回答“专家应该怎样跨层级驻留”；
- `FineMoE` 回答“热点是否可以被提前感知并更细地预取”；
- `SpecMoEOff` 回答“即便 miss 发生，能否把它隐藏在重叠窗口里”。

三者共同说明，MoE 的 host-side orchestration 已经不再是粗糙的“缺哪个搬哪个”，而是在向更完整的 residency control 演化。

### 6. 小结

本节真正要立住的判断是：MoE 的下一代收益并不主要来自更聪明的 gate，而来自更聪明的驻留、预取与重叠。FluxMoE 的 `3.0x`、SpecMoEOff 的 `2.5x`，以及 FineMoE 对细粒度访问结构的建模，共同支撑一个稳健结论：**AI CPU 已经被推到需要持续维护专家状态图、热点预测与同步窗口的位置。**[1][2][3]

### 参考文献

[1] FluxMoE: Decoupling Expert Residency for High-Performance MoE Serving. 2026-04-03.

[2] FineMoE: Modeling Fine-Grained MoE Residuals for Expert Prefetching in Serving. 2026.

[3] SpecMoEOff: Accelerating Mixture-of-Experts Inference via Speculative Expert Offloading. 2025-08-29.

## 主线三子章节 3：MoE 路由动态平衡问题

父章节：`7. 主线三：MoE 为什么会把 host-side orchestration 推到前台`

### 1. 本章核心判断

MoE 在服务化推理里的关键 host-side 问题，不只是“冷 expert 怎么搬”，而是 **如何持续处理 expert skew**。一旦 expert 访问分布不均，系统瓶颈就会迅速从单次权重搬运，升级为 hot/cold expert residency、batch-level balance、topology-aware placement 和 cross-rank synchronization。这说明 MoE routing 已经从局部 gate 选择问题，演化成控制平面问题。[1][2][3]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| expert skew 比单次 cold miss 更能决定长期吞吐与尾延迟 | `S035 S036 S037` | wide expert parallelism；fine-grained residuals；speculative overlap |
| 动态平衡是跨 token、跨批次、跨时间窗的问题，因此天然回到 CPU / control plane | `S035 S036` | topology-aware placement；history-guided prefetch |
| 实际对抗 skew 的方法不是只改 gate，而是改 residency、拓扑和同步窗口 | `S035 S036 S037` | rack-scale placement；expert map；overlap hiding |

### 2. 为什么 expert skew 是比冷启动更棘手的问题

冷 expert miss 很容易理解：请求命中不在 GPU 上的 expert，于是 CPU 需要搬权重。但真实 serving 中更难的是 skew。

1. **热门 expert 会反复被打爆**
   - 即使大多数 expert 都能卸载，少数高频 expert 仍可能形成持续的驻留争夺。
2. **热门路径会拖垮拓扑**
   - 问题不只是哪张 GPU 上放哪个 expert，而是跨 GPU / 跨节点通信图会随热点路径失衡。
3. **批次内部会被热点拉斜**
   - 同一微批内 token 路由如果过于集中，会让一部分 worker 拥挤、另一部分空闲。

因此，真正难的问题不是“这次 miss 了哪个 expert”，而是**路由分布会不会长期把系统推向少数热点路径**。[1][2]

### 图 1：wide EP 的工业信号是“热点与拓扑”已经高于单次 miss

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/deepep-normal-dispatch.png" alt="DeepEP normal dispatch and expert topology" width="760">

图 1 用来支撑一个核心判断：当分发与聚合已经需要显式考虑拓扑和并行组织时，MoE 的主要难题就不再是局部装载，而是长期平衡。[1]

### 3. 为什么这天然是 CPU / control plane 问题

这类问题之所以会回到 host 侧，有三个原因。

第一，**平衡是跨 token、跨批次、跨时间窗的**。单次 gate 决策可以在模型内部完成，但 hot/cold residency、skew smoothing、历史轨迹复用这类事情，需要跨请求状态和策略记忆，更适合由控制面处理。[2]

第二，**平衡涉及拓扑与放置，而不仅是数学路由**。Wide EP 已经公开承认 MoE 的组织是 rack-scale 问题，意味着“把专家放在哪”与“让哪些 token 去找谁”要被一起考虑。[1]

第三，**平衡的目标本身是多目标的**。系统既要看平均吞吐，也要看尾延迟、链路拥塞和同步窗口。这样的折中天然更像调度问题，而不是纯模型问题。[1][2][3]

### 4. 动态平衡到底在平衡什么

从系统实现上看，MoE 动态平衡至少同时在处理四件事：

- 热专家是否应常驻更近层级；
- 当前微批是否被少数热点拉斜；
- 跨 rank 路由是否会拖慢后续聚合；
- 为了平衡而重排 placement，是否会引入新的迁移代价。

也正因如此，`FineMoE` 才会强调 fine-grained residuals 与历史轨迹，而 `SpecMoEOff` 会强调 overlap hiding。它们都在解决 skew，但切入点不同：一个试图提前感知热点结构，一个试图让热点代价不完整暴露在关键路径上。[2][3]

### 图 2：动态平衡的目标不是“绝对均匀”，而是减少热点路径的系统放大

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-wide-ep-moe-2025.webp" alt="Wide expert parallelism and topology-aware placement" width="760">

图 2 的重点不是展示某个固定拓扑，而是说明：一旦组织尺度升到 NVL72 / rack-scale，路由平衡就已经不可能只靠模型内部局部逻辑解决。[1]

### 5. 小结

MoE 路由的真正控制面问题，是如何持续消化 expert skew，而不是只处理偶发 cold miss。Wide EP、FineMoE 和 SpecMoEOff 共同说明：**只要热点、拓扑和同步链一起作用，动态平衡就天然需要 CPU 维护跨时间窗的状态与策略记忆。**[1][2][3]

### 参考文献

[1] Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack-Scale Systems. 2025-12-18.

[2] FineMoE: Modeling Fine-Grained MoE Residuals for Expert Prefetching in Serving. 2026.

[3] SpecMoEOff: Accelerating Mixture-of-Experts Inference via Speculative Expert Offloading. 2025-08-29.

第二，**平衡要同时看逻辑路由和物理放置**。  
同一个逻辑 expert，放在不同 GPU、不同节点、不同内存层，代价完全不同。  
这不是单个 kernel 能独立解决的问题。

第三，**平衡要和通信拓扑一起做**。  
MoE 一旦进入大规模系统，expert parallel、all-to-all、completion queue 和 link contention 都会被拉进来。CPU 比模型本身更适合掌握这类全局视图。

### 4. 现有材料给出的三条解决路线

#### 4.1 FluxMoE：把“逻辑身份”和“物理驻留”拆开

FluxMoE 的意义不只是更高吞吐，而是它把一个核心问题说清楚了：  
**路由逻辑和驻留位置不必一一绑定。**

一旦身份和位置拆开，系统就可以：

- 把热门 expert 放在更热的层级
- 把冷 expert 留在更便宜的位置
- 用更平滑的带宽方式做参数流式化

这本质上是在给 CPU 一个新的平衡控制杆：  
不是改 gate，而是改 residency。

#### 4.2 FineMoE：用 finer-grained expert map 追踪模式

FineMoE 的价值在于，它不把 expert 访问看成完全瞬时的随机过程，而是假设：

- 语义相近请求可能触发相近专家
- 历史轨迹可以预测未来访问模式

于是，CPU / control plane 就可以维护比“粗粒度热度计数”更细的 expert map，用于：

- 提前预取
- 降低 miss
- 让热点迁移更平滑

这说明动态平衡不只是实时反应，也可以是 **history-informed balancing**。

#### 4.3 SpecMoEOff：用 speculative overlap 藏延迟

SpecMoEOff 的关键洞察是：  
如果额外 token 计算本来就会发生，那么它可以被用来掩盖 expert offloading latency。

它不是直接解决 skew，而是提供另一条路：

- 不一定压平路由分布
- 但可以把热点路径上的搬运延迟部分藏在推测执行后面

这说明动态平衡的答案不一定全靠更精确的路由，也可能靠 **execution overlap**。

### 5. hot/cold expert、topology-aware placement 和 batch-level balance 是一组联立问题

这三件事不能分开看。

#### 5.1 hot/cold expert

决定哪些 expert 应常驻、哪些应流式化。  
如果判断错，CPU 会频繁触发无效搬运。

#### 5.2 topology-aware placement

决定这些 expert 放在什么物理位置最划算。  
即使热度判断对了，放错节点、放错链路位置，通信代价也会吃掉收益。

#### 5.3 batch-level balance

决定一批 token 如何组织，避免局部热点在单批或单时间窗内被放大。  
这一步做不好，GPU 利用率会出现“一部分过热、一部分闲置”的典型失衡。

因此，MoE 动态平衡的本质不是三道独立题，而是：

> `which expert stays where`, `which tokens go where`, and `how the resulting traffic fits the topology`

### 6. 工业界为什么会先吸收问题域，而不是直接照搬论文方案

从 Wide Expert Parallelism 这样的工业材料来看，工业界已经明确承认：

- expert routing 是批级组织问题
- placement 是机架级问题
- 通信图和拓扑必须一起考虑

但工业界目前吸收的方式仍然比较保守。  
更常见的是：

- 先把 Wide EP、placement、resident set 组织起来
- 再逐步吸收更细的 prefetch / skew / speculative overlap 技术

这很合理，因为论文方案往往优化单一维度，而工业系统必须同时满足：

- 吞吐
- 尾延迟
- 正确性
- 可运维性

### 7. 小结

本节真正想说明的是：

> MoE routing 的难点不是“当前 token 该去哪个 expert”，而是“长期来看，如何让 expert 访问分布、驻留策略和通信拓扑一起保持平衡”。

一旦按这个角度看，MoE 就不再只是模型结构问题，而会自然变成 AI CPU / control plane 的中心职责之一。

## 主线三子章节 4：工业界当前吸收到了哪一步

父章节：`7. 主线三：MoE 为什么会把 host-side orchestration 推到前台`

### 1. 本章核心判断

在 MoE 方向上，工业界已经明确吸收了 **问题域**，但还没有全面吸收 **论文形态的解法**。更准确地说，工业界已经承认 expert routing、placement、topology、residency 是系统关键问题，但当前主流吸收方式仍然更偏平台组织、runtime 结构和保守工程化。因此这一节真正要回答的，不是“工业界有没有做 MoE”，而是：**工业界已经把哪些 MoE 控制面问题当成现实问题来处理。**[1][2][3]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 工业界已明确吸收 expert topology、placement 和 route orchestration 这类问题定义 | `S035` | wide expert parallelism；rack-scale organization |
| 平台层 CPU 设计已经开始向更强的 orchestration / data movement 倾斜 | `S031 S032` | Vera `1.2TB/s`；`88` Olympus cores；Rubin/Vera role framing |
| 更细粒度的论文式预取与 speculative offload 仍处于“启发工业实现”阶段 | `S035 S031 S032` | 工业公开资料更多强调平台与组织，而非论文式细策略 |

### 2. Wide Expert Parallelism 是什么信号

Wide Expert Parallelism 的价值，不在于它给出某个局部优化，而在于它公开承认：

- expert organization 是机架级问题；
- 通信图和拓扑是第一等约束；
- 大规模 MoE 不是多几张 GPU 就能自动扩展。

这说明工业界已经把 MoE 从模型结构讨论推进成系统组织讨论。一旦到了这个阶段，CPU 的职责就不会再停留在“给 GPU 搬权重”，而会自然扩展到 route orchestration、resident set organization、topology-aware worker grouping 和 communication pacing。[1]

### 图 1：工业界首先吸收的是“问题域升级”，不是单篇论文技巧

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-wide-ep-moe-2025.webp" alt="Industrial wide expert parallelism" width="760">

图 1 的关键意义，是说明工业界已经把 MoE 视为跨 GPU、跨节点、跨机架的组织问题。只要问题域已经升级，CPU 角色就必然随之升级。[1]

### 3. 平台拓扑与 runtime 组织为什么先被吸收

工业界之所以先吸收这些，而不是先全面采用 `FineMoE` 或 `SpecMoEOff` 这类论文方案，原因很务实。

#### 3.1 平台拓扑是必须先解的问题

如果拓扑组织错了，再精细的预取和预测也会被跨节点通信代价吃掉。因此工业界优先吸收的是“专家如何分布到系统拓扑上”，而不是更细的算法策略。[1]

#### 3.2 平台 CPU 已经开始为 orchestration 角色预留规格

Vera 与 Rubin 相关材料之所以值得放在这章，不是因为它们直接实现了某个 MoE 论文，而是因为它们公开定义了 CPU 在 AI factory 中的新角色。Vera 提供 `88` 个 Olympus 核心和 `1.2TB/s` 内存带宽，Rubin 平台材料则明确把 Vera 描述成高带宽、低延迟的数据移动与编排引擎。[2][3] 这说明平台设计已经吸收了这样一个现实：host CPU 必须更擅长承担控制、状态与移动工作。

### 图 2：平台 CPU 规格本身已经在响应 orchestration 需求

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-vera-cpu-architecture.png" alt="NVIDIA Vera CPU architecture" width="760">

图 2 的意义不是证明 Vera 专为某篇 MoE 论文设计，而是说明工业平台已经开始把 CPU 当成控制和数据移动引擎来增强，而不是只当传统 host。[2][3]

### 4. 哪些东西还没有被完全吸收

工业界并没有完全照搬论文路线。像 `FineMoE` 的细粒度 residual 建模、`SpecMoEOff` 的 speculative offload、甚至更激进的 expert prefetch 策略，现阶段更多还处于“启发工业实现”的位置。主流公开资料更强调：

- 先把拓扑和并行组织理顺；
- 先把 resident set 与通信路径变得可管理；
- 再逐步吸收更细粒度的预测和 overlap 技巧。

这也是更稳妥的判断，因为目前公开产业材料确实更强地支撑“问题已被承认”，而不是“每条论文式解法都已广泛部署”。[1][2][3]

### 5. 小结

工业界已经明确吸收了 MoE 的问题域升级：专家不再只是模型内部稀疏选择，而是需要被组织、放置和调度的系统对象。Wide EP 是最直接的公开信号，Vera / Rubin 则从平台侧证明 CPU 规格正在朝 orchestration 倾斜。更细的论文式预取和 speculative offload 还未被全面公开吸收，但它们已经在塑造工业系统下一步该往哪里走。[1][2][3]

### 参考文献

[1] Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack-Scale Systems. 2025-12-18.

[2] NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories. 2026-03-16.

[3] Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer. 2026-01.
所以大规模平台最先关心的，往往是：

- expert 如何分布
- 哪些链路承载哪些通信
- resident set 如何划分

这类问题更接近架构地基，优先级天然更高。

#### 3.2 runtime 组织比新算法更容易增量落地

Wide EP、resident set management、pool organization 这类改动，通常可以在保持模型逻辑不变的前提下落地。  
相比之下，更激进的预取 / speculative / fine-grained map 方案往往涉及：

- 更强状态跟踪
- 更复杂预测逻辑
- 更多 correctness / regression 风险

工业界通常会先吸收“问题的组织方式”，再吸收“问题的激进解法”。

#### 3.3 工业界更怕尾部风险，而不是平均收益不足

论文可以追求平均 throughput、平均 speedup；  
工业系统更怕的是：

- route miss 带来的长尾
- 错误预取带来的浪费
- skew 判断失误带来的热点震荡

所以保守版的平台和 runtime 吸收路径更符合工业逻辑。

### 4. 工业界目前真正吸收到的三层内容

#### 4.1 第一层：承认 MoE 是 topology problem

这已经发生。  
Wide EP 明确把 expert parallel 的重点放到机架级组织上，而不是只讨论单个 expert GEMM。

#### 4.2 第二层：承认 MoE 是 residency problem

工业界已经接受，expert 的逻辑身份和物理驻留需要被当成系统对象处理。  
哪怕 FluxMoE 本身还不是工业默认能力，它要解决的问题已经被承认。

#### 4.3 第三层：逐步接受 MoE 是 control-plane problem

这一层正在发生，但还没完全成熟。  
它包括：

- route-aware placement
- resident set adaptation
- skew-aware balancing
- communication pacing

一旦这些能力被做成正式 runtime policy，MoE 才算真正完成工业控制平面化。

### 5. 为什么还不能说工业界已经全面采用 FineMoE / SpecMoEOff / FluxMoE

原因不是这些方向不重要，而是当前信号还不够强。

#### 5.1 FluxMoE

它解决的问题非常现实，但还没有足够强的公开产品信号说明它已成为主流 serving 默认能力。

#### 5.2 FineMoE

它代表更细粒度的 expert map 和历史轨迹预取，这是很合理的下一步；  
但工业界是否愿意承担更高的状态追踪和 map 维护成本，还缺更强证据。

#### 5.3 SpecMoEOff

它说明 speculative overlap 是一条值得走的路，但工业界还需要验证：

- 额外 token 工作负载值不值得
- 对不同模型是否稳定
- 对尾延迟是否真的有利

所以这几条路线目前更像：

- 工业界正在靠近它们
- 但还没有完全抵达它们

### 6. 为什么这一判断对综述很重要

如果不做这层区分，综述很容易犯两个错：

1. 把论文方向写成工业现状
2. 把工业问题写成论文尚未触及

更准确的写法应该是：

- 工业界已经采纳了 `MoE 需要 control plane` 这个判断
- 但工业界尚未普遍采纳所有论文中给出的最强解法

### 7. 小结

本节的核心结论是：

> 工业界在 MoE 方向上的真实状态，不是“还没做”，也不是“已经全做完”，而是已经把问题域系统化，并正在用更保守的平台与 runtime 方式逐步吸收论文里提出的更强机制。

这也解释了为什么后续平台章节里，AI 机头 CPU 会越来越像 `topology + residency + routing` 的组织器，而不是单纯 host。

## 主线四子章节 1：为什么 Agentic Inference 特别适合拆出 Prefill

父章节：`8. 主线四：PD 分离与跨池控制平面`

本子章节聚焦：

- prefill-first
- shared prefix
- remote prefill
- 为什么这些特征让 PD 分离在 agentic 语境中更有吸引力

当前提纲要点：

- prefill-first
- shared prefix
- remote prefill

`Prefill/Decode` 分离并不是一个对所有推理负载都同样有吸引力的部署选择。它之所以在近一轮 agentic inference 讨论中迅速升温，不是因为工程界突然偏爱更复杂的架构，而是因为 agentic workload 的形状恰好比传统单轮聊天更适合把 prefill 单独拆出来。要说明这一点，首先必须明确：prefill 的系统属性和 decode 并不相同，它们对算力、内存、带宽、状态和调度的要求存在结构性差异。

在传统、较平滑的 chat serving 场景中，请求往往可以粗略描述为“先做一次较重的前缀计算，然后进入较长一段稳定 decode”。虽然这类工作负载同样能从 PD 分离中受益，但收益未必足以覆盖额外的状态转移、KV 回传和调度复杂度。然而，agentic workload 改变了这个平衡点。它更常出现的是：高频短回合、多次重启、共享前缀反复出现、会话分支不断生成、工具 schema 和角色提示大面积复用、以及多模态输入导致的突发 prefill。于是，prefill 不再只是“每个请求的开头阶段”，而更像一种被频繁触发、形状多变、又高度值得优化的独立服务动作。

这可以从三个特征来理解。

第一，`prefill-first`。  
Agentic workload 下，系统更容易先被 prefill 打满，而不是先被 decode 打满。原因并不神秘。无论是 GUI agent、代码代理还是多子代理协同系统，请求往往都需要反复把新的上下文、上一步结果、共享模板、分支信息或视觉输入重新整理并送入模型。这些动作未必会产生很长的连续 decode，但会制造大量前缀计算。于是，系统的关键压力不再只是 steady-state token generation，而是一次次短促却昂贵的 prefill 启动、排队、落位和恢复。只要工作负载表现为“更多 prefill、较短 decode、频繁 resume”，prefill 就天然更适合被看成单独资源对象。

第二，`shared prefix`。  
Agentic 场景里，大量请求不是彼此完全独立的。它们往往共享 system prompt、agent role、tool schema、任务规范、对话历史前缀，或者至少共享长段相同模板。对于多子代理系统来说，这种共享会进一步放大：不同 subagent 可能在不同目标上行动，但其启动上下文、环境说明和公共知识前缀往往高度一致。只要共享前缀足够明显，prefill 的重复就不仅仅是可以优化，而是几乎一定值得专门优化。因为如果不拆出这部分工作，系统就会在最容易重复的地方一再支付最昂贵的成本。

第三，`remote prefill` 的现实性提高了。  
过去即便意识到 prefill 和 decode 的资源特征不同，把它们真正拆到不同节点或不同池上仍然常常受限于 KV 过大、带宽过高、状态传输不可承受。但在 2025H2 之后，随着 reduced-KV、hybrid attention、prefix reuse、early reuse 和分层 KV 管理路线逐渐成熟，prefill 结果不再像过去那样难以流动。也就是说，agentic workload 不仅在需求上更适合拆 prefill，在技术上也开始出现更现实的基础，使“远端做 prefill、本地做 decode”从理论构想转向可工程讨论的方案。

把这三点合在一起，agentic inference 就表现出一种很强的倾向：它把 prefill 从“每个请求的前半段”推成了“值得独立部署和独立调度的计算阶段”。而一旦阶段被独立出来，系统设计的重心也会变化。问题不再只是“如何加快本地 prefill”，而是：

- 哪些请求值得送去远端 prefill 节点；
- 哪些 shared prefix 可以在某个 prefill 池内长期保留；
- prefill 完成后的 KV 应如何回传、何时回传、回传到哪里；
- 若本地 decode 池繁忙，是否应延迟、合并或重路由某些 prefill 结果；
- 当 prefix reuse、cache affinity 和负载均衡冲突时，哪个目标优先。

这些都说明，agentic inference 并不是“顺便从 PD 分离获益”，而是在结构上推动 PD 分离变得更有吸引力。它把 prefill 的高复用性、高突发性和高阶段独立性同时放大了。结果就是：prefill 可以从一个附属阶段，转化为一个值得单独优化、单独放置、单独评估的服务角色。

这里还需要强调一个容易被忽略的点：agentic workload 对 prefill 的偏好，并不意味着 decode 变得不重要，而是意味着两者的优化边界开始明显分离。Decode 更关心持续 token 生成、低 jitter 和稳定尾延迟；prefill 则更关心共享前缀复用、批形成效率、上下文吞吐、状态回传以及跨池 placement。只要这两组目标不完全一致，分离就会变得合理。Agentic inference 恰恰放大了这种不一致，因此更容易为 PD 分离提供业务和技术上的双重正当性。

从 CPU 角度看，这一变化直接抬高了 host 侧复杂度。因为只要 prefill 能被单独拆出，CPU 就不再只是在单节点内部处理 queue、worker selection 和阶段切换，而需要开始回答跨节点、跨池甚至跨域的问题。它至少要决定：

- 哪一类请求适合 local prefill，哪一类适合 remote prefill；
- 哪些 prefix 值得跟随 prefill 节点保留，哪些应随 decode 池移动；
- 带宽紧张时应优先回传哪些状态；
- 当本地 decode 和远端 prefill 的节奏不同步时，如何避免状态过早或过晚到达。

这说明，agentic inference “特别适合拆出 prefill”的真正原因，并不只是它有很多长上下文，而是它把前缀计算变成了更独立、更重复、更突发、也更值得控制平面显式管理的对象。对于服务系统来说，这种变化很关键，因为它把优化问题从单节点加速推进成跨池编排；对于 AI CPU 来说，这种变化更关键，因为它把 CPU 的职责从本地阶段协调推进成分布式 prefill 控制。

也正因此，后续的 `Prefill-as-a-Service` 才不是凭空出现的新概念，而是这一负载形状自然推导出的下一步。先有 agentic workload 把 prefill 从隐含阶段推成独立对象，后有系统尝试把 prefill 节点化、服务化、跨池化。没有前者，后者就像过度设计；有了前者，后者反而变成顺理成章的演化。

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| agentic workload 比传统 chat 更容易呈现 prefill-first 形态 | `S001 S028 S029 S030` | `100` sub-agents；`1,500+` tool calls；visual / GUI multi-session 形态 |
| shared prefix 在多代理与工具链场景中是结构性存在，而不是偶然重复 | `S028 S029 S030` | 公共 role / tool schema / session trunk；`4.5x` sequential wall-clock reduction |
| remote prefill 之所以在 2025H2+ 变现实，是因为 reduced-KV、prefix reuse 与 KV lifecycle 已经到位 | `S001 S029 S030` | PD/PraaS 架构图；visual-agent burst；跨池恢复逻辑 |

### 1. 本章核心判断

`Prefill/Decode` 分离并不是一个对所有推理负载都同样有吸引力的部署选择。它之所以在近一轮 agentic inference 讨论中迅速升温，不是因为工程界突然偏爱更复杂架构，而是因为 agentic workload 的形状恰好比传统单轮聊天更适合把 prefill 单独拆出来。最关键的不是“上下文更长”，而是 agentic 负载同时具备 `prefill-first`、`shared-prefix-rich` 和 `remote-prefill-feasible` 三个特征。[1][2][3][4]

### 2. 为什么 agentic workload 更容易先被 prefill 打满

在传统 chat 场景中，请求往往是“一次较重 prefill + 一段相对稳定的 decode”。而 agentic workload 更常出现：

- 高频短回合；
- 多次 resume；
- 会话分支不断生成；
- 新上下文、工具 schema 和视觉输入持续注入。

这会让系统更容易先被 prefill 压满，而不是先被 decode 压满。Kimi Agent Swarm / K2.5 的公开形态就是最直接的证据：系统支持最多 `100` 个 sub-agents、`1,500+` tool calls，并给出相对顺序执行最多 `4.5x` 的 wall-clock 改善。[2][3] 这些数字背后的真实含义不是“工具调用很多”，而是**会话启动、共享前缀复用和上下文再进入会变得极其频繁**。

### 图 1：agentic workflow 的真正压力往往来自反复触发的前缀阶段

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/cpu-centric-agentic-workflow.png" alt="CPU-centric agentic workflow" width="760">

图 1 用来支撑一个核心转折：agentic 流程不是单次长 decode，而是反复发生阶段切换、状态恢复和前缀重入，因此 prefill 更容易成为第一类独立优化对象。[2][3][4]

### 3. shared prefix 为什么在 agentic 场景里更强

多代理系统往往共享 system prompt、agent role、工具 schema、环境说明、公共知识前缀和部分对话历史。也就是说，不同 subagent 目标虽不同，但启动上下文高度一致。只要共享前缀足够明显，prefill 的重复就不再是可有可无的小浪费，而会变成最值得专门优化的一段成本。

这也是为什么本综述把 prefix reuse 和 PD 分离放在同一主线内：只有当 shared prefix 是结构性存在时，把 prefill 抽成独立阶段、独立池甚至独立服务，才会从“过度设计”变成“顺理成章”。[2][3][4]

### 4. remote prefill 为什么在 2025H2 之后变得现实

过去即使意识到 prefill 和 decode 的资源特征不同，把它们真正拆到不同节点或不同池上仍常受限于 KV 太大、带宽太高、状态传输不可承受。但 `S001` 已经表明，PraaS 讨论的对象不再局限于同构单集群，而是跨数据中心、异构集群和商品以太网。[1] 这意味着工程界已经开始默认：只要前缀足够值钱、共享足够明显、回传路径足够可控，remote prefill 是可以被认真考虑的。

### 图 2：从 tool-call / branch-resume 视角看，prefill 已经像独立服务动作

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-tool-call-offload-prefetch.svg" alt="Agentic tool call prefill and offload workflow" width="760">

图 2 支撑本节的第三个判断：agentic 负载下的 prefill 已经更像被频繁触发、可独立调度的服务动作，而不只是每个请求开头顺便做的一段计算。[1][4]

### 5. 这为什么会直接抬高 CPU 复杂度

只要 prefill 能被单独拆出，CPU 就不再只是在单节点内处理 queue、worker selection 和阶段切换，而要开始回答跨节点、跨池甚至跨域的问题：

- 哪一类请求适合 local prefill，哪一类适合 remote prefill；
- 哪些 prefix 值得跟随 prefill 节点长期保留；
- 带宽紧张时应优先回传哪些状态；
- 本地 decode 与远端 prefill 节奏不同步时，如何避免状态过早或过晚到达。

因此，agentic inference “特别适合拆出 prefill”的真正原因，并不只是上下文长，而是它把前缀计算变成了更独立、更重复、更突发、也更值得控制面显式管理的对象。[1][2][3][4]

### 6. 小结

本节要收束出的结论是：**agentic inference 之所以特别适合拆出 prefill，不是因为它比传统工作负载“上下文更长”这么简单，而是因为它同时具备 prefill-first、shared-prefix-rich 和 remote-prefill-feasible 三个特征，使前缀计算天然更适合被独立部署和控制。** 这一结论已被 `100` sub-agents、`1,500+` tool calls、`4.5x` wall-clock 改善和 PraaS 的跨池化方向共同支撑。[1][2][3][4]

### 参考文献

[1] Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter. 2026-04-16/22.

[2] Kimi Introduces Agent Swarm: Let 100 AI Agents Work for You. 2026-04-11.

[3] Kimi K2.5: Visual Agentic Intelligence. 2026.

[4] Anthropic / OpenClaw / Mobile Use Agent materials as multimodal or multi-session shape evidence. 2026/current.

## 主线四子章节 2：从单集群 PD 到 Prefill-as-a-Service

父章节：`8. 主线四：PD 分离与跨池控制平面`

### 1. 本章核心判断

`Prefill-Decode Disaggregation` 的真正升级，不是把两类 worker 分开这么简单，而是它正在从单集群内部优化，演化成 **跨池、跨集群、甚至跨数据中心的控制平面问题**。`Prefill-as-a-Service` 是这一升级的最清晰信号。[1][2][3][4][5]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| PD 分离已经从“单集群角色拆分”升级为“跨池状态编排” | `S001 S002 S003 S015 S023` | throughput `+54%`；P90 TTFT `-64%`；相对朴素异构基线 `+32%` |
| 单集群 PD 主要解决 compute-bound prefill 与 memory-bound decode 的资源错配 | `S002 S015 S023` | ingress / prefill / decode worker 拆分；prefiller / decoder / proxy 架构 |
| agentic workload 把 KV handoff、pool selection、远端回传和带宽取舍推成 CPU 的核心职责 | `S001 S003` | KV-aware placement；priority scheduling；跨池 / 跨域 Prefill-as-a-Service |

### 2. 单集群 PD 解决的是什么问题

单集群 PD 的出发点比较直接：prefill 更偏 compute-bound，decode 更偏 memory-bound，把两者放在同一个池里容易互相污染。Kubernetes 的 disaggregated LLM inference 方案、LMCache 的 disaggregated prefill example，以及更审慎的 PD 边界讨论，共同把这套基础逻辑讲清楚了：ingress-router、prefill worker、decode worker 可以被拆开，prefiller / decoder / proxy 可以构成单机房内的阶段分工。[2][4][5]

在这一阶段，CPU 的新增职责还相对有限，主要是 ingress routing、pool selection 和 KV handoff。也就是说，它更像是**同一机房内的阶段拆分器**。

### 图 1：单集群 PD 的第一步是把 prefill 与 decode worker 角色分开

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/vllm-disagg-prefill-overview.jpg" alt="Disaggregated prefill/decode overview" width="760">

图 1 支撑的是基础阶段：PD 分离首先解决的是资源属性不匹配，而不是跨域控制。此时 CPU 仍主要处理本地 handoff。[2][4][5]

### 3. 为什么 agentic inference 会把单集群 PD 推向更远

agentic workload 会同时强化 prefill-first、shared prefix、高频 resume、多会话并发和更高的跨请求状态复用价值。于是，单集群 PD 的原始收益就会被进一步放大，但同时也会暴露出新的限制：

- 哪个 prefill 池更适合当前请求；
- 共享前缀应该留在哪个池里；
- prefill 结果回传时是否会压垮链路；
- decode 池的局部最优是否会与全局状态位置冲突。

这正是 `S003` 强调 KV-aware placement 与 priority scheduling 的原因。对于 agentic inference，阶段分离很快就不再只是 worker 角色分工，而会演化成状态位置与阶段位置的联合优化。[3]

### 4. PraaS 为什么是实质性升级，而不是换个名字

`S001` 给出的最强信号，是 PraaS 已把讨论对象扩展到跨数据中心、异构集群与商品以太网，并且给出定量收益：相对同构 PD 吞吐 `+54%`、P90 TTFT `-64%`，相对朴素异构基线吞吐 `+32%`。[1] 这说明 PraaS 的关键并不是“把 prefill 单独部署”这件事本身，而是：

- prefill 节点可以被当作共享服务；
- 状态回传可以跨池甚至跨域发生；
- CPU 需要做的已经不是本地 handoff，而是全局化 placement、带宽与优先级决策。

### 图 2：PraaS 的核心不是多一个池，而是多一层控制平面

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-k8s-disagg-serving-2026.webp" alt="Disaggregated serving on Kubernetes" width="760">

图 2 用来支撑一个更强的结论：一旦从单集群 PD 走向 PraaS，系统真正新增的是跨池协调层，而不是单纯更多 worker。[1][2][3]

### 5. CPU 的职责为什么会随之改变

从单集群 PD 走到 PraaS，CPU 的工作会从“做阶段 handoff”升级成“管理跨池状态生命周期”：

- 选择本地还是远端 prefill；
- 决定哪些 KV 值得跨池回传；
- 在带宽紧张时决定优先级；
- 在多个 decode 池之间根据状态位置重路由。

因此，PraaS 真正提出的问题不是“prefill 是否值得拆”，而是“CPU 是否有能力持续承担 distributed inference control plane”。[1][3]

### 6. 边界：为什么不是所有场景都应该走 PraaS

审慎材料 `S023` 也提醒了边界条件：PD 分离并非普适更优，额外复杂度、双份权重成本和更重的状态移动都可能吞掉收益。[5] 所以本节更准确的判断不是“PraaS 一定更好”，而是：

> 当 agentic workload 让 shared prefix、resume 和跨请求复用价值足够高时，PraaS 开始从理论构想变成工程上值得认真考虑的方案。

### 7. 小结

从单集群 PD 到 Prefill-as-a-Service 的演化，标志着系统优化对象已经从“阶段角色分工”升级成“跨池状态编排”。单集群 PD 解决资源错配，PraaS 解决更高层级的状态位置与阶段位置协同；而吞吐 `+54%`、P90 TTFT `-64%` 和异构基线 `+32%` 的结果，共同说明这不是概念包装，而是 AI CPU 职责边界被继续向外推的明确信号。[1][2][3][4][5]

### 参考文献

[1] Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter. 2026-04-16/22.

[2] Deploying disaggregated LLM inference workloads on Kubernetes. 2026-03-23.

[3] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.

[4] LMCache disaggregated prefill example. current.

[5] Prefill-Decode Disaggregation: Splitting the Two Stages of Inference. 2026-04-04.
因此它天然要求：

- 看哪里有更高价值的 prefix state
- 看哪里更适合保留共享上下文
- 看 decode 端未来是否更可能命中这些状态

这一步会把单集群 PD 的“阶段分离”推进成更强的 **state-aware service decomposition**。

### 5. 为什么这一步会显著抬高 CPU 的控制面价值

单集群 PD 里，CPU 主要做 stage routing；  
到 Prefill-as-a-Service，CPU 开始承担更复杂的事情：

1. **远端服务选择**
   - prefill 是不是该交给远端服务，而不是本地池

2. **状态回传协调**
   - 哪些 KV / prefix / context 要回传
   - 何时回传
   - 通过哪条路径回传

3. **跨域调度代价评估**
   - 带宽是否值得
   - 延迟是否可接受
   - reuse 是否足以抵消转移成本

4. **节点角色管理**
   - prefill 节点、decode 节点、remote prefill service node 的职责和预算不同

所以这一步最重要的含义不是“prefill 可以远程化”，而是：

> CPU 从本地阶段调度器升级成 distributed service orchestrator。

### 6. 为什么这还不是“默认答案”

虽然 Prefill-as-a-Service 很强，但它不能被写成已普遍落地的工业现状。  
原因也很明确：

- 它对网络和带宽的要求更高
- 对 cache-aware placement 的依赖更强
- 对 KV movement 和 transfer stack 的成熟度要求更高
- 只有在共享前缀、高复用、重 prefill 或 reduced-KV 模型场景下收益才足够明显

也就是说，它很可能是未来方向，但目前仍是 **强趋势、非默认**。

### 7. 与 reduced-KV / hybrid-attention 的关系

这条路线之所以在 2025H2 之后突然变得更可信，一个重要原因是模型结构变了。  
当 reduced-KV、hybrid-attention 让 KV 体积下降时，跨域 prefill 的主要约束会从“根本传不动”转向“调度值不值得、带宽够不够、状态放得对不对”。

因此，Prefill-as-a-Service 并不是孤立架构创新，而是：

- 模型侧 KV shrink
- 系统侧 PD 分离
- 控制面侧 cache-aware placement

三者共同推动的结果。

### 8. 小结

本节最重要的结论是：

> 从单集群 PD 到 Prefill-as-a-Service 的跃迁，本质上是把“阶段切分问题”升级成“分布式状态与服务编排问题”。

这一步一旦成立，AI CPU 的角色就不再只是推理节点的 host，而会自然扩展成分布式推理控制平面的一部分。

## 主线四子章节 3：这对 CPU 的直接要求

父章节：`8. 主线四：PD 分离与跨池控制平面`

### 1. 本章核心判断

一旦系统从单集群 PD 走向更强的跨池控制平面，AI CPU 的设计要求就会明显改变。它不再只是需要“足够的 host 核心”，而是需要成为一个能够稳定承担 transfer orchestration、KV movement、cache-aware placement 和 node-role specialization 的控制器。换句话说，Prefill-as-a-Service 真正提出的问题不是“再给 CPU 多几个核”，而是：**CPU 应该被设计成什么样，才能稳定地做 distributed inference control plane。**[1][2][3][4][5][6][7]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 分布式推理 CPU 的第一类需求是更强的 transfer stack，而不是更强的通用算力 | `S001 S003 S009 S014` | NIXL unified API；KV transfer；跨池 PraaS |
| 平台 CPU 已在为 orchestration / data movement 角色增配带宽与一致性互连 | `S031 S032 S033` | Vera `1.2TB/s`；Grace / Vera `1.8TB/s` NVLink-C2C；uniform memory access |
| AI CPU 的关键指标是尾延迟稳定性、并发 completion 能力、内存带宽与状态可见性 | `S001 S003 S008 S009` | KV-aware placement；non-blocking transfer；expert residency / state orchestration |

### 2. transfer stack：为什么网络与主机栈会直接变成 CPU 规格问题

单机时代，很多 host CPU 选择可以主要看通用算力；到了跨池推理，transfer stack 会变成更直接的设计约束。CPU 需要承担的事情包括触发和跟踪 KV transfer、处理 completion、管理 memory registration / pinning，以及协调 network、GPU、storage 之间的移动。NIXL 与 Dynamo 相关材料之所以重要，正是因为它们把这些动作统一成显式 API，而不是默认为“GPU 自己会解决”。[2][4]

这会直接推高对下面几个方面的要求：

1. **单核尾延迟稳定性**
   - completion handling 和调度线程很怕抖动。
2. **足够的主机并发能力**
   - 不是为了跑大任务，而是为了同时处理很多小控制任务。
3. **高带宽内存与一致性互连**
   - 只有这样，CPU 才能把状态目录、回传缓冲和 warm tier 管理做得足够平滑。

### 图 1：分布式推理 CPU 首先要变成 transfer orchestrator

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/cpu-gpu-unified-memory.webp" alt="CPU-GPU unified memory and transfer stack" width="760">

图 1 的价值在于强调：一旦状态需要跨池移动，CPU 面对的第一类硬约束就是如何稳定地驱动和观察 transfer，而不是如何多跑一点通用计算。[2][4]

### 3. 平台信号：为什么 Vera / Grace 这类设计值得放进这里

Vera、Rubin 和 Grace 的公开资料给了平台层的强证据。Vera 提供 `88` 个 Olympus 核心和 `1.2TB/s` 内存带宽；Grace / Vera 路线又强调 `1.8TB/s` 的 NVLink-C2C 一致性互连和 uniform memory access。[5][6][7] 这些数字之所以重要，不是因为它们自动等于“更适合 agentic AI”，而是因为它们正好对应了控制平面对 CPU 的三类新要求：

- 更高的 host memory 带宽，用来托住状态目录、回传缓冲和 warm tier；
- 更强的一致性互连，用来减少 CPU 与 GPU 之间状态可见性的摩擦；
- 更稳定的多核并发，用来承接大量小而频繁的调度与 completion 任务。

### 图 2：平台 CPU 规格已经在对齐 orchestration / movement 角色

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-vera-cpu-architecture.png" alt="NVIDIA Vera CPU architecture for AI factories" width="760">

图 2 支撑的是平台层的因果：当 CPU 被明确定位为数据移动与控制节点，带宽、核心组织和互连形态都会围绕这一角色变化。[5][6]

### 4. 为什么这不只是“多给几个核”

如果只把问题理解成“多几个核就够了”，会低估三个现实。

第一，**状态治理比纯算力更看重尾延迟稳定性**。调度线程一旦抖动，KV handoff、resume 和 placement 决策就会在主路径上被放大。[1][2][4]

第二，**控制面负载是小任务高并发，不是大任务低并发**。这要求 CPU 更擅长同时处理许多细粒度 completion、metadata 更新和优先级判断。[2][3][4]

第三，**AI CPU 需要同时服务 KV 与 MoE 两类状态对象**。KV lifecycle 和 expert residency 都在争夺同一组主机资源，因此 CPU 的价值在于做统一状态编排，而不是只跑某一类辅助逻辑。[2][3]

### 5. 小结

本节真正要收束的是一个规格判断：当系统进入跨池、跨集群、跨域的分布式推理阶段，AI CPU 的核心竞争力会从“通用 host 算力”转向“低抖动控制能力 + 高带宽状态承载 + 强一致性移动协同”。PraaS、Dynamo、NIXL、FluxMoE 和 Vera / Grace 平台材料共同说明，这已经不是推断性的未来要求，而是公开系统设计正在对齐的方向。[1][2][3][4][5][6][7]

### 参考文献

[1] Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter. 2026-04-16/22.

[2] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.

[3] FluxMoE: Decoupling Expert Residency for High-Performance MoE Serving. 2026-04-03.

[4] Enhancing Distributed Inference Performance with the NVIDIA Inference Transfer Library. 2026-03-09.

[5] NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories. 2026-03-16.

[6] Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer. 2026-01.

[7] Grace CPU Delivers High Bandwidth and Efficiency for Modern Data Centers. 2025-12-05.

3. **与 NIC / DPU 的拓扑友好性**
   - 否则 CPU 做出的路径决策会在物理数据面上被抵消

因此，transfer stack 不是“软件细节”，而是会反过来塑造机头 CPU 的 I/O 和 topology 要求。

### 3. KV movement：为什么 host memory 不再只是 DRAM，而是系统路径的一部分

跨池控制平面要求 CPU 不只是知道状态在哪儿，还要知道：

- 何时移动
- 向哪一层移动
- 是否值得移动

所以 CPU 选型开始需要同时考虑：

- 内存容量
- 持续带宽
- NUMA 行为
- pinning / mapping 成本
- 与 GPU / NIC 的距离

当 KV movement 进入关键路径时，“大内存”本身已经不够。  
系统更需要的是 **可被控制面稳定利用的大内存**。

### 4. cache-aware placement：为什么调度器需要更像状态调度器

跨池控制平面下，placement 不再只是“把请求发给一个空闲 worker”。  
它需要同时评估：

- 哪里有 prefix / KV
- 哪里有更便宜的恢复路径
- 哪里更适合保留共享上下文
- 哪里的带宽更够用

这意味着 CPU 需要持有的不只是 worker health view，而是：

- state location view
- reuse value view
- path cost view

因此，cache-aware placement 会直接推动 CPU 软件栈向更重的元数据控制面演化。

### 5. remote prefill node：为什么节点开始分角色

Prefill-as-a-Service 的直接工程后果之一，是节点角色开始明显分化。  
至少会出现：

- prefill-heavy ingress node
- decode-heavy serving node
- capacity-oriented state node
- coordination-heavy swarm node
- remote prefill service node

其中 `remote prefill node` 的 CPU 需求尤其特别：

- 它不一定最重视 decode steady-state
- 它更重视长上下文 prefill 吞吐
- 更重视带宽感知调度
- 更重视和缓存状态、远端 decode 池的协同

这说明“统一主机规格”会越来越不合理。  
AI 推理机头 CPU 的选型开始天然依赖节点角色。

### 6. 这会把 CPU 设计目标推向哪些方向

如果把这些要求收敛一下，可以得到更具体的设计目标：

#### 6.1 更高的 per-core bandwidth

因为很多控制动作不是纯算力问题，而是 memory / metadata / queue / event path 的稳定吞吐问题。

#### 6.2 更强的一致性与近端互连

因为 state movement 和 resume path 越来越依赖 CPU 与 GPU、NIC、memory tiers 之间低摩擦协作。

#### 6.3 更稳定的多租户行为

因为 control-plane CPU 最怕 jitter，不只是怕平均慢。

#### 6.4 更明确的与 DPU / SuperNIC 协同

因为不可能把所有数据面和控制面都堆在 CPU 上，必须有人帮它让路。

### 7. 为什么这一节和厂商路线图是直接相连的

这一章讲的是系统要求；  
后面的厂商章节会看到，这些要求已经开始在平台设计中具象化：

- Vera：高 per-core bandwidth、强 CPU-GPU coherence
- AMD：开放式 balanced host + AI rack
- Intel：host-and-action hub
- Arm AGI CPU：deterministic orchestration silicon

也就是说，PD 分离和 Prefill-as-a-Service 对 CPU 的要求，不只是理论推演，而是已经开始反馈到产品定义上。

### 8. 小结

本节最重要的结论是：

> 一旦推理系统进入跨池、跨角色、跨层级状态编排阶段，AI CPU 的设计目标就会从“通用 host CPU”转向“分布式推理控制平面 CPU”。

而 `transfer stack + KV movement + cache-aware placement + remote prefill node`，正是这一转变最具体的四个落点。
