# S001 笔记：Prefill-as-a-Service: KVCache of Next-Generation Models Could Go Cross-Datacenter

## 基本信息

- `source_id`：`S001`
- `direction_id`：`D03`
- 日期：`2026-04-16/22`
- 类型：`paper abstract / discovery page`
- 本地材料：`cited-materials/s001-prefill-as-a-service-2026-04.pdf`
- 提图状态：`completed`
- 可用图片数：`6`
- 图像来源目录：`assets/extracted-figures-all/s001`

## 与本课题的关系

这篇材料放到当前主题下的价值，不是孤立地讨论某个模型或系统技巧，而是帮助回答：**agentic AI 推理负载如何改变 AI CPU 作为大模型推理服务控制面的职责，重点只看 CPU 为推理请求服务的场景，不纳入工具调用沙箱本身的 CPU 消耗。**

就当前综述框架而言，它最直接补强的是：Prefill/Decode 分离与 Prefill-as-a-Service，解释 CPU 为什么从本地阶段调度扩展到跨池控制。

## 核心判断

证明 PD 分离已从单集群优化外延到跨数据中心、异构集群与商品以太网。

更具体地说，这篇材料对“agentic AI 推理负载如何改变 AI CPU 职责”的启发主要有三层：
1. 它说明了什么问题正在从 GPU 内部计算转移为 host/control-plane 问题：证明 PD 分离已从单集群优化外延到跨数据中心、异构集群与商品以太网。
2. 它给出了哪类硬证据或定量迹象：吞吐相对同构 PD `+54%`；P90 TTFT `-64%`；相对朴素异构基线吞吐 `+32%`。
3. 它对工程判断的意义在于：CPU 不只是陪跑，而是在请求排队、状态放置、缓存复用、阶段切换或跨池协调中承担持续决策责任。

## 关键证据

- 主要用途：证明 PD 分离已从单集群优化外延到跨数据中心、异构集群与商品以太网
- 关键证据/数据：吞吐相对同构 PD `+54%`；P90 TTFT `-64%`；相对朴素异构基线吞吐 `+32%`
- 建议回看原文时优先关注：`s001-prefill-as-a-service-2026-04.pdf` 中与 `D03` 对应的图、表或系统示意。

## 图文笔记

### 图：`2604.15039_paas_pd_architecture.png`

![2604.15039_paas_pd_architecture.png](../../assets/extracted-figures-all/s001/2604.15039_paas_pd_architecture.png)

这张图更适合用来看系统分层、状态流动路径或控制面边界。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`2604.15039_main_figure.png`

![2604.15039_main_figure.png](../../assets/extracted-figures-all/s001/2604.15039_main_figure.png)

这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

### 图：`2604.15039_kv_throughput_minimax_m25.png`

![2604.15039_kv_throughput_minimax_m25.png](../../assets/extracted-figures-all/s001/2604.15039_kv_throughput_minimax_m25.png)

这张图更适合用来判断该方案的收益出现在哪个维度，以及收益是否受输入长度、批量或上下文规模影响。

结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项：
- 控制面是否被前移到 CPU/host；
- 状态对象是否需要被保留、转移、预取或路由；
- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。

## 综述写作时可直接复用的提炼

- 对主线判断的贡献：证明 PD 分离已从单集群优化外延到跨数据中心、异构集群与商品以太网。
- 最适合落在综述中的位置：`D03` 相关章节，用来支撑“Prefill/Decode 分离与 Prefill-as-a-Service，解释 CPU 为什么从本地阶段调度扩展到跨池控制。”这一类论证。
- 与其他材料的拼接方式：可与同方向的论文、官方博客和反方材料并列使用，形成“机制 -> 真实工作负载 -> 平台/部署 -> 边界条件”的闭环。

## 当前状态

- 状态：`done`
- 是否含图：`yes`
- 下一步：如需进一步精修，可在这份笔记上补充更细的图注、页码和与其他材料的对照关系。
