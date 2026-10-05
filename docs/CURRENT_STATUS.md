# Current Status

Last updated: 2026-10-05.

## Geometry course

- Added a separate original bilingual 52-lesson geometry course: 4 Grade 5 preparation, 16 Grade 6, 16 Grade 7, 12 Grade 8 and 4 optional later extensions.
- Entry: `geometry/index.html`, also linked from the existing practice catalogue. Includes constructions, shadow and Earth calculators, exact Pythagorean dissection, solids/nets, worked answers and printable static lessons.
- The existing 227 lesson catalogue and cloud progress keys remain intact. The geometry course is released through GitHub Pages from `main` at `https://riaanptrs.github.io/waldorf-math-pathway/geometry/`. Cloud catalogue registration has not occurred.
- Implementation and validation: `docs/GEOMETRY_COURSE_2026-10-05.md`.

## Completion release

- The agreed teaching improvements are complete: **227 bilingual lessons**, **35 new lessons**, and **683 practice placements per language**. All lessons have at least three practice questions and teaching guidance. All 192 original main answers and progress keys are preserved.
- Grade 7 now includes five lessons progressing through distribution, two binomials, squared sums, squared differences and conjugate brackets. The exact requested example `(2x + 2)²` is taught with a four-part model.
- The shared database was restored. After explicit user approval, the reviewed migration extended the grade constraint to 1–9 and the full catalogue was registered. **All 227 activities are active**, including the remaining **55 Grade 8–9 activities**. Database keys, grades, titles and paths match the course with zero mismatches. The 40 shared non-math entries and access policies are unchanged; RLS remains enabled.
- All structural, bilingual, arithmetic, algebra, original-content-preservation and existing geometry checks pass. All 35 scripts pass syntax checks.
- GitHub Pages publishes from `main` at the repository root. The completion record supersedes the initial phase counts and local-only delivery state below.
- Details, teaching sequence, tests and cloud limitations: `docs/COURSE_COMPLETION_2026-09-29.md`.

## Initial three-phase implementation (before the completion pass)

- Completed the three implementation phases from the September 29 Jarman review in the local application: prerequisite sequences, practical projects/construction, and data/formula bridges.
- Added 30 original lessons in English and Portuguese, each with practical materials, actions, warm-up, two guided checks, a specific observation/reflection prompt, and three authored practice items. The catalogue now has 222 lessons (196 in Grades 1–8).
- Grade 2: four bundle/exchange lessons; the existing array investigation now also offers table-family work on later days.
- Grade 4: two factor/multiple lessons before fractions; ribbon equivalence now precedes symbolic reduction.
- Grade 5: four decimal-operation lessons, a compass bridge and a fraction-to-circle-chart activity.
- Grades 1 and 3: number/form activities and a two-lesson garden project connecting perimeter, area, multiplication, remainders and money.
- Grade 6: bisectors, parallel-line angles, a simple-interest formula/table bridge and bar-chart/pictogram work.
- Grade 7: four signed-number foundations, a Pythagorean area proof and critical graph-scale comparison; the existing area investigation includes a perspective-drawing extension.
- Grade 8: box/volume/density and locus investigations, introductory simultaneous equations and mean/median/mode. Existing cube-net work now extends to tetrahedra and octahedra.
- New lessons distinguish introduction, practice and application. Their curated practice does not borrow unrelated questions. Existing lessons borrow only earlier same-grade/block practice; English and Portuguese now use the same canonical block for this selection.
- New practice uses a conceptual hint on the second failed attempt and delays the complete solution to the third. Explicit prerequisite recall can return to earlier blocks and grades. This is not calendar-based scheduling or automatic conceptual-mastery assessment.
- Validated 120 main/practice numerical answers independently, bilingual content, prerequisites, answer handling and existing geometry/clarity checks. Browser checks covered guest answer submission, Portuguese decimal commas, practice hints and English translation. See `docs/SEPTEMBER_29_IMPLEMENTATION.md` for the teaching and verification record.
- Initial checks verified local guest saving. For the subsequent release and database state, see the completion release above. Physical work and explanations still require learner/adult review.

## Jarman teaching investigations

- Added one original investigation per grade, Grades 1–8, in English and Portuguese: hidden parts, rotated arrays, measured remainders, fraction equivalence, unitary pricing, triangle-angle reasoning, area rearrangement, and a difference-of-squares model.
- Each uses practical materials, an explanation prompt, optional support, intermediate checks and transfer practice in the existing lesson flow.
- Source synthesis and sequence differences are documented in `docs/JARMAN_TEACHING_REVIEW.md`.
- These additions are included in the September 11 GitHub Pages release and are now registered in the cloud catalogue as part of the September 29 completion release.

## Learning Flow

