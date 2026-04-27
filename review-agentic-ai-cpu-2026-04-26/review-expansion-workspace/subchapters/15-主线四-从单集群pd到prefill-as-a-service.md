## 主线四子章节 2：从单集群 PD 到 Prefill-as-a-Service

父章节：`8. 主线四：PD 分离与跨池控制平面`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| PD 分离已经从“单集群角色拆分”升级为“跨池状态编排” | `S001 (Prefill-as-a-Service) S002 (K8s disaggregated LLM) S003 (NVIDIA Dynamo agentic) S015 (LMCache disaggregated prefill) S023 (PD disaggregation review)` | throughput `+54%`；P90 TTFT `-64%`；相对朴素异构基线 `+32%` |
| 单集群 PD 主要解决 compute-bound prefill 与 memory-bound decode 的资源错配 | `S002 (K8s disaggregated LLM) S015 (LMCache disaggregated prefill) S023 (PD disaggregation review)` | ingress / prefill / decode worker 拆分；prefiller / decoder / proxy 架构 |
| agentic workload 把 KV handoff、pool selection、远端回传和带宽取舍推成 CPU 的核心职责 | `S001 (Prefill-as-a-Service) S003 (NVIDIA Dynamo agentic)` | KV-aware placement；priority scheduling；跨池 / 跨域 Prefill-as-a-Service |

### 1. 本章核心判断

上一章已经说明，agentic workload 会把 prefill 推成一个值得独立部署的阶段。顺着这条逻辑再往前一步，`Prefill-Decode Disaggregation` 的真正升级，就不再只是把两类 worker 分开这么简单，而是它正在从单集群内部优化，演化成 **跨池、跨集群、甚至跨数据中心的控制平面问题**。`Prefill-as-a-Service` 是这一升级的最清晰信号。[1][2][3][4][5]

### 2. 单集群 PD 解决的是什么问题

单集群 PD 的出发点比较直接：prefill 更偏 compute-bound，decode 更偏 memory-bound，把两者放在同一个池里容易互相污染。Kubernetes 的 disaggregated LLM inference 方案、LMCache 的 disaggregated prefill example，以及更审慎的 PD 边界讨论，共同把这套基础逻辑讲清楚了：ingress-router、prefill worker、decode worker 可以被拆开，prefiller / decoder / proxy 可以构成单机房内的阶段分工。[2][4][5]

在这一阶段，CPU 的新增职责还相对有限，主要是 ingress routing、pool selection 和 KV handoff。也就是说，它更像是**同一机房内的阶段拆分器**。

### 图 1：单集群 PD 的第一步是把 prefill 与 decode worker 角色分开

![Disaggregated prefill/decode overview](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/vllm-disagg-prefill-overview.jpg)

图 1 支撑的是基础阶段：PD 分离首先解决的是资源属性不匹配，而不是跨域控制。此时 CPU 仍主要处理本地 handoff。[2][4][5]

### 3. 为什么 agentic inference 会把单集群 PD 推向更远

agentic workload 会同时强化 prefill-first、shared prefix、高频 resume、多会话并发和更高的跨请求状态复用价值。于是，单集群 PD 的原始收益就会被进一步放大，但同时也会暴露出新的限制：

- 哪个 prefill 池更适合当前请求；
- 共享前缀应该留在哪个池里；
- prefill 结果回传时是否会压垮链路；
- decode 池的局部最优是否会与全局状态位置冲突。

这正是 `S003 (NVIDIA Dynamo agentic)` 强调 KV-aware placement 与 priority scheduling 的原因。对于 agentic inference，阶段分离很快就不再只是 worker 角色分工，而会演化成状态位置与阶段位置的联合优化。

### 4. PraaS 为什么是实质性升级，而不是换个名字

`S001 (Prefill-as-a-Service)` 给出的最强信号，是 PraaS 已把讨论对象扩展到跨数据中心、异构集群与商品以太网，并且给出定量收益：相对同构 PD 吞吐 `+54%`、P90 TTFT `-64%`，相对朴素异构基线吞吐 `+32%`。[1]

这说明 PraaS 的关键并不是“把 prefill 单独部署”这件事本身，而是：

