## 5. 主线一：算子下发为什么从 launch overhead 变成调度墙

### 5.1 微观问题：kernel launch tax

`kernel launch tax` 之所以在今天被重新关注，不是因为 GPU 计算突然不重要了，而是因为小模型、量化模型、动态 batch 和更细碎的推理回合正在暴露出固定 host 开销。过去在大模型、长 decode 和较粗粒度执行中，launch overhead 常常被有效计算时间淹没；而在更短、更频繁、更动态的 agentic workload 下，这部分固定开销开始变得可见。`S005` 进一步说明，CPU-induced slowdown 不只是“CPU 忙一点”，而是会通过多 GPU 同步链被明显放大。

### 5.2 宏观问题：状态驱动调度链

真正让 launch overhead 升级为 `调度墙` 的，并不是单次 launch 本身，而是它所在的整条链。一个请求从进入系统到真正落到 GPU 上，往往要经历 queue、worker selection、cache-aware placement、broadcast/handoff、batch formation 和 synchronization。只要这些动作依赖请求状态而不是固定静态图，它们就会表现出更高的动态性。Agentic workload 恰恰会持续制造这种动态性，因为请求会频繁恢复、分支、汇聚，并携带不同程度的共享前缀和历史状态。因此，CPU 面对的不再是一次 launch，而是一条由状态驱动的连续调度链。

### 5.3 图化编译与运行时图化

图化编译和运行时图化之所以重要，是因为它们试图把这条链里最稳定、最重复的一部分结构化出来。`piecewise CUDA Graphs`、`full graphs`、`persistent kernels` 以及 `Event Tensor` 所代表的路线，本质上都在降低 host 侧反复发射与切换的开销。但它们的价值并不是“把编译做得更漂亮”，而是让部分 dispatch 动作从高频前台操作转化为较低频的预结构化动作。对 agentic inference 来说，这有助于缓解短回合、高恢复频率负载下的 dispatch tax。

### 5.4 图化编译在服务化推理中的利与弊

图化路线的收益和代价都已经比较清楚。收益在于：它能够缩短 steady-state 路径，减少 CPU 反复提交小块工作时的固定成本，并提升较稳定阶段的吞吐。代价在于：它会引入 `capture memory`、`warmup cost`、`shape mismatch fallback` 和 `backend compatibility` 的问题。尤其在服务化推理里，工作负载并不总是稳定形状，多模态输入、PD 分离、resume-heavy 路径和不同批结构都会迫使系统保留回退路径。因此，图化编译不能被理解为“消灭调度问题”，而更应被理解为“把一部分可预测调度预先压缩”，剩下的动态部分仍由 CPU 控制面承担。

### 5.5 本章吸收的单篇笔记

- `D02`：S005
- `D17`：S038, S039, S040
- `D03`：S001-S003

### 5.6 本章小结

所以，算子下发之所以从 `launch overhead` 变成 `调度墙`，不是因为单个 kernel launch 比以前更贵，而是因为请求生命周期正在更频繁地触发 queue、placement、batching、handoff 和 synchronization。图化路线可以削减其中一部分前台开销，但无法替代 CPU 对整条状态驱动调度链的组织。

---
