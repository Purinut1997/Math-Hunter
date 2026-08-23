import type { Difficulty, MathQuestion } from '../systems/QuestionGenerator';

type Stage3Difficulty = Extract<Difficulty, 'normal' | 'hard'>;
type DraftQuestion = {
  id: string;
  grade: number;
  difficulty: Stage3Difficulty;
  question: string;
  choices: string[];
  answerLetter?: string;
};

const LETTER_INDEX: Record<string, number> = { ก: 0, ข: 1, ค: 2, ง: 3 };

export class Stage3QuestionBank {
  private static questions = new Map<string, MathQuestion[]>();
  private static usedIds = new Set<string>();
  private static usedQuestionTexts = new Set<string>();

  static loadMarkdown(markdown: string) {
    const drafts: DraftQuestion[] = [];
    let grade = 0;
    let difficulty: Stage3Difficulty | null = null;
    let activeDraft: DraftQuestion | null = null;

    for (const rawLine of markdown.replace(/\r/g, '').split('\n')) {
      const line = rawLine.trimEnd();
      const gradeMatch = line.match(/^#\s+ระดับชั้น\s+ป\.(3|4|5|6)\s*$/);
      if (gradeMatch) {
        grade = Number(gradeMatch[1]);
        difficulty = null;
        activeDraft = null;
        continue;
      }
      if (/^##\s+ระดับปานกลาง(?:\s|—|$)/.test(line)) {
        difficulty = 'normal';
        activeDraft = null;
        continue;
      }
      if (/^##\s+ระดับยาก(?:\s|—|$)/.test(line)) {
        difficulty = 'hard';
        activeDraft = null;
        continue;
      }

      const questionHeading = line.match(/^###\s+ข้อ\s+\d+\s+—\s+`([^`]+)`\s*$/);
      if (questionHeading && grade && difficulty) {
        activeDraft = {
          id: questionHeading[1],
          grade,
          difficulty,
          question: '',
          choices: [],
        };
        drafts.push(activeDraft);
        continue;
      }
      if (!activeDraft) continue;

      const questionText = line.match(/^\s*-\s*\*\*โจทย์:\*\*\s*(.+?)\s*$/);
      if (questionText) {
        activeDraft.question = questionText[1].trim();
        continue;
      }
      const choice = line.match(/^\s*-\s*([กขคง])\.\s*(.+?)\s*$/);
      if (choice) {
        activeDraft.choices.push(choice[2].trim());
        continue;
      }
      const answer = line.match(/^\s*-\s*\*\*เฉลย:\*\*\s*([กขคง])\.\s*(.+?)\s*$/);
      if (answer) activeDraft.answerLetter = answer[1];
    }

    const parsed = new Map<string, MathQuestion[]>();
    for (const draft of drafts) {
      const answerIndex = draft.answerLetter ? LETTER_INDEX[draft.answerLetter] : -1;
      if (!draft.question || draft.choices.length !== 4 || new Set(draft.choices).size !== 4 || answerIndex < 0) {
        throw new Error(`Invalid Stage 3 question: ${draft.id}`);
      }
      const poolKey = `${draft.grade}:${draft.difficulty}`;
      const pool = parsed.get(poolKey) ?? [];
      pool.push({
        id: `stage3:${draft.id}`,
        question: draft.question,
        choices: draft.choices,
        correctAnswer: draft.choices[answerIndex],
      });
      parsed.set(poolKey, pool);
    }

    for (const selectedGrade of [3, 4, 5, 6]) {
      const normalCount = parsed.get(`${selectedGrade}:normal`)?.length ?? 0;
      const hardCount = parsed.get(`${selectedGrade}:hard`)?.length ?? 0;
      if (normalCount !== 35 || hardCount !== 15) {
        throw new Error(`Stage 3 bank requires P${selectedGrade} normal 35 / hard 15, found ${normalCount} / ${hardCount}`);
      }
    }

    this.questions = parsed;
    this.resetSession();
  }

  static resetSession() {
    this.usedIds.clear();
    this.usedQuestionTexts.clear();
  }

  static generate(grade: number, difficulty: Difficulty): MathQuestion {
    const stage3Difficulty: Stage3Difficulty = difficulty === 'hard' ? 'hard' : 'normal';
    const pool = this.questions.get(`${grade}:${stage3Difficulty}`);
    if (!pool?.length) throw new Error(`Stage 3 question bank is not loaded for P${grade} ${stage3Difficulty}`);

    let available = pool.filter(question =>
      !this.usedIds.has(question.id) && !this.usedQuestionTexts.has(question.question),
    );
    if (!available.length) {
      this.usedIds.clear();
      this.usedQuestionTexts.clear();
      available = [...pool];
    }

    const source = available[Math.floor(Math.random() * available.length)];
    this.usedIds.add(source.id);
    this.usedQuestionTexts.add(source.question);
    return { ...source, choices: this.shuffle([...source.choices]) };
  }

  static getPoolSize(grade: number, difficulty: Stage3Difficulty) {
    return this.questions.get(`${grade}:${difficulty}`)?.length ?? 0;
  }

  private static shuffle<T>(items: T[]) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  }
}
