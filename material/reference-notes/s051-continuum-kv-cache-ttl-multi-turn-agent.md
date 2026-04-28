# S051: Continuum — KV Cache TTL for Multi-Turn Agent Scheduling

## 基本信息

| 字段 | 内容 |
|------|------|
| **标题** | Continuum: Efficient and Robust Multi-Turn LLM Agent Scheduling with KV Cache Time-to-Live |
| **作者** | Hanchen Li, Qiuyang Mang, Runyuan He, Qizheng Zhang, Huanzhi Mao, Xiaokun Chen, Hangrui Zhou, Alvin Cheung, Joseph Gonzalez, Ion Stoica (UC Berkeley, Stanford, Tensormesh, Tsinghua) |
| **arXiv** | 2511.02230 |
| **日期** | 2025-11-04 (v1), 2026-01-30 (v3) |
| **类型** | 系统论文 / agent serving |
| **状态** | kept |

## 核心主张

现有推理引擎的"回合结束即驱逐"（end-of-turn eviction）策略在 agentic workload 下失效。agent 工作负载在 LLM 调用之间穿插工具执行，产生暂停；这些暂停会导致 KV cache 被驱逐，后续轮次必须重新 prefill 或从 CPU DRAM 加载。Continuum 引入 **KV Cache Time-to-Live (TTL)** 机制：在检测到工具调用时，根据历史统计预测工具执行时长，为 KV cache 设置一个存活时间窗口，在此期间内保留于 GPU；若工具在 TTL 内返回，则直接 resume，避免重新计算和排队延迟。

## 关键证据与数据

| 指标 | 数值 | 上下文 |
|------|------|--------|
| 延迟降低 | `1.12x` ~ `3.66x` | 多轮 agentic workload (BFCL + SWE-Bench) |
| 吞吐提升 | `1.10x` ~ `3.22x` | 同上，Llama-3.1 8B/70B |
| SWE-agent 延迟降低 | 最高 `8.18x` | 内部生产测试床 |
| 工具调用延迟占比 | 显著 | 每轮工具调用引入排队延迟，随轮数累积 |
| 实现代码量 | ~1,000 行 Python | 基于 vLLM 的模块化设计 |

## 核心机制

1. **Tool-Call Handler**: 在 scheduler loop 中拦截请求完成事件，解析工具调用，跟踪每类工具的历史延迟分布。
2. **TTL 计算**: 综合 reload cost（重新 prefill 或从 CPU 加载的成本）和 ordering benefit（保留请求顺序减少调度气泡），为每轮工具调用计算最优 TTL。
3. **Pin/Unpin 原语**: scheduler 支持 `pin.request()` 和 `unpin.request()`；TTL 到期后自动 eviction，防止内存压力或死锁。
4. **Program-level FCFS**: 在调度队列中优先处理同一 agent program 的后续请求，减少跨 program 的 head-of-line blocking。
5. **死锁预防**: 当 GPU 内存耗尽且所有请求均为 pinned 时，迭代式选择最晚到达的 pinned request 作为 victim 驱逐。

## 与本项目的关系

- **直接支撑 Agentic Inference 中 KV 生命周期管理**: 本项目主线二（KV lifecycle）和主线四（PD 分离）均涉及 KV cache 跨轮复用问题。Continuum 是第一个系统性地将"工具调用间隙中的 KV 保留"建模为调度问题的论文。
- **说明 CPU 调度复杂度被 agent 放大**: 传统 serving 的调度器只需管理单轮请求的 batching 和 eviction；agent workload 下，调度器必须理解 tool-call 语义、预测工具延迟、维护 program-level 状态，这直接抬高了控制面（机头 CPU）的决策复杂度。
- **与 PD 分离的互补性**: Continuum 假设 prefill 和 decode 在同构 GPU 上共置；若扩展到 PD 分离架构，TTL pinning 需要跨 P/D 实例协调，KV cache 传输成本将取代本地保留成本，这是未来可延伸的方向。

## 提取图表

图表已提取至 `assets/extracted-figures/continuum/`，共 29 张：

- `2511.02230_intro.png` — 核心问题示意图：工具调用间隙导致的排队延迟和 KV 驱逐
- `2511.02230_system_overview.png` — Continuum 系统架构：Tool-Call Handler + Scheduler Pin/Unpin
- `2511.02230_ttl_challenges.png` — TTL 机制的核心挑战（预测误差、内存压力、排队延迟）
- `2511.02230_trace_swe.png` — SWE-Agent 真实 trace：多轮工具调用与 LLM 推理交替
- `2511.02230_waiting_time_analysis_comparison.png` — 等待时间分析对比（vLLM vs InferCept vs Continuum）
- `2511.02230_comparison_avg_duration.png` — 平均任务完成时间对比
- `2511.02230_batch_chunk_combined.png` — batch 与 chunk 组合策略
- `2511.02230_pin_comparison_*.png` — pin 策略在不同 workload 下的对比
- `2511.02230_robust_study_swebench.png` — SWE-Bench 鲁棒性研究
- `2511.02230_func_exec_cdf_*.png` — 工具执行时间的 CDF 分布
- `2511.02230_lower_half_tokens_vs_steps.png` — token 数与步数关系
- `2511.02230_disk_comparison_*.png` — CPU offloading 场景下的对比

## 引用

```bibtex
@article{li2025continuum,
  title={Continuum: Efficient and Robust Multi-Turn LLM Agent Scheduling with KV Cache Time-to-Live},
  author={Li, Hanchen and Mang, Qiuyang and He, Runyuan and Zhang, Qizheng and Mao, Huanzhi and Chen, Xiaokun and Zhou, Hangrui and Cheung, Alvin and Gonzalez, Joseph and Stoica, Ion},
  journal={arXiv preprint arXiv:2511.02230},
  year={2025}
}
```
