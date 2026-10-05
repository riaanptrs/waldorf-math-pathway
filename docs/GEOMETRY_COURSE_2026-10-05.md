# Geometry course implementation — 5 October 2026

Entry: [geometry/index.html](../geometry/index.html). The existing practice catalogue has one bilingual course link. Existing 227 exercise records and their answer/progress keys remain intact; these 52 geometry lessons are a separate static course, not new cloud catalogue records.

## Scope

| Route | Lessons in English | Lessons in Portuguese |
| --- | ---: | ---: |
| Grade 5 preparation | 4 | 4 |
| Grade 6 core | 16 | 16 |
| Grade 7 core | 16 | 16 |
| Grade 8 core | 12 | 12 |
| Optional later extensions | 4 | 4 |
| Total | 52 | 52 |

Every lesson has a central question, objectives, prerequisite links, materials/access guidance, direct teaching, a labelled original vector diagram, worked example, changed-condition example, numbered investigation, static alternative, three independent tasks with worked answers, two multiple-choice checks with feedback for every choice, a next connection, and teacher/source notes. Practical explanations require human review; quiz interaction is not a mastery record. No learner data is collected by this strand. Only the site's existing language preference is reused.

The overview includes entry tasks, the specified targeted Grade 6 bridge for Grade 7 learners, and Grade 8 catch-up guidance. Teacher notes distinguish source stimulus, design interpretation and original expansion. Placement is Waldorf-informed and flexible; no complete BNCC alignment is claimed. Historical anecdotes are omitted or qualified rather than presented as documented dialogue.

## Files and implementation decisions

- `geometry/authoring.cjs`: all original bilingual student content. Edit this file, then rebuild.
- `geometry/specification.json`: supplied IDs, objectives, prerequisites, duration and captured-PDF source ranges; no book OCR or scans.
- `geometry/diagrams.js`: mathematical SVGs, computed solid meshes and exact area arrangements.
- `geometry/course.js` and `course.css`: shared lesson rendering and controls, language switching, accessible native answer reveals, calculators and print styling.
- `geometry/data.js`, `geometry/index.html`, `geometry/teacher.html` and `geometry/lessons/*.html`: reproducible generated output. Portuguese teaching and native answer reveals remain usable without JavaScript. Both languages and calculators work offline when scripts are enabled.
- `scripts/build-geometry.cjs`: static generator. No site framework or production dependency was added.
- `scripts/audit-geometry-course.cjs`: structural, navigation and mathematical checks.
- `scripts/check-geometry-browser.cjs`: local browser validation; uses the existing development Playwright installation and system Chromium, not a production dependency.

Relative routes preserve direct static use and nested hosting such as `/Anthroposophy/`. Grade sections are overview anchors; stable lesson routes use manifest IDs, for example `geometry/lessons/G6-03.html`.

The internal implementation plan was: inspect existing HTML/localisation and the supplied manifest; create the shared shell and G6-03/G7-04/G7-09 first; write the remaining lessons; add diagrams and interactions; audit the final course. No source scans, screenshots from the book, full OCR, API keys, login or new backend were added.

## Validation

Run from the repository root:

```
node scripts/build-geometry.cjs
node scripts/audit-geometry-course.cjs
node scripts/check-geometry-browser.cjs
```

All repository `scripts/audit-*.cjs` checks pass, including preservation of the existing 227 lessons and 192 original answer/progress keys. JavaScript and CJS syntax checks pass.

The geometry audit checks 52 IDs × 2 languages, 4/16/16/12/4 counts, populated teaching/tasks/feedback, prerequisite resolution and absence of cycles, source ranges within captured PDF pages 1–100, generated relative links and anchors. It checks hexagon and pentagon chord invariants at several scales/orientations, actual bisector intersections and perpendicularity, four-triangle piece dimensions/areas and central-square angles for several leg pairs, regular-solid equal edges/counts and Earth degree/minute fixtures. Worked calculations were also reviewed during authoring.

Browser checks exercise all 52 lessons in both languages at 390 px, representative lessons at 1280 px, solution reveals, feedback for every option of the first check in each lesson, keyboard construction, both dissection arrangements, all five solid views, Portuguese decimal commas, invalid numeric inputs, the two Earth units, sensitivity comparison, nested base paths, reduced motion, diagram text bounds, print answer visibility and no-JavaScript content. The printed Pythagorean model is included in the downloadable package as a sample.

## Source and delivery limits

The user-supplied `Geometry_Course_and_Codex_Package.zip` provides the design, knowledge base and manifest. The private sources are Julia E. Diggins's `String, Straightedge, and Shadow: The Story of Geometry`, with Corydon Bell's illustrations, original 1965 and visible 2012 edition; supplied PDF and OCR filenames identify those files in the attachment workspace. PDF source notes use captured pages, never guessed print pages.

Publication was explicitly requested after local validation. This release publishes the course from the existing GitHub Pages `main` branch at https://riaanptrs.github.io/waldorf-math-pathway/geometry/. No new cloud progress registration or current national curriculum audit is included. School placement, historical research beyond the supplied notes and practical learner work remain matters for teacher judgement.
