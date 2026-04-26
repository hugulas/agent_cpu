# S035 笔记：Scaling Large MoE Models with Wide Expert Parallelism on NVL72 Rack-Scale Systems

## 基本信息

- `source_id`：`S035`
- `direction_id`：`D16`
- 日期：`2025-12-18`
- 类型：`official technical blog`
- 本地材料：`cited-materials/nvidia-wide-expert-parallelism-2025-12-18.pdf`
- 提图状态：`completed`
- 可用图片数：`9`
- 图像来源目录：`assets/extracted-figures-all/nvidia`

## 与本课题的关系

这篇材料放到当前主题下的价值，不是孤立地讨论某个模型或系统技巧，而是帮助回答：**agentic AI 推理负载如何改变 AI CPU 作为大模型推理服务控制面的职责，重点只看 CPU 为推理请求服务的场景，不纳入工具调用沙箱本身的 CPU 消耗。**

就当前综述框架而言，它最直接补强的是：MoE 动态平衡、wide expert parallelism 与 prefetch，解释热点专家为什么把 CPU 推到前台。

## 核心判断

说明 MoE 已从单请求计算问题转向批级与跨节点组织问题。

更具体地说，这篇材料对“agentic AI 推理负载如何改变 AI CPU 职责”的启发主要有三层：
1. 它说明了什么问题正在从 GPU 内部计算转移为 host/control-plane 问题：说明 MoE 已从单请求计算问题转向批级与跨节点组织问题。
2. 它给出了哪类硬证据或定量迹象：wide expert parallelism；rack-scale expert placement；host-side routing/placement pressure。
3. 它对工程判断的意义在于：CPU 不只是陪跑，而是在请求排队、状态放置、缓存复用、阶段切换或跨池协调中承担持续决策责任。

## 关键证据

- 主要用途：说明 MoE 已从单请求计算问题转向批级与跨节点组织问题
- 关键证据/数据：wide expert parallelism；rack-scale expert placement；host-side routing/placement pressure
- 建议回看原文时优先关注：`nvidia-wide-expert-parallelism-2025-12-18.pdf` 中与 `D16` 对应的图、表或系统示意。

## 图文笔记

### 图：`nvidia-wide-expert-parallelism-2025-12-18_page_0016-16.png`

![nvidia-wide-expert-parallelism-2025-12-18_page_0016-16.png](../../assets/extracted-figures-all/nvidia/nvidia-wide-expert-parallelism-2025-12-18_page_0016-16.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`nvidia-wide-expert-parallelism-2025-12-18_page_0010-10.png`

![nvidia-wide-expert-parallelism-2025-12-18_page_0010-10.png](../../assets/extracted-figures-all/nvidia/nvidia-wide-expert-parallelism-2025-12-18_page_0010-10.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`nvidia-wide-expert-parallelism-2025-12-18_page_0009-09.png`

![nvidia-wide-expert-parallelism-2025-12-18_page_0009-09.png](../../assets/extracted-figures-all/nvidia/nvidia-wide-expert-parallelism-2025-12-18_page_0009-09.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

## 综述写作时可直接复用的提炼

- 对主线判断的贡献：说明 MoE 已从单请求计算问题转向批级与跨节点组织问题。
- 最适合落在综述中的位置：`D16` 相关章节，用来支撑“MoE 动态平衡、wide expert parallelism 与 prefetch，解释热点专家为什么把 CPU 推到前台。”这一类论证。
- 与其他材料的拼接方式：可与同方向的论文、官方博客和反方材料并列使用，形成“机制 -> 真实工作负载 -> 平台/部署 -> 边界条件”的闭环。

## 当前状态

- 状态：`done`
- 是否含图：`yes`
- 下一步：如需进一步精修，可在这份笔记上补充更细的图注、页码和与其他材料的对照关系。
