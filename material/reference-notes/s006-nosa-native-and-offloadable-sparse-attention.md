# S006 笔记：NOSA: Native and Offloadable Sparse Attention

## 基本信息

- `source_id`：`S006`
- `direction_id`：`D04`
- 日期：`2025-10-15`
- 类型：`paper summary / abstract mirror`
- 本地材料：`cited-materials/s006-nosa-sparse-attention-2025-10.pdf`
- 提图状态：`completed`
- 可用图片数：`14`
- 图像来源目录：`assets/extracted-figures-all/s006`

## 与本课题的关系

这篇材料放到当前主题下的价值，不是孤立地讨论某个模型或系统技巧，而是帮助回答：**agentic AI 推理负载如何改变 AI CPU 作为大模型推理服务控制面的职责，重点只看 CPU 为推理请求服务的场景，不纳入工具调用沙箱本身的 CPU 消耗。**

就当前综述框架而言，它最直接补强的是：KV lifecycle、稀疏访问与 offload，解释 CPU 为什么从搬运者变成状态生命周期管理者。

## 核心判断

证明 KV offload 的关键不只是容量，而是 locality engineering 和 transfer domination。

更具体地说，这篇材料对“agentic AI 推理负载如何改变 AI CPU 职责”的启发主要有三层：
1. 它说明了什么问题正在从 GPU 内部计算转移为 host/control-plane 问题：证明 KV offload 的关键不只是容量，而是 locality engineering 和 transfer domination。
2. 它给出了哪类硬证据或定量迹象：selected KV transfer 仍可能主导成本；解码吞吐最高 `2.3x`。
3. 它对工程判断的意义在于：CPU 不只是陪跑，而是在请求排队、状态放置、缓存复用、阶段切换或跨池协调中承担持续决策责任。

## 关键证据

- 主要用途：证明 KV offload 的关键不只是容量，而是 locality engineering 和 transfer domination
- 关键证据/数据：selected KV transfer 仍可能主导成本；解码吞吐最高 `2.3x`
- 建议回看原文时优先关注：`s006-nosa-sparse-attention-2025-10.pdf` 中与 `D04` 对应的图、表或系统示意。

## 图文笔记

### 图：`2510.13602_memory_hierarchy.png`

![2510.13602_memory_hierarchy.png](../../assets/extracted-figures-all/s006/2510.13602_memory_hierarchy.png)

这张图更适合用来看系统分层、状态流动路径或控制面边界。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`2510.13602_framework_arxiv.png`

![2510.13602_framework_arxiv.png](../../assets/extracted-figures-all/s006/2510.13602_framework_arxiv.png)

这张图更适合用来看系统分层、状态流动路径或控制面边界。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`2510.13602_cache_hit_rate.png`

![2510.13602_cache_hit_rate.png](../../assets/extracted-figures-all/s006/2510.13602_cache_hit_rate.png)

这张图更适合用来看缓存命中、状态放置、路由倾向或内存层级设计。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

## 综述写作时可直接复用的提炼

- 对主线判断的贡献：证明 KV offload 的关键不只是容量，而是 locality engineering 和 transfer domination。
- 最适合落在综述中的位置：`D04` 相关章节，用来支撑“KV lifecycle、稀疏访问与 offload，解释 CPU 为什么从搬运者变成状态生命周期管理者。”这一类论证。
- 与其他材料的拼接方式：可与同方向的论文、官方博客和反方材料并列使用，形成“机制 -> 真实工作负载 -> 平台/部署 -> 边界条件”的闭环。

## 当前状态

- 状态：`done`
- 是否含图：`yes`
- 下一步：如需进一步精修，可在这份笔记上补充更细的图注、页码和与其他材料的对照关系。
