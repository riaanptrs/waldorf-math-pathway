insert into public.course_activities (activity_key, unit_number, unit_position, title, path, is_portfolio, is_active)
values
  ('g4-math-fractions-equivalence-observe', 4, 51, 'Math: See the Same Amount Again', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-equivalence-observe', false, true),
  ('g4-math-fractions-reduce-same', 4, 52, 'Math: What Is This the Same As?', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-reduce-same', false, true),
  ('g4-math-fractions-like-denominators', 4, 53, 'Math: Join Equal-Sized Pieces', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-like-denominators', false, true),
  ('g4-math-fractions-common-denominator', 4, 54, 'Math: Give Different Pieces One Name', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-common-denominator', false, true),
  ('g4-math-fractions-unlike-add', 4, 55, 'Math: Add Only After the Pieces Match', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-unlike-add', false, true),
  ('g4-math-fractions-unlike-subtract', 4, 56, 'Math: Compare Before You Remove', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-unlike-subtract', false, true),
  ('g4-math-fractions-multiply-meaning', 4, 57, 'Math: Take a Fraction of a Fraction', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-multiply-meaning', false, true),
  ('g4-math-fractions-mixed-improper', 4, 58, 'Math: Whole Shares and Extra Parts', 'https://riaanptrs.github.io/waldorf-math-pathway/#practice:g4-fractions-mixed-improper', false, true)
on conflict (activity_key) do update
set unit_number = excluded.unit_number, unit_position = excluded.unit_position,
    title = excluded.title, path = excluded.path,
    is_portfolio = excluded.is_portfolio, is_active = excluded.is_active;
