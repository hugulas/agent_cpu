## 研究框架

- 研究问题：`2027-2030` 面向 agentic AI / agent swarm 的处理器与平台技术演进，哪些趋势有一手证据支撑，哪些只是远期预测；其中哪些趋势真正影响 inference control plane / head CPU 设计。
- 范围边界：优先数据中心与推理平台；端侧 SoC、纯训练芯片、纯市场预测只作为邻接材料。
- 时间边界：优先 `2025-01-01` 及之后公开材料；对于标准和路线图，允许引用更早但仍有效的官方规范页。
- 语言：中文写作，来源允许英文。
- 来源偏好：官方技术博客、官方产品页、官方标准组织页面、论文、公开演讲资料。
- 排除规则：纯咨询二手预测、无机制/无规格的营销稿、只讨论 training 而不触及 serving/platform 的材料。

## 搜索方向账本

| direction_id | label | why it matters | starter queries | expected source types | parent | status | reflection |
|---|---|---|---|---|---|---|---|
| D01 | NVIDIA AI factory 平台路线 | deck 中最强主线，直接涉及 Vera / Rubin / BlueField / NVLink-C2C | `NVIDIA Vera Rubin BlueField AI factory official`, `NVIDIA Vera CPU agentic AI blog` | official blogs, product pages, press releases | - | planned | - |
| D02 | AMD CPU+GPU+UALink 路线 | 需要验证开放互连与高核数 CPU 是否形成“开放版 control plane”叙事 | `AMD MI500 UALink EPYC Turin official`, `AMD AI rack scale UALink` | official blogs, product pages, consortium pages | - | planned | - |
| D03 | Intel host CPU 与 GPU 路线 | 需要判断 Intel 在 agentic platform 中更像 host CPU 供应者还是平台整合者 | `Intel Xeon host CPU DGX Rubin official`, `Intel Diamond Rapids Falcon Shores official` | official pages, launch notes, product briefs | - | planned | - |
| D04 | ARM / Apple / Qualcomm 端侧 agent 邻接线 | deck 有涉及，但与本项目主问题距离较远，需要边界控制 | `Apple Neural Engine official`, `Qualcomm Oryon AI PC official` | official product pages | - | planned | - |
| D05 | RISC-V AI ISA 演进 | deck 把 ISA 变化说得很大，需要核对官方扩展与真实落地状态 | `RISC-V matrix extension official`, `RISC-V AI extension official` | foundation pages, specs, technical blogs | - | planned | - |
| D06 | HBM4 / HBM5 与近存带宽路线 | deck 的内存带宽判断需要一手规格或厂商路线图支撑 | `HBM4 official`, `HBM5 official`, `Micron HBM4 blog`, `SK hynix HBM4` | vendor pages, JEDEC-related pages | - | planned | - |
| D07 | UCIe / CXL / UALink 标准互连 | 这些标准决定 CPU 是否能成为更大的状态与内存编排层 | `UCIe official`, `CXL consortium official`, `UALink consortium official` | consortium pages, specs, announcements | - | planned | - |
| D08 | agentic inference 对 control plane 的直接要求 | 需要把处理器趋势和 agentic workload 重新接上，而不是只写硬件 roadmap | `agentic inference control plane CPU official`, `NVIDIA Dynamo agentic inference` | official blogs, papers | - | planned | - |
| D09 | 市场规模与时间表数字核实 | deck 中 `$295.5B`、`33.2% CAGR` 之类数字只能作为弱证据，需降权或替换 | `AI chip market forecast 2030 source` | reports, official market notes | - | planned | - |
| D10 | 反方与保守证据 | 防止把远期 PPT 预测误写成行业共识 | `HBM5 roadmap uncertainty`, `UCIe deployment challenge`, `RISC-V server AI challenge` | critical analysis, cautious vendor docs | - | planned | - |

