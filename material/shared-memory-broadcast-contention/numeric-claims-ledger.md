# 数字声明账本：共享内存广播竞争

> 创建时间：2026-04-26

| claim_id | 数值/范围 | 测量对象 | source_id | 直接证据/推断 | 是否已入报告 |
|---------|----------|---------|-----------|-------------|-------------|
| N001 | 12 ms → 228 ms | vLLM shm_broadcast dequeue 延迟（竞争 vs 无竞争） | S001 | 直接证据 | 是 |
| N002 | 19× | dequeue 延迟放大倍数 | S001 | 直接证据 | 是 |
| N003 | 44 ms | GPU decode 单步计算时间（同场景基准） | S001 | 直接证据 | 是 |
| N004 | 5× | dequeue 延迟 vs decode 步长倍数（228/44） | S001 | 推断 | 是 |
| N005 | 1.36–5.40× | TTFT 改善幅度（CPU 稀缺→充足） | S001 | 直接证据 | 是 |
| N006 | 50% | tokenization 占 TTFT 比例上限 | S001 | 直接证据 | 是 |
| N007 | 1 ms | NCCL 集合通信中单个 rank CPU 延迟放大为集群级停滞的阈值 | S001 | 直接证据 | 是 |
| N008 | 1.7× | vLLM V1 vs V0 吞吐提升 | S004 | 直接证据 | 是 |
| N009 | <1% | vLLM V1 prefix caching 零命中时吞吐损失 | S004 | 直接证据 | 是 |
| N010 | ~28% | CUDA Graph capture 减少的 per-iteration decode 开销 | S009 | 直接证据 | 是 |
| N011 | 15.3× | GPUOS 小操作加速比（vs PyTorch eager） | S007 | 直接证据 | 是 |
| N012 | 8.7× | GPUOS attention decode 加速比 | S007 | 直接证据 | 是 |
| N013 | 20–22% | GPUOS 能耗节省 | S007 | 直接证据 | 否 |
| N014 | 17% | vLLM pipeline parallelism 中 input preparation CPU overhead | S006 | 直接证据 | 是 |
| N015 | 4–8 cores/GPU | 建议的 CPU:GPU 配比 | S008 | 推断（基于 S001 数据） | 是 |
| N016 | $0.80/hr (1.5%) | 增加 16 CPU cores 的边际成本（8×H100 实例） | S008 | 直接证据 | 是 |
| N017 | 465万条 | S001 分析的生产集群作业记录数 | S001 | 直接证据 | 是 |
