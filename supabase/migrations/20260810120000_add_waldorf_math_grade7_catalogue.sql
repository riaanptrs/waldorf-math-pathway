alter table public.course_activities
  drop constraint if exists course_activities_unit_number_check;

alter table public.course_activities
  add constraint course_activities_unit_number_check
  check (unit_number >= 1 and unit_number <= 7);

insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g7-math-percent-base', 7, 1, 'Math: Finding the Base', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-percent-base', false, true),
  ('g7-math-compound-interest', 7, 2, 'Math: Simple and Compound Interest', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-compound-interest', false, true),
  ('g7-math-ratio-whole', 7, 3, 'Math: Sharing by Ratio', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-ratio-whole', false, true),
  ('g7-math-rate-speed', 7, 4, 'Math: Average Speed', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-rate-speed', false, true),
  ('g7-math-negative-numbers', 7, 5, 'Math: Positive and Negative Numbers', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-negative-numbers', false, true),
  ('g7-math-expression-like-terms', 7, 6, 'Math: Combining Like Terms', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-expression-like-terms', false, true),
  ('g7-math-equation-balance', 7, 7, 'Math: Balance the Equation', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-equation-balance', false, true),
  ('g7-math-gauss-sum', 7, 8, 'Math: Gauss''s Sum', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-gauss-sum', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number,
    unit_position = excluded.unit_position,
    title = excluded.title,
    path = excluded.path,
    is_portfolio = excluded.is_portfolio,
    is_active = excluded.is_active;
