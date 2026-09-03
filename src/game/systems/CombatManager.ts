import { EventBus, EVENTS } from '../EventBus';
import type { EncounterConfig } from '../data/Stage1Data';
import { QuestionGenerator, type MathQuestion, type Difficulty } from './QuestionGenerator';

export interface CombatState {
  isActive: boolean;
  playerHp: number;
  playerMaxHp: number;
  monsterName: string;
  monsterHp: number;
  monsterMaxHp: number;
  correctStreak: number;
  currentQuestion: MathQuestion | null;
  isInputDisabled: boolean;
  correctAnswerWas: number | string | null; // Used to show what the answer was when wrong
  isBoss: boolean;
  timeRemaining: number | null;
  maxTime: number | null;
  isTimeUp: boolean;
}

export class CombatManager {
  private state: CombatState;
  private currentEncounter: EncounterConfig | null = null;
  private grade: number;
  private topic: 'mixed' | 'subtraction' | 'stage2' | 'stage3';
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private timerStartDelay: ReturnType<typeof setTimeout> | null = null;
  private bossQuestionCount: number = 0;
  private correctAnswers = 0;
  private wrongAnswers = 0;
  private bestStreak = 0;

  constructor(grade: number, topic: 'mixed' | 'subtraction' | 'stage2' | 'stage3' = 'mixed') {
    this.grade = grade;
    this.topic = topic;
    this.state = {
      isActive: false,
      playerHp: 5,
      playerMaxHp: 5,
      monsterName: '',
      monsterHp: 0,
      monsterMaxHp: 0,
      correctStreak: 0,
      currentQuestion: null,
      isInputDisabled: false,
      correctAnswerWas: null,
      isBoss: false,
      timeRemaining: null,
      maxTime: null,
      isTimeUp: false
    };
  }

  public startEncounter(encounter: EncounterConfig) {
    this.currentEncounter = encounter;
    this.bossQuestionCount = 0;
    this.state.isActive = true;
    this.state.monsterName = this.formatMonsterName(encounter.monsterId);
    this.state.monsterHp = encounter.maxHp;
    this.state.monsterMaxHp = encounter.maxHp;
    this.state.isInputDisabled = false;
    this.state.correctAnswerWas = null;
    this.state.isBoss = encounter.monsterId === 'king_slime' || encounter.monsterId === 'void_stag' || encounter.monsterId === 'lord_zero';
    this.state.isTimeUp = false;
    this.state.timeRemaining = null;
    this.state.maxTime = null;
    
    this.generateNextQuestion();
    EventBus.emit(EVENTS.SHOW_COMBAT_UI, this.state);
  }

  public handleAnswer(selectedAnswer: number | string): 'correct' | 'wrong' {
    if (!this.state.isActive || this.state.isInputDisabled || !this.state.currentQuestion) return 'wrong';

    this.stopTimer();
    this.state.isInputDisabled = true;
    const isCorrect = selectedAnswer === this.state.currentQuestion.correctAnswer;

    if (isCorrect) {
      this.correctAnswers += 1;
      this.state.monsterHp -= 1;
      this.state.correctStreak += 1;
      this.bestStreak = Math.max(this.bestStreak, this.state.correctStreak);
      
      if (this.state.correctStreak >= 3) {
        if (this.state.playerHp < this.state.playerMaxHp) {
          this.state.playerHp += 1;
        }
        this.state.correctStreak = 0;
        
        // Let Stage1Scene or EventBus handle it, but we can emit directly
        // We'll emit it directly if not seen
        // Wait, CombatManager doesn't track hasSeenHealTutorial.
        // I can just emit a new event, or just emit SHOW_DIALOGUE once.
        if (!(window as any).hasSeenHealTutorial) {
          (window as any).hasSeenHealTutorial = true;
          EventBus.emit(EVENTS.SHOW_DIALOGUE, [
            { text: "ตอบถูกติดต่อกัน 3 ครั้ง\n→ ฟื้นฟู ❤️ +1" }
          ]);
        }
      }
      
      this.broadcastState();
      return 'correct';
    } else {
      this.wrongAnswers += 1;
      this.state.playerHp -= 1;
      this.state.correctStreak = 0;
      this.state.correctAnswerWas = this.state.currentQuestion.correctAnswer;
      
      this.broadcastState();
      return 'wrong';
    }
  }

  public handleTimeOut() {
    if (!this.state.isActive || this.state.isInputDisabled || !this.state.currentQuestion) return;

    this.stopTimer();
    this.state.isInputDisabled = true;
    this.wrongAnswers += 1;
    this.state.isTimeUp = true;
    this.state.playerHp -= 1;
    this.state.correctStreak = 0;
    this.state.correctAnswerWas = this.state.currentQuestion.correctAnswer;
    
    this.broadcastState();
    
    // Tell Phaser scene to play timeout animations
    EventBus.emit(EVENTS.COMBAT_TIMEOUT);
  }

