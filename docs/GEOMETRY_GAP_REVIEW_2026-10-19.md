# Geometry gap review and lesson plans — 19 October 2026

## Evidence and limits

Reviewed the supplied `GeometryLessons.md` (87 captured PDF pages) against the existing 227-activity catalogue and the separate 52-lesson geometry course. The supplied matching PDF was available; page 33 was visually checked for its quadrilateral classification caveat and its proposed later cyclic/tangential extensions. The text extraction contains damaged OCR and missing figures: new diagrams, examples and activities are original, not reproductions. Source directions to teachers were treated as reference content, not instructions to the coding agent.

Schuberth's *Geometry Lessons in the Waldorf School*, Volume 2, concerns Grades 4–5. Relevant PDF markers: movement and circle/ellipse 14–22; triangles 23–26; quadrilaterals 27–38; sphere shadows 39–42; circle symmetry 50–53; freehand sequences 54–56; instruments 57–61; basic constructions 62–81; diagonal-square/Pythagorean experience 82–84. Page 33 anticipates cyclic and tangential quadrilaterals for Grades 7–8. Those later plans are original mathematical expansions, not claims that page 33 provides their complete teaching.

The new `Teaching Waldorf Math grade 1 to 8.pdf` could not be transferred because it exceeds the 32 MiB tool limit. It was **not** newly read or verified. Earlier Jarman findings in `docs/JARMAN_TEACHING_REVIEW.md` inform the Grades 1–3 and Grade 8 perspective placements; source notes distinguish this secondary evidence. This is a selective geometry gap review, not a claim of complete coverage of the inaccessible book or national curriculum alignment.

## What already existed and what was added

| Grade | Existing coverage | Added plans and purpose |
| --- | --- | --- |
| 1 | `g1-form-mirror-path`, movement and form drawing | P1-01 makes straight/curved and open/closed distinctions explicit; a deeper practical plan, not a newly discovered missing topic. |
| 2 | Rhythm, arrays, practical measurement | P2-01 adds a dedicated reflection plan using matching distances and fold tests. |
| 3 | Floor-square area and garden measurement | P3-01 develops a top-view plan with a declared scale, before later surveying. |
| 4 | Area and fractions; no dedicated comparative-form geometry sequence | P4-01 circle/ellipse movement; P4-02 triangle variation; P4-03 inclusive quadrilateral families; P4-04 sphere shadows. |
| 5 | `G5-01`–`04`, freehand circle, symmetry, compass-radius and circle-chart activities | P5-01 two-circle symmetry into midpoint construction; P5-02 square/octagon bridge; P5-03 nested midpoint squares; P5-04 diagonal-square area doubling. |
| 6 | 16 geometry lessons plus bisector/parallel activities in main catalogue | P6-01 precise angle-transfer procedure; P6-02 middle parallel with perpendicular-distance reasoning. |
| 7 | 16 geometry lessons, area and Pythagorean proofs | P7-01 cyclic quadrilaterals and a teacher-guided inscribed-angle bridge. |
| 8 | 12 geometry lessons, solids, loci, volume/density and a brief perspective extension | P8-01 tangential quadrilaterals; P8-02 one-point perspective room project. |

Grade labels indicate suggested readiness. Schuberth and Jarman differ from the existing course in instrument timing. The principal Grade 6 construction entry remains, with optional Grade 5 bridges and prerequisite links. The early diagonal-square activity makes a special case visible before the later general Pythagorean proof. Square/rectangle/rhombus definitions are inclusive; generic-shape symmetry counts state their exclusions. Tangential opposite-side sums are treated as necessary checks, not sufficient evidence from a measured sketch. Perspective is distinguished from a scale plan.

## Delivery

`geometry/plans/index.html` contains the grade map and gap explanation. Sixteen bilingual original plans have individual static routes `P1-01.html`–`P8-02.html` (as listed in the authoring file), with readiness checks, materials, goals, teaching notes, timed sequence, an original SVG model, three independent tasks with hidden worked answers, observation criteria, support, extension, source notes and connections to existing lessons. Early plans take 30 minutes; Grades 4–8 take 45 minutes, optionally split. Retrieval prompts recommend returning the next day or week. Native answer reveals and Portuguese teaching work without JavaScript; English and shared language preference work with JavaScript. Existing geometry print CSS includes answers.

Linked from the main homepage, geometry overview and teacher page. No additional cloud catalogue entries, accounts or learner storage were introduced. The 227 existing activity keys/answers and 52 existing geometry routes remain intact.

Edit `geometry/plans/authoring.cjs`, `diagrams.js` and `render.js`; rebuild with `node scripts/build-geometry-plans.cjs`. The existing course overview/teacher templates remain in `geometry/course.js`, rebuilt with `node scripts/build-geometry.cjs`.

## Verification

- `node scripts/audit-geometry-plans.cjs`: all 16 plans in both languages, grade coverage, timing totals, all required teaching fields and practice answers, generated links/anchors, 17 page bootstrap/language-switch flows and numerical/diagram fixtures.
- `node scripts/audit-geometry-course.cjs`: original 52 bilingual lessons, prerequisites, links and construction invariants pass.
- `node scripts/audit-course-completion.cjs`: 227 lessons, 683 bilingual practice placements and all 192 original keys/answers preserved.
- Existing curriculum, lesson clarity and learning-sequence checks pass; changed JS/CJS syntax and whitespace checks pass.
- Visual browser testing was unavailable: no callable browser-control tool was exposed. No new visual, layout or print-rendering verification is claimed. Static links and actual language handler execution were checked without a browser.

The release uses the existing GitHub Pages repository and audience, not a newly registered Sites project. Publication status is reported separately after pushing and checking the deployment workflow.
