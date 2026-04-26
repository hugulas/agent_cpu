# Agentic AI 推理负载特征对 AI CPU 的影响

## Status

- Research status: `initialized`
- Output directory: `material/`
- Current scope: `CPU 为大模型推理请求服务的场景`
- Explicit exclusion: `CPU 作为工具调用沙箱`

## Planned Deliverables

1. `search-directions.md`
2. `reading-log.md`
3. 本报告

## Progress Snapshot

- Initialized `13` search directions
- Completed first deep pass on `D03 Prefill/decode disaggregation and Prefill-as-a-Service`
- New direction added from reflection: `D13 Hybrid-attention and KVCache shrink as deployment enabler`
- Additional searched directions: `D02`, `D04`, `D05`, `D06`, `D12`, `D13`
- New direction added from reflection: `D14 Non-NVIDIA transfer/control-plane alternatives`
- Additional searched direction: `D14`
- Additional searched directions: `D10`, `D11`
- Additional searched directions: `D07`, `D08`
- Additional searched directions: `D15`, `D16`, `D17`
- Inspected sources logged so far: `40`
- Kept sources logged so far: `37`

## Early Finding: Prefill-as-a-Service materially changes the CPU story

当前最重要的新证据不是“prefill 更重要”，而是 `Prefill-as-a-Service` 把这一点推进到了新的部署边界。其核心含义有三条：

1. `PD disaggregation` 正从单集群内优化，外延到 `cross-datacenter + heterogeneous clusters + commodity Ethernet`。
2. 机头 CPU 的职责不再只是本地的 `stage transition` 和 `worker selection`，而要进一步承担 `bandwidth-aware scheduling`、`cache-aware request placement` 与 `cross-domain KVCache transfer coordination`。
3. 工程上应新增一种值得单独研究的节点角色：`remote prefill service node`。

这意味着先前把 CPU 问题理解成“本地 host 为 GPU 提供服务”的框架已经不够。至少在新一代 hybrid-attention / reduced-KV 模型下，CPU 正在转向更明显的分布式控制平面角色。

## Why this matters for the topic

围绕“agentic AI 推理负载特征对 AI CPU 的影响”这个课题，`Prefill-as-a-Service` 的价值不只是给出一个更先进的 serving 架构，而是把下列三件事连在了一起：

1. `负载特征`
   - agentic workload 往往包含长上下文 prefill、频繁 resume、burst arrival、prefix reuse 不均、会话长度高度偏斜
2. `模型结构变化`
   - hybrid-attention / reduced-KV 架构降低了 KVCache 体积，使“远端 prefill + 本地 decode”从不现实变为可讨论
3. `CPU 角色变化`
   - CPU 不再只负责本地阶段切换与请求排队，而要做跨域调度、prefix cache 感知放置、带宽感知卸载和回传协调

因此，这条证据直接增强了一个更强的判断：

> 在 agentic inference 下，AI CPU 的关键价值不是陪跑 GPU，而是作为分布式推理控制平面，负责把“请求形状变化”翻译成“算力、缓存、带宽和节点角色的动态编排”。

## Current synthesis

基于当前已核到的一手与强二手材料，可以先得出 5 条阶段性判断：

1. `prefill-first` 压力被普遍低估。
   - 过去容易把 CPU 理解为 decode 陪跑，但 agentic workload 下，真正先打满 host 的往往是高频 prefill、输入重整、resume 和阶段切换。

2. `PD 分离` 已经从集群内优化演化为跨域部署问题。
   - 一旦 prefill 被服务化，CPU 不只是做本地路由，而是要决定是否远端 prefill、何时回传 KV、哪些 prefix cache 值得留在本地。

3. `KVCache shrink` 会改变 CPU 的职责上限，而不是削弱 CPU 的重要性。
   - Kimi Linear 这类工作降低 KVCache 体积后，约束从“带宽完全不够”转向“是否能把调度、放置与回传做对”。

4. `remote prefill service node` 值得作为独立节点角色研究。
   - 这类节点对 CPU 的要求与普通 GPU node 不同，更偏长上下文 prefill 吞吐、带宽感知调度、cache-aware placement 和跨域回传稳定性。

