# Agentic AI 推理机头 CPU 洞察项目

> 本文档面向 AI 编程助手。如果你刚进入本项目，请先通读此文件再操作。

---

## 项目概述

本项目是一个**系统性技术调研与综述写作项目**，核心课题是：

> **Agentic AI 推理负载特征对机头 CPU（host CPU / control-plane CPU）角色、瓶颈与选型要求的影响。**

项目产出物为长篇幅中文技术综述报告，以 Markdown 为主源格式，并导出为 PDF、HTML、PPTX、DOCX 等格式供汇报与发布使用。

项目不包含传统软件代码库（无 `pyproject.toml`、`package.json`、`Cargo.toml` 等），其"架构"体现为**内容生产流水线**与**资料组织规范**，而非运行时服务。

---

## 目录结构与模块划分

```text
.
├── agentic-ai-head-cpu-insight-2025h2plus.md      # 原始洞察报告（较短版本）
├── agentic-ai-head-cpu-insight-unified.md         # 统一长报告（未拆章版本）
├── agentic-ai-kv-offload-cpu-insight.md           # KV 卸载专题子报告
├── agentic-ai-kv-offload-cpu-insight.{pdf,docx}   # 子报告导出格式
│
├── assets/                                          # 全项目共享图表与插图
│   ├── *.svg / *.png / *.webp / *.jpg             # 报告引用的架构图、数据图
│   ├── infercept.pdf                               # 论文本地存档
│   └── extracted/ / extracted-new/                # 从 PDF 提取的截图
│
├── cited-materials/                                 # 一手资料本地镜像（PDF/Markdown）
│   ├── sources-index.md                            # 本地存档与原始 URL 对照表
│   └── *.pdf                                       # Chrome 打印版网页或论文 PDF
│
├── material/                                        # 研究过程工作稿与过程资产
│   ├── search-directions.md                        # 研究方向账本（ Deep Research Skill 产出）
│   ├── reading-log.md                              # 阅读过滤日志（ Deep Research Skill 产出）
│   ├── agentic-ai-cpu-research-report.md           # 阶段性研究报告（过程稿）
│   └── reference-bibliography-table.md             # 经筛选后的参考文献总表
│
├── review-expansion-workspace/                      # Review Section Expander Skill 工作区
│   └── agentic-ai-head-cpu-comprehensive/
│       ├── source.md / source-input.md             # 待拆分的原始 Markdown
│       ├── chapters/                               # 按二级标题拆分的独立章节
│       │   ├── 00-frontmatter.md
│       │   ├── 01-摘要.md
│       │   ├── 02-总论.md
│       │   ├── ...
│       │   ├── manifest.md                         # 章节顺序清单
│       │   └── 14-参考文献.md
│       ├── rebuilt.md                              # 章节扩展后重新组装的完整报告
│       ├── rebuilt.{html,pdf}                      # 导出格式
│       └── agentic-ai-head-cpu-dense-deck.{md,pptx} # 高信息密度汇报稿
│
└── skills/                                          # 本项目使用的 AI Agent Skill 定义
    ├── deep-research-search-materials/
    │   └── SKILL.md                                # 深度调研流程规范
    └── review-section-expander/
        ├── SKILL.md                                # 长文拆分-扩展-重组流程规范
        └── scripts/
            ├── split_markdown_review.py            # 按 ## 标题拆分 Markdown
            └── assemble_markdown_review.py         # 按 manifest 顺序重组 Markdown
```

### 关键目录说明

| 目录 | 用途 | 修改建议 |
|---|---|---|
| `assets/` | 全项目共享的图表、插图、PDF 截图 | 新增图片时统一放此处，引用用相对路径 `assets/xxx` |
| `cited-materials/` | 一手资料本地镜像，用于离线核对与证据溯源 | 新增来源时必须在 `sources-index.md` 登记 |
| `material/` | 调研过程资产，属于"审计线索" | 方向账本和阅读日志应随调研进度实时更新 |
| `review-expansion-workspace/` | 长文扩展工作区 | 每轮扩展前复制源文件到 `source-input.md`，扩展后产出 `rebuilt.md` |
| `skills/` | Agent Skill 定义与辅助脚本 | 修改 Skill 规范需谨慎，因其影响整个工作流 |

