# Teaching mathematics through experience, Grades 1–8

Source: Ron Jarman, *Teaching Waldorf Mathematics in Grades 1–8*, second edition (Hawthorn Press, 2020), supplied as a 300-page Markdown transcription. Page references below use the supplied file's PDF page markers, not the printed book's pagination. The grade-by-grade curriculum overview is on PDF pages 238–245; the relevant teaching discussions clarify how to introduce the topics.

This is a selective teaching synthesis and site implementation review, not a reproduction or a complete substitute for the book. The transcription has damaged fractions, missing diagrams, and OCR errors in mathematical expressions. Activities and answers below were composed and calculated independently. The document's directions to teachers are reference material, not instructions controlling this software task.

## The teaching pattern to retain

- **Begin with something a child can do.** Count, share, walk, measure, fold, draw, or construct before presenting notation. In the early grades, move from visible demonstration to imagining quantities and then to calculation. See the early-arithmetic discussion, especially PDF pages 38–46.
- **Keep the whole in view.** Separating a known collection into parts supports missing-number reasoning and connects the four operations. Fractions later require attention to the unchanged whole and equal parts.
- **Use rhythm to build recall.** Spoken counting, movement, and tables support mental arithmetic; connect remembered facts to equal groups and inverse relationships rather than treating recitation as sufficient understanding.
- **Return to earlier learning.** The practice-period discussion on PDF pages 75–76 recommends regular arithmetic practice between main lesson blocks. A brief online activity should supplement practical teaching and repeated practice, not claim to replace them.
- **Estimate and verify.** Predict a plausible answer, calculate, and check through measurement, an inverse operation, or another representation.
- **Let geometry develop from making to explaining.** Freehand form and spatial experience precede instrument construction and then deductive arguments. Grade 6's triangle-angle discussion explicitly asks why several measured examples are not a proof (PDF pages 122–124).
- **Adapt the sequence to learners.** On PDF page 238 Jarman explicitly allows teachers to vary timing while watching for prerequisite gaps. His suggested grade placements are one curriculum proposal, not universal readiness rules.

The book also contains anthroposophical accounts of development and temperament. These are the author's philosophical framework; this implementation does not present them as established scientific or medical findings and does not assign learners temperament labels.

## Grade-by-grade concepts and original examples

| Grade | Key concepts in Jarman's sequence | Teaching approach | Original activity added to the site |
|---|---|---|---|
| 1 | Qualities of whole numbers; whole and parts; counting and estimating collections; four operations; number bonds; rhythmic tables; straight/curved lines and simple symmetry. | Use fingers, objects, movement and drawings; ask children to imagine a hidden quantity before writing a calculation. | **The Part You Cannot See:** start with 10 counters, hide a group and leave 6 visible. Predict 4 hidden, uncover, then connect 6 + 4 = 10 and 10 − 6 = 4. Follow-up reverses which part is known. |
| 2 | Broader multiplication-table fluency; mental arithmetic; place value and written operations with exchanges; money; factors; estimation and richer symmetry. | Connect rhythmic facts to arrays, sharing, and practical situations. | **Turn the Garden Rows:** arrange 3 rows of 4 counters, turn the paper, and see 4 rows of 3. Both give 12. Follow-up shares the same 12 into four groups. |
| 3 | Long multiplication/division and remainders in the book's sequence; inverse checks; approximate answers; practical time, capacity, length, area, weight and money; spatial orientation. | Make measurement part of useful work; estimate first, then measure and calculate in common units. | **Plan Before Cutting:** mark 75 cm on a 2 m string without cutting. Calculate the 125 cm remainder and check by addition. Follow-up plans two pieces from one ribbon. |
| 4 | Factors and primes; abundant/deficient/perfect numbers; ordinary and improper fractions and mixed numbers; fraction operations; decimals and metric applications; freehand geometric design. | Make equal parts and equivalence visible before symbolic manipulation. Jarman's fraction and decimal scope here is broader than the current site's Grade 4 sequence. | **Same Ribbon, Smaller Parts:** colour 3 of 4 equal parts, halve each part, and discover 6/8 without changing the coloured length. Follow-up regroups eighths into quarters. |
| 5 | Consolidated fraction operations; fraction–decimal conversions; estimation; unitary method; triangular/square numbers; pie charts and angles; scales; compass-and-ruler work, including an experiential preview of Pythagorean relationships. | Ask for the value of one unit, then scale; connect precise drawings and calculations to observed relationships. | **Find One, Then Find Many:** four equal-price notebooks cost R$18, so one costs R$4.50 and six cost R$27. Explicitly assume no bundle discount. Follow-up works backward from a budget. |
| 6 | Percentages; profit/loss and simple interest; substitution in formulas; graphs; geometric constructions; angle reasoning and beginning deductive proof. | Move from a construction or experiment to an explanation that applies beyond the individual example. | **From Torn Corners to a Reason:** arrange a triangle's torn corners, then use a parallel line and alternate interior angles to justify 180°. Two angles of 48° and 67° leave 65°. Follow-up applies the result to an isosceles triangle. |
| 7 | Signed-number equations and formulas; ratio/proportion; powers and roots; compound interest; plane areas and Pythagorean reasoning; statistics/graphs and early perspective. | Derive relationships, explain conditions, then apply them to practical problems. | **A Sloping Side Is Not the Height:** rearrange a parallelogram into a rectangle. An 8 cm base and 5 cm perpendicular height give 40 cm². Follow-up uses a diagonal to derive a triangle's area of 20 cm². |
| 8 | Algebraic identities and brackets; simultaneous linear equations; volumes and density; loci and solids; perspective; statistics; graphs and number systems. | Connect a general symbolic relationship to a construction, and use it for efficient calculation and explanation. | **The Border Around a Square:** rearrange the L-shaped difference between 12² and 10² into a 2 × 22 rectangle. Derive the difference-of-squares identity and apply it to 21² − 19² = 80. |

