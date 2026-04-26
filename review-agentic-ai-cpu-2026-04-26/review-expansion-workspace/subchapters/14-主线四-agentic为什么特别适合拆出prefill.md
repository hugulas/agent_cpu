## 主线四子章节 1：为什么 Agentic Inference 特别适合拆出 Prefill

父章节：`8. 主线四：PD 分离与跨池控制平面`

本子章节聚焦：

- prefill-first
- shared prefix
- remote prefill
- 为什么这些特征让 PD 分离在 agentic 语境中更有吸引力

当前提纲要点：

- prefill-first
- shared prefix
- remote prefill

`Prefill/Decode` 分离并不是一个对所有推理负载都同样有吸引力的部署选择。它之所以在近一轮 agentic inference 讨论中迅速升温，不是因为工程界突然偏爱更复杂的架构，而是因为 agentic workload 的形状恰好比传统单轮聊天更适合把 prefill 单独拆出来。要说明这一点，首先必须明确：prefill 的系统属性和 decode 并不相同，它们对算力、内存、带宽、状态和调度的要求存在结构性差异。

在传统、较平滑的 chat serving 场景中，请求往往可以粗略描述为“先做一次较重的前缀计算，然后进入较长一段稳定 decode”。虽然这类工作负载同样能从 PD 分离中受益，但收益未必足以覆盖额外的状态转移、KV 回传和调度复杂度。然而，agentic workload 改变了这个平衡点。它更常出现的是：高频短回合、多次重启、共享前缀反复出现、会话分支不断生成、工具 schema 和角色提示大面积复用、以及多模态输入导致的突发 prefill。于是，prefill 不再只是“每个请求的开头阶段”，而更像一种被频繁触发、形状多变、又高度值得优化的独立服务动作。

这可以从三个特征来理解。

第一，`prefill-first`。  
Agentic workload 下，系统更容易先被 prefill 打满，而不是先被 decode 打满。原因并不神秘。无论是 GUI agent、代码代理还是多子代理协同系统，请求往往都需要反复把新的上下文、上一步结果、共享模板、分支信息或视觉输入重新整理并送入模型。这些动作未必会产生很长的连续 decode，但会制造大量前缀计算。于是，系统的关键压力不再只是 steady-state token generation，而是一次次短促却昂贵的 prefill 启动、排队、落位和恢复。只要工作负载表现为“更多 prefill、较短 decode、频繁 resume”，prefill 就天然更适合被看成单独资源对象。

第二，`shared prefix`。  
Agentic 场景里，大量请求不是彼此完全独立的。它们往往共享 system prompt、agent role、tool schema、任务规范、对话历史前缀，或者至少共享长段相同模板。对于多子代理系统来说，这种共享会进一步放大：不同 subagent 可能在不同目标上行动，但其启动上下文、环境说明和公共知识前缀往往高度一致。只要共享前缀足够明显，prefill 的重复就不仅仅是可以优化，而是几乎一定值得专门优化。因为如果不拆出这部分工作，系统就会在最容易重复的地方一再支付最昂贵的成本。

第三，`remote prefill` 的现实性提高了。  
过去即便意识到 prefill 和 decode 的资源特征不同，把它们真正拆到不同节点或不同池上仍然常常受限于 KV 过大、带宽过高、状态传输不可承受。但在 2025H2 之后，随着 reduced-KV、hybrid attention、prefix reuse、early reuse 和分层 KV 管理路线逐渐成熟，prefill 结果不再像过去那样难以流动。也就是说，agentic workload 不仅在需求上更适合拆 prefill，在技术上也开始出现更现实的基础，使“远端做 prefill、本地做 decode”从理论构想转向可工程讨论的方案。

把这三点合在一起，agentic inference 就表现出一种很强的倾向：它把 prefill 从“每个请求的前半段”推成了“值得独立部署和独立调度的计算阶段”。而一旦阶段被独立出来，系统设计的重心也会变化。问题不再只是“如何加快本地 prefill”，而是：

- 哪些请求值得送去远端 prefill 节点；
- 哪些 shared prefix 可以在某个 prefill 池内长期保留；
- prefill 完成后的 KV 应如何回传、何时回传、回传到哪里；
- 若本地 decode 池繁忙，是否应延迟、合并或重路由某些 prefill 结果；
- 当 prefix reuse、cache affinity 和负载均衡冲突时，哪个目标优先。

