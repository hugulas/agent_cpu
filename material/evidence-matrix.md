# Evidence Matrix

| conclusion_id | conclusion | mechanism evidence | workload evidence | platform evidence | skeptical evidence | benchmark implication | status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C01 | agentic workload 将 CPU 从本地 host 推向分布式控制平面 | S001, S003, S009, S015 | S027-S030 | S031-S033 | S023-S025 | dispatch latency, resume latency, cache-affinity quality | well_supported |
| C02 | sparse attention / sparse KV access 会把 CPU 推向更细粒度的状态 policy | S006, S007, S034 | 间接：S027-S030 | - | 仍薄弱 | tiering efficiency, warm-tier hit, policy miss cost | partially_supported |
| C03 | MoE host 侧压力的关键在动态平衡与 expert skew，而不只是冷权重搬运 | S008, S035, S036, S037, S048 | 间接：S028-S030 | S035 | 仍薄弱：S048 的 prefill 数据集中在特定模型规模，更宽范围验证仍缺 | expert miss tail (PROBE 1.32×/1.26×), topology-aware balance quality, real-time predictor fidelity | partially_supported |
| C04 | 图化编译能降低 dispatch tax，但会引入服务化代价 | S038, S039, S040 | 间接：agentic 高动态负载 | - | 仍薄弱 | graph fallback frequency, capture memory tax, warmup overhead | partially_supported |
| C05 | prefix cache 之后的关键技术演化是 affinity routing、selective retention、event-driven reuse 与 finer-grained early reuse | S010, S011, S016, S017, S034, S041, S042, S043 | 间接：S027-S030 | S003 | S044, S045, S046, S047 | cache-affinity quality, retention hit quality, resume latency, metadata overhead | partially_supported |
