# 综述提纲：Agentic AI 推理负载特征对 AI 机头 CPU 的影响

> 日期：2026-04-26  
> 工作目录：`review-agentic-ai-cpu-2026-04-26/`  
> 目标：形成一篇聚焦 `CPU 为大模型推理请求服务` 的完整综述，不讨论工具执行沙箱本身。

## 0. 写作目标

- 写成一篇完整综述，而不是研究日志或材料堆砌。
- 结构采用 `总-分-总`。
- 每个核心判断都尽量有：
  - 机制解释
  - 真实 workload 含义
  - 工业界采用状态
  - 关键引用或关键数字

---

## 1. 引言

### 1.1 问题背景

- 为什么 agentic AI 推理和传统 chat inference 不一样
- 为什么 GPU 不是唯一关键路径
- 为什么“机头 CPU”成为独立研究对象

### 1.2 研究问题

- agentic workload 到底改变了 CPU 的哪些职责
- 这些变化是局部优化，还是系统角色迁移
- 工业界已经采用了什么，还没有采用什么

### 1.3 本文边界

- 只讨论 `CPU 为推理请求服务`
- 不讨论训练
- 不讨论 CPU 作为工具调用沙箱
- 时间边界以 `2025H2+` 为主，必要时引入更早材料作为技术前史

---

## 2. 核心命题与全文主线

### 2.1 核心命题

- agentic AI 正在把 CPU 从传统 host 推向 `inference control plane`

### 2.2 四条核心机制主线

- `算子下发与状态驱动调度`
- `KV 生命周期与状态复用控制平面`
- `MoE expert orchestration 与动态平衡`
- `真实 workload 对传统 serving 假设的修正`

### 2.3 两条外层验证主线

- `工业采用状态`
- `平台与厂商路线图`

---

## 3. 概念、术语与分析框架

### 3.1 机头 CPU 的定义

- host CPU
- control-plane CPU
- orchestration CPU

### 3.2 关键术语

- operator dispatch
- PD disaggregation
- prefix cache
- KV offloading
- sparse KV access
- MoE routing / residency
- graphification / CUDA Graphs / persistent kernel

### 3.3 分析框架

- 机制层
- workload 层
- 采用状态层
- 平台层

---

## 4. Agentic workload 如何重写 CPU 问题定义

### 4.1 从单轮 decode 到长生命周期状态机

- pause / resume
- fan-out / fan-in
- branch reuse
- multimodal ingress

### 4.2 为什么 CPU 的角色不再只是发 kernel

- request ingress
- routing
- prefix/KV reuse
- transfer orchestration
- memory tiering
- multi-agent coordination

### 4.3 真实产品形态的约束映射

- Claude Code
- Kimi Agent Swarm
- OpenClaw
- Mobile Use Agent

---

## 5. 主线一：算子下发为什么从 launch overhead 变成调度墙

### 5.1 微观问题：kernel launch tax

- 小模型、量化模型、动态 batch
- CPU-induced slowdown

### 5.2 宏观问题：状态驱动调度链

- queue
- broadcast
- synchronization
- worker selection

### 5.3 图化编译与运行时图化

- piecewise CUDA Graphs
- full graphs
- persistent kernels
- Event Tensor

### 5.4 图化编译在服务化推理中的利与弊

- 收益：降低 dispatch tax
- 代价：capture memory、warmup、fallback、backend compatibility

---

## 6. 主线二：KV 不再只是容量对象，而是生命周期对象

### 6.1 从 KV offload 到 KV lifecycle

- write-once-read-many
- retention
- prefetch
- resume

### 6.2 稀疏 attention 与稀疏 KV 访问

- NOSA
- ScoutAttention
- sparse access 为什么会改变 CPU 的角色

### 6.3 Prefix cache 是第一代状态复用技术

- APC 的意义与边界

### 6.4 Prefix cache 之后的技术演化

