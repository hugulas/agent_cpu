# Search Directions

## Research Frame

- Topic: `agentic ai推理负载特征对AI CPU的影响`
- Exact question: 在忽略 `CPU 作为工具调用沙箱` 的前提下，`agentic LLM inference` 的哪些负载特征会显著改变 AI CPU 的角色、瓶颈位置、选型要求和部署方式？
- Scope:
  - 只看 `CPU 为大模型推理请求服务` 的场景
  - 重点关注请求接入、prefill/decode 阶段切换、KV 生命周期、MoE 编排、跨池传输、多会话调度、burst handling、cache-aware placement、远端 prefill 等
  - 不把工具执行本身、浏览器/容器沙箱、RPA 动作执行本身的 CPU 消耗纳入主结论
- Time boundary: 优先 `2025-01-01` 及之后；更优先 `2025-07-01` 及之后
- Languages: `zh`, `en`
- Source preferences:
  - 一级：论文、官方技术博客、官方文档、官方仓库、标准/架构材料
  - 二级：高质量产业分析，用于发现术语或生态信号
- Exclusion rules:
  - 纯 marketing 文案
  - 不提供机制、数据或部署含义的二手转述
  - 仅讨论 CPU 作为工具沙箱或 agent runtime 的材料

## Directions Ledger

