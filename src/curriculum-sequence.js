(() => {
  const lessons = window.lessons || [];

  const blockOrder = {
    "Grade 1": ["Living Numbers", "Whole and Parts", "Movement and Number", "Four Relationships"],
    "Grade 2": ["Living Time", "Rhythm and Tables", "Number Patterns", "Money in Parts"],
    "Grade 3": ["Measure Through Work", "Number Shapes", "Place Value", "Meaningful Subtraction"],
    "Grade 4": ["Place Value", "Subtraction Strategies", "Long Division Stories", "Square Measure", "Number Patterns", "Fraction Beginnings", "Fractions Block 1", "Fractions Block 2", "Fractions Block 3"],
    "Grade 5": ["Efficient Long Division", "Fraction Review", "Fraction Path", "Fractions to Decimals", "Decimal Fractions", "Metric Measure", "Measurement", "Ancient Measures", "Freehand Geometry", "Symmetry"],
    "Grade 6": ["Decimal System", "Division Beyond Whole Numbers", "Fractions", "Percents", "Fair Trade", "Discounts", "Unit Cost", "Business Math", "Interest", "Budgeting", "Market Day", "Portfolio", "Geometry", "String, Shadow & Measure", "Core Competency Lab"],
    "Grade 7": ["Arithmetic Review", "Puzzles", "Divisibility", "Fractions", "Decimals", "Repeating Decimals", "Percents", "Business Math", "Ratios & Rates Path", "Ratios", "Rates", "Unit Cost", "Geometry Through Shadow", "Álgebra", "Formulas", "Reasoning Competency Lab"],
    "Grade 8": ["Number Bases", "Scientific Notation", "Percent Growth", "Dimensional Analysis", "Proportions & Graphs Path", "Proportions", "Álgebra", "Pythagorean Theorem", "Mensuration", "Solid & Curved Geometry", "Applied Competency Lab"],
    "Grade 9": ["Algebra I Foundations Path", "Álgebra I", "Systems", "Exponents", "Radicals", "Linear Functions", "Coordinate Geometry", "Quadratics", "Growth Models", "Geometry of the Earth", "Algebra Readiness Lab"],
  };

  const lessonPriority = {
    "g4-fraction-branches": 0,
    "g4-fraction-of-number": 1,
    "g4-remainder-as-fraction": 2,
    "g5-fractions-equivalent-visual": 0,
    "g5-fractions-reduce-gcf": 1,
    "g5-fractions-common-denominator": 2,
    "g5-fractions-improper-to-mixed": 3,
    "g5-fractions-mixed-to-improper": 4,
    "g5-fractions-unlike-denominators": 5,
    "g5-fractions-compare": 6,
    "g5-fractions-multiply-cancel": 7,
    "g5-fraction-division-sharing": 8,
    "g5-fractions-divide-reciprocal": 9,
    "g5-fractions-path-review": 10,
    "g5-fraction-decimal-quarter": 0,
    "g5-fraction-decimal-weave": 1,
    "g6-percent-hundred-grid": 0,
    "g6-percent-half": 1,
  };

  const originalPosition = new Map(lessons.map((lesson, index) => [lesson.id, index]));
  const gradeNumber = (grade) => Number.parseInt(String(grade).replace(/\D/g, ""), 10) || 99;

  lessons.sort((a, b) => {
    const gradeDifference = gradeNumber(a.grade) - gradeNumber(b.grade);
    if (gradeDifference) return gradeDifference;

    const order = blockOrder[a.grade] || [];
    const aBlock = order.includes(a.block) ? order.indexOf(a.block) : order.length;
    const bBlock = order.includes(b.block) ? order.indexOf(b.block) : order.length;
    if (aBlock !== bBlock) return aBlock - bBlock;

    const aPriority = lessonPriority[a.id];
    const bPriority = lessonPriority[b.id];
    if (aPriority !== undefined || bPriority !== undefined) {
      return (aPriority ?? 100) - (bPriority ?? 100);
    }
    return originalPosition.get(a.id) - originalPosition.get(b.id);
  });
})();
