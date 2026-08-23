import type { Difficulty, MathQuestion } from '../systems/QuestionGenerator';

type Stage2Difficulty = Extract<Difficulty, 'easy' | 'normal'>;
type DraftQuestion = {
  grade: number;
  difficulty: Stage2Difficulty;
  number: number;
  question: string;
  choices: string[];
  answerLetter?: string;
};

const LETTER_INDEX: Record<string, number> = { ก: 0, ข: 1, ค: 2, ง: 3 };

export class Stage2QuestionBank {
  private static questions = new Map<string, MathQuestion[]>();
  private static usedIds = new Set<string>();
  private static usedQuestionTexts = new Set<string>();

  static loadMarkdown(markdown: string) {
    const drafts = new Map<string, DraftQuestion>();
    let grade = 0;
    let difficulty: Stage2Difficulty | null = null;
    let readingAnswers = false;
    let activeDraft: DraftQuestion | null = null;
    const keyFor = (questionNumber: number) => `${grade}:${difficulty}:${questionNumber}`;

    for (const rawLine of markdown.replace(/\r/g, '').split('\n')) {
      const line = rawLine.trimEnd();
      const gradeMatch = line.match(/^##\s+ป\.(3|4|5|6)\b/);
      if (gradeMatch) {
        grade = Number(gradeMatch[1]);
        difficulty = null;
        readingAnswers = false;
        activeDraft = null;
        continue;
      }
      if (/^###\s+ระดับง่าย\s*$/.test(line)) {
        difficulty = 'easy';
        readingAnswers = false;
        activeDraft = null;
        continue;
      }
      if (/^###\s+ระดับปานกลาง\s*$/.test(line)) {
        difficulty = 'normal';
        readingAnswers = false;
        activeDraft = null;
        continue;
      }
      if (/^####\s+เฉลย/.test(line)) {
        readingAnswers = true;
        activeDraft = null;
        continue;
      }
      if (!grade || !difficulty) continue;

      const numberedLine = line.match(/^\s*(\d+)\.\s+(.+?)\s*$/);
      if (numberedLine) {
        const number = Number(numberedLine[1]);
        if (readingAnswers) {
          const answerLetter = numberedLine[2].trim();
          const draft = drafts.get(keyFor(number));
          if (draft && answerLetter in LETTER_INDEX) draft.answerLetter = answerLetter;
        } else {
          activeDraft = {
            grade,
            difficulty,
            number,
            question: numberedLine[2].trim(),
            choices: [],
          };
          drafts.set(keyFor(number), activeDraft);
        }
        continue;
      }

      const choice = line.match(/^\s*-\s*[กขคง]\)\s*(.+?)\s*$/);
      if (choice && activeDraft && !readingAnswers) activeDraft.choices.push(choice[1].trim());
    }

    const parsed = new Map<string, MathQuestion[]>();
    for (const draft of drafts.values()) {
      const answerIndex = draft.answerLetter ? LETTER_INDEX[draft.answerLetter] : -1;
      if (draft.choices.length !== 4 || answerIndex < 0 || !draft.choices[answerIndex]) {
        throw new Error(`Invalid Stage 2 question: P${draft.grade} ${draft.difficulty} #${draft.number}`);
      }
      const correctAnswer = draft.choices[answerIndex];
      const choices = this.ensureUniqueChoices(draft.choices, answerIndex);
      const poolKey = `${draft.grade}:${draft.difficulty}`;
      const pool = parsed.get(poolKey) ?? [];
      pool.push({
        id: `stage2:p${draft.grade}:${draft.difficulty}:${draft.number}`,
        question: draft.question,
        choices,
        correctAnswer,
      });
      parsed.set(poolKey, pool);
    }

    for (const selectedGrade of [3, 4, 5, 6]) {
      for (const selectedDifficulty of ['easy', 'normal'] as const) {
        const count = parsed.get(`${selectedGrade}:${selectedDifficulty}`)?.length ?? 0;
        if (count !== 25) {
          throw new Error(`Stage 2 bank requires 25 P${selectedGrade} ${selectedDifficulty} questions, found ${count}`);
        }
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
    const stage2Difficulty: Stage2Difficulty = difficulty === 'easy' ? 'easy' : 'normal';
    const pool = this.questions.get(`${grade}:${stage2Difficulty}`);
    if (!pool?.length) throw new Error(`Stage 2 question bank is not loaded for P${grade} ${stage2Difficulty}`);

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

  static getPoolSize(grade: number, difficulty: Stage2Difficulty) {
    return this.questions.get(`${grade}:${difficulty}`)?.length ?? 0;
  }

  private static shuffle<T>(items: T[]) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  }

  private static ensureUniqueChoices(source: string[], answerIndex: number) {
    const correctAnswer = source[answerIndex];
    const used = new Set<string>([correctAnswer]);
    return source.map((choice, index) => {
      if (index === answerIndex) return correctAnswer;
      if (!used.has(choice)) {
        used.add(choice);
        return choice;
      }
      const replacement = this.createDistractor(correctAnswer, used);
      used.add(replacement);
      return replacement;
    });
  }

  private static createDistractor(correctAnswer: string, used: Set<string>) {
    const fractionOrRatio = correctAnswer.match(/^(-?\d+)\s*([/:])\s*(\d+)$/);
    if (fractionOrRatio) {
      const numerator = Number(fractionOrRatio[1]);
      const separator = fractionOrRatio[2];
      const denominator = Number(fractionOrRatio[3]);
      for (const offset of [1, 2, -1, 3, -2]) {
        const candidate = `${Math.max(0, numerator + offset)}${separator}${denominator}`;
        if (!used.has(candidate) && candidate !== correctAnswer) return candidate;
      }
    }

    const numericAnswer = Number(correctAnswer);
    if (Number.isFinite(numericAnswer)) {
      const decimalPlaces = correctAnswer.includes('.') ? correctAnswer.split('.')[1].length : 0;
      const offsets = decimalPlaces ? [0.1, -0.1, 1, -1, 10, -10] : [1, -1, 10, -10, 2, -2];
      for (const offset of offsets) {
        const value = numericAnswer + offset;
        if (value < 0) continue;
        const candidate = decimalPlaces ? value.toFixed(decimalPlaces) : String(value);
        if (!used.has(candidate) && candidate !== correctAnswer) return candidate;
      }
    }

    let suffix = 1;
    while (used.has(`${correctAnswer} ${suffix}`)) suffix += 1;
    return `${correctAnswer} ${suffix}`;
  }
}
