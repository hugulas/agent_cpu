---
name: review-section-expander
description: Use when a long Markdown review or report needs to be split into chapter files and then expanded section by section with clearer causal explanation, more evidence, more citations, and more figures before being reassembled into a stronger final draft.
---

# Review Section Expander

Use this skill when the user has a monolithic review/report and wants a higher-quality version by expanding each chapter separately.

## What This Skill Does

- Splits one long Markdown review into smaller chapter files
- Preserves chapter order for later reassembly
- Forces per-chapter expansion instead of piling more claims into one giant file
- Raises the bar on:
  - explaining `why`, not just stating conclusions
  - attaching citations to causal claims
  - adding figures/tables where a chapter is too text-heavy
  - keeping a clear chapter purpose and evidence chain

## Workflow

### 1. Copy the source review into a workspace

Keep the original source untouched when possible.

Recommended workspace layout:

```text
review-expansion-workspace/
├── source.md
├── chapters/
│   ├── 00-frontmatter.md
│   ├── 01-...
│   └── manifest.md
└── rebuilt.md
```

### 2. Split by level-2 headings

Use `scripts/split_markdown_review.py` to split the source file by `##` headings.

Rules:

- Preserve YAML frontmatter and title in `00-frontmatter.md`
- Create one file per level-2 chapter
- Generate a `chapters/manifest.md` with chapter order and source heading names

### 3. Expand one chapter at a time

When revising a chapter, do not just add more claims. For each major subsection, explicitly answer:

1. What is the claim?
2. Why is it true mechanistically?
3. What evidence supports it?
4. What is still inference versus directly supported?

### 4. Raise evidence quality

For each chapter:

- Add direct citations to causal or quantitative claims
- Prefer one figure/table per major section when the chapter is visually thin
- When a chapter already has a figure, make sure the caption explains why the figure matters
- Convert unsupported summary language into either:
  - cited statement
  - explicitly marked inference
  - open question

### 5. Reassemble

Use `scripts/assemble_markdown_review.py` after chapter edits.

### 6. Final QA

Before export, check:

- chapter order intact
- no duplicate or skipped figure numbers
- no chapters that are only assertions without explanation
- no uncited quantitative claims
- no “figure walls” without interpretation

## When To Add More Detail

Expand a chapter when it has any of these problems:

- many claims but weak explanation
- lots of conclusions and too little mechanism
- citations only at paragraph ends instead of tied to the exact claim
- only one figure for a chapter carrying multiple major arguments
- a “summary tone” where the user asked for a full review

## References

- For chapter expansion standards, read `references/chapter-expansion-checklist.md`.
- For file operations, use `scripts/split_markdown_review.py` and `scripts/assemble_markdown_review.py`.
