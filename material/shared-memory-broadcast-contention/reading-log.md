# 阅读日志：共享内存广播竞争

> 创建时间：2026-04-26

## 已保留来源 (kept)

| source_id | direction_id | 标题 | 日期 | 类型 | 处理结论 | 保留理由 | 关键数据 |
|-----------|-------------|------|------|------|---------|---------|---------|
| S001 | D02 | Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference | 2026-03-25 | 学术论文 (arXiv) | kept | 核心一级证据，直接量化共享内存广播竞争 | dequeue 12ms→228ms (19x)；decode 44ms；TTFT 改善 1.36-5.40x；tokenization 占 TTFT 50% |
| S002 | D01 | vLLM shm_broadcast 源码与文档 | current | 源码/API 文档 | kept | 直接理解 1-writer-N-reader 共享内存环形缓冲区实现 | ShmRingBuffer；metadata 布局 written_flag + reader_flags；sched_yield；busy-wait loop |
| S003 | D01 | vLLM GitHub Issues: race condition / timeout in shm_broadcast.py | 2025-10 to 2025-12 | Issue 追踪 | kept | 工程侧验证该问题是真实生产故障 | Issue #29389 race condition；Issues #26420, #30682 timeout 60s |
| S004 | D08 | vLLM V1 Alpha: A major upgrade | 2025-01-28 | 官方技术博客 | kept | 理解 V1 如何通过 Persistent Batch 和架构重构缓解 CPU overhead | 1.7x 吞吐提升；near-zero CPU overhead 目标；EngineCore 分离 |
| S005 | D03 | SGLang: The Complete Guide + GitHub | 2026-01 | 文档/源码 | kept | 对比引擎，SGLang CPU overhead 更低，zero-overhead scheduler | overlapped scheduling；CPU 准备下一 batch 与 GPU 当前 batch 并行 |
| S006 | D03 | gLLM 论文 (ACM SC 2025) | 2025-11-15 | 学术论文 | kept | 独立第三方验证 SGLang CPU overhead 低于 vLLM | "SGLang has lower CPU overhead than vLLM"；vLLM pipeline parallelism CPU overhead 占 17% |
| S007 | D04 | GPUOS: A GPU Operating System Primitive | 2026-04-20 | 学术论文 (arXiv) | kept | 代表激进缓解方向：persistent kernel + device-side queue | 15.3x 小操作加速；8.7x attention decode；消除 per-operation launch overhead |
| S008 | D10 | CPUs Are Quietly Throttling Your LLM Performance | 2026-04-02 | 技术博客 | kept | 高质量的二手综述，提炼了成本效益分析 | 4-8 CPU cores per GPU 建议；增加 16 cores 仅 $0.80/hr (1.5% 成本)；Slurm 默认 --cpus-per-task=1 是陷阱 |
| S009 | D05 | HeteroServe 论文 | 2026-03-13 | 学术论文 | kept | CUDA Graphs 减少 ~28% per-iteration 开销的量化证据 | Multi-size CUDA Graph capture 减少 ~28% kernel launch + sync overhead |

## 已拒绝来源 (rejected)

| source_id | direction_id | 标题 | 日期 | 类型 | 处理结论 | 拒绝理由 |
|-----------|-------------|------|------|------|---------|---------|
| R001 | D03 | 多款 LLM Serving 框架对比评测 | 2025-07 | 评测博客 | rejected | 纯吞吐数据，无 CPU/broadcast 竞争机制分析 |
| R002 | D04 | CSDN eventfd/futex 面经 | 2024-08 | 博客 | rejected | 通用系统编程知识，无 GPU serving 上下文 |

## 待确认来源 (maybe)

| source_id | direction_id | 标题 | 日期 | 类型 | 处理结论 | 备注 |
|-----------|-------------|------|------|------|---------|------|
| M001 | D07 | NCCL shared memory intra-node coordination 细节 | - | 文档 | maybe | S005 提到 NCCL 也分配共享内存，但未展开分析其竞争模式 |
