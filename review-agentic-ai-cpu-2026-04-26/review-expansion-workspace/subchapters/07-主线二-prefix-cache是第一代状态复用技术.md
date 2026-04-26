## 主线二子章节 3：Prefix Cache 是第一代状态复用技术

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| APC 应被理解为第一代状态复用控制平面，而不是局部小优化 | `S010 (vLLM APC) S043 (TensorRT-LLM early reuse)` | full-block prefix caching；TTFT 最多 `5x` |
| APC 的第一批系统收益来自避免重复 prefill，而不是“平均省一点算力” | `S043 (TensorRT-LLM early reuse)` | block size `64 -> 8` tokens 最多再增 `7%` |
| APC 的边界在于它主要处理 exact shared prefix，本身不解决分布式路由和长期保留 | `S010 (vLLM APC) S043 (TensorRT-LLM early reuse)` | KV cache manager / LRU eviction；early reuse 仍需更细粒度机制 |

### 1. 本章核心判断

`Automatic Prefix Caching` 的历史地位需要被重新定义。它不应被理解成一个局部的小优化，而应被理解成第一代**状态复用控制平面**技术。原因很直接：它第一次把“跨请求共享已有 KV”从经验性技巧变成了 runtime 内建能力。vLLM 的 APC 设计文档已经把 prefix cache manager、full-block matching 和 eviction 机制作为系统组成部分，而 TensorRT-LLM 的 early reuse 结果则表明，这种系统化状态复用可以把 TTFT 压低到最多 `5x`，并且把 block size 从 `64` tokens 缩到 `8` tokens 还能再带来最多 `7%` 的改善。[1][2]

### 2. 为什么 APC 是状态复用控制平面的起点

APC 真正完成了三件此前并不显式的事：

1. 它把“前缀是否相同”的判断从应用层移到推理系统层。
2. 它把“命中缓存”的收益直接转化成 TTFT、prefill token 数和 GPU 时间的减少。
3. 它强迫系统维护一套最基本的状态身份机制，即某段 KV 对应哪段输入、在哪个 block 边界上可复用、何时仍然有效。

因此，APC 的意义远不止“命中了就省 token”。它意味着服务系统开始默认：**状态复用本身值得被系统化对待。**[1][2]

### 图 1：第一代 prefix reuse 的价值首先体现为 TTFT 下降

![Agentic KV reuse and routing](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-dynamo-agentic-kv-readwrite-2026.webp)

图 1 不是 APC 的实现图，而是用来解释为什么 prefix reuse 会迅速变成控制面问题：agentic workload 下共享前缀和高读写比叠加，使“避免重复 prefill”直接决定 TTFT 与调度压力。[2][3]
图 1 不是 APC 的实现图，而是用来解释 APC 为什么会迅速升级成控制面问题：agentic workload 下共享前缀和高读写比叠加，使“避免重复 prefill”直接决定 TTFT 与调度压力。[2][3]

### 3. APC 解决了什么

第一代 APC 最擅长处理的是 `exact` 或 `near-exact shared prefix`。对于固定 system prompt、工具 schema、共享角色说明、标准模板和子代理公共启动上下文，这类机制可以直接避免重复 prefill。对 agentic inference 来说，这一步尤其关键，因为 shared prefix 不是偶然存在，而是结构性存在。

`S043 (TensorRT-LLM early reuse)` 的 early reuse 结果表明，这种收益已经不是理论推断，而是可以显著改写首 token 延迟的现实优化。[2] 因此，APC 的首要价值不是“平均省下一点算力”，而是把状态复用正式引入了服务系统的关键路径。

### 4. APC 没有解决什么

之所以说 APC 只是第一代，是因为它解决的问题仍然有限：

- 它主要回答“同样的前缀能不能重用”，没有回答“不同但相似的状态能不能部分重用”；
- 它更像单机或单 worker 内部的 reuse primitive，没有真正处理分布式 worker 之间的状态可见性；
- 它把问题更多表述为“有没有命中”，而不是“命中是否稳定、是否值得为此牺牲负载均衡”；
- 它对多模态 identity、branching execution 和长期 pinned prefix 的表达能力有限。[1][2]

也正因此，第一代 APC 一落入真实服务环境，很快就会催生后续问题：请求该被路由到哪台更可能命中的 worker，哪些 prefix 值得长期保留，以及命中与均衡冲突时应该优先谁。

### 图 2：APC 的边界来自 block 粒度和 exact prefix 假设

![KV read-write reuse pressure](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-read-write-ratio.webp)

图 2 强调 APC 为什么会迅速触及边界：当复用压力来自大量分叉、resume 和跨 worker 请求时，仅有“本地 exact prefix 命中”已经不够支撑整个系统。[2][3]

### 5. 为什么说它是“第一代”而不是“完整方案”

把 APC 定位成第一代，有两个好处。第一，它承认这项技术已经完成了状态复用的基础抽象：状态可被识别、保留、再利用。第二，它也清楚承认这一步仍然过于朴素，后面还必须引入 routing、retention、events 和更强的 identity 机制。换句话说，APC 为后续控制面铺了路，但它本身并不是终点。它先证明了“已有状态值得被看见和重用”，后续章节要讨论的则是：这些状态该如何跨 worker 被路由、如何被长期保留、以及在分支和多模态场景下该如何被正确标识。

### 6. 小结

本节想建立的是一个历史定位：APC 之所以重要，不是因为它本身足够复杂，而是因为它第一次把 `state reuse` 明确建成了 runtime 能力。vLLM 的 prefix cache manager 与 TensorRT-LLM 的 `5x` TTFT 改善共同说明，第一代 prefix reuse 已经足以改变服务系统的成本中心；同时，它的 block 粒度、exact prefix 假设和分布式可见性边界，也决定了后续必须出现更强的路由、保留和事件化机制。下一节讨论的 `routing / retention / events / identity`，正是 APC 这些边界被真实工作负载逼出来的第二阶段演化。[1][2]

### 参考文献

[1] vLLM Automatic Prefix Caching. current.

[2] 5x Faster Time to First Token with NVIDIA TensorRT-LLM KV Cache Early Reuse. 2024-11-08.

[3] Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo. 2026-04-17.
