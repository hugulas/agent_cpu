# 子章节补强账本

| 序号 | 子章节 | 状态 | 主要材料 | 图/数据/引用补强要求 | 完成说明 |
| --- | --- | --- | --- | --- | --- |
| 1 | `01-主线一-微观问题-kernel-launch-tax.md` | `done` | `S005 S038 S039 S040` | 加 `2` 张图、补 `19x` 和 `1.7x`、给关键判断加近旁引用 | 已补判断-证据对齐表、`2` 张图、逐段引用与参考文献 |
| 2 | `02-主线一-宏观问题-状态驱动调度链.md` | `done` | `S005 S003 S021 S024` | 补同步链图、补 queue/dispatch 数据、加逐段引用 | 已补判断-证据对齐表、`2` 张图、`12ms -> 228ms` 与 PD 分离机制、逐段引用与参考文献 |
| 3 | `03-主线一-图化编译与运行时图化.md` | `done` | `S038 S039 S040` | 补 graph mode 图、capture/compile 代价、加逐段引用 | 已补判断-证据对齐表、`2` 张图、`1.7x` 与 graph modes / megakernel 机制、逐段引用与参考文献 |
| 4 | `04-主线一-图化编译在服务化推理中的利弊.md` | `done` | `S039 S040 S024 S025` | 补收益-代价对照表、加动态 fallback 证据 | 已补判断-证据对齐表、`2` 张图、收益/代价与 trilemma 边界、逐段引用与参考文献 |
| 5 | `05-主线二-从-kv-offload-到-kv-lifecycle.md` | `pending` | `S003 S006 S007 S034` | 补 lifecycle 图、`11.7x` 等数字、近旁引用 | 未开始 |
| 6 | `06-主线二-稀疏attention与稀疏kv访问.md` | `pending` | `S006 S007 S013` | 补 sparse access 图和 `2.1x/2.3x` 数据 | 未开始 |
| 7 | `07-主线二-prefix-cache是第一代状态复用技术.md` | `pending` | `S010 S043` | 补 APC 机制图、`5x` TTFT 数据、近旁引用 | 未开始 |
| 8 | `08-主线二-prefix-cache之后的技术演化.md` | `pending` | `S011 S016 S041 S042 S044 S045 S046 S047` | 补 routing/events/identity 图，补 `0.1`、`50ms->500ms+` 等数据 | 未开始 |
| 9 | `09-主线二-kv的工业控制平面化趋势.md` | `pending` | `S003 S014 S034 S042` | 补工业 control plane 图和 policy 数据 | 未开始 |
| 10 | `10-主线三-稀疏计算优势为何不自动转化成系统收益.md` | `pending` | `S008 S035 S036 S037` | 补 MoE 系统放大链图与吞吐数据 | 未开始 |
| 11 | `11-主线三-专家驻留预取与动态平衡.md` | `pending` | `S008 S036 S037` | 补 prefetch / residency 图和数字 | 未开始 |
| 12 | `12-主线三-moe路由动态平衡问题.md` | `pending` | `S035 S036 S037` | 补 skew / topology-aware balance 图和逐段引用 | 未开始 |
| 13 | `13-主线三-工业界当前吸收到了哪一步.md` | `pending` | `S035 S031 S032` | 补 adoption 状态数据和平台图 | 未开始 |
| 14 | `14-主线四-agentic为什么特别适合拆出prefill.md` | `pending` | `S001 S028 S029 S030` | 补 workload 形态图和 `100 agents / 4.5x` 数据 | 未开始 |
| 15 | `15-主线四-从单集群pd到prefill-as-a-service.md` | `pending` | `S001 S002 S003 S015 S023` | 补 PrfaaS 架构图和 `+54% / -64% / +32%` 数据 | 未开始 |
| 16 | `16-主线四-这对cpu的直接要求.md` | `pending` | `S001 S003 S008 S009 S031 S032 S033` | 补 CPU 设计要求图和带宽/角色数据 | 未开始 |
