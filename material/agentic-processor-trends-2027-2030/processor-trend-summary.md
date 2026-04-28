Updated: 2026-04-28

# Agentic 处理器趋势材料摘要

## 范围与结论先行

这轮工作不是直接采信 `assets/2027-2030 Agentic AI处理器技术演进趋势.pptx` 里的全部预测，而是把它当成搜索地图，用 `2025-01-01` 之后的官方技术博客、官方产品页、标准组织页面和官方白皮书去做交叉核实。

到 `2026-04-28` 为止，可以下得住的一手结论主要有四条：

1. `NVIDIA` 已经把 `agentic inference`、`data movement`、`control flow` 写进 `Vera / Rubin / BlueField-4 / ConnectX-9 / Spectrum-6` 的统一平台叙事里，CPU 不是陪衬，而是高带宽 control plane/data engine。
2. `开放路线` 也在成形，但证据强度明显低于 NVIDIA。`AMD + UALink + UCIe + CXL` 更多是在给“开放 rack-scale AI”补标准和互连基础，而不是已经形成同等成熟的平台闭环。
3. 对这个主题真正重要的，不是 `HBM` 或某代 `GPU` 本身，而是 `CPU 是否能成为更大的状态、内存和互连编排入口`。因此 HBM/GPU 最多只能当背景条件，不能当主论点。
4. 这份 deck 里最弱的是 `2030` 市场份额和宏观市场数字。现在能稳写的是公开规格、互连方向和平台组织方式，不能稳写的是“谁到 2030 一定拿到多少份额”。

## 已下载并归档的核心材料

| source_id | material | local pdf |
|---|---|---|
| T001 | NVIDIA Vera CPU technical blog | `cited-materials/agentic-processor-trends/t001-developer-nvidia-com-NVIDIA Vera CPU Delivers High Performance, Bandwid-2026-03-16.pdf` |
| T002 | NVIDIA Rubin platform technical blog | `cited-materials/agentic-processor-trends/t002-nvidia-rubin-platform-2026-01-05.pdf` |
| T003 | NVIDIA Vera Rubin press release | `cited-materials/agentic-processor-trends/t003-nvidia-vera-rubin-agentic-frontier-2026-03-16.pdf` |
| T005 | AMD EPYC for AI page | `cited-materials/agentic-processor-trends/t005-amd-epyc-foundation-for-ai-current.pdf` |
| T006 | Intel Xeon 6 P-cores page | `cited-materials/agentic-processor-trends/t006-intel-xeon6-p-cores-current.pdf` |
| T007 | UCIe specifications | `cited-materials/agentic-processor-trends/t007-ucie-specifications-current.pdf` |
| T008 | UALink specifications | `cited-materials/agentic-processor-trends/t008-ualink-specifications-current.pdf` |
| T009 | CXL 4.0 white paper | `cited-materials/agentic-processor-trends/t009-cxl-4-0-white-paper-2025-11.pdf` |
| T010 | Micron HBM4 page | `cited-materials/agentic-processor-trends/t010-micron-hbm-current.pdf` |
| T011 | SK hynix HBM4 release | `cited-materials/agentic-processor-trends/t011-sk-hynix-hbm4-2025-09-12.pdf` |

## 证据摘要

### 1. NVIDIA 线已经不是“更强 host CPU”，而是 AI factory control plane

`T001-T003` 共同指向同一个判断：Vera 的卖点不是传统服务器 CPU 指标，而是围绕 agentic loop 和 AI factory 去组织单核性能、每核带宽、统一拓扑和系统级协同。

- `T001` 给出的直接数字最硬：`88` 个 Olympus cores、`1.2TB/s` 内存带宽、`1.5x` sandbox performance、单机架 `4x` sandbox capacity。
- `T002` 把 CPU 角色写得更明确：Vera CPU 负责 `data movement`、`memory` 和 `control flow`，不是“外部 host”，而是直接参与执行路径。
- `T003` 则把 `agentic inference` 放到官方平台新闻稿里，说明这不是博客作者的解释，而是产品层定位。

<img src="../../assets/nvidia-vera-cpu-architecture.png" alt="NVIDIA Vera CPU architecture" width="760">

图：Vera CPU 的核心价值是高带宽、统一拓扑和可预测执行，不是传统 CPU 的通用吞吐指标。来源：NVIDIA Vera technical blog，2026-03-16。

