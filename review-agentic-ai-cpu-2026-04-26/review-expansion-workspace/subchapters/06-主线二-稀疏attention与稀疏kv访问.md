## 主线二子章节 2：稀疏 Attention 与稀疏 KV 访问

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 1. 本章核心判断

稀疏 attention 在服务化推理中的价值，不只是“少算一些注意力”，而是：

> 把 CPU 的工作从大块搬运，推进到更细粒度的选择、保留、预取和恢复。

也就是说，sparse KV access 并不会让 CPU 退出关键路径，反而会让 CPU 更像一个状态 policy engine。

### 2. 为什么 sparse access 和普通 offload 不是一回事

如果只有普通 offload，系统问题更像：

- KV 太大
- 搬出去
- 需要时再搬回来

但一旦 access 模式变稀疏，问题就会变成：

- 哪些块值得留
- 哪些块值得先取
- 哪些块根本不值得恢复
- 错取、漏取会不会抵消收益

这会让系统从容量治理转向访问治理。

### 3. NOSA 代表了什么

NOSA 的真正重要性，不只是它用了 sparse attention，而是它从一开始就把 sparse attention 设计成 **offload-friendly**。

这说明研究目标已经变了：

- 不是只追求理论上的注意力稀疏
- 而是追求能减少 CPU-GPU KV transfer 的稀疏

这很关键，因为它第一次把 sparse attention 的价值直接锚定到 serving 系统成本上。

换句话说，NOSA 不是“模型更省算力”这么简单，而是在说：

> sparse access pattern 可以被设计成更适合 host-side state movement。

### 4. ScoutAttention 代表了什么

ScoutAttention 又往前走了一步。  
它不只是在减少需要恢复的 KV，还让 CPU 提前参与部分 layer-ahead 计算。

这个变化的意义非常大：

1. CPU 不再只是数据搬运者
2. CPU 开始承担一部分“为未来恢复做准备”的工作
3. 预取与协同计算开始合并

也就是说，sparse KV access 的终点并不一定是“更少的传输”，而可能是：

> 更早地判断哪些状态值得被准备好。

### 5. 为什么 sparse access 会把 CPU 推向更细粒度 policy

原因非常直接：  
一旦不是所有 KV 都同样重要，CPU 就必须回答更细的问题。

例如：

- 哪些 token range 重要
- 哪些 block 重要
- 哪些会马上被读
- 哪些可以继续留在冷层

这意味着 CPU 的职责会从：

- 统一搬运

变成：

- selective restore
- selective retention
- selective prefetch
- policy-driven eviction

所以 sparse access 的后果，不是让 CPU“做得更少”，而是让 CPU“做得更细”。

### 6. 稀疏访问为什么会放大 metadata 和 policy 的重要性

稀疏访问要成立，系统必须知道更多状态：

- block 对应什么
- token range 对应什么
- parent-child 关系是什么
- 哪些状态在什么 worker 上

于是收益和代价会一起上升：

**收益：**
- 恢复量减少
- 无效搬运减少
- 预取更有针对性

**代价：**
- 元数据更多
- policy 更复杂
- 错误判断的代价更高

这也是为什么 sparse access 很自然会和：

- prefix-aware routing
- event-driven reuse
- retention policy

连成一条线。

### 7. 为什么这对 agentic workload 特别重要

agentic inference 下，状态对象不仅大，而且活得久、读得多、分叉多。  
这会让稀疏访问比传统长文本问答更重要，因为系统更希望知道：

- 哪一部分状态以后还会再被多个 agent 读
- 哪一部分只是一次性中间过程
- 哪一部分值得进入更热的层级

所以 sparse KV access 对 agentic workload 的真正意义是：

> 它让状态对象开始按“未来价值”而不是“已有大小”被管理。

### 8. 小结

本节最重要的结论是：

> 稀疏 attention / 稀疏 KV 访问并不会降低 CPU 的系统重要性；它们只是把 CPU 的职责从“大块数据搬运”改造成“细粒度状态策略执行”。

这也是为什么 sparse access 会自然通向 prefix cache 后续演化、event API 和 KV control plane。
