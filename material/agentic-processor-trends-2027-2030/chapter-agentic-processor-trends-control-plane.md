## Agentic 处理器趋势的核心不是 GPU，而是 control plane 平台化

### 0. 判断表

| 编号 | 判断 | 当前证据强度 | 本章处理方式 |
|---|---|---|---|
| 0.1 | agentic 处理器趋势的核心竞争单位，正在从单芯片转向 `CPU + 状态 + 互连 + host memory hierarchy + infrastructure offload` 的平台 | 强 | 作为本章总判断 |
| 0.2 | `NVIDIA` 已经把 CPU 明确推成 AI factory 的 `data engine / control plane` | 强 | 作为最强正例展开 |
| 0.3 | `AMD + UALink + UCIe + CXL` 代表开放路线，但当前更像技术底盘成形，而不是闭环平台成熟 | 中 | 作为对照路线展开 |
| 0.4 | `HBM`、`GPU` 代际参数不是本章主变量 | 强 | 只保留成背景条件，不作为主论点 |
| 0.5 | deck 里的 `2030` 份额和市场数字暂不能写成结论 | 强 | 明确降权 |

### 1. 核心判断

如果把这份 `2027-2030 Agentic AI处理器技术演进趋势.pptx` 和本轮补下来的官方材料放在一起看，最稳的结论不是“哪家 GPU 更强”，也不是“哪一代 HBM 更快”，而是一个更结构性的变化：

> agentic 处理器趋势的核心，不是 CPU、GPU、NPU 各自如何演进，而是哪种平台最先把 `状态、互连、host memory hierarchy 和基础设施旁路` 组织成可持续的 AI control plane。

这个判断成立的原因很直接。agentic 负载不是一次性前向推理，而是更长上下文、更高 fan-out、更多外部状态对象和更多阶段切换的持续执行过程。系统瓶颈因此会从纯算力扩散到 `data movement`、`control flow`、`state placement`、`memory hierarchy` 和 `orchestration`。在这种前提下，处理器路线图里真正值得跟踪的，不再是“某一代芯片又多了多少峰值算力”，而是谁在把 CPU 推成控制平面，把互连和主机侧内存层推成状态编排层。[1][2][3]

### 2. 为什么本章不以 GPU 或 HBM 为主线

这一步需要先把边界讲清楚。`GPU` 和 `HBM` 当然仍然重要，但对当前这条论证链来说，它们更像背景条件，而不是决定性主变量。

原因在于：

- `GPU` 说明平台里谁承担主计算，但不能直接回答 `state` 应该驻留在哪里、谁负责迁移、谁负责恢复和谁负责跨阶段编排。
- `HBM` 说明近端高带宽内存会继续进化，但也不能直接回答 `host CPU` 为什么会被前移为 control plane。
- 真正能解释 agentic 趋势的，是 `CPU 是否被重新定义`、`互连是否在为状态流动服务`、`host memory hierarchy 是否在变成编排对象`、以及 `BlueField / SuperNIC / CXL / UALink` 这类基础设施能力是否在重写平台边界。

因此，本章只把 `GPU` 和 `HBM` 当作平台背景，不再把它们当成主论点展开。

### 3. NVIDIA：已经把 CPU 明确推成 AI factory 的 data engine

当前公开材料里，`NVIDIA` 是这条主线最强的正例。

`NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories` 并没有把 Vera 写成一颗传统服务器 CPU，而是直接围绕 `agentic` 与 AI factory 场景来定义它：`88` 个 Olympus cores、`1.2TB/s` 内存带宽、`1.5x` sandbox performance，以及单机架 `4x` sandbox capacity。[2]  
这些数字的重要性不在于它们本身有多大，而在于它们对应的是一种新的 CPU 职责定义：CPU 不再只是配套宿主，而是面向 `sandbox`、`data movement`、`context switching` 和持续并发控制任务优化的基础设施组件。

