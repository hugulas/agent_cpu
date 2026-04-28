## 并入主综述的建议

### 推荐定位

这章最适合放在全文后半段，作为“平台与路线图收束章”，而不是放在前面的机制主线里。

推荐放置顺序：

1. 先完成 `kernel launch / control plane / KV lifecycle / MoE / PD / PraaS / CPU direct requirements`
2. 再插入这一章：
   `Agentic 处理器趋势的核心不是 GPU，而是 control plane 平台化`
3. 然后接：
   - 工业采用状态
   - 厂商路线图
   - benchmark 与研究空白
   - 讨论
   - 结论

### 为什么放这里

- 这章不是在讲某个局部机制。
- 它的作用是把前面多条系统主线，回收到统一的平台判断上。
- 如果放太前，会让读者误以为全文在做“芯片路线图综述”，而不是在解释 agentic inference 如何重写 CPU/control-plane 问题。

### 与主综述现有章节的连接句

可放在上一章结尾：

> 如果说前面的章节已经说明，agentic inference 正把 `KV lifecycle`、`MoE routing`、`prefill/decode split` 和 `state transfer` 推上 CPU control plane，那么接下来的问题就变成：这些系统级压力，是否已经开始反过来重写处理器与平台路线图。

可放在本章结尾：

> 因此，agentic 时代真正被重写的，不是某颗芯片，而是整个平台里 `CPU + 状态 + 互连 + host memory hierarchy + offload fabric` 的关系。接下来再看工业采用状态和厂商路线图，就不应只问“谁的芯片更强”，而应问“谁的平台最先吸收了这种 control-plane 压力”。