| id | label | why it matters | starter queries | source targets | parent | status | reflection |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D01 | Agentic inference terminology and workload taxonomy | 先界定“agentic 推理负载”到底区别于普通 chat 在哪里 | `agentic inference workload characteristics`, `agentic llm inference systems` | papers, official blogs | - | planned | - |
| D02 | CPU slowdown and control-path bottlenecks | 建立“CPU 进入关键路径”的底层机制证据 | `CPU-induced slowdowns multi-GPU LLM inference`, `launch overhead LLM serving` | papers, engine blogs | - | planned | - |
| D03 | Prefill/decode disaggregation and Prefill-as-a-Service | 这是 agentic workload 最容易改变 CPU 角色的核心方向 | `prefill decode disaggregation`, `Prefill-as-a-Service`, `remote prefill service` | papers, official blogs | - | planned | - |
| D04 | KV lifecycle and cache orchestration | agentic workload 会把 KV 从容量问题推成状态生命周期问题 | `agentic inference KV cache`, `KV lifecycle offloading`, `cache-aware placement` | papers, official blogs | - | planned | - |
| D05 | MoE serving and host orchestration | 稀疏专家访问会显著抬高 host 协调价值 | `MoE serving host orchestration`, `expert residency prefetch` | papers, official blogs | - | planned | - |
| D06 | Transfer path and cross-pool coordination | CPU 不只调度计算，也调度传输与恢复 | `NIXL inference transfer library`, `distributed inference transfer`, `cross-pool KV transfer` | official blogs, docs, papers | - | planned | - |
| D07 | Real product workloads: Claude Code / Kimi / GUI / mobile agents | 用真实产品形态反推推理侧 CPU 约束 | `Claude Code subagents`, `Kimi Agent Swarm`, `mobile use agent`, `OpenClaw` | official docs, repos, blogs | - | searched | 形态证据已经足够说明多会话、极宽 fan-out、视觉重入会重写 CPU 约束，但仍缺系统级公开指标 |
| D08 | Platform signals: AI CPU, memory tiering, DPU, CXL | 平台路线图能验证 CPU 角色是否结构性前移 | `Vera CPU AI factories`, `CXL KV cache`, `BlueField inference` | official blogs, architecture articles | - | searched | 平台证据已能说明 CPU 正被前移为控制平面，但仍需谨慎区分 agentic inference 与 sandbox/工具执行叙事 |
| D09 | Deployment roles and node specialization | 研究不同节点角色如何改变 CPU 选型 | `prefill-heavy node`, `decode node`, `coordination-heavy swarm node` | official blogs, system papers | - | planned | - |
| D10 | Metrics and benchmark design for AI CPU under agentic inference | 如果没有正确指标，很多判断无法验证 | `agentic inference benchmark host CPU`, `dispatch latency resume latency benchmark` | papers, handbooks, official docs | - | searched | 现有材料足以定义指标框架，但还缺统一的 agentic host benchmark 实现 |
| D11 | Counterevidence and skeptical views | 防止结论被单边材料带偏 | `CPU not bottleneck LLM inference`, `why GPU still dominates agentic inference` | papers, critical analysis | - | searched | 反方更多是在提醒“不要把所有问题都归因给 CPU”，而不是否认 CPU 进入关键路径 |
| D12 | Prefix caching, cache-aware placement, burst handling | 这是 Prefill-as-a-Service 和 agentic burst 的关键补充机制，也是“从 prefix cache 到 KV-aware control plane”的主线 | `prefix cache placement`, `burst-aware scheduling`, `cache-aware request placement`, `selective cache retention`, `KV-aware routing` | papers, official blogs | D03 | searched | 现已能把 APC、affinity routing、selective retention、event-driven KV-aware routing 串成一条技术链，但还缺更多跨 executor consistency 与 metadata overhead 指标 |
| D13 | Hybrid-attention and KVCache shrink as deployment enabler | Prefill-as-a-Service 暗示模型结构变化本身会改变 CPU/网络约束 | `hybrid attention KVCache size serving`, `Kimi Linear KV cache serving`, `linear attention cross-datacenter serving` | papers, official blogs | D03 | searched | 已确认 Kimi Linear 使 KV 降低 75%，但还需补它如何影响部署分层与网络预算 |
| D15 | Sparse attention and sparse KV access under serving | 需要把“KV 变少”与“访问模式变稀疏”分开分析，前者改容量，后者改 CPU 的检索、预取和路由职责 | `sparse attention serving KV offloading`, `sparse KV access LLM serving`, `TensorRT-LLM KV reuse event API` | papers, official blogs, system docs | D04 | searched | 已有 NOSA / ScoutAttention，但这轮需要补服务化侧的 retention、event、early reuse 和 policy 代价 |
| D16 | MoE routing dynamic balance and expert skew control | 需要单独研究 MoE 中“路由不均、热点 expert、拓扑放置”的 host 侧平衡问题 | `MoE serving load balance routing`, `expert skew balancing inference`, `FineMoE`, `wide expert parallelism` | papers, official blogs | D05 | searched | 现有材料已足以说明 host 不只是搬权重，还要做批级均衡、expert cache 预取和拓扑感知放置 |
| D17 | Operator graphification and runtime graph dispatch | 需要分析图化编译、CUDA Graphs、persistent kernel 在服务化推理中的收益和代价 | `vLLM CUDA Graphs piecewise full decode only`, `Event Tensor dynamic megakernels`, `LLM serving graph compilation tradeoffs` | official docs, official blogs, papers | D02 | searched | 这条线会直接影响“调度墙”是否被消除，但也会引入 capture memory、warmup 和动态 batch 回退成本 |

## Direction Reflection: D02 CPU slowdown and control-path bottlenecks

- Status: `searched`
- What this direction taught us:
  - 多 GPU serving 中，CPU 抖动不是局部噪声，而会通过同步链放大成集群级等待
  - 这为 agentic workload 下“高频 prefill / resume / 多会话并行”为什么更容易打满 host 提供了底层因果支撑
- What still feels missing:
  - 需要把 slowdown paper 与真实 agentic workload 形状更直接对齐
- New directions added:
  - 暂无，先并入 `D10 benchmark`

## Direction Reflection: D04 KV lifecycle and cache orchestration

- Status: `searched`
- What this direction taught us:
  - KV 的关键变化不是容量大，而是访问模式从单调写入转向恢复、复用和路由
  - CPU 因而从 spill/搬运角色转向生命周期编排角色
- What still feels missing:
  - 需要更细地补 KV placement policy 与 multi-session agentic patterns 的关系
- New directions added:
  - 暂无，暂并入 `D12 prefix caching`

