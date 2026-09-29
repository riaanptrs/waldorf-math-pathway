# Course improvement release — 29 September 2026

This completes the agreed teaching-content work following the Jarman review, and adds the Grade 7 bracket algebra requested by the parent. It is a course improvement release, not a claim that a set of short online activities constitutes a complete annual school curriculum.

## Content delivered

The catalogue contains **227 bilingual lessons**, including **35 new lessons**. All 192 previously released lessons retain their main answers and progress keys.

| Grade | Lessons | Main additions in this release |
|---|---:|---|
| 1 | 11 | Numbers through twenty; mirrored movement and form |
| 2 | 15 | Bundles, exchanges, regrouping and shop change |
| 3 | 19 | Garden measurement, arrays, partial products and practical remainders |
| 4 | 24 | Factors and multiples; equivalence before fraction reduction |
| 5 | 31 | Four decimal-operation lessons, compass bridge and fraction charts |
| 6 | 27 | Constructions, parallel angles, interest formulas and data charts |
| 7 | 45 | Signed-number sequence, area proof, graph scales and five bracket-algebra lessons |
| 8 | 29 | Solids/density, loci, first systems and measures of typical value |
| 9 | 26 | Existing Algebra I path retained and practice strengthened |

Every lesson now offers core practice, a changed context/application and cumulative review. There are **683 practice placements per language**; repeated prerequisite questions are deliberately included in that count. They are not 683 unique new questions. The 172 older lessons with only one English practice question each received a newly authored application and a selected earlier question. Two existing Portuguese-only questions were retained and translated into English, giving two lessons four items instead of three.

All lessons have a teaching-stage label, an adult observation prompt, a suggested encounter/revisit rhythm and conceptual hints. The adult records modelling, explanation, independence and later recall in the notebook. There is no automatic calendar scheduler or automatic evaluation of spoken explanations and constructions.

## Grade 7: the parent's algebra example

The earlier Grade 7 course covered signed numbers, like terms and equations. It did **not** contain a sufficiently explicit sequence for expanding a squared binomial. The new block, **Algebra: Brackets and Squares**, follows the existing algebra block:

1. **Multiply Every Part:** distribution, including a negative outside factor.
2. **Four Products Make One Area:** multiply two binomials using a four-cell grid.
3. **Square a Sum: (2x + 2)²:** two identical factors; the two cross-products produce the middle term.
4. **Square a Difference:** signed products and the positive constant term.
5. **When the Middle Terms Cancel:** conjugate brackets and the difference of squares.

The requested example is `(2x + 2)² = 4x² + 4x + 4x + 4 = 4x² + 8x + 4`.

The visible grid initially shows unsolved products. Physical area drawings use positive lengths; signed grids are explicitly multiplication tables, not negative physical areas. The general identities follow from distribution. A numerical substitution is a useful check, not a proof for every x.

Begin after the learner can explain signed multiplication and like terms. This is an original readiness-based Grade 7 extension responding to the learner's current schoolwork, not a claim that every Waldorf school places these identities in the same grade. Grades 8–9 continue consolidation.

Each new algebra lesson includes two guided checks and three original practice questions. The checker accepts `x^2`, `x²`, explicit multiplication, reordered terms and decimal commas. It compares coefficients with a bounded parser and never executes learner input. It rejects missing cross-products, incorrect signs, unexpanded brackets and uncollected like terms when the prompt asks for a simplified expansion.

Direct links now open the requested lesson and grade, including:

- [Begin the bracket sequence](https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-algebra-distribute-bracket)
- [The parent's squared-bracket example](https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-algebra-square-sum)

## Cloud catalogue and release state

- The shared Supabase project was paused and has been restored.
- **172 Grade 1–7 math activities are registered and active**, verified by grade: 11, 15, 19, 24, 31, 27 and 45. This includes all five new Grade 7 algebra activities.
- The database currently enforces `unit_number <= 7`. Automatic approval review rejected expanding that shared constraint without explicit approval. **The 55 Grade 8–9 registrations remain pending that approval.** The exact range change is already represented by the first six lines of `supabase/migrations/20260815120000_add_waldorf_math_grade8_grade9_catalogue.sql`.
- `node scripts/build-math-catalogue.cjs` generates the complete, reviewable catalogue update at `supabase/seeds/math-catalogue.sql`. New positions are above 1000 to avoid the shared English catalogue. Existing positions and learner records are preserved. No RLS policies were changed.
- The site publishes from this repository's `main` branch root to GitHub Pages. See the release commit and Pages build for the deployment state.
- Local guest submissions are covered by browser verification. A real learner's authenticated cloud submission has not been performed on their behalf; catalogue verification does not substitute for that end-to-end check.

The Supabase security advisor reported one pre-existing setting: [leaked-password protection is disabled](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection). No auth settings were changed in this curriculum release.

## Verification

```text
node scripts/audit-learning-sequences.cjs
node scripts/audit-course-completion.cjs
node scripts/audit-lesson-clarity.cjs
node scripts/audit-geometry-story.cjs
node scripts/audit-geometry.cjs
git diff --check
```

The audits check all 227 lessons and both languages, at least three curated practice items per lesson, earlier-only review references, all original IDs/answers, 120 independently calculated answers in the first 30 additions, selected higher-risk applications, and all 20 new polynomial answers against their original factored relationships at multiple values. Malformed input, omitted middle terms, sign errors, Unicode exponents and alternative term order are covered. All 35 application scripts pass syntax checks.

Browser checks verified the Grade 7 direct link and translated content, rejection of the missing-middle-term mistake, a conceptual first hint, acceptance of the correctly reordered expansion with Unicode exponents, and local guest saving. Earlier checks covered Grade 2 regrouping, Portuguese decimal commas and progressive practice hints.

Teaching/source context and the original three phases are documented in `JARMAN_GRADE_IMPROVEMENT_PLAN_2026-09-29.md`, `JARMAN_TEACHING_REVIEW.md` and `SEPTEMBER_29_IMPLEMENTATION.md`.
