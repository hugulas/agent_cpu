## 主线四子章节 3：这对 CPU 的直接要求

父章节：`8. 主线四：PD 分离与跨池控制平面`

### 1. 本章核心判断

一旦系统从单集群 PD 走向更强的跨池控制平面，AI CPU 的设计要求就会明显改变。  
它不再只是需要“足够的 host 核心”，而是需要成为一个能够稳定承担：

- transfer orchestration
- KV movement
- cache-aware placement
- node-role specialization

的控制器。

换句话说，Prefill-as-a-Service 真正提出的问题不是“再给 CPU 多几个核”，而是：

> CPU 应该被设计成什么样，才能稳定地做 distributed inference control plane。

### 2. transfer stack：为什么网络与主机栈会直接变成 CPU 规格问题

单机时代，很多 host CPU 选择可以主要看通用算力；  
到了跨池推理，transfer stack 会变成更直接的设计约束。

CPU 需要承担的事情包括：

- 触发和跟踪 KV transfer
- 管 completion
- 管 memory registration / pinning
- 协调 network、GPU、storage 之间的移动

这会直接推高对下面几个方面的要求：

1. **单核尾延迟稳定性**
   - completion handling 和调度线程很怕抖动

2. **足够的主机并发能力**
   - 并不是为了跑大任务，而是为了同时处理很多小控制任务

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