## Direction Reflection: D05 MoE serving and host orchestration

- Status: `searched`
- What this direction taught us:
  - MoE 不只增加通信，而是把 `route -> place -> move` 这条链条推回 host
  - 在 agentic inference 中，它与 KV lifecycle 明显竞争同一组 host 预算
- What still feels missing:
  - 还需要更直接的 agentic+MoE workload 证据
- New directions added:
  - 暂无

## Direction Reflection: D06 Transfer path and cross-pool coordination

- Status: `searched`
- What this direction taught us:
  - NIXL/NVIDIA transfer path 证明 CPU 侧已经不只是调度计算，还要管理 memory/storage/network 多层数据移动
  - 动态 metadata exchange 和 non-blocking transfer API 说明 inference control plane 已经开始系统化
- What still feels missing:
  - 需要更多非 NVIDIA 阵营材料交叉验证
- New directions added:
  - `D14 Non-NVIDIA transfer/control-plane alternatives`

## Direction Reflection: D12 Prefix caching, cache-aware placement, burst handling

- Status: `searched`
- What this direction taught us:
  - prefix caching 本身只是起点，后续真正改变 CPU 角色的是 `affinity routing`、`selective retention`、`KV-aware placement` 与 `event-driven cache view`
  - 这条线直接解释了为什么 CPU 要维护全局或近全局的 cache view，以及为什么 reuse 问题会升级成 control-plane 问题
- What still feels missing:
  - 还需要更多实测数字，而不只是机制说明，尤其是跨 executor cache state 一致性、metadata 开销和 prefix miss 的尾延迟代价
- New directions added:
  - 暂无

## Direction Reflection: D13 Hybrid-attention and KVCache shrink as deployment enabler

- Status: `searched`
- What this direction taught us:
  - Kimi Linear 类模型并没有削弱 CPU 的重要性，而是把约束从“KV 太大传不动”转向“KV 变小后是否能把跨域调度做对”
- What still feels missing:
  - 需要继续找 hybrid-attention 在 serving stack 中的实现与调度材料
- New directions added:
  - 暂无

| D14 | Non-NVIDIA transfer/control-plane alternatives | 避免 transfer path 结论被单厂商材料绑定 | `UCX inference transfer`, `LMCache transfer`, `Ray prefix affinity routing` | official docs, repos, handbooks | D06 | searched | 目前已找到 LMCache + Ray；还需继续补更底层 transport 和更多 serving 框架 |

## Direction Reflection: D14 Non-NVIDIA transfer/control-plane alternatives

- Status: `searched`
- What this direction taught us:
  - 非 NVIDIA 阵营也已经在把 `prefix-aware routing`、`disaggregated prefill`、`cache affinity` 做成一等机制，而不只是实现细节
  - 这说明“AI CPU 作为控制平面”并非单一厂商叙事，而是跨框架正在出现的结构性需求
- What still feels missing:
  - 还缺更多真实 production case 和更底层 transport 实测
- New directions added:
  - 暂无

## Direction Reflection: D10 Metrics and benchmark design for AI CPU under agentic inference

- Status: `searched`
- What this direction taught us:
  - 现有通用 benchmark 已经给出 `TTFT / ITL / TPS / RPS` 等基线，但还不足以覆盖 agentic workload 下的 `dispatch`, `resume`, `burst robustness`, `cache-affinity`
  - 更合理的 AI CPU benchmark 需要把传统 token 指标和状态系统指标合在一起
- What still feels missing:
  - 缺少现成的开源 benchmark 直接覆盖 `resume latency`、`prefix-aware routing hit quality`、`fan-out/fan-in burst robustness`
- New directions added:
  - 暂无

## Direction Reflection: D11 Counterevidence and skeptical views

- Status: `searched`
- What this direction taught us:
  - 反方并不否认 CPU 重要，而是强调“GPU 计算、显存、网络与批处理策略仍可能是主瓶颈”
  - 一些材料提醒：PD 分离、cache-aware routing、远端 prefill 都有额外复杂度和转移成本，不是无条件更优
