#!/usr/bin/env python3
import argparse
import re
from pathlib import Path


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^\w\u4e00-\u9fff]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text or "section"


def parse_frontmatter_and_body(text: str):
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            frontmatter = text[: end + 5]
            body = text[end + 5 :].lstrip("\n")
            return frontmatter, body
    return "", text


def split_sections(body: str):
    lines = body.splitlines(keepends=True)
    preamble = []
    sections = []
    current_title = None
    current_lines = []

    for line in lines:
        if line.startswith("## "):
            if current_title is None:
                current_title = line[3:].strip()
                current_lines = [line]
            else:
                sections.append((current_title, "".join(current_lines)))
                current_title = line[3:].strip()
                current_lines = [line]
        else:
            if current_title is None:
                preamble.append(line)
            else:
                current_lines.append(line)

    if current_title is not None:
        sections.append((current_title, "".join(current_lines)))

    return "".join(preamble), sections


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source")
    parser.add_argument("output_dir")
    args = parser.parse_args()

    source = Path(args.source)
    output_dir = Path(args.output_dir)
    chapters_dir = output_dir / "chapters"
    chapters_dir.mkdir(parents=True, exist_ok=True)

    text = source.read_text(encoding="utf-8")
    frontmatter, body = parse_frontmatter_and_body(text)
    preamble, sections = split_sections(body)

    frontmatter_text = frontmatter
    if preamble.strip():
        frontmatter_text += preamble
    (output_dir / "source.md").write_text(text, encoding="utf-8")
    (chapters_dir / "00-frontmatter.md").write_text(frontmatter_text, encoding="utf-8")

    manifest_lines = [
        "# Chapter Manifest\n",
        "\n",
        f"- Source: `{source}`\n",
        f"- Chapters: `{len(sections)}`\n",
        "\n",
        "| Order | File | Heading |\n",
        "| --- | --- | --- |\n",
    ]

    for idx, (title, content) in enumerate(sections, start=1):
        filename = f"{idx:02d}-{slugify(title)}.md"
        (chapters_dir / filename).write_text(content, encoding="utf-8")
        manifest_lines.append(f"| {idx} | `{filename}` | `{title}` |\n")

    (chapters_dir / "manifest.md").write_text("".join(manifest_lines), encoding="utf-8")


if __name__ == "__main__":
    main()
