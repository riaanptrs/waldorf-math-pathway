# Grade-by-Grade Curriculum Audit

Audited: 2026-09-01
Scope: the 184 learner lessons loaded by `index.html`, their displayed sequence, bilingual practice banks, answer metadata, support fields, and overall Waldorf developmental fit.

## Improvements implemented after the audit

- Every lesson now follows the visible order: oral rhythm, spiral recall, visual or physical discovery, focused problem, practice, check, reflection, and optional facilitator guidance.
- Up to three earlier questions from the same grade return before each new lesson. Answers remain folded until the learner chooses to check, and recall never blocks new work.
- Discovery invitations now respond to the mathematical domain instead of repeating one generic instruction: whole-and-parts language for fractions, covariation for ratios and rates, balance for algebra, embodied modelling for Grades 1–2, and prediction/invariance for geometry.
- Reflection now asks for mathematical evidence appropriate to the topic rather than using the same closing question everywhere.
- Every lesson now exposes a separate, collapsed facilitator card with purpose, an observation focus, and guidance about when to pause.
- Eleven geometry lessons now include bilingual predict–construct–interact–record studios while explicitly returning the learner to paper and physical materials.
- Six original historical-geometry investigations now extend the pathway from practical tools to abstraction: a string-compass hexagon, a marked-rope right angle, shadow proportion, regular-solid nets, conic slices, and an Earth-circumference model. These use the developmental arc of *String, Straightedge and Shadow* as a reference without copying its prose or exercises.
- Extra practice is now presented as entry, core practice, change of view, and cumulative return rather than one undifferentiated list.
- Extra-practice answers use a three-attempt help ladder: attention or format check, one method step, then the worked path. Solutions no longer appear after the first mistake.
- After opening a full guided answer, the learner is directed to a fresh parallel problem so supported work is followed by an opportunity for independent success.

## Executive finding

The pathway has a strong Waldorf-inspired foundation: calm pacing, concrete situations, movement and manipulatives in the early grades, practical measurement and commerce, discovery language, reflection, optional help, and no public speed ranking. Every lesson has an English and Portuguese version, a teacher aim, a rhythm, a memory refresh, and at least one additional practice item.

It is not yet a complete Grade 1–9 curriculum. Most entries are short digital activities with one principal checked problem plus one to three related practice problems. They work best as guided practice within a teacher-led block, not as the full block itself. The main release concern was the displayed sequence: additions from separate source files were appearing where they were loaded rather than where they belong developmentally. `curriculum-sequence.js` now gives every grade an explicit block order and moves key concrete bridge lessons before their formal algorithms.

## Cross-grade findings

- Strong: every one of the 184 lessons has a teacher aim, lesson rhythm, memory refresh, English practice, Portuguese practice, and Portuguese learner translation.
- Partial: 115 lessons do not have interactive guided steps. They still have layered whole-lesson hints, but most practice items only check a final answer.
- Partial: lesson quantity is uneven (8, 10, 16, 21, 24, 20, 32, 22, and 25 lessons by grade). Grade 7 is much denser than Grades 1 and 2.
- Partial: the site says “warm up, discover, practise, check, reflect,” but the lesson catalogue entries generally supply a short rhythm and a problem rather than a complete story-led main lesson.
- Partial: physical work is named in many prompts, especially early number and measure, but geometry rarely requires a construction record, drawing check, or facilitator observation.
- Improve: give every major lesson an entry problem, two or more guided discoveries, a short independent set, one transfer problem, and one delayed spiral-review problem.
- Improve: distinguish introduction, practice, and expected mastery in the catalogue. At present all lesson cards look equally complete.
- Improve: add misconception-specific feedback and a fresh parallel retry after high-level help. Current support is progressive but mostly lesson-wide.

## Grade 1 — living number before symbols

Coverage present: number quality, whole and parts, all four operations as related actions, equal groups, fair sharing, and rhythmic counting by twos.

Waldorf fit: strong. Learners find, move, hide, group, step, clap, and only then name or write number. The simultaneous relationship among the operations is developmentally appropriate.

Sequence revision: movement and rhythmic counting now precede the formal operation block.

What is missing or thin: number qualities beyond five; counting and number sense across a broader range; number stories and mental images; form drawing; rhythmic counting in more sequences; many experiences of each operation before checked abstraction. Five of eight lessons lack intermediate checked steps.