- Grade 1 through Grade 9 lesson catalogue with grade filtering.
- Student-facing rhythm: warm up, discover, practise, check, and reflect.
- Methods and worked examples are optional support rather than pre-reading.
- Incorrect answers receive progressively stronger help across three attempts.
- Guided intermediate steps now validate independently: correct work is confirmed immediately, edited answers clear stale success at once, and an incorrect response appears after a short pause or when the learner leaves the field.
- Full guided answers are delayed until the learner has first received a noticing hint and a method hint.
- Existing local and Supabase progress saving remains in place.
- Every lesson now has at least three curated practice items in English and Portuguese, with core, application and cumulative-review roles.
- Daily Fact Rhythm serves Grades 1–7 with age-appropriate sets: foundational addition and subtraction in Grade 1, selected early multiplication tables from Grade 2, broader arithmetic fluency through Grade 6, and signed-number facts in Grade 7.
- Learners can choose an untimed learning path or fluency timing, see only personal progress, and complete a relationship-based recovery round after mistakes.
- Grade 5 now includes a ten-lesson Fraction Path: equivalence, reduction, like denominators, improper and mixed numbers, unlike denominators, comparison, multiplication with cancellation, division with reciprocals, and cumulative review.
- Grade 4 now includes six original, Harrer-inspired foundation lessons: place-value regrouping, square measure, first fractions, fractions of quantities, remainders as fractions, and square-number arrays.
- Grade 5 adds a concrete fraction-division measurement lesson and a fraction-to-decimal hundredths bridge; Grade 6 adds decimal place-value and percent-as-hundredths discoveries.
- Fraction Path lessons use visual bars before formal methods and remain original rather than reproducing source workbook exercises.
- Grade 7 now includes a twelve-lesson Ratios and Rates Path that develops ratio meaning, multi-part ratios, whole and decimal forms, reciprocals, sharing, similar figures, shadows, direct and inverse relationships, and lever balance.
- Grade 7 ratio work deliberately uses multiplicative reasoning before formal Grade 8 proportion algorithms.
- Grade 8 now includes a ten-lesson Proportions and Graphs Path: constant rates, proportion tables, the origin, `y = kx`, graph reading, missing coordinates, slope comparison, non-proportional starting values, inverse proportion, and a scale-and-cost capstone.
- Grade 8 proportion lessons use responsive value tables and coordinate graphs, original practical contexts, bilingual support, progressive incorrect-answer hints, and cumulative practice drawn from neighbouring lessons in the block.
- Grade 9 now includes a thirteen-lesson Algebra I Foundations Path: expression language, substitution, like terms, distribution, balance reasoning, multi-step and signed equations, variables on both sides, fractional equations, formula rearrangement, inequalities, linear models, and systems as graph intersections.
- Grade 9 algebra lessons preserve a discovery-to-practice sequence, require checking in the original relationship, reuse responsive graphs where helpful, and provide bilingual progressive support after mistakes.
- Grades 6–9 now include sixteen bilingual Competency Lab diagnostics. Each lesson targets a curriculum gap, provides guided intermediate checks, adds a second practice context, and asks learners to estimate or predict before calculating and verify afterward.
- The competency expectations and suggested revisit rhythm are documented in `docs/GRADE6_9_COMPETENCY_MAP.md`.
- Grade 3 now develops vertical subtraction through alignment, one exchange, hundreds, and two exchanges; Grade 4 extends the pathway through zero, strategy choice, estimation, and addition checks.
- A six-level Subtraction Recovery review is linked from every Grade 5–9 lesson so older learners can revisit only the missing prerequisite.
- Grade 4 now introduces long division through fair-sharing stories and flexible partial quotients; Grade 5 compresses those ideas into efficient notation and two-digit divisors; Grade 6 continues into decimal and repeating quotients.
- A six-level Long-Division Recovery review is available beside the subtraction recovery link in every Grade 5–9 lesson.
- Grade 4 fractions now follow three developmental blocks: meaning, observed equivalence, reduction, and like denominators; common denominators and unlike operations; then simple multiplication and a brief mixed/improper-number bridge.
- Six bilingual historical-geometry investigations now connect string construction, rope surveying, shadows, regular solids, conic sections, and Earth measurement. Each uses an original story prompt and physical materials before symbolic calculation.
- Fraction division and cross-cancellation remain in Grade 5, while a six-level Fraction Recovery diagnostic is linked from every Grade 5–9 lesson.

## Git

- Repository: `https://github.com/riaanptrs/waldorf-math-pathway.git`
- Current branch: `main`
- The repository was clean and synced with `origin/main` during the pre-reset audit.

## Evidence From Repository

- Static entry point: `index.html`
- App/source assets: `src/`, `assets/`, `public/`
- Supabase references: `supabase/`
- Temporary/generated work: `tmp/`

## Recovery Notes

- The site should remain viewable by opening `index.html` directly.
- Any private Supabase credentials or account-specific settings must be restored from the separate reset recovery package or cloud accounts, not from Git.

