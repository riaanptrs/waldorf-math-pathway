insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g3-math-subtraction-no-exchange', 3, 31, 'Math: Keep Every Place in Its Home', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-subtraction-no-exchange', false, true),
  ('g3-math-subtraction-open-ten', 3, 32, 'Math: Open One Ten', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-subtraction-open-ten', false, true),
  ('g3-math-subtraction-three-places', 3, 33, 'Math: Three Places, No Exchange', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-subtraction-three-places', false, true),
  ('g3-math-subtraction-open-hundred', 3, 34, 'Math: Open One Hundred', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-subtraction-open-hundred', false, true),
  ('g3-math-subtraction-two-exchanges', 3, 35, 'Math: Exchange Twice, One Place at a Time', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g3-subtraction-two-exchanges', false, true),
  ('g4-math-subtraction-through-zero', 4, 31, 'Math: Exchange Through an Empty Place', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-subtraction-through-zero', false, true),
  ('g4-math-subtraction-strategy-choice', 4, 32, 'Math: Choose the Shortest Sensible Path', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-subtraction-strategy-choice', false, true),
  ('g4-math-subtraction-estimate-check', 4, 33, 'Math: Estimate, Calculate, Rebuild', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-subtraction-estimate-check', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