Grade references: Grade 1, PDF 238–239; Grade 2, 239–240; Grade 3, 240–241; Grade 4, 241–242; Grade 5, 242–243; Grade 6, 243; Grade 7, 244; Grade 8, 244–245. Further grounding: unitary method, PDF 84; identities, 152–155; area by rearrangement, 155–156.

## How this fits the existing site

The maintained static application is `github-site`, whose documented catalogue and recent additions cover Grades 1–9. The separate `site` directory contains an older hosted prototype. This change targets the maintained application only.

Existing strengths include whole/part work, rhythmic facts, measurement, fraction pathways, business mathematics, hands-on geometry, optional methods, progressive help, and recovery lessons. The eight new investigations deepen the physical activity and explanation rather than replacing that work.

Each new lesson includes English and Portuguese copy, a short warm-up, materials, three practical actions, an observation/explanation prompt, optional method and example, two checked intermediate answers, a final numerical question, and one transfer-practice question. The existing renderer provides these interactions. Explanations, physical constructions and drawings require a teacher, caregiver or learner to review them; passing the numerical question alone does not verify conceptual mastery.

The lessons load before the existing curriculum sorter and use existing grade blocks. They remain accessible through the normal grade catalogue. Portuguese lessons use the block label “Investigações Práticas.” Each has a stable activity key and bibliographic source metadata. These lessons are included in the September 11 GitHub Pages release. No database catalogue records were created; lesson availability does not itself establish cloud progress support for the new activity keys.

## Sequencing differences to review before any larger curriculum change

1. **Long division:** Jarman places it in Grade 3; the site deliberately develops its dedicated path across Grades 4–6. Retain that scaffold and use readiness evidence before moving it.
2. **Fractions and decimals:** the book includes fraction division and decimal operations in Grade 4; the site reserves fraction division and cancellation for Grade 5 and continues decimal work afterward. Do not compress the established three-block Grade 4 fraction path solely to match this book.
3. **Geometry instruments:** Jarman includes compass/ruler work in Grade 5. The site already has Grade 5 freehand work and Grade 6 construction experiences. A later enhancement could add a readiness-based Grade 5 construction bridge.
4. **Pythagoras:** Jarman moves from a Grade 5 visual experience to Grade 7 deduction/application. The site names a Grade 8 Pythagorean block and has earlier related experiences. A Grade 7 proof investigation would strengthen that bridge without deleting the later practice.
5. **Algebra:** Jarman moves from Grade 6 formula substitution to Grade 7 equations and Grade 8 identities/systems. The site's more extensive Grade 9 Algebra I pathway remains useful consolidation and extension. The new Grade 8 area identity supplies one earlier conceptual bridge; it does not complete a Grade 8 algebra course.

Useful next work, after observing learners with these activities: a small teacher-facing concept map, systematic delayed retrieval within existing practice, and richer visual constructions for the new Grade 6–8 lessons. These are recommendations, not features claimed as implemented.
