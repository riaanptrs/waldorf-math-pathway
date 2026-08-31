insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g2-math-calendar-months', 2, 1, 'Math: A Year in Twelve Parts', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-calendar-months', false, true),
  ('g2-math-week-passage', 2, 2, 'Math: Yesterday, Today, Tomorrow', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-week-passage', false, true),
  ('g2-math-seasons-cycle', 2, 3, 'Math: The Turning Seasons', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-seasons-cycle', false, true),
  ('g2-math-clock-whole-hours', 2, 4, 'Math: The Two Clock Hands', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-clock-whole-hours', false, true),
  ('g2-math-clock-five-minute-steps', 2, 5, 'Math: Minutes Around the Clock', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-clock-five-minute-steps', false, true),
  ('g2-math-times-table-patterns', 2, 6, 'Math: Build the Table Before Memorizing', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-times-table-patterns', false, true),
  ('g2-math-rich-number-twelve', 2, 7, 'Math: How Rich Is Twelve?', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-rich-number-twelve', false, true),
  ('g2-math-odd-even-pairs', 2, 8, 'Math: Pairs With Nothing Left Over', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-odd-even-pairs', false, true),
  ('g2-math-money-one-real', 2, 9, 'Math: One Real, Many Combinations', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-money-one-real', false, true),
  ('g2-math-money-change', 2, 10, 'Math: Pay and Find the Change', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g2-money-change', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
