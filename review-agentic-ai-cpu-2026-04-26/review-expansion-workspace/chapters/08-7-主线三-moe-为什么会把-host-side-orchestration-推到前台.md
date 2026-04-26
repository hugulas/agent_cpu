## 7. 主线三：MoE 为什么会把 host-side orchestration 推到前台

### 7.1 稀疏计算优势为何不自动转化成系统收益

MoE 的第一层误解，是把“每个 token 只激活少量专家”直接等同于“系统会更轻”。实际上，稀疏计算节省的是部分 GPU 计算量，但它同时引入了更强的不规则状态访问。只要 `cold expert`、`expert miss` 和 `synchronization chain` 没被控制住，稀疏性带来的理论优势就可能在物理系统中被吃回去。服务化推理关心的不是 gate 本身看起来多优雅，而是 route 之后的专家是否在位、是否会制造额外搬运、是否会让 batch 中最慢路径决定整体尾延迟。

### 7.2 专家驻留、预取与动态平衡

这一问题直接引出了 `FluxMoE`、`FineMoE` 和 `SpecMoEOff` 等工作。它们虽然实现路径不同，但共同在修复同一条链：`route -> place -> move -> overlap -> rebalance`。`FluxMoE` 把逻辑专家身份与物理驻留位置解耦，强调多层级驻留与带宽均衡；`FineMoE` 利用更细粒度 expert map 和访问结构缓和热点；`SpecMoEOff` 则尝试把专家搬运代价藏进投机与重叠路径中。这三者共同说明，CPU 在 MoE 中的职责已经从“遇到 miss 再搬运”升级为“持续控制 residency、prefetch 与热点平衡”。

### 7.3 MoE 路由动态平衡问题

MoE 的真正系统问题不是路由本身，而是 `expert skew`。如果热点专家集中在少数 GPU、少数链路或少数 batch shard 上，那么即便整体激活参数减少，系统也仍可能在局部过载和同步等待中退化。于是，`topology-aware placement`、`hot/cold expert` 区分和 `batch-level balance` 就不再是附属优化，而成为收益能否兑现的核心条件。CPU 在这一阶段更像一个 `expert residency controller` 与 `dynamic balance orchestrator`。

### 7.4 工业界当前吸收到了哪一步

工业界目前还没有把所有论文路线完整产品化，但已经明确吸收了问题定义和平台组织方式。`Wide Expert Parallelism` 说明业界已接受：MoE 不再是单请求小技巧，而是批级、跨 GPU、跨节点的组织问题。当前更成熟的吸收路径往往先落在 runtime 组织、平台拓扑和分层驻留上，而不是直接照搬每篇论文的预测算法。这一状态本身也说明，MoE 的关键矛盾已经从“算不算”转向“怎么放、怎么搬、怎么平衡”。

### 7.5 本章吸收的单篇笔记

- `D05`：S008
- `D16`：S035, S036, S037

### 7.6 本章小结

因此，MoE 把 CPU 推到前台，并不是因为 CPU 需要重新承担主要数值计算，而是因为 **逻辑稀疏必须被翻译成物理可承受的驻留、预取、搬运和热点平衡**。这一步正是 host-side orchestration 的典型问题。

---
