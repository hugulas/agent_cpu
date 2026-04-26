## 11. Benchmark 与研究空白

### 11.1 需要什么 benchmark

- dispatch latency
- resume latency
- cache-affinity quality
- retention hit quality
- expert skew tail latency
- graph fallback frequency

### 11.2 当前材料还缺什么

- metadata overhead
- multimodal cache identity 的论文级总结
- MoE 动态平衡的公开 production 数据
- Prefix/KV reuse 的误判成本

### 11.3 后续最值得追踪的方向

- state fabric
- event-driven cache control
- MoE balancing as control plane
- graphification under highly dynamic serving

---