5. `AI CPU` 的问题已经开始从 `intra-cluster orchestration` 扩展到 `cross-cluster orchestration`。
   - 这会显著抬高网络、缓存、调度和状态系统的耦合程度，也意味着单看本地 kernel launch 或单机 host 配置已经不够。

## New findings from the second search tranche

这一轮补进来的材料把结论又压实了 4 个方面：

1. `CPU slowdown` 提供了底层因果。
   - 它证明多 GPU serving 中，CPU 抖动会通过同步链被放大，因此 agentic workload 里的高频阶段切换和多会话压力并不是“会增加一点开销”，而是很容易把 host 推入真正关键路径。

2. `KV lifecycle` 方向已经形成比较完整的三段证据链。
   - `Dynamo` 说明访问模式在变；
   - `NOSA` 说明 locality engineering 决定 CPU-GPU transfer 是否还能忍受；
   - `ScoutAttention` 说明 CPU 甚至可以前移成 layer-ahead 协同计算者。

3. `MoE` 方向已经能支撑“KV 与 expert 竞争同一组 host 预算”的判断。
   - `FluxMoE` 直接给出 decoupled expert residency 这一机制，说明 GPU memory 正在被重新分配给更关键的 runtime state。

4. `prefix cache / cache-aware placement` 方向开始和 `PrfaaS` 接上了。
   - `vLLM prefix caching` 给了机制基线；
   - `prefix-aware routing` 与 `Ray PrefixCacheAffinityRouter` 说明在分布式场景中，CPU/路由器必须持有近全局的 cache 视图，或者至少维护足够好的近似视图。

5. `非 NVIDIA` 证据开始出现，结论不再只绑在单一生态上。
   - `LMCache` 已给出 disaggregated prefill 工作流；
   - `Ray Serve` 已把 `prefix-aware routing` 做成显式路由策略；
   - 这说明“控制平面前移”并不是单厂商叙事，而是跨框架共同暴露出来的需求。

6. `benchmark` 方向开始清楚了。
   - 传统 `TTFT / ITL / TPS / RPS` 仍必要，但不足以刻画 agentic inference 下的 AI CPU 作用；
   - 后续必须引入 `dispatch latency`、`resume latency`、`burst robustness`、`cache-affinity quality` 这类状态系统指标。

7. `skeptical/counterevidence` 没有推翻主结论，但修正了它的边界。
   - 反方更像是在提醒：PD 分离、远端 prefill、cache-aware routing 都有复杂度和传输成本，不是所有工作负载都应照单全收；
   - 因而最终结论必须写成“AI CPU 在特定负载形状下进入关键路径”，而不是“AI CPU 永远是主瓶颈”。

8. `real product workloads` 与 `platform signals` 已经开始闭环。
   - 产品形态侧，Claude Code、Kimi Agent Swarm、OpenClaw、Mobile Use Agent 已足够稳定地暴露 `session multiplicity`、`fan-out/fan-in burst`、`multimodal ingress` 等约束；
   - 平台侧，Grace/Vera/Rubin/BlueField 的路线图已经在按高带宽主机内存、近端一致性互连、数据面旁路和一体化平台组织 CPU 角色。

9. `sparse attention / sparse KV access` 方向把“少搬数据”和“更难管理状态”同时抬了出来。
   - `NOSA` 与 `ScoutAttention` 说明稀疏 attention 的收益来自减少 CPU-GPU KV 传输和前移部分计算；
   - TensorRT-LLM 的 KV reuse 材料则说明，一旦系统开始依赖 `priority retention`、`event-driven reuse` 和 `early reuse`，CPU 就必须维护更细粒度的生命周期元数据与事件控制。

10. `MoE routing dynamic balance` 不是附属优化，而是 host-side orchestration 的组成部分。
   - `Wide Expert Parallelism` 说明 expert routing 已经上升为批级与机架级组织问题；
   - `FineMoE` 与 `SpecMoEOff` 进一步说明，CPU 不只搬专家，还需要通过 expert map、轨迹相似性和 speculative overlap 去平滑 hotspot、降低 miss 并隐藏传输延迟。

11. `operator graphification` 的收益与代价都已经清楚到值得单独建模。
   - `vLLM V1` 与 `Event Tensor` 说明 piecewise/full CUDA Graphs、persistent kernels、dynamic megakernels 的确能压低 dispatch tax；
   - 但它们也会引入 capture memory、warmup、fallback path 和 backend compatibility 的服务化代价，因此不能把“图化编译”简单写成单向收益。

