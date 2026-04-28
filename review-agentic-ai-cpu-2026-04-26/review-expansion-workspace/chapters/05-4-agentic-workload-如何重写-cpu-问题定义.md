## 4. Agentic workload 如何重写 CPU 问题定义

### 4.1 从单轮 decode 到长生命周期状态机

过去很多推理系统默认的工作负载原型，是“用户提交一个请求，系统做一次 prefill，再进入较长的 decode 阶段”。这个原型适合解释传统 chat serving，但并不适合解释 `agentic workload`。现实中的代理系统更接近一个长生命周期状态机：请求会 `pause`，等待外部结果或分支决策；会 `resume`，把旧状态重新接回计算；会 `fan-out` 成多个子代理并行执行；会 `fan-in` 把多路结果重新汇总；还会因为 `multimodal ingress` 把新的视觉或界面状态不断送回模型。只要负载变成这种形态，CPU 就不再只是启动某一段 GPU 计算，而要负责管理整段状态机的切换。[1][2][3][4]

这种变化的关键不在于“请求更多”，而在于请求的**时间形状**、**状态形状**和**复用结构**一起变了。单轮 chat 更接近一条顺滑的 decode 曲线，而 agentic inference 更像一组频繁中断、重启、分叉和汇合的短阶段流水线。对 CPU 来说，这意味着关键路径不再只是“把 GPU 喂饱”，而是“能否持续推进状态机并维持状态对象的正确位置”。[1][5]

### 4.2 为什么 CPU 的角色不再只是发 kernel

Agentic workload 重写 CPU 问题定义的关键，在于它把大量“以前可以忽略的状态动作”推到前台。请求 ingress 不再只是收一个 prompt，而是要接收新上下文、分支信息、历史状态和多模态输入。路由不再只是找一张空闲 GPU，而是要找最可能命中 prefix cache、最适合恢复旧 KV、最适合承接某类 prefill 或 decode 的节点。`prefix/KV reuse` 不再是附属优化，而是请求能否高效重启的前提。`transfer orchestration` 和 `memory tiering` 也因此变得显性，因为状态对象会在 GPU、主机内存、远端池之间流动。换句话说，agentic workload 把 CPU 从“计算之前的准备者”变成了“整个状态生命周期的编排者”。[5][6][7]

可以把这种变化压缩成四个更具体的 workload 特征：

| workload 特征 | 对 CPU 问题定义的改写 |
| --- | --- |
| `prefill-first` | CPU 面对的不再是长稳态 decode，而是大量短阶段前缀进入与再进入 |
| `session multiplicity` | CPU 需要同时维护多份上下文和状态对象，而不是一条单会话请求链 |
| `fan-out / fan-in burst` | CPU 必须承受瞬时扩张的 admission、routing 和汇合压力 |
| `multimodal ingress` | CPU 需要处理更不稳定的输入 shape、前处理链和状态恢复路径 |
| `input preprocessing` | 长 prompt 和多模态输入把 tokenization 的 CPU 负载推到 TTFT 的关键路径上 |

后文四条主线本质上都是这五个 workload 特征在系统层面的展开。

### 4.2.1 输入预处理：长 prompt 与多模态 ingress 下的 tokenization 负载

`input preprocessing` 是 agentic workload 中最容易被低估的 CPU 特征之一。传统 chat serving 假设输入长度可控、tokenization 时间可忽略，但 agentic 场景下的长上下文 prompt、多模态截图 OCR 文本和 tool 返回的 JSON 结构体，都把 tokenizer 推到了关键路径上。

S005 的测量为此提供了直接证据：在 Llama 3.1 8B（4×H200）上，**tokenization 最高可占 TTFT 的 up to 50%**；随着上下文长度增长，tokenization 时间线性增加，且由于现代 serving stack 使用 chunked prefill 和 FlashAttention，prefill 时间本身也随序列长度近线性增长，tokenization 因此始终是一个不可忽视的固定比例。[8]

![Tokenization vs TTFT 延迟分解](../assets/subchapters/01/s005-fig5-tokenization-ttft-breakdown.png)

> **图：** S005 Figure 5 给出的延迟分解。CPU-side tokenization 与模型前向传播的时间比例随序列长度和 batch size 变化。在长序列场景下，tokenizer 的 CPU 预处理已经足以与 GPU 计算分庭抗礼。  
> 来源：*Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference*, 2026-03.

这张图的价值在于它提供了一个经常被忽略的时间视角：人们通常认为"模型前向传播（TTFT）才是大头"，但在长序列或高并发场景下，**tokenizer 的 CPU 预处理已经足以与 GPU 计算分庭抗礼**。更关键的是，tokenizer 性能问题不是简单的"加几个 core"就能解决：HuggingFace Tokenizers 默认启用 `TOKENIZERS_PARALLELISM=true`（Rust 多线程加速子词分割），但高并发时反而因 core contention 导致绝对 tokenization 延迟再增加约 **5%**，TTFT 整体增加约 **10%**。[8]

对 agentic workload 而言，这个特征的系统性影响在于：

1. **Resume 频率高** → 每一次 resume 都要重新 tokenize 新输入（tool 结果、新 prompt 段），tokenization 不是一次性成本而是反复成本；
2. **多模态输入 shape 不稳定** → OCR 文本、图像描述、结构化 JSON 的 token 分布差异大，无法通过静态缓存或预 tokenization 完全消除；
3. **长上下文常态化** → 1M token prompt 的 tokenization 可能消耗数秒 CPU 时间，直接把前置阶段拖成瓶颈。

