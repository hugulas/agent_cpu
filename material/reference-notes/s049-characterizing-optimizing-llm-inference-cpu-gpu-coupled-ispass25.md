# S049: Characterizing and Optimizing LLM Inference Workloads on CPU-GPU Coupled Architectures

**Authors:** Prabhu Vellaisamy et al. (CMU, Samsung, HPE)
**Venue:** ISPASS 2025 (IEEE International Symposium on Performance Analysis of Systems and Software)
**Link:** arXiv:2504.11750v1 [cs.DC]
**Date:** 2025-04-16
**Relevance to Chapter:** 01-主线一-微观问题-kernel-launch-tax (直接支撑)

---

## 核心发现

### 1. CPU-bound region 的跨架构量化

Vellaisamy 等人在三种 CPU-GPU 耦合架构上系统测量了 LLM 推理的 operator-to-kernel 行为：

| 架构 | 耦合类型 | CPU-bound → GPU-bound 转换 batch size (encoder) |
|------|----------|------------------------------------------------|
| AMD EPYC 7313 + A100-SXM4 | Loosely-Coupled (PCIe) | ~8 |
| 2P Intel Xeon Platinum 8468V + H100 PCIe | Loosely-Coupled (PCIe) | ~8 |
| GH200 (Grace Hopper) | Closely-Coupled (NVLink-C2C) | ~32 |

**关键数字：GH200 的 CPU-bound region 比 LC 系统大 4×。**

### 2. TKLQT 指标：量化 kernel launch tax

提出 **Total Kernel Launch and Queuing Time (TKLQT)** 作为区分 CPU-bound vs GPU-bound 的细粒度指标：

- **CPU-bound region**：TKLQT 在小 batch 下保持恒定（几乎无 kernel queuing，GPU under-utilized），此时 TKLQT ≈ pure kernel launch overhead
- **GPU-bound region**：TKLQT 随 batch size 增加而上升（kernel queuing 成为主导）
- TKLQT 比 prior work（framework-bound vs compute-bound 分类）更精确，因为它直接测量 CPU-GPU interaction 和 GPU saturation

nullKernel launch overhead 测量：
- AMD+A100: 2260.5 ns
- Intel+H100: 2374.6 ns
- GH200: 更低（具体数字需查图）

### 3. 反直觉发现：NVLink-C2C 并不总是赢

- GH200 在大 batch 下显著优于 LC 系统（Llama-3.2-1B prefill latency: **1.9×–2.7× faster**）
- 但在 **low batch / latency-sensitive 场景下**，GH200 的 Grace CPU（Arm Neoverse）single-thread 性能反而不如 x86 LC 系统中的 CPU
- **"CPU-bound LLM models do not see material benefits from the lower kernel launch latency of CC systems"**
- 这说明：即使硬件耦合更紧密，如果 workload 是 CPU-bound 的（GPU 空闲），低 launch latency 优势不会转化为实际性能提升

### 4. Kernel fusion 作为缓解手段

- Kernel fusion 减少 kernel launch count，从而降低 TKLQT
- Proximity score 方法自动识别可融合的 kernel 序列
- 在 CPU-bound region，fusion 可以显著降低 inference latency（具体 speedup 见图 8）

### 5. Agentic AI 的直接关联

论文明确讨论了 agentic AI systems 和 RAG 中的 latency-sensitive pipeline：
- "agentic AI systems [...] consist of an LLM that orchestrates the coordinated behavior of multiple autonomous agents"
- "the chaining of outputs and inputs across multiple models is expected to become more prevalent"
- "this increase in pipeline complexity will further drive the need for optimization techniques focused on minimizing latency, particularly between the CPU and GPU"

---

## 对 01 章节的支撑点

1. **跨架构独立验证**：S005 发现 multi-GPU CPU-induced slowdown；Vellaisamy 在 single-GPU 场景下独立验证了 CPU-bound region 的存在和 kernel launch overhead 的量化
2. **量化"小模型/低batch更容易暴露 launch tax"**：4× CPU-bound region 的扩大是强有力的数字
3. **命名了"tax"**：TKLQT 直接对应 01 章节讨论的 kernel launch tax
4. **反驳"硬件进步自动解决"论**：NVLink-C2C 在 CPU-bound 场景下不带来实质收益
5. **Agentic workload 相关性**：论文自身讨论了 agentic AI 的 latency 需求

## 对 02 章节的潜在价值

- 有限的直接帮助（Vellaisamy 是 single-GPU 研究，不涉及 multi-GPU sync chain）
- 但 "CPU-bound models do not benefit from CC advantages" 这一发现可以与 S005 的 multi-GPU slowdown 形成互补：即使单 GPU 场景下 CPU 瓶颈已存在，multi-GPU 同步链会进一步放大它

## 局限

- 单 GPU 场景，不涉及 multi-GPU 同步链放大
- 测试模型较小（BERT, XLM-R, GPT2, Llama-3.2-1B），不涉及大规模 distributed serving
- 主要是 prefill 阶段分析，decode 阶段讨论较少