## Strengthened interim thesis

基于目前已经搜到并保留下来的材料，课题的阶段性总判断可以进一步收紧为：

> agentic AI 推理负载对 AI CPU 的影响，已经不能只用“更多 prefill、更多 KV、更多调度”来概括；更准确的说法是，agentic workload 正在把 AI CPU 从本地 host 推向分布式推理控制平面，负责在 `compute / cache / bandwidth / topology / node role` 之间做持续编排。

这个判断目前主要由 13 条证据链共同支撑：

1. `CPU slowdown`：控制动作延迟会被多 GPU 同步放大。
2. `PD disaggregation`：prefill/decode 已经结构性分离。
3. `Prefill-as-a-Service`：prefill 已服务化并跨域化。
4. `KV lifecycle`：状态对象需要长期放置、恢复与重用。
5. `prefix-aware routing`：CPU/路由层必须维护 cache locality。
6. `MoE residency`：KV 与 expert 开始竞争同一组 host 预算。
7. `framework-level control-plane convergence`：NVIDIA Dynamo/NIXL、LMCache/vLLM、Ray Serve 都在把 prefill 分离、KV transfer、prefix-aware routing 和 cache affinity 推向显式控制面能力。
8. `benchmark mismatch`：传统通用 inference benchmark 还不能充分测出 agentic workload 下 CPU 的真实作用。
9. `real workload shape evidence`：Claude Code、Kimi Agent Swarm、OpenClaw、Mobile Use Agent 已足够说明 agentic 请求并不服从“单上下文、长 decode、平滑批次”的理想模型。
10. `platform co-design signals`：Grace/Vera/Rubin/BlueField 正在为 orchestration、data movement 和 coherent memory access 重新组织 CPU 角色。
11. `sparse attention / sparse KV access`：host 侧职责正从“大块搬运”转向“选择、保留、预取、恢复”。
12. `MoE dynamic balance`：CPU 必须处理 expert skew、hot/cold residency 和 topology-aware balancing，而不只是冷启动搬运。
13. `graphification tradeoffs`：图化编译已经能减少 dispatch tax，但会把复杂度转移到 capture、warmup 和动态回退路径。

## Directions still to search deeply

当前还未完成、但对最终结论很关键的方向包括：

- `D14` non-NVIDIA transfer/control-plane alternatives 的进一步 production 化证据
- `D15-D17` 的更多 production 指标，尤其是 sparse KV policy hit quality、expert skew tail latency、graph fallback frequency

## Current risk assessment

虽然材料已经比起点扎实很多，但目前仍有 3 个风险需要控制：

1. `production data` 仍不足
   - 很多方向已经有强机制证据，但缺少大规模线上指标

2. `Moonshot/Kimi official serving disclosures` 仍偏少
   - `Kimi Linear` 和 `PrfaaS` 已经补上，但还缺更多一手工程细节

3. `benchmark framing` 还未完成
   - 虽然指标草图已经出来，但还没有形成更完整、可执行的 AI CPU 评估框架

4. `product-to-metric gap` 仍明显
   - 产品形态已经能反推约束，但公开材料仍缺更细的 `resume latency`、`prefix locality`、`cache hit quality`、`warm-tier hit` 数据

5. `serving tradeoff quantification` 仍不足
   - 稀疏 attention、动态图化、MoE 平衡这些方向已能说明机制，但它们在真实服务中的代价函数还缺更细的公开数据，例如 capture memory tax、expert skew miss tail、event-metadata overhead

## New topical insights added in this extension

### 1. Sparse attention 不是单纯“少算”，而是把 CPU 推向细粒度状态编排

这轮补充材料后，可以把 sparse attention 的系统含义说得更明确：

- `NOSA` 代表的是“让稀疏 attention 原生适配 offloading”，重点不是数学稀疏性本身，而是显式约束 CPU-GPU KV 传输量
- `ScoutAttention` 进一步把 CPU 从纯搬运者推成 `layer-ahead` 的协同计算者
- 到 TensorRT-LLM 的 KV reuse / event API 这一步，工业 serving 栈已经在把 `retention / eviction / reuse / event-driven callbacks` 做成显式策略对象

