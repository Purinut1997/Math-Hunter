export type Difficulty = 'easy' | 'normal' | 'hard';

export interface MathQuestion {
  id: string;
  question: string;
  choices: (number | string)[];
  correctAnswer: number | string;
}

export class QuestionGenerator {
  private static recentQuestions = new Set<string>();

  static generate(params: { grade: number, difficulty: Difficulty, topic?: string }): MathQuestion {
    let attempts = 0;
    while (attempts < 2000) {
      const q = params.topic === 'subtraction'
        ? this.generateSubtraction(params.grade, params.difficulty)
        : this.createQuestionForGrade(params.grade, params.difficulty);
      if (this.validateQuestion(q)) {
        this.addRecentQuestion(q.id);
        return q;
      }
      attempts++;
    }
    
    throw new Error('Unable to generate a unique valid question for this stage');
  }

  private static generateSubtraction(grade: number, difficulty: Difficulty): MathQuestion {
    if (grade === 5 && Math.random() > 0.5) {
      const denominator = Math.floor(Math.random() * (difficulty === 'easy' ? 8 : 16)) + 5;
      const b = Math.floor(Math.random() * (denominator - 2)) + 1;
      const a = Math.floor(Math.random() * (denominator - b - 1)) + b + 1;
      const correctNumerator = a - b;
      const correct = `${correctNumerator}/${denominator}`;
      const choices = new Set<string>([correct]);
      for (const offset of [1, -1, 2, -2, 3, -3]) {
        if (choices.size >= 4) break;
        const candidate = correctNumerator + offset;
        if (candidate > 0) choices.add(`${candidate}/${denominator}`);
      }
      return {
        id: `sub:g5:fraction:${a}:${b}:${denominator}`,
        question: `${a}/${denominator} − ${b}/${denominator} = ?`,
        correctAnswer: correct,
        choices: this.shuffleArray(Array.from(choices)),
      };
    }

    if (grade === 6) {
      if (Math.random() > 0.5) {
        const bases = difficulty === 'easy' ? [100, 200, 400, 500] : [400, 500, 800, 1000, 2000];
        const percents = [10, 20, 25, 30, 40, 50, 60, 75];
        const base = bases[Math.floor(Math.random() * bases.length)];
        const percent = percents[Math.floor(Math.random() * percents.length)];
        const correct = base - (base * percent) / 100;
        return {
          id: `sub:g6:percent:${base}:${percent}`,
          question: `${base} ลดลง ${percent}% เหลือเท่าไร?`,
          correctAnswer: correct,
          choices: this.generateNumberDistractors(correct, [10, -10, 20, -20, 100, -100]),
        };
      }

      const leftRatio = Math.floor(Math.random() * 4) + 2;
      const rightRatio = Math.floor(Math.random() * 5) + leftRatio + 1;
      const multiplier = Math.floor(Math.random() * 6) + 3;
      const left = leftRatio * multiplier;
      const right = rightRatio * multiplier;
      const removed = multiplier;
      const newLeft = left - removed;
      const divisor = this.gcd(newLeft, right);
      const correct = `${newLeft / divisor}:${right / divisor}`;
      const choices = new Set<string>([correct]);
      for (const offset of [1, -1, 2, -2, 3, -3]) {
        if (choices.size >= 4) break;
        const candidateLeft = Math.max(1, newLeft + offset);
        const candidateDivisor = this.gcd(candidateLeft, right);
        choices.add(`${candidateLeft / candidateDivisor}:${right / candidateDivisor}`);
      }
      return {
        id: `sub:g6:ratio:${left}:${right}:${removed}`,
        question: `อัตราส่วน ${left}:${right} เมื่อลดจำนวนแรกลง ${removed} อัตราส่วนใหม่คือ?`,
        correctAnswer: correct,
        choices: this.shuffleArray(Array.from(choices)),
      };
    }

    if (grade === 5) {
      const precision = grade >= 6 || difficulty !== 'easy' ? 2 : 1;
      const factor = 10 ** precision;
      const range = difficulty === 'easy' ? 100 : difficulty === 'normal' ? 1000 : 10000;
      let a = Math.floor(Math.random() * range * factor) + factor;
      let b = Math.floor(Math.random() * range * factor) + 1;
      if (a < b) [a, b] = [b, a];
      const correct = ((a - b) / factor).toFixed(precision);
      const choices = new Set<string>([correct]);
      for (const offset of [1, -1, 10, -10, 100, -100]) {
        if (choices.size >= 4) break;
        const candidate = a - b + offset;
        if (candidate >= 0) choices.add((candidate / factor).toFixed(precision));
      }
      while (choices.size < 4) {
        const candidate = Math.max(0, a - b + Math.floor(Math.random() * 19) - 9);
        choices.add((candidate / factor).toFixed(precision));
      }
      return {
        id: `sub:g${grade}:${a}:${b}:${precision}`,
        question: `${(a / factor).toFixed(precision)} − ${(b / factor).toFixed(precision)} = ?`,
        correctAnswer: correct,
        choices: this.shuffleArray(Array.from(choices)),
      };
    }

    const max = grade === 3
      ? (difficulty === 'easy' ? 100 : difficulty === 'normal' ? 500 : 1000)
      : (difficulty === 'easy' ? 1000 : difficulty === 'normal' ? 10000 : 100000);
    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * max) + 1;
    if (a < b) [a, b] = [b, a];
    const correct = a - b;
    return {
      id: `sub:g${grade}:${a}:${b}`,
      question: `${a} − ${b} = ?`,
      correctAnswer: correct,
      choices: this.generateNumberDistractors(correct, [1, -1, 10, -10, 100, -100]),
    };
  }

  private static createQuestionForGrade(grade: number, difficulty: Difficulty): MathQuestion {
    if (grade === 3) return this.generateGrade3(difficulty);
    if (grade === 4) return this.generateGrade4(difficulty);
    if (grade === 5) return this.generateGrade5(difficulty);
    if (grade >= 6) return this.generateGrade6(difficulty);
    return this.generateGrade3(difficulty); // Default
  }

  // ==========================================
  // GRADE 3: บวก ลบ ไม่เกิน 1,000
  // ==========================================
  private static generateGrade3(difficulty: Difficulty): MathQuestion {
    const isAdd = Math.random() > 0.5;
    
    let max = difficulty === 'easy' ? 100 : (difficulty === 'normal' ? 500 : 1000);
    
    let a = Math.floor(Math.random() * max) + 1;
    let b = Math.floor(Math.random() * max) + 1;

    if (!isAdd && a < b) {
      // Ensure positive result for subtraction
      const temp = a;
      a = b;
      b = temp;
    }

    const correct = isAdd ? a + b : a - b;
    const choices = this.generateNumberDistractors(correct, [10, -10, 100, -100, 1, -1]);
    
    return {
      id: `g3:${isAdd ? 'add' : 'sub'}:${a}:${b}`,
      question: `${a} ${isAdd ? '+' : '-'} ${b} = ?`,
      correctAnswer: correct,
      choices: choices
    };
  }

  // ==========================================
  // GRADE 4: บวก ลบ คูณ หาร พื้นฐาน
  // ==========================================
  private static generateGrade4(difficulty: Difficulty): MathQuestion {
    const ops = ['add', 'sub', 'mul', 'div'];
    const op = ops[Math.floor(Math.random() * ops.length)];

    if (op === 'add' || op === 'sub') {
      // Harder add/sub than grade 3
      let max = difficulty === 'easy' ? 500 : (difficulty === 'normal' ? 5000 : 10000);
      let a = Math.floor(Math.random() * max) + 100;
      let b = Math.floor(Math.random() * max) + 100;
      if (op === 'sub' && a < b) [a, b] = [b, a];
      
      const correct = op === 'add' ? a + b : a - b;
      return {
        id: `g4:${op}:${a}:${b}`,
        question: `${a} ${op === 'add' ? '+' : '-'} ${b} = ?`,
        correctAnswer: correct,
        choices: this.generateNumberDistractors(correct, [100, -100, 10, -10, 1000, -1000])
      };
    } else if (op === 'mul') {
      let maxA = difficulty === 'easy' ? 12 : 25;
      let maxB = difficulty === 'easy' ? 12 : (difficulty === 'normal' ? 12 : 99);
      let a = Math.floor(Math.random() * maxA) + 2;
      let b = Math.floor(Math.random() * maxB) + 2;
      const correct = a * b;
      return {
        id: `g4:mul:${a}:${b}`,
        question: `${a} × ${b} = ?`,
        correctAnswer: correct,
        choices: this.generateNumberDistractors(correct, [a, -a, b, -b, 10, -10])
      };
    } else {
      // Div
      let b = Math.floor(Math.random() * (difficulty === 'easy' ? 12 : 25)) + 2;
      let correct = Math.floor(Math.random() * (difficulty === 'easy' ? 12 : 25)) + 2;
      let a = b * correct;
      return {
        id: `g4:div:${a}:${b}`,
        question: `${a} ÷ ${b} = ?`,
        correctAnswer: correct,
        choices: this.generateNumberDistractors(correct, [1, -1, 2, -2, 10, -10])
      };
    }
  }

  // ==========================================
  // GRADE 5: เศษส่วน ทศนิยม
  // ==========================================
  private static generateGrade5(difficulty: Difficulty): MathQuestion {
    const isDecimal = Math.random() > 0.5;

    if (isDecimal) {
      const isAdd = Math.random() > 0.5;
      const precision = difficulty === 'easy' ? 1 : 2;
      const mult = Math.pow(10, precision);
      
      let max = difficulty === 'easy' ? 10 * mult : 50 * mult;
      let aNum = Math.floor(Math.random() * max) + 1;
      let bNum = Math.floor(Math.random() * max) + 1;
      
      if (!isAdd && aNum < bNum) [aNum, bNum] = [bNum, aNum];

      const a = aNum / mult;
      const b = bNum / mult;
      
      // We use strings for decimals to avoid floating point math weirdness in display
      const correctNum = isAdd ? (aNum + bNum) : (aNum - bNum);
      const correct = (correctNum / mult).toFixed(precision);
      
      const distractors = new Set<string>();
      distractors.add(correct);
      
      const offsets = [10, -10, 1, -1, 100, -100];
      offsets.sort(() => Math.random() - 0.5);
      
      for (const off of offsets) {
        if (distractors.size >= 4) break;
        const wNum = correctNum + off;
        if (wNum > 0) distractors.add((wNum / mult).toFixed(precision));
      }

      while (distractors.size < 4) {
        const wNum = correctNum + (Math.floor(Math.random() * 20) - 10);
        if (wNum > 0) distractors.add((wNum / mult).toFixed(precision));
      }

      return {
        id: `g5:dec:${isAdd ? 'add' : 'sub'}:${aNum}:${bNum}`,
        question: `${a.toFixed(precision)} ${isAdd ? '+' : '-'} ${b.toFixed(precision)} = ?`,
        correctAnswer: correct,
        choices: this.shuffleArray(Array.from(distractors))
      };
    } else {
      // Fraction (Same denominator)
      const isAdd = Math.random() > 0.5;
      let denom = Math.floor(Math.random() * 8) + 3; // 3 to 10
      if (difficulty !== 'easy') denom = Math.floor(Math.random() * 15) + 5;
      
      let aNum = Math.floor(Math.random() * (denom - 1)) + 1;
      let bNum = Math.floor(Math.random() * (denom - 1)) + 1;
      
      if (!isAdd && aNum < bNum) [aNum, bNum] = [bNum, aNum];

      const correctNum = isAdd ? aNum + bNum : aNum - bNum;
      const correct = `${correctNum}/${denom}`;

      const distractors = new Set<string>();
      distractors.add(correct);

      const offsets = [1, -1, 2, -2, denom, -denom];
      offsets.sort(() => Math.random() - 0.5);

      for (const off of offsets) {
        if (distractors.size >= 4) break;
        const wNum = correctNum + off;
        if (wNum > 0 && wNum !== correctNum) distractors.add(`${wNum}/${denom}`);
      }

      while(distractors.size < 4) {
         const wNum = correctNum + (Math.floor(Math.random() * 10) - 5);
         if (wNum > 0 && wNum !== correctNum) distractors.add(`${wNum}/${denom}`);
      }

      return {
        id: `g5:frac:${isAdd ? 'add' : 'sub'}:${aNum}:${bNum}:${denom}`,
        question: `${aNum}/${denom} ${isAdd ? '+' : '-'} ${bNum}/${denom} = ?`,
        correctAnswer: correct,
        choices: this.shuffleArray(Array.from(distractors))
      };
    }
  }

  // ==========================================
  // GRADE 6: ร้อยละ อัตราส่วน
  // ==========================================
  private static generateGrade6(_difficulty: Difficulty): MathQuestion {
    const isPercent = Math.random() > 0.5;

    if (isPercent) {
      // Percentage: X% of Y
      const percents = [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90];
      const p = percents[Math.floor(Math.random() * percents.length)];
      
      // Ensure Y is nicely divisible so result is integer
      const mults = [10, 20, 40, 50, 100, 200, 500];
      const y = mults[Math.floor(Math.random() * mults.length)];
      
      const correct = (p * y) / 100;
      
      return {
        id: `g6:pct:${p}:${y}`,
        question: `${p}% ของ ${y} = ?`,
        correctAnswer: correct,
        choices: this.generateNumberDistractors(correct, [10, -10, y/10, -(y/10), 100, -100])
      };
    } else {
      // Ratio: a : b = c : d
      // we solve for d
      const a = Math.floor(Math.random() * 9) + 2;
      const b = Math.floor(Math.random() * 9) + 2;
      const mult = Math.floor(Math.random() * 9) + 2; // scale factor
      
      const c = a * mult;
      const d = b * mult; // this is the answer

      return {
        id: `g6:ratio:${a}:${b}:${mult}`,
        question: `${a}:${b} = ${c}:?`,
        correctAnswer: d,
        choices: this.generateNumberDistractors(d, [1, -1, b, -b, a, -a])
      };
    }
  }

  // ==========================================
  // UTILS
  // ==========================================
  private static generateNumberDistractors(correctAnswer: number, preferredOffsets: number[]): number[] {
    const choices = new Set<number>();
    choices.add(correctAnswer);

    preferredOffsets.sort(() => Math.random() - 0.5);

    for (const mod of preferredOffsets) {
      if (choices.size >= 4) break;
      const wrong = correctAnswer + mod;
      if (wrong > 0 && wrong !== correctAnswer) {
        choices.add(wrong);
      }
    }

    let safeGuard = 0;
    while (choices.size < 4 && safeGuard < 100) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const wrong = correctAnswer + offset;
      if (wrong > 0 && wrong !== correctAnswer) {
        choices.add(wrong);
      }
      safeGuard++;
    }

    return this.shuffleArray(Array.from(choices));
  }

  private static shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public static validateQuestion(q: MathQuestion): boolean {
    if (this.recentQuestions.has(q.id)) return false;

    const uniqueChoices = new Set(q.choices);
    if (uniqueChoices.size !== 4) return false;

    const correctCount = q.choices.filter(c => c === q.correctAnswer).length;
    if (correctCount !== 1) return false;

    return true;
  }

  private static addRecentQuestion(id: string) {
    this.recentQuestions.add(id);
  }
  
  public static resetRecentQuestions() {
    this.recentQuestions = new Set<string>();
  }

  public static getUsedQuestionCount() {
    return this.recentQuestions.size;
  }

  private static gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) [x, y] = [y, x % y];
    return x || 1;
  }
}
