# Numeric Claims Ledger

| claim_id | number | metric | source_id | direct_or_inferred | already_in_report | note |
| --- | --- | --- | --- | --- | --- | --- |
| N001 | `11.7x` | agentic inference KV read/write ratio | S003 | direct | yes | 证明 KV 已从写入问题转向保留/恢复问题 |
| N002 | `85%-97%` | 后续调用 cache hit rate | S003 | direct | yes | 支撑 write-once-read-many |
| N003 | `+54%` | Prefill-as-a-Service 相对同构 PD 吞吐提升 | S001 | direct | yes | 强化跨域 prefill 的可行性 |
| N004 | `-64%` | Prefill-as-a-Service P90 TTFT 降低 | S001 | direct | yes | 说明远端 prefill 不只影响成本，也影响时延 |
| N005 | `2.3x` | NOSA 相对 baseline 解码吞吐提升 | S006 | direct | no | 当前报告提了机制，但还没回写这组数字 |
| N006 | `2.1x` | ScoutAttention 相对已有 offloading 方法加速 | S007 | direct | yes | 说明 CPU 可参与 layer-ahead 预计算 |
| N007 | `3.0x` | FluxMoE 在内存受限场景下相对 vLLM 吞吐提升 | S008 | direct | no | 应在后续 MoE 动态平衡段落补入 |
| N008 | `2.5x` | SpecMoEOff 最高 decode 吞吐提升 | S037 | direct | yes | 说明 speculative overlap 可隐藏 expert offload |
| N009 | `1.7x` | vLLM V1 吞吐提升 | S038 | direct | yes | 图化与调度重构的强数字 |
| N010 | `90 Gbps` | Splitwise 跨节点 KV 传输所需带宽量级 | local mature corpus | direct | no | 当前阶段报告尚未吸收，应在后续 gap audit 中补回 |
| N011 | `5x` | TensorRT-LLM early reuse 在系统提示 burst 场景下的 TTFT 改善上限 | S043 | direct | no | 说明 prefix cache 之后，`reuse timing` 本身也能显著影响前缀命中收益 |
| N012 | `7%` | TensorRT-LLM 将 block size 从 64 降到 8 tokens 带来的 TTFT 改善上限 | S043 | direct | no | 说明更细粒度切块有助于 prefix 后续的早复用，但会隐含更多 metadata 与管理开销 |
| N013 | `0.1` | Ray PrefixCacheAffinityRouter 默认匹配率阈值 | S041 | direct | no | 说明 prefix-aware routing 已经开始显式量化 locality vs load-balance 的转折点 |

| N014 | `~20` | agentic workload 平均 tool turns per trace（长尾到数百） | S056 | direct | no | 定义 agentic inference 的"阶段切换密度"基准 |
| N015 | `~10k` | agentic workload 平均 input prompt tokens（主要来自 system prompt + tool descriptions） | S056 | direct | no | 说明 agentic 的输入预处理压力远大于普通 chat |
| N016 | `TTFAT` | Time To First Answer Token（区别于 TTFT） | S056 | direct | no | 新的用户可见延迟指标，覆盖多轮 tool-call 后的首次回答 |
| N017 | `1.56x` | Helium workflow-aware serving 端到端加速 | S058 | direct | no | 证明跨调用优化比单请求优化更重要 |
| N018 | `99%` | Foundry 降低 cold-start 延迟比例（上限） | S064 | direct | no | 直接量化 CUDA graph capture 的服务化代价 |
| N019 | `10min → 3.9s` | Qwen3-235B-A22B 初始化延迟（vLLM vs Foundry） | S064 | direct | no | 大模型 serving 中 capture 可占初始化时间的绝大部分 |
| N020 | `2.6x~4.4x` | Foundry 相对 CUDA-checkpoint 的恢复加速 | S064 | direct | no | 说明 even checkpointing 也不够快，需要 materialization |
| N021 | `33.38 GiB / 44 GiB` | Qwen3.5-35B-A3B-FP8 加载后显存占用，启用 CUDA graph 导致 OOM | S065 | direct | no | capture memory 的可见生产代价 |
| N022 | `128` | torch.compile CUDA Graph Trees 默认 re-recording limit | S067 | direct | no | 动态 shape 下的隐式回退阈值 |
| N023 | `<1%` | vLLM V1 prefix caching 在 0% hit rate 时的 throughput 下降 | S068 | direct | no | 直接量化 prefix cache metadata/eviction 开销的上界 |
| N024 | `99.8% vs 91%` | benchmark vs production prefix cache hit rate 差距 | S069 | direct | no | 说明 lab 数字不能直接外推到生产环境 |
| N025 | `1,000,000-to-1` | prefix cache metadata 与 data 的内存开销比 | S071 | direct | no | 证明 metadata overhead 在量级上可忽略，但尾延迟和一致性风险仍存 |
| N026 | `70%` | KVzip eviction 比例 + `2x` latency reduction | S076 | direct | no | sparse KV retention 的量化收益 |
| N027 | `2.6x` | KIVI peak memory reduction | S076 | direct | no | KV cache compression 的收益量级 |