所以 sparse attention 在服务化推理中的真实价值是双面的：

- **收益：**
  - 降低每步必须搬运的 KV 数据量
  - 给 pause-resume、warm-tier、远端 prefill 留出更现实的带宽预算
  - 让 CPU 可以在更可控的流量下提前预取、恢复和共享状态
- **代价：**
  - CPU 需要维护更细粒度的 block / token / event 元数据
  - policy 做错时，稀疏访问会带来新的 miss、误预取和恢复抖动
  - 稀疏 attention 的收益越来越依赖 locality engineering，而不只是算子本身

### 2. Sparse KV access 把 KV 管理从“存放问题”推进成“访问 policy 问题”

如果只看容量，KV 卸载主要是存储分层问题；但加入 sparse access 之后，CPU 的压力会进一步转向：

- 哪些 token range 更值得保留
- 哪些 block 应被优先回收
- 哪些事件应触发早复用或延迟复用
- 哪些 prefix / session 值得做高优先级 warm retention

这意味着 CPU 在 agentic inference 里不只是 warm-tier manager，还是 `KV access policy engine`。这条线和 `prefix-aware routing`、`resume latency`、`agent-aware retention` 会自然合并。

### 3. MoE 路由动态平衡的关键不只是预取，而是处理 skew

现有材料已经足以支持更强的判断：MoE 在服务化推理里的 host 问题，核心不只是“冷 expert 怎么搬”，而是：

- 热点 expert 会不会反复拥塞某些 GPU 或某些链路
- expert 访问轨迹能否被历史模式或语义相似性捕捉
- CPU 能否提前把 hot/cold residency 调整到更合适的层级
- speculative overlap 能否把搬运延迟藏在额外 token 计算背后

因此，`FineMoE`、`SpecMoEOff`、`Wide Expert Parallelism` 共同说明，MoE 路由已经从单 token gate 选择问题上升成 `batch-level balance + topology-aware placement + expert cache policy` 问题。

### 4. 算子图化编译在服务化推理中的利弊都很明确

这轮扩展后，图化编译不应再被写成“更高级的优化”。更准确的说法是：

- `vLLM V1` 的 piecewise CUDA Graphs、persistent batch 和 CPU overhead reduction 说明，图化确实可以显著压低 dispatch tax
- `Event Tensor` 说明更激进的 dynamic megakernel / persistent-kernel 路线可以进一步减少 kernel boundary synchronization

但在服务化推理里，它们至少有四类代价：

1. `capture memory tax`
   - 图化往往要求预留更大的静态内存区域，不利于高度动态的多租户 serving
2. `warmup and compilation overhead`
   - 首次 capture、图构建与形状适配本身会吃掉服务启动或冷热切换时间
3. `dynamic shape fallback`
   - mixed prefill/decode、多模态输入、极端 batch 变化下，系统很容易退回 eager 或 piecewise 模式
4. `backend compatibility`
   - 某些 attention backend、通信模式或定制 kernel 不一定能被统一纳入图化路径

所以图化编译的本质是：**用更重的前期结构化约束，去换更低的稳态 dispatch 开销。** 对 agentic workload 来说，它很有价值，但不可能无条件替代 runtime scheduling。

### 5. Prefix cache 只是第一代复用技术，后续真正重要的是“谁看到缓存、谁留住缓存、谁把请求送到缓存边上”

这轮补充后，可以把 `prefix cache` 放回更长的技术演化链里看：

#### 5.1 第一阶段：Automatic Prefix Caching

`vLLM Automatic Prefix Caching` 代表了第一代通用技术形态：  
系统通过 block 级 hash 匹配去识别完全相同的前缀，从而复用既有 KV，减少 prefill 重算。

这一阶段的意义在于：

- 首次把 `prefix reuse` 变成 serving runtime 的内建机制
- 证明跨请求复用不是产品层技巧，而是推理系统能力
- 给 agentic workload 里的 system prompt、tool schema、shared context 复用提供了低门槛入口

但它的边界也很清楚：

- 主要依赖 **exact or near-exact shared prefix**
- 更像“命中了就赚”，还不是全局状态编排
- 没有解决“请求该送到哪台已有缓存的 worker”这个分布式问题

#### 5.2 第二阶段：Prefix-aware routing / cache affinity

