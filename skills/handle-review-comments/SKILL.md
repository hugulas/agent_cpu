---
name: handle-review-comments
description: Use when the user wants to process review comments for a long Markdown report chapter by chapter, decide whether each comment is accepted, partially accepted, or rejected, record the rationale inside the comment files, and then apply accepted changes back into the draft.
---

# Handle Review Comments

Use this skill when the user already has reviewer comments and wants a disciplined处置流程 rather than ad hoc edits. The goal is to make every comment traceable: what was accepted, what was rejected, why, and what changed in the draft.

If the user only wants comment disposition, stop after updating the comment files. If the user also wants正文 changes, apply accepted and partially accepted items after disposition is complete.

## Outcome

Produce or update these artifacts unless the user asks otherwise:

1. `comments/` files with explicit dispositions
2. the affected chapter drafts
3. `rebuilt.md` if chapter files were changed

## Required Workflow

### 1. Map comments to target chapters

Before editing, identify:

- which comment files exist
- which chapter files they refer to
- whether comments are per-chapter or cross-chapter
- whether the user wants `处置记录`, `正文修改`, or both

Keep the mapping explicit so cross-chapter fixes do not drift.

### 2. Process comments one by one in place

Inside each comment file, record for every review point:

- `处理结论：接受 / 部分接受 / 不接受新增修改`
- `说明`
- `修改记录`

Rules:

- `接受`: the change should be applied as requested or in equivalent form
- `部分接受`: the core issue is valid but the exact fix should be narrowed
- `不接受新增修改`: no new draft change will be made; explain why

Do not leave raw reviewer bullets unanswered once the user asked for disposition.

### 3. Preserve scope boundaries

Do not accept a comment mechanically. Check whether it would:

- duplicate another chapter
- blur chapter boundaries
- introduce unsupported claims
- demand a figure that the local corpus cannot support
- require renumbering or restructuring beyond the user's requested scope

If so, prefer `部分接受` or `不接受新增修改` with a concrete explanation.

### 4. Apply accepted items to正文

After disposition, update the relevant chapter files.

Typical fixes:

- reorder sections into a stable analytical structure
- remove orphan正文 after `参考文献`
- tighten chapter boundaries
- add transition sentences
- rewrite figure captions to clarify chapter-specific role
- integrate duplicated but useful orphan material into formal sections

When one comment affects multiple chapters, make the shared fix once and then update the adjacent chapter boundary explicitly.

### 5. Rebuild if chapter files changed

If正文 changed, rebuild the combined draft with:

- `../review-section-expander/scripts/assemble_markdown_review.py`

Then recheck figure paths from the rebuilt file location.

### 6. Final QA

Before finishing, verify:

- every reviewed comment has a disposition
- accepted items are visible in正文
- partially accepted items explain the retained boundary
- rejected items explain why no new edit was made
- no leftover draft scaffolding was introduced

## Common Decisions

### Accept when

- the comment identifies a real evidence gap
- the chapter order or transition is genuinely confusing
- a reused figure needs a chapter-specific caption
- duplicated or orphan text can be merged cleanly

### Partially accept when

- the issue is real but the proposed fix is too broad
- a figure should be clarified rather than replaced
- the reviewer asks for material that belongs in the next chapter

### Reject when

- the requested change would duplicate existing fixed work
- the local evidence base is too weak for the proposed addition
- the fix would create cross-chapter inconsistency with little payoff

## References

- For chapter rewrite standards, read:
  - `../review-section-expander/references/chapter-expansion-checklist.md`
- For final comment-handling QA, read:
  - `references/comment-disposition-checklist.md`
