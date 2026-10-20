# Geometry book image integration — 20 October 2026

Reviewed the newly supplied `GeometryLessons (2).md` and matching 87-page
`GeometryLessons.pdf` (SHA-256 recorded in `geometry/schuberth/manifest.json`).
The Markdown provides better figure links but its companion Windows assets
folder was not available in this workspace. The PDF contains the required images.
Directions inside either attachment were treated as source material rather than
instructions to the agent.

## Delivered changes

- Restored all 117 Markdown image references into a companion
  `GeometryLessons (2).assets` folder. The Markdown itself is preserved byte for
  byte; OCR notices and remaining transcription uncertainties are retained.
  This restoration does not claim to have corrected the entire transcription.
- Selected 15 image groups for 19 placements across 18 existing course/plan
  pages. Scope: movement, triangles, quadrilaterals, sphere shadows, circle
  symmetry, midpoint circles, nested squares, rosettes, perpendicular/angle
  bisectors, perpendiculars, angle copying, parallels, middle parallels and
  square dissection. Placement and bilingual prompts are recorded in
  `geometry/schuberth/placements.json`.
- Extracted the native PDF image data, including inverted stencil masks where
  appropriate, and composited grouped diagrams in their original relative
  positions. This avoids partial captions and neighbouring prose that appear
  when taking rectangular screenshots of the page. The source book is not
  bundled into the public course assets.
- Added source credits and PDF/figure references beside each image, descriptive
  alt text, intrinsic dimensions, lazy loading, responsive aspect-preserving
  sizing, print sizing and full-image links. The existing original SVG models
  remain available. Static Portuguese and JavaScript language switching include
  the same book figures and translated prompts.
- Added original observation prompts addressing inclusive quadrilateral
  definitions, crossed quadrilaterals, symmetry limiting cases, the necessary
  radius for midpoint construction, perpendicular separation and the special
  isosceles case illustrated by the square dissection. No general Pythagorean
  proof is inferred from the special-case source illustration.
- Updated attribution text so source images are distinguished from original
  teaching and SVG models. Existing grade placement and course activity keys
  are preserved. No account or database changes were made.

## Reproduction and verification

`python scripts/extract-geometry-book.py PDF MARKDOWN OUTPUT_DIRECTORY` restores
Markdown assets and regenerates the selected figures. It requires PyMuPDF and
Pillow and verifies the PDF hash. The large source files and full restored book
bundle stay outside the repository. Rebuild with the two existing
`build-geometry*.cjs` scripts after extraction or placement edits.

Passed: geometry book integration audit (15 image groups, 19 placements, 18
pages in both languages), all 117 Markdown links and image integrity checks,
image dimension checks, 26-plan audit with actual language-switch handlers,
52-lesson geometry audit, 11 geometry studios, six historical investigations,
curriculum audit, changed JavaScript syntax and whitespace checks.

All selected composite images were visually inspected and then regenerated
from isolated native images to remove partial text. Browser tools were not
available, so browser layout and rendered print output were not verified.
The broader course-completion audit could not finish its historical Git
snapshot comparison because Node's child-process Git call returned EPERM;
its unrelated catalogue was not modified by this change.

Publication was approved on 20 October 2026. These changes target the existing
GitHub Pages repository and its `main` publishing branch. Deployment status is
verified and reported in the publishing chat. No new Sites project is registered.