- prefill 节点可以被当作共享服务；
  - 这意味着多个 decode 池可以复用同一组 prefill 节点，从而提高前缀复用率和整体资源利用率。
- 状态回传可以跨池甚至跨域发生；
  - 只要 transfer stack 足够成熟，KV 和 prefix 的远端回传就不再是不可承受的瓶颈，而是可由控制面按需调度的常规操作。
- CPU 需要做的已经不是本地 handoff，而是全局化 placement、带宽与优先级决策。
  - 控制面必须同时评估哪条路径延迟最低、哪条带宽最充足、以及哪些状态值得被优先回传。

### 图 2：PraaS 的核心不是多一个池，而是多一层跨池协调层

![Disaggregated serving on Kubernetes](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-k8s-disagg-serving-2026.webp)

图 2 在 `09` 中强调的是工业控制平面与统一移动；在本节中强调的则是另一层含义：一旦从单集群 PD 走向 PraaS，系统真正新增的是跨池协调层，而不是单纯更多 worker。[1][2][3]

### 5. 为什么这一步会显著抬高 CPU 的控制面价值

从单集群 PD 走到 PraaS，CPU 的工作会从“做阶段 handoff”升级成“管理跨池状态生命周期”：

1. 远端服务选择。prefill 是不是该交给远端服务，而不是本地池。
2. 状态回传协调。哪些 KV / prefix / context 要回传，何时回传，通过哪条路径回传。
3. 跨域调度代价评估。带宽是否值得，延迟是否可接受，reuse 是否足以抵消转移成本。
4. 节点角色管理。prefill 节点、decode 节点、remote prefill service node 的职责和预算不同。

所以这一步最重要的含义不是“prefill 可以远程化”，而是：**CPU 从本地阶段调度器升级成 distributed service orchestrator。**

### 6. 为什么这还不是默认答案

虽然 Prefill-as-a-Service 很强，但它不能被写成已普遍落地的工业现状。原因也很明确：

- 它对网络和带宽的要求更高；
- 对 cache-aware placement 的依赖更强；
- 对 KV movement 和 transfer stack 的成熟度要求更高；
- 只有在共享前缀、高复用、重 prefill 或 reduced-KV 模型场景下收益才足够明显。

也就是说，它很可能是未来方向，但目前仍是 **强趋势、非默认**。

### 7. 与 reduced-KV / hybrid-attention 的关系

这条路线之所以在 2025H2 之后突然变得更可信，一个重要原因是模型结构变了。当 reduced-KV、hybrid-attention 让 KV 体积下降时，跨域 prefill 的主要约束会从“根本传不动”转向“调度值不值得、带宽够不够、状态放得对不对”。

因此，Prefill-as-a-Service 并不是孤立架构创新，而是模型侧 KV shrink、系统侧 PD 分离、控制面侧 cache-aware placement三者共同推动的结果。

### 8. 小结

从单集群 PD 到 Prefill-as-a-Service 的跃迁，本质上是把“阶段切分问题”升级成“分布式状态与服务编排问题”。单集群 PD 解决资源错配，PraaS 解决更高层级的状态位置与阶段位置协同；而吞吐 `+54%`、P90 TTFT `-64%` 和异构基线 `+32%` 的结果，共同说明这不是概念包装，而是 AI CPU 职责边界被继续向外推的明确信号。下一章再进一步收束：这会具体把 CPU 的设计目标推向哪些方向。[1][2][3][4][5]

### 参考文献

[1] [Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter](../material/reference-notes/s001-prefill-as-a-service-kvcache-of-next-generation-models-could-go-cross-datacenter.md). 2026-04.

[2] [Deploying disaggregated LLM inference workloads on Kubernetes](../material/reference-notes/s002-deploying-disaggregated-llm-inference-workloads-on-kubernetes.md). 2026-03-23.

[3] [Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo](../material/reference-notes/s003-full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo.md). 2026-04-17.

[4] [LMCache disaggregated prefill example](../material/reference-notes/s015-lmcache-disaggregated-prefill-example.md). current.

[5] [Prefill-Decode Disaggregation: Splitting the Two Stages of Inference](../material/reference-notes/s023-prefill-decode-disaggregation-splitting-the-two-stages-of-inference.md). 2026-04-04.
