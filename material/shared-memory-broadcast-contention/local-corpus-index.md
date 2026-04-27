# 本地语料库索引：共享内存广播竞争

> 研究课题：共享内存广播竞争（Shared-Memory Broadcast Contention）
> 创建时间：2026-04-26

## 直接相关材料

| 文件路径 | 类型 | 相关性 | 说明 |
|---------|------|--------|------|
| `cited-materials/s005-cpu-induced-slowdowns-2026-03.pdf` | 论文 | 一级证据 | S005《Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference》，Figure 13 直接展示了 shm_broadcast.py 的 dequeue 放大（12ms → 228ms） |
| `review-agentic-ai-cpu-2026-04-26/review-expansion-workspace/subchapters/01-主线一-微观问题-kernel-launch-tax.md` | 章节稿 | 直接分析 | 对 S005 Fig.13 的详细解读，包含 1-writer-N-reader 机制分析、级联阻塞因果链 |
| `review-agentic-ai-cpu-2026-04-26/review-expansion-workspace/subchapters/02-主线一-宏观问题-状态驱动调度链.md` | 章节稿 | 直接分析 | 把 broadcast 放到 queue→selection→broadcast→sync 的完整调度链中分析 |
| `agentic-ai-head-cpu-insight-unified.md` | 综述报告 | 间接引用 | 执行摘要和正文中引用了 shm_broadcast.py 的 19x dequeue 放大 |

## 间接相关材料

| 文件路径 | 类型 | 相关性 | 说明 |
|---------|------|--------|------|
| `cited-materials/web-archives/S039/docs.vllm.ai/en/latest/design/cuda_graphs.html` | 设计文档 | 解决方案侧 | vLLM CUDA Graphs 设计文档，涉及 piecewise graph 对 host launch 的缓解 |
| `cited-materials/s021-prefill-decode-disaggregation.pdf` | 技术文档 | 上下文 | PD 分离架构下跨 worker handoff 和 broadcast 问题 |
| `cited-materials/nvidia-agentic-inference-dynamo-2026-04-17.pdf` | 厂商博客 | 上下文 | Dynamo 中 agentic inference 的 KV read/write ratio |

## 待交叉验证问题

1. S005 的 Figure 13 是否已被其他独立研究复现或引用？
2. vLLM 的 `shm_broadcast.py` 在 V1 重构后是否已替换或改进？
3. 除 vLLM 外，SGLang、TensorRT-LLM、TGI 等引擎是否使用类似的共享内存广播机制？
4. 1-writer-N-reader 的共享内存竞争是否有已知的替代架构？
5. CPU oversubscription 与 GPU synchronization 之间的放大效应是否有更通用的系统研究？
