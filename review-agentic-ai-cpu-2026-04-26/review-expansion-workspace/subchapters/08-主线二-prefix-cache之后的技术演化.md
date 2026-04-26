## 主线二子章节 4：Prefix Cache 之后的技术演化

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 1. 本章核心判断

`Automatic Prefix Caching` 只是状态复用控制平面的第一代实现。真正改变 AI CPU 角色的，不是 prefix cache 本身，而是它之后逐步出现的四类能力：`prefix-aware routing`、`selective retention`、`event-driven KV reuse` 与 `multimodal / branch-aware cache identity`。这些能力共同把“命中缓存”推进成“编排状态对象”。[1][2][3][4]

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| APC 之后的关键演化是 routing、retention、events 与更强 identity | `S011 (BentoML prefix-aware routing) S016 (Ray PrefixCacheAffinityRouter) S041 (Anyscale prefix-aware routing) S042 (vLLM KV Events) S044 (vLLM dirty cache issue) S045 (vLLM pinned prefix issue) S046 (vLLM unstable prefix cache) S047 (vLLM multimodal cache bug)` | `match_rate_threshold = 0.1`；`50ms -> 500ms+`；`40%` multimodal cache hit |
| 分布式 prefix reuse 的第一难题不是命中本身，而是命中与负载均衡的权衡 | `S011 (BentoML prefix-aware routing) S016 (Ray PrefixCacheAffinityRouter) S041 (Anyscale prefix-aware routing)` | affinity routing；失衡时回退 P2C |
| 真实工程问题已经暴露出 dirty cache、pinned prefixes 与 multimodal identity 缺陷 | `S044 (vLLM dirty cache issue) S045 (vLLM pinned prefix issue) S046 (vLLM unstable prefix cache) S047 (vLLM multimodal cache bug)` | dirty cache impact；persistent/pinned prefix 需求；错误复用 bug |

### 2. 第一步演化：从 cache hit 走向 cache-aware routing

一旦 prefix cache 进入多 worker / 多 executor 部署，系统不再只关心“有没有相同前缀”，而开始关心“请求应该被送到哪里才能命中已有状态”。Ray Serve 的 PrefixCacheAffinityRouter 直接把这个问题写进 routing policy：当 prefix 匹配率超过默认的 `match_rate_threshold = 0.1` 时优先走 affinity；若负载失衡过重，再回退到 P2C 一类更均衡的策略。[3]

这组规则的意义很大，因为它说明：

- 命中率已经高到值得干预路由；
- 但路由偏置本身可能制造新的热点；
- 因此 CPU 必须同时优化 reuse 与 balance，而不是只盯一个指标。

### 图 1：prefix reuse 从本地命中演化成分布式路由问题

![Agentic KV-aware placement and routing](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/nvidia-dynamo-agentic-kv-readwrite-2026.webp)

图 1 用来支撑一个关键转折：当共享前缀和高复用变成常态，worker 选择本身就开始受状态位置驱动，而不再只是均衡驱动。[3]

### 3. 第二步演化：从统一 eviction 走向 selective retention

Prefix reuse 真正落地后，很快会遇到一个更现实的问题：不是所有 prefix 的价值都一样。`S045 (vLLM pinned prefix issue)` 直接提出 persistent / pinned prefixes 的需求，说明简单 LRU 已不足以表达高价值前缀；`S044 (vLLM dirty cache issue)` 则从反面揭示 dirty cache impact，会让命中率收益被 block 生命周期管理吃掉。[4][5]

这一步很关键，因为它把“保留多久”从内部实现细节升级成策略问题。高价值状态是否应被 pin 住、何时转入 warm tier、哪些 dirty block 应该更早清理，都会直接改变后续 resume 成本。

### 4. 第三步演化：从静态 cache manager 走向 event-driven reuse

vLLM 的 Kv Events Subscriber 是一个明确信号：KV block state 已被事件化，可被外部控制器订阅。`BlockStored`、`BlockRemoved`、`AllBlocksCleared` 这类事件还会携带 block hash、token ids 和 `cache_salt` 等 metadata。[6] 这说明控制面已经不再满足于“某个 worker 内部自己知道 cache 状态”，而是希望将 KV 可见性提升为可观测、可订阅、可联动的系统接口。

一旦事件化成立，CPU 的角色也就随之升级：

- 监听哪些状态刚变热；
- 决定哪些状态应继续保留；
- 将事件反馈给路由器或 warm-tier 控制器；
- 在状态失效时及时调整 placement。