  public nextTurn() {
    if (this.state.monsterHp <= 0) {
      this.endEncounter();
    } else if (this.state.playerHp <= 0) {
      this.gameOver();
    } else {
      this.state.correctAnswerWas = null;
      this.state.isTimeUp = false;
      this.state.isInputDisabled = false;
      this.generateNextQuestion();
      this.broadcastState();
    }
  }

  public endEncounter() {
    this.stopTimer();
    this.state.isActive = false;
    this.currentEncounter = null;
    EventBus.emit(EVENTS.HIDE_COMBAT_UI);
  }

  private gameOver() {
    this.stopTimer();
    this.state.isActive = false;
    EventBus.emit(EVENTS.HIDE_COMBAT_UI);
    EventBus.emit(EVENTS.SHOW_GAME_OVER);
  }

  private determineDifficulty(): Difficulty {
    if (this.topic === 'stage2') {
      if (this.state.isBoss) {
        // บอสระดับโอกาสสุ่มง่าย 40% ปานกลาง 50% ยาก 10%
        const r = Math.random();
        if (r < 0.4) return 'easy';
        if (r < 0.9) return 'normal';
        return 'hard';
      }
      // ด่าน 2 มอนสเตอร์ทั่วไป: สุ่มออกระดับปานกลาง 30% (ง่าย 70%)
      return Math.random() < 0.3 ? 'normal' : 'easy';
    }

    if (this.topic === 'stage3') {
      if (this.state.isBoss) {
        // บอส ระดับปานกลาง 90% ยาก 10%
        return Math.random() < 0.9 ? 'normal' : 'hard';
      }
      // ด่าน 3 มอนสเตอร์ทั่วไป: สุ่มออกระดับง่าย 60% ปานกลาง 40% ยาก 10% (ถ่วงน้ำหนัก 60:40:10 รวม 110)
      const r = Math.random() * 110;
      if (r < 60) return 'easy';
      if (r < 100) return 'normal';
      return 'hard';
    }

    // ด่านแรก (Stage 1): สุ่มโจทย์ระดับง่าย ทั้งหมด ยกเว้นบอสจะมีโอกาสออกระดับปานกลาง 50%
    if (this.state.isBoss) {
      return Math.random() < 0.5 ? 'normal' : 'easy';
    }
    return 'easy';
  }

  private generateNextQuestion() {
    if (!this.currentEncounter) return;
    
    if (this.state.isBoss) {
      this.bossQuestionCount++;
    }

    const difficulty = this.determineDifficulty();

    let newQuestion = QuestionGenerator.generate({
      grade: this.grade,
      topic: this.topic,
      difficulty: difficulty
    });

    this.state.currentQuestion = newQuestion;
    
    if (this.state.isBoss) {
      this.startTimer(difficulty);
    }
  }

  private startTimer(difficulty: Difficulty) {
    this.stopTimer();
    
    let timeLimit = 15;
    if (this.topic === 'stage3') {
      timeLimit = 45;
    } else if (this.topic === 'stage2') {
      timeLimit = 30;
    } else {
      if (difficulty === 'normal') timeLimit = 18;
      else if (difficulty === 'hard') timeLimit = 22;
      if (this.grade === 3) timeLimit += 2;
    }

    this.state.maxTime = timeLimit;
    this.state.timeRemaining = timeLimit;
    
    // Delay timer start by 1.5s to account for UI fade in
    this.timerStartDelay = setTimeout(() => {
      this.timerStartDelay = null;
      if (!this.state.isActive || this.state.isInputDisabled) return;
      this.timerInterval = setInterval(() => {
        if (this.state.timeRemaining !== null && this.state.timeRemaining > 0) {
          this.state.timeRemaining -= 1;
          this.broadcastState();
          
          if (this.state.timeRemaining <= 0) {
            this.handleTimeOut();
          }
        }
      }, 1000);
    }, 1500);
  }

  private stopTimer() {
    if (this.timerStartDelay) {
      clearTimeout(this.timerStartDelay);
      this.timerStartDelay = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }


  private broadcastState() {
    EventBus.emit(EVENTS.UPDATE_COMBAT_STATE, this.state);
  }

  private formatMonsterName(id: string): string {
    return id.split('_').map(w => w.toUpperCase()).join(' ');
  }

  public resetPlayer() {
    this.state.playerHp = this.state.playerMaxHp;
    this.state.correctStreak = 0;
  }

  public resetRunStats() {
    this.resetPlayer();
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.bestStreak = 0;
  }

  public getRunStats() {
    return {
      correctAnswers: this.correctAnswers,
      wrongAnswers: this.wrongAnswers,
      bestStreak: this.bestStreak,
      playerHp: this.state.playerHp,
    };
  }
}
