## 主线二子章节 1：从 KV Offload 到 KV Lifecycle

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| agentic workload 已把 KV 从“容量补丁”变成“状态生命周期对象” | `S003 (NVIDIA Dynamo agentic) S006 (NOSA) S007 (ScoutAttention) S034 (TensorRT-LLM KV reuse)` | `11.7x` read/write ratio；NOSA memory hierarchy；ScoutAttention layer-ahead 路径 |
| KV 的主价值已从一次写入转向长期保留、恢复和复用 | `S003 (NVIDIA Dynamo agentic) S034 (TensorRT-LLM KV reuse)` | priority-based eviction；token-range retention；event API |
| CPU 的职责因此从搬运者升级为 retention / prefetch / resume 规划器 | `S006 (NOSA) S007 (ScoutAttention)` | NOSA 最高 `2.3x` decode throughput；ScoutAttention 约 `2.1x` speedup |

### 1. 本章核心判断

在 agentic inference 中，KV 已经不应被理解成“显存放不下时可以挪出去的一堆缓存”，而应被理解成一个**需要被长期保留、反复恢复、按价值调度的状态对象**。这不是措辞升级，而是问题定义本身已经变了：NVIDIA Dynamo 给出的 agentic 数据表明，KV 访问的读写比可以达到 `11.7x`，也就是同一段状态被读回和复用的频率远高于第一次写入。[1] 一旦读远多于写，系统优化目标就不会再停留在“能不能塞下”，而会转向“能不能在正确时间、正确层级、以正确代价把它拿回来”。

### 2. 为什么“容量问题”这个旧定义已经不够

早期 KV offload 的出发点很简单：上下文更长、批次更大、HBM 不够，于是把问题表述成“如何把 KV 搬到 CPU memory 或 storage”。但 `S006 (NOSA)` 和 `S007 (ScoutAttention)` 这类材料共同说明，真实瓶颈并不只是容量，而是**locality engineering 与 transfer domination**。在本章里，它们最重要的作用不是展开 sparse access 的全部机制，而是证明同一段 KV 的系统价值已经转向“是否值得保留、是否能更便宜地恢复”。NOSA 把 sparse attention 设计成 offload-friendly，说明 selected KV transfer 才是关键成本；ScoutAttention 让 CPU 在 layer-ahead 阶段参与预计算，则说明恢复路径本身已经值得被提前规划。[2][3]

换句话说，旧定义只回答“KV 放哪儿”；新定义必须同时回答：

- 哪些 KV 值得保留更久；
- 哪些 KV 值得提前回填；
- 哪些 KV 恢复太贵，不值得进入关键路径；
- 哪些 KV 的位置本身就该参与路由决策。

### 图 1：agentic 负载把 KV 的读路径推成主路径

![Agentic KV read-write ratio](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-read-write-ratio.webp)

图 1 的意义在于把“KV lifecycle”从概念落到访问形状上：当读写比达到 `11.7x` 量级时，系统成本中心自然会从初次写入转向保留、恢复和复用。[1]

### 3. `write-once-read-many` 为什么会改写整个问题定义

agentic workload 下的大量状态都带有明显的 `write-once-read-many` 特征。system prompt、tool schema、session trunk、分支上下文和多代理共享前缀往往只在第一次 prefill 时完整写入，但在后续几十次请求里会被多次恢复。`S034 (TensorRT-LLM KV reuse)` 已经把这类现象工程化为 priority-based KV eviction、token-range retention 与 KV event API，说明工业界不再把 KV 当作“一次性中间结果”，而是把它视为需要显式治理的生命周期对象。[4]

这也是为什么 lifecycle 比 offload 更准确。因为生命周期视角覆盖的是整条链路：

