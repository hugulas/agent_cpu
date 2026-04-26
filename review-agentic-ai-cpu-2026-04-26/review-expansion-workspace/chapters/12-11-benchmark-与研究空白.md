## 11. Benchmark 与研究空白

### 11.1 需要什么 benchmark

如果仍只用 `TTFT`、`ITL`、`TPS` 和 `RPS` 来描述系统，就很难准确看出 AI CPU 在 agentic workload 下的真实作用。当前材料更适合支持一组新的指标：`dispatch latency` 用来看状态驱动调度链的前台代价，`resume latency` 用来看 pause/resume 路径是否高效，`cache-affinity quality` 和 `retention hit quality` 用来看状态复用控制面是否真的起效，`expert skew tail latency` 用来看 MoE 动态平衡是否成功，`graph fallback frequency` 则用来看图化路线在动态服务中的稳定性。

### 11.2 当前材料还缺什么

尽管单篇笔记已经让证据链比此前完整得多，但仍有几类缺口明显存在。第一，`metadata overhead` 仍缺公开而系统化的量化。第二，多模态 `cache identity` 仍主要靠工程问题与 bug 报告来揭示，还缺更成体系的论文总结。第三，MoE 动态平衡的公开 `production data` 很少，尤其缺少大规模线上 expert skew 与 tail latency 的稳定观测。第四，Prefix/KV reuse 的误判成本虽然已被多篇 issue 暴露，但在论文和官方 benchmark 中仍没有形成统一测量框架。

### 11.3 后续最值得追踪的方向

最值得继续追踪的方向并不只是“更多优化”，而是几类更高阶的控制面主题。`state fabric` 指向 CPU、DPU、storage 和 runtime 的统一状态平面；`event-driven cache control` 指向缓存可见性与状态动作的事件化；`MoE balancing as control plane` 指向专家热点不再是局部优化，而是批级和跨节点调度问题；`graphification under highly dynamic serving` 则指向图化路线能否真正适应 agentic inference 的高动态性。只要这几条线继续发展，CPU 的控制面地位会被进一步坐实。

### 11.4 本章吸收的单篇笔记

- `D10`：S020, S021, S022
- `D11`：S023, S024, S025
- `D12-D17`：S034-S047

### 11.5 本章小结

因此，研究空白并不意味着主结论站不住，而意味着：我们已经足够清楚地知道 CPU 在哪里进入关键路径，但还没有完全成熟的公开 benchmark 去稳定、可重复地度量这些路径的代价与收益。

---
