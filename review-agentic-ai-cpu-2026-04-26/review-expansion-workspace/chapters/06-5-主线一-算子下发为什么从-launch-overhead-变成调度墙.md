## 5. 主线一：算子下发为什么从 launch overhead 变成调度墙

### 5.1 微观问题：kernel launch tax

- 小模型、量化模型、动态 batch
- CPU-induced slowdown

### 5.2 宏观问题：状态驱动调度链

- queue
- broadcast
- synchronization
- worker selection

### 5.3 图化编译与运行时图化

- piecewise CUDA Graphs
- full graphs
- persistent kernels
- Event Tensor

### 5.4 图化编译在服务化推理中的利与弊

- 收益：降低 dispatch tax
- 代价：capture memory、warmup、fallback、backend compatibility

---

