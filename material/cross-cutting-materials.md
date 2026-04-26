# Cross-Cutting Materials

说明：

- 本表只挑那些同时覆盖两个或更多技术方向的材料。
- 目标不是“最重要的全部材料”，而是“最适合做综述骨架的跨方向材料”。
- `covered_directions` 使用当前研究账本中的方向编号。

| source_id / candidate | 标题 | 类型 | covered_directions | 为什么跨方向 | 备注 |
| --- | --- | --- | --- | --- | --- |
| S001 | Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter | paper abstract / discovery page | D03, D04, D12, D13 | 同时覆盖 PD 分离、KV 放置、cache-aware placement、reduced-KV 部署边界 | 当前最强的跨方向论文之一 |
| S003 | Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo | official technical blog | D03, D04, D06, D12 | 同时覆盖 agentic workload、KV read/write、routing、retention、placement、transfer control plane | 当前最强的跨方向工业材料之一 |
| S009 | Enhancing Distributed Inference Performance with the NVIDIA Inference Transfer Library | official technical blog | D03, D06, D16 | 同时覆盖 disaggregated serving、KV transfer、elastic expert parallelism | 把 KV 与 MoE 都接到 transfer plane |
| S034 | Introducing New KV Cache Reuse Optimizations in NVIDIA TensorRT-LLM | official technical blog | D12, D15 | 同时覆盖 selective retention、event API、KV reuse policy | prefix cache 后续演化的重要工业材料 |
| S038 | vLLM V1: A Major Upgrade with 1.7x Speedup | official technical blog | D02, D12, D17 | 同时覆盖 CPU overhead、prefix caching、piecewise CUDA Graphs | 很适合讲“调度墙”的软件栈解法 |
| S039 | vLLM CUDA Graphs Design Document | official design doc | D02, D17 | 同时覆盖 graphification 收益与动态 fallback 代价 | 偏实现层，适合写 tradeoff |
| S040 | Event Tensor: Dynamic Megakernels for LLM Serving | paper | D02, D17 | 同时覆盖运行时图化、persistent kernel、dispatch tax | 论文侧最强补充 |
| S035 | Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack-Scale Systems | official technical blog | D05, D06, D16 | 同时覆盖 MoE、拓扑放置、跨节点组织、host-side routing/placement | 工业界 MoE 跨方向材料 |
| S036 | FineMoE: Modeling Fine-Grained MoE Residuals for Expert Prefetching in Serving | paper / discovery page | D05, D16 | 同时覆盖 expert prefetch、fine-grained expert map、dynamic balance | 适合写 expert skew 与 state tracking |
| S037 | SpecMoEOff: Accelerating Mixture-of-Experts Inference via Speculative Expert Offloading | paper / discovery page | D05, D16, D17 | 同时覆盖 speculative decoding、expert offloading、latency hiding | 跨 MoE 与执行管线优化 |
| S006 | NOSA: Native and Offloadable Sparse Attention | paper summary / abstract mirror | D04, D15 | 同时覆盖 sparse attention 与 offload-friendly serving | sparse access 主线起点 |
| S007 | ScoutAttention: Efficient KV Cache Offloading via Layer-Ahead CPU Pre-computation | paper summary / abstract mirror | D04, D15 | 同时覆盖 sparse KV access、CPU 协同计算、offload | 很适合解释 CPU 角色前移 |
| S041 | Prefix-aware routing — Ray Serve LLM | official docs | D12, D10 | 同时覆盖 cache-affinity routing 与可调参数化的权衡 | 适合连接到 benchmark |
| S042 | Kv Events Subscriber — vLLM | official docs / example | D12, D15 | 同时覆盖 prefix/KV reuse 与 event-driven state visibility | 说明 cache state 已事件化 |
| S043 | 5x Faster Time to First Token with NVIDIA TensorRT-LLM KV Cache Early Reuse | official technical blog | D12, D15 | 同时覆盖 early reuse、block sizing、TTFT | 早于主时间边界，但适合作为前代演化起点 |

## Next-Up Candidates

这些材料跨方向价值高，但还没有正式纳入 `reading-log.md` 主证据链，后续值得补读：

| candidate | 预期覆盖方向 | 价值 |
| --- | --- | --- |
| Preble: Efficient Distributed Prompt Scheduling for LLM Serving | D03, D10, D12 | 可能把 prompt/prefix reuse、公平性和分布式调度放在同一篇里 |
| INFERCEPT: Efficient Intercept Support for Augmented LLM Inference | D01, D04, D10 | 可能补 `pause/resume / augmented inference / context preservation` 的前置脉络 |
| vLLM large-scale serving / Wide-EP blog | D03, D05, D12, D16 | 可能把 PD、prefix affinity、Wide-EP 放进同一工业实践材料 |