这些都说明，agentic inference 并不是“顺便从 PD 分离获益”，而是在结构上推动 PD 分离变得更有吸引力。它把 prefill 的高复用性、高突发性和高阶段独立性同时放大了。结果就是：prefill 可以从一个附属阶段，转化为一个值得单独优化、单独放置、单独评估的服务角色。

这里还需要强调一个容易被忽略的点：agentic workload 对 prefill 的偏好，并不意味着 decode 变得不重要，而是意味着两者的优化边界开始明显分离。Decode 更关心持续 token 生成、低 jitter 和稳定尾延迟；prefill 则更关心共享前缀复用、批形成效率、上下文吞吐、状态回传以及跨池 placement。只要这两组目标不完全一致，分离就会变得合理。Agentic inference 恰恰放大了这种不一致，因此更容易为 PD 分离提供业务和技术上的双重正当性。

从 CPU 角度看，这一变化直接抬高了 host 侧复杂度。因为只要 prefill 能被单独拆出，CPU 就不再只是在单节点内部处理 queue、worker selection 和阶段切换，而需要开始回答跨节点、跨池甚至跨域的问题。它至少要决定：

- 哪一类请求适合 local prefill，哪一类适合 remote prefill；
- 哪些 prefix 值得跟随 prefill 节点保留，哪些应随 decode 池移动；
- 带宽紧张时应优先回传哪些状态；
- 当本地 decode 和远端 prefill 的节奏不同步时，如何避免状态过早或过晚到达。

这说明，agentic inference “特别适合拆出 prefill”的真正原因，并不只是它有很多长上下文，而是它把前缀计算变成了更独立、更重复、更突发、也更值得控制平面显式管理的对象。对于服务系统来说，这种变化很关键，因为它把优化问题从单节点加速推进成跨池编排；对于 AI CPU 来说，这种变化更关键，因为它把 CPU 的职责从本地阶段协调推进成分布式 prefill 控制。

也正因此，后续的 `Prefill-as-a-Service` 才不是凭空出现的新概念，而是这一负载形状自然推导出的下一步。先有 agentic workload 把 prefill 从隐含阶段推成独立对象，后有系统尝试把 prefill 节点化、服务化、跨池化。没有前者，后者就像过度设计；有了前者，后者反而变成顺理成章的演化。

### 0. 判断-证据对齐表

| 判断 | 直接支撑材料 | 关键数字或图 |
| --- | --- | --- |
| agentic workload 比传统 chat 更容易呈现 prefill-first 形态 | `S001 S028 S029 S030` | `100` sub-agents；`1,500+` tool calls；visual / GUI multi-session 形态 |
| shared prefix 在多代理与工具链场景中是结构性存在，而不是偶然重复 | `S028 S029 S030` | 公共 role / tool schema / session trunk；`4.5x` sequential wall-clock reduction |
| remote prefill 之所以在 2025H2+ 变现实，是因为 reduced-KV、prefix reuse 与 KV lifecycle 已经到位 | `S001 S029 S030` | PD/PraaS 架构图；visual-agent burst；跨池恢复逻辑 |

### 1. 本章核心判断

`Prefill/Decode` 分离并不是一个对所有推理负载都同样有吸引力的部署选择。它之所以在近一轮 agentic inference 讨论中迅速升温，不是因为工程界突然偏爱更复杂架构，而是因为 agentic workload 的形状恰好比传统单轮聊天更适合把 prefill 单独拆出来。最关键的不是“上下文更长”，而是 agentic 负载同时具备 `prefill-first`、`shared-prefix-rich` 和 `remote-prefill-feasible` 三个特征。[1][2][3][4]

### 2. 为什么 agentic workload 更容易先被 prefill 打满

在传统 chat 场景中，请求往往是“一次较重 prefill + 一段相对稳定的 decode”。而 agentic workload 更常出现：

- 高频短回合；
- 多次 resume；
- 会话分支不断生成；
- 新上下文、工具 schema 和视觉输入持续注入。

