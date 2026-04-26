# 评审意见：14-Agentic 为什么特别适合拆出 Prefill

## 总体评价

主线四的开篇章节，三个特征（prefill-first / shared-prefix-rich / remote-prefill-feasible）的论证充分且能落地到 CPU 复杂度升级。`100` sub-agents、`1,500+` tool calls 和 `4.5x` wall-clock 改善等数字具体有力。从"prefill 是请求前半段"到"prefill 是独立服务动作"的概念升级清晰。

**但存在严重的结构混乱问题：第 1-55 行是未标章节的大量正文，然后突然出现第 0 节判断表和第 1 节核心判断，这与综述的规范性格式严重不符。**

---

## 具体修改建议

### 【高优先级 —— 必须立即修复】

**1. 重构章节结构**
- 当前结构极其混乱：
  - 第 1-4 行：标题和父章节
  - 第 5-15 行："本子章节聚焦"和"当前提纲要点"
  - 第 16-55 行：**未标章节号的完整正文**（包含 prefill-first / shared prefix / remote prefill 的详细论述）
  - 第 56-63 行：第 0 节"判断-证据对齐表"
  - 第 64-66 行：第 1 节"本章核心判断"（与第 16-55 行内容高度重复）
  - 第 68-114 行：第 2-6 节正式正文
- **建议**：
  - 方案 A（推荐）：以第 56-114 行的正式版本为骨架，将第 16-55 行中独有的精华内容（如第 45-52 行关于 CPU 复杂度升级的四点论述）整合进正式版本的第 5 节，然后删除第 5-55 行的冗余内容。
  - 或者，如果第 16-55 行的论述更完整，可以将其作为正式正文，但需要：
    1. 添加章节编号（如"第 2 节"、"第 3 节"等）
    2. 将第 0 节判断表移到正文之前
    3. 删除第 64-66 行的重复核心判断

**2. 图片语法不一致** ✅ 已修复：已统一为 Markdown `![alt](path)` 语法
- 同其他子章节。
- **建议**：统一为 Markdown 图片语法。

### 【中优先级】

**3. S 编号未标注全称** ✅ 已修复：判断表与正文中均已标注全称
- `S001` `S028` `S029` `S030` 未标注全称。
- **建议**：`S001`（Prefill-as-a-Service）、`S028`（Kimi Agent Swarm）、`S029`（Kimi K2.5）、`S030`（Mobile Use Agent / 多模态 agent 证据）。

**4. 第 4 节"remote prefill 为什么在 2025H2 之后变得现实"偏短**
- 该节只有两段（第 91-93 行），而第 2 节"prefill-first"和第 3 节"shared prefix"都有更充分的展开。
- **建议**：补充更多关于"技术上为什么变现实"的论述。当前只提到 PraaS 的跨池化方向，但可以进一步说明：
  - reduced-KV / hybrid attention 如何降低了 KV 传输体积
  - prefix reuse / early reuse 如何减少了重复 prefill 的总量
  - 这些技术与 PD 分离的协同关系

**5. 图 1 的论证功能**
- 图 1 使用的是 `cpu-centric-agentic-workflow.png`，alt text 为"CPU-centric agentic workflow"。
- **建议**：确认此图是否明确展示了"prefill 反复触发"的特征。如果图更偏向一般性的 agentic workflow，建议在图注中更具体地指出"注意图中反复出现的 prefill / resume / prefix-reenter 阶段"。

### 【低优先级】

**6. 与 15 子章节的衔接**
- 14 结尾提到了"后续的 Prefill-as-a-Service"，但没有明确指向 15 的章节号。
- **建议**：在小结中明确写出"下一子章节（15）将分析从单集群 PD 到 PraaS 的具体升级路径"。

---

## 可接受当前状态的点

- "agentic inference 不是顺便从 PD 分离获益，而是在结构上推动 PD 分离"的判断有力。
- 三个特征的命名（prefill-first / shared-prefix-rich / remote-prefill-feasible）简洁且可记忆。
- 从"单节点阶段协调"到"分布式 prefill 控制"的 CPU 角色升级论述到位。
