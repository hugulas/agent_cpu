# S055: PLaMo 2.0 — Piecewise Compilation in vLLM Environment

## 基本信息

| 字段 | 内容 |
|------|------|
| **标题** | PLaMo 2 Technical Report |
| **作者** | Preferred Networks, Inc. (日本) |
| **arXiv** | 2509.04897 |
| **日期** | 2025-09-05 |
| **类型** | 技术报告 / 模型+系统 |
| **状态** | kept |

## 核心主张

PLaMo 2.0-31B 是一个日英双语 LLM。本报告的重点不是模型架构创新，而是其在 **vLLM 环境中的工程优化实践**，尤其是：
1. **Piecewise `torch.compile`**: 由于 Mamba block 与 `torch.compile` 不兼容，仅对 attention 层启用编译，实现计算密集路径的 kernel fusion。
2. **Chunked Prefill**: 将 prefill 分块与 decode 交错，平衡计算密集和带宽密集阶段的硬件利用率。
3. **量化与 Kernel 选择**: 比较 FlashInfer（prefill 更优）与 FlashAttention-2（decode 更优），以及 Marlin 4-bit kernel 的端到端收益。

## 关键证据与数据

| 指标 | 数值 | 上下文 |
|------|------|--------|
| `torch.compile` 目标层 | Attention only | Mamba block 不兼容，采用 piecewise |
| combo_kernels | Q/K normalization 水平融合 | 减少 kernel count，提升 GPU occupancy |
| chunked prefill | 显式分离 Mamba 的 prefill/decode 路径 | 解决 chunked prefill 与 Mamba 层的性能冲突 |
| KV cache 量化 | 将重算阈值从 128 并发提升到 256 | 4-bit KV 量化减少内存压力 |
| FlashInfer vs FA2 | FI 更适合 prefill，FA2 更适合 decode | 差异化 attention backend 选择 |

## 核心机制

1. **Piecewise torch.compile**:
   - 仅编译 attention 组件（TorchInductor backend）
   - 在 attention block 内启用 `combo_kernels`，将独立的 Q/K normalization 等操作水平融合为单 kernel
   - Mamba block 保留 eager mode，作为 graph 外部路径

2. **Mamba-Aware Chunked Prefill**:
   - 原始 chunked prefill 将 prefill 和 decode 序列混合在同一个 batch 中，对 Mamba 层产生负面性能影响
   - 修改 Mamba 层实现，显式分离 prefill 和 decode 序列的处理路径
   - 恢复 chunked prefill 在 Ampere/Ada/Hopper 三代 GPU 上的性能收益

3. **Runtime Kernel 选择**:
   - Prefill ≤4096 tokens: FlashInfer 优于 BF16 PyTorch GEMM
   - Decode ≤512 tokens: Marlin 4-bit 保持优势
   - KV cache 量化在高并发（>128）下显著减少 eviction 和重算

## 与本项目的关系

- **直接支撑"工业界采用保守版图化"的判断**: 本项目在 `04-图化编译在服务化推理中的利弊` 中指出，工业界优先采用 piecewise graph 而非 full graph，原因是兼容性和 fallback 弹性。PLaMo 2.0 的实践是这一判断的直接证据：因为 Mamba block 不兼容，系统主动选择只编译 attention，而非强行全图。
- **说明 backend 兼容性决定 capture 边界**: 不同 attention backend（FlashInfer vs FlashAttention-2）、不同架构组件（Mamba vs Transformer）对图编译的支持程度不同，这直接决定了 piecewise 的边界在哪里。这是"图化不是单一编译问题，而是 runtime 组织问题"的又一证据。
- **Chunked Prefill 与 PD 分离的关联**: PLaMo 2.0 的 chunked prefill 实践说明，即使在同构 GPU 上，prefill 和 decode 的交错执行也需要显式的路径分离（Mamba 层的修改）。这与 PD 分离在架构层面的逻辑一致：计算特征不同的阶段需要不同的处理路径。
- **对 Agent 推理的间接意义**: Agent 系统中常常混合不同架构（如多模态 encoder、MoE、Mamba 等），piecewise compilation 是唯一的现实选择。PLaMo 2.0 的"attention 编译 + Mamba eager"模式可被直接借鉴。

## 提取图表

图表已提取至 `assets/extracted-figures/plamo2/`，共 10 张：

- `2509.04897_plamo2_arch.png` — PLaMo 2 模型架构图
- `2509.04897_pruning.png` — 模型剪枝策略
- `2509.04897_pruning_loss_curve.png` — 剪枝损失曲线
- `2509.04897_plamo-2-1B-passkey.png` / `2509.04897_plamo-2-1B-phonebook.png` — 1B 模型长上下文评估（passkey retrieval / phonebook lookup）
- `2509.04897_plamo-2-30B-CPT-phonebook.png` — 30B 模型 phonebook 评估
- `2509.04897_elyza-8b.png` / `2509.04897_elyza-31b.png` — Elyza 基准评估
- `2509.04897_falcon3-passkey.png` / `2509.04897_falcon3-phonebook.png` — Falcon3 对比评估

## 引用

```bibtex
@techreport{plamo22025technical,
  title={PLaMo 2 Technical Report},
  author={{Preferred Networks, Inc.}},
  institution={Preferred Networks},
  year={2025},
  url={https://arxiv.org/abs/2509.04897}
}
```
