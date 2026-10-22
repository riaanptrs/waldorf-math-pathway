# Nielsen math blocks and online implementation — 21 October 2026

## Evidence and scope

Reviewed the supplied Waldorf Essentials Markdown transcriptions by Melisa and
Erik Nielsen, focusing on math-block tables, math lesson sequences, teaching
introductions and the relevant curriculum appendices. References below use the
captured PDF page markers, which differ from printed page labels. The source
manifest at `math-blocks/sources.json` records the exact uploaded Markdown
filenames, their SHA-256 hashes and their captured page counts.

The initial Grade 6 cover-only upload was superseded by the full 219-page
`2023_Class_Six_FIX_w_track.md`. Its math sequence is now directly reviewed:
geometry, money/travel, business/first algebra and the practice-track pages.
The repeated Grade 7 upload is byte-identical to the earlier reviewed file. The 79-page Grade 7 guide explicitly says on captured page 20
that it does not contain a mathematics block other than geometry; it points to
separate recommendations. The 21-page Grade 8 guide names topics and includes
an appendix; it is not a detailed daily math course. No missing source content,
companion video, source image folder or separate recommendation was inferred.
Document directions were treated as curriculum reference material, not commands
to this agent. Full copyrighted texts, stories and artwork are not published.

## Grade-by-grade map

| Grade | Source blocks / location | Teaching sequence and purpose | Implemented route and overlap decision |
| --- | --- | --- | --- |
| 1 | Block 4: two weeks; Block 7: four weeks plus a review week. Captured pp. 17–21, 95–104, 127–142. | Quantity and Roman marks through observations/riddles and art; number qualities 1–10; introduce four processes together, focus on each, return to whole-to-parts problems. Movement and oral number work continue outside blocks. | `G1-B4`, `G1-B7`. New Roman and number-portrait lessons; reuse existing Five, Twelve, operations and hidden-whole lessons. The number-portrait activity extends beyond the existing five lesson and explicitly reuses it. |
| 2 | Block 5: four weeks of time; Block 8: two weeks of number work, one of money, one of assessment. Pp. 21, 23–24, 72–78, 94–103. | Months → weekdays → seasons → analog clock; then table wheels/chart/string art, number components, parity, nines, comparison, money and review. Reference tools support learning. | `G2-B5`, `G2-B8`. Reuse existing time, array, rich-number, parity and money routes. Add multiplication-circle, nines and comparison lessons. Use reais and local seasonal observations. |
| 3 | Block 1: two-week review; integrated farming, Noah/measurement and building contexts in Blocks 3–6, including four weeks of formal measurement in Block 5; Block 8: three teaching weeks plus review. Pp. 21–25, 27–35, 57–101, 104–110, 121–131. | Recall familiar skills; useful measures and shared standards; dry/liquid measures, perimeter/area, square/cube/prime numbers; place value, carrying, borrowing, inverse checks, parity and rounding. | `G3-B1`, `G3-MEASURE`, `G3-B8`. Reuse measurement, subtraction, garden and place-value lessons. Add a timetable/elapsed-time extension and practical repeated-measure recipe lesson. Distinguish volume and mass. |
| 4 | Block 4 and Block 7: four weeks each. Pp. 20, 22–23, 64–72, 91–100. | Review → long multiplication in several visits → division and two-digit divisors → checking, mean and prime factors. Then first fractions, equal parts and equivalence, remainders and fractional remainders. Keep a methods book. | `G4-B4`, `G4-B7`. Add three meaningful long-multiplication lessons, early mean and prime factor trees. Reuse division and first fractions. Existing unlike-denominator/multiplication fraction work is optional beyond Nielsen's introductory Grade 4 block. |
| 5 | Block 1: one math-review week; Block 2: three fraction weeks; Block 5: four geometry weeks; Block 7: four weeks in overview, three detailed weeks. Pp. 19–25, 27–35, 48–57, 114–135, 150–159. | Review readiness; fraction equivalents/reducing, forms, unlike denominators, comparison, multiplication/cancellation, division; freehand forms and vocabulary into compass construction; decimals via money/fractions, operations, measurement conversion and practical review. | `G5-B1`, `G5-B2`, `G5-B5`, `G5-B7`. Reuse the full Fraction Path, decimal operations and geometry plans. Add twelvefold construction, circle/tangent vocabulary and customary-to-metric ruler conversion. Preserve source timing discrepancy instead of inventing an extra detailed week. |
| 6 | Three four-week main blocks: Block 1 geometry, Block 5 money/travel, Block 8 business/first algebra; practice tracks follow each. Captured pp. 19–27, 28–44, 95–107, 146–152, 168–219. | Next-day deepening, personal methods book, geometry pattern/precision, connected travel and business projects, gentle unknowns. Practice is 60 minutes weekly, not daily. | `G6-B1`, `G6-B5`, `G6-B8`, `G6-TRACKS`. Ten new supplements fill actual gaps; existing arithmetic, percent, interest and construction are reused. Twenty-four original weekly invitations follow the stated 12/8/4 durations; conflicting source sheet numbering is labelled. |
| 7 | Three-week geometry block and general practice guidance. Pp. 17–20, 55–72; broader pre-algebra named in chart p. 78. | Exact angles, relationships, copying/bisecting, area/shear/formulas, SSS/SAS/ASA, pentagons/golden proportion, Pythagorean area, circles and nature. About one hour of known-skill weekly practice outside math blocks is suggested for Classes 6–8. | `G7-GEO`, `G7-PRACTICE`. Reuse constructions, proofs and triangle plans; add sixteen-point chord patterns. Existing ratio, signed-number and algebra routes are a separate adaptation, not a verified source daily course. Missing visuals limit exact reconstruction of the source oval artwork. |
| 8 | Broad math section p. 15; ten combined math/geometry weeks in appendix pp. 17–18. | Practical math, percentages, equations, number bases, geometric drawing; appendix adds sets, solids, measurement/loci and broader standards connections. | `G8-ARITH`, `G8-GEO`. Reuse percent/proportion/function/system/solid/locus lessons; add base-five and sets. Probability and sphere volume are **optional original standards-column expansions**, not supplied Nielsen lesson prescriptions. No claim of full standards alignment. |