Priority improvement: expand this into several short oral/manipulative encounters per number and operation. Treat typed answers as a record after the activity, not the activity itself.

## Grade 2 — rhythm, time, patterns, and money

Coverage present: year, week, seasons, analog clock, five-minute steps, multiplication-table patterns, properties of twelve, odd/even, money combinations, and change.

Waldorf fit: good. Cycles, rhythm, rich-number exploration, and practical money all suit the year.

Sequence revision: the existing order was already coherent and is preserved.

What is missing or thin: sustained rhythmic tables practice across 2, 3, 4, 5, and 10; stronger mental addition/subtraction; place value; written arithmetic beginnings; more story-based operation practice; form drawing. All ten lessons check only the final response.

Priority improvement: add table-family mini-blocks with movement, forward/backward recitation, missing-beat patterns, arrays, and short story applications.

## Grade 3 — practical measure and place value

Coverage present: standard measurement, mass, capacity, perimeter, area, square/cube form, prime arrangements, place-value exchange, regrouping, rounding, and a five-step subtraction progression.

Waldorf fit: strong in the practical-measure block. Market, kitchen, garden, floor, and building contexts give number a lived purpose.

Sequence revision: practical measure and number shapes continue to lead into place value and written subtraction.

What is missing or thin: time/calendar review, money and trades in a larger project, multiplication/division algorithms and tables fluency, broader units and unit conversion, and sustained building/farming/craft problems. Eleven lessons lack checked intermediate work.

Priority improvement: create a connected “build a small shelter/garden/market” block in which measure, area, capacity, money, multiplication, and written arithmetic recur naturally.

## Grade 4 — whole-number craft into fractions

Coverage present: place-value regrouping, advanced subtraction, long division through sharing and partial quotients, square measure, square-number arrays, fraction meaning, fractions of quantities, remainders as fractions, equivalence, reduction, common denominators, unlike addition/subtraction, fraction multiplication meaning, and mixed/improper forms.

Waldorf fit: conceptually good, especially sharing stories and observed equivalence before rules.

Sequence revision: place value now comes before advanced subtraction and long division; number shapes and fraction beginnings now precede formal fraction Blocks 1–3. Previously the page opened with subtraction through zero and introduced some fraction foundations after unlike-denominator work.

What is missing or thin: multiplication algorithm development, factor/multiple work as preparation for denominators, more geometry/drawing, measurement projects, and a larger bank of fraction models using different wholes. Thirteen lessons lack checked intermediate work.

Priority improvement: add a factor-and-multiple bridge before common denominators and require folding, strip, circle, length, and collection models before symbolic exercises.

## Grade 5 — fractions, decimals, measure, and freehand geometry

Coverage present: efficient long division, a ten-lesson fraction path, fraction division by measurement, fraction-decimal bridges, tenths/hundredths, money, metric measure, ancient measure, circles, pentagon perimeter, and symmetry.

Waldorf fit: good breadth and strong use of visual fraction meaning. Ancient measure and freehand geometry are welcome distinctive elements.

Sequence revision: the concrete “how many fractional measures fit?” activity now comes before the reciprocal rule; fraction-decimal bridges are grouped; measurement and ancient measure now precede geometry and symmetry.

What is missing or thin: decimal addition/subtraction/multiplication/division, broader measurement conversion, robust freehand geometric constructions, fraction applications, and cumulative mixed review. Seventeen lessons lack checked intermediate work.

Priority improvement: deepen the freehand geometry block with paper-and-pencil constructions and observation prompts; add a decimal operations sequence after place-value meaning.

## Grade 6 — fraction/decimal/percent relationships into business math

Coverage present: decimal place value, decimal and repeating quotients, fraction multiplication/division, fraction-decimal-percent connection, percent sense, discounts, unit cost, profit, simple interest, budgeting, market-day work, geometry, and competency checks.

Waldorf fit: strong practical commerce strand and a useful relationship among fractions, decimals, and percent.

Sequence revision: decimal place value and division now precede fraction/percent and business applications. Previously the decimal-system bridge appeared near the end of the grade.