一旦 prefix cache 从单机扩展到多 worker / 多 executor，问题立刻变了。  
`Ray PrefixCacheAffinityRouter`、prefix-aware routing 文档和相关实现说明，系统必须在两个目标之间权衡：

- 把请求送去最可能命中 prefix cache 的地方
- 避免把流量全压到少数热点 worker

所以 prefix cache 的下一步不是更快的哈希，而是：

- `cache affinity`
- `router-side cache view`
- `load balance with locality`

这一步对 CPU 的含义很直接：  
**CPU 不再只是运行 prefix cache 数据结构，而是必须维护近全局的缓存可见性，并把它变成路由决策。**

而且这一步已经开始出现明确的工程参数。Ray 的实现把 `locality vs load-balance` 的折中显式暴露为阈值和回退逻辑，例如默认 `match_rate_threshold = 0.1`，当 prefix 匹配信号足够强时优先走 cache affinity，不足或负载失衡时退回更通用的 P2C 路由。这说明 prefix cache 已经不再是“命中就用”的被动机制，而是进入了 **可调度、可调参、可退回** 的控制面阶段。

#### 5.3 第三阶段：Selective retention / event-driven KV reuse

再往后，问题从“命中了哪些缓存”转向“哪些缓存应该被留下来”。  
`TensorRT-LLM` 的 KV cache reuse 优化说明，工业 serving 栈已经开始把：

- `priority-based eviction`
- `selective retention`
- `KV cache event API`
- `early reuse`

做成显式策略能力。

这意味着 prefix cache 不再只是查表命中问题，而是进入 **生命周期控制** 阶段。  
CPU 在这里承担的是：

- 维护更细粒度的 cache state
- 响应事件并调整 retention policy
- 决定哪些 prefix / token range / session state 值得保留
- 把 reuse policy 与 routing、resume、warm tier 放到一套控制逻辑里

这条线还出现了两个值得单独记住的演化信号：

1. `event-driven cache view`
   - vLLM 已经把 KV block 状态暴露成事件流，例如 `BlockStored`、`BlockRemoved`、`AllBlocksCleared`
   - 这意味着 cache state 开始从“本地内存表”走向“可以被外部控制器订阅的系统事件”
2. `finer-grained early reuse`
   - TensorRT-LLM 更早一代的 early reuse 工作说明，前缀复用不只取决于“有没有相同 prefix”，还取决于“多早能开始复用”
   - 在 burst 的系统提示场景里，early reuse 可带来最高 `5x` 的 TTFT 改善；把 block size 从 `64` 降到 `8` token 又可带来最多 `7%` 的额外 TTFT 改善

这两点合起来说明：  
prefix cache 之后，真正重要的不是更大的缓存，而是 **更早的复用时机 + 更可见的缓存状态 + 更细粒度的保留策略**。

#### 5.3.1 真实工程信号：prefix cache 的代价开始体现在“脏缓存、保留策略、身份定义和波动性”上

除了正向机制材料，现有 issue 和实现讨论也开始暴露 prefix cache 的真实代价，这些代价对 AI CPU 的含义很直接：

1. `dirty cache impact`
   - 工程反馈已经指出，prefix cache 的收益不仅取决于“有没有共享前缀”，还取决于 block 释放次序、free-list 行为和脏缓存残留对后续命中的影响
   - 这说明 CPU 侧不仅要维护 cache view，还要维护 **cache hygiene**
2. `persistent / pinned prefixes`
   - 用户持续提出“高价值前缀应常驻”的需求，反过来证明单纯 LRU eviction 已经不够
   - 一旦系统开始支持 pinned prefixes，CPU 就必须承担更强的优先级和驻留预算管理
3. `performance instability`
   - 真实反馈表明，prefix cache 下 first-token latency 可能在 `50ms` 到 `500ms+` 之间显著波动
   - 这意味着命中本身不是最终目标，**稳定命中与稳定恢复** 才是服务化推理真正关心的指标
4. `multimodal cache identity`
   - 在多模态场景中，仅用文本前缀做 cache identity 可能导致错误复用
   - 这对 agentic workload 尤其重要，因为 GUI / mobile agent 的视觉输入会频繁变化，但文本指令骨架往往相似

因此，prefix cache 的下一阶段不只是更强的复用，而是更严的 **cache identity design + retention policy + state hygiene control**。

