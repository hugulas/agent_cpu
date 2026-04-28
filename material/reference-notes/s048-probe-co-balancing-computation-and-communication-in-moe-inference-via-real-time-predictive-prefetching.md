# S048: PROBE — Co-Balancing Computation and Communication in MoE Inference via Real-Time Predictive Prefetching

## 基本信息

- **来源**: arXiv:2602.00509 / 2602.11686
- **标题**: PROBE: Co-Balancing Computation and Communication in MoE Inference via Real-Time Predictive Prefetching
- **发布时间**: 2026-02
- **核心关键词**: MoE inference, expert load balancing, predictive prefetching, straggler mitigation, prefill regime, DeepSeek-EPLB

## 核心判断

1. **Expert skew 造成的 straggler 是 MoE serving 的主要瓶颈**，不是单次 cold miss，而是负载不均导致的 All-to-All 长尾延迟。
2. **DeepSeek-EPLB 的统计静态放置策略在 prefill 阶段失效**：因为 prefill 的语义分布漂移快（500-step window 内显著退化），且静态 replica 在内存压力下触发 OOM。
3. **PROBE 通过实时预测 + 双轨流水线（dual-track pipeline）实现隐藏式调度**：在 prefill 阶段实现 `1.32×` speedup over SGLang；在 decoding 阶段实现 `1.26×` throughput improvement over DeepSeek-EPLB。
4. **负载均衡必须同时考虑计算和通信**：单独优化任一维度都会把瓶颈推向另一端；PROBE 的 co-balancing 通过求解器同时调整 placement 和 routing assignment。

## 关键数字与图表

| 指标 | 数值 | 对比基准 | 场景 |
|------|------|----------|------|
| Prefill latency speedup | `1.32×` | SGLang (static EP) | GPT-OSS-120B, ep=8 |
| Decoding throughput improvement | `1.26×` | DeepSeek-EPLB | GPT-OSS-120B, ep=8 |
| Expert slot memory overhead | 6 slots / device | — | double buffering for replica region |
| Solver iteration cap | 16 iterations | — | single-SM CUDA kernel |
| Model scale | Qwen3-MoE-235B (128 experts, Top-8, 93 layers) | — | BF16 |
| Model scale | GPT-OSS-120B (128 experts, Top-4, 36 layers) | — | BF16 |

### 关键图表位置

- **Figure 2** (page-03): Expert activation patterns — prefill vs decoding 阶段 expert skew 动态变化
- **Figure 3** (page-04): MoE compute latency — EP vs DP vs EP+extra experts 的 latency 对比
- **Figure 5** (page-04): Skew hurts All-to-All efficiency — straggler 长尾延迟分解
- **Figure 7** (page2-09): Prefill latency scaling — 不同 input token 规模下的 TTFT 对比
- **Figure 8** (page2-09): Throughput-latency Pareto frontier — PROBE vs DeepSeek-EPLB vs SGLang
- **Figure 9** (page2-09): Throughput under abrupt semantic shifts — 从 Code 切换到 Chinese 时的鲁棒性

## 与 DeepSeek-EPLB 的关键对比

| 维度 | DeepSeek-EPLB | PROBE |
|------|---------------|-------|
| 策略类型 | 统计静态放置 (historical statistics) | 实时预测 + 连续 lookahead |
| Prefill 兼容性 | 不兼容（OOM + 重传代价高） | 完全兼容（隐藏调度） |
| 语义漂移适应性 | 差（500-step window 内退化） | 好（实时 predictor） |
| 内存开销 | 每层每 rank 固定 replica slots | 动态 cyclic reuse（6 slots/device） |
| 调度侵入性 | 显式重平衡，需暂停 pipeline | 隐藏式，通过 dual-track overlap |

## CPU / Control Plane 相关性

- **Predictor**: 轻量级 MLP-based，运行在 CPU / host 侧，预测下一层 expert activation 分布。
- **Solver**: 单 SM CUDA kernel，但由 host 触发，执行 iterative water-filling rebalancing。
- **Placement update**: host 维护 Δ^in/out 集合，决定哪些 expert 需要迁移。
- **Communication scheduling**: 带宽密集型 expert transfer 被隐藏在 compute-heavy windows 中，由 host-side orchestration 管理 split-phase transmission。

## 引用建议

- **Ch11 (MoE 路由动态平衡问题)**: 用 PROBE 作为 "predictive routing for optimized balancing" 的最新证据，补充 DeepSeek-EPLB 的 prefill 局限性，强调实时调度 vs 静态放置的对比。
- **Ch12 (专家驻留、预取与动态平衡)**: 用 PROBE 的 dual-track prefetch 和 hidden scheduling 作为第四种路线（与 FluxMoE / FineMoE / SpecMoEOff 并列），特别说明 prefill 阶段的可行性。
- **Evidence Matrix**: 填补 G03 (MoE dynamic routing tail latency 数据不足) 的 gap。

## 文件位置

- 原始 PDF: `cited-materials/s048-probe-predictive-routing-for-optimized-balancing-in-experts.pdf`
- 渲染页面: `assets/extracted-figures-all/s048/page-01.png` .. `page-12.png`
