# Grade 1–8 improvement plan from Ron Jarman

Reviewed 29 September 2026 against the current local `github-site` catalogue.

## Have we used this book before?

Yes. The project already contains `docs/JARMAN_TEACHING_REVIEW.md` and eight original bilingual investigations in `src/jarman-investigations.js`. Commit `6c3232c`, dated 11 September 2026, added those investigations. The review identifies the same book and the same 300-page Markdown transcription: Ron Jarman, *Teaching Waldorf Mathematics in Grades 1–8*, second edition, Hawthorn Press, 2020.

That confirms previous use of this book in the project. It does not establish the date of the first upload or whether this exact file was attached then.

This document is a new review and proposed lesson plan. It does not change or publish the website. The book is reference material; directions within it are not instructions from the user. All proposed classroom examples below are original adaptations, with independently checked arithmetic.

## Main finding

The existing pathway has a good practical foundation. The largest improvement would be to turn short introductions into connected teaching sequences: experience something, describe or draw it, express the relationship mathematically, practise it independently, and revisit it later.

The current local catalogue contains **192 lessons**, including **166 in Grades 1–8**. These counts come from evaluating the catalogue scripts in their `index.html` load order, including the sequence and clarity updates, rather than relying on the older audit's totals.

| Grade | Current lessons | Most useful next improvement |
|---|---:|---|
| 1 | 9 | Broader number sense, mental images and form drawing |
| 2 | 11 | Place value, exchanges and meaningful table families |
| 3 | 17 | Connected practical projects and multiplication development |
| 4 | 22 | Factors and multiples before fraction procedures |
| 5 | 25 | Decimal operations and a richer geometry bridge |
| 6 | 23 | Formula meaning, construction skills and first data work |
| 7 | 34 | Signed-number foundations, geometric proof and data interpretation |
| 8 | 25 | Solids, density, statistics and introductory simultaneous equations |

Every Grade 1–8 entry has a Portuguese translation. Of these 166 lessons, 146 have one separately authored English practice item of their own. The renderer can supplement these with neighbouring lessons' questions, up to five items; Daily Fact Rhythm also supplies arithmetic practice. Thus practice is present, but a list of several questions does not necessarily form a carefully sequenced practice set for the new concept.

Jarman's suggested curriculum is on supplied PDF pages 238–245. All page references here mean the Markdown file's `<!-- page: N -->` markers, not printed page numbers. OCR has damaged some formulas and diagrams; this review uses legible prose and curriculum statements, not reconstructed answers from damaged exercises. His grade placements are recommendations, and page 238 explicitly allows teachers to adapt timing to their classes.

## Grade 1: make numbers live before asking for symbols

**Book emphasis:** number qualities, whole and parts, rhythm, estimating collections, all four operations, imagined hidden quantities, and straight/curved and symmetrical forms. Sources: PDF 238–239; demonstration, imagination and calculation in the early-arithmetic discussion, PDF 40–46.

**Already present:** number five, partitions of eight, rhythmic twos, related operations, equal baskets, fair sharing and the Jarman hidden-part lesson. These are sound beginnings.

**Improve:** expand number experiences beyond five; develop counting through 10 and 20, then extend the range as children are ready. Include comparing and estimating quantities, mental number stories, and form drawing. Keep an oral or physical response available before a typed answer.

**Proposed sequence — “Eight seeds, many gardens.”**

1. Give the child eight counters. Make different arrangements and count them again. Ask whether spreading them out changes how many there are.
2. Divide the eight between two garden beds: 5 and 3, 6 and 2, 4 and 4. Draw two possibilities, keeping the original whole visible.
3. Show eight, cover one part and leave five visible. Ask the child to imagine the hidden three before uncovering them. Record `8 = 5 + 3` and `8 − 5 = 3` after the experience.
4. Make four equal beds: two seeds in each. Connect `4 × 2 = 8` and `8 ÷ 4 = 2` to what the child made.

**Fresh check:** ten seeds, seven visible: three hidden. Then share ten seeds between two beds: five per bed. Ask the child to explain both actions.

**Companion activity:** walk a straight path and a curved path, trace them in the air, and draw a mirrored form around a vertical line. An adult observes the drawing; a numerical answer is not a substitute for this work.

**Reuse:** extend `g1-whole-parts-eight` and `g1-jarman-hidden-whole`, rather than adding another almost identical hidden-part card.