#### 5.4 第四阶段：从 prefix cache 到 agent-aware reuse

放到 agentic inference 里，prefix cache 的地位会进一步变化。  
真实负载并不只是“多个请求共享同一个长 system prompt”，还包括：

- subagents 共享一部分工作上下文
- 多轮 pause-resume 共享同一会话主干
- fan-out/fan-in 过程中多个分支共享上游 context
- multimodal ingress 之后部分文本前缀稳定、部分状态对象动态变化

所以 prefix cache 在 agentic workload 中最终会演化成更宽的复用问题：

- shared-prefix reuse
- session-trunk reuse
- branch-aware reuse
- agent-aware retention

前缀缓存仍然是入口，但系统真正难的是：  
**如何让复用对象从“完全相同的前缀块”扩展到“值得保留和调度的状态对象”。**

#### 5.5 这一技术链对 AI CPU 的直接影响

把这几代技术串起来后，AI CPU 的角色可以更具体地定义为：

1. `cache index keeper`
   - 维护 block、prefix、session 和 worker 之间的映射
2. `affinity router`
   - 在命中率与负载均衡之间做折中
3. `retention policy engine`
   - 决定哪些缓存留下、哪些回收、哪些下沉到 warm tier
4. `event-driven reuse coordinator`
   - 把 reuse、resume、prefetch、迁移接到同一条控制链上

因此，对这个课题而言，prefix cache 不应被视作一个小优化点。更准确的理解是：

> `prefix cache` 是 agentic inference 里“状态复用控制平面”的第一代实现；它之后的相关技术，本质上都在把复用从 `exact-prefix hit` 推向 `routing-aware, policy-aware, lifecycle-aware state reuse`。

进一步说，这条线在 2025H2 之后最值得继续追踪的，已经不是“prefix cache 有没有”，而是：

- `router 是否真的看到了 cache state`
- `retention policy 是否能识别高价值 session trunk`
- `event stream 是否足够快、足够便宜`
- `metadata overhead 是否开始反吃掉复用收益`

这四个问题会直接决定 prefix cache 技术链最终是在 agentic serving 里成为核心控制平面，还是停留在局部优化。

目前从已有材料可以再加一条更硬的判断：

> `prefix cache` 的瓶颈已经开始从“如何命中”转向“如何让命中的收益稳定、正确、可持续”。这一步天然是 CPU / control plane 问题，而不是单一 kernel 问题。

## Benchmark sketch emerging from current evidence

基于当前已经读到的材料，一套更像样的 `AI CPU for agentic inference` benchmark 至少应覆盖：

1. `dispatch latency`
   - 请求进入到 GPU 真正开算之间，host 花了多久

2. `resume latency`
   - 状态从 host/CXL/storage 拉回计算路径用了多久

3. `session concurrency quality`
   - 多会话并存时，公平性和尾延迟如何退化

4. `burst robustness`
   - fan-out/fan-in 或长上下文 burst 下，系统曲线如何塌陷

5. `cache-affinity quality`
   - prefix-aware routing 是否真的保住了命中率与 locality

6. `tiering efficiency`
   - KV / expert / context 在多层内存中的放置与迁移是否真的创造了收益

## Next concrete priorities

下一轮最值得深挖的不是再泛泛搜“agentic AI + CPU”，而是继续打通下面 5 组关系：

1. `PrfaaS` 与 `Kimi Linear`
   - reduced-KV 到底怎样改变跨域 prefill 的可行边界

2. `prefix cache` 与 `agentic workload`
   - code agent / swarm / mobile agent 里 prefix locality 到底有多强

3. `product workload to benchmark mapping`
   - 需要把 Claude Code、Kimi、GUI/mobile agent 的形态和上面的 benchmark 维度一一对齐

4. `platform signal refinement`
   - 需要继续区分 agentic inference 场景与 sandbox / tool-runtime 叙事，防止平台材料被误读

5. `serving tradeoff quantification`
   - 需要更细地量化 sparse KV policy、MoE skew balancing、graph fallback 在真实服务中的代价函数

## Working note

这份文件目前是阶段性研究报告，不是最终综述。完整 deep research 将继续按 `search-directions.md` 的方向账本推进，并在每个方向结束后继续反思是否需要新增方向。
