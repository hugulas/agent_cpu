# S008 笔记：FluxMoE: Decoupling Expert Residency for High-Performance MoE Serving

## 基本信息

- `source_id`：`S008`
- `direction_id`：`D05`
- 日期：`2026-04-03`
- 类型：`paper summary / abstract mirror`
- 本地材料：`cited-materials/s008-fluxmoe-moe-serving-2026-04.pdf`
- 提图状态：`completed`
- 可用图片数：`21`
- 图像来源目录：`assets/extracted-figures-all/s008`

## 与本课题的关系

这篇材料放到当前主题下的价值，不是孤立地讨论某个模型或系统技巧，而是帮助回答：**agentic AI 推理负载如何改变 AI CPU 作为大模型推理服务控制面的职责，重点只看 CPU 为推理请求服务的场景，不纳入工具调用沙箱本身的 CPU 消耗。**

就当前综述框架而言，它最直接补强的是：MoE serving 的 route/place/move 链，解释 CPU 为什么需要承担 expert residency 协调。

## 核心判断

证明 MoE serving 会把 route/place/move 链条推回 host。

更具体地说，这篇材料对“agentic AI 推理负载如何改变 AI CPU 职责”的启发主要有三层：
1. 它说明了什么问题正在从 GPU 内部计算转移为 host/control-plane 问题：证明 MoE serving 会把 route/place/move 链条推回 host。
2. 它给出了哪类硬证据或定量迹象：decoupled expert residency；吞吐最高 `3.0x` over vLLM。
3. 它对工程判断的意义在于：CPU 不只是陪跑，而是在请求排队、状态放置、缓存复用、阶段切换或跨池协调中承担持续决策责任。

## 关键证据

- 主要用途：证明 MoE serving 会把 route/place/move 链条推回 host
- 关键证据/数据：decoupled expert residency；吞吐最高 `3.0x` over vLLM
- 建议回看原文时优先关注：`s008-fluxmoe-moe-serving-2026-04.pdf` 中与 `D05` 对应的图、表或系统示意。

## 图文笔记

### 图：`2604.02715_architecture.png`

![2604.02715_architecture.png](../../assets/extracted-figures-all/s008/2604.02715_architecture.png)

这张图更适合用来看系统分层、状态流动路径或控制面边界。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`2604.02715_trend.png`

![2604.02715_trend.png](../../assets/extracted-figures-all/s008/2604.02715_trend.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`2604.02715_thpt_vs_context_kvcap.png`

![2604.02715_thpt_vs_context_kvcap.png](../../assets/extracted-figures-all/s008/2604.02715_thpt_vs_context_kvcap.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

## 综述写作时可直接复用的提炼

- 对主线判断的贡献：证明 MoE serving 会把 route/place/move 链条推回 host。
- 最适合落在综述中的位置：`D05` 相关章节，用来支撑“MoE serving 的 route/place/move 链，解释 CPU 为什么需要承担 expert residency 协调。”这一类论证。
- 与其他材料的拼接方式：可与同方向的论文、官方博客和反方材料并列使用，形成“机制 -> 真实工作负载 -> 平台/部署 -> 边界条件”的闭环。

## 当前状态

- 状态：`done`
- 是否含图：`yes`
- 下一步：如需进一步精修，可在这份笔记上补充更细的图注、页码和与其他材料的对照关系。
