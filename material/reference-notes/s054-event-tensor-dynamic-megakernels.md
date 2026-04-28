# S054: Event Tensor — Dynamic Megakernels for LLM Serving

## 基本信息

| 字段 | 内容 |
|------|------|
| **标题** | Event Tensor: A Unified Abstraction for Compiling Dynamic Megakernel |
| **作者** | Hongyi Jin, Bohan Hou, Guanjie Wang, Ruihang Lai, Jinqi Chen, Zihao Ye, Yaxing Cai, Yixin Dong, Xinhao Cheng, Zhihao Zhang, Yilong Zhao, Yingyi Huang, Lijie Yang, Jinchen Jiang, Gabriele Oliaro, Jianan Ji, Xupeng Miao, Vinod Grover, Todd C. Mowry, Zhihao Jia, Tianqi Chen (CMU, etc.) |
| **arXiv** | 2604.13327 |
| **日期** | 2026-04-14 |
| **会议** | MLSys 2026 |
| **类型** | 编译器论文 / serving 后端 |
| **状态** | kept |

## 核心主张

现代 LLM serving 受限于两个系统级开销源：
1. **kernel launch overhead**: 每步 decode 可能涉及数百至数千个细粒度算子，每个 kernel launch 5–10μs，而最快 kernel 仅 2μs，launch 成本占主导。
2. **kernel boundary synchronization**: 连续 kernel 之间强制粗粒度同步，阻碍了本应可行的跨 kernel 流水线并行。

现有 megakernel 技术将多个算子融合为单个常驻 kernel 以消除 launch 间隙，但**无法处理动态 shape 和数据依赖计算**。Event Tensor 提出统一的编译抽象：
- **Event Tensor**: 编码 tile 级任务之间的依赖关系
- **静态与动态调度**: 对确定性任务图用预计算静态调度；对动态 workload 用 GPU 端动态调度器
- **AOT 编译**: 真正的提前编译，完全消除运行时编译开销和 CUDA Graph recapture 的复杂管理

## 关键证据与数据

| 指标 | 数值 | 上下文 |
|------|------|--------|
| GEMM+Reduce-Scatter 加速 | 最高 `1.40x` | 8x B200, tensor-parallel |
| MoE layer 加速 | 最高 `1.23x` | 数据依赖 workload |
| engine warmup 开销降低 | 最高 `3.5x` | 相对 JIT/CUDA Graph 方案 |
| e2e serving 延迟 | SOTA | 动态 shape、低 batch |
| 论文长度 | 16 页 / 18 图 | MLSys 2026 |

## 核心机制

1. **Event Tensor 抽象**: 将算子分解为 tile 级任务，任务间的依赖关系编码为 event。支持两种 dynamism：
   - **Shape dynamism**: 序列长度、batch size 变化
   - **Data-dependent dynamism**: MoE routing、条件执行

2. **Event Tensor Compiler (ETC)**: 基于 Apache TVM 的编译器 pipeline：
   - **Static Scheduler**: 对确定性的通信-计算模式（如 All-Gather + GEMM ring 算法）预计算调度表
   - **Dynamic Scheduler**: 在 GPU SM 上运行轻量调度器，根据运行时 event 状态动态分配任务

3. **Minimal Runtime**: 与传统 CUDA Graph 的"host capture + replay"不同，Event Tensor 将调度逻辑下沉到 GPU 端，减少 host 参与。

4. **Computation-Communication 重叠**: 通过 tile-level 依赖精确编排，实现 GEMM 与 Reduce-Scatter / All-Gather 的细粒度重叠。

## 与本项目的关系

- **支撑主线一"图化编译与运行时图化"的激进路线**: 本项目在 `03-图化编译与运行时图化` 和 `04-图化编译在服务化推理中的利弊` 中讨论了 piecewise → full → persistent kernel 的技术谱系。Event Tensor 正是 persistent kernel / megakernel 方向的代表性工作，它将动态性压入 runtime materialization 层。
- **对 Agent 推理的特殊意义**: Agent workload 的 dynamic shape（每轮工具返回后序列长度增长）和数据依赖（工具选择决定后续执行路径）恰好是 Event Tensor 的设计目标。传统 CUDA Graph 在 agent 场景下频繁 recapture；Event Tensor 的 AOT 编译 + 动态调度可消除这一痛点。
- **与 CPU 角色的关系**: Event Tensor 减少了 host-side kernel launch 和同步，但增加了编译器复杂度和调度逻辑。它说明"减少 CPU 参与"可以通过编译器下沉实现，而非仅通过手动优化。机头 CPU 的负担从"每步发射"转移到"一次性编译"。
- **与 vLLM/SGLang 的关系**: 论文明确将 ETC 与 vLLM、SGLang（已使用 CUDA Graphs、PDL、torch.compile）对比，仍能取得 moderate speedup。这验证了即使在前沿 serving 系统中，launch tax 仍是未被完全榨干的优化空间。

## 提取图表

图表已提取至 `assets/extracted-figures/event-tensor/`，共 18 张：

- `2604.13327_fig1_scheduling_models.png` — 调度模型对比：传统 kernel launch vs CUDA Graphs vs megakernels
- `2604.13327_fig2_overview_dynamism.png` — Event Tensor 支持的两种 dynamism：shape + data-dependent
- `2604.13327_fig3_event_sample.png` — Event 示例：tile-level 依赖编码
- `2604.13327_fig4_runtime_materialize.png` — Runtime materialization：将动态图实例化为执行结构
- `2604.13327_fig5_static_schedule_runtime_impl.png` — 静态调度运行时实现
- `2604.13327_fig6_static_schedule_before_after.png` — 静态调度前后对比
- `2604.13327_fig7_dynamic_schedule_after.png` — 动态调度后效果
- `2604.13327_fig8_dynamic_schedule_runtime_impl.png` — 动态调度运行时实现
- `2604.13327_fig9_minimal_runtime.png` — 极简运行时架构
- `2604.13327_fig10_e2e_compilation_flow.png` — 端到端编译流程
- `2604.13327_fig12_data_dependent_event.png` — 数据依赖 event 处理
- `2604.13327_eval_gemm_rs_result.png` — GEMM+Reduce-Scatter 性能结果
- `2604.13327_eval_ag_gemm_result.png` — All-Gather+GEMM 性能结果
- `2604.13327_eval_moe_layer_result.png` — MoE layer 性能结果
- `2604.13327_eval_e2e_serving.png` — 端到端 serving 延迟
- `2604.13327_eval_raw_kernel_qwen*.png` — Qwen 模型 raw kernel 评估

## 引用

```bibtex
@article{jin2026eventtensor,
  title={Event Tensor: A Unified Abstraction for Compiling Dynamic Megakernel},
  author={Jin, Hongyi and Hou, Bohan and Wang, Guanjie and Lai, Ruihang and Chen, Jinqi and Ye, Zihao and Cai, Yaxing and Dong, Yixin and Cheng, Xinhao and Zhang, Zhihao and Zhao, Yilong and Huang, Yingyi and Yang, Lijie and Jiang, Jinchen and Oliaro, Gabriele and Ji, Jianan and Miao, Xupeng and Grover, Vinod and Mowry, Todd C. and Jia, Zhihao and Chen, Tianqi},
  journal={arXiv preprint arXiv:2604.13327},
  year={2026}
}
```
