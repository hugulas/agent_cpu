# S052: Sutradhara — Orchestrator-Engine Co-design for Tool-Based Agentic Inference

## 基本信息

| 字段 | 内容 |
|------|------|
| **标题** | Sutradhara: An Intelligent Orchestrator-Engine Co-design for Tool-based Agentic Inference |
| **作者** | Anish Biswas, Kanishk Goel, Srivarshinee S, Jayashree Mohan, Alind Khare, Anjaly Parayil, Chetan Bansal, Ram Ramjee (Microsoft Research India, Microsoft M365 Research) |
| **arXiv** | 2601.12967 |
| **日期** | 2026-01-19 (v1), 2026-04-22 (v3) |
| **类型** | 系统论文 / agent serving |
| **状态** | kept |

## 核心主张

当前 agentic 系统存在一个根本性架构错配：orchestrator（编排器）和 LLM 推理引擎作为解耦的黑盒运行，仅通过不透明的 request-response 接口通信。orchestrator 掌握迭代边界、工具依赖和 prompt 组合信息，而引擎控制调度、batching 和 KV cache 管理；两者互不利用对方信息做全局最优决策。Sutradhara 通过 **薄层 API 共设计**（thin API co-design）打通两层，实现三项关键优化：

1. **Prompt Splitting**: 在第 i 轮工具执行期间，利用工具无关的上下文投机性开始第 i+1 轮的 prefill，工具输出到达后增量扩展。
2. **Streaming Tool Dispatch**: 在 decode 阶段通过流式 JSON 解析器识别已完成的工具调用对象并立即 dispatch，无需等待完整 decode 结束。
3. **Orchestrator-Aware Cache Management**: 通过语义元数据标签和复用 hint 指导优先级感知的 eviction 策略，保留高价值 block，驱逐瞬态内容。

## 关键证据与数据

| 指标 | 数值 | 上下文 |
|------|------|--------|
| 同负载下负载提升 | 最高 `77%` | 相同 p50 FTR 延迟下可支撑的 QPS |
| p50 FTR 延迟降低 | 最高 `15%` | 相同负载下 |
| p90 FTR 延迟降低 | 最高 `11%` | 相同负载下 |
| E2E 延迟降低 | 最高 `11%` | 同负载 |
| 单请求延迟降低 | 最高 `42%` | intra-request parallelism 解锁后 |
| 工具调用占 FTR 延迟比 | `30%` ~ `85%` | 生产 trace 分析 |
| 代码量 | ~3,500 行 Python | 基于 vLLM v0.11.0 |

## 核心机制

1. **五 API 接口层**（表 1）：
   - `hint_tool_dependency(tool_ids)` — orchestrator 向 engine 声明工具依赖
   - `hint_prefix_reuse(block_hashes)` — 语义复用提示
   - `prompt_split(base_ctx, tool_independent_ctx)` — 工具无关上下文拆分
   - `stream_dispatch(partial_output)` — 增量输出流式分发
   - `report_cache_state(block_metadata)` — engine 向 orchestrator 回传 cache 状态

2. **Prompt Splitting**: 将第 i+1 轮 prompt 拆分为"工具无关前缀"（可立即 prefill）和"工具依赖后缀"（等工具返回后追加）。通过 chunked prefill 实现 overlap。

3. **Streaming JSON Parser**: 在 decode 流中实时识别完整的工具调用 JSON 对象，提前 dispatch，将串行"decode → parse → execute"变为流水线。

4. **Semantic KV Cache Tagging**: orchestrator 为不同上下文段附加语义标签（如 `system_prompt`, `tool_schema`, `user_query`, `tool_output`），engine 据此区分高价值 block（长期复用）与瞬态 block（短期即可驱逐）。

## 与本项目的关系

- **直接回答"Agent 推理系统的图编译与调度如何协同"**: Sutradhara 证明在 agentic workload 下，纯粹的 engine-level 优化（如 CUDA Graphs、图编译）无法解决跨层信息缺失问题。orchestrator 的语义 hint 直接改变 engine 的调度、batching 和 cache eviction 决策，这是机头 CPU 承担"控制平面"角色的强证据。
- **工具调用间隙的并行化**: 本项目在讨论 agentic 推理时指出"工具执行打断图连续性"；Sutradhara 通过 prompt splitting 和 streaming dispatch 将工具间隙从"完全阻塞"变为"可重叠计算"，是对该问题的系统级解法。
- **KV Cache 语义化管理**: 传统 eviction 基于 LRU 或请求完成时间；Sutradhara 引入语义标签指导 eviction，说明 KV cache 管理已从"容量管理"升级为"内容价值管理"，控制面需要理解 workload 语义。
- **与 Continuum 的对比**: Continuum 聚焦"保留 KV 在 GPU 等待工具返回"；Sutradhara 聚焦"在工具执行期间提前做 prefill 和 dispatch"。两者互补：一个减少等待成本，一个减少串行路径。

## 提取图表

图表已提取至 `assets/extracted-figures/sutradhara/`，共 18 张：

- `2601.12967_intro.png` — 核心问题：orchestrator 与 engine 作为黑盒运行的架构错配
- `2601.12967_sutradhara-parallel-design.png` — 并行执行设计：prompt splitting + streaming dispatch
- `2601.12967_ftr_breakdown_request1_2.png` — FTR 延迟拆解，展示工具调用占比
- `2601.12967_ftr_breakdown_top5_gains.png` — Top 5 延迟来源与优化增益
- `2601.12967_kv_cache_analysis.png` — KV cache 命中率与 thrashing 分析
- `2601.12967_thrashing.png` / `2601.12967_no-thrashing.png` — cache thrashing 对比
- `2601.12967_latency_vs_qps_reordered.png` — 延迟-QPS 曲线（serving capacity curve）
- `2601.12967_median_ftr_latency_bar.png` — 中位 FTR 延迟对比
- `2601.12967_disagg_ftr_bars.png` — PD 分离场景下的 FTR 对比
- `2601.12967_model_generalizability_bars.png` — 模型泛化性（Gemma3-27B）
- `2601.12967_continuum_comparison.png` — 与 Continuum 的对比
- `2601.12967_top120_ftr_e2e_cdf.png` — FTR / E2E 延迟 CDF
- `2601.12967_combined_analysis_2x3.png` — 综合分析 2x3 面板
- `2601.12967_new_content_position_cdf.png` — 新内容位置分布 CDF
- `2601.12967_v2_60_p50_bars.png` — p50 延迟柱状图
- `2601.12967_background.png` — 生产 trace 背景分析

## 引用

```bibtex
@article{biswas2026sutradhara,
  title={Sutradhara: An Intelligent Orchestrator-Engine Co-design for Tool-based Agentic Inference},
  author={Biswas, Anish and Goel, Kanishk and S, Srivarshinee and Mohan, Jayashree and Khare, Alind and Parayil, Anjaly and Bansal, Chetan and Ramjee, Ram},
  journal={arXiv preprint arXiv:2601.12967},
  year={2026}
}
```
