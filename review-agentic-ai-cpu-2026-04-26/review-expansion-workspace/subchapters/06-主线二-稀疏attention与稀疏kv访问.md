## 主线二子章节 2：稀疏 Attention 与稀疏 KV 访问

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| 稀疏 attention 的系统价值在于减少 selected KV transfer，而不只是少算 attention | `S006` | 解码吞吐最高 `2.3x`；memory hierarchy / sparse framework 图 |
| CPU 会从“整块搬运者”变成细粒度选择、预取和恢复的 policy engine | `S006 S007` | ScoutAttention layer-ahead CPU pre-computation；约 `2.1x` speedup |
| 稀疏访问越强，越需要精确的 locality 决策，否则收益会被错取和漏取吃回去 | `S006 S007 S013` | transfer domination；reduced-KV / hybrid attention 降低容量但放大 placement 价值 |

### 1. 本章核心判断

稀疏 attention 在服务化推理中的价值，不只是“少算一些注意力”，而是把 CPU 的工作从大块搬运推进到**更细粒度的选择、保留、预取和恢复**。NOSA 的关键判断非常直接：决定收益的，不是理论上保留了多少 token，而是 selected KV transfer 是否仍然主导成本；其公开结果是 decode throughput 最高可提升 `2.3x`。[1] 这说明 sparse KV access 不会让 CPU 退出关键路径，反而会让 CPU 更像一个状态 policy engine。

### 2. 为什么 sparse access 和普通 offload 不是一回事

如果只有普通 offload，问题更像“KV 太大，搬出去，需要时再搬回来”。但一旦 access 模式变稀疏，问题马上变成：

- 哪些块值得保留在近端；
- 哪些块值得提前拉回；
- 哪些块根本不值得恢复；
- 错取和漏取会不会抵消理论收益。

也就是说，系统已经从容量治理转向访问治理。`S006` 的重要性就在这里：它不是抽象讨论 sparse attention，而是把 sparse pattern 与 offload path 一起设计，把论文目标直接锚定在服务系统里的 KV 迁移成本上。[1]

### 图 1：稀疏 KV 访问的核心不是省容量，而是重写层级访问路径

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/nosa-01.png" alt="NOSA sparse attention memory hierarchy" width="760">

图 1 说明稀疏 attention 真正改变的是 memory hierarchy 上哪些 KV 会被触达。它支撑本节的核心判断：系统需要的不是“大搬运”，而是更细的 locality 决策。[1]

### 3. NOSA 代表了什么

NOSA 之所以关键，不只是因为它用了 sparse attention，而是因为它从一开始就把 sparse attention 设计成 `offload-friendly`。这意味着研究目标已经变成：

- 不是只追求理论上的注意力稀疏；
- 而是追求能减少 CPU-GPU KV transfer 的稀疏。

这很重要，因为它第一次把 sparse attention 的价值直接锚定到 serving 系统成本上。若 selected KV transfer 仍然很大，GPU 少算出来的那些 FLOPs 可能完全不够抵消层级间搬运与恢复的额外延迟。[1]

### 4. 为什么 CPU 会前移成 `policy engine`

ScoutAttention 对这个转变给出了更强的工程化证据。它不是只说“稀疏访问很好”，而是让 CPU 在 layer-ahead 阶段参与预计算，以便更早知道后续层需要哪些 KV，并提前准备恢复路径。公开结果是约 `2.1x` speedup，精度损失控制在 `<2.4%`。[2] 这说明 CPU 的价值不再只是开 DMA，而是在**预测、筛选和编排**将被访问的状态。

从 control-plane 角度看，这意味着 CPU 需要持续回答：

1. 哪些 KV 值得被选入下一层的热路径；
2. 哪些 KV 应保持在更近层级；
3. 哪些恢复动作应提前隐藏在前一层计算期间；
4. 哪些稀疏访问只是噪声，不值得为其预热。

### 图 2：layer-ahead 预计算把 CPU 从搬运者前移成协同计算者

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/extracted/scoutattn-1.png" alt="ScoutAttention layer-ahead CPU pre-computation" width="760">

图 2 的价值在于说明稀疏访问收益并非自动发生，而是需要 CPU 提前参与下一层的访问准备。也因此，预取与恢复开始像调度动作，而不只是内存动作。[2]

### 5. reduced-KV 为什么进一步放大了 placement 价值

`S013` 的 Kimi Linear 说明 reduced-KV / hybrid attention 会进一步改变成本结构：论文给出 KV cache usage 最多降低 `75%`，在 `1M` context 下 decode throughput 最多可提升 `6x`。[3] 这类结果看起来像“容量问题被缓解了”，但它真正带来的系统后果是：当 KV 总量下降后，**剩下那些仍需要保留和搬运的状态就更值得被精细放置**。容量压力下降，并不意味着 CPU 变轻；更准确地说，是 CPU 的工作从“是否能放下”转向“如何把少量但更高价值的状态放在更对的位置”。

### 6. 边界：稀疏访问的收益为什么不会自动兑现

这一方向仍有一个必须保留的审慎判断：公开资料已经能证明收益方向，但代价函数还不完整。`material/gap-audit.md` 也明确记录了，sparse KV policy 的 hit quality、event overhead 和生产级误判成本仍缺完整公开指标。因此，本节更稳妥的结论是：

> 稀疏 attention 已经足以证明 CPU 会从“大块搬运者”变成细粒度状态 policy engine；但不同 policy 的误判代价、metadata 开销和线上命中质量，仍需要更多实测补齐。

### 7. 小结

稀疏 attention 和 sparse KV access 并没有让 CPU 离开关键路径，而是把 CPU 推向更细粒度的控制面。NOSA 的 `2.3x` 吞吐提升、ScoutAttention 的 `2.1x` 预取收益，以及 Kimi Linear 对 reduced-KV 的证明，共同支撑一个稳定判断：**当访问从“全量取回”转向“有选择地取回”时，CPU 的核心价值就从搬运带宽转向状态判断质量。**[1][2][3]

### 参考文献

[1] NOSA: Native and Offloadable Sparse Attention. 2025-10-15.

[2] ScoutAttention: Efficient KV Cache Offloading via Layer-Ahead CPU Pre-computation. 2026-03-28.

[3] Kimi Linear: An Expressive, Efficient Attention Architecture. 2025-10-30.

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
