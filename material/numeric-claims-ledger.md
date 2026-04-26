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
