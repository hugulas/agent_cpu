# Agentic AI 推理相关材料的工业采用状态评估

> 日期：2026-04-26  
> 范围：基于 `material/reading-log.md` 中已保留材料，以及少量当前官方文档状态核对，对各类技术材料按“工业采用状态”进行评估。  
> 边界：只讨论 `CPU 为大模型推理请求服务` 的场景，不把工具执行沙箱本身算作主评估对象。

## 1. 评估方法

本文不直接按“论文/博客/issue”区分材料价值，而是按它们所代表的技术状态分层：

1. `已工业采用`
   - 已进入主流工业 serving 栈或官方产品能力
   - 文档、参数、API、部署指南已存在
   - 不是单纯论文结论

2. `已产品化，但仍局部或条件性采用`
   - 已出现在官方产品、官方文档或工程实现中
   - 但仍非默认能力，或仅在特定负载/特定平台/实验特性下适合启用

3. `工业界明确关注，但仍处于探索/试点阶段`
   - 工业文章、平台路线图、开源文档已明确指向该方向
   - 但还缺稳定的“默认采用”信号，或者文档明确标注为 experimental

4. `研究验证为主，尚未见广泛工业采用`
   - 主要停留在论文、专利、POC 或 discovery 页面
   - 可能方向正确，但尚未看到主流产品栈大规模吸收

5. `平台信号，不等于已部署技术栈默认采用`
   - 说明厂商和平台路线图正在为这类能力让路
   - 但不能直接等同于上层 serving 软件栈已经广泛落地

这五类状态并非价值排序，而是“能不能直接拿来当现状”的判断。

---

## 2. 总体结论

如果把当前材料整体看一遍，可以得出一个相对清楚的总判断：

- `prefix cache / cache-aware routing / KV reuse policy / CUDA Graphs / CPU overhead reduction / PD 分离`  
  已经进入工业界可见、可配置、可部署的范围，其中一部分已是主流 serving 栈的标准能力。

- `cross-datacenter Prefill-as-a-Service / event-driven global cache view / KV-aware routing across executors / wide expert parallelism / MoE runtime balancing`  
  已经明确被工业界关注，且部分有产品化实现，但整体仍处于“不是所有场景都默认开启”的阶段。

- `NOSA / ScoutAttention / FluxMoE / FineMoE / SpecMoEOff / Event Tensor`  
  目前主要还是研究界给出的机制路径，工业界尚未出现足够强的“主流默认采用”信号。

换句话说，**工业界已经真正采用的是“控制平面化”的方向，而不是所有新算法本身。**  
也就是：

- 已采用的是 `reuse / routing / retention / graphification / disaggregation`
- 尚未广泛采用的是这些方向上更激进的“新算法变体”或“更强 runtime 机制”

---

## 3. 已工业采用

### 3.1 Automatic Prefix Caching

**状态：** `已工业采用`

**代表材料：**
- `S010` vLLM Automatic Prefix Caching  
- `S038` vLLM V1  

**为什么判断为已采用：**
- 已经是 vLLM 的正式设计能力，而不是论文提案
- 已直接进入主流开源 serving 栈
- 和 `V1` 的 execution loop、scheduler、input preparation 一起被写入官方演进路线

**为什么工业界会采用它：**
- shared system prompt、tool schema、project context、agent trunk 都天然适合复用
- 相比更激进的系统改造，APC 是收益直观、接入成本较低的一层

**限制：**
- 它更多是“第一代复用能力”
- 只解决 prefix reuse 的起点问题，不解决跨 executor 路由、长期保留和全局一致性问题

### 3.2 Prefix-aware routing / cache affinity routing

**状态：** `已工业采用`

**代表材料：**
- `S012`, `S016`, `S017`, `S041`

**为什么判断为已采用：**
- Ray Serve 官方文档中已有明确路由器实现与配置参数
- 已不是概念文章，而是可调的 routing policy
- 已经把 `locality vs load-balance` 明确做成参数化折中

**为什么工业界会采用它：**
- 单纯 APC 在分布式部署里不够，必须回答“请求该送到哪台机器”
- 只看 load balance 会主动破坏 cache hit
- 所以只要进入多副本 serving，cache-affinity routing 就会变得自然

