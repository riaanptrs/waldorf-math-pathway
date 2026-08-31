insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g1-math-number-quality-five', 1, 1, 'Math: Where Five Lives', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-number-quality-five', false, true),
  ('g1-math-whole-parts-eight', 1, 2, 'Math: Many Ways to Make Eight', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-whole-parts-eight', false, true),
  ('g1-math-four-paths-twelve', 1, 3, 'Math: Four Paths Around Twelve', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-four-paths-twelve', false, true),
  ('g1-math-addition-gathering', 1, 4, 'Math: Gather Two Groups', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-addition-gathering', false, true),
  ('g1-math-subtraction-reveals-part', 1, 5, 'Math: Reveal the Hidden Part', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-subtraction-reveals-part', false, true),
  ('g1-math-multiplication-equal-groups', 1, 6, 'Math: Equal Baskets', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-multiplication-equal-groups', false, true),
  ('g1-math-division-fair-sharing', 1, 7, 'Math: Share the Whole Fairly', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-division-fair-sharing', false, true),
  ('g1-math-rhythm-counting-twos', 1, 8, 'Math: Step the Twos', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g1-rhythm-counting-twos', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