更进一步，`Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer` 把 Vera CPU、Rubin GPU、BlueField-4、ConnectX-9、Spectrum-6 等部件写成同一个 AI factory 平台，并明确把 CPU 放在 `data movement`、`memory` 和 `control flow` 的位置上。[3]  
这说明 NVIDIA 当前回答 agentic 负载的方式，不是“再做一颗更快的加速器”，而是把 CPU、网络、旁路和平台调度一起写进平台定义。

`NVIDIA Vera Rubin Opens Agentic AI Frontier` 则把 `agentic inference` 进一步放进产品发布语境里，使这条叙事从技术博客上升到正式产品定位。[4]

<img src="../../assets/nvidia-vera-cpu-architecture.png" alt="NVIDIA Vera CPU architecture" width="760">

图：Vera CPU 的高带宽和统一拓扑设计，更像是在回答 AI factory 中的控制面与数据流动问题，而不是传统通用 host CPU 的延续。来源：NVIDIA Vera technical blog，2026-03-16。[2]

<img src="../../assets/nvidia-vera-rubin-6chips.png" alt="NVIDIA Vera Rubin six-chip platform" width="760">

图：Rubin 平台把 CPU、GPU、DPU、NIC、switch 作为同一个系统写进平台图，说明竞争单位已经从“服务器”变成“AI factory 平台”。来源：Rubin 平台公开材料，2026-01。[3][4]

因此，NVIDIA 这条线可以收敛成一句话：

> 它已经不把 CPU 当成 GPU 服务器的配件，而是在把它推进成 AI factory 的第一层 control plane / data engine。

### 4. 开放路线：重点不在追封闭平台，而在互连和可组合性

与 NVIDIA 对照，`AMD + UALink + UCIe + CXL` 所代表的更像是另一条开放路线。当前它的公开材料还没有形成同等成熟的平台闭环，但已经能看到相当清晰的技术底盘。

AMD 的公开表述已经开始把 `agentic AI` 所需的 `GPU + CPU + NIC` 协同、开放机架参考设计以及 `UALink` 路线放在同一语境里。[5][6]  
更关键的是，`UALink`、`UCIe` 与 `CXL 4.0` 这组三类标准，提供了开放路线所需的底层编排能力：

- `UALink` 把大规模 scale-up 和未来 `in-network compute` 的能力公开化。[8]
- `UCIe` 把 package-level die-to-die 开放互连制度化，降低多厂 chiplet 组合的摩擦。[7]
- `CXL 4.0` 把 host-device 扩展能力继续往上推，尤其是 `Bundled Ports` 和 `128GT/s` 之后，CPU 更容易成为更大的内存与状态编排入口。[9]

<img src="../../assets/agentic-processor-trends/t009-cxl-2.png" alt="CXL 4.0 bundled ports" width="760">

图：CXL 4.0 的 Bundled Ports 将 host-device 带宽扩展和端口聚合制度化，这对未来 CPU 作为更大状态与内存编排入口具有直接意义。来源：CXL Consortium white paper，2025-11。[9]

因此，开放路线当前最稳的写法不是“谁会击败谁”，而是：

> 如果 agentic inference 持续抬高状态对象的驻留、迁移、预取和复用成本，那么 CPU 要继续扮演系统中枢，就必须依赖更开放的互连和更开放的 host memory hierarchy，而不只是 CPU 自身参数。

### 5. 本章真正保留的主变量

把上面的材料收束之后，本章真正保留的主变量只有四个：

1. `CPU role redefinition`
   也就是 CPU 是否从通用宿主前移为 control plane / data engine。
2. `interconnect as control-plane substrate`
   也就是互连是否不再只是传数据，而是开始承担状态流动和平台可组合性的底盘。
3. `host memory hierarchy as orchestration object`
   也就是主机侧内存层是否正在从“容量背景”变成“编排对象”。