**限制：**
- 它是“已采用”，但不是“无条件最优”
- 文档也明确要求调阈值、看 hit rate、看 imbalance
- 本质上它仍是 workload-sensitive 的能力

### 3.3 CPU overhead reduction + piecewise CUDA Graphs in serving stacks

**状态：** `已工业采用`

**代表材料：**
- `S038` vLLM V1
- `S039` vLLM CUDA Graphs design doc

**为什么判断为已采用：**
- 已进入主流 serving 框架的正式架构升级
- 不只是论文或博客结论，而是官方实现与设计文档的一部分
- 与 scheduler、persistent batch、prefix caching 一起被作为完整软件栈优化推出

**为什么工业界会采用它：**
- CPU overhead 是已经被公开量化的问题
- 图化编译和 execution loop 重构可以立即降低 dispatch tax
- 这类改造不要求新模型，只要求改 serving runtime

**限制：**
- “已采用”不等于“总是全图化”
- 在动态 batch、多模态、backend 差异较大的场景中，仍需 fallback 或 piecewise 模式

### 3.4 Priority-based KV eviction / event API / early reuse

**状态：** `已产品化，但仍局部或条件性采用`

**代表材料：**
- `S034` TensorRT-LLM KV reuse optimizations
- `S043` TensorRT-LLM early reuse

**为什么不是直接归到“完全已工业采用”：**
- 它们已经进入 TensorRT-LLM 官方产品能力
- 但更像高阶优化控制杆，不像 APC 那样是通用默认入口
- 需要 deployer 显式利用 workload knowledge，调 retention 和 routing

**为什么工业界会用：**
- 高价值前缀、系统提示、复用概率高的 session trunk 很适合 selective retention
- 对 TTFT 敏感场景，early reuse 收益非常直接

**为什么还不是“全面采用”：**
- 需要更强的控制面和元数据系统
- 需要知道“哪些 prefix 值得长期留”
- 这对不同工作负载差异很大，不易一刀切

---

## 4. 已产品化，但仍局部或条件性采用

### 4.1 PD 分离 / Disaggregated Prefill

**状态：** `已产品化，但仍局部或条件性采用`

**代表材料：**
- `S002` NVIDIA disaggregated LLM inference on Kubernetes
- `S021` prefill-decode disaggregation handbook
- 当前 vLLM 文档将 disaggregated prefilling 明确标为 `experimental`

**为什么不是“研究中”：**
- NVIDIA、vLLM、llm-d、TensorRT-LLM 等都已经在讲和做
- 工业内已经形成共同术语和实现路径

**为什么也不能简单写成“已经全面默认”：**
- vLLM 当前公开文档仍直接标注 `experimental`
- 反方材料 (`S023`) 也明确说它不是 universally better
- 对网络、双份权重、复杂度和工作负载形状都有要求

**为什么工业界会采用：**
- prefill 和 decode 的资源属性确实不同
- agentic workload 下阶段切换更多、prefix reuse 更多、resume 更多
- 所以这个方向对工业界非常自然

**为什么仍是条件性采用：**
- 不是所有场景都值得付额外复杂度
- 需要较成熟的 transfer stack、KV movement、调度控制面

### 4.2 KV-aware routing / event-driven cache view across executors

**状态：** `已产品化，但仍局部或条件性采用`

**代表材料：**
- `S034` TensorRT-LLM KV cache event API
- `S042` vLLM KV Events Subscriber
- `S003` Dynamo

**为什么判断为此状态：**
- 官方产品和官方文档都已经把“cache state 事件化”做成能力
- 但从现有材料看，这还不是跨框架的普遍默认模式

**为什么工业界在推进：**
- 一旦请求在多个 executor 间流动，cache state 必须变成控制面信息
- 只靠本地缓存表无法支持更大的 cache-aware scheduling

**为什么尚未全面普及：**
- eventually consistent cache view 本身会引入延迟和误判
- 元数据系统和事件系统会有额外成本
- 跨 executor 一致性与负载均衡的折中仍然复杂

### 4.3 Wide expert parallelism / rack-scale MoE organization

**状态：** `已产品化，但仍局部或平台相关`

