# S012 笔记：Ray Prefix-aware routing

## 基本信息

- `source_id`：`S012`
- `direction_id`：`D12`
- 日期：`current`
- 类型：`official docs`
- 本地材料：`cited-materials/s012-ray-prefix-aware-routing.pdf`
- 提图状态：`completed`
- 可用图片数：`0`
- 图像来源目录：`assets/reference-note-fallbacks`

## 与本课题的关系

这篇材料放到当前主题下的价值，不是孤立地讨论某个模型或系统技巧，而是帮助回答：**agentic AI 推理负载如何改变 AI CPU 作为大模型推理服务控制面的职责，重点只看 CPU 为推理请求服务的场景，不纳入工具调用沙箱本身的 CPU 消耗。**

就当前综述框架而言，它最直接补强的是：Prefix cache、cache affinity、retention 和 event-driven reuse，解释状态复用控制面如何形成。

## 核心判断

非 NVIDIA 阵营的实现侧补充。

更具体地说，这篇材料对“agentic AI 推理负载如何改变 AI CPU 职责”的启发主要有三层：
1. 它说明了什么问题正在从 GPU 内部计算转移为 host/control-plane 问题：非 NVIDIA 阵营的实现侧补充。
2. 它给出了哪类硬证据或定量迹象：PrefixCacheAffinityRouter；cache hit rate vs load balance trade-off。
3. 它对工程判断的意义在于：CPU 不只是陪跑，而是在请求排队、状态放置、缓存复用、阶段切换或跨池协调中承担持续决策责任。

## 关键证据

- 主要用途：非 NVIDIA 阵营的实现侧补充
- 关键证据/数据：PrefixCacheAffinityRouter；cache hit rate vs load balance trade-off
- 建议回看原文时优先关注：`s012-ray-prefix-aware-routing.pdf` 中与 `D12` 对应的图、表或系统示意。

## 图文笔记

### 图：`s012-page1.png`

![s012-page1.png](../../assets/reference-note-fallbacks/s012-page1.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

## 综述写作时可直接复用的提炼

- 对主线判断的贡献：非 NVIDIA 阵营的实现侧补充。
- 最适合落在综述中的位置：`D12` 相关章节，用来支撑“Prefix cache、cache affinity、retention 和 event-driven reuse，解释状态复用控制面如何形成。”这一类论证。
- 与其他材料的拼接方式：可与同方向的论文、官方博客和反方材料并列使用，形成“机制 -> 真实工作负载 -> 平台/部署 -> 边界条件”的闭环。

## 当前状态

- 状态：`done`
- 是否含图：`yes`
- 下一步：如需进一步精修，可在这份笔记上补充更细的图注、页码和与其他材料的对照关系。
