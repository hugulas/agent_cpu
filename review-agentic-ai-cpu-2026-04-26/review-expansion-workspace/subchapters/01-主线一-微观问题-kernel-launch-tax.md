## 主线一子章节 1：微观问题：Kernel Launch Tax

父章节：`5. 主线一：算子下发为什么从 launch overhead 变成调度墙`

### 1. 本章核心判断

在很多人仍把推理瓶颈理解成“矩阵算不够快”时，最新一批 serving 证据已经表明：  
**对小模型、量化模型和高度动态的批次来说，host-side kernel launch tax 已足以进入关键路径。**

换句话说，dispatch 问题不是“有一点额外开销”，而是会在某些工作负载下决定单 token 时间预算。

### 2. 为什么小模型和量化模型反而更容易暴露 launch tax

这个结论看起来反直觉，因为很多人会以为模型越大、越复杂，CPU 越容易跟不上。  
但真正的情况恰好相反：

1. **模型越小，单次 GPU 计算时间越短**
   - 当一次 kernel 的有效计算时间缩短时，固定的 host 提交开销占比自然上升。

2. **量化越激进，越可能把原本的内存墙部分移开**
   - 一旦更多权重或中间状态能够驻留在更近的层级中，GPU 端的等待减少，CPU 端提交反而更显眼。

3. **动态 batch 会让同样的调度动作反复发生**
   - 服务化推理不是一次性批处理，而是持续进入、持续退出、持续切换的状态机。
   - 这意味着 host-side 的固定动作不是只做一次，而是持续做很多次。

因此，launch tax 的根源并不神秘：  
**它来自固定控制动作与越来越短的 GPU 执行片段之间的比例失衡。**

### 3. 关键证据：为什么这个问题已经不是“感觉上的慢”

现有材料给出的最强信号主要来自两类。

#### 3.1 量化小模型的工程实测

本地成熟稿引用的工程分析显示，当模型被压缩到足够轻、单次前向会发射数百个 kernel 时，单个 kernel 几微秒的 launch tax 会累积成接近整步推理时间的比例。这类结果的重要性不在于具体是哪张卡、哪种 kernel，而在于它证明了：

- dispatch 不是可以忽略的固定背景
- 它会在结构上限制系统

#### 3.2 CPU slowdown 论文的多 GPU 诊断

另一类证据更关键：它把“launch tax”从单机微观问题推进成了多 GPU 系统问题。  
因为一旦 CPU 线程抖动、排队或被抢占，launch 和队列延迟就会通过同步点放大。  
这说明 launch tax 不是孤立税费，而是会与：

- queue
- broadcast
- synchronization

一同组成更长的 host-side 关键路径。

### 4. 为什么 `CPU-induced slowdown` 是底层因果，而不是局部噪声

如果只把 CPU 慢看成“偶尔线程调度不好”，那就会低估这个问题。  
它真正危险的地方在于：

1. **它会被同步点放大**
   - 某一 rank 的 host 线程慢一点，不会只影响这一 rank，而会拖住整组协同计算。

2. **它会隐藏在 GPU 利用率指标后面**
   - GPU 低利用不一定说明 GPU 算得慢，也可能是 CPU 没来得及把下一步工作送上去。

3. **它会和服务栈额外开销叠加**
   - HTTP、scheduler、input prep、metadata handling 看起来都不是“计算”，但它们会一起吃掉 token 时间预算。

因此，把 `CPU-induced slowdown` 看成“噪声”是不对的。更准确的说法是：

> 它是 dispatch tax 在多线程、多 GPU、多队列系统里的放大器。

### 5. 为什么这对 agentic workload 特别关键

agentic inference 让这个问题更糟，原因是它比普通 chat 更容易出现：

- 更短但更多的执行片段
- 更频繁的阶段切换
- 更高的状态管理动作密度
- 更不稳定的 batch shape

这些因素共同带来的效果是：  
即便 GPU 端单次计算不重，CPU 侧固定动作也会被重复执行到足以主导整体延迟。

### 6. 这对后续优化意味着什么

如果问题本质是“固定控制动作占比过高”，那么优化方向自然会落到：

- kernel fusion
- persistent batch
- piecewise/full graph capture
- persistent kernels
- 更轻的 scheduler / input path

也就是说，这个子章节和后面两个问题直接相连：

- 为什么要做 graphification
- 为什么不能只盯 GPU kernel，而要重构 runtime

### 7. 小结

本节真正想说明的是：

> `Kernel Launch Tax` 不是一个孤立的低层细节，而是 agentic serving 中 CPU 进入关键路径的最直接微观入口。

当模型更轻、批次更动态、阶段更碎时，固定的 host-side 提交成本就会系统性抬高，进而把“launch overhead”演化成“调度墙”的第一块砖。
