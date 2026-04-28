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

### 10.6 为什么说 agentic 处理器趋势的核心不是 GPU，而是 control plane 平台化

如果把这条厂商路线图和最近补下来的平台材料放在一起看，一个更值得单独写清的收束判断就会浮出来：

> agentic 处理器趋势的核心，不是 CPU、GPU、NPU 各自如何演进，而是哪种平台最先把 `状态、互连、host memory hierarchy 和基础设施旁路` 组织成可持续的 AI control plane。

这一步很重要，因为它决定了我们后面到底该怎么看“处理器趋势”。如果问题被写成“哪家 GPU 更强”或“哪一代 HBM 更快”，那主语就错了。对本综述真正重要的是：

- CPU 是否正在从通用宿主前移为 `control plane / data engine`
- 互连是否不再只是传数据，而开始承担状态流动与平台可组合性的底盘
- host 侧内存层是否从“容量背景”变成“编排对象”
- DPU / SuperNIC / switch / storage offload 是否正在替 CPU 腾出预算，让它更专注于推理编排

也正因此，`GPU` 和 `HBM` 在这里最多只能作为平台背景条件，而不应再作为主论点展开。

#### 10.6.1 NVIDIA 已经把 CPU 明确推成 AI factory 的 data engine

在当前公开材料里，NVIDIA 是这条主线最强的正例。`Grace -> Vera -> Rubin -> BlueField` 这条线，不是在回答“如何再做一颗更强的加速器”，而是在回答“如何把 CPU、网络、旁路和平台调度写成同一个 AI factory 定义”。

补充材料里最强的两份一手证据来自：

- `NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories`
- `Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer`

前者没有把 Vera 当成传统服务器 CPU 去写，而是直接围绕 `agentic` 与 AI factory 场景给出指标：`88` 个 Olympus cores、`1.2TB/s` 内存带宽、`1.5x` sandbox performance、单机架 `4x` sandbox capacity。这里最重要的不是数字本身，而是这些数字对应的是一种新的 CPU 职责定义：CPU 不再只是配套 host，而是面向 `sandbox`、`data movement`、`context switching` 和持续并发控制任务优化的基础设施组件。

后者则把 Vera CPU、Rubin GPU、BlueField-4、ConnectX-9、Spectrum-6 等部件写成同一个 AI factory 平台，并明确把 CPU 放在 `data movement`、`memory` 和 `control flow` 的位置上。也就是说，NVIDIA 当前回答 agentic 负载的方式，已经不是“单颗芯片更强”，而是“整个平台如何围绕 control plane 和 state fabric 重写自身”。

<img src="../../assets/nvidia-vera-cpu-architecture.png" alt="NVIDIA Vera CPU architecture" width="760">

图：Vera CPU 的高带宽和统一拓扑设计，更像是在回答 AI factory 中的控制面与数据流动问题，而不是传统通用 host CPU 的延续。来源：NVIDIA Vera technical blog，2026-03。

<img src="../../assets/nvidia-vera-rubin-6chips.png" alt="NVIDIA Vera Rubin six-chip platform" width="760">

图：Rubin 平台把 CPU、GPU、DPU、NIC、switch 作为同一个系统写进平台图，说明竞争单位已经从“服务器”变成“AI factory 平台”。来源：Rubin 平台公开材料，2026-01。

因此，这条线可以被收敛成一句话：  
NVIDIA 已经不把 CPU 当成 GPU 服务器的配件，而是在把它推进成 AI factory 的第一层 `control plane / data engine`。

#### 10.6.2 开放路线的关键，不是复制封闭平台，而是做强互连和可组合性

与 NVIDIA 对照，`AMD + UALink + UCIe + CXL` 更像是另一条开放路线。它当前没有形成同等成熟的平台闭环，但技术底盘已经相当清楚。

AMD 自己的公开表述，已经开始把 `agentic AI` 所需的 `GPU + CPU + NIC` 协同、开放机架参考设计以及 `UALink` 路线放在同一语境里。更关键的是，`UALink`、`UCIe` 与 `CXL 4.0` 这组三类标准，提供了开放路线所需的底层编排能力：

- `UALink` 把大规模 scale-up 和未来 `in-network compute` 的能力公开化；
- `UCIe` 把 package-level die-to-die 开放互连制度化，降低多厂 chiplet 组合的摩擦；
- `CXL 4.0` 把 host-device 扩展能力继续往上推，尤其是 `Bundled Ports` 和 `128GT/s` 之后，CPU 更容易成为更大的内存与状态编排入口。

<img src="../../assets/agentic-processor-trends/t009-cxl-2.png" alt="CXL 4.0 bundled ports" width="760">

图：CXL 4.0 的 Bundled Ports 将 host-device 带宽扩展和端口聚合制度化，这对未来 CPU 作为更大状态与内存编排入口具有直接意义。来源：CXL Consortium white paper，2025-11。

因此，开放路线当前最稳的写法不是“AMD 会不会赢”，而是：

> 如果 agentic inference 持续抬高状态对象的驻留、迁移、预取和复用成本，那么 CPU 要继续扮演系统中枢，就必须依赖更开放的互连和更开放的 host memory hierarchy，而不只是 CPU 自身参数。

#### 10.6.3 这一节真正保留的主变量

把这批材料收束之后，这一节真正保留的主变量只有四个：

1. `CPU role redefinition`
2. `interconnect as control-plane substrate`
3. `host memory hierarchy as orchestration object`
4. `infrastructure offload`

也就是说，这里真正重要的不是某代 `GPU` 或 `HBM` 规格，而是整个平台里 `CPU + 状态 + 互连 + host memory hierarchy + offload fabric` 的关系。

这也意味着，在厂商路线图之后再进入 benchmark、研究空白和讨论章节时，读者不应只问“谁的芯片更强”，而应问：

> 谁的平台最先吸收了这种 control-plane 压力，并把它写进了产品与系统组织方式。

### 10.7 本章主要参考文献

本章主要依据以下文献展开：[14]-[16]，并结合厂商路线专题材料进行归纳。

### 10.8 本章小结

平台路线图与厂商叙事并不能直接证明某项软件机制已广泛落地，但它们足以说明一件事：CPU 正被各家厂商主动重写成 orchestration 和 state coordination 的平台角色，而不再只是传统 host。更进一步地说，agentic 时代真正被重写的，不是某颗芯片，而是整个平台里 `CPU + 状态 + 互连 + host memory hierarchy + offload fabric` 的关系。

---
