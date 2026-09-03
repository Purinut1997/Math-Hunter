import { MASTER_QUESTIONS, type QuestionItem } from './MasterQuestionsData.ts';
import type { Difficulty, MathQuestion } from '../systems/QuestionGenerator.ts';

export class MasterQuestionBank {
  private static pools = new Map<string, QuestionItem[]>();
  private static usedIds = new Set<string>();

  static {
    for (const item of MASTER_QUESTIONS) {
      const key = `${item.grade}:${item.difficulty}`;
      const list = this.pools.get(key) ?? [];
      list.push(item);
      this.pools.set(key, list);
    }
  }

  public static resetSession(): void {
    this.usedIds.clear();
  }

  public static getPoolSize(grade: number, difficulty: Difficulty): number {
    return this.pools.get(`${grade}:${difficulty}`)?.length ?? 0;
  }

  public static getUsedCount(): number {
    return this.usedIds.size;
  }

  public static generate(grade: number, difficulty: Difficulty): MathQuestion {
    const key = `${grade}:${difficulty}`;
    const pool = this.pools.get(key);

    if (!pool || pool.length === 0) {
      throw new Error(`No questions available for Grade ${grade} and difficulty ${difficulty}`);
    }

    const available = pool.filter(q => !this.usedIds.has(q.id));
    const targetPool = available.length > 0 ? available : pool;

    if (available.length === 0) {
      for (const q of pool) {
        this.usedIds.delete(q.id);
      }
    }

    const selectedIndex = Math.floor(Math.random() * targetPool.length);
    const item = targetPool[selectedIndex];
    this.usedIds.add(item.id);

    return {
      id: item.id,
      question: item.question,
      choices: this.shuffleArray([...item.choices]),
      correctAnswer: item.correctAnswer,
    };
  }

  private static shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