## Grade 2: connect rhythmic facts with exchanges and inverse operations

**Book emphasis:** varied table recitation, mental arithmetic, money, factors, estimation, and written operations with ones, tens, hundreds and thousands. Sources: PDF 239–240.

**Already present:** time and calendar work, one table-pattern lesson, arrays, twelve, odd/even, money and change. Daily Fact Rhythm provides additional arithmetic practice.

**Improve:** the grade has no dedicated place-value/exchange teaching sequence. Broader table fluency needs planned families with arrays and division, alongside the existing fact practice. Start with manageable quantities rather than treating the book's largest numbers as entry requirements.

**Proposed sequence — “The bundle shop.”**

1. Make ten loose sticks into one bundle. Build 27 as two bundles and seven singles; build 16 separately.
2. Join them. Three tens and thirteen ones become four tens and three ones: `27 + 16 = 43`.
3. Reverse the story: from 43 remove 16. Exchange one ten for ten ones; four tens and three ones become three tens and thirteen ones. The result is 27.
4. Estimate first and check that subtraction restores the starting quantity. Move from objects to a drawing, then to written columns.

**Fresh check:** `36 + 18 = 54`, checked with `54 − 18 = 36`. Ask why exchanging a bundle changes the representation but not the quantity.

**Table-family companion:** clap the threes, arrange six rows of three, turn the array, and share the same objects. Connect `6 × 3 = 18`, `3 × 6 = 18`, `18 ÷ 3 = 6`, and `18 ÷ 6 = 3`. Later build the sixes by doubling the threes.

**Sequence:** place these arithmetic blocks alongside the existing calendar and money work. Use objects for written short multiplication/division when the relevant facts and exchanges are secure.

## Grade 3: give measurement and written arithmetic a shared purpose

**Book emphasis:** practical work before measure problems, estimates, units, time, money, long multiplication/division, remainders and inverse checks. Sources: PDF 240–241; ongoing practice periods, PDF 75–76.

**Already present:** useful lessons on standard units, mass, capacity, perimeter, area, place value and a substantial subtraction progression. The string-measurement investigation is also present.

**Improve:** connect these separate activities into a small project. Develop multiplication through groups and partial products, and give sharing/remainders more sustained attention. The site can retain its dedicated long-division path in Grades 4–6 while preparing its meaning here.

**Proposed sequence — “Plan a classroom garden.”**

1. Mark a model garden 4 m long and 3 m wide. Walk its boundary, then draw it on a grid. Explain why perimeter is `4 + 3 + 4 + 3 = 14 m` but area is `4 × 3 = 12 m²`.
2. Plant four rows of six seedlings: 24 seedlings. At a pretend fixed price of R$2 each, calculate R$48 and the R$12 change from R$60.
3. Pack 26 seedlings into trays holding four each: six full trays and two left over. If every seedling needs a tray, seven trays are required. Check `6 × 4 + 2 = 26`.
4. Calculate four rows of 23 small pots using `4 × 20 + 4 × 3 = 80 + 12 = 92`. Draw the partial products before compact written multiplication.

**Fresh check:** a 5 m by 2 m garden has perimeter 14 m and area 10 m². Ask why the fence length can stay the same while the planting area changes.

**Teacher observation:** the child distinguishes boundary from surface, keeps units attached, and interprets a remainder in context. Follow with a clock-based watering schedule and a measured-capacity activity.

## Grade 4: strengthen the number relationships beneath fractions

**Book emphasis:** factors, primes, number classifications, fractions and decimals, and freehand geometric design. Sources: PDF 241–242.

**Already present:** a well-developed three-block fraction path, several kinds of wholes, equivalence, reduction, common denominators, addition/subtraction, and a gentle multiplication and mixed-number bridge.

**Improve:** insert a factor-and-multiple bridge, and require students to explain why the whole and quantity stay unchanged when a fraction is renamed. Build on the ribbon investigation before symbolic reduction and addition. At present that investigation appears after the like-denominator lesson within its block.

**Proposed sequence — “One ribbon, two kinds of pieces.”**

