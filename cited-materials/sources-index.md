# Sources Index

本目录保存 `agentic-ai-head-cpu-insight-2025h2plus.md` 及其后续修订版本使用到的本地引用材料。

## 原有本地归档（NV Blog / 厂商白皮书 / 其他）

| Local file | Original URL | Used for |
| --- | --- | --- |
| `nvidia-cpu-gpu-memory-sharing-2025-09-05.pdf` | https://developer.nvidia.com/blog/accelerate-large-scale-llm-inference-and-kv-cache-offload-with-cpu-gpu-memory-sharing/ | Chrome 打印版网页 PDF；支撑 CPU 内存成为 warm KV 层、统一内存地址空间、NVLink-C2C 对 KV offload 的意义 |
| `nvidia-kv-bottlenecks-dynamo-2025-09-18.pdf` | https://developer.nvidia.com/blog/how-to-reduce-kv-cache-bottlenecks-with-nvidia-dynamo/ | Chrome 打印版网页 PDF；支撑 KV cache 可卸到 CPU RAM / SSD / network storage，说明 host CPU 已成为分层状态存储中枢 |
| `nvidia-wide-expert-parallelism-2025-12-18.pdf` | https://developer.nvidia.com/blog/scaling-large-moe-models-with-wide-expert-parallelism-on-nvl72-rack-scale-systems/ | Chrome 打印版网页 PDF；支撑 MoE expert routing、placement 和跨 GPU 通信对 host orchestration 的要求 |
| `nvidia-inference-transfer-library-2026-03-09.pdf` | https://developer.nvidia.com/blog/enhancing-distributed-inference-performance-with-the-nvidia-inference-transfer-library/ | Chrome 打印版网页 PDF；支撑 NIXL、RDMA / NVLink / NVMe-oF 等数据搬运能力，以及 host 进入轻数据面 |
| `nvidia-disaggregated-llm-k8s-2026-03-23.pdf` | https://developer.nvidia.com/blog/deploying-disaggregated-llm-inference-workloads-on-kubernetes/ | Chrome 打印版网页 PDF；支撑 disaggregated inference、ingress-router / prefill / decode 解耦部署，对"算子下发"章节最关键 |
| `nvidia-agentic-inference-dynamo-2026-04-17.pdf` | https://developer.nvidia.com/blog/full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo/ | Chrome 打印版网页 PDF；支撑 agentic inference 的 WORM 式 KV 访问、85%-97% hit、97.2% aggregate hit、11.7x read/write ratio |
| `nvidia-vera-cpu-ai-factories-2026-03.pdf` | https://developer.nvidia.com/blog/nvidia-vera-cpu-delivers-high-performance-bandwidth-and-efficiency-for-ai-factories/ | Chrome 打印版网页 PDF；支撑 Vera CPU 的高带宽内存、NVLink-C2C 与"AI factory 控制平面"定位 |
| `storagereview-vera-rubin-ces-2026.pdf` | https://www.storagereview.com/news/nvidia-launches-vera-rubin-architecture-at-ces-2026-the-vr-nvl72-rack | Chrome 打印版网页 PDF；支撑 Vera/Rubin/BlueField-4 一体化平台拓扑，以及相关图示 |
| `astera-cxl-kv-cache-2025-11.pdf` | https://www.asteralabs.com/breaking-through-the-memory-wall-how-cxl-transforms-rag-and-kv-cache-performance/ | Chrome 打印版网页 PDF；支撑 CXL memory 扩展对 KV warm tier 的容量/经济性信号 |
| `kimi-agent-swarm-2026-04-11.pdf` | https://www.kimi.com/blog/agent-swarm.html | Chrome 打印版网页 PDF；支撑极宽 fan-out/fan-in、多 sub-agents 并行对 host CPU 调度宽度的压力 |
| `volcengine-mobile-use-agent-2026-04-29.pdf` | https://developer.volcengine.com/articles/7628489608359395369 | Chrome 打印版网页 PDF；支撑 Mobile Use Agent / 手机 GUI agent 的产品形态；报告中用于推断多模态 prefill 与高频状态切换 |
| `openclaw-readme-2026-04-14-window.md` | https://github.com/openclaw/openclaw | 支撑 OpenClaw 的 always-on、多入口、Android node / camera / canvas 等产品形态；报告中用于 workload 形态推断 |
| `anthropic-claude-code-subagents-current.pdf` | https://docs.anthropic.com/en/docs/claude-code/sub-agents | Chrome 打印版网页 PDF；作为补充证据，支撑 Claude Code subagents 的 separate context window 与额外上下文收集延迟 |

