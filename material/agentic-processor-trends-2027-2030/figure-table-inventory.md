## 图表清单

### 可直接复用的现成图

| asset | source | why it matters |
|---|---|---|
| `assets/nvidia-vera-cpu-architecture.png` | NVIDIA Vera technical blog | 最适合解释 CPU 被设计成高带宽 data engine，而不是传统通用 host |
| `assets/nvidia-vera-rubin-6chips.png` | Rubin platform related material | 最适合解释 CPU/GPU/DPU/NIC/switch 一体化平台 |
| `assets/nvidia-bluefield4.png` | Rubin / BlueField platform material | 最适合解释数据面与基础设施任务从 host CPU 旁路 |

### 本轮新提取页

| asset | source_id | page | role |
|---|---|---|---|
| `assets/agentic-processor-trends/t009-cxl-2.png` | T009 | 2 | 解释 CXL 4.0 Bundled Ports 如何把 host-device 带宽扩到 `1.536TB/s` |
| `assets/agentic-processor-trends/t011-hbm4-1.png` | T011 | 1 | HBM4 量产与带宽/能效要点摘要页 |
| `assets/agentic-processor-trends/t011-hbm4-2.png` | T011 | 2 | HBM4 的 `2,048` I/O、`>10Gbps` 与 `up to 69%` AI service performance 文字页 |

### 不建议直接使用的提取页

| asset | reason |
|---|---|
| `t001-vera-03.png` 到 `t001-vera-05.png` | Chromium 打印前未处理 cookie overlay，图像可读性差；继续用现成 NVIDIA 图更稳 |
| `t002-rubin-03.png` 到 `t002-rubin-06.png` | 打印页多为图后文字说明页，不如现成 `nvidia-vera-rubin-6chips.png` 直观 |
| `t004-amd-open-rack-scale-agentic-ai-2025-06-12.pdf` | AMD 页面捕获异常，需后续单独补镜像 |

