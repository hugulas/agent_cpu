# 参考文献表格

说明：

- 本表只收录 `reading-log.md` 中 `disposition = kept` 的材料。
- 排序按研究方向分组，再按 `source_id` 排列。
- “用途”列用于快速定位该材料在课题中的角色，不等于正式引用格式。

| source_id | direction_id | 标题 | 日期 | 类型 | 在本课题中的用途 | 关键证据/数据 |
| --- | --- | --- | --- | --- | --- | --- |
| S005 | D02 | Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference | 2026-03-25 | paper / abstract mirror | 证明 CPU 抖动会通过多 GPU 同步链放大，是“CPU 进入关键路径”的底层因果 | dequeue 延迟可放大约 `19x`；CPU 抖动而非 GPU 饱和导致退化 |
| S001 | D03 | Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter | 2026-04-16/22 | paper abstract / discovery page | 证明 PD 分离已从单集群优化外延到跨数据中心、异构集群与商品以太网 | 吞吐相对同构 PD `+54%`；P90 TTFT `-64%`；相对朴素异构基线吞吐 `+32%` |
| S002 | D03 | Deploying disaggregated LLM inference workloads on Kubernetes | 2026-03-23 | official technical blog | 作为 PrfaaS 的近前置基线，说明 ingress / prefill / decode 解耦 | ingress-router、prefill worker、decode worker 分拆 |
| S003 | D03 | Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo | 2026-04-17 | official technical blog | 证明 agentic workload 已把 KV-aware placement、priority scheduling、agent-aware routing 推到前台 | `11.7x` read/write ratio；KV-aware placement；priority scheduling |
| S006 | D04 | NOSA: Native and Offloadable Sparse Attention | 2025-10-15 | paper summary / abstract mirror | 证明 KV offload 的关键不只是容量，而是 locality engineering 和 transfer domination | selected KV transfer 仍可能主导成本；解码吞吐最高 `2.3x` |
| S007 | D04 | ScoutAttention: Efficient KV Cache Offloading via Layer-Ahead CPU Pre-computation | 2026-03-28 | paper summary / abstract mirror | 证明 CPU 可从纯搬运者前移成 layer-ahead 协同计算者 | 精度损失 < `2.4%`；约 `2.1x` speedup |
| S008 | D05 | FluxMoE: Decoupling Expert Residency for High-Performance MoE Serving | 2026-04-03 | paper summary / abstract mirror | 证明 MoE serving 会把 route/place/move 链条推回 host | decoupled expert residency；吞吐最高 `3.0x` over vLLM |
| S009 | D06 | Enhancing Distributed Inference Performance with the NVIDIA Inference Transfer Library | 2026-03-09 | official technical blog | 证明 inference transfer 已成为显式控制平面能力 | NIXL unified API；non-blocking transfer；dynamic metadata exchange |
| S014 | D06 | NVIDIA Dynamo blog (NIXL section) | 2025 | official technical blog | 补强 transfer path 不是孤立库，而是 Dynamo control plane 的一部分 | 统一移动 GPU/CPU memory/storage；支持 KV transfer |
| S027 | D07 | Anthropic Claude Code Subagents | current | official docs | 用真实产品形态反推 `session multiplicity` 和独立上下文窗口对 CPU 的要求 | separate context window；independent execution；specialized subagents |
| S028 | D07 | Kimi Introduces Agent Swarm: Let 100 AI Agents Work for You | 2026-04-11 | official blog | 用真实产品形态反推 `fan-out/fan-in burst` 和瞬时宽并发 | up to `100` sub-agents；over `1,500` tool calls；`4.5x` faster than sequential |
| S029 | D07 | Kimi K2.5: Visual Agentic Intelligence | 2026 | official technical blog | 补强 Kimi 的并发 orchestrator 与 visual-agent 叙事 | PARL orchestrator；up to `100` sub-agents；up to `4.5x` wall-clock reduction |
| S030 | D07 | Anthropic / OpenClaw / Mobile Use Agent materials as multimodal or multi-session shape evidence | 2026/current | official docs / repo / official blog | 共同支撑 `multimodal ingress`、`prefill-first`、`resume-heavy` 等 workload 形态 | Claude 独立上下文；OpenClaw 持续环境交互；Mobile Use Agent GUI+多模态任务链 |
| S031 | D08 | NVIDIA Vera CPU Delivers High Performance, Bandwidth, and Efficiency for AI Factories | 2026-03-16 | official technical blog | 是平台层强证据，表明 CPU 正被前移为 orchestration / data movement / context switching 角色 | `1.2 TB/s` memory bandwidth；`88` Olympus cores |
| S032 | D08 | Inside the NVIDIA Rubin Platform: Six New Chips, One AI Supercomputer | 2026-01 | official technical blog | 进一步证明 Vera 的设计目标是 orchestration 和 coherent memory access | Vera as high-bandwidth low-latency data movement engine |
| S033 | D08 | Grace CPU Delivers High Bandwidth and Efficiency for Modern Data Centers | 2025-12-05 | official technical blog | 建立 Grace -> Vera 的平台连续性 | uniform memory access；roadmap to Vera with `1.2 TB/s` and `1.8 TB/s` NVLink-C2C |
| S020 | D10 | LLM Inference Benchmarking: Fundamental Concepts | 2025-04-02 | official technical blog | 作为 AI CPU benchmark 的 token-level 基线材料 | TTFT、ITL、TPS、RPS；输入输出长度分布 |
| S021 | D10 | Prefill-decode disaggregation | 2026/current | handbook | 为 AI CPU benchmark 提供 workload framing | prefill compute-bound；decode memory-bound；agentic workflows 改变资源比 |
| S022 | D10 | Prefix-aware routing: cache-conscious request distribution | 2026-04 | systems article / handbook | 说明 benchmark 必须纳入 cache-affinity 维度 | naive load balancing 会破坏 prompt cache hit rate |
| S023 | D11 | Prefill-Decode Disaggregation: Splitting the Two Stages of Inference | 2026-04-04 | technical article | 审慎方材料，用于界定 PD 分离的边界条件 | disaggregation not universally better；存在复杂度和双份权重成本 |
| S024 | D11 | DigitalOcean: Hidden Bottlenecks in LLM Inference and How to Fix Them | 2026-04 | technical article | 反方材料，提醒系统瓶颈不应被压缩成单一 CPU 叙事 | tokenization、prompt preprocessing、scheduling、KV management、streaming 都可能是瓶颈 |
| S025 | D11 | DigitalOcean: The LLM Inference Trilemma | 2026-04-22 | technical article | 反方材料，提醒 stateful inference 的扩展受多维约束 | throughput / latency / cost trilemma；stateful scaling；interconnect constraints |
| S010 | D12 | vLLM Automatic Prefix Caching | current | official design doc | prefix cache 机制层基线 | full-block prefix caching；KV cache manager；LRU eviction |
| S011 | D12 | Prefix-aware routing | current | handbook / systems guide | 说明分布式 prefix cache 如何被路由层利用 | worker-reported prefix status；consistent hashing；accurate/approximate router cache |
| S012 | D12 | Ray Prefix-aware routing | current | official docs | 非 NVIDIA 阵营的实现侧补充 | PrefixCacheAffinityRouter；cache hit rate vs load balance trade-off |
| S016 | D12 | Ray PrefixCacheAffinityRouter | 2026/current | official docs | 是 cache-aware routing 的强机制证据 | distributed prefix tree；prefix matching；load-balance check |
| S017 | D12 | Ray Serve routing policies | 2026/current | official docs | 说明 prefix-aware routing 已成为一等 routing policy | default P2C vs prefix-aware routing；cache locality optimization |
| S013 | D13 | Kimi Linear: An Expressive, Efficient Attention Architecture | 2025-10-30 | paper summary / abstract mirror | 解释 reduced-KV / hybrid-attention 为什么会改变 CPU/网络约束 | KV cache usage 最多 `-75%`；1M context decode throughput 最多 `6x` |
| S018 | D13 | Kimi Linear paper page / abstract mirrors | 2025-10-30 | paper mirror summaries | 作为 Kimi Linear 的阶段性补充记录 | hybrid linear attention；open-source kernels；vLLM implementation |
| S015 | D14 | LMCache disaggregated prefill example | current | official docs | 证明非 NVIDIA stack 也已把 disaggregated prefill + KV transfer 做成工作流 | prefiller / decoder / proxy architecture；NIXL/UCX transport |
| S034 | D15 | Introducing New KV Cache Reuse Optimizations in NVIDIA TensorRT-LLM | 2025 | official technical blog | 说明稀疏 KV 访问/复用已经进入工业 serving 的 policy 层 | priority-based KV eviction；KV cache event API；token range retention / early reuse |
| S035 | D16 | Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack-Scale Systems | 2025-12-18 | official technical blog | 说明 MoE 已从单请求计算问题转向批级与跨节点组织问题 | wide expert parallelism；rack-scale expert placement；host-side routing/placement pressure |
| S036 | D16 | FineMoE: Modeling Fine-Grained MoE Residuals for Expert Prefetching in Serving | 2026 | paper / discovery page | 说明 MoE 动态平衡可通过 fine-grained expert map 与历史轨迹实现 | expert map；semantic/trajectory similarity-guided prefetch；降低 expert miss |
| S037 | D16 | SpecMoEOff: Accelerating Mixture-of-Experts Inference via Speculative Expert Offloading | 2025-08-29 | paper / discovery page | 说明 speculative decoding 可用于隐藏 expert offloading 延迟 | speculative decoding 与 expert offloading 重叠；decode throughput 最高 `2.5x` |
| S038 | D17 | vLLM V1: A Major Upgrade with 1.7x Speedup | 2025-01-27 | official technical blog | 图化与调度重构的综合材料 | throughput 最多 `1.7x`；persistent batch；zero-overhead prefix caching；piecewise CUDA graphs |
| S039 | D17 | vLLM CUDA Graphs Design Document | current | official design doc | 说明图化编译在 serving 中的收益与动态回退代价 | `FULL_AND_PIECEWISE` vs `FULL_DECODE_ONLY`；compile/capture memory 开销；dynamic fallback |
| S040 | D17 | Event Tensor: Dynamic Megakernels for LLM Serving | 2026-04 | paper | 论文级支持运行时图化与 persistent kernel | dynamic megakernels；tile-level dependency encoding；减少 host launch tax |
| S041 | D12 | Prefix-aware routing — Ray Serve LLM | current | official docs | prefix cache 之后的工程化 routing 权衡 | `match_rate_threshold` 默认 `0.1`；高匹配走 affinity；失衡时回退 P2C |
| S042 | D12 | Kv Events Subscriber — vLLM | current | official docs / example | 说明 KV block state 已被事件化，可被控制器订阅 | `BlockStored` / `BlockRemoved` / `AllBlocksCleared`；带 block hashes、token ids、cache_salt |
| S043 | D12 | 5x Faster Time to First Token with NVIDIA TensorRT-LLM KV Cache Early Reuse | 2024-11-08 | official technical blog | 作为 prefix cache 后续演化的前置材料 | TTFT 最多 `5x`；block size `64 -> 8` tokens 可再带来最多 `7%` 改善 |
| S044 | D12 | [Performance]: Improve Prefix Cache Hit Rate and Reduce Dirty Cache Impact | 2025-09-07 | GitHub issue | 暴露 prefix cache 的真实代价：dirty cache 与 block lifecycle 会拖低命中收益 | dirty cache impact；block release 次序影响 hit rate |
| S045 | D12 | [Feature]: Support Persistent/Pinned Prefixes in Prefix Caching | 2025-08-18 | GitHub issue | 说明高价值 prefix 的长期保留已成为真实需求 | LRU eviction 不够；persistent/pinned prefixes 需求强 |
| S046 | D12 | [Bug]: The performance for Prefix Caching is very unstable for different requests | 2024-05-09 | GitHub issue | 提供 prefix cache 尾延迟不稳定的工程症状 | first token 从 `50ms` 到 `500ms+` 波动 |
| S047 | D12 | [Bug]: Prefix caching ignores visual input, causing incorrect multimodal outputs under concurrency | 2025-06-23 | GitHub issue | 说明多模态下 cache identity 设计失误会导致错误复用 | 相同文本但不同图像时出现错误输出；命中率约 `40%` |