<img src="../../assets/nvidia-vera-rubin-6chips.png" alt="NVIDIA Vera Rubin six-chip platform" width="760">

图：Rubin 平台把 CPU、GPU、DPU、NIC、switch 当作一个系统写在一起，说明竞争单位已经从“服务器”变成“AI factory 平台”。来源：Rubin 平台相关公开材料，2026-01。

### 2. 开放路线的主战场是互连和可组合性

`AMD` 本身的 agentic 平台叙事还没有 NVIDIA 那么完整，但 `T004-T009` 已经能看出另一条路线：不用封闭平台去锁定 CPU 角色，而是用开放互连和 host-device 扩展能力去争 AI rack 的标准化入口。

- `T004` 的官方表述明确写到 agentic AI 需要 `GPU + CPU + NIC` 协同，并把 `Helios`、`MI400`、`Venice`、`UALink` 放到一个开放机架参考设计里。
- `T008` 说明 `UALink 1.0` 已公开，目标是单 pod `up to 1,024 accelerators`，`2.0` 还进一步引入了 `in-network compute`。
- `T007` 说明 `UCIe` 已经把 die-to-die 开放互连标准化，方便多厂 chiplet 组合。
- `T009` 则把内存侧推进得更明确：`CXL 4.0` 到 `128GT/s`，并引入 `Bundled Ports`，单 x16 链路双向总带宽可以到 `1.536TB/s`。

<img src="../../assets/agentic-processor-trends/t009-cxl-2.png" alt="CXL 4.0 bundled ports" width="760">

图：CXL 4.0 的 Bundled Ports 不是抽象概念，而是把 host-device 带宽、端口聚合和内存维护直接制度化。来源：CXL Consortium white paper，2025-11。

这条线的含义是：如果 agentic inference 把状态、上下文、预取和迁移成本持续前推，那么 `CPU 能否成为更大的内存/互连编排入口`，将越来越取决于 `CXL / UCIe / UALink` 这类开放标准能否真正落地，而不只是 GPU 算力本身。

### 3. Intel 仍然重要，但当前更像角色延续而不是范式重写

`T006` 的价值在于告诉我们：Intel 官方也把 `host CPU`、`AI acceleration`、`memory bandwidth` 和 `I/O` 放在 Xeon 6 的核心卖点中，但它的叙事更像是在巩固“异构系统里的主 CPU”位置，而不是像 NVIDIA 那样重写整个平台语义。

因此，当前更稳的写法是：

- `NVIDIA`：把 CPU 推成 AI factory 的 control plane/data engine。
- `AMD + 开放标准`：试图把 CPU 留在开放 AI rack 的 host/orchestration 中枢。
- `Intel`：继续强化“异构系统 host CPU”的必要性，但公开材料里 agentic 平台化的力度相对弱。

## 这份 PPT 里哪些意见现在可以写，哪些还不能写

### 可以写

- 异构融合确实在变强，但更准确的说法是：`CPU + GPU + NIC/DPU + switch + memory hierarchy` 的平台级协同在变强。
- `CXL 4.0`、`UALink 1.0/2.0`、`UCIe` 都是已经公开可核查的方向。
- 处理器竞争单位从“单芯片”转向“rack-scale AI platform”是有强证据的。

### 不能写满

- `RISC-V 10% -> 25%`、`x86 60% -> 40%` 这种份额预测，目前仍缺同等级一手支撑。
- `2030 $295.5B` 之类市场规模数字，当前没有拿到足够强、可归档、可复核的主来源。
- `AMD 2030 512核`、`HBM5 4TB/s` 这类远期 roadmap，除非拿到明确官方路线图，否则只能作为 deck 候选判断，不应写成事实。

## 下一步怎么写成正文

最自然的写法不是按厂商列新闻，而是按四个论点展开：

1. `从 host CPU 到 control plane CPU`：用 `T001-T003` 做主证据。
2. `开放互连如何支撑另一条 AI rack 路线`：用 `T004-T009` 做主证据。
3. `为什么这不是“处理器大战”，而是“AI platform 组织方式之争”`：用 NVIDIA 封闭路线和 AMD/UALink/CXL/UCIe 开放路线对照收束。

## 当前缺口

- `AMD` 的博客页本地 PDF 捕获质量不稳定，后续最好再补一份更稳的镜像。
- `RISC-V` 还缺够硬的一手资料。
- 还没有把这些新材料并回全局 `sources-index.md` 和根级 `reference-bibliography-table.md`。