- prefix-aware routing
- cache affinity
- selective retention
- event-driven KV reuse
- early reuse
- multimodal cache identity

### 6.5 KV 的工业控制平面化趋势

- KV-aware routing
- warm tier
- event API
- cache state visibility

---

## 7. 主线三：MoE 为什么会把 host-side orchestration 推到前台

### 7.1 稀疏计算优势为何不自动转化成系统收益

- cold expert
- expert miss
- synchronization chain

### 7.2 专家驻留、预取与动态平衡

- FluxMoE
- FineMoE
- SpecMoEOff

### 7.3 MoE 路由动态平衡问题

- expert skew
- hot/cold expert
- topology-aware placement
- batch-level balance

### 7.4 工业界当前吸收到了哪一步

- Wide Expert Parallelism
- 平台拓扑与 runtime 组织

---

## 8. 主线四：PD 分离与跨池控制平面

### 8.1 为什么 agentic inference 特别适合把 prefill 单独拿出来

- prefill-first
- shared prefix
- remote prefill

### 8.2 从单集群 PD 到 Prefill-as-a-Service

- cross-cluster
- cross-datacenter
- bandwidth-aware scheduling

### 8.3 这对 CPU 的直接要求

- transfer stack
- KV movement
- cache-aware placement
- remote prefill node

---

## 9. 工业采用状态：哪些已经落地，哪些还没有

### 9.1 已工业采用

- APC
- prefix-aware routing
- CPU overhead reduction
- piecewise CUDA Graphs

### 9.2 已产品化但仍条件性采用

- PD 分离
- KV reuse policy
- event-driven cache view
- Wide EP

### 9.3 工业界明确关注但仍探索中

- Prefill-as-a-Service
- persistent prefixes
- multimodal cache identity

### 9.4 研究验证为主

- NOSA
- ScoutAttention
- FluxMoE
- FineMoE
- SpecMoEOff
- Event Tensor

---

## 10. 厂商路线图：各大厂商为 AI 推理机头 CPU 做了什么，以及下一步会做什么

### 10.1 NVIDIA

- Vera / Rubin / BlueField / context fabric
- 下一步：state fabric 中心化

### 10.2 AMD

- EPYC 作为开放式 balanced host
- 下一步：开放 AI rack control layer

### 10.3 Intel

- Xeon 作为 host-and-action hub
- 下一步：异构企业 AI 中枢

### 10.4 Arm

- AGI CPU 作为 AI-native orchestration silicon
- 下一步：机架模板化

### 10.5 四家分歧与收敛

- closed vs open control plane
- bandwidth per core
- coherence
- deterministic multi-tenancy

---

## 11. Benchmark 与研究空白

### 11.1 需要什么 benchmark

- dispatch latency
- resume latency
- cache-affinity quality
- retention hit quality
- expert skew tail latency
- graph fallback frequency

### 11.2 当前材料还缺什么

- metadata overhead
- multimodal cache identity 的论文级总结
- MoE 动态平衡的公开 production 数据
- Prefix/KV reuse 的误判成本

### 11.3 后续最值得追踪的方向

- state fabric
- event-driven cache control
- MoE balancing as control plane
- graphification under highly dynamic serving

---

## 12. 讨论

### 12.1 为什么工业界先采用的是控制平面，而不是所有新算法

### 12.2 为什么 CPU 的未来竞争点不是传统服务器指标

### 12.3 为什么“AI 机头 CPU”正在变成独立产品类别

---

## 13. 结论

### 13.1 核心结论

- CPU 正从 host 变成 inference control plane

### 13.2 工业现实

- 已采用的是 `reuse + routing + graphification + runtime overhead reduction`

### 13.3 未来判断

- 下一阶段的竞争核心是 `state + routing + memory + transport + tenancy`

---

## 附录建议

### A. 关键材料一览表

### B. 工业采用状态一页表

### C. 厂商下一步判断一页表

### D. 跨方向关键材料清单
