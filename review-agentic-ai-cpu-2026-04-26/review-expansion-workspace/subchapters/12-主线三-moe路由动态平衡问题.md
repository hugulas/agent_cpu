## 主线三子章节 3：MoE 路由动态平衡问题

父章节：`7. 主线三：MoE 为什么会把 host-side orchestration 推到前台`

### 1. 本章核心判断

MoE 在服务化推理里的关键 host-side 问题，不只是“冷 expert 怎么搬”，而是 **如何持续处理 expert skew**。  
一旦 expert 访问分布不均，系统瓶颈就会迅速从单次权重搬运，升级为：

- hot/cold expert residency
- batch-level balance
- topology-aware placement
- cross-rank synchronization

这说明 MoE routing 已经从局部 gate 选择问题，演化成控制平面问题。

### 2. 为什么 expert skew 是比冷启动更棘手的问题

冷 expert miss 很容易理解：请求命中不在 GPU 上的 expert，于是 CPU 需要搬权重。  
但真实 serving 中更难的是 skew：

1. **热门 expert 会反复被打爆**
   - 即使大多数 expert 都能卸载，少数高频 expert 仍可能形成驻留争夺。

2. **热门路径会拖垮拓扑**
   - 问题不只是哪张 GPU 上放哪个 expert，而是跨 GPU / 跨节点通信图会随热点路径失衡。

3. **批次内部会被热点拉斜**
   - 同一微批内 token 路由如果过于集中，会让一部分 worker 拥挤、另一部分空闲。

因此，真正难的问题不是“这次 miss 了哪个 expert”，而是：

> 路由分布会不会长期把系统推向少数热点路径。

### 3. 为什么这天然是 CPU / control plane 问题

这类问题之所以会回到 host 侧，有三个原因。

第一，**平衡是跨 token、跨批次、跨时间窗的**。  
单次 gate 决策可以在模型内部完成，但 hot/cold residency、skew smoothing、历史轨迹复用这类事情，需要跨请求状态和策略记忆，更适合由控制面处理。

第二，**平衡要同时看逻辑路由和物理放置**。  
同一个逻辑 expert，放在不同 GPU、不同节点、不同内存层，代价完全不同。  
这不是单个 kernel 能独立解决的问题。

第三，**平衡要和通信拓扑一起做**。  
MoE 一旦进入大规模系统，expert parallel、all-to-all、completion queue 和 link contention 都会被拉进来。CPU 比模型本身更适合掌握这类全局视图。

### 4. 现有材料给出的三条解决路线

#### 4.1 FluxMoE：把“逻辑身份”和“物理驻留”拆开

FluxMoE 的意义不只是更高吞吐，而是它把一个核心问题说清楚了：  
**路由逻辑和驻留位置不必一一绑定。**

一旦身份和位置拆开，系统就可以：

- 把热门 expert 放在更热的层级
- 把冷 expert 留在更便宜的位置
- 用更平滑的带宽方式做参数流式化

这本质上是在给 CPU 一个新的平衡控制杆：  
不是改 gate，而是改 residency。

#### 4.2 FineMoE：用 finer-grained expert map 追踪模式

FineMoE 的价值在于，它不把 expert 访问看成完全瞬时的随机过程，而是假设：

- 语义相近请求可能触发相近专家
- 历史轨迹可以预测未来访问模式

于是，CPU / control plane 就可以维护比“粗粒度热度计数”更细的 expert map，用于：

- 提前预取
- 降低 miss
- 让热点迁移更平滑

这说明动态平衡不只是实时反应，也可以是 **history-informed balancing**。

#### 4.3 SpecMoEOff：用 speculative overlap 藏延迟

SpecMoEOff 的关键洞察是：  
如果额外 token 计算本来就会发生，那么它可以被用来掩盖 expert offloading latency。

它不是直接解决 skew，而是提供另一条路：

- 不一定压平路由分布
- 但可以把热点路径上的搬运延迟部分藏在推测执行后面

这说明动态平衡的答案不一定全靠更精确的路由，也可能靠 **execution overlap**。

### 5. hot/cold expert、topology-aware placement 和 batch-level balance 是一组联立问题

这三件事不能分开看。

#### 5.1 hot/cold expert

决定哪些 expert 应常驻、哪些应流式化。  
如果判断错，CPU 会频繁触发无效搬运。

#### 5.2 topology-aware placement

决定这些 expert 放在什么物理位置最划算。  
即使热度判断对了，放错节点、放错链路位置，通信代价也会吃掉收益。

#### 5.3 batch-level balance

决定一批 token 如何组织，避免局部热点在单批或单时间窗内被放大。  
这一步做不好，GPU 利用率会出现“一部分过热、一部分闲置”的典型失衡。

因此，MoE 动态平衡的本质不是三道独立题，而是：

> `which expert stays where`, `which tokens go where`, and `how the resulting traffic fits the topology`

### 6. 工业界为什么会先吸收问题域，而不是直接照搬论文方案

从 Wide Expert Parallelism 这样的工业材料来看，工业界已经明确承认：

- expert routing 是批级组织问题
- placement 是机架级问题
- 通信图和拓扑必须一起考虑

但工业界目前吸收的方式仍然比较保守。  
更常见的是：

- 先把 Wide EP、placement、resident set 组织起来
- 再逐步吸收更细的 prefetch / skew / speculative overlap 技术

这很合理，因为论文方案往往优化单一维度，而工业系统必须同时满足：

- 吞吐
- 尾延迟
- 正确性
- 可运维性

### 7. 小结

本节真正想说明的是：

> MoE routing 的难点不是“当前 token 该去哪个 expert”，而是“长期来看，如何让 expert 访问分布、驻留策略和通信拓扑一起保持平衡”。

一旦按这个角度看，MoE 就不再只是模型结构问题，而会自然变成 AI CPU / control plane 的中心职责之一。
