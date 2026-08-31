insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g4-math-division-share-big-whole', 4, 41, 'Math: Share a Large Whole Fairly', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-division-share-big-whole', false, true),
  ('g4-math-division-story-columns', 4, 42, 'Math: Track the Whole and Each Group', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-division-story-columns', false, true),
  ('g4-math-division-flexible-chunks', 4, 43, 'Math: Different Chunks, Same Quotient', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-division-flexible-chunks', false, true),
  ('g4-math-division-remainder-meaning', 4, 44, 'Math: What Should the Remainder Mean?', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-division-remainder-meaning', false, true),
  ('g5-math-division-place-value-shortcut', 5, 41, 'Math: Compress the Friendly Chunks', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g5-division-place-value-shortcut', false, true),
  ('g5-math-division-two-digit-divisor', 5, 42, 'Math: Estimate with a Two-Digit Divisor', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g5-division-two-digit-divisor', false, true),
  ('g6-math-division-decimal-quotient', 6, 41, 'Math: Continue Past the Decimal Point', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-division-decimal-quotient', false, true),
  ('g6-math-division-repeating-pattern', 6, 42, 'Math: Notice a Repeating Remainder', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g6-division-repeating-pattern', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
