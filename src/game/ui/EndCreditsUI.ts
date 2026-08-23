import { EventBus, EVENTS } from '../EventBus';

export interface GameClearStats {
  grade: number;
  correctAnswers: number;
  wrongAnswers: number;
  bestStreak: number;
  questionsUsed: number;
  clearTimeSeconds: number;
  totalScore: number;
}

export class EndCreditsUI {
  private element: HTMLElement | null = null;
  private timer?: number;

  constructor() {
    this.handleShow = this.handleShow.bind(this);
  }

  mount() {
    this.unmount();
    EventBus.on(EVENTS.SHOW_GAME_CLEAR, this.handleShow);
  }

  unmount() {
    EventBus.off(EVENTS.SHOW_GAME_CLEAR, this.handleShow);
    if (this.timer) window.clearTimeout(this.timer);
    this.element?.remove();
    this.element = null;
  }

  private handleShow(stats: GameClearStats) {
    this.renderResult(stats);
  }

  private createShell(content: string, buttonLabel: string, onNext: () => void) {
    this.element?.remove();
    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;
    uiLayer.insertAdjacentHTML('beforeend', `
      <section id="end-game-ui" class="end-game-ui">
        <div class="end-game-ui__void"></div>
        <div class="end-game-ui__content">${content}</div>
        <button id="end-game-next" class="game-btn game-btn--primary end-game-ui__next">${buttonLabel}</button>
      </section>
    `);
    this.element = document.getElementById('end-game-ui');
    document.getElementById('end-game-next')?.addEventListener('click', onNext, { once: true });
  }

  private renderResult(stats: GameClearStats) {
    const attempts = stats.correctAnswers + stats.wrongAnswers;
    const accuracy = attempts ? Math.round((stats.correctAnswers / attempts) * 100) : 100;
    const minutes = Math.floor(stats.clearTimeSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(stats.clearTimeSeconds % 60).toString().padStart(2, '0');
    this.createShell(`
      <div class="game-clear-result">
        <p class="game-clear-result__core">NUMBER CORE COMPLETE · 3 / 3</p>
        <h1>GAME CLEAR</h1>
        <h2>NUMBER CORE RESTORED</h2>
        <div class="game-clear-result__stats">
          <span>GRADE</span><strong>ป.${stats.grade}</strong>
          <span>MONSTERS DEFEATED</span><strong>5 / 5</strong>
          <span>BOSS DEFEATED</span><strong>LORD ZERO</strong>
          <span>CORRECT ANSWERS</span><strong>${stats.correctAnswers}</strong>
          <span>WRONG ANSWERS</span><strong>${stats.wrongAnswers}</strong>
          <span>ACCURACY</span><strong>${accuracy}%</strong>
          <span>BEST STREAK</span><strong>${stats.bestStreak}</strong>
          <span>QUESTIONS USED</span><strong>${stats.questionsUsed}</strong>
          <span>CLEAR TIME</span><strong>${minutes}:${seconds}</strong>
          <span>TOTAL SCORE</span><strong>${stats.totalScore.toLocaleString()}</strong>
        </div>
        <p class="game-clear-result__quote">“ทุกคำตอบ คือก้าวหนึ่งของการเรียนรู้”</p>
      </div>
    `, 'ดูเครดิตผู้สร้าง', () => this.renderCredits());
  }

  private renderCredits() {
    this.createShell(`
      <div class="creator-credits">
        <div class="creator-credits__roll">
          <p>NUMBER CORE RESTORED</p>
          <h1>ผู้สร้างและพัฒนาเกม</h1>
          <h2>นายภูริณัฐ กุลัพบุรี</h2>
          <h3>MIKPURINUT</h3>
          <dl>
            <dt>Game Creator</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Game Design</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Game Concept</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Story & World Design</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Level Design</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Educational Game Design</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Mathematics Content</dt><dd>นายภูริณัฐ กุลัพบุรี</dd>
            <dt>Development</dt><dd>MIKPURINUT</dd>
          </dl>
          <div class="creator-credits__footer">
            Created by MIKPURINUT<br>
            © 2026 MIKPURINUT · All Rights Reserved.
            <strong>THANK YOU FOR PLAYING</strong>
          </div>
        </div>
      </div>
    `, 'ไปยังฉากลับ', () => this.renderSecretEnding());
  }

  private renderSecretEnding() {
    this.createShell(`
      <div class="secret-ending">
        <div class="secret-ending__signal"></div>
        <p>UNKNOWN SIGNAL DETECTED...</p>
        <p>SOURCE: UNKNOWN</p>
        <p>ENERGY LEVEL: 0.01%</p>
        <p>ANALYZING...</p>
        <strong>???</strong>
      </div>
    `, 'กลับหน้าหลัก', () => {
      this.element?.remove();
      this.element = null;
      EventBus.emit(EVENTS.RETURN_MAIN_MENU);
    });
  }
}