- What still feels missing:
  - 需要更多 production case 来说明“什么时候 CPU 是主瓶颈，什么时候不是”
- New directions added:
  - 暂无

## Direction Reflection: D07 Real product workloads

- Status: `searched`
- What this direction taught us:
  - 真实产品形态已经足以稳定暴露 4 类约束：`prefill-first`、`session multiplicity`、`fan-out/fan-in burst`、`multimodal ingress`
  - Kimi Agent Swarm 进一步把“并发宽度”从推断提升成公开产品特征
- What still feels missing:
  - 公开产品缺少更细的 serving 级指标，如 prefix locality、resume latency、KV warm-tier hit
- New directions added:
  - 暂无

## Direction Reflection: D08 Platform signals

- Status: `searched`
- What this direction taught us:
  - 平台路线图已经不再把 CPU 当作传统外围 host，而是开始按 `orchestration + data movement + coherent memory access` 的角色组织
  - 内存带宽、近端互连、DPU 卸载和平台级一体化都在为 CPU 控制平面让路
- What still feels missing:
  - 需要谨慎区分哪些平台论述是在说 agentic inference，哪些是在说 sandbox/tool-use density
- New directions added:
  - 暂无

## Direction Reflection: D03 Prefill/decode disaggregation and Prefill-as-a-Service

- Status: `searched`
- What this direction taught us:
  - `prefill/decode disaggregation` 已经不只是单集群内的架构技巧，而开始外延到 `cross-datacenter / heterogeneous clusters`
  - CPU 的职责因此从本地阶段切换扩展到 `bandwidth-aware scheduling`、`cache-aware request placement`、`cross-domain KVCache transfer coordination`
  - `remote prefill service node` 值得作为独立部署角色看待
- What still feels missing:
  - 需要把 `PrfaaS` 与 `vLLM disaggregated prefilling`、`NIXL/transfer path`、`prefix cache` 进一步并排比较
  - 需要专门补 `hybrid attention / Kimi Linear` 这类模型侧 KV 缩减对 CPU 的影响
- New directions added:
  - `D13 Hybrid-attention and KVCache shrink as deployment enabler`

## Direction Reflection: D15 Sparse attention and sparse KV access under serving

- Status: `searched`
- What this direction taught us:
  - 稀疏 attention 的系统价值不只是“少算一些注意力”，而是把 CPU 的工作从大块搬运转向更细粒度的 `retain / select / prefetch / resume`
  - 稀疏 KV 访问一旦进入服务化推理，CPU 就需要维护更细的状态元数据和更强的事件驱动路由能力
- What still feels missing:
  - 还缺真实线上 cache policy 的命中、误判和 metadata 开销数据
- New directions added:
  - 暂无

## Direction Reflection: D16 MoE routing dynamic balance and expert skew control

- Status: `searched`
- What this direction taught us:
  - MoE 的 host 压力不只来自冷 expert 权重搬运，还来自 `expert skew smoothing`、`hot/cold expert residency` 和 `topology-aware balancing`
  - 动态平衡做得差时，GPU 空闲并不一定来自算力不足，而可能来自 host 没把路由、预取和跨卡组织好
- What still feels missing:
  - 还缺更多 production case 来说明动态路由平衡在真实业务中的尾延迟代价
- New directions added:
  - 暂无

## Direction Reflection: D17 Operator graphification and runtime graph dispatch

- Status: `searched`
- What this direction taught us:
  - 图化编译、piecewise/full CUDA Graphs、persistent kernel 确实能显著降低 host dispatch 开销
  - 但在服务化推理里，它们不是“只赚不赔”的优化，而是拿 `capture memory`、`warmup time`、`backend compatibility` 和 `dynamic batch fallback complexity` 去换较低的调度税
- What still feels missing:
  - 还缺更多跨框架实测，尤其是 mixed prefill/decode 和多模态批次下的回退行为
- New directions added:
  - 暂无
