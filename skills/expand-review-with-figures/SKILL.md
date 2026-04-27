---
name: expand-review-with-figures
description: Use when the user wants to strengthen a long technical review using existing local source materials, extracted paper figures, numeric claims, and chapter drafts so that each major subsection has explicit claim-mechanism-evidence support and a rebuilt final Markdown draft.
---

# Expand Review With Figures

Use this skill when the user already has a draft review and wants a stronger交付稿 with tighter evidence, more useful figures, and clearer causal explanation. The job is not just to add more text. It is to make each chapter stand up as `判断 -> 机制 -> 数据/图 -> 含义`.

If evidence is still missing after scanning the local corpus, switch into `deep-research-search-materials`. If the draft is still monolithic, reuse `review-section-expander`.

## Outcome

Produce or update these artifacts unless the user asks otherwise:

1. a chaptered review workspace
2. `subchapter-support-plan.md`
3. `subchapter-support-ledger.md`
4. updated `subchapters/`
5. `rebuilt.md`

## Workspace Pattern

Prefer this layout:

```text
review-<topic>-<date>/
└── review-expansion-workspace/
    ├── source.md
    ├── rebuilt.md
    ├── subchapter-support-plan.md
    ├── subchapter-support-ledger.md
    ├── subchapters/
    │   ├── 01-...
    │   └── manifest.md
    └── assets/
```

## Required Workflow

### 1. Start from the local corpus

Before searching the web or inventing new structure, scan:

- existing chapter drafts
- prior rebuilt drafts
- support plans and ledgers
- local cited materials
- extracted figures
- numeric claims already surfaced in notes

The default assumption is that the local corpus already contains most of the usable evidence and only needs to be reorganized and attached more tightly to claims.

### 2. Normalize chapter structure

If the source is monolithic, split it with `../review-section-expander/scripts/split_markdown_review.py`.

If chapter files already exist:

- preserve order with `subchapters/manifest.md`
- keep one chapter per file
- avoid正文 after `参考文献`
- keep section order stable

For analytical chapters, a strong default is:

1. `0. 判断表`
2. `1. 核心判断`
3. mechanism and evidence sections
4. `参考文献`

### 3. Make a support plan before editing

Create or refresh `subchapter-support-plan.md`.

For each chapter record:

- main judgment
- likely source ids
- key numbers to surface
- target figures or tables
- chapter boundary with adjacent sections

Prefer a concrete plan over freeform chapter-by-chapter improvisation.

### 4. Expand chapter by chapter

For each major subsection, answer:

1. what is the claim
2. why it is true mechanistically
3. what figure, number, or citation supports it
4. what implication follows

Default fixes:

- split dense summary paragraphs into claim, mechanism, and implication
- move duplicated material into one best chapter
- convert unsupported language into citation-backed statement or marked inference
- add transition sentences between adjacent chapters

### 5. Use figures as evidence objects

Every chapter should have enough visual support for its central argument.

Preferred figure jobs:

- topology or pipeline
- slowdown or bottleneck evidence
- state flow or lifecycle
- algorithmic mechanism
- industrial platform or deployment signal

Rules:

- each figure caption must say what judgment it supports
- reused figures must get chapter-specific captions
- surrounding prose must explain why the figure matters
- if no good figure exists, use a compact evidence table instead

### 6. Track progress in a ledger

Create or update `subchapter-support-ledger.md`.

For each chapter record:

- status
- source ids used
- figure/data/citation additions required
- short completion note

Use explicit states such as `todo`, `in_progress`, `done`.

### 7. Rebuild and fix path context

After chapter edits, rebuild with:

- `../review-section-expander/scripts/assemble_markdown_review.py`

Then verify asset paths again. Paths valid inside `subchapters/` may break in `rebuilt.md` because the relative base changes.

### 8. Final QA

Before finishing, verify:

- chapter order matches `manifest.md`
- each major judgment has nearby evidence
- quantitative claims are cited
- no正文 remains after `参考文献`
- reused figures have chapter-specific captions
- no “figure wall” without interpretation
- rebuilt figure paths resolve

## When To Escalate

- If the real blocker is evidence discovery, use `deep-research-search-materials`
- If the job is mostly source mirroring, use `download-reading-log-materials`
- If the job is mostly comment triage, use `handle-review-comments`

## References

- For splitting and reassembly:
  - `../review-section-expander/scripts/split_markdown_review.py`
  - `../review-section-expander/scripts/assemble_markdown_review.py`
- For chapter expansion standards:
  - `../review-section-expander/references/chapter-expansion-checklist.md`
- For final QA:
  - `references/review-final-checklist.md`
