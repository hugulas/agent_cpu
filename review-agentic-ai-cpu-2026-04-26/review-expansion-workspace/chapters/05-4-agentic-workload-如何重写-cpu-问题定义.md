## 4. Agentic workload 如何重写 CPU 问题定义

### 4.1 从单轮 decode 到长生命周期状态机

过去很多推理系统默认的工作负载原型，是“用户提交一个请求，系统做一次 prefill，再进入较长的 decode 阶段”。这个原型适合解释传统 chat serving，但并不适合解释 `agentic workload`。现实中的代理系统更接近一个长生命周期状态机：请求会 `pause`，等待外部结果或分支决策；会 `resume`，把旧状态重新接回计算；会 `fan-out` 成多个子代理并行执行；会 `fan-in` 把多路结果重新汇总；还会因为 `multimodal ingress` 把新的视觉或界面状态不断送回模型。只要负载变成这种形态，CPU 就不再只是启动某一段 GPU 计算，而要负责管理整段状态机的切换。

### 4.2 为什么 CPU 的角色不再只是发 kernel

Agentic workload 重写 CPU 问题定义的关键，在于它把大量“以前可以忽略的状态动作”推到前台。请求 ingress 不再只是收一个 prompt，而是要接收新上下文、分支信息、历史状态和多模态输入。路由不再只是找一张空闲 GPU，而是要找最可能命中 prefix cache、最适合恢复旧 KV、最适合承接某类 prefill 或 decode 的节点。`prefix/KV reuse` 不再是附属优化，而是请求能否高效重启的前提。`transfer orchestration` 和 `memory tiering` 也因此变得显性，因为状态对象会在 GPU、主机内存、远端池之间流动。换句话说，agentic workload 把 CPU 从“计算之前的准备者”变成了“整个状态生命周期的编排者”。

### 4.3 真实产品形态的约束映射

这一判断并非抽象推演，而是有真实产品形态支持。`Claude Code subagents` 暴露的是 `session multiplicity`：不同子代理拥有独立上下文窗口，会给 CPU 带来多队列、多上下文的排队与恢复压力。`Kimi Agent Swarm` 与 `Kimi K2.5` 暴露的是 `fan-out/fan-in burst`：并行子代理带来短时极宽的推理并发，CPU 必须承担 burst admission、共享前缀复用和后续汇聚。`OpenClaw` 与 `Mobile Use Agent` 暴露的是 `multimodal ingress` 和 `resume-heavy execution`：图像、界面和多轮操作轨迹反复进入推理链路，使 prefill 和恢复路径比连续 decode 更容易先成为瓶颈。

这些产品材料共同说明，我们不能再用“CPU 是否足够把 GPU 喂饱”来定义问题。更准确的定义应是：**CPU 是否能够稳定地组织请求状态的进入、保留、恢复、分支和回收。**

### 4.4 本章吸收的单篇笔记

- `D07`：S027, S028, S029, S030
- `D03`：S001-S003
- `D12`：S010-S017, S041-S047

### 4.5 本章小结

因此，agentic workload 重写 CPU 问题定义的方式，不是简单增加了更多请求，而是改变了请求的时间形状、状态形状和复用结构。CPU 在这里进入关键路径，不是因为它突然要做更多数值计算，而是因为它承担了更多跨阶段、跨上下文和跨节点的状态决策。

---