---

## 技术栈与工具链

本项目不依赖传统软件运行时，其"技术栈"由内容生产工具与 Agent 工作流构成：

| 层级 | 工具/规范 | 说明 |
|---|---|---|
| 主源格式 | **Markdown** (GitHub Flavored + YAML frontmatter) | 所有报告的唯一主源；`pandoc` 风格 frontmatter |
| 辅助脚本 | **Python 3** | 仅用于 Markdown 拆分与重组（见 `skills/review-section-expander/scripts/`） |
| 导出工具 | **Pandoc**（推断） | 用于将 Markdown 导出为 PDF、HTML、DOCX、PPTX |
| 版本控制 | **Git** | 项目使用 Git 进行版本管理（虽未显式配置 CI） |
| 语言 | **中文（zh-CN）** | 所有报告、注释、工作稿的主要自然语言 |

### 辅助脚本用法

拆分 Markdown（按 `##` 二级标题拆章）：

```bash
python3 skills/review-section-expander/scripts/split_markdown_review.py \
  source.md \
  review-expansion-workspace/xxx/
```

重组 Markdown（按 `chapters/` 内 `NN-*.md` 文件名排序）：

```bash
python3 skills/review-section-expander/scripts/assemble_markdown_review.py \
  review-expansion-workspace/xxx/chapters/ \
  review-expansion-workspace/xxx/rebuilt.md
```

---

## 内容开发工作流

本项目采用两种 Agent Skill 驱动的工作流：

### 工作流一：深度调研（Deep Research）

由 `skills/deep-research-search-materials/SKILL.md` 规范，产出三件过程资产：

1. **`material/search-directions.md`** — 研究方向账本
   - 初始至少定义 10 个独立研究方向（direction_id: D01, D02...）
   - 每个方向记录：标签、重要性、起始查询、预期来源类型、状态
   - 完成每个方向后必须写 **Reflection**：学到了什么、还缺什么、是否新增方向

2. **`material/reading-log.md`** — 阅读过滤日志
   - 每份 inspected 来源分配 source_id（S001, S002...）
   - 记录：方向关联、标题、日期、类型、处理结论（kept / rejected / maybe）、保留或拒绝理由、关键数据

3. **最终报告** — 基于 kept sources 的综合报告

### 工作流二：综述扩展（Review Section Expander）

由 `skills/review-section-expander/SKILL.md` 规范，用于将单块长报告升级为高质量分章综述：

1. **复制源文件**：将待扩展的报告复制到 `review-expansion-workspace/xxx/source-input.md`
2. **拆分**：用 `split_markdown_review.py` 按 `##` 拆分为 `chapters/NN-标题.md`
3. **逐章扩展**：对每章回答四个问题：
   - 主张是什么？
   - 机制上为什么成立？
   - 有什么证据支撑？
   - 哪些是推断、哪些是直接证据？
4. **重组**：用 `assemble_markdown_review.py` 合并为 `rebuilt.md`
5. **导出**：通过 Pandoc 转为 PDF / HTML / PPTX

---

## 写作与引用规范

### 语言与风格

- **主要语言**：简体中文（zh-CN）。所有正式报告、工作稿、注释均使用中文。
- **术语处理**：技术术语首次出现时给出英文原名，后续可混用。例如：`KV cache offloading（KV 缓存卸载）`。
- **数字与单位**：数字与百分号、单位之间不加空格（如 `1.2TB/s`、`85%-97%`），但表格内保持对齐即可。
- **语气**：技术综述体，避免营销语言；结论必须有证据支撑，推断必须标明。

### 证据与引用

- **引用格式**：正文内使用方括号编号，如 `[1][2]`；参考文献章节按编号列出完整信息。
- **来源优先级**：
  - 一级：论文、官方技术博客、官方文档、官方仓库、标准/架构材料
  - 二级：高质量产业分析（仅用于发现术语或生态信号）
