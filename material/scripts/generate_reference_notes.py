#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path


ROOT = Path("/home/hugulas/agent_tool_modeling/kv")
MATERIAL = ROOT / "material"
REF_TABLE = MATERIAL / "reference-bibliography-table.md"
EXTRACTION_LEDGER = ROOT / "assets" / "extraction-ledger.json"
FIG_ROOT = ROOT / "assets" / "extracted-figures-all"
CITED = ROOT / "cited-materials"
OUT_DIR = MATERIAL / "reference-notes"
LEDGER_OUT = MATERIAL / "reference-notes-ledger.md"
INDEX_OUT = MATERIAL / "reference-notes-index.md"
FALLBACK_DIR = ROOT / "assets" / "reference-note-fallbacks"


TOPIC_FRAME = (
    "agentic AI 推理负载如何改变 AI CPU 作为大模型推理服务控制面的职责，"
    "重点只看 CPU 为推理请求服务的场景，不纳入工具调用沙箱本身的 CPU 消耗。"
)


THEME_HINTS = {
    "D02": "底层调度与 CPU slowdown，解释 host 侧抖动为什么会被多 GPU 同步链放大。",
    "D03": "Prefill/Decode 分离与 Prefill-as-a-Service，解释 CPU 为什么从本地阶段调度扩展到跨池控制。",
    "D04": "KV lifecycle、稀疏访问与 offload，解释 CPU 为什么从搬运者变成状态生命周期管理者。",
    "D05": "MoE serving 的 route/place/move 链，解释 CPU 为什么需要承担 expert residency 协调。",
    "D06": "传输栈与 control plane，解释 CPU 怎样与 KV transfer、元数据交换和跨池放置结合。",
    "D07": "真实产品工作负载形态，解释 session multiplicity、fan-out/fan-in 和 multimodal ingress 为什么重要。",
    "D08": "平台与产品路线图，解释厂商如何围绕 orchestration/data movement 设计 AI 机头 CPU。",
    "D10": "Benchmark 与评测框架，解释传统通用指标为什么不足以测出 AI CPU 的真实作用。",
    "D11": "反方与边界条件，解释哪些场景下 CPU 不是唯一或首要瓶颈。",
    "D12": "Prefix cache、cache affinity、retention 和 event-driven reuse，解释状态复用控制面如何形成。",
    "D13": "Reduced-KV / hybrid attention，解释模型结构变化为什么会抬高调度正确性的价值。",
    "D14": "非 NVIDIA 体系的 control plane 演化，验证结论是否跨生态成立。",
    "D15": "KV reuse policy、早复用与 eviction，解释细粒度缓存策略如何进入工业 serving。",
    "D16": "MoE 动态平衡、wide expert parallelism 与 prefetch，解释热点专家为什么把 CPU 推到前台。",
    "D17": "图化编译与运行时图化，解释 dispatch tax 下降与服务化代价之间的取舍。",
}

SOURCE_OVERRIDES = {
    "S002": "nvidia-disaggregated-llm-k8s-2026-03-23.pdf",
    "S032": "storagereview-vera-rubin-ces-2026.pdf",
}


FIGURE_KEYWORDS = [
    "architecture",
    "arch",
    "overview",
    "workflow",
    "framework",
    "main",
    "summary",
    "heatmap",
    "throughput",
    "latency",
    "speedup",
    "routing",
    "cache",
    "memory",
    "breakdown",
]


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def parse_ref_table(path: Path) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("| "):
            continue
        if line.startswith("| ---"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) != 7:
            continue
        if cells[0] == "source_id":
            continue
        rows.append(
            {
                "source_id": cells[0],
                "direction_id": cells[1],
                "title": cells[2],
                "date": cells[3],
                "type": cells[4],
                "purpose": cells[5],
                "evidence": cells[6],
            }
        )
    return rows


