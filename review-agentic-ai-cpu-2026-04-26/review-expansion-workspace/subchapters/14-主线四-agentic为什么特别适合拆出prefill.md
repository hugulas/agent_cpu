## 主线四子章节 1：为什么 Agentic Inference 特别适合拆出 Prefill

父章节：`8. 主线四：PD 分离与跨池控制平面`

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| agentic workload 比传统 chat 更容易呈现 prefill-first 形态 | `S001 (Prefill-as-a-Service) S028 (Kimi Agent Swarm) S029 (Kimi K2.5) S030 (Mobile Use Agent)` | `100` sub-agents；`1,500+` tool calls；visual / GUI multi-session 形态 |
| shared prefix 在多代理与工具链场景中是结构性存在，而不是偶然重复 | `S028 (Kimi Agent Swarm) S029 (Kimi K2.5) S030 (Mobile Use Agent)` | 公共 role / tool schema / session trunk；`4.5x` sequential wall-clock reduction |
| remote prefill 之所以在 2025H2+ 变现实，是因为 reduced-KV、prefix reuse 与 KV lifecycle 已经到位 | `S001 (Prefill-as-a-Service) S029 (Kimi K2.5) S030 (Mobile Use Agent)` | PD/PraaS 架构图；visual-agent burst；跨池恢复逻辑 |

### 1. 本章核心判断

上一章刚刚说明，工业界已经把 `MoE needs control plane` 这个判断吸收成了现实问题。切到主线四，`Prefill/Decode` 分离之所以在近一轮 agentic inference 讨论中迅速升温，也不是因为工程界突然偏爱更复杂架构，而是因为 agentic workload 的形状恰好比传统单轮聊天更适合把 prefill 单独拆出来。最关键的不是“上下文更长”，而是 agentic 负载同时具备 `prefill-first`、`shared-prefix-rich` 和 `remote-prefill-feasible` 三个特征。[1][2][3][4]

### 2. 为什么 agentic workload 更容易先被 prefill 打满

在传统 chat 场景中，请求往往是“一次较重 prefill + 一段相对稳定的 decode”。而 agentic workload 更常出现：

- 高频短回合；
- 多次 resume；
- 会话分支不断生成；
- 新上下文、工具 schema 和视觉输入持续注入。

这会让系统更容易先被 prefill 压满，而不是先被 decode 压满。Kimi Agent Swarm / K2.5 的公开形态就是最直接的证据：系统支持最多 `100` 个 sub-agents、`1,500+` tool calls，并给出相对顺序执行最多 `4.5x` 的 wall-clock 改善。[2][3] 这些数字背后的真实含义不是“工具调用很多”，而是**会话启动、共享前缀复用和上下文再进入会变得极其频繁**。

### 图 1：agentic workflow 的真正压力往往来自反复触发的前缀阶段

![CPU-centric agentic workflow](../assets/subchapters/14/cpu-centric-agentic-workflow.png)

图 1 不是泛泛在画 workflow，而是在提醒读者关注图中反复出现的 prefill / resume / prefix re-enter 阶段。对本章判断来说，关键不是“有流程”，而是前缀阶段被频繁重启、重入和共享。[2][3][4]

### 3. shared prefix 为什么在 agentic 场景里更强

多代理系统往往共享 system prompt、agent role、工具 schema、环境说明、公共知识前缀和部分对话历史。也就是说，不同 subagent 目标虽不同，但启动上下文高度一致。只要共享前缀足够明显，prefill 的重复就不再是可有可无的小浪费，而会变成最值得专门优化的一段成本。

这也是为什么本综述把 prefix reuse 和 PD 分离放在同一主线内：只有当 shared prefix 是结构性存在时，把 prefill 抽成独立阶段、独立池甚至独立服务，才会从“过度设计”变成“顺理成章”。[2][3][4]

### 4. remote prefill 为什么在 2025H2 之后变得现实

过去即使意识到 prefill 和 decode 的资源特征不同，把它们真正拆到不同节点或不同池上仍常受限于 KV 太大、带宽太高、状态传输不可承受。但 `S001 (Prefill-as-a-Service)` 已经表明，PraaS 讨论的对象不再局限于同构单集群，而是跨数据中心、异构集群和商品以太网。[1]

这条路径之所以在 2025H2 之后突然更可信，一个重要原因是模型和系统两侧的基础都在变化。reduced-KV / hybrid attention 让 KV 体积下降，prefix reuse / early reuse 减少了重复 prefill 的总量，而主线二已经说明 KV lifecycle 与状态回传开始被更系统地治理。于是，约束开始从“根本传不动”转向“调度值不值得、带宽够不够、状态放得对不对”。

### 图 2：从 tool-call / branch-resume 视角看，prefill 已经像独立服务动作

![Agentic tool call prefill and offload workflow](../assets/subchapters/14/agentic-tool-call-offload-prefetch.svg)

图 2 支撑本节的第三个判断：agentic 负载下的 prefill 已经更像被频繁触发、可独立调度的服务动作，而不只是每个请求开头顺便做的一段计算。[1][4]

### 5. 这为什么会直接抬高 CPU 复杂度

只要 prefill 能被单独拆出，CPU 就不再只是在单节点内处理 queue、worker selection 和阶段切换，而要开始回答跨节点、跨池甚至跨域的问题：

- 哪一类请求适合 local prefill，哪一类适合 remote prefill；
- 哪些 prefix 值得跟随 prefill 节点长期保留；
- 带宽紧张时应优先回传哪些状态；
- 本地 decode 与远端 prefill 节奏不同步时，如何避免状态过早或过晚到达。

因此，agentic inference “特别适合拆出 prefill”的真正原因，并不只是上下文长，而是它把前缀计算变成了更独立、更重复、更突发、也更值得控制面显式管理的对象。[1][2][3][4]

### 6. 小结

本节要收束出的结论是：**agentic inference 之所以特别适合拆出 prefill，不是因为它比传统工作负载“上下文更长”这么简单，而是因为它同时具备 prefill-first、shared-prefix-rich 和 remote-prefill-feasible 三个特征，使前缀计算天然更适合被独立部署和控制。** 这一结论已被 `100` sub-agents、`1,500+` tool calls、`4.5x` wall-clock 改善和 PraaS 的跨池化方向共同支撑。下一章就顺着这条逻辑，分析系统如何从单集群 PD 走向 Prefill-as-a-Service。[1][2][3][4]

### 参考文献

[1] [Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter](../material/reference-notes/s001-prefill-as-a-service-kvcache-of-next-generation-models-could-go-cross-datacenter.md). 2026-04.

[2] [Kimi Introduces Agent Swarm: Let 100 AI Agents Work for You](../material/reference-notes/s028-kimi-introduces-agent-swarm-let-100-ai-agents-work-for-you.md). 2026-04-11.

[3] [Kimi K2.5: Visual Agentic Intelligence](../material/reference-notes/s029-kimi-k2-5-visual-agentic-intelligence.md). 2026.

[4] [Anthropic / OpenClaw / Mobile Use Agent materials as multimodal or multi-session shape evidence](../material/reference-notes/s030-anthropic-openclaw-mobile-use-agent-materials-as-multimodal-or-multi-session-sha.md). 2026.