1. Arrange 12 counters into rectangles. Discover the factor pairs `1 × 12`, `2 × 6`, and `3 × 4`. Contrast factors with the successive multiples 12, 24, 36.
2. Take two identical strips. Mark one in quarters and one in sixths. Investigate a shared subdivision: twelfths fit both.
3. Compare `3/4 = 9/12` with `1/6 = 2/12`. Join these amounts against the same whole: `3/4 + 1/6 = 11/12`.
4. Use the drawing to explain why adding the denominators would not describe what happened.

**Fresh check:** `2/3 + 1/4 = 8/12 + 3/12 = 11/12`. An additional common-factor task is `8/12 = 2/3`, made visible by regrouping.

**Extension:** arrange proper divisors to investigate a perfect number: `1 + 2 + 3 = 6`. Treat abundant/deficient/perfect-number work as an enrichment of factor understanding, not a barrier to fractions.

**Keep the existing scaffold:** Jarman places fraction division and decimal operations earlier than this site does. This review does not recommend moving all of that into Grade 4 simply to match his list.

## Grade 5: carry fraction understanding into decimal calculation

**Book emphasis:** mixed fraction calculations, fraction–decimal conversion, zeros and estimates, the unitary method, number patterns, angles, scales and compass/ruler drawing. Sources: PDF 84 and 242–243.

**Already present:** a strong fraction path, division by fractional measures, tenths/hundredths, familiar conversions, metric measure, unitary pricing and short freehand geometry activities.

**Improve:** decimal notation currently has stronger coverage than decimal operations. Add a sequence through addition/subtraction, multiplication and division, with place-value reasoning and estimates. Expand drawing beyond naming a radius or calculating a perimeter.

**Proposed sequence — “Measure and price a ribbon.”**

1. Measure or model lengths of 1.25 m and 0.80 m. Join them: `1.25 + 0.80 = 2.05 m`. Use hundredths to explain the exchange across one whole.
2. Find the remainder of a 3 m roll: `3.00 − 2.05 = 0.95 m`. Check by adding back.
3. At a pretend fixed price of R$8 per metre, price 1.25 m: one metre costs R$8 and a quarter metre costs R$2, so the total is R$10. This gives meaning to `1.25 × 8`.
4. Find how many 0.25 m pieces fit into 2 m: eight pieces. Connect `2 ÷ 0.25 = 8` to the actual lengths before a division algorithm.

**Fresh check:** `0.60 + 1.45 = 2.05 m`; `1.50 ÷ 0.25 = 6` pieces. Explain why division by a positive quantity smaller than one can give a number larger than the starting number.

**Geometry companion:** draw a freehand circle, then construct a circle and step its radius around the circumference with a compass to form a regular hexagon. Compare the drawings and describe what stayed equal. Reuse the existing Grade 6 sixfold construction as a readiness-based bridge, with more exact construction and reasoning continuing in Grade 6.

**Data bridge:** partition a circle to represent a collection of 12 objects: groups of 6, 3 and 3 occupy one-half, one-quarter and one-quarter of the circle (180°, 90°, 90°). This prepares later charts.

## Grade 6: move from practical results to formulas and reasons

**Book emphasis:** percentages, commerce, simple interest, substitution into formulas, pictograms/block graphs, accurate construction and beginning deductive geometry. Sources: PDF 243; the distinction between measured evidence and proof, PDF 122–124.

**Already present:** percentages, discounts, unit prices, profit, budgets, one-step simple interest, string/rope construction and the triangle-angle investigation. These should be developed further, not introduced again as if absent.

**Improve:** make the meanings and units in formulas explicit; add a planned construction sequence leading to the existing triangle proof. Introduce an actual data-handling strand.

**Proposed sequence — “From repeated interest to a formula.”**

1. Use a fictional classroom account with principal R$300 and simple interest of 4% per year. Find one year's interest: R$12.
2. Build a table for one, two and three years: interest R$12, R$24 and R$36. The principal stays R$300 in the simple-interest calculation.
3. Name the quantities: `I = P × r × t` when `r = 0.04` and `t` is in years. Show the equivalent percent-number form `I = P × R × t / 100`, with `R = 4`.
4. At two years, interest is R$24 and total amount is R$324. Ask the learner to distinguish these two answers.

**Fresh check:** R$200 at 5% simple interest for three years produces R$30 interest and R$230 total. This is a mathematical model with stated assumptions, not a real product recommendation.

