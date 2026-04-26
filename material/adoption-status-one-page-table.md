# Agentic AI 推理相关技术的工业采用状态一页表

> 日期：2026-04-26  
> 范围：只看 `CPU 为大模型推理请求服务` 的场景，不含工具执行沙箱本身。

## 状态定义

- `A 已工业采用`：已进入主流工业 serving 栈或官方产品能力，已有文档、API、配置或部署说明。
- `B 已产品化，但仍局部或条件性采用`：官方已有实现，但不是默认适用，强依赖负载、平台或部署条件。
- `C 工业界明确关注，但仍探索/试点`：方向已被工业界承认重要，但还没有足够强的默认落地信号。
- `D 研究验证为主`：主要停留在论文、专利、POC 或 discovery 阶段。
- `E 平台信号`：平台路线图正在为该方向让路，但不等于上层软件栈已经广泛采用。

## 一页判断表

| 技术方向 / 材料簇 | 采用状态 | 代表材料 | 为什么是这个状态 | 为什么重要 |
| --- | --- | --- | --- | --- |
| Automatic Prefix Caching | A 已工业采用 | `S010`, `S038` | 已进入 vLLM 官方设计和主流 serving 栈，不是论文概念 | 是 prefix/state reuse 的第一代默认能力 |
| Prefix-aware routing / cache affinity | A 已工业采用 | `S012`, `S016`, `S017`, `S041` | Ray Serve 已有正式 routing policy、参数和回退逻辑 | 说明 prefix reuse 已进入调度面 |
| CPU overhead reduction + piecewise CUDA Graphs | A 已工业采用 | `S038`, `S039` | 已进入 vLLM 官方 execution loop 和图化设计 | 说明“调度墙”已是工业现实问题 |
| KV reuse policy / selective retention / event API | B 已产品化，但仍局部或条件性采用 | `S034`, `S042`, `S043` | 已进入 TensorRT-LLM / vLLM 官方能力，但依赖更强控制面和 workload knowledge | prefix cache 之后的真正演化方向 |
| PD 分离 / disaggregated prefilling | B 已产品化，但仍局部或条件性采用 | `S002`, `S021` | 主流系统都在做，但 vLLM 仍公开标注 experimental，且反方材料表明并非 universally better | 是 agentic inference 非常关键的近现实方向 |
| Wide Expert Parallelism / rack-scale MoE organization | B 已产品化，但仍局部或条件性采用 | `S035` | 已有明确平台/系统实现，但依赖高端平台和大规模集群 | MoE 不再只是模型结构问题，而是拓扑与控制面问题 |
| KV-aware routing across executors / event-driven cache view | B 已产品化，但仍局部或条件性采用 | `S003`, `S034`, `S042` | 官方已经事件化和 API 化，但跨框架仍未完全默认 | 是“状态复用控制平面”的核心能力 |
| Prefill-as-a-Service / cross-datacenter prefill | C 工业界明确关注，但仍探索/试点 | `S001` | 结果强，但还缺主流 serving 栈把它当默认能力的信号 | 可能改写 prefill 节点与网络预算 |
| Persistent / pinned prefixes | C 工业界明确关注，但仍探索/试点 | `S045` | 已是明确用户需求，但还停留在 feature request / policy design 层 | 说明 retention policy 正从隐式变显式 |
| Multimodal cache identity | C 工业界明确关注，但仍探索/试点 | `S047` | 工程中已暴露 correctness 问题，但还缺统一解法 | 对 GUI/mobile agent 特别关键 |
| NOSA / sparse-attention-for-offloading | D 研究验证为主 | `S006` | 机制强，但未见主流产品化默认采用信号 | 代表 sparse KV / offload-friendly design 的前沿方向 |
| ScoutAttention / layer-ahead CPU cooperation | D 研究验证为主 | `S007` | 研究上很有启发，但工业吸收信号还弱 | 说明 CPU 可进一步前移成协同计算者 |
| FluxMoE / FineMoE / SpecMoEOff | D 研究验证为主 | `S008`, `S036`, `S037` | 解决的问题很真实，但当前仍主要是论文/POC 层 | 代表未来 MoE control plane 的可能演化 |
| Event Tensor / dynamic megakernels | D 研究验证为主 | `S040` | 论文很强，但还不是主流产品栈默认能力 | 代表更激进的图化编译路线 |
| CPU slowdown characterization | D 研究验证为主 | `S005` | 是论文级诊断因果，不是产品功能 | 解释为什么工业界会去修 runtime / control plane |
| Vera / Grace / Rubin / BlueField | E 平台信号 | `S031`, `S032`, `S033` | 说明平台路线正在围绕 orchestration、memory、data movement 重构 CPU 角色 | 证明这不是局部优化，而是平台收敛方向 |

## 三句总结

1. **工业界已经广泛采用的，不是所有新算法，而是“把推理系统变成控制平面问题”的方向。**
2. **最成熟的能力集中在 `prefix reuse + routing + graphification + runtime overhead reduction`。**
3. **最值得继续追踪的近未来方向是 `PD 分离深化、KV reuse policy、MoE 动态平衡、multimodal cache identity`。**
