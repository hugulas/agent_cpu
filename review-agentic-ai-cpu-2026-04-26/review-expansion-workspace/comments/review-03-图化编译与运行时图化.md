# 评审意见：03-图化编译与运行时图化.md

## 总体评价

技术谱系梳理出色。piecewise → full → persistent kernels/megakernels的递进关系清晰，且每一层都明确标注了tradeoff。将图化从"编译优化"重新定位为"runtime组织问题"是本文的核心贡献之一，论述充分。

---

## 具体修改建议

### 【高优先级】

**1. "图化"一词缺少前置定义**
- 子章节标题和正文中大量使用"图化"（graphification / CUDA Graphs），但没有为不熟悉NVIDIA生态的读者提供基础定义。
- **建议**：在第1章核心判断之后（或之前）增加一段"什么是CUDA Graphs"的极简介绍：
  > CUDA Graphs是NVIDIA提供的一种执行机制，允许将一系列kernel调用预先记录为一个"图"，后续通过单次launch重放整个序列，从而跳过每次单独kernel launch的host-side开销。
  > 
  > 本文用"图化"泛指所有通过预构建执行结构来减少host dispatch的技术，包括CUDA Graphs、traced graphs、以及更激进的persistent kernel方案。

**2. persistent kernels与megakernels的区分**
- 第3.3节将persistent kernels和megakernels放在同一个标题下，但两者有区别：
  - persistent kernel：GPU端常驻执行的kernel，减少launch频率
  - megakernel：将多个逻辑kernel融合为单个物理kernel，减少kernel边界开销
- **建议**：在正文中明确区分这两个概念，或说明Event Tensor（S040）具体属于哪一类/如何融合两者。当前写法可能让读者混淆。

**3. S编号未释义**
- 同01/02，S038/S039/S040未在正文中解释。
- **建议**：统一增加材料索引。

### 【中优先级】

**4. 第2节与01子章节的重复**
- 第2节"为什么图化会在这个时间点重新变重要"中引用的`1.7x`吞吐提升和persistent batch等内容，与01子章节第3.1节高度重叠。
- **建议**：
  - 方案A：将此处简化为"如前所述（见01），host dispatch tax已足够显性..."，把篇幅留给图化特有的技术细节。
  - 方案B：如果必须保留，明确区分01的视角（"问题存在"）和03的视角（"因此图化成为解决方案之一"），避免读者觉得在重复阅读。

**5. Event Tensor的分析可以更深入**
- 第5节对Event Tensor的评价主要是"它说明dispatch tax问题已经严重到值得发明更激进的execution form"，但这更像是一个meta判断，而非技术判断。
- **建议**：补充Event Tensor的具体技术机制简述（如"tile-level dependency encoding"如何工作、"runtime materialization"是什么意思），帮助读者理解为什么它比CUDA Graphs更激进。

**6. 缺少对"编译"与"运行时"对比的图示**
- 第4节论述了图化是runtime组织问题而非编译问题，这是核心观点，但完全依赖文字。
- **建议**：考虑增加一张对比图或流程图，展示：
  - 传统离线编译：编译器优化 → 生成binary → 执行（结束）
  - serving图化：scheduler决策 → capture条件判断 → graph replay/fallback → 动态调整
  这会让"runtime组织问题"的论点更直观。

### 【低优先级】

**7. 图1和图2的alt text**
- 图1alt text为"vLLM CUDA Graph modes"，可以更具体："vLLM多模式CUDA Graph架构：FULL_AND_PIECEWISE与FULL_DECODE_ONLY的取舍"
- 图2alt text为"Event Tensor runtime implementation"，建议改为："Event Tensor动态调度运行时：将依赖编码为长生命周期执行结构"

**8. 参考文献的完整性**
- 参考文献只有3条，且S038/S039/S040都是vLLM/Event Tensor相关的。如果图化编译的历史脉络想追溯到更早期的工作（如TensorFlow XLA、PyTorch TorchScript等），可以补充，但不是必须的。

---

## 结构建议

当前第6节"对后续tradeoff章节的衔接"非常短（只有3句话），且功能上可以被第7节小结吸收。
- **建议**：删除第6节作为独立章节，将其内容合并入第7节小结末尾："上述技术谱系的tradeoff细节将在下一子章节（04）展开"。这样结构更紧凑。

---

## 可接受当前状态的点

- piecewise/full/persistent的三层分类是本文的亮点，保留。
- "graph-aware runtime"概念的提出准确，保留。
- 与backend/scheduler/batch formation/state reuse的耦合分析有深度，保留。