## 新增本地归档（Reading Log `kept` 条目）

### 学术论文（ArXiv PDF 直链下载）

| Local file | Original URL | Used for |
| --- | --- | --- |
| `s001-prefill-as-a-service-2026-04.pdf` | https://arxiv.org/pdf/2604.15039.pdf | PrFaaS：提出 KVCache 可跨数据中心卸载，支撑 prefill-as-a-service 架构对 host CPU 网络与存储带宽的需求 |
| `s005-cpu-induced-slowdowns-2026-03.pdf` | https://arxiv.org/pdf/2603.22774.pdf | 量化分析多 GPU LLM 推理中 CPU 导致的 slowdown，直接支撑 host CPU 瓶颈章节 |
| `s006-nosa-sparse-attention-2025-10.pdf` | https://arxiv.org/pdf/2510.13602.pdf | NOSA：原生可卸载稀疏注意力，支撑 KV cache 稀疏化与 CPU 侧 memory tier 交互 |
| `s007-scoutattention-kv-offloading-2026-03.pdf` | https://arxiv.org/pdf/2603.27138.pdf | ScoutAttention：Layer-ahead CPU 预计算实现高效 KV cache offloading，支撑 CPU-GPU 协作预取机制 |
| `s008-fluxmoe-moe-serving-2026-04.pdf` | https://arxiv.org/pdf/2604.02715.pdf | FluxMoE：解耦 expert residency 的 MoE  serving，支撑 MoE expert 动态 placement 对 host orchestration 的要求 |
| `s013-kimi-linear-attention-2025-10.pdf` | https://arxiv.org/pdf/2510.26692.pdf | Kimi Linear：高效注意力架构，支撑线性注意力对 KV cache 容量与 host memory 压力的缓解 |
| `s018-kimi-linear-abstract-mirror.pdf` | https://arxiv.org/abs/2510.26692 | Kimi Linear arXiv 摘要页镜像，支撑 linear attention 关键信息核对 |
| `s036-arxiv-org-FineMoE- Modeling Fine-Grained MoE Residuals for E.pdf` | https://arxiv.org/pdf/2502.05370.pdf | FineMoE：细粒度 expert map 与语义/轨迹相似度指导预取，支撑 host 侧需维护更细粒度 routing state |
| `s037-arxiv-org-SpecMoEOff- Accelerating Mixture-of-Experts Infere.pdf` | https://arxiv.org/pdf/2508.21706.pdf | SpecMoEOff： speculative decoding 掩盖 expert offloading latency，支撑 MoE 路由动态平衡的另一条思路 |
| `s040-arxiv-org-Event Tensor- Dynamic Megakernels for LLM Serving.pdf` | https://arxiv.org/pdf/2604.13327.pdf | Event Tensor：动态 megakernels 减少 kernel boundary sync 与 host launch tax，支撑运行时图化与 persistent kernel 机制 |

### 官方文档 / 技术博客（Chromium 打印 PDF + wget 网页归档）

