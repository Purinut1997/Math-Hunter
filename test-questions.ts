import { QuestionGenerator } from './src/game/systems/QuestionGenerator.ts';
import { MasterQuestionBank } from './src/game/data/MasterQuestionBank.ts';
import { CombatManager } from './src/game/systems/CombatManager.ts';

function runTests() {
  console.log('=== 1. Checking MasterQuestionBank Pools and Choice Validation ===');
  const grades = [3, 4, 5, 6];
  const difficulties = ['easy', 'normal', 'hard'] as const;

  let totalQuestionsChecked = 0;

  for (const grade of grades) {
    for (const difficulty of difficulties) {
      const poolSize = MasterQuestionBank.getPoolSize(grade, difficulty);
      if (poolSize !== 30) {
        throw new Error(`Expected 30 questions for Grade ${grade} (${difficulty}), found ${poolSize}`);
      }

      MasterQuestionBank.resetSession();
      const seenIds = new Set<string>();

      for (let i = 0; i < poolSize; i++) {
        const q = QuestionGenerator.generate({ grade, difficulty });
        totalQuestionsChecked++;

        if (seenIds.has(q.id)) {
          throw new Error(`Duplicate question ID generated within session: ${q.id}`);
        }
        seenIds.add(q.id);

        const uniqueChoices = new Set(q.choices);
        if (uniqueChoices.size !== 4) {
          throw new Error(`Choices are not 4 unique items for ${q.id}: ${JSON.stringify(q.choices)}`);
        }

        const matchCount = q.choices.filter(c => String(c) === String(q.correctAnswer)).length;
        if (matchCount !== 1) {
          throw new Error(`Correct answer "${q.correctAnswer}" not found exactly once in choices: ${JSON.stringify(q.choices)}`);
        }
      }

      console.log(`Grade ${grade} [${difficulty}]: Verified ${poolSize} unique questions with 4 choices.`);
    }
  }

  console.log(`\nTotal verified question bank items: ${totalQuestionsChecked}/360`);

  console.log('\n=== 2. Random Sampling Stress Test (1000 generations) ===');
  let passed = 0;
  for (let i = 0; i < 1000; i++) {
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const diff = difficulties[Math.floor(Math.random() * difficulties.length)];
    const q = QuestionGenerator.generate({ grade, difficulty: diff });
    const uniqueChoices = new Set(q.choices);
    if (uniqueChoices.size === 4 && q.choices.includes(q.correctAnswer)) {
      passed++;
    }
  }
  console.log(`Stress test passed: ${passed}/1000`);
  if (passed !== 1000) process.exit(1);

  console.log('\n=== 3. CombatManager Difficulty Distribution Tests ===');

  function sampleDifficulties(cm: CombatManager, isBoss: boolean, samples = 10000): Record<string, number> {
    const counts: Record<string, number> = { easy: 0, normal: 0, hard: 0 };
    for (let i = 0; i < samples; i++) {
      cm.startEncounter({
        monsterId: isBoss ? 'king_slime' : 'slime_1',
        maxHp: 3,
        difficulty: 'easy'
      });
      const q = (cm as any).state.currentQuestion;
      const idParts = q.id.split(':');
      const diff = idParts[1];
      counts[diff] = (counts[diff] || 0) + 1;
      cm.endEncounter();
    }
    return counts;
  }

  // Stage 1 Normal: 100% easy
  const s1Normal = sampleDifficulties(new CombatManager(3, 'mixed'), false, 2000);
  console.log('Stage 1 Normal:', s1Normal);
  if (s1Normal.easy !== 2000) throw new Error('Stage 1 normal must be 100% easy');

  // Stage 1 Boss: 50% easy, 50% normal
  const s1Boss = sampleDifficulties(new CombatManager(3, 'mixed'), true, 5000);
  console.log('Stage 1 Boss (target: ~50% easy, ~50% normal):', {
    easyPct: (s1Boss.easy / 5000 * 100).toFixed(1) + '%',
    normalPct: (s1Boss.normal / 5000 * 100).toFixed(1) + '%'
  });
  if (s1Boss.hard > 0 || Math.abs(s1Boss.easy - 2500) > 250) throw new Error('Stage 1 boss distribution out of range');

  // Stage 2 Normal: 70% easy, 30% normal
  const s2Normal = sampleDifficulties(new CombatManager(4, 'stage2'), false, 5000);
  console.log('Stage 2 Normal (target: 70% easy, 30% normal):', {
    easyPct: (s2Normal.easy / 5000 * 100).toFixed(1) + '%',
    normalPct: (s2Normal.normal / 5000 * 100).toFixed(1) + '%'
  });
  if (s2Normal.hard > 0 || Math.abs(s2Normal.normal - 1500) > 250) throw new Error('Stage 2 normal distribution out of range');

  // Stage 2 Boss: 40% easy, 50% normal, 10% hard
  const s2Boss = sampleDifficulties(new CombatManager(4, 'stage2'), true, 5000);
  console.log('Stage 2 Boss (target: 40% easy, 50% normal, 10% hard):', {
    easyPct: (s2Boss.easy / 5000 * 100).toFixed(1) + '%',
    normalPct: (s2Boss.normal / 5000 * 100).toFixed(1) + '%',
    hardPct: (s2Boss.hard / 5000 * 100).toFixed(1) + '%'
  });
  if (Math.abs(s2Boss.easy - 2000) > 250 || Math.abs(s2Boss.normal - 2500) > 250 || Math.abs(s2Boss.hard - 500) > 150) {
    throw new Error('Stage 2 boss distribution out of range');
  }

  // Stage 3 Normal: 60:40:10 ratio (54.5% easy, 36.4% normal, 9.1% hard)
  const s3Normal = sampleDifficulties(new CombatManager(5, 'stage3'), false, 5500);
  console.log('Stage 3 Normal (target: 60:40:10 weight):', {
    easyPct: (s3Normal.easy / 5500 * 100).toFixed(1) + '%',
    normalPct: (s3Normal.normal / 5500 * 100).toFixed(1) + '%',
    hardPct: (s3Normal.hard / 5500 * 100).toFixed(1) + '%'
  });

  // Stage 3 Boss: 90% normal, 10% hard
  const s3Boss = sampleDifficulties(new CombatManager(6, 'stage3'), true, 5000);
  console.log('Stage 3 Boss (target: 90% normal, 10% hard):', {
    normalPct: (s3Boss.normal / 5000 * 100).toFixed(1) + '%',
    hardPct: (s3Boss.hard / 5000 * 100).toFixed(1) + '%'
  });
  if (s3Boss.easy > 0 || Math.abs(s3Boss.hard - 500) > 150) {
    throw new Error('Stage 3 boss distribution out of range');
  }

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n');
}

runTests();
