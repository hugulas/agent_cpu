Updated: 2026-04-28

# 从 Agentic 负载看 2027-2030 处理器趋势

## 1. 问题不再只是“哪颗芯片更强”，而是哪种平台更适合当 AI control plane

把 `assets/2027-2030 Agentic AI处理器技术演进趋势.pptx` 与本轮补下来的官方材料放在一起看，最稳的判断不是“未来谁市场份额更高”，而是一个更结构性的变化：`agentic inference` 正在把处理器竞争从单芯片性能，推向 `CPU + state + interconnect + host memory hierarchy + infrastructure offload` 的平台组织能力。

这背后的原因很直接。agentic 负载不是只做一次前向推理，而是要在更长上下文、更高 token fan-out、更多外部状态对象和更多阶段切换中持续工作。平台瓶颈开始从纯算力扩散到 `data movement`、`control flow`、`memory hierarchy` 和 `orchestration`。因此，处理器路线图里真正值得关心的，不是“某一代 CPU 又多了多少核”，而是谁在把 CPU 变成面向状态和协同的控制平面。

## 2. NVIDIA 已经把 CPU 明确推成 AI factory 的 data engine

这一点在 `T001-T003` 里证据最强。`NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories` 直接把 CPU 的价值绑定到 agentic loop：`88` 个 Olympus cores、`1.2TB/s` 内存带宽、`1.5x` sandbox performance，以及单机架 `4x` sandbox capacity，都是围绕 agentic 和 AI factory 场景给出的，而不是通用服务器口径。[processor-trend-summary.md](/home/hugulas/agent_tool_modeling/kv/material/agentic-processor-trends-2027-2030/processor-trend-summary.md:19)

更关键的是 `Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer` 对 CPU 角色的表述。Vera CPU 被写成负责 `data movement`、`memory` 和 `control flow` 的高带宽执行引擎，不再只是外部 host；而 Rubin 平台则把 CPU、GPU、DPU、NIC、switch 直接组织成同一个 rack-scale AI platform。这里的竞争单位已经不是传统服务器，而是 AI factory 本身。

<img src="../../assets/nvidia-vera-cpu-architecture.png" alt="NVIDIA Vera CPU architecture" width="760">

图：Vera CPU 的高带宽和统一拓扑，是为了让 CPU 在 agentic loop 里承接更多控制面职责。来源：NVIDIA Vera technical blog，2026-03-16。

<img src="../../assets/nvidia-vera-rubin-6chips.png" alt="NVIDIA Vera Rubin six-chip platform" width="760">

图：Rubin 平台把 CPU、GPU、DPU、NIC、switch 作为一个系统处理，说明 NVIDIA 正在用平台而不是单芯片来回答 agentic 负载。来源：Rubin 平台公开材料，2026-01。

## 3. 开放路线的关键，不是追封闭平台，而是做强互连和可组合性

相较之下，`AMD + UALink + UCIe + CXL` 代表的是另一条路。它当前没有 NVIDIA 那么闭合的平台叙事，但它在互连、host-device 扩展和可组合性上的信号已经很明确。

AMD 的官方材料已经把 agentic AI 需要 `GPU + CPU + NIC` 协同写进开放机架参考设计；`UALink 1.0` 官方页面则公开了 `up to 1,024 accelerators` 的 scale-up 目标，`2.0` 还加入了 `in-network compute`。`UCIe` 负责 package-level 的开放 chiplet 互连，而 `CXL 4.0` 则把 host-device 之间的扩展能力继续往上推：`128GT/s`、`Bundled Ports`，以及白皮书给出的单 x16 双向总带宽 `1.536TB/s`。

<img src="../../assets/agentic-processor-trends/t009-cxl-2.png" alt="CXL 4.0 bundled ports" width="760">

图：CXL 4.0 的 Bundled Ports 让 host-device 带宽扩展、端口聚合和内存维护有了更直接的制度化路径。来源：CXL Consortium white paper，2025-11。

这条开放路线的现实含义是：如果 agentic inference 继续推高状态对象的驻留、迁移、预取和复用成本，那么 CPU 要想继续扮演系统中枢，它必须依靠更开放的 host-device 内存层和更开放的 scale-up fabric，而不能只靠 CPU 自身参数。

## 4. 现在能稳写到哪一步

截至 `2026-04-28`，可以稳写的结论是：

- `NVIDIA` 已经公开把 CPU 推成 agentic AI factory 的 data engine / control plane。
- `开放路线` 已有明确互连和内存层基础，但平台闭环成熟度仍弱于 NVIDIA。
- `CXL 4.0`、`UALink 1.0/2.0`、`UCIe` 都已足够具体，可以支撑“平台组织方式正在变化”的判断。

还不能写满的结论是：

- `RISC-V 10% -> 25%`、`x86 60% -> 40%` 这类份额预测。
- `2030 $295.5B` 之类市场规模数字。
- 没有一手路线图支撑的远期单芯片参数预测。

所以，参考这份 deck 去写正文时，最稳的方式不是“复述 2030 愿景”，也不是展开 `HBM` 或 `GPU` 的代际规格，而是抓住一个更强的命题：

> Agentic 处理器趋势的核心，不是 CPU、GPU、NPU 各自如何演进，而是哪种平台最先把 `状态、互连、host memory hierarchy 和基础设施旁路` 组织成可持续的 AI control plane。
