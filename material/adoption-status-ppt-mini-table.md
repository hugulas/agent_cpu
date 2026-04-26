# Agentic AI 推理相关技术的工业采用状态极简表

> 日期：2026-04-26  
> 用途：PPT / 汇报一页概览

## 状态缩写

- `A`：已工业采用
- `B`：已产品化，但仍局部或条件性采用
- `C`：工业界明确关注，但仍探索/试点
- `D`：研究验证为主
- `E`：平台信号

## 极简判断表

| 方向 | 状态 | 一句话判断 |
| --- | --- | --- |
| Automatic Prefix Caching | A | 已进入主流 serving 栈，是状态复用的第一代默认能力。 |
| Prefix-aware routing / cache affinity | A | 已成为正式 routing policy，说明 prefix reuse 已进入调度面。 |
| CPU overhead reduction + piecewise CUDA Graphs | A | 工业界已把 dispatch tax 当成现实问题来修。 |
| KV reuse policy / selective retention / event API | B | 已有官方能力，但依赖更强控制面和 workload knowledge。 |
| PD 分离 / disaggregated prefilling | B | 已产品化，但不是所有场景都默认值得做。 |
| Wide Expert Parallelism / rack-scale MoE organization | B | 已进入高端平台与大规模集群，但不是普遍默认配置。 |
| KV-aware routing across executors | B | 官方已开始事件化和 API 化，但跨框架仍未全面默认。 |
| Prefill-as-a-Service / cross-datacenter prefill | C | 工业界明显重视，但仍偏先进架构和试点方向。 |
| Persistent / pinned prefixes | C | 需求已经明确，但 retention policy 还没完全成型。 |
| Multimodal cache identity | C | 问题已经暴露，但统一、成熟的解法还没出现。 |
| NOSA / sparse-attention-for-offloading | D | 前沿方向明确，但尚未见主流产品默认采用。 |
| ScoutAttention / layer-ahead CPU cooperation | D | 机制很强，但工业吸收仍弱。 |
| FluxMoE / FineMoE / SpecMoEOff | D | 代表未来 MoE control plane 方向，但当前仍偏论文和 POC。 |
| Event Tensor / dynamic megakernels | D | 代表更激进的图化路线，尚未成为主流产品能力。 |
| CPU slowdown characterization | D | 是工业判断的重要因果证据，不是产品功能本身。 |
| Vera / Grace / Rubin / BlueField | E | 平台路线已收敛到 CPU 控制平面，但不等于软件栈已全面落地。 |

## 三句带走

1. 工业界已经广泛采用的是 `reuse + routing + graphification + runtime overhead reduction`。  
2. 还在快速演化的是 `PD 分离深化 + KV policy + MoE dynamic balance + multimodal cache identity`。  
3. 真正还主要停留在研究前沿的，是更激进的新算法和更激进的 runtime 机制。  