4. `infrastructure offload`
   也就是 DPU / SuperNIC / switch / security / storage offload 是否在替 CPU 腾出预算，让 CPU 更专注于推理编排。

这四个变量，才是比 `GPU` 或 `HBM` 代际参数更贴近 agentic 处理器趋势本质的部分。

### 6. 哪些结论现在能写，哪些还不能写

截至 `2026-04-28`，以下结论可以稳写：

- `NVIDIA` 已经公开把 CPU 推成面向 agentic AI factory 的 `data engine / control plane`。[2][3][4]
- `开放路线` 已具备明确的互连与主机侧扩展基础，但平台闭环成熟度仍低于 NVIDIA。[5][6][7][8][9]
- `CXL 4.0`、`UALink 1.0/2.0`、`UCIe` 足以支撑“平台组织方式正在变化”的判断。[7][8][9]

以下结论则暂时不能写满：

- `RISC-V 10% -> 25%`、`x86 60% -> 40%` 这类份额预测。[1]
- `2030 $295.5B` 这类宏观市场数字。[1]
- 没有明确官方路线图支撑的远期单芯片参数预测。[1]

### 7. 对主综述的意义

如果把这一章并入现有主综述，它最适合承担的角色不是“再补一章处理器市场观察”，而是作为全文后半段的一个收束层，用来解释为什么前文谈到的 `KV lifecycle`、`MoE routing`、`prefill/decode split`、`state transfer` 和 `CPU control plane` 这些系统问题，最终会在平台路线图上重新出现。

换句话说，这一章最重要的贡献不是再说一遍“硬件会升级”，而是把前面的系统观察回收成一个更稳定的平台判断：

> agentic 时代真正被重写的，不是某颗芯片，而是整个平台里 `CPU + 状态 + 互连 + host memory hierarchy + offload fabric` 的关系。

### 参考资料

[1] `assets/2027-2030 Agentic AI处理器技术演进趋势.pptx`，二手综合 deck，作为搜索地图保留，不作为一手证据。  
[2] NVIDIA, *NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories*, 2026-03-16. 本地 PDF: `cited-materials/agentic-processor-trends/t001-developer-nvidia-com-NVIDIA Vera CPU Delivers High Performance, Bandwid-2026-03-16.pdf`.  
[3] NVIDIA, *Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer*, 2026-01-05. 本地 PDF: `cited-materials/agentic-processor-trends/t002-nvidia-rubin-platform-2026-01-05.pdf`.  
[4] NVIDIA, *NVIDIA Vera Rubin Opens Agentic AI Frontier*, 2026-03-16. 本地 PDF: `cited-materials/agentic-processor-trends/t003-nvidia-vera-rubin-agentic-frontier-2026-03-16.pdf`.  
[5] AMD, *AMD Delivering Open Rack Scale AI Infrastructure to Unlock Agentic AI*, 2025-06-12. 原始 URL: https://www.amd.com/en/blogs/2025/amd-delivering-open-rack-scale-ai-infrastructure-to-unlock-agentic-ai.html  
[6] AMD, *AMD EPYC Server CPUs: Your Foundation for AI*. 本地 PDF: `cited-materials/agentic-processor-trends/t005-amd-epyc-foundation-for-ai-current.pdf`.  
[7] UCIe Consortium, *Specifications*. 本地 PDF: `cited-materials/agentic-processor-trends/t007-ucie-specifications-current.pdf`.  
[8] UALink Consortium, *Specifications*. 本地 PDF: `cited-materials/agentic-processor-trends/t008-ualink-specifications-current.pdf`.  
[9] CXL Consortium, *Introducing Compute Express Link CXL 4.0: Significant Improvements in Bandwidth, Connectivity, Memory Maintenance, and Security*, 2025-11. 本地 PDF: `cited-materials/agentic-processor-trends/t009-cxl-4-0-white-paper-2025-11.pdf`.
