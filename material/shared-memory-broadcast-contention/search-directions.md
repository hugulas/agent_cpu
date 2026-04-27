# 搜索方向：共享内存广播竞争

> 研究问题：在 LLM serving 运行时中，基于共享内存的 CPU 侧广播/通知机制为什么会成为多 GPU 系统的结构性瓶颈？其竞争机制、放大效应和缓解策略分别是什么？
> 时间边界：2024-01-01 及之后
> 语言：优先中文/英文
> 来源偏好：论文、官方文档、工程博客、源码分析
> 排除规则：纯营销材料、无机制/数据支撑的分析

| direction_id | label | why_it_matters | starter_queries | expected_source_types | status |
|-------------|-------|----------------|-----------------|----------------------|--------|
| D01 | vLLM shm_broadcast 实现与竞争机制 | 核心一级证据来源，需深入理解其 1-writer-N-reader 共享内存队列的设计、flag 轮询机制、与 TP 度的关系 | vLLM shm_broadcast implementation, vLLM shared memory queue IPC, vLLM worker communication mechanism | GitHub 源码、论文、设计文档 | planned |
| D02 | CPU-induced slowdown 系统性研究 | S005 的底层因果机制，包括 CPU oversubscription、OS 调度延迟、同步链放大 | CPU-induced slowdowns multi-GPU inference, CPU oversubscription GPU synchronization barrier | 学术论文 | planned |
| D03 | 其他 serving 引擎的 IPC/广播机制 | 验证 shm_broadcast 竞争是否是 vLLM 特有的问题，还是行业共性 | SGLang inter-process communication, TensorRT-LLM worker broadcast, TGI GPU worker coordination | 源码、文档 | planned |
| D04 | 共享内存 IPC 优化与替代方案 | 寻找已知的共享内存队列优化方法：eventfd、ring buffer、futex、io_uring | shared memory IPC optimization GPU serving, lock-free queue multi-reader, eventfd vs spinlock broadcast | 系统论文、工程博客 | planned |
| D05 | CUDA Graphs / Persistent Kernel 对 host broadcast 的缓解 | 从架构层面减少 CPU 参与频率的解决方案 | vLLM CUDA Graphs reduce CPU overhead, persistent kernel eliminate launch overhead, dynamic megakernel serving | 论文、官方文档 | planned |
| D06 | 多 GPU 同步链放大效应的通用研究 | 不仅限于 LLM serving，还包括 HPC、DL training 中 CPU 抖动被同步链放大的通用规律 | CPU jitter amplification GPU synchronization, barrier synchronization tail latency multi-GPU | 系统论文 | planned |
| D07 | Tensor Parallelism 下的 CPU 侧开销结构 | 理解 TP 度与 CPU 开销的比例关系，为何 TP 越高 broadcast 竞争越严重 | tensor parallelism CPU overhead scaling, TP degree vs host latency, NCCL broadcast CPU overhead | 论文、工程分析 | planned |
| D08 | vLLM V1 重构中的 CPU overhead 优化 | vLLM V1 明确把 CPU overhead reduction 作为重点，需了解其具体如何重构 broadcast/IPC 路径 | vLLM V1 CPU overhead reduction, vLLM V1 architecture changes, vLLM zero-copy broadcast | 官方博客、设计文档、源码 | planned |
| D09 | Agentic workload 对 broadcast 频率的影响 | 从负载特征角度理解为何 agentic 场景下广播竞争更严重 | agentic inference high-frequency dispatch, continuous batching CPU overhead, agentic vs chat serving CPU | 论文、厂商博客 | planned |
| D10 | 跨引擎 counter-evidence 和 skeptical views | 防止结论被单边材料带偏，寻找认为共享内存广播"不是真正瓶颈"的论据 | CPU not bottleneck LLM inference, GPU utilization myth, vLLM benchmark CPU vs GPU | 批判性分析、论坛讨论 | planned |
