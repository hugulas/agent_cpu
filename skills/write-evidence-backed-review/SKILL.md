---
name: write-evidence-backed-review
description: Use when the user wants to turn existing notes, chapter drafts, review comments, local source materials, and figure assets into a stronger long-form technical review with explicit claim-mechanism-evidence structure, accepted/rejected comment handling, figure-caption discipline, and a rebuilt final draft.
---

# Write Evidence-Backed Review

Use this skill when the user already has draft material and wants a serious综述稿 rather than a quick summary. The job is to convert scattered claims, comments, and local assets into a chaptered review where each important judgment is supported by nearby numbers, citations, or figures.

This skill starts from the local corpus. If evidence gaps are still too large after scanning local files, use `deep-research-search-materials`. If the draft is still a monolithic Markdown file, reuse `review-section-expander`.

## Outcome

Produce or update these artifacts unless the user asks otherwise:

1. a review workspace
2. `subchapter-support-plan.md`
3. `subchapter-support-ledger.md`
4. `comments/` dispositions when reviewer comments exist
5. `subchapters/` chapter drafts
6. `rebuilt.md`

## Workspace Pattern

Prefer this layout:

```text
review-<topic>-<date>/
└── review-expansion-workspace/
    ├── source.md
    ├── rebuilt.md
    ├── subchapter-support-plan.md
    ├── subchapter-support-ledger.md
    ├── comments/
    ├── subchapters/
    │   ├── 01-...
    │   └── manifest.md
    └── assets/
```

Keep the source draft intact when possible. Do expansion and comment processing in the workspace.

## Required Workflow

### 1. Frame the review task

Write down or infer:

- target report
- intended audience
- scope boundary
- date boundary
- preferred evidence types
- whether the user wants comment disposition only,正文修改 only, or both

State assumptions near the workspace plan if they were inferred.

### 2. Index the local corpus first

Before rewriting anything, scan the local workspace for:

- source drafts
- split chapters
- prior rebuilt drafts
- reviewer comments
- support ledgers
- extracted figures
- local papers, blogs, and cited-material mirrors

Do not treat local material as background noise. It is the default evidence pool and the first thing that must be reconciled.

### 3. Normalize the chapter structure

If the report is monolithic, split it with `scripts/split_markdown_review.py`.

If chapter files already exist:

- preserve their order with `subchapters/manifest.md`
- keep one chapter per file
- avoid writing new正文 after `参考文献`
- keep section order stable inside a chapter

For analytical chapters, a strong default order is:

1. `0. 判断表`
2. `1. 核心判断`
3. mechanism and evidence sections
4. `参考文献`

### 4. Create the support plan before editing

Create or refresh `subchapter-support-plan.md`.

For each subchapter record:

- the main claim or boundary
- source ids likely to support it
- target numbers to surface
- target figures or tables
- what should stay in this chapter versus be pushed to adjacent chapters

The plan should be concrete enough that chapter editing becomes an execution task rather than freeform brainstorming.

### 5. Expand chapter by chapter

For each major subsection, explicitly answer:

1. what is the claim
2. why it is true mechanistically
3. what evidence supports it
4. what is still inference rather than direct evidence

Default fixes:

- convert assertion-heavy prose into `判断 -> 机制 -> 数据/图 -> 含义`
- move duplicated paragraphs into one best location
- keep chapter boundaries sharp
- add transition sentences between adjacent chapters

Each core claim should have nearby support. Nearby means in the same paragraph block, adjacent sentence range, or immediately adjacent figure/table discussion.

### 6. Use reviewer comments as a first-class workflow

When `comments/` exists, process comments one by one inside the comment files.

For each comment, write:

- `处理结论：接受 / 部分接受 / 不接受新增修改`
- `说明`
- `修改记录`

Do this before editing正文 when the user asks for disposition first. After disposition is done, apply accepted and partially accepted items to the chapter files.

### 7. Enforce figure discipline

Figures are evidence objects, not decoration.

For each figure:

- make sure the caption says what judgment it supports
- when a figure is reused across chapters, rewrite the caption so the role is chapter-specific
- explain the figure in surrounding prose
- prefer local extracted figures or local asset files over ad hoc new images

If a chapter is visually thin, add a figure or a compact evidence table. If a figure cannot be explained in one sentence, do not add it.

### 8. Track execution with a ledger

Create or update `subchapter-support-ledger.md`.

For each chapter record:

- status
- main source ids used
- required figure/data/citation additions
- short completion note

Use explicit states such as `todo`, `in_progress`, `done`.

### 9. Rebuild and fix path context

After chapter edits, run `scripts/assemble_markdown_review.py` to produce `rebuilt.md`.

Then verify figure paths again. A path that is correct in `subchapters/` may be wrong in `rebuilt.md` because the relative base changes after reassembly.

### 10. Final QA

Before calling the review done, check:

- chapter order matches `manifest.md`
- no正文 appears after `参考文献`
- no duplicate or skipped figure numbering if the report numbers figures
- each quantitative claim has a citation
- each reused figure has a chapter-specific caption
- no “figure wall” without interpretation
- no orphan comments left unhandled

Use [review-final-checklist.md](references/review-final-checklist.md) when the draft is close to delivery.

## Boundaries and Escalation

- If the core problem is missing evidence rather than weak writing, switch into `deep-research-search-materials`.
- If the user only wants source downloading or local mirroring, use `download-reading-log-materials` instead.
- If the user asks only for one chapter rewrite, stay local to that chapter and update the ledger.

## Scripts and References

- For splitting and reassembly, use:
  - `../review-section-expander/scripts/split_markdown_review.py`
  - `../review-section-expander/scripts/assemble_markdown_review.py`
- For chapter-level expansion standards, read:
  - `../review-section-expander/references/chapter-expansion-checklist.md`
- For final delivery QA, read:
  - `references/review-final-checklist.md`
