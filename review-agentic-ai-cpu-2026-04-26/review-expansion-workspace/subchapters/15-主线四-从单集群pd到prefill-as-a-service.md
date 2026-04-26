## 主线四子章节 2：从单集群 PD 到 Prefill-as-a-Service

父章节：`8. 主线四：PD 分离与跨池控制平面`

### 1. 本章核心判断

`Prefill-Decode Disaggregation` 的真正升级，不是把两类 worker 分开这么简单，而是它正在从单集群内部优化，演化成 **跨池、跨集群、甚至跨数据中心的控制平面问题**。  
`Prefill-as-a-Service` 是这一升级的最清晰信号。

### 2. 单集群 PD 解决的是什么问题

单集群 PD 的出发点比较直接：

- prefill 更偏 compute-bound
- decode 更偏 memory-bound
- 两者放在同一个池里会互相干扰

所以最早的 PD 分离，主要解决：

- 资源属性不匹配
- 长短阶段互相污染
- worker role 不清晰

在这一阶段，CPU 的新增职责还相对有限，主要是：

- ingress routing
- pool selection
- KV handoff

也就是说，它更像是 **同一机房内的阶段分工**。

### 3. 为什么 agentic inference 会把单集群 PD 推向更远

agentic workload 会同时强化几种特征：

- prefill-first
- shared prefix
- 高频 resume
- 多会话并发
- 更高的跨请求状态复用价值

这些特征叠加后，系统会开始自然问出一个新问题：

> 既然 prefill 的价值越来越集中、状态复用越来越明显，那 prefill 是否需要被做成单独服务，而不只是同集群内的另一类 worker？

这就是 `Prefill-as-a-Service` 的真正背景。

### 4. Prefill-as-a-Service 比单集群 PD 多了什么

它多出来的不是概念，而是三类真正的系统动作。

#### 4.1 cross-cluster / cross-datacenter placement

prefill worker 不再只是“本地另一组 GPU”，而可能位于：

- 另一个集群
- 另一类硬件池
- 甚至另一个地理位置

这意味着 CPU 不只是本地挑 worker，而是在做 **服务级 placement**。

#### 4.2 bandwidth-aware scheduling

一旦 prefill 结果要跨域传回 decode 侧，网络条件就从背景约束变成显式调度输入。  
此时 CPU 需要决定：

- 这次是否值得远端 prefill
- 现有带宽预算是否足够
- prefix reuse 是否能覆盖跨域传输成本

也就是说，调度器开始把 `compute`、`cache` 和 `bandwidth` 同时纳入决策。

#### 4.3 cache-aware request placement

Prefill-as-a-Service 如果只考虑算力位置，很容易失去 prefix / KV reuse 收益。  
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
