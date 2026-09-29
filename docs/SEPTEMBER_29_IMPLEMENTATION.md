# Jarman improvement implementation — 29 September 2026

This records the initial three phases. The subsequent completion pass adds Grade 7 bracket algebra and strengthens practice throughout the course. See `COURSE_COMPLETION_2026-09-29.md` for current counts, release verification and cloud status.

Implemented sequentially from `JARMAN_GRADE_IMPROVEMENT_PLAN_2026-09-29.md`. The original review remains a dated account of the pre-change catalogue. These additions are original teaching activities based on its learning objectives; they do not reproduce the book's exercises.

## Completed steps

1. **Prerequisites:** four Grade 2 bundle/exchange lessons, two Grade 4 factor/multiple lessons, four Grade 5 decimal-operation lessons and four Grade 7 signed-number lessons. Checked the catalogue after each sequence. Moved the existing Grade 4 ribbon-equivalence investigation before symbolic reduction.
2. **Experience and reasoning:** two Grade 1 number/form activities, two Grade 3 garden-project lessons, a Grade 5 compass bridge, two Grade 6 construction lessons, a Grade 7 Pythagorean proof and two Grade 8 solid/density/locus activities. Extended existing table-family, solid-net and perspective activities.
3. **Data and algebra bridges:** one data activity in each of Grades 5–8, a Grade 6 simple-interest formula/table lesson and a Grade 8 simultaneous-equation lesson. Retained the fuller Grade 9 algebra path.

There are **30 new bilingual lessons**, each with **three original practice questions**, for **90 new practice items** in each language (the same mathematics translated, not 180 distinct problems). Each lesson also has a main numerical question and two guided checks. The total catalogue is 222 lessons, with no existing lesson or progress key removed.

| Grade | New lessons | Total lessons | Teaching progression |
|---|---:|---:|---|
| 1 | 2 | 11 | Estimate and count → imagine hidden parts → walk/draw mirrored forms |
| 2 | 4 | 15 | Bundle → exchange in addition → open a ten → check change |
| 3 | 2 | 19 | Garden boundary/surface → rows and partial products → practical remainders |
| 4 | 2 | 24 | Factor rectangles → shared multiples → existing fraction models/procedures |
| 5 | 6 | 31 | Decimal lengths → price and divide measures → compass drawing → circle charts |
| 6 | 4 | 27 | Interest table/formula → bisectors/parallel angles → existing triangle proof → data charts |
| 7 | 6 | 40 | Geometric area proof; signed actions → products/division → existing expressions; compare graph scales |
| 8 | 4 | 29 | Two simultaneous conditions → solid dimensions/density → loci → summaries of data |
| 9 | 0 | 26 | Existing Algebra I bridge retained |

## How to teach the sequences

Treat the cards as encounters within a teaching block, not a requirement to finish a whole block in one sitting.

- **First encounter:** collect the named materials and do the activity. Ask for an estimate or prediction. The screen records the mathematical result after the physical work.
- **Following encounter:** recall the idea before reopening support. Use the core practice and a drawing to connect the action to notation.
- **Application:** try the changed context and explain the choice of operation, units or representation. After a full solution is opened, use a fresh practice item for independent work.
- **Later return:** use the named prerequisite questions after intervening work. An adult can also choose a prior activity after the next block. The site does not set calendar reminders or claim to measure long-term recall automatically.

For each concept, record in the learner's notebook whether the child can **model it**, **explain it**, **solve a fresh example**, and **recall it later**. These are observation prompts, not automatically assigned mastery scores. Construction, reflection and oral explanations need adult/learner review; a numerical success alone does not verify them.

Keep Grade 4 fraction division in Grade 5 and the existing long-division progression in Grades 4–6. The new Grade 3 work prepares meaning and partial products without forcing a new formal algorithm there. The Grade 5 compass lesson is a bridge; exact construction and proof continue later.

## Practice and support changes

- New lessons have explicit introduction/practice/application labels on both catalogue cards and the activity header.
- Their three practice items carry authored roles: core, changed context, cumulative return.
- For older lessons, extra practice now selects only earlier lessons in the same grade/block. Selection uses the original block key in both languages, preventing a localized title from changing which questions are available.
- A new lesson's second practice hint is conceptual and does not repeat the worked answer. The complete solution appears after the third unsuccessful attempt.
- Selected lessons explicitly recall prerequisites from earlier blocks or grades. Existing fallback recall still uses the preceding three lessons in the same grade.
- Specific teaching observations and misconception prompts are available in the existing facilitator/support UI. The activity's opening observation invites prediction; fuller explanation prompts remain in the reflection and facilitator guidance.

## Verification

Commands from the repository root:

```text
node scripts/audit-learning-sequences.cjs
node scripts/audit-lesson-clarity.cjs
node scripts/audit-geometry-story.cjs
node scripts/audit-geometry.cjs
node scripts/audit-curriculum.cjs
git diff --check
```

The new audit loads the scripts in actual `index.html` order and checks unique lesson/progress IDs, both translations, source content structure, prerequisites, explicit practice roles, independent numerical calculations for all 120 new main/practice answers, numeric signs and Portuguese decimal commas, and exclusion of later lessons from practice in both languages. The curriculum audit now also follows the actual index instead of a stale hardcoded list.

Browser verification used a local guest session: Grade 2 wrong/correct submissions and reflection; Grade 5 comma-decimal submission, three-stage practice help and successful retry; English translation. No browser errors appeared during these checks. These checks do not establish cloud saving, classroom effectiveness or a complete annual curriculum.

## Delivery state

At the end of these initial phases the changes were local. The subsequent release and database registration are recorded in `COURSE_COMPLETION_2026-09-29.md`; that record supersedes this initial delivery state.

Teaching content is grouped in `src/grade2-bundle-path.js`, `src/grade4-number-relationships.js`, `src/grade5-decimal-operations.js`, `src/grade7-signed-path.js`, `src/practical-projects.js`, `src/construction-reasoning-path.js`, `src/grade8-solids-density.js`, `src/data-investigations.js` and `src/formula-system-bridges.js`. Shared bilingual registration is in `src/learning-sequences.js`.