What is missing or thin: divisibility, prime factorization, powers and roots, fuller fraction operations (including mixed/compound fractions), rate problems, statistics and ratio, metric estimation, and substantial compass-and-straightedge geometry. Eleven lessons lack checked intermediate work.

Priority improvement: add the number-relationships block before business math, then a real construction block with compass work, polygons, area, and student drawings.

## Grade 7 — arithmetic review, ratios, signed numbers, and first algebra

Coverage present: arithmetic review, puzzles, divisibility, fractions, repeating decimals, percent base, interest, a twelve-lesson ratio/rate path, unit rates, signed numbers, like terms, balance equations, formulas, irrational diagonals, and Pythagorean reasoning.

Waldorf fit: good “algebra awakening” through puzzles, balance, and relationships, although the grade is much denser than its neighbours.

Sequence revision: arithmetic foundations and ratios remain before formal algebra; competency transfer remains at the end.

What is missing or thin: extensive four-operation signed-number practice before expressions; geometric division, angle relationships, shear-and-stretch area, pentagon/golden-ratio work, visual proofs, and perspective drawing. Twenty lessons lack checked intermediate work.

Priority improvement: add a construction/drawing block and several signed-number encounters before like terms. Keep algebra compact enough that geometry is not crowded out.

## Grade 8 — broaden imagination, not only algebra

Coverage present: binary place value, scientific notation, percent growth, dimensional analysis, a ten-lesson proportions/graphs path, map scale, exponent laws, Pythagorean theorem, cylinder volume/surface area, trapezoid area, and algorithm tracing.

Waldorf fit: the unusual bases and algorithm work are valuable; the present balance is still too graph/algebra heavy for a distinctively Waldorf Grade 8.

Sequence revision: growth and dimensional analysis now lead into proportion; Pythagorean and mensuration follow algebraic relationship work.

What is missing or thin: arithmetic in other bases, binary/hex links, rule-of-72 investigation, density and multi-stage units, algebra review with unusual solution cases, polyhedra and paper models, orthogonal views, duality, Euler’s formula, transformations, loci, conics, and Cassini curves. Eleven lessons lack checked intermediate work.

Priority improvement: build a substantial hands-on 3-D geometry and loci block before adding more algebra.

## Grade 9 — Algebra I bridge

Coverage present: expression language, substitution, like terms, distribution, balance, increasingly complex equations, formula rearrangement, inequalities, linear models, systems, exponents, radicals, slope, coordinate distance, quadratics, and growth models.

Waldorf fit: discovery-to-symbol progression is sound for a Grade 9 bridge, and the foundations path delays difficult equations until balance meaning is established.

Sequence revision: coordinate geometry now comes before quadratics so distance and graph reasoning strengthen the later function work.

What is missing or thin: polynomial operations, more quadratic representations and solution methods, graphing inequalities, function notation, exponent/radical depth, combinations and permutations, Euclidean proof, descriptive geometry, and multi-day investigations. Seventeen lessons lack checked intermediate work.

Priority improvement: add quadratic growth from geometric area models before symbolic factoring, then deepen Euclidean/descriptive geometry so the year is not exclusively symbolic.

## Problem-level quality finding

The answer metadata is structurally complete: every lesson and practice bank entry supplies an answer rule, and no lesson is missing bilingual practice. The mathematical prompts sampled across every source file are internally consistent and use original, checkable values. However, structural completeness is not pedagogical completeness. A single checked answer cannot establish understanding of a topic, and final-answer checking cannot tell whether a learner chose the right operation, used a sound representation, or guessed.

Before calling a topic “covered,” each major concept should have:

1. a concrete or observable introduction;
2. at least two guided examples with learner input;
3. four to eight independent items across entry, core, and transfer levels;
4. one misconception/repair item;
5. one later spiral-review item;
6. a facilitator observation prompt; and
7. a construction, drawing, explanation, or practical application where appropriate.

## Recommended next implementation order

1. Add guided steps to the 115 lessons currently lacking them.
2. Expand Grades 1–3 before adding more upper-grade algebra.
3. Add Grade 6 construction geometry, Grade 7 drawing/visual proof, and Grade 8 solid geometry/loci.
4. Add the missing Grade 6 number-relationships block and Grade 5 decimal-operations block.
5. Add lesson-stage labels and spiral-return metadata.
6. Add misconception-specific feedback and independent parallel retries.