### 图 2：KV 事件化意味着状态已经成为显式控制面对象

![KV lifecycle and event-driven state management](../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-kv-memory-hierarchy.svg)

图 2 对本节的价值不在于展示某个具体 API，而在于说明：只有把状态对象放进完整生命周期中，事件化才会有意义，路由和 retention 也才能联动。[4][6]

### 5. 第四步演化：从文本前缀走向 multimodal / branch-aware identity

真实 bug 报告把 APC 的下一层边界暴露得更清楚。`S046 (vLLM unstable prefix cache)` 显示 prefix caching 的 first-token latency 可能从 `50ms` 波动到 `500ms+`；`S047 (vLLM multimodal cache bug)` 则揭示多模态并发下，如果 cache identity 忽略视觉输入，会出现错误复用，且相关命中率仅约 `40%`。[7][8] 这两类现象共同说明，状态复用的难点已经不只是“有没有共享文本前缀”，而是：

- 共享前缀是否足以代表完整状态身份；
- 分支、视觉输入、并发上下文是否会让错误命中代价变得极高；
- metadata 精度提升是否会带来新的维护开销。

### 6. 小结

Prefix cache 之后的技术演化，本质上是在回答 APC 没有回答完的问题：命中应如何跨 worker 被利用，哪些 prefix 值得长期保留，状态变化如何对外可见，以及多模态和分支负载下状态身份该如何定义。`0.1` 的 routing 阈值、`50ms -> 500ms+` 的抖动症状、persistent/pinned prefix 需求和多模态错误复用 bug，共同支撑一个稳健判断：**状态复用已经从本地命中机制，演化成 AI CPU 需要持续协调的分布式控制面。**[1][2][3][4][5][6][7][8]

### 参考文献

[1] Prefix-aware routing. current.

[2] Ray PrefixCacheAffinityRouter. 2026/current.

[3] Prefix-aware routing — Ray Serve LLM. current.

[4] [Performance]: Improve Prefix Cache Hit Rate and Reduce Dirty Cache Impact. 2025-09-07.

[5] [Feature]: Support Persistent/Pinned Prefixes in Prefix Caching. 2025-08-18.

[6] Kv Events Subscriber — vLLM. current.

[7] [Bug]: The performance for Prefix Caching is very unstable for different requests. 2024-05-09.

[8] [Bug]: Prefix caching ignores visual input, causing incorrect multimodal outputs under concurrency. 2025-06-23.

真正复杂的地方，在于 agentic workload 很快会超出“完全相同的文本前缀”。

典型例子包括：

- subagents 共享 trunk，但后续分支不同
- pause-resume 会话共享主干，但恢复位置不同
- fan-out / fan-in 共享上游上下文，但每支都可能产生不同状态对象
- multimodal GUI/mobile agent 文本骨架相似，但视觉输入不同

因此，prefix cache 很快就会遇到 identity 问题：

- 相同文本是否真的代表相同状态
- 不同图像是否应共享相同前缀缓存
- branch-aware reuse 要不要比 exact prefix 更宽松

多模态错误复用的工程反馈已经表明，只看文本前缀在高并发场景下可能造成错误输出。这说明 prefix cache 的后续演化，必然要从 `prefix identity` 走向更严格的 `state identity` 设计。

### 7. 为什么这些演化都会落到 CPU 身上

表面看，这些都是缓存问题；但真正承担这些职责的仍然是 CPU / control plane：

1. **要维护映射**
   - block、prefix、session、worker、branch 之间的关系必须被记录。

2. **要做取舍**
   - 命中率、均衡性、保留预算、恢复成本之间没有免费的最优解。

3. **要接事件**
   - 如果状态变化通过事件流暴露出来，就需要外部控制器订阅、解释和反馈。

4. **要定义身份**
   - 多模态、分支、session trunk 的状态边界最终都要通过控制面逻辑判定。

因此，这条演化链的实质不是“缓存越来越高级”，而是：

> 状态复用从 runtime 局部优化，演化成 AI CPU 主导的控制平面职责。

### 8. 小结

Prefix cache 之后最值得记住的不是一串新术语，而是一条方向性变化：

> 技术重点已经从 “how to hit a prefix cache” 迁移到 “how to route, retain, identify, and reuse state correctly and stably”。

对综述主线来说，这也是 KV lifecycle 章节最关键的转折点：  
KV 不再只是容量对象，而是可路由、可保留、可事件化、可分支化的长期状态对象。
