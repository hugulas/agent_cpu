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

本子章节要收束出的结论是：  
**Agentic inference 之所以特别适合拆出 prefill，不是因为它比传统工作负载“上下文更长”这么简单，而是因为它同时具备 prefill-first、shared-prefix-rich 和 remote-prefill-feasible 三个特征，使前缀计算天然更适合被独立部署和控制。**
