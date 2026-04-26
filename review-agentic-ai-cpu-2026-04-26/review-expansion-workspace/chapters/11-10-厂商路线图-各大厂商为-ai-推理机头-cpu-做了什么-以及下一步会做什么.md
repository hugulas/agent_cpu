## 10. 厂商路线图：各大厂商为 AI 推理机头 CPU 做了什么，以及下一步会做什么

### 10.1 NVIDIA

从 `Grace -> Vera -> Rubin -> BlueField` 这条线看，NVIDIA 最明确地把 CPU 推向了 AI factory 控制平面。其公开材料不只是强调 CPU 的通用性能，而更强调高带宽主机内存、近端一致性互连、context/data movement 和 state fabric 角色。若进一步结合当前行业传闻与路线外推，NVIDIA 的下一步更可能是把 `Vera + BlueField + context memory/storage` 进一步平台化，让 CPU 成为更中心化的状态与数据流协调者。

### 10.2 AMD

AMD 的路线更像开放式 `balanced host`。围绕 EPYC、Instinct、ROCm 和 rack-level 组织，AMD 更强调在开放生态中提供足够强的 host 带宽、内存容量和机架级协同能力，而不是复制 NVIDIA 式的封闭控制面。这样的路线意味着 AMD 的 CPU 更可能承担开放 AI rack 中的 orchestration 和 memory-heavy coordination 角色，特别适合承接多样化 runtime 与 heterogeneous deployment。

### 10.3 Intel

Intel 当前更清楚地把 Xeon 放在 `host-and-action hub` 位置上。它不再主要争论 CPU-only inference，而是强调在异构企业 AI 中，Xeon 如何承担 orchestration、memory access、security 和 throughput 管理。若结合路线传闻来看，Intel 更可能进一步强化自己在企业异构平台中的 host 中枢角色，而不是试图在每一项指标上复制 AI-native rack CPU。

### 10.4 Arm

Arm 的信号最像在定义一个新品类。`AGI CPU` 的表述已经不只是“服务器 CPU 为 AI 优化”，而是更直接地承认 CPU 可能成为 agentic AI 基础设施中的 pacing element。它的下一步更可能是把这一角色模板化，推动成可由系统厂商和大型客户复制的 `AI-native orchestration silicon` 与 rack blueprint。

### 10.5 四家分歧与收敛

四家的分歧在于：NVIDIA 更偏封闭式 `state fabric`，AMD 更偏开放式 `balanced host control layer`，Intel 更偏企业异构中的 `host-and-action hub`，Arm 更偏新的 `AI-native orchestration silicon`。它们的收敛点则很明确：都在围绕带宽、coherence、data movement、deterministic multi-tenancy 和 node-level coordination 重写 CPU 角色。也就是说，下一阶段竞争点并不是谁更像传统服务器 CPU，而是谁更能把 CPU 固化成推理状态控制面的标准形态。

### 10.6 本章主要参考文献

本章主要依据以下文献展开：[14]-[16]，并结合厂商路线专题材料进行归纳。

### 10.7 本章小结

平台路线图与厂商叙事并不能直接证明某项软件机制已广泛落地，但它们足以说明一件事：CPU 正被各家厂商主动重写成 orchestration 和 state coordination 的平台角色，而不再只是传统 host。

---
