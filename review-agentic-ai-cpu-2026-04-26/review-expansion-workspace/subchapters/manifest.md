# Subchapter Manifest

- Scope: split the four main lines into fine-grained expansion units
- Parent chapters:
  - `06-5-主线一-算子下发为什么从-launch-overhead-变成调度墙.md`
  - `07-6-主线二-kv-不再只是容量对象-而是生命周期对象.md`
  - `08-7-主线三-moe-为什么会把-host-side-orchestration-推到前台.md`
  - `09-8-主线四-pd-分离与跨池控制平面.md`
- Subchapters: `16`

## 材料索引

以下 S 编号为子章节正文中引用的核心材料索引，完整版本与原始 URL 参见项目根目录 `cited-materials/sources-index.md`。

| S 编号 | 材料名称 | 类型 | 日期 |
| --- | --- | --- | --- |
| S005 | Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference (arXiv 2603.22774) | 学术论文 | 2026-03 |
| S021 | BentoML: Prefill-Decode Disaggregation | 技术文档 | 2026/current |
| S024 | DigitalOcean: Hidden Bottlenecks in LLM Inference and How to Fix Them | 技术博客 | 2026-04 |
| S025 | DigitalOcean: The LLM Inference Trilemma | 技术博客 | 2026-04 |
| S038 | vLLM V1: A Major Upgrade with 1.7x Speedup | 官方博客 | 2025-01 |
| S039 | vLLM CUDA Graphs Design Document | 官方文档 | current |
| S040 | Event Tensor: Dynamic Megakernels for LLM Serving (arXiv 2604.13327) | 学术论文 | 2026-04 |

| Order | File | Parent | Focus |
| --- | --- | --- | --- |
| 1 | `01-主线一-微观问题-kernel-launch-tax.md` | 主线一 | kernel launch tax 与 CPU slowdown |
| 2 | `02-主线一-宏观问题-状态驱动调度链.md` | 主线一 | queue、broadcast、sync、worker selection |
| 3 | `03-主线一-图化编译与运行时图化.md` | 主线一 | piecewise/full CUDA Graphs、persistent kernels |
| 4 | `04-主线一-图化编译在服务化推理中的利弊.md` | 主线一 | 收益、代价、fallback |
| 5 | `05-主线二-从-kv-offload-到-kv-lifecycle.md` | 主线二 | write-once-read-many、retention、resume |
| 6 | `06-主线二-稀疏attention与稀疏kv访问.md` | 主线二 | NOSA、ScoutAttention、sparse access |
| 7 | `07-主线二-prefix-cache是第一代状态复用技术.md` | 主线二 | APC 的意义与边界 |
| 8 | `08-主线二-prefix-cache之后的技术演化.md` | 主线二 | affinity routing、retention、events、identity |
| 9 | `09-主线二-kv的工业控制平面化趋势.md` | 主线二 | KV-aware routing、warm tier、state visibility |
| 10 | `10-主线三-稀疏计算优势为何不自动转化成系统收益.md` | 主线三 | cold expert、miss、同步链 |
| 11 | `11-主线三-专家驻留预取与动态平衡.md` | 主线三 | FluxMoE、FineMoE、SpecMoEOff |
| 12 | `12-主线三-moe路由动态平衡问题.md` | 主线三 | skew、hot/cold、topology、batch balance |
| 13 | `13-主线三-工业界当前吸收到了哪一步.md` | 主线三 | Wide EP 与工业吸收 |
| 14 | `14-主线四-agentic为什么特别适合拆出prefill.md` | 主线四 | prefill-first、shared prefix、remote prefill |
| 15 | `15-主线四-从单集群pd到prefill-as-a-service.md` | 主线四 | cross-cluster、cross-datacenter、scheduling |
| 16 | `16-主线四-这对cpu的直接要求.md` | 主线四 | transfer stack、KV movement、placement、remote node |
