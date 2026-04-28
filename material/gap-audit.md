# Gap Audit

| gap_id | gap type | description | consequence | fix |
| --- | --- | --- | --- | --- |
| G01 | local absorption | `Splitwise / 90 Gbps / 1.13 GB KV` 仍只在本地成熟稿中，未进入阶段报告 | PD 分离传输栈论证不够硬 | 下一轮补入正文与数字账本 |
| G02 | production metric gap | sparse KV policy 的 hit quality、event overhead 仍缺公开线上指标 | 稀疏 KV 访问的“代价”部分仍偏推断 | 继续搜 TensorRT-LLM / vLLM / Ray 实测 |
| G03 | production metric gap | MoE 动态路由平衡的 tail latency 与 skew 数据不足 | “动态平衡重要”已成立，但量化不足 | **部分已填补：S048 (PROBE) 提供了 1.32× prefill speedup、1.26× decode throughput vs DeepSeek-EPLB 及 straggler 分解数据**；仍需更宽模型规模和线上生产环境的验证 |
| G04 | serving tradeoff gap | ~~图化编译的 capture memory、warmup 与 fallback 频率缺更多跨框架数字~~ | ~~图化编译利弊已能说清，但不够量化~~ | ~~已大幅填补：S064 Foundry 给出 cold-start 99% 降低、10min→3.9s、re-recording limit 128；S065 给出 CUDA graph OOM 生产案例；但仍缺 SGLang/TensorRT-LLM 的跨框架实测~~ |
| G05 | scope drift risk | 平台与产品资料容易滑回 sandbox/tool runtime 叙事 | 可能污染“只看 inference-serving CPU”的边界 | 继续使用 `scope-boundary-check.md` 约束 |
| G06 | prefix-reuse metric gap | ~~prefix cache 之后的 affinity routing、retention policy、event-driven reuse 仍缺公开的命中/误判/metadata 开销全景数据~~ | ~~已能讲清演化链，但代价函数仍不够完整~~ | ~~已大幅填补：S068 给出 0% hit rate 时 <1% throughput degradation；S069 暴露 benchmark 99.8% vs production 91% 的 hit rate 差距；S070 给出 KV block lifetime/reuse gap 度量；S071 给出 metadata 1:1,000,000 开销比；但仍缺 TensorRT-LLM 的对应数字~~ |
| G07 | multimodal identity gap | ~~多模态 prefix cache 的 identity 设计和错误复用代价仍缺系统论文级归纳~~ | ~~agentic GUI/mobile 场景下结论仍偏工程经验~~ | ~~已部分填补：S073 给出 vLLM V1 的 image hash 机制；S047 已记录 multimodal cache bug（40% 命中率导致错误输出）；但仍缺更系统的 multimodal cache identity 设计原则论文~~ |
