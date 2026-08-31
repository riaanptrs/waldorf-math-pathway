insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g3-math-measure-common-standard', 3, 1, 'Math: Why We Need One Measure', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-measure-common-standard', false, true),
  ('g3-math-mass-market-scale', 3, 2, 'Math: Balance the Market Scale', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-mass-market-scale', false, true),
  ('g3-math-capacity-kitchen', 3, 3, 'Math: Fill the One-Liter Jug', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-capacity-kitchen', false, true),
  ('g3-math-perimeter-garden', 3, 4, 'Math: Walk Around the Garden', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-perimeter-garden', false, true),
  ('g3-math-area-floor-squares', 3, 5, 'Math: Cover the Workshop Floor', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-area-floor-squares', false, true),
  ('g3-math-square-cube-build', 3, 6, 'Math: From a Square to a Cube', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-square-cube-build', false, true),
  ('g3-math-prime-arrangements', 3, 7, 'Math: Numbers With Only One Rectangle', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-prime-arrangements', false, true),
  ('g3-math-place-value-exchange', 3, 8, 'Math: Ten Become One in the Next Place', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-place-value-exchange', false, true),
  ('g3-math-addition-regrouping', 3, 9, 'Math: Add and Exchange', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-addition-regrouping', false, true),
  ('g3-math-subtraction-ungrouping', 3, 10, 'Math: Open One Bundle', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-subtraction-ungrouping', false, true),
  ('g3-math-round-nearest-ten', 3, 11, 'Math: Find the Nearest Ten', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-round-nearest-ten', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
