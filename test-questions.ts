import { QuestionGenerator } from './src/game/systems/QuestionGenerator.ts';

function runTests() {
  console.log('Running 1000 Question Generations Across All Grades...');
  
  let passed = 0;
  let failed = 0;
  const grades = [3, 4, 5, 6];
  const difficulties = ['easy', 'normal', 'hard'] as const;
  
  for (let i = 0; i < 1000; i++) {
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const diff = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    try {
      const q = QuestionGenerator.generate({ grade, difficulty: diff });
      
      const uniqueChoices = new Set(q.choices);
      const isUnique = uniqueChoices.size === 4;
      
      const correctCount = q.choices.filter(c => c === q.correctAnswer).length;
      
      if (!isUnique || correctCount !== 1) {
        console.error(`Validation failed for:`, q);
        failed++;
      } else {
        passed++;
      }
    } catch (e) {
      console.error(`Error generating question:`, e);
      failed++;
    }
  }

  console.log(`\nTest Complete:`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  }

  console.log('\nChecking Stage 2 grade routing and no-repeat sessions...');
  for (const grade of grades) {
    QuestionGenerator.resetRecentQuestions();
    const questionIds = new Set<string>();
    for (let index = 0; index < 120; index++) {
      const question = QuestionGenerator.generate({ grade, difficulty: 'normal', topic: 'subtraction' });
      if (questionIds.has(question.id)) throw new Error(`Duplicate Stage 2 question for grade ${grade}: ${question.id}`);
      questionIds.add(question.id);
    }
    console.log(`Grade ${grade}: ${questionIds.size}/120 unique questions`);
  }
}

runTests();
