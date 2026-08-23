import { QuestionGenerator } from './src/game/systems/QuestionGenerator.ts';
import { Stage2QuestionBank } from './src/game/data/Stage2QuestionBank.ts';
import { readFileSync } from 'node:fs';

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

  console.log('\nChecking Stage 2 document bank, grade routing, and no-repeat sessions...');
  Stage2QuestionBank.loadMarkdown(readFileSync('./public/assets/data/stage2_questions.md', 'utf8'));
  for (const grade of grades) {
    for (const difficulty of ['easy', 'normal'] as const) {
      Stage2QuestionBank.resetSession();
      const questionIds = new Set<string>();
      const questionTexts = new Set<string>();
      for (let index = 0; index < 14; index++) {
        const question = QuestionGenerator.generate({ grade, difficulty, topic: 'stage2' });
        if (questionIds.has(question.id) || questionTexts.has(question.question)) {
          throw new Error(`Duplicate Stage 2 question for grade ${grade} ${difficulty}: ${question.id}`);
        }
        if (!question.choices.includes(question.correctAnswer)) {
          throw new Error(`Missing correct choice for grade ${grade} ${difficulty}: ${question.id}`);
        }
        if (new Set(question.choices).size !== 4 || question.choices.filter(choice => choice === question.correctAnswer).length !== 1) {
          throw new Error(`Invalid Stage 2 choices for grade ${grade} ${difficulty}: ${question.id}`);
        }
        questionIds.add(question.id);
        questionTexts.add(question.question);
      }
      console.log(`Grade ${grade} ${difficulty}: pool ${Stage2QuestionBank.getPoolSize(grade, difficulty)}, sampled ${questionIds.size} unique`);
    }
  }
}

runTests();
