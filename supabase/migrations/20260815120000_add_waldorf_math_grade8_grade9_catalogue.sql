alter table public.course_activities
  drop constraint if exists course_activities_unit_number_check;

alter table public.course_activities
  add constraint course_activities_unit_number_check
  check (unit_number >= 1 and unit_number <= 9);

insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g8-math-binary-place-value', 8, 1, 'Math: Binary Place Value', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-binary-place-value', false, true),
  ('g8-math-scientific-notation', 8, 2, 'Math: Scientific Notation', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-scientific-notation', false, true),
  ('g8-math-pythagorean-hypotenuse', 8, 3, 'Math: Finding the Hypotenuse', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-pythagorean-hypotenuse', false, true),
  ('g8-math-percent-growth', 8, 4, 'Math: Percent Growth Table', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-percent-growth', false, true),
  ('g8-math-dimensional-speed', 8, 5, 'Math: Convert a Speed', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-dimensional-speed', false, true),
  ('g8-math-map-scale-proportion', 8, 6, 'Math: Map Scale Proportion', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-map-scale-proportion', false, true),
  ('g8-math-exponent-laws', 8, 7, 'Math: Laws of Exponents', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-exponent-laws', false, true),
  ('g8-math-cylinder-volume', 8, 8, 'Math: Volume of a Cylinder', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g8-cylinder-volume', false, true),
  ('g9-math-linear-equation-fractions', 9, 1, 'Math: Equations with Fractions', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-linear-equation-fractions', false, true),
  ('g9-math-system-substitution', 9, 2, 'Math: Two Equations Meet', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-system-substitution', false, true),
  ('g9-math-negative-exponents', 9, 3, 'Math: Negative Exponents', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-negative-exponents', false, true),
  ('g9-math-simplify-radical', 9, 4, 'Math: Simplifying Square Roots', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-simplify-radical', false, true),
  ('g9-math-slope-intercept', 9, 5, 'Math: Slope as Rate of Change', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-slope-intercept', false, true),
  ('g9-math-quadratic-factoring', 9, 6, 'Math: Factoring a Quadratic', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-quadratic-factoring', false, true),
  ('g9-math-distance-formula', 9, 7, 'Math: Distance from a Right Triangle', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-distance-formula', false, true),
  ('g9-math-linear-vs-exponential', 9, 8, 'Math: Linear or Exponential?', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g9-linear-vs-exponential', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number,
    unit_position = excluded.unit_position,
    title = excluded.title,
    path = excluded.path,
    is_portfolio = excluded.is_portfolio,
    is_active = excluded.is_active;