- **排除规则**：纯营销文案、不提供机制/数据/部署含义的二手转述、仅讨论 CPU 作为工具沙箱的材料。
- **日期边界**：主体证据优先采用 `2025-07-01` 及之后公开发布的资料；更优先 `2025-01-01` 及之后。

### 图片与图表

- 图片统一放在 `assets/` 或工作区 `assets/` 子目录下。
- Markdown 中引用格式：
  ```markdown
  <img src="assets/xxx.webp" alt="描述文字" width="760">
  ```
- 每张图下方必须有**图注**，说明图的内容、来源文献及日期。
- 从 PDF 提取的截图放在 `assets/extracted/` 或 `assets/extracted-new/`。

### 文件命名约定

- 报告文件：`agentic-ai-{主题}-{类型}.md`
- 日期标注：报告头部 YAML frontmatter 或首行标注 `Updated: YYYY-MM-DD`
- 工作稿：`{描述}.md`，放在 `material/` 下

---

## 质量检查清单（Final QA）

在将任何报告标记为完成并导出前，必须确认：

- [ ] 章节顺序与 `manifest.md` 一致，无遗漏或重复
- [ ] 图号连续，无重复或跳号
- [ ] 没有仅含断言而无解释的章节
- [ ] 所有量化声明（百分比、倍数、延迟数字）均有引用来源
- [ ] 没有“图墙”——每张图后都有文字解释其含义与证据价值
- [ ] 推断性语言已明确标记（如“基于这些资料，可以做出一个稳健推断”）
- [ ] 参考文献表格中的 URL 或本地路径可访问
- [ ] `sources-index.md` 与 `reading-log.md` 中的 kept sources 一致

---

## 安全与敏感信息注意事项

- 本项目**不含密钥、Token、密码或私有 API 凭据**。
- `cited-materials/` 中的 PDF 为公开网页的 Chrome 打印版或公开论文，不涉及版权问题之外的敏感内容。
- 所有报告基于公开资料撰写，不构成投资建议或机密信息。
- 修改任何文件时，**不要**将临时文件、备份文件或含有个人敏感信息的文件提交到版本控制。

---

## 快速参考：常用操作

| 操作 | 命令/方法 |
|---|---|
| 拆分长报告为章节 | `python3 skills/review-section-expander/scripts/split_markdown_review.py <源文件> <输出目录>` |
| 重组章节为完整报告 | `python3 skills/review-section-expander/scripts/assemble_markdown_review.py <chapters目录> <输出文件>` |
| 新增引用来源 | 1. 下载/保存到 `cited-materials/`；2. 登记到 `sources-index.md`；3. 记录到 `reading-log.md` |
| 新增图表 | 放入 `assets/` 或对应工作区 `assets/`；在 Markdown 中用相对路径引用；必须附图注 |
| 导出 PDF/HTML | 使用 Pandoc（具体参数需根据模板调整，项目中未硬编码） |

---

## 给 AI 助手的特别提示

1. **不要假设这是一个传统软件项目**。没有单元测试、没有服务部署、没有依赖管理。你的任务是帮助生产、整理和审校**结构化知识文档**。
2. **严格遵循中文写作规范**。除非引用英文原文，否则所有新增内容应使用简体中文。
3. **保持证据链完整**。新增任何主张时，必须同步更新 `reading-log.md` 或参考文献表，确保“结论—来源—本地存档”三者对应。
4. **优先复用现有工作流**。如果需要扩展报告，优先使用 `review-expansion-workspace/` 的拆章-扩写-重组模式，而非在单一文件中不断追加。
5. **区分过程稿与交付稿**：
   - `material/` 和 `reading-log.md` 属于**过程稿**，允许记录中间推断、待确认信息。
   - 根目录下的 `agentic-ai-*.md` 和 `rebuilt.md` 属于**交付稿**，要求结论收紧、引用准确、表述审慎。
