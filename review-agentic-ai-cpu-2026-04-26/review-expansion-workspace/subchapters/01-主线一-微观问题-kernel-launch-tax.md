## 主线一子章节 1：微观问题：Kernel Launch Tax

父章节：`5. 主线一：算子下发为什么从 launch overhead 变成调度墙`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| launch tax 在小模型、量化模型和动态 serving 中会从背景噪声变成关键路径 | `S005 S038 S039 S040` | `19x` dequeue amplification；`1.7x` throughput；graph capture / dynamic megakernel 图 |
| CPU slowdown 不是局部噪声，而会沿多 GPU 同步链被放大 | `S005` | `2603.22774_summary.png`、`2603.22774_sync-barrier.png` |
| 图化与 persistent runtime 的价值，来自减少反复的 host 提交动作，而不是单纯“编译更快” | `S038 S039 S040` | `piecewise CUDA graphs`、`FULL_AND_PIECEWISE`、`dynamic megakernels` |

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

![CPU slowdown summary](../../assets/extracted-figures-all/s005/2603.22774_summary.png)

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

![vLLM CUDA graphs modes](../../assets/extracted-figures-all/S039/s039-docs-vllm-ai-vLLM%20CUDA%20Graphs%20Design%20Document_page_0008-08.png)

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
