# Scope Boundary Check

| item | why risky | classification | allowed use | note |
| --- | --- | --- | --- | --- |
| CPU 作为工具调用沙箱 | 很多平台和产品资料会把 sandbox/tool runtime 与 inference serving 混在一起 | exclude | 只能作为背景，不作为主结论证据 | 当前课题明确排除 |
| 平台材料中的 sandbox benchmark | 容易误导为“推理 CPU 性能” | adjacent_but_usable | 只能用于平台路线信号，不可直接当 serving 机制证据 | Vera 相关资料尤其要注意 |
| 稀疏 attention 的训练/长上下文通用论文 | 容易只有精度或算量结论，没有 serving 含义 | adjacent_but_usable | 仅在能落到 KV 访问、offload、resume、host policy 时使用 | NOSA/ScoutAttention 属于可用范围 |
| MoE 训练中的 load balance loss | 与推理时 expert skew / residency 不完全同构 | adjacent_but_usable | 只能启发术语，不可直接替代推理侧动态平衡证据 | 需优先找 serving 论文 |
| 图化编译的单模型静态 benchmark | 容易高估服务化收益 | adjacent_but_usable | 必须补服务化代价，例如 capture memory、warmup、fallback | vLLM/Event Tensor 已部分补足 |
| 2024 年的 prefix-cache early-reuse 材料 | 早于当前课题的主时间边界，但对 prefix cache 技术演化有前置价值 | adjacent_but_usable | 可作为“前代技术起点”补充，不作为 2025H2+ 主证据 | TensorRT-LLM early reuse 属此类 |
| GitHub issue / bug 讨论 | 往往缺统一实验控制，但能暴露真实工程症状 | adjacent_but_usable | 可用于识别不稳定性、identity 设计缺陷与用户需求，但不能单独替代论文级主证据 | prefix cache 的 dirty cache、pinned prefix、multimodal mismatch 属此类 |