**Construction sequence:** perpendicular bisector → angle bisector → perpendicular and parallel lines → triangle construction → angle-sum explanation. Add a labelled paper record to each step. Use the existing torn-corners investigation once the parallel-line angle relationships make sense.

**Data companion:** count a real classroom collection and draw a bar chart. Use one consistent scale, label the categories and units, and distinguish a count from a percentage.

## Grade 7: build signed-number meaning before complex expressions

**Book emphasis:** equations with negative numbers and fractions, formulas, powers/roots, ratio, area, Pythagorean deduction, compound interest, statistics and perspective. Source: PDF 244.

**Already present:** extensive ratio/rate work, some signed arithmetic and algebra, compound interest, shadow measurement, area rearrangement and Pythagorean applications. With 34 lessons, this grade needs balance and stronger transitions more than sheer volume.

**Improve:** the current “Positive and Negative Numbers” question already asks for `−8 × 7 + 18`. Introduce the component ideas before that combined expression. The missing-side Pythagorean activity applies the theorem; a separate proof experience would explain why it works.

**Proposed sequence — “Crossing zero.”**

1. Walk or draw a number line. Start at −3 and move five units in the positive direction: `−3 + 5 = 2`.
2. Use positive and negative counters with cancelling pairs. Model subtracting a negative quantity: `4 − (−2) = 6`.
3. Establish multiplication patterns. As the second factor decreases through 2, 1, 0, −1, −2, the products with −3 are −6, −3, 0, 3, 6. Ask what must stay consistent with the distributive law.
4. Introduce division as the inverse, then combined expressions: `−18 ÷ 3 = −6`; `−4 × 6 + 9 = −15`.

**Fresh check:** `−2 × (5 − 8) = 6`. Require the child to explain both the bracket value and the sign of the product.

**Proof companion:** place four congruent right triangles with legs `a` and `b` inside a square of side `a + b`, leaving a central square of side `c`. Compare areas: `(a + b)² = 4(ab/2) + c²`, giving `a² + b² = c²`. Establish that the central figure is a square from the angle relationships, not just its appearance. Check a 6–8–10 triangle, then apply the reasoning to a different triangle.

**Data/perspective companions:** compare how the same data looks on differently scaled graphs, and draw a tiled floor toward one vanishing point. These broaden the grade beyond its existing ratio emphasis.

## Grade 8: connect algebra, solids and the interpretation of data

**Book emphasis:** identities, simultaneous equations, brackets, volumes, density, loci, solids and projections, perspective, averages, graphs and number systems. Sources: PDF 244–245.

**Already present:** ten proportion/graph lessons, a difference-of-squares model, binary place value, growth, units, Pythagorean work, cylinders, a cube-net/Euler activity and conic slices. Solids and algebra are present, but several strands remain introductory or are deferred to Grade 9.

**Improve:** deepen the existing net work with other solids and views; connect volume to density; introduce simple systems and statistics before their later extensions. No dedicated statistics lesson was found in the current catalogue.

**Proposed sequence — “Design a small storage box.”**

1. Draw and fold a net for a rectangular box measuring 6 cm by 4 cm by 3 cm. Count layers of unit cubes: `6 × 4 × 3 = 72 cm³`.
2. Calculate surface area before tabs or overlaps: `2(6 × 4 + 6 × 3 + 4 × 3) = 108 cm²`. Explain why square and cubic units answer different questions.
3. Draw front, side and top views. Compare the information each shows with a perspective sketch.
4. For a separate solid sample of that volume and mass 180 g, calculate density: `180 ÷ 72 = 2.5 g/cm³`. Keep this distinct from the mass of the hollow paper box.

**Fresh check:** a solid 5 cm by 3 cm by 2 cm has volume 30 cm³. At density 2 g/cm³ its mass is 60 g.

**Algebra companion — “Two purchases, two unknown prices.”** Two notebooks and one pencil cost R$13; one notebook and two pencils cost R$11. With constant unit prices, `2n + p = 13` and `n + 2p = 11`. Adding gives `n + p = 8`, so `n = 5` and `p = 3`. Check both purchases. Begin with objects or a table, then equations and a graph; keep the fuller Grade 9 systems path.

**Statistics companion — “What counts as typical?”** For daily counts `2, 3, 3, 4, 18`, find mean 6, median 3 and mode 3. Draw a dot plot and discuss why the large count changes the mean so much. Replacing 18 with 8 changes the mean to 4 while median and mode remain 3.

