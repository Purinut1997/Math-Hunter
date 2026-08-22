export class HealthSystem {
  public static readonly MAX_HP = 5;
  private hp: number = HealthSystem.MAX_HP;
  private correctStreak: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.hp = HealthSystem.MAX_HP;
    this.correctStreak = 0;
  }

  getHp(): number {
    return this.hp;
  }

  getStreak(): number {
    return this.correctStreak;
  }

  onCorrectAnswer() {
    this.correctStreak++;
    if (this.correctStreak >= 3) {
      this.hp = Math.min(this.hp + 1, HealthSystem.MAX_HP);
      this.correctStreak = 0;
    }
  }

  onWrongAnswer() {
    this.hp--;
    this.correctStreak = 0;
  }

  isDead(): boolean {
    return this.hp <= 0;
  }
}
