insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g4-math-place-value-regrouping', 4, 8, 'Math: Bundles That Change Places', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-place-value-regrouping', false, true),
  ('g4-math-area-floor-tiles', 4, 9, 'Math: Cover the Workshop Floor', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-area-floor-tiles', false, true),
  ('g4-math-fraction-branches', 4, 10, 'Math: One Whole, Smaller Shares', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fraction-branches', false, true),
  ('g4-math-fraction-of-number', 4, 11, 'Math: Share a Basket Fairly', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fraction-of-number', false, true),
  ('g4-math-remainder-as-fraction', 4, 12, 'Math: Share the Last Piece', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-remainder-as-fraction', false, true),
  ('g4-math-square-patterns', 4, 13, 'Math: Grow the Next Square', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-square-patterns', false, true),
  ('g5-math-fraction-division-sharing', 5, 21, 'Math: How Many Half-Cups Fit?', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g5-fraction-division-sharing', false, true),
  ('g5-math-fraction-decimal-weave', 5, 22, 'Math: Weave Tenths and Hundredths', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g5-fraction-decimal-weave', false, true),
  ('g6-math-decimal-place-system', 6, 13, 'Math: Across the Decimal Gate', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-decimal-place-system', false, true),
  ('g6-math-percent-hundred-grid', 6, 14, 'Math: Out of One Hundred', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-percent-hundred-grid', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
