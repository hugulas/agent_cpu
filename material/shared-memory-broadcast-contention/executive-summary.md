# 共享内存广播竞争洞察：执行摘要

## 一句话结论

在多 GPU LLM serving 中，基于共享内存的 1-writer-N-reader 广播队列已成为**结构性瓶颈**——其 dequeue 延迟在 CPU 竞争下可放大 19 倍，达到 GPU 单步计算时间的 5 倍，且无法通过单纯增加 CPU 核心完全消除。

## 核心数字

| 指标 | 数值 |
|------|------|
| 共享内存广播 dequeue 延迟（无竞争 → 竞争） | 12 ms → **228 ms** |
| 放大倍数 | **19×** |
| GPU decode 单步计算时间（同场景） | 44 ms |
| CPU 控制面延迟 / GPU 计算时间 | **~5×** |
| CPU 稀缺→充足时的 TTFT 改善 | **1.36–5.40×** |
| 建议 CPU:GPU 配比 | **4–8 cores / GPU** |
| 增加 16 cores 的边际成本（8×H100 实例） | **$0.80/hr（1.5%）** |

## 竞争机制

vLLM V1 的 `shm_broadcast.py` 使用 `/dev/shm` 上的**无锁环形缓冲区**，遵循 1-writer-N-reader 模式（N = tensor parallelism 度）。Writer（EngineCore）每步 decode 都需轮询所有 N 个 reader flag 确认消费完成；reader 延迟时 writer 自旋等待。该竞争与 TP 度成比例，且在 continuous batching 下每步都触发，成本被自回归迭代累积放大。

## 为什么不是"加 CPU 就行"

即使 CPU 核心充足，writer 仍需等待**最慢的 reader**——这是 1-writer-N-reader 模式的结构性特征。在多租户环境中，tokenization 等负载与 IPC 轮询竞争同一组核心，使问题进一步恶化。

## 跨引擎情况

- **vLLM**：问题直接存在，GitHub 有多起生产故障报告
- **SGLang**：CPU overhead 更低，通过 overlap scheduler 隐藏部分延迟，但 TP 场景细节未充分公开
- **TensorRT-LLM / TGI**：C++/Rust runtime 调度开销更低，但牺牲灵活性

## 缓解路径（按优先级）

1. **立即**：提升 CPU:GPU 配比至 4-8 cores/GPU（成本可忽略，收益显著）
2. **短期**：启用 CUDA Graphs（减少 ~28% per-iteration 开销）+ Persistent Batch（减少数据传输）
3. **中期**：异步调度管道（IPC 与 GPU 执行 overlap）+ 改进 IPC 通知机制（eventfd/futex 替代自旋）
4. **长期**：persistent GPU kernels + device-side queue（彻底消除 per-step CPU 参与）

## 对 Agentic AI 的特别含义

Agentic workload 会加剧该问题：
- 工具调用和阶段切换增加调度频率
- 多模态输入抬高 CPU 前处理负载
- 更快 GPU（H100→Blackwell）使固定 CPU 开销占比更大

> 共享内存广播竞争不是局部实现缺陷，而是多进程 serving 架构的**结构性控制面瓶颈**。在 agentic 推理时代，优化 CPU 控制平面与优化 GPU kernel 同等重要。
