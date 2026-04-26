# Search Ledger Checklist

Use this checklist to keep deep research systematic and auditable.

## Required Outputs

Every substantial run should end with:

- `search-directions.md`
- `reading-log.md`
- `local-corpus-index.md`
- `numeric-claims-ledger.md`
- `scope-boundary-check.md`
- `evidence-matrix.md`
- `gap-audit.md`
- a final report

## Search Directions Ledger

Every direction should capture:

- `direction_id`
- `label`
- `question`
- `why_it_matters`
- `starter_queries`
- `source_targets`
- `parent_direction` if added later
- `status`
- `reflection`

Suggested table columns:

| id | label | why it matters | starter queries | source targets | parent | status | reflection |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Reading Log

Suggested table columns:

| source_id | direction_id | title | date | type | disposition | scope tag | why kept/rejected | key claims/data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Local Corpus Index

Suggested table columns:

| item_id | path | type | why it matters | evidence class | must cross-check |
| --- | --- | --- | --- | --- | --- |

Use evidence classes such as:

- `primary`
- `synthesis`
- `secondary`
- `asset_only`

## Numeric Claims Ledger

Suggested table columns:

| claim_id | number | metric | source_id | direct_or_inferred | already_in_report | note |
| --- | --- | --- | --- | --- | --- | --- |

Capture only claims that materially strengthen or constrain the synthesis.

## Scope Boundary Check

Suggested table columns:

| item | why risky | classification | allowed use | note |
| --- | --- | --- | --- | --- |

Suggested classifications:

- `in_scope`
- `adjacent_but_usable`
- `exclude`

## Evidence Matrix

Suggested table columns:

| conclusion_id | conclusion | mechanism evidence | workload evidence | platform evidence | skeptical evidence | benchmark implication | status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Use `status` to mark:

- `well_supported`
- `partially_supported`
- `thin`

## Gap Audit

Suggested audit prompts:

1. Which strong local materials were not yet absorbed?
2. Which strong numeric claims are still missing from the report?
3. Which conclusions rely mostly on inference?
4. Which sections risk scope drift?
5. Which directions remain thin?
6. Which counterarguments remain underdeveloped?
7. Which benchmark dimensions are still not tied to real workloads?

Suggested table columns:

| gap_id | gap type | description | consequence | fix |
| --- | --- | --- | --- | --- |

## Reflection Questions After Each Direction

Ask all of these:

1. Did this direction produce primary evidence, or mostly discovery terms?
2. Which claims still lack direct support?
3. Did new recurring terms appear that deserve a new direction?
4. Did this direction expose a missing opposing or skeptical perspective?
5. Is the direction saturated, or is there still high-value unexplored material?
6. Did this direction reveal strong numbers that should enter the numeric ledger?
7. Did it reveal local files that should be cross-checked?
8. Did it reveal a scope-boundary risk?

## Signals That A New Direction Is Warranted

- a repeated technical term you did not search directly
- a different deployment or workload model
- a new product or vendor pattern
- a contradiction between sources
- a benchmark or paper family that keeps reappearing
- an implementation layer you have not isolated yet
- a local report keeps mentioning a term not yet searched directly

## Stop Conditions For One Direction

You can close a direction when:

- the last several results are repetitive
- stronger sources have already been collected
- new sources are no longer changing the synthesis
- remaining items are mostly derivative summaries

## Pre-Finalization Questions

Before calling the work complete, ask:

1. Did I compare the new synthesis against the strongest local materials?
2. Does every major conclusion have supporting evidence in the matrix?
3. Are the strongest numbers actually used in the report?
4. Are scope boundaries explicit where confusion is likely?
5. Have I written down what remains uncertain?

## Common Failure Modes

- too few initial directions
- directions that are only keyword rewrites
- no written rejection reasons
- no reflection after finishing a direction
- no local corpus cross-check
- no numeric claims ledger
- no explicit scope-boundary control
- synthesis based on discovery order instead of evidence structure
- reporting confidence that the audit does not justify
