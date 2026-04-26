# Gap Audit

| gap_id | gap type | description | consequence | fix |
| --- | --- | --- | --- | --- |
| G01 | local absorption | `Splitwise / 90 Gbps / 1.13 GB KV` 仍只在本地成熟稿中，未进入阶段报告 | PD 分离传输栈论证不够硬 | 下一轮补入正文与数字账本 |
| G02 | production metric gap | sparse KV policy 的 hit quality、event overhead 仍缺公开线上指标 | 稀疏 KV 访问的“代价”部分仍偏推断 | 继续搜 TensorRT-LLM / vLLM / Ray 实测 |
| G03 | production metric gap | MoE 动态路由平衡的 tail latency 与 skew 数据不足 | “动态平衡重要”已成立，但量化不足 | 继续搜 FineMoE / Wide EP / serving case studies |
| G04 | serving tradeoff gap | 图化编译的 capture memory、warmup 与 fallback 频率缺更多跨框架数字 | 图化编译利弊已能说清，但不够量化 | 继续搜 vLLM / SGLang / TensorRT-LLM 的服务化实测 |
| G05 | scope drift risk | 平台与产品资料容易滑回 sandbox/tool runtime 叙事 | 可能污染“只看 inference-serving CPU”的边界 | 继续使用 `scope-boundary-check.md` 约束 |
| G06 | prefix-reuse metric gap | prefix cache 之后的 affinity routing、retention policy、event-driven reuse 虽已有阈值、TTFT 和事件流证据，但仍缺公开的命中/误判/metadata 开销全景数据 | 已能讲清演化链，但代价函数仍不够完整 | 继续搜 TensorRT-LLM / vLLM / Ray / Dynamo 的实测、issue 和 design discussion |
| G07 | multimodal identity gap | 多模态 prefix cache 的 identity 设计和错误复用代价仍缺系统论文级归纳 | agentic GUI/mobile 场景下结论仍偏工程经验 | 继续搜 multimodal cache key / visual prefix reuse / concurrency bugs |
