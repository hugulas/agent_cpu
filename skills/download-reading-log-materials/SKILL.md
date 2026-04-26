---
name: download-reading-log-materials
description: Automatically download source materials listed in a reading-log Markdown file (where disposition is 'kept') to a local cited-materials directory. For web-based sources, uses Chromium headless to save the page as PDF and uses wget to archive the full webpage with images and media assets. Trigger when the user wants to bulk-download reference materials from a research reading log, archive web pages with their media, sync kept sources to local storage, or build a cited-materials mirror.
---

# Reading Log Material Downloader

## Purpose

根据 `reading-log.md` 中标记为 `kept` 的来源条目，批量下载原始材料到 `cited-materials/` 目录，建立本地一手资料存档。

对于网页类材料，同时使用两种方式保存：
- **Chromium headless** 打印为 PDF（与现有工作流一致）
- **wget --page-requisites** 下载完整网页（HTML + 图片/CSS/JS 等资源）

## Workflow

### Step 1: Prepare the Download Plan

1. 读取 `material/reading-log.md`，提取所有 `disposition == kept` 的条目
2. 检查 `cited-materials/` 目录，找出已存在的本地文件（避免重复下载）
3. 收集每个待下载条目的原始 URL：
   - 优先从 `cited-materials/sources-index.md` 查找匹配
   - 对于缺失 URL 的条目，使用 Web Search 搜索标题获取原始 URL
4. 生成 `download-plan.json`，格式如下：

```json
[
  {
    "source_id": "S001",
    "title": "Prefill-as-a-Service: KVCache of Next-Generation Models...",
    "url": "https://arxiv.org/abs/2504.xxxxx",
    "type": "paper abstract / discovery page",
    "filename": "s001-prefill-as-a-service-2026-04.pdf",
    "strategy": "auto"
  }
]
```

字段说明：

| 字段 | 必填 | 说明 |
|---|---|---|
| `source_id` | 是 | reading-log 中的来源编号 |
| `title` | 是 | 材料标题 |
| `url` | 是 | 原始 URL |
| `type` | 否 | reading-log 中的类型，用于自动推断 strategy |
| `filename` | 否 | 保存文件名，省略时自动生成 |
| `strategy` | 否 | `auto`（自动推断，默认）、`pdf`（直接下载）、`webpage`（Chromium PDF + wget 存档） |

**Strategy 自动推断规则**：
- URL 以 `.pdf` 结尾 → `pdf`
- URL 包含 `arxiv.org` → `pdf`（自动转换为 arxiv.org/pdf/xxx.pdf）
- type 包含 blog/article/doc/page/handbook/guide/summary → `webpage`
- type 包含 paper/abstract → `pdf`
- 其他 HTTP(S) URL → `webpage`

### Step 2: Execute Download

```bash
python skills/download-reading-log-materials/scripts/download_materials.py \
    --plan download-plan.json \
    --output-dir cited-materials/ \
    --media-dir cited-materials/web-archives/ \
    --report download-report.json
```

各 strategy 的下载行为：

| Strategy | PDF 生成 | 网页资源存档 | 适用场景 |
|---|---|---|---|
| `pdf` | wget/curl 直接下载 | 无 | 论文、ArXiv、已有 PDF 链接 |
| `webpage` | Chromium `--print-to-pdf` | wget `--page-requisites` 下载 HTML+图片+CSS+JS | 技术博客、官方文档、文章 |

**关于网页资源存档**：
- `wget --page-requisites` 会下载 HTML 及页面中引用的所有资源文件
- `--convert-links` 将 HTML 中的超链接改写为本地相对路径，支持离线浏览
- 存档目录结构：`{media-dir}/{source_id}/{hostname}/...`
- 若同一 source_id 的存档已存在（包含 .html 文件），wget 步骤会自动跳过

**关于 Chromium**：
- 脚本自动查找系统上的 Chromium/Chrome 可执行文件
- 也可通过 `--chromium-binary` 显式指定路径
- 若 Chromium 不可用，网页类材料仅执行 wget 存档，PDF 生成将失败并在报告中说明

### Step 3: Update sources-index.md

下载完成后，根据 `download-report.json` 中的成功条目，将新文件追加到 `cited-materials/sources-index.md`。

追加格式（与现有格式保持一致）：

```markdown
| `filename.pdf` | https://original-url | 下载方式说明；支撑内容简述 |
```

示例：
```markdown
| `s001-prefill-as-a-service-2026-04.pdf` | https://arxiv.org/pdf/2504.xxxxx.pdf | ArXiv PDF 直接下载；支撑 prefill-as-a-service 机制 |
| `s003-nvidia-dynamo-agentic-2026-04-17.pdf` | https://developer.nvidia.com/blog/... | Chrome 打印版网页 PDF；支撑 agentic inference 优化 |
```

### Step 4: Extract Images to assets/ (Optional)

如需将网页存档中的图片提取到 `assets/` 用于报告引用：

```bash
# 提取所有图片到 assets/（建议先按 source_id 子目录整理）
for sid in S001 S002 S003; do
    src_dir="cited-materials/web-archives/$sid"
    if [ -d "$src_dir" ]; then
        find "$src_dir" -type f \
            \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \
               -o -name "*.webp" -o -name "*.svg" -o -name "*.gif" \) \
            -exec cp {} assets/ \;
    fi
done
```

提取后建议重命名为有意义的名称并附图注。

## Script Reference

```
python download_materials.py \
    --plan PATH                 # 下载计划 JSON 文件（必填）
    --output-dir DIR            # PDF/直接下载输出目录（默认: cited-materials）
    --media-dir DIR             # 网页资源存档目录（默认: cited-materials/web-archives）
    --chromium-binary PATH      # Chromium 可执行文件路径（默认自动查找）
    --dry-run                   # 只显示计划，不实际下载
    --report PATH               # JSON 报告输出路径（默认: stdout）
    --skip-existing             # 跳过已存在的文件（默认开启）
```

## Requirements

- Python 3.7+
- Chromium / Google Chrome（用于网页 PDF 生成）
- wget（用于网页资源下载）
- curl（备用下载工具）

## Notes

- **反爬虫与动态内容**：wget 只能下载静态 HTML 中引用的资源；JavaScript 动态加载的图片可能不会被存档。Chromium 生成的 PDF 已包含渲染后的完整页面内容，可作为主要存档。
- **礼貌下载**：脚本在每次下载之间有 1 秒延迟，避免对目标服务器造成压力。
- **增量下载**：默认 `--skip-existing` 会跳过输出目录中已存在的文件。若需强制重新下载，可临时重命名或删除旧文件。
