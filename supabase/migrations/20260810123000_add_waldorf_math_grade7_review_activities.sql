insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g7-math-table-square-products', 7, 9, 'Math: Multiplication Table Thinking', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-table-square-products', false, true),
  ('g7-math-missing-digit', 7, 10, 'Math: Missing Digit Multiplication', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-missing-digit', false, true),
  ('g7-math-fraction-common-denominator', 7, 11, 'Math: Common Denominator Addition', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-fraction-common-denominator', false, true),
  ('g7-math-decimal-division-shift', 7, 12, 'Math: Make the Divisor Whole', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-decimal-division-shift', false, true),
  ('g7-math-unit-cost', 7, 13, 'Math: Which Price Is Better?', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-unit-cost', false, true),
  ('g7-math-divisibility-check', 7, 14, 'Math: Divisibility Rules', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-divisibility-check', false, true),
  ('g7-math-reduce-fraction', 7, 15, 'Math: Reduce a Large Fraction', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-reduce-fraction', false, true),
  ('g7-math-repeating-decimal-fraction', 7, 16, 'Math: Repeating Decimal to Fraction', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g7-repeating-decimal-fraction', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number,
    unit_position = excluded.unit_position,
    title = excluded.title,
    path = excluded.path,
    is_portfolio = excluded.is_portfolio,
    is_active = excluded.is_active;