def load_extraction_ledger(path: Path) -> tuple[dict[str, dict], dict[str, dict]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    out = {}
    by_pdf = {}
    for item in data.get("items", []):
        source_id = item.get("source_id", "")
        output_dir = item.get("output_dir", "")
        pdf_name = item.get("pdf_name", "")
        record = {
            "output_dir": output_dir,
            "pdf_name": pdf_name,
            "status": item.get("status", ""),
            "figures_count": item.get("figures_count", 0),
        }
        if pdf_name:
            by_pdf[pdf_name] = record
        # Keep only exact source_id matches here; generic buckets are handled later.
        if source_id.startswith("S"):
            out[source_id] = record
    return out, by_pdf


def find_local_source(row: dict[str, str], extraction_map: dict[str, dict]) -> Path | None:
    sid = row["source_id"]
    sid_lower = sid.lower()
    override = SOURCE_OVERRIDES.get(sid)
    if override:
        candidate = CITED / override
        if candidate.exists():
            return candidate
    direct = sorted(CITED.glob(f"{sid_lower}*"))
    if direct:
        return direct[0]
    entry = extraction_map.get(sid)
    if entry and entry.get("pdf_name"):
        candidate = CITED / entry["pdf_name"]
        if candidate.exists():
            return candidate
    title = row["title"].lower()
    matches: list[Path] = []
    for file in CITED.iterdir():
        if not file.is_file():
            continue
        name = file.name.lower()
        if "anthropic" in title and "anthropic" in name:
            matches.append(file)
        elif "claude code" in title and "claude" in name:
            matches.append(file)
        elif "agent swarm" in title and "swarm" in name:
            matches.append(file)
        elif "mobile use agent" in title and "mobile-use-agent" in name:
            matches.append(file)
        elif "openclaw" in title and "openclaw" in name:
            matches.append(file)
        elif "vera" in title and "vera" in name:
            matches.append(file)
        elif "grace" in title and "grace" in name:
            matches.append(file)
        elif "tensorrt" in title and "tensorrt" in name:
            matches.append(file)
        elif "vllm" in title and "vllm" in name:
            matches.append(file)
        elif "ray" in title and "ray" in name:
            matches.append(file)
        elif "digitalocean" in title and "digitalocean" in name:
            matches.append(file)
        elif "lmcache" in title and "lmcache" in name:
            matches.append(file)
        elif "kimi k2.5" in title and "k2-5" in name:
            matches.append(file)
    if matches:
        return sorted(matches)[0]
    title_tokens = {
        tok
        for tok in re.findall(r"[a-z0-9]+", title)
        if len(tok) >= 4 and tok not in {"with", "from", "into", "this", "that", "current", "official", "technical", "blog", "paper", "docs"}
    }
    scored: list[tuple[int, Path]] = []
    for file in CITED.iterdir():
        if not file.is_file():
            continue
        name_tokens = set(re.findall(r"[a-z0-9]+", file.name.lower()))
        overlap = len(title_tokens & name_tokens)
        if overlap >= 2:
            scored.append((overlap, file))
    if scored:
        scored.sort(key=lambda x: (-x[0], x[1].name))
        return scored[0][1]
    return None


def score_figure(path: Path) -> tuple[int, str]:
    name = path.name.lower()
    score = 0
    for idx, key in enumerate(FIGURE_KEYWORDS):
        if key in name:
            score += 100 - idx
    if re.search(r"page_\d+", name):
        score -= 10
    return (score, name)


def render_pdf_fallback(local_source: Path, source_id: str) -> list[Path]:
    if local_source.suffix.lower() != ".pdf":
        return []
    FALLBACK_DIR.mkdir(parents=True, exist_ok=True)
    out_base = FALLBACK_DIR / f"{source_id.lower()}-page1"
    target = out_base.with_suffix(".png")
    if not target.exists():
        try:
            subprocess.run(
                [
                    "pdftoppm",
                    "-f",
                    "1",
                    "-singlefile",
                    "-png",
                    str(local_source),
                    str(out_base),
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        except Exception:
            return []
    return [target] if target.exists() else []


def find_figures(
    row: dict[str, str],
    extraction_map: dict[str, dict],
    extraction_by_pdf: dict[str, dict],
    local_source: Path | None,
) -> list[Path]:
    sid = row["source_id"]
    candidates: list[Path] = []
    entry = extraction_map.get(sid)
    if entry:
        candidate_dir = ROOT / entry["output_dir"]
        if candidate_dir.exists():
            candidates.extend(sorted(p for p in candidate_dir.iterdir() if p.is_file()))
    if local_source is not None:
        pdf_entry = extraction_by_pdf.get(local_source.name)
        if pdf_entry:
            candidate_dir = ROOT / pdf_entry["output_dir"]
            if candidate_dir.exists():
                pdf_stem = local_source.stem.lower()
                filtered = sorted(
                    p for p in candidate_dir.iterdir()
                    if p.is_file() and pdf_stem[:24] in p.name.lower()
                )
                if filtered:
                    candidates.extend(filtered)
                else:
                    candidates.extend(sorted(p for p in candidate_dir.iterdir() if p.is_file()))
    for variant in [sid, sid.lower(), sid.upper()]:
        candidate_dir = FIG_ROOT / variant
        if candidate_dir.exists():
            candidates.extend(sorted(p for p in candidate_dir.iterdir() if p.is_file()))
    # dedupe while preserving score ranking later
    seen = set()
    unique: list[Path] = []
    for p in candidates:
        if p not in seen:
            seen.add(p)
            unique.append(p)
    unique.sort(key=score_figure, reverse=True)
    if unique:
        return unique[:3]
    if local_source is not None:
        return render_pdf_fallback(local_source, sid)
    return []


def figure_caption(path: Path) -> str:
    name = path.stem.lower()
    if "arch" in name or "architecture" in name or "framework" in name or "workflow" in name:
        return "这张图更适合用来看系统分层、状态流动路径或控制面边界。"
    if "heatmap" in name or "summary" in name or "breakdown" in name:
        return "这张图更适合用来看瓶颈归因、热点分布或不同组件的相对贡献。"
    if "throughput" in name or "speedup" in name or "latency" in name:
        return "这张图更适合用来判断该方案的收益出现在哪个维度，以及收益是否受输入长度、批量或上下文规模影响。"
    if "cache" in name or "memory" in name or "routing" in name:
        return "这张图更适合用来看缓存命中、状态放置、路由倾向或内存层级设计。"
    return "这张图可作为该材料的代表性图示，用来辅助理解其核心机制或主要实验结果。"


def relative_link(target: Path, base: Path) -> str:
    return target.relative_to(base)


def write_note(
    row: dict[str, str],
    extraction_map: dict[str, dict],
    extraction_by_pdf: dict[str, dict],
) -> tuple[Path, int, str]:
    sid = row["source_id"]
    slug = slugify(row["title"])[:80]
    out_path = OUT_DIR / f"{sid.lower()}-{slug}.md"
    local_source = find_local_source(row, extraction_map)
    figures = find_figures(row, extraction_map, extraction_by_pdf, local_source)
    theme = THEME_HINTS.get(row["direction_id"], "该材料用于补强 AI CPU 在 agentic inference 下的服务控制面角色。")
    extraction_entry = extraction_map.get(sid)
    if not extraction_entry and local_source is not None:
        extraction_entry = extraction_by_pdf.get(local_source.name)
    extraction_status = extraction_entry.get("status", "not_indexed") if extraction_entry else "not_indexed"
    figures_count = extraction_entry.get("figures_count", len(figures)) if extraction_entry else len(figures)
    local_source_line = (
        f"- 本地材料：`{local_source.relative_to(ROOT)}`" if local_source else "- 本地材料：`未在 cited-materials 中直接匹配到单独文件`"
    )
    fig_dir_line = ""
    if figures:
        fig_dir_line = f"- 图像来源目录：`{figures[0].parent.relative_to(ROOT)}`"
    body: list[str] = []
    body.append(f"# {sid} 笔记：{row['title']}\n")
    body.append("## 基本信息\n")
    body.append(f"- `source_id`：`{sid}`")
    body.append(f"- `direction_id`：`{row['direction_id']}`")
    body.append(f"- 日期：`{row['date']}`")
    body.append(f"- 类型：`{row['type']}`")
    body.append(local_source_line)
    body.append(f"- 提图状态：`{extraction_status}`")
    body.append(f"- 可用图片数：`{figures_count}`")
    if fig_dir_line:
        body.append(fig_dir_line)
    body.append("")
    body.append("## 与本课题的关系\n")
    body.append(
        f"这篇材料放到当前主题下的价值，不是孤立地讨论某个模型或系统技巧，而是帮助回答：**{TOPIC_FRAME}**"
    )
    body.append("")
    body.append(f"就当前综述框架而言，它最直接补强的是：{theme}")
    body.append("")
    body.append("## 核心判断\n")
    body.append(f"{row['purpose']}。")
    body.append("")
    body.append("更具体地说，这篇材料对“agentic AI 推理负载如何改变 AI CPU 职责”的启发主要有三层：")
    body.append(f"1. 它说明了什么问题正在从 GPU 内部计算转移为 host/control-plane 问题：{row['purpose']}。")
    body.append(f"2. 它给出了哪类硬证据或定量迹象：{row['evidence']}。")
    body.append("3. 它对工程判断的意义在于：CPU 不只是陪跑，而是在请求排队、状态放置、缓存复用、阶段切换或跨池协调中承担持续决策责任。")
    body.append("")
    body.append("## 关键证据\n")
    body.append(f"- 主要用途：{row['purpose']}")
    body.append(f"- 关键证据/数据：{row['evidence']}")
    if local_source:
        body.append(f"- 建议回看原文时优先关注：`{local_source.name}` 中与 `{row['direction_id']}` 对应的图、表或系统示意。")
    body.append("")
    body.append("## 图文笔记\n")
    if figures:
        for fig in figures:
            rel = Path("../../") / fig.relative_to(ROOT)
            body.append(f"### 图：`{fig.name}`\n")
            body.append(f"![{fig.name}]({rel.as_posix()})\n")
            body.append(figure_caption(fig))
            body.append("")
            body.append(
                "结合本课题去读这张图时，建议重点看它是否揭示了以下至少一项："
            )
            body.append("- 控制面是否被前移到 CPU/host；")
            body.append("- 状态对象是否需要被保留、转移、预取或路由；")
            body.append("- 收益是否来自 dispatch、cache、bandwidth、placement 或 synchronization 的改善。")
            body.append("")
    else:
        body.append("当前没有在提图账本中找到这篇材料的单独图片目录，因此这份笔记先保留文本分析；后续若补提图，可直接在此节追加。")
        body.append("")
    body.append("## 综述写作时可直接复用的提炼\n")
    body.append(
        f"- 对主线判断的贡献：{row['purpose']}。"
    )
    body.append(
        f"- 最适合落在综述中的位置：`{row['direction_id']}` 相关章节，用来支撑“{theme}”这一类论证。"
    )
    body.append(
        "- 与其他材料的拼接方式：可与同方向的论文、官方博客和反方材料并列使用，形成“机制 -> 真实工作负载 -> 平台/部署 -> 边界条件”的闭环。"
    )
    body.append("")
    body.append("## 当前状态\n")
    body.append("- 状态：`done`")
    body.append("- 是否含图：`yes`" if figures else "- 是否含图：`no`")
    body.append("- 下一步：如需进一步精修，可在这份笔记上补充更细的图注、页码和与其他材料的对照关系。")
    body.append("")

    out_path.write_text("\n".join(body), encoding="utf-8")
    return out_path, len(figures), "done"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    rows = parse_ref_table(REF_TABLE)
    extraction_map, extraction_by_pdf = load_extraction_ledger(EXTRACTION_LEDGER)

    ledger_lines = [
        "# 参考资料图文笔记账本",
        "",
        "说明：",
        "",
        "- 本账本按 `reference-bibliography-table.md` 中的 `kept` 材料生成。",
        "- 每条记录对应一份“有图有文本”的单篇笔记，服务于同一主题：`agentic AI 推理负载特征对 AI CPU 的影响`。",
        "- `image_count` 表示本轮笔记实际嵌入的图片数，不等于提图目录中的全部图片数。",
        "",
        "| source_id | direction_id | 标题 | note_path | image_count | status |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    index_lines = [
        "# 参考资料图文笔记索引",
        "",
        "按研究方向分组，收录本主题下的单篇资料图文笔记。",
        "",
    ]
    grouped: dict[str, list[tuple[dict[str, str], Path]]] = {}

    for row in rows:
        note_path, image_count, status = write_note(row, extraction_map, extraction_by_pdf)
        rel_note = note_path.relative_to(MATERIAL)
        ledger_lines.append(
            f"| {row['source_id']} | {row['direction_id']} | {row['title']} | `{rel_note}` | {image_count} | `{status}` |"
        )
        grouped.setdefault(row["direction_id"], []).append((row, note_path))

    for direction_id in sorted(grouped):
        index_lines.append(f"## {direction_id}\n")
        for row, note_path in grouped[direction_id]:
            rel_note = note_path.relative_to(MATERIAL)
            index_lines.append(
                f"- [{row['source_id']} {row['title']}]({rel_note.as_posix()})"
            )
        index_lines.append("")

    LEDGER_OUT.write_text("\n".join(ledger_lines) + "\n", encoding="utf-8")
    INDEX_OUT.write_text("\n".join(index_lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