1. 创建：首次 prefill 或 decode 生成状态。
2. 保留：决定哪些高价值块应继续驻留。
3. 迁移：在 HBM、CPU memory、远端缓存间移动。
4. 预取：在 resume 前提前回填。
5. 恢复：把状态重新送回关键路径。
6. 复用：让后续请求直接命中而不是重算。
7. 回收：在价值下降后及时释放。

### 4. retention、prefetch、resume 为什么会变成中心动作

这三件事之所以升格，是因为它们分别对应了 lifecycle 的三个关键成本点。

#### 4.1 retention 决定高价值状态能否跨轮次保留

如果一个 prefix 或 session trunk 后续仍会被访问，过早回收就会把未来收益直接抹掉。`S034 (TensorRT-LLM KV reuse)` 对 pinned / priority / token-range retention 的强调，说明工业现实已经不是“统一 LRU 是否够用”，而是“高价值块是否该按业务价值被区别对待”。[4]

#### 4.2 prefetch 决定恢复能否隐藏在关键路径之外

ScoutAttention 的核心启发不是单纯把 KV 搬回，而是让 CPU 通过 layer-ahead 预计算提前为后续层准备访问路径，并实现约 `2.1x` 的 speedup，且精度损失控制在 `<2.4%`。[3] 这说明预取并不是锦上添花，而是恢复路径能否变短的主要来源。

#### 4.3 resume 决定 agentic workflow 的尾延迟

一旦工作负载存在 branch、pause-resume 和多代理 fan-out/fan-in，resume 就会从异常处理动作变成主路径动作。NOSA 的结论是：selected KV transfer 仍可能主导成本，因此仅仅“状态在别处存在”并不能保证收益兑现；必须控制恢复路径的 locality 与搬运粒度，系统吞吐才会真正改善，论文给出的最高收益是 `2.3x` decode throughput。[2]

### 图 2：KV 生命周期已经天然跨越多层级内存

![KV memory hierarchy](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-memory-hierarchy.svg)

图 2 在本节支持的不是“有层级”这个常识，而是更具体的判断：一旦 KV 要在 HBM、CPU memory 和远端层级之间被长期保留、迁移与恢复，它就已经更像生命周期对象，而不是一次性 spill 桶。[2][3]

### 5. 为什么这会把 CPU 推到新位置

一旦 retention、prefetch、resume 都进入主路径，CPU 的职责就会自然扩展成：

- `state keeper`：维护哪些状态仍然值得留下；
- `recovery planner`：判断何时回填、从哪里回填；
- `warm-tier manager`：安排哪些状态留在近端 DRAM 或远端 warm tier；
- `prefetch trigger`：根据访问迹象提前组织恢复。

这和传统意义上的“host CPU 发几个 kernel”已经不是同一个角色。`S003 (NVIDIA Dynamo agentic)`、`S006 (NOSA)`、`S007 (ScoutAttention)`、`S034 (TensorRT-LLM KV reuse)` 一起给出的稳定结论是：**KV 的主要难点已从容量管理转向生命周期治理，而生命周期治理天然是 control-plane 问题。**[1][2][3][4]

### 6. 小结

本节要建立的不是一个新名词，而是一条更准确的因果链：当 agentic workload 让 KV 呈现 `write-once-read-many`、高频 resume 和跨阶段复用特征时，KV 就会从“容量补丁”变成“生命周期对象”。读写比 `11.7x`、NOSA 的 `2.3x` 吞吐提升、ScoutAttention 的 `2.1x` 预取收益，以及 TensorRT-LLM 的 retention / event API 共同说明，CPU 的新职责不是把 KV 存下，而是把它留住、找回、复用并以更低代价重新送回关键路径。[1][2][3][4]

### 参考文献

[1] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.

[2] NOSA: Native and Offloadable Sparse Attention. 2025-10-15.

[3] ScoutAttention: Efficient KV Cache Offloading via Layer-Ahead CPU Pre-computation. 2026-03-28.

[4] Introducing New KV Cache Reuse Optimizations in NVIDIA TensorRT-LLM. 2025.