| Local file | Original URL | Used for |
| --- | --- | --- |
| `s010-vllm-prefix-caching.pdf` | https://docs.vllm.ai/en/latest/features/automatic_prefix_caching.html | vLLM 自动前缀缓存文档，支撑 prefix caching 命中机制与 host CPU 调度关联 |
| `s011-prefix-aware-routing.pdf` | https://bentoml.com/llm/inference-optimization/prefix-aware-routing | BentoML prefix-aware routing 文档 |
| `s012-ray-prefix-aware-routing.pdf` | https://docs.ray.io/en/latest/serve/llm/user-guides/prefix-aware-routing.html | Ray Serve prefix-aware routing 用户指南 |
| `s014-nvidia-dynamo-intro-nixl-section.pdf` | https://developer.nvidia.com/blog/introducing-nvidia-dynamo-a-low-latency-distributed-inference-framework-for-scaling-reasoning-ai-models/ | NVIDIA Dynamo 介绍博客（含 NIXL 章节），支撑 transfer path 是 Dynamo control plane 而非孤立库 |
| `s015-lmcache-disaggregated-prefill.pdf` | https://docs.lmcache.ai/getting_started/quickstart/disaggregated_prefill.html | LMCache disaggregated prefill 快速入门，支撑 prefill-decode 解耦部署参考 |
| `s016-ray-prefix-cache-affinity-router.pdf` | https://www.anyscale.com/blog/ray-serve-faster-first-token-custom-routing | Ray Serve PrefixCacheAffinityRouter 介绍：分布式 prefix tree、负载均衡与缓存命中率权衡 |
| `s017-ray-routing-policies.pdf` | https://docs.ray.io/en/latest/serve/llm/architecture/routing-policies.html | Ray Serve LLM routing policies 架构文档，支撑请求路由策略对 host CPU 调度决策的影响 |
| `s020-llm-inference-benchmarking-2025-04.pdf` | https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts/ | NVIDIA LLM 推理基准测试基础概念，支撑推理性能评估框架 |
| `s021-prefill-decode-disaggregation.pdf` | https://bentoml.com/llm/inference-optimization/prefill-decode-disaggregation | BentoML prefill-decode 解耦文档 |
| `s022-prefix-aware-routing-cache-conscious.pdf` | https://bentoml.com/llm/inference-optimization/prefix-aware-routing | BentoML prefix-aware routing（cache-conscious request distribution 角度） |
| `s023-prefill-decode-disaggregation-2026-04.pdf` | https://optiversetech.com/blog/prefill-decode-disaggregation/ | Optiverse prefill-decode 解耦技术博客 |
| `s024-digitalocean-hidden-bottlenecks-2026-04.pdf` | https://www.digitalocean.com/community/conceptual-articles/bottlenecks-llm-inference-optimization | DigitalOcean LLM 推理隐藏瓶颈分析 |
| `s025-digitalocean-llm-trilemma-2026-04.pdf` | https://www.digitalocean.com/blog/llm-inference-tradeoffs | DigitalOcean LLM 推理三难困境（延迟/吞吐/成本） |
| `s029-kimi-k2-5-2026.pdf` | https://www.kimi.com/blog/kimi-k2-5.html | Kimi K2.5 视觉智能体博客，支撑视觉 agentic workload 对 host CPU 的压力 |
| `s030-volcengine-mobile-use-agent.pdf` | https://developer.volcengine.com/articles/7628489608359395369 | 火山引擎 Mobile Use Agent 介绍，支撑多模态 prefill 与高频状态切换 workload 形态 |
| `s033-nvidia-grace-cpu-2025-12.pdf` | https://developer.nvidia.com/blog/nvidia-grace-cpu-delivers-high-bandwidth-and-efficiency-for-modern-data-centers/ | NVIDIA Grace CPU 高带宽与能效博客，支撑 Grace CPU 作为 AI 数据中心 host 处理器的定位 |
| `s034-developer-nvidia-com-Introducing New KV Cache Reuse Optimizations in NV.pdf` | https://developer.nvidia.com/blog/introducing-new-kv-cache-reuse-optimizations-in-nvidia-tensorrt-llm/ | TensorRT-LLM KV cache reuse 优化：priority-based eviction、KV cache event API、token range retention，支撑 KV 访问已从 LRU spill 转向 workload-aware reuse policy |
| `s038-blog-vllm-ai-vLLM V1- A Major Upgrade with 1.7x Speedup.pdf` | https://blog.vllm.ai/2025/01/27/vllm-v1.html | vLLM V1 架构升级：persistent batch、zero-overhead prefix caching、piecewise CUDA graphs、CPU overhead reduction |
| `s039-docs-vllm-ai-vLLM CUDA Graphs Design Document.pdf` | https://docs.vllm.ai/en/latest/design/cuda_graphs.html | vLLM CUDA Graphs 设计文档：`FULL_AND_PIECEWISE` vs `FULL_DECODE_ONLY`、动态形状回退、compile/capture memory 开销 |
| `s041-prefix-aware-routing-ray-serve-llm.pdf` | https://docs.anyscale.com/llm/serving/request-routing | Anyscale 平台 prefix-aware routing 配置指南，支撑 locality vs load-balance 权衡参数 |
| `s042-docs-vllm-ai-Kv Events Subscriber — vLLM.pdf` | https://docs.vllm.ai/en/latest/examples/online_serving/kv_events_subscriber/ | vLLM KV block state 事件流：`BlockStored` / `BlockRemoved` / `AllBlocksCleared`，支撑 KV 状态已暴露为事件流而非本地缓存表 |
| `s043-developer-nvidia-com-5x Faster Time to First Token with NVIDIA TensorRT.pdf` | https://developer.nvidia.com/blog/5x-faster-time-to-first-token-with-nvidia-tensorrt-llm-kv-cache-early-reuse/ | TensorRT-LLM KV cache early reuse：系统提示 burst 场景 TTFT 最多 `5x`；block size `64 -> 8` 带来最多 `7%` TTFT 改善 |
| `s044-github-com-[Performance]- Improve Prefix Cache Hit Rate and R.pdf` | https://github.com/vllm-project/vllm/issues/24394 | vLLM prefix cache dirty cache 问题：相邻请求 block release 次序影响 hit rate，反证 prefix reuse 工程难点不仅是算法 |
| `s045-github-com-[Feature]- Support Persistent-Pinned Prefixes in P.pdf` | https://github.com/vllm-project/vllm/issues/23083 | vLLM persistent/pinned prefixes 需求：现有 LRU eviction 对高价值 prefixes 不够，反证 retention policy 已成为核心问题 |
| `s046-github-com-[Bug]- The performance for Prefix Caching is very .pdf` | https://github.com/vllm-project/vllm/issues/3918 | vLLM prefix cache 尾延迟不稳定：first token `50ms` 到 `500ms+` 波动，说明命中并不自动等于稳定收益 |
| `s047-github-com-[Bug]- Prefix caching ignores visual input, causin.pdf` | https://github.com/vllm-project/vllm/issues/20261 | vLLM prefix cache 多模态一致性问题：相同文本不同图像下 cache 导致错误输出，反证 multimodal agentic serving 需更严格 cache identity 设计 |