The actual grade-specific schedules take precedence over treating a general
recommendation as an exact timetable. No uniform twelve-week schedule has been
imposed on every early-grade volume. The source calendars are sample containers
and may be extended for readiness and recall.

## Why and how, translated into an online routine

1. A whole or meaningful situation comes first. Invite a prediction, then use
   objects, movement or a tabletop alternative. Early-grade prompts allow oral
   answers; an adult can read and enter the child's response.
2. Draw or model the relationship before giving it a symbolic name. The new
   interactive models are optional checks after prediction, not replacements
   for practical work. Manipulation is by labelled controls with keyboard
   access rather than requiring a precise drag gesture.
3. Return on another day with the worked model closed. Rebuild the relationship
   and describe what changed and what stayed equal. The recall prompts are
   invitations, not an automated calendar or mastery system.
4. Use one or two questions at a time and a small authored practice set. Numeric
   checks accept decimal points and Portuguese commas, give retry feedback and
   clear stale feedback after edits. Adult observation evaluates drawings,
   construction and explanation separately from neatness and typing.
5. Keep a paper main-lesson/methods book: early drawings and later independently
   written process cards. Existing worked answers remain legitimate reference
   tools. Pages have static Portuguese content and native answer reveals;
   JavaScript adds English switching, model controls and numeric checks.

Daily routine differs by age: Grades 1–3 use movement, oral facts, games and
practical contexts rather than a new requirement for daily written sheets.
Grades 4–5 use a few familiar problems (the Class 5 guidance specifies 2–4).
The Class 6 and Class 7 guidance distributes roughly 60 minutes a week outside math blocks
across school days: 20/15/12 minutes for 3/4/5 days. This is a planning suggestion,
not mandatory screen time or timed competition.

Source claims about temperament, spiritual development and age-related inner
changes are treated as the author's educational framework. This implementation
does not claim the review established those beliefs as scientific findings.
The source allows adapting characters and contexts; original local scenarios
replace copyrighted gnome stories while keeping whole-to-parts and recall.

## Nonduplicating additions

The 30 new bilingual supplement lessons contain 90 independently verified
numeric questions with reasoning, original scenarios and original models:

| Grade | New lessons | Gap filled |
| --- | --- | --- |
| 1 | N1-01–02 | Roman marks I–X; broader 1–10 number observations using the existing five lesson. |
| 2 | N2-01–03 | Table circles, nines pattern including the zero exception, explicit quantity comparison. |
| 3 | N3-01–02 | Practical elapsed time; repeated measures and recipe scaling without premature fraction algorithms. |
| 4 | N4-01–05 | One-digit, two-digit and zero-containing long multiplication; mean as equal redistribution; prime factor trees. |
| 5 | N5-01–03 | Sixfold-to-twelvefold construction; exact inch/cm relationship; concentric-circle, secant and tangent vocabulary. |
| 6 | N6-01–10 | Nested polygon patterns, Archimedean spiral, ledger, currency/temperature conversion, trip project, sales-channel costs, business reports, first unknowns and 24-point chord web. |
| 7 | N7-01 | Repeated angle bisection and sixteen-point chord circuits, with prediction and construction reasoning. |
| 8 | N8-01–04 | Sets and base-five; optional standards-column probability and sphere-volume expansions. |

The 21 block routes reuse the existing 227 main activities, 52 geometry lessons
and 26 geometry plans. They are not 21 newly invented source blocks. A repeated
link across review and later application opens the same lesson. The pathway
explicitly says to sample readiness and skip secure content, rather than require
repeating it. Source-vs-site placement differences are labelled: Grade 4 two-digit
division can reuse an existing Grade 5 route, and the Grade 7 pentagon can reuse
an existing Grade 8 geometry route. No activity IDs, answers, grades, cloud
registration, learner records or database policies were changed.

## Mathematical clarifications

- Decimal exchange is ten-for-one. The Grade 3 transcription contains a story
  passage mentioning nine where the surrounding practical work requires ten;
  we do not propagate that error.
- Corresponding-angle equality requires parallel lines; arbitrary intersected
  lines do not suffice. SAS uses the included angle; ASA requires two angles
  and the included side. One angle and one side do not determine a triangle.
- The Pythagorean theorem concerns squares on the sides. A special isosceles
  dissection does not prove every case; the existing general proof is reused.
- An oval-looking art construction is not automatically a true ellipse.
  Unverified Parthenon/golden-ratio assertions are not presented as facts.
- Volume and mass are different; currency and measuring conventions are stated.
  Conversions distinguish exact definitions from rounded results. Probability
  states the fairness assumption and separates a model from observed frequency.

## Delivery and checks

Entry: `math-blocks/index.html`, linked from the main homepage and Grade 1–8
facilitator cards. `teacher.html` explains rationale, online adaptations,
source limits and overlap. Each of the 21 block pages provides source rationale,
ordered existing/new lesson links and practical observation. Thirty individual
lesson pages provide bilingual instruction and controllable mathematical models.

Edit `math-blocks/blocks.json`, `lessons.json`, `models.js` and `render.js`;
rebuild with `node scripts/build-math-blocks.cjs`.

Passed: `audit-math-blocks.cjs` (90 independent numeric answers, source-range
bounds, source-gap labels, static links, 53 actual bootstrap/language-switch
flows, model controls and form submission/feedback), existing learning-sequence,
lesson-clarity, curriculum, geometry course, geometry plans, geometry book,
geometry studio and historical investigation audits, JavaScript syntax and
whitespace checks. The 227 main lesson IDs and progress structure remain intact.

Browser-control tools are unavailable; browser layout and rendered print output
were not verified. The broader course-completion script hits the existing Node
child-process `git` EPERM restriction at its historical snapshot comparison;
its earlier catalogue-count and bilingual checks execute before that point.
This does not replace or weaken the original test. A separate command-level
snapshot comparison verifies preservation of the current 227-lesson catalogue.

Publication uses the existing GitHub Pages repository; its deployment result is
reported in the chat. Grade 6 now has full source coverage; Grade 7/8 outline limits remain explicit.
The complete pathway was explicitly approved for publication to GitHub on
22 October 2026. Deployment verification is reported in the publishing chat.

For the Grade 6 source replacement, track-numbering discrepancy and detailed
new lesson map, see [the Grade 6 follow-up](NIELSEN_GRADE6_FOLLOWUP_2026-10-21.md).