这会让系统更容易先被 prefill 压满，而不是先被 decode 压满。Kimi Agent Swarm / K2.5 的公开形态就是最直接的证据：系统支持最多 `100` 个 sub-agents、`1,500+` tool calls，并给出相对顺序执行最多 `4.5x` 的 wall-clock 改善。[2][3] 这些数字背后的真实含义不是“工具调用很多”，而是**会话启动、共享前缀复用和上下文再进入会变得极其频繁**。

### 图 1：agentic workflow 的真正压力往往来自反复触发的前缀阶段

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/cpu-centric-agentic-workflow.png" alt="CPU-centric agentic workflow" width="760">

图 1 用来支撑一个核心转折：agentic 流程不是单次长 decode，而是反复发生阶段切换、状态恢复和前缀重入，因此 prefill 更容易成为第一类独立优化对象。[2][3][4]

### 3. shared prefix 为什么在 agentic 场景里更强

多代理系统往往共享 system prompt、agent role、工具 schema、环境说明、公共知识前缀和部分对话历史。也就是说，不同 subagent 目标虽不同，但启动上下文高度一致。只要共享前缀足够明显，prefill 的重复就不再是可有可无的小浪费，而会变成最值得专门优化的一段成本。

这也是为什么本综述把 prefix reuse 和 PD 分离放在同一主线内：只有当 shared prefix 是结构性存在时，把 prefill 抽成独立阶段、独立池甚至独立服务，才会从“过度设计”变成“顺理成章”。[2][3][4]

### 4. remote prefill 为什么在 2025H2 之后变得现实

过去即使意识到 prefill 和 decode 的资源特征不同，把它们真正拆到不同节点或不同池上仍常受限于 KV 太大、带宽太高、状态传输不可承受。但 `S001` 已经表明，PraaS 讨论的对象不再局限于同构单集群，而是跨数据中心、异构集群和商品以太网。[1] 这意味着工程界已经开始默认：只要前缀足够值钱、共享足够明显、回传路径足够可控，remote prefill 是可以被认真考虑的。

### 图 2：从 tool-call / branch-resume 视角看，prefill 已经像独立服务动作

<img src="../../../review-expansion-workspace/agentic-ai-head-cpu-comprehensive/assets/agentic-tool-call-offload-prefetch.svg" alt="Agentic tool call prefill and offload workflow" width="760">

图 2 支撑本节的第三个判断：agentic 负载下的 prefill 已经更像被频繁触发、可独立调度的服务动作，而不只是每个请求开头顺便做的一段计算。[1][4]

### 5. 这为什么会直接抬高 CPU 复杂度

只要 prefill 能被单独拆出，CPU 就不再只是在单节点内处理 queue、worker selection 和阶段切换，而要开始回答跨节点、跨池甚至跨域的问题：

- 哪一类请求适合 local prefill，哪一类适合 remote prefill；
- 哪些 prefix 值得跟随 prefill 节点长期保留；
- 带宽紧张时应优先回传哪些状态；
- 本地 decode 与远端 prefill 节奏不同步时，如何避免状态过早或过晚到达。

因此，agentic inference “特别适合拆出 prefill”的真正原因，并不只是上下文长，而是它把前缀计算变成了更独立、更重复、更突发、也更值得控制面显式管理的对象。[1][2][3][4]

### 6. 小结

本节要收束出的结论是：**agentic inference 之所以特别适合拆出 prefill，不是因为它比传统工作负载“上下文更长”这么简单，而是因为它同时具备 prefill-first、shared-prefix-rich 和 remote-prefill-feasible 三个特征，使前缀计算天然更适合被独立部署和控制。** 这一结论已被 `100` sub-agents、`1,500+` tool calls、`4.5x` wall-clock 改善和 PraaS 的跨池化方向共同支撑。[1][2][3][4]

### 参考文献

[1] Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter. 2026-04-16/22.

[2] Kimi Introduces Agent Swarm: Let 100 AI Agents Work for You. 2026-04-11.

[3] Kimi K2.5: Visual Agentic Intelligence. 2026.

[4] Anthropic / OpenClaw / Mobile Use Agent materials as multimodal or multi-session shape evidence. 2026/current.
