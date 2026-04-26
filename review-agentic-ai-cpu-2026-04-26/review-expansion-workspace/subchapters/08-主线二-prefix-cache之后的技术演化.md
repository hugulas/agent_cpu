## 主线二子章节 4：Prefix Cache 之后的技术演化

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 1. 本章核心判断

`Automatic Prefix Caching` 只是状态复用控制平面的第一代实现。  
真正改变 AI CPU 角色的，不是 prefix cache 本身，而是它之后逐步出现的四类能力：

- prefix-aware routing
- selective retention
- event-driven KV reuse
- multimodal / branch-aware cache identity

这些能力共同把“命中缓存”推进成“编排状态对象”。

### 2. 为什么 APC 只是起点

APC 的价值很明确：它第一次把 shared prefix reuse 变成 serving runtime 的内建能力。  
对 agentic inference 来说，这一步很重要，因为 system prompt、tool schema、session trunk 和共享上下文都天然适合复用。

但 APC 的边界也同样明确：

- 它主要依赖 exact 或近似 exact shared prefix
- 它更像单机或单 worker 内部的复用加速
- 它没有回答“请求应该被送到哪里才能命中已有状态”
- 它也没有回答“哪些高价值状态应该长期保留”

所以从系统角度看，APC 更像 `reuse primitive`，而不是完整控制面。

### 3. 第一步演化：从 cache 命中走向 cache-aware routing

一旦 prefix cache 进入多 worker / 多 executor 部署，问题立刻变化。  
系统不再只关心“有没有相同前缀”，而开始关心：

- 哪个 worker 可能已经有相关 KV
- 把请求送过去会不会造成负载失衡
- 命中收益是否值得多一次路由偏置

这就是 prefix-aware routing 和 cache affinity 出现的原因。

它们的系统意义在于：

1. **把 cache view 推到 router 侧**
   - CPU 不再只是维护本地缓存表，而要维护近全局的缓存可见性。

2. **把 locality 变成显式调度目标**
   - 过去调度主要看负载；现在还要看状态位置。

3. **把命中率和均衡性变成一对显式 tradeoff**
   - Ray 的 `match_rate_threshold = 0.1` 就是很典型的例子。
   - 它说明系统已经默认：并不是所有 prefix 命中都值得打破通用负载均衡。

因此，prefix cache 之后第一个真正改变 CPU 角色的动作，不是更快的哈希，而是：

> CPU 开始扮演 `affinity router`。

### 4. 第二步演化：从“命中了哪些缓存”走向“哪些缓存值得留下”

当复用对象不再稀有时，真正的问题会变成保留策略。  
TensorRT-LLM 的 KV reuse 优化之所以重要，不是因为它重复实现了缓存，而是因为它把：

- priority-based eviction
- selective retention
- early reuse
- cache event API

做成了正式的产品能力。

这说明 prefix cache 之后，系统开始默认一个新事实：

> 不是所有可复用状态都同等重要，必须有人负责决定哪些保留、哪些回收、哪些尽早进入可复用状态。

在这个阶段，AI CPU 的角色开始从 `cache index keeper` 升级为：

- retention policy engine
- eviction controller
- early reuse coordinator

### 5. 第三步演化：从本地缓存表走向事件化状态视图

vLLM 的 KV Events Subscriber 是这条技术链里很重要的信号。  
`BlockStored`、`BlockRemoved`、`AllBlocksCleared` 这类事件意味着：

- cache state 开始从局部实现细节变成可订阅的系统对象
- 外部控制器可以不直接接管 block pool，也能感知状态变化
- reuse、routing、resume 和 prefetch 可以通过事件流接到同一控制链上

这一步很关键，因为它把 prefix / KV reuse 从“运行时内部技巧”推进成“外部控制面可见对象”。

换句话说，prefix cache 之后最重要的并不是“缓存更大”，而是：

> cache state 开始被 CPU / control plane 看见、解释和利用。

### 6. 第四步演化：从 prefix identity 走向 state identity

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