**代表材料：**
- `S035` NVIDIA Wide Expert Parallelism

**为什么判断为此状态：**
- 它已经明显不是学术概念，而是平台和软件栈在推进的方向
- 但强依赖平台、拓扑和大规模 GPU 部署环境

**为什么工业界会采用：**
- 大型 MoE 模型已经在生产中出现
- 当 expert 太多、驻留压力太大时，topology-aware placement 和 rack-scale organization 无法回避

**为什么还不是“广泛默认”：**
- 这类能力通常只在高端平台、大集群、特定模型和特定 serving 栈中成立
- 中小规模部署不一定值得上这么复杂的组织方式

---

## 5. 工业界明确关注，但仍处于探索/试点阶段

### 5.1 Prefill-as-a-Service / Cross-datacenter prefill

**状态：** `工业界明确关注，但仍处于探索/试点阶段`

**代表材料：**
- `S001` Prefill-as-a-Service

**为什么不是“已工业采用”：**
- 目前更像研究和先进架构方向
- 虽然论文给出的结果很强，但还缺主流产品栈将其作为默认能力的信号

**为什么工业界会认真看它：**
- reduced-KV / hybrid-attention 正在让这条路变得可行
- agentic workload 的 prefill-first、shared prefix、remote prefill 都与它高度匹配

**为什么暂时还没全面落地：**
- 对网络、带宽感知调度、cache placement 和跨域状态协调要求很高
- 运维复杂度明显高于单集群 PD

### 5.2 Persistent / pinned prefixes

**状态：** `工业界明确关注，但仍处于探索/试点阶段`

**代表材料：**
- `S045`

**为什么判断为此状态：**
- 已经是明确的用户需求
- 但从材料看，仍停留在 feature request 和策略设计层

**为什么工业界会关注：**
- LRU 不能表达“高价值前缀长期保留”
- system prompt、工具定义、公共 trunk 都非常适合 pinned retention

**为什么还没全面成型：**
- 这会直接引入缓存预算、优先级冲突、长尾占用等问题
- 需要更成熟的 retention policy engine

### 5.3 Prefix cache 在 multimodal / high-concurrency agentic serving 中的 identity control

**状态：** `工业界明确关注，但仍处于探索/试点阶段`

**代表材料：**
- `S047`

**为什么判断为此状态：**
- 问题已经在真实工程中暴露
- 但还没有看到统一、成熟、通用的主流解法

**为什么工业界会关注：**
- GUI/mobile agent 这类 workload 会让“文本前缀相似但视觉状态不同”成为常态
- 错误复用会直接导致 correctness 问题

**为什么还处于探索期：**
- multimodal cache identity 远复杂于纯文本 prefix hash
- 需要更复杂的 cache key、state binding 和 consistency design

---

## 6. 研究验证为主，尚未见广泛工业采用

### 6.1 NOSA

**状态：** `研究验证为主`

**为什么：**
- 论文价值很高，机制也很清楚
- 但还没看到主流 serving 产品把它作为现成能力推出

**工业价值：**
- 给出了“稀疏 attention 应原生适配 offload”的非常强的方向性判断

### 6.2 ScoutAttention

**状态：** `研究验证为主`

**为什么：**
- 它把 CPU 推进到 layer-ahead 协同计算位置，非常有启发
- 但这类改动对 runtime、算子和精度都更敏感
- 暂未看到主流工业框架公开吸收为标准能力

### 6.3 FluxMoE / FineMoE / SpecMoEOff

**状态：** `研究验证为主`

**为什么：**
- 都在解决非常真实的问题：expert residency、skew、prefetch、latency hiding
- 但当前仍主要是论文/POC 层面的解决路径
- 尚未看到“大规模工业默认采用”的强公开信号

**工业意义：**
- 它们大概率代表未来 MoE serving 控制面的演化方向
- 但此刻还不应把它们写成“工业现状”

### 6.4 Event Tensor / Dynamic Megakernels

**状态：** `研究验证为主`

**为什么：**
- 这是服务化图化编译非常强的一条论文路径
- 但比 vLLM 这类 runtime-level 图化更激进
- 目前没有足够证据说明它已进入主流产品栈