因此，tokenization 不是"请求进入前的一个小步骤"，而是**agentic workload 时间形状中一个与输入长度线性挂钩、可占据端到端延迟一半的 CPU 密集型阶段**。它与 kernel launch tax（主线一）的区别在于：tokenization 属于"请求进入前的准备阶段"，而 launch tax 属于"算子下发阶段"；两者虽然都走 CPU，但优化路线完全不同——前者靠 Rust 多线程、预 tokenization 和缓存，后者靠 CUDA Graphs、编译器图化和 persistent runtime。把这两者混为一谈会让优化策略失焦，但把 tokenization 完全忽略则会让 workload 定义的完整性受损。

### 4.3 真实产品形态的约束映射

这一判断并非抽象推演，而是有真实产品形态支持。

`Claude Code subagents` 暴露的是 `session multiplicity`：不同子代理拥有独立上下文窗口，会给 CPU 带来多队列、多上下文的排队与恢复压力。

`Kimi Agent Swarm` 与 `Kimi K2.5` 暴露的是 `fan-out/fan-in burst`：并行子代理带来短时极宽的推理并发，系统支持最多 `100` 个 sub-agents、`1,500+` tool calls，并报告相对顺序执行最高 `4.5x` 的 wall-clock 改善。这里真正重要的不是营销数字本身，而是它们证明了“单次请求”已经被切碎成大量并发短阶段。[2][3]

`OpenClaw`、`Mobile Use Agent` 与可视化 agent 形态材料暴露的是 `multimodal ingress` 和 `resume-heavy execution`：图像、界面和多轮操作轨迹反复进入推理链路，使 prefill 和恢复路径比连续 decode 更容易先成为瓶颈。[3][4]

这些产品材料共同说明，我们不能再用“CPU 是否足够把 GPU 喂饱”来定义问题。更准确的定义应是：**CPU 是否能够稳定地组织请求状态的进入、保留、恢复、分支和回收。**

### 图 1：agentic workflow 的压力来自反复触发的前缀阶段与状态回收

![CPU-centric agentic workflow](../assets/subchapters/14/cpu-centric-agentic-workflow.png)

图 1 的价值不在于展示一个抽象 workflow，而在于把 CPU 面临的关键动作可视化了：`prefill -> tool call -> resume -> shared prefix re-enter -> state handoff` 被不断重复。这正是为什么 agentic inference 下的 CPU 更像状态编排器，而不只是 launch 发起者。[2][3][4]

### 4.4 为什么这会自然引出后面的四条主线

一旦把 CPU 问题定义改写成“状态对象能否被正确组织”，后文四条主线就会变得自然：

- 如果状态推进变成问题，`dispatch chain` 就会从 launch overhead 演化成调度墙。
- 如果状态复用变成问题，`KV cache` 就会从容量对象演化成生命周期对象。
- 如果状态驻留变成问题，`MoE` 就会从稀疏计算演化成 orchestrator 问题。
- 如果状态跨池流动变成问题，`prefill/decode` 就会从单节点优化演化成跨池控制平面。[1][5][6][7]

也就是说，本章不是全文前言的重复，而是四条主线的问题定义层。

### 4.5 本章主要参考文献

本章的核心证据不是单篇论文，而是产品形态、系统机制和服务架构三类材料的交叉支撑：agentic workload 已经在现实产品中呈现为 `prefill-first`、`burst-heavy` 和 `resume-heavy` 的组合，而系统侧也已经开始沿状态复用、状态转移和角色拆分来吸收这种变化。[1][2][3][5]

### 4.6 本章小结

因此，agentic workload 重写 CPU 问题定义的方式，不是简单增加了更多请求，而是改变了请求的时间形状、状态形状和复用结构。CPU 在这里进入关键路径，不是因为它突然要做更多数值计算，而是因为它承担了更多跨阶段、跨上下文和跨节点的状态决策。后面的四条主线，本质上就是这一定义在 dispatch、KV、MoE 和 PD 分离四个系统对象上的具体展开。[1][2][5][6]

### 参考文献

[1] [Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter](../material/reference-notes/s001-prefill-as-a-service-kvcache-of-next-generation-models-could-go-cross-datacenter.md). 2026-04.

[2] [Kimi Introduces Agent Swarm: Let 100 AI Agents Work for You](../material/reference-notes/s028-kimi-introduces-agent-swarm-let-100-ai-agents-work-for-you.md). 2026-04-11.

[3] [Kimi K2.5: Visual Agentic Intelligence](../material/reference-notes/s029-kimi-k2-5-visual-agentic-intelligence.md). 2026.

[4] [Anthropic / OpenClaw / Mobile Use Agent materials as multimodal or multi-session shape evidence](../material/reference-notes/s030-anthropic-openclaw-mobile-use-agent-materials-as-multimodal-or-multi-session-sha.md). 2026.

[5] [Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo](../material/reference-notes/s003-full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo.md). 2026-04-17.

[6] [BentoML Handbook: Prefill-decode disaggregation](../material/reference-notes/s021-prefill-decode-disaggregation.md). 2026/current.

[7] [Kv Events Subscriber — vLLM](../material/reference-notes/s042-kv-events-subscriber-vllm.md). current.

[8] [Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference](../material/reference-notes/s005-characterizing-cpu-induced-slowdowns-in-multi-gpu-llm-inference.md). 2026-03.
