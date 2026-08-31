insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g6-math-competency-long-division-check', 6, 91, 'Math: Long Division That Checks Itself', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-competency-long-division-check', false, true),
  ('g6-math-competency-fraction-decimal-bridge', 6, 92, 'Math: One Number, Three Forms', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-competency-fraction-decimal-bridge', false, true),
  ('g6-math-competency-measure-estimate', 6, 93, 'Math: Measure, Convert, and Judge', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-competency-measure-estimate', false, true),
  ('g6-math-competency-percent-sense', 6, 94, 'Math: Percent Means Out of One Hundred', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-competency-percent-sense', false, true),
  ('g7-math-competency-percent-change', 7, 91, 'Math: Measure the Change Against the Start', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-competency-percent-change', false, true),
  ('g7-math-competency-irrational-diagonal', 7, 92, 'Math: The Diagonal That Does Not End', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-competency-irrational-diagonal', false, true),
  ('g7-math-competency-algebra-story', 7, 93, 'Math: Turn a Story into an Equation', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-competency-algebra-story', false, true),
  ('g7-math-competency-pythagorean-leg', 7, 94, 'Math: Find the Missing Side', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-competency-pythagorean-leg', false, true),
  ('g8-math-competency-dimensional-chain', 8, 91, 'Math: Let the Units Cancel', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-competency-dimensional-chain', false, true),
  ('g8-math-competency-trapezoid-area', 8, 92, 'Math: Rearrange a Trapezoid', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-competency-trapezoid-area', false, true),
  ('g8-math-competency-cylinder-surface', 8, 93, 'Math: Unroll a Cylinder', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-competency-cylinder-surface', false, true),
  ('g8-math-competency-algorithm-trace', 8, 94, 'Math: Trace an Algorithm', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-competency-algorithm-trace', false, true),
  ('g9-math-competency-function-table', 9, 91, 'Math: Connect Table, Rule, and Graph', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-competency-function-table', false, true),
  ('g9-math-competency-system-decision', 9, 92, 'Math: When Two Plans Cost the Same', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-competency-system-decision', false, true),
  ('g9-math-competency-quadratic-geometry', 9, 93, 'Math: Build a Quadratic from Area', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-competency-quadratic-geometry', false, true),
  ('g9-math-competency-growth-check', 9, 94, 'Math: Test a Growth Model', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-competency-growth-check', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