### 6.5 Characterizing CPU-Induced Slowdowns in Multi-GPU LLM Inference

**状态：** `研究验证为主，但对工业判断影响极大`

**为什么：**
- 它不是“功能”，而是“诊断和因果”
- 工业界已经明显在按这类问题修 runtime 和控制面
- 但论文本身当然不等于产品化能力

---

## 7. 平台信号，不等于软件栈已全面采用

### 7.1 Vera / Rubin / BlueField / Grace

**状态：** `平台信号`

**代表材料：**
- `S031`, `S032`, `S033`

**为什么不能直接写成“软件栈已采用”：**
- 它们证明的是平台方向在收敛
- 不等于上层 serving runtime 的所有能力已经成熟

**为什么又必须重视：**
- 平台厂商已经在为 `orchestration + data movement + coherent memory access` 让路
- 这说明工业界不是偶然优化 CPU，而是在重新定义 CPU 的系统位置

---

## 8. 关键判断：哪些方向其实已经被工业界“间接采用”

有些论文或机制虽然没有被“按原样采用”，但它们所指向的问题已经被工业界间接吸收了。

最典型的是：

1. `NOSA / ScoutAttention`
   - 没有被直接产品化
   - 但它们强调的 `KV access sparsity + offload-friendly design + CPU prefetch/cooperation` 已经在工业界的 KV reuse、warm tier、event-driven cache view 中出现影子

2. `FluxMoE / FineMoE / SpecMoEOff`
   - 还不是工业默认能力
   - 但它们试图解决的 `expert residency / skew / prefetch / overlap`，已经通过 Wide EP、平台拓扑设计、MoE runtime 演进被间接承认

3. `Event Tensor`
   - 没有成为主流产品能力
   - 但它要解决的 dispatch tax、kernel boundary synchronization、dynamic serving graphification，已经被 vLLM V1 这类 runtime 路线部分吸收

所以更准确的说法不是“工业界还没采用这些论文”，而是：

> 工业界已经采用了这些论文所指向的问题域，但通常不会以论文中的原始形式落地，而会以更保守、更兼容 runtime 的方式吸收。

---

## 9. 结论

如果只保留一句最有用的话，可以这样总结：

> **工业界已经广泛采用的是“把推理系统变成控制平面问题”的方向；尚未广泛采用的是这条路上更激进、更专门化的新算法和 runtime 机制。**

更具体地说：

- **已工业采用：**
  - APC
  - prefix-aware routing
  - CPU overhead reduction
  - piecewise CUDA Graphs
  - 部分 KV reuse / retention / early reuse 能力

- **已产品化但仍局部或条件性采用：**
  - PD 分离
  - event-driven KV-aware routing
  - Wide-EP / rack-scale MoE organization

- **工业界明确关注但仍探索中：**
  - Prefill-as-a-Service
  - persistent prefixes
  - multimodal cache identity

- **研究验证为主：**
  - NOSA
  - ScoutAttention
  - FluxMoE
  - FineMoE
  - SpecMoEOff
  - Event Tensor

这份状态判断对后续写综述很重要，因为它决定了哪些材料应该被写成：

- `industry reality`
- `near-term trajectory`
- `research frontier`

而不是混在一起。

---

## 10. 主要参考材料

- vLLM V1: <https://vllm.ai/blog/v1-alpha-release>
- vLLM Disaggregated Prefilling: <https://docs.vllm.ai/en/latest/features/disagg_prefill/>
- vLLM Automatic Prefix Caching: <https://docs.vllm.ai/en/latest/design/prefix_caching/>
- Ray Prefix-aware Routing: <https://docs.ray.io/en/latest/serve/llm/user-guides/prefix-aware-routing.html>
- NVIDIA Dynamo Agentic Inference: <https://developer.nvidia.com/blog/full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo/>
- NVIDIA TensorRT-LLM KV Reuse Optimizations: <https://developer.nvidia.com/blog/introducing-new-kv-cache-reuse-optimizations-in-nvidia-tensorrt-llm/>
- NVIDIA TensorRT-LLM Early Reuse: <https://developer.nvidia.com/blog/5x-faster-time-to-first-token-with-nvidia-tensorrt-llm-kv-cache-early-reuse/>
