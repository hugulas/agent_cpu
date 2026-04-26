## 主线二子章节 1：从 KV Offload 到 KV Lifecycle

父章节：`6. 主线二：KV 不再只是容量对象，而是生命周期对象`

### 1. 本章核心判断

在 agentic inference 中，KV 已经不应被理解成“显存放不下时可以挪出去的一堆缓存”，而应被理解成：

> 一个需要被长期保留、反复恢复、按价值调度的状态对象。

这就是从 `KV offload problem` 到 `KV lifecycle problem` 的转变。

### 2. 为什么“容量问题”这个旧定义已经不够

早期 KV offload 的出发点很简单：

- 上下文更长
- 批次更大
- HBM 不够

于是问题被定义成“如何把 KV 搬到 CPU memory / storage”。  
但 agentic workload 出现后，这个定义明显不够，原因有三点：

1. **KV 的复用价值升高**
   - 很多状态不是写一次就丢，而是会在后续几十次请求中被再次利用。

2. **KV 的恢复成本进入关键路径**
   - pause-resume、fan-out/fan-in、session trunk 让“何时能把它拿回来”变得和“能否存下”同样重要。

3. **KV 的位置开始影响调度**
   - 状态在哪儿，会影响请求该路由到哪里、该保留多久、是否值得远程化。

因此，单纯把 KV 看成容量对象，会系统性低估 CPU 的新职责。

### 3. `write-once-read-many` 为什么会改写整个问题定义

这是转变的核心。  
agentic inference 不再主要是“不断写入新的 KV”，而是越来越像：

- 先写一遍
- 后续多次读回
- 在多个阶段、多个 agent、多个 worker 间复用

这意味着 KV 的价值重心从 `write path` 转向 `read / retain / recover path`。

而一旦价值重心转移，CPU 的问题定义也跟着变：

- 以前：把放不下的 KV 安排到别处
- 现在：让高价值 KV 在正确时间、正确位置、以正确代价可被重新利用

### 4. retention、prefetch、resume 为什么会变成中心动作

#### 4.1 retention

如果一个状态后续还会被多次使用，那么“留不留下来”本身就是决策问题。  
这会引入：

- 哪些状态高价值
- 哪些状态只是短期热
- 哪些状态该下沉到 warm tier

#### 4.2 prefetch

如果恢复路径太慢，即使状态存在，收益也会被吞掉。  
因此系统必须提前猜测：

- 哪些状态即将被需要
- 何时开始回填最合适

这会让 CPU 从被动搬运者变成主动的恢复路径组织者。

#### 4.3 resume

resume 是 agentic workload 最容易被低估的动作之一。  
在传统 chat 中，状态恢复没那么频繁；  
在 agentic inference 中，resume 可能就是主路径之一。

所以 resume latency 不再只是异常处理指标，而是核心性能指标。

### 5. 为什么这会把 CPU 推到新位置

一旦 retention、prefetch、resume 都变成主路径动作，CPU 的职责就会自然扩展成：

- state keeper
- recovery planner
- warm-tier manager
- prefetch trigger

这和传统意义上的“host CPU 发几个 kernel”已经不是同一个角色。

### 6. 为什么说 lifecycle 才是更准确的工业问题定义

生命周期这个词很重要，因为它强迫我们把 KV 看成一条完整链路：

1. 创建
2. 保留
3. 迁移
4. 预取
5. 恢复
6. 复用
7. 回收

只有按这条链看，很多工业材料中的现象才会连起来，比如：

- KV-aware routing
- event API
- selective retention
- warm tier
- resume latency

这些都不是单纯的 offload 技术，而是 lifecycle governance 的组成部分。

### 7. 小结

本节最重要的结论是：

> KV 在 agentic inference 中已经从“容量补丁”变成“状态生命周期对象”。CPU 的新职责，不是把它存下，而是把它留住、找回、复用并以更低代价重新送回关键路径。

这也是后续 prefix cache、sparse access 和工业控制平面化趋势能够成立的前提。