## Web 归档目录

部分网页因资源繁多，`wget --page-requisites` 超时未能完整归档，但 Chromium 打印 PDF 均已成功生成。网页资源（HTML + CSS + 图片）保存在：

- `cited-materials/web-archives/S010/` — vLLM prefix caching
- `cited-materials/web-archives/S011/` — BentoML prefix-aware routing
- `cited-materials/web-archives/S012/` — Ray prefix-aware routing（部分资源）
- `cited-materials/web-archives/S015/` — LMCache disaggregated prefill
- `cited-materials/web-archives/S016/` — Ray PrefixCacheAffinityRouter
- `cited-materials/web-archives/S017/` — Ray routing policies（部分资源）
- `cited-materials/web-archives/S021/` — BentoML prefill-decode disaggregation
- `cited-materials/web-archives/S022/` — BentoML prefix-aware routing（cache-conscious）
- `cited-materials/web-archives/S024/` — DigitalOcean hidden bottlenecks
- `cited-materials/web-archives/S025/` — DigitalOcean LLM trilemma
- `cited-materials/web-archives/S029/` — Kimi K2.5
- `cited-materials/web-archives/S030/` — Volcengine Mobile Use Agent
- `cited-materials/web-archives/S038/` — vLLM V1 blog
- `cited-materials/web-archives/S039/` — vLLM CUDA Graphs design doc
- `cited-materials/web-archives/S041/` — Anyscale prefix-aware routing
- `cited-materials/web-archives/S042/` — vLLM KV Events Subscriber
- `cited-materials/web-archives/S044/` — vLLM GitHub issue #24394
- `cited-materials/web-archives/S045/` — vLLM GitHub issue #23083
- `cited-materials/web-archives/S046/` — vLLM GitHub issue #3918
- `cited-materials/web-archives/S047/` — vLLM GitHub issue #20261

## Notes

- Anthropic 文档未暴露明确发布日期，在报告中只作为补充证据使用，不作为 `2025-07-01` 日期边界内的主证据。
- OpenClaw 与 Mobile Use Agent 两项主要用于 workload 形态推断，不单独作为底层 CPU 负载机制的直接证据。
- 新增 `s001`–`s047` 系列文件来源于 `material/reading-log.md` 中标记为 `kept` 的条目，经脚本自动下载/打印归档。
- 部分条目（S002/S003/S009/S027/S028/S030/S031/S032/S035）以原有命名文件形式存在于目录中，未纳入 `s*` 编号序列，但同样来自 reading-log `kept` 条目。
