const SITE_ID = "waldorf-math";
const SUBJECT_ID = "math";
const SHARED_DB_VERSION = "v1";

const lessons = [
  {
    id: "g7-percent-base",
    activityKey: "g7-math-percent-base",
    grade: "Grade 7",
    block: "Percents",
    title: "Finding the Base",
    time: "14 min",
    sourceFocus: "Grade 7 percent work: move from finding a percent of a number to finding the whole.",
    teacherAim:
      "Students practice inverse percent thinking before formal algebra: if a part is a known percent, the whole can be rebuilt.",
    rhythm: ["25% means one quarter.", "If 36 is one quarter, the whole is four quarters.", "Check by taking the percent again."],
    prompt: "A class raised 42 dollars. This was 35% of its fair-day goal. What was the whole goal?",
    correction:
      "35% is 35/100. Divide 42 by 0.35 to rebuild the whole goal, then check that 35% of your answer is 42.",
    answerType: "number",
    answer: 120,
    tolerance: 0,
    suffix: "dollars",
  },
  {
    id: "g7-compound-interest",
    activityKey: "g7-math-compound-interest",
    grade: "Grade 7",
    block: "Business Math",
    title: "Simple and Compound Interest",
    time: "16 min",
    sourceFocus: "Grade 7 compound interest: compound annually by repeated year-by-year percent growth.",
    teacherAim:
      "Students compare simple interest with compound interest without using the later exponential-growth formula.",
    rhythm: ["Start with the principal.", "Find this year's interest.", "Add it before finding the next year's interest."],
    prompt:
      "Mara saves 200 dollars at 5% interest compounded annually. What is the balance after 2 years?",
    correction:
      "Year 1 earns 10 dollars, so the balance is 210. Year 2 earns 5% of 210, which is 10.50. Add that to 210.",
    answerType: "number",
    answer: 220.5,
    tolerance: 0.01,
    suffix: "dollars",
  },
  {
    id: "g7-ratio-whole",
    activityKey: "g7-math-ratio-whole",
    grade: "Grade 7",
    block: "Ratios",
    title: "Sharing by Ratio",
    time: "12 min",
    sourceFocus: "Grade 7 ratios: interpret parts of a whole before solving proportion equations.",
    teacherAim:
      "Students see a ratio as parts of a whole and use fraction-of-the-whole reasoning.",
    rhythm: ["Add the ratio parts.", "Name each share as part of the whole.", "Multiply the whole by that part."],
    prompt: "A garden bed has red and yellow flowers in a ratio of 2:3. There are 45 flowers altogether. How many are yellow?",
    correction:
      "The ratio has 5 total parts. Yellow is 3 of those 5 parts, so find 3/5 of 45.",
    answerType: "number",
    answer: 27,
    tolerance: 0,
    suffix: "yellow flowers",
  },
  {
    id: "g7-rate-speed",
    activityKey: "g7-math-rate-speed",
    grade: "Grade 7",
    block: "Rates",
    title: "Average Speed",
    time: "15 min",
    sourceFocus: "Grade 7 rate problems: build intuition for when to multiply and when to divide.",
    teacherAim:
      "Students convert time units and divide total distance by total time to find a rate.",
    rhythm: ["Rate means amount per one.", "Change minutes into hours.", "Divide distance by hours."],
    prompt: "A cyclist travels 6 miles in 15 minutes. What is the cyclist's average speed in miles per hour?",
    correction:
      "15 minutes is 1/4 hour. A rate in miles per hour asks how far in one hour, so divide 6 by 1/4.",
    answerType: "number",
    answer: 24,
    tolerance: 0,
    suffix: "mph",
  },
  {
    id: "g7-negative-numbers",
    activityKey: "g7-math-negative-numbers",
    grade: "Grade 7",
    block: "Algebra",
    title: "Positive and Negative Numbers",
    time: "10 min",
    sourceFocus: "Grade 7 algebra main lesson: careful practice with all four operations using signed numbers.",
    teacherAim:
      "Students work with negative numbers as number relationships, then check by reversing operations.",
    rhythm: ["A negative times a positive is negative.", "A negative times a negative is positive.", "Check the sign before the size."],
    prompt: "Find the value of -8 x 7 + 18.",
    correction:
      "First multiply: -8 x 7 = -56. Then add 18, moving 18 steps toward zero.",
    answerType: "number",
    answer: -38,
    tolerance: 0,
  },
  {
    id: "g7-expression-like-terms",
    activityKey: "g7-math-expression-like-terms",
    grade: "Grade 7",
    block: "Algebra",
    title: "Combining Like Terms",
    time: "13 min",
    sourceFocus: "Grade 7 algebra: develop clear form while simplifying expressions.",
    teacherAim:
      "Students separate unlike terms and constants, then simplify with neat visible steps.",
    rhythm: ["Gather the same letters.", "Gather plain numbers.", "Keep unlike terms separate."],
    prompt: "Simplify: 6k - 3 + 4k - 11. Write the simplified expression.",
    correction:
      "Combine 6k and 4k to make 10k. Combine -3 and -11 to make -14.",
    answerType: "expression",
    acceptedAnswers: ["10k-14", "10k - 14"],
  },
  {
    id: "g7-equation-balance",
    activityKey: "g7-math-equation-balance",
    grade: "Grade 7",
    block: "Algebra",
    title: "Balance the Equation",
    time: "14 min",
    sourceFocus: "Grade 7 algebra: solve equations by doing the same thing to both sides.",
    teacherAim:
      "Students use the golden rule of equations and verify the value by substitution.",
    rhythm: ["Keep the equal sign balanced.", "Move constants together.", "Divide last."],
    prompt: "Solve for x: 5x - 2 = 3x + 8.",
    correction:
      "Subtract 3x from both sides to get 2x - 2 = 8. Add 2 to both sides, then divide by 2.",
    answerType: "number",
    answer: 5,
    tolerance: 0,
  },
  {
    id: "g7-gauss-sum",
    activityKey: "g7-math-gauss-sum",
    grade: "Grade 7",
    block: "Formulas",
    title: "Gauss's Sum",
    time: "16 min",
    sourceFocus: "Grade 7 formulas: use first, last, and number of terms to sum an arithmetic sequence.",
    teacherAim:
      "Students experience a formula as condensed thinking rather than a rule to memorize.",
    rhythm: ["Pair first with last.", "Count how many numbers.", "Use half the count times the pair sum."],
    prompt: "Find the sum of 12 + 15 + 18 + ... + 48.",
    correction:
      "The sequence has 13 numbers. First plus last is 60. Use 13 x 60 / 2.",
    answerType: "number",
    answer: 390,
    tolerance: 0,
  },
];

const sharedDbShape = {
  siteSlug: SITE_ID,
  subjectSlug: SUBJECT_ID,
  accountNamespace: "Waldorf English Pathway Supabase",
  accountFields: ["auth.users.email", "guardian_profiles.user_id", "learners.nickname", "learners.school_year"],
  progressFields: ["objective_responses.learner_id", "objective_responses.activity_key", "activity_progress.completed"],
};

window.lessons = lessons;
window.sharedDbShape = sharedDbShape;
