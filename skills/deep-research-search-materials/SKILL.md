---
name: deep-research-search-materials
description: Use when the user wants exhaustive deep research on a topic and needs the work broken into 10 or more search directions, with each direction searched, read, filtered, recorded, and then reconsidered for new worthwhile directions before moving on. Best for open-ended literature scans, market/technical intelligence gathering, and source-heavy research loops that must cover large search spaces systematically rather than answering from a few obvious references.
---

# Deep Research Search Materials

Use this skill when the user wants a serious research sweep rather than a quick answer. The job is not just to collect sources. It is to turn a topic into a structured search program, execute it direction by direction, compare new evidence against local materials that already exist, and only stop when the remaining gaps are explicit.

## Outcome

Produce these artifacts unless the user asks otherwise:

1. `search-directions.md`
2. `reading-log.md`
3. `local-corpus-index.md`
4. `numeric-claims-ledger.md`
5. `scope-boundary-check.md`
6. `evidence-matrix.md`
7. `gap-audit.md`
8. a final report

If the user already has a target report file, keep the ledgers next to it.

## Required Workflow

### 1. Define the research frame

Before searching, write down:

- the exact research question
- scope boundaries
- time boundary
- languages allowed
- source preferences
- exclusion rules

If the user did not specify these, infer them conservatively and state the assumptions in the ledger.

### 2. Index the local corpus first

Before broad searching, scan the working directory for existing reports, ledgers, decks, notes, reference tables, downloaded papers, and cited-material folders that may already contain usable evidence.

Create `local-corpus-index.md` with:

- file path
- file type
- why it may matter
- whether it is a primary evidence source, a synthesis source, or a weak secondary source
- whether it should be cross-checked later

This step is mandatory. Do not treat the local corpus as optional context. Treat it as a candidate evidence pool that must be reconciled with newly found material.

### 3. Generate the first search map

Create at least `10` distinct search directions before doing deep reading.

Search directions should not be cosmetic keyword variants. They should represent meaningfully different angles such as:

- core terminology and synonyms
- academic literature
- vendor / product material
- benchmarks and evaluations
- architecture / systems mechanisms
- deployment case studies
- critical or skeptical sources
- competitor approaches
- standards / policy / ecosystem signals
- adjacent terms that may hide relevant work

For each direction, record:

- `direction_id`
- label
- why it matters
- starter queries
- expected source types
- status: `planned`, `in_progress`, `searched`, `expanded`, `closed`

Use [search-ledger-checklist.md](references/search-ledger-checklist.md) when creating the ledger.

### 4. Search direction by direction

For each direction:

1. Run multiple targeted searches.
2. Open promising results.
3. Filter aggressively.
4. Keep only sources that add evidence, mechanism detail, numbers, or a genuinely different perspective.

Do not stop after finding one usable source for a direction. Keep searching until one of these is true:

- results become repetitive
- the marginal sources are clearly weaker
- the direction has enough coverage to support the final synthesis

### 5. Read and filter at scale

The default bar is to read and filter a large candidate pool, often dozens to hundreds of items across the whole project if the topic warrants it.

For every inspected source, record in `reading-log.md`:

- source id
- title
- url or local path
- date
- source type
- direction id
- disposition: `kept`, `rejected`, `maybe`
- 1-3 line note explaining the decision
- key claims or data if kept
- scope tag: `direct`, `adjacent`, or `out_of_scope_but_suggestive`

Reject sources explicitly when they are:

- duplicative
- too shallow
- outside the date boundary
- outside scope
- weak secondary summaries when stronger primary sources exist
- marketing claims without technical substance

### 6. Keep a strong-number ledger

Every time a source yields a concrete number that materially strengthens the synthesis, add it to `numeric-claims-ledger.md`.

At minimum record:

- claim id
- number or bounded range
- what it measures
- source id
- whether it is direct evidence or an inferred implication
- whether it already appears in the report

Examples:

- latency deltas
- throughput deltas
- bandwidth requirements
- cache hit rates
- read/write ratios
- concurrency counts
- memory reduction percentages

This step is mandatory because strong numbers are often the difference between a plausible summary and a defensible insight report.

### 7. Reflect after each direction

After finishing each direction, add a short reflection block:

- what this direction taught you
- what still feels missing
- whether it suggests new directions worth adding
- whether it exposed a boundary problem or a missing opposing perspective

If new directions appear justified, append them to `search-directions.md` and mark their parent direction. This reflection step is mandatory. Do not batch it until the end.

### 8. Maintain scope and boundary control

Create `scope-boundary-check.md` and update it when the topic has easy-to-mix adjacent material.

For each potentially confusing evidence family, record:

- the evidence item or source family
- why it risks scope drift
- whether it is `in-scope`, `adjacent but usable`, or `exclude`
- how it may be used in the final report

Examples:

- training vs inference
- tool-runtime CPU vs inference-serving CPU
- benchmark data vs product marketing
- architecture signal vs direct serving evidence

### 9. Build an evidence matrix before claiming completeness

Before writing the final synthesis, create `evidence-matrix.md`.

Map every major conclusion to:

- mechanism evidence
- workload or product-shape evidence
- platform or implementation evidence
- skeptical or counter-evidence
- benchmark or measurement implications

If any major conclusion lacks one of these where it should reasonably exist, call that out as a gap rather than writing with full confidence.

### 10. Run a gap audit before the final report

Before presenting the work as complete, create `gap-audit.md`.

The audit must answer:

1. Which strong local materials were not yet absorbed?
2. Which key numeric claims are still outside the report?
3. Which major paragraphs still rely on inference more than direct evidence?
4. Which parts risk scope drift?
5. Which directions remain thin?
6. Which counterarguments still need stronger handling?

Do not skip this step. A research run is not complete just because it has a decent report draft.

## Search Heuristics

- Prefer primary sources when making technical claims: papers, official docs, engineering blogs, standards, source repositories.
- Use secondary sources mainly to discover terminology, claims to verify, and ecosystem context.
- Search by mechanism, not just by product name.
- Search for opposing language, not just favorable language.
- Search for older terminology that may map to the same idea.
- When a source introduces a new technical noun or architecture pattern, consider whether it deserves its own direction.
- Cross-check new findings against the local corpus before treating them as new.

## Synthesis Rules

In the final report:

- organize by the evidence structure, not by search chronology
- cite the strongest supporting source near each important claim
- distinguish direct evidence from inference
- prefer concrete numbers when available
- include research gaps and residual uncertainty
- include a short methods section summarizing the directions, local corpus, candidate pool, kept set, and audit status

## Status Discipline

Treat the work as moving through explicit states:

1. `framed`
2. `mapped`
3. `searched`
4. `synthesized`
5. `audited`
6. `finalized`

Do not describe a report as complete before the `audited` state.

## Minimal File Pattern

When starting from scratch, create:

- `search-directions.md`
- `reading-log.md`
- `local-corpus-index.md`
- `numeric-claims-ledger.md`
- `scope-boundary-check.md`
- `evidence-matrix.md`
- `gap-audit.md`
- the target report file

If the user already has a report, place the ledgers beside it and work in that folder.

## When To Read More

Read [search-ledger-checklist.md](references/search-ledger-checklist.md) when setting up the ledger or when the search is drifting into ad hoc browsing.
