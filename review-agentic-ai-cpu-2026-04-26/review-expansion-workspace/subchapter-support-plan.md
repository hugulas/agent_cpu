# 子章节补强计划

目标：

- 使用已经洞察完成的本地材料、单篇笔记、提取图片和关键数字，逐个补强 `subchapters/` 中的 `16` 个子章节。
- 每个子章节都要达到同一标准：`每个核心观点附近都有数据、引用或图支撑`。
- 每完成一个子章节，就在账本中更新状态，并向用户反馈。

补强标准：

1. 每个子章节至少补 `1` 张与核心论点直接相关的本地图。
2. 每个子章节至少补 `1` 处明确数字或实验结论。
3. 每个核心判断都要在相邻段落给出 `[n]` 引用，而不是只在章末列材料。
4. 如单节观点较多，优先增加“证据表”或“判断-证据对齐表”。
5. 图只服务论证，不做装饰；图下注明它支持哪一条判断。

执行顺序：

1. `01-主线一-微观问题-kernel-launch-tax.md`
2. `02-主线一-宏观问题-状态驱动调度链.md`
3. `03-主线一-图化编译与运行时图化.md`
4. `04-主线一-图化编译在服务化推理中的利弊.md`
5. `05-主线二-从-kv-offload-到-kv-lifecycle.md`
6. `06-主线二-稀疏attention与稀疏kv访问.md`
7. `07-主线二-prefix-cache是第一代状态复用技术.md`
8. `08-主线二-prefix-cache之后的技术演化.md`
9. `09-主线二-kv的工业控制平面化趋势.md`
10. `10-主线三-稀疏计算优势为何不自动转化成系统收益.md`
11. `11-主线三-专家驻留预取与动态平衡.md`
12. `12-主线三-moe路由动态平衡问题.md`
13. `13-主线三-工业界当前吸收到了哪一步.md`
14. `14-主线四-agentic为什么特别适合拆出prefill.md`
15. `15-主线四-从单集群pd到prefill-as-a-service.md`
16. `16-主线四-这对cpu的直接要求.md`

子章节补强映射：

| 子章节 | 主要补强点 | 主要材料 | 目标图片 |
| --- | --- | --- | --- |
| `01` | launch tax、CPU slowdown、runtime graph 化 | `S005 S038 S039 S040` | `s005/summary`、`S039/page_0008-08` 或 `s040/fig1_scheduling_models` |
| `02` | queue -> worker selection -> handoff -> sync 放大链 | `S005 S021` | `s005/sync-barrier`、`S021` 相关图 |
| `03` | graph capture、piecewise graphs、persistent runtime | `S038 S039 S040` | `S039/page_0006-06`、`s040/fig10_e2e_compilation_flow` |
| `04` | 图化编译收益与代价并存 | `S039 S040 S024 S025` | `S039/page_0009-09`、`s040/fig8_dynamic_schedule_runtime_impl` |
| `05` | KV 从 offload 到 lifecycle | `S003 S006 S007 S034` | `s006`、`s007` 代表图 |
| `06` | sparse attention / sparse KV access policy | `S006 S007 S013` | `s006`、`s007` 代表图 |
| `07` | APC 作为第一代状态复用 | `S010 S043` | `S010`、`S043` 代表图 |
| `08` | affinity routing、retention、events、identity | `S011 S016 S041 S042 S044 S045 S046 S047` | `S016`、`S042`、`S047` |
| `09` | KV control plane 化 | `S003 S014 S034 S042` | `S003`、`S034` |
| `10` | sparse compute 不自动变系统收益 | `S008 S035 S036 S037` | `S035` 或 `S036` |
| `11` | residency、prefetch、dynamic balance | `S008 S036 S037` | `s008`、`S036` |
| `12` | expert skew、topology-aware balance | `S035 S036 S037` | `S035`、`S037` |
| `13` | 工业界对 MoE 的吸收状态 | `S035 S031 S032` | `S035`、`S032` |
| `14` | agentic workload 为什么适合拆 prefill | `S001 S028 S029 S030` | `S001`、`S029` |
| `15` | 从单集群 PD 到 PrfaaS | `S001 S002 S003 S015 S023` | `S001`、`S002`、`S015` |
| `16` | AI CPU 的直接设计要求 | `S001 S003 S008 S009 S031 S032 S033` | `S031`、`S032`、`S033` |

写作方式：

- 先保留原判断，再为每个判断补“为什么”和“证据来自哪里”。
- 能量化的地方优先量化，比如 `19x`、`1.7x`、`11.7x`、`2.1x`、`3.0x`、`+54%`。
- 相同材料尽量在相邻两三个子章节复用，但支撑点必须不同，避免机械重复。
