#!/usr/bin/env python3
import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("chapters_dir")
    parser.add_argument("output")
    args = parser.parse_args()

    chapters_dir = Path(args.chapters_dir)
    output = Path(args.output)

    parts = []
    frontmatter = chapters_dir / "00-frontmatter.md"
    if frontmatter.exists():
        parts.append(frontmatter.read_text(encoding="utf-8").rstrip() + "\n\n")

    for path in sorted(chapters_dir.glob("[0-9][0-9]-*.md")):
        if path.name == "00-frontmatter.md":
            continue
        parts.append(path.read_text(encoding="utf-8").rstrip() + "\n\n")

    output.write_text("".join(parts).rstrip() + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
