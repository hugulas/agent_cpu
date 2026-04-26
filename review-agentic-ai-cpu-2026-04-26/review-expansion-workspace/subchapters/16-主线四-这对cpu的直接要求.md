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