**Further geometry:** extend the existing cube activity to a tetrahedron and an octahedron; compare faces, edges, vertices, nets and orthogonal views. Introduce loci through points equidistant from two fixed points, connecting back to perpendicular-bisector construction.

## Changes to the lesson format across grades

The website already has warm-up, discovery, practice, checking, reflection, progressive hints and a facilitator card. Improve their mathematical substance within that existing structure.

1. **Give each concept several encounters.** Use a physical or visual introduction, a later return from memory, independent practice and a new-context application. The timing should follow the learner; these are proposed planning stages, not a fixed schedule prescribed by the book.
2. **Curate practice for the actual prerequisite.** Neighbouring lessons can be useful, but `extraPracticeFor` currently draws from the entire same-grade block, including later lessons. Prefer authored progression and already-taught prerequisites so a first encounter does not unexpectedly require a later skill.
3. **Vary the mathematical demand.** Include a straightforward example, a changed representation, a missing quantity, a misconception to explain, and a transfer problem. Merely changing the numbers is insufficient.
4. **Revisit across blocks.** Current spiral recall uses the preceding three catalogue lessons in the same grade. Add planned returns to earlier topics after intervening work, and relevant prerequisites from a previous grade. Distinguish this from calendar-aware spaced review, which the current code does not provide.
5. **Record explanation as well as calculation.** Ask for a drawing, construction, spoken explanation or inverse check appropriate to the task. Suggested teacher rubric: can model it; can explain it; can solve a fresh example; can recall it later. A correct typed number establishes only part of that evidence.
6. **Make the status of a lesson clear.** Identify introductions, practice lessons and transfer checks. One short successful activity should not imply that an entire topic is mastered.
7. **Preserve bilingual teaching quality.** When implemented, translate materials, teacher prompts, misconception feedback and independent examples as carefully as the main question. Use reais, metric units and local contexts where useful; ensure seasonal contexts fit the learner's location.

## Recommended implementation order

**First: strengthen prerequisites.** Add the Grade 2 bundle/exchange sequence, Grade 4 factor-and-multiple bridge, Grade 5 decimal operations and Grade 7 signed-number progression. These support a large amount of later work. Reuse existing cards where the teaching objective already matches.

**Second: deepen experience and reasoning.** Expand Grade 1 number/form work, link Grade 3 activities into projects, develop Grade 5–6 construction, and add Grade 7 proof and Grade 8 solid/density work.

**Third: build the missing data progression.** Connect Grade 5 fractions/angles to charts, Grade 6 counts to bar charts, Grade 7 graphs to comparisons and scale, and Grade 8 distributions to mean/median/mode. Add the Grade 6 formula bridge and Grade 8 introductory systems while retaining later consolidation.

Apply the practice and observation improvements while developing these sequences. Before adding more material to the dense Grade 7 catalogue, group existing ratio lessons into a coherent block and identify which are introductions versus practice.

## Evidence and implementation locations

- Source supplied by the user: `C:\Users\riaan\Downloads\Teaching Waldorf Math grade 1 to 8.md`.
- Prior use and source interpretation: `docs/JARMAN_TEACHING_REVIEW.md`, `docs/CURRENT_STATUS.md`, and commit `6c3232c`.
- Current additions from the book: `src/jarman-investigations.js`.
- Early-grade content: `src/grade1-living-numbers.js`, `src/grade2-time-patterns-money.js`, `src/grade3-measure-place-value.js`, `src/grade3-4-subtraction-path.js`.
- Arithmetic bridges: `src/grade4-fraction-path.js`, `src/grade5-fractions.js`, `src/harrer-early-path.js`, `src/grade4-6-long-division-path.js`.
- Later-grade content: `src/exercises.js`, `src/grade7-ratios.js`, `src/grade8-proportions.js`, `src/grade6-9-competency-path.js`.
- Geometry already available: `src/geometry-story-path.js` and `src/geometry-discovery.js`.
- Sequence and support: `src/curriculum-sequence.js`, `src/lesson-clarity.js`, `src/app.js`, `src/fluency.js`.

Verification was a source-and-catalogue review, with arithmetic checks on the proposed examples. It was not a classroom evaluation or a live-site/browser test. The recommendations identify teaching opportunities; they do not establish how any individual learner is performing.
