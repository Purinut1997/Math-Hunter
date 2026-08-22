import { EventBus, EVENTS } from '../EventBus';
import type { CombatState } from '../systems/CombatManager';

export class CombatUI {
  private element: HTMLElement | null = null;
  private state: CombatState | null = null;

  constructor() {
    this.handleStateUpdate = this.handleStateUpdate.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
  }

  mount() {
    this.unmount();

    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;

    const html = `
      <div id="combat-ui" class="combat-ui" style="display: none;">
        
        <!-- Timer Bar (Only for Boss) -->
        <div id="combat-ui-timer-container" class="combat-ui__timer-container" style="display: none;">
          <div class="combat-ui__timer-text">⏱ <span id="combat-ui-timer-value">15</span></div>
          <div class="combat-ui__timer-bar-bg">
            <div id="combat-ui-timer-bar-fill" class="combat-ui__timer-bar-fill"></div>
          </div>
        </div>

        <!-- Top Bar: Monster and Player HP -->
        <div class="combat-ui__top-bar">
          <!-- Player Panel (Left) -->
          <div class="combat-ui__player-stats">
            <div class="combat-ui__label">MATH HUNTER</div>
            <div id="combat-ui-player-hp" class="combat-ui__hp-bar"></div>
            <div class="combat-ui__streak-container">
              <span class="combat-ui__streak-label">COMBO:</span>
              <div id="combat-ui-streak" class="combat-ui__streak-dots"></div>
            </div>
          </div>
          
          <!-- VS Center text -->
          <div class="combat-ui__vs-text">VS</div>
          
          <!-- Monster Panel (Right) -->
          <div class="combat-ui__monster-stats">
            <div id="combat-ui-monster-name" class="combat-ui__label combat-ui__label--enemy">MONSTER</div>
            <div id="combat-ui-monster-hp" class="combat-ui__hp-bar combat-ui__hp-bar--enemy"></div>
          </div>
        </div>

        <!-- Question Area -->
        <div class="combat-ui__question-area">
          <div id="combat-ui-question" class="combat-ui__question-text"></div>
          <div id="combat-ui-wrong-answer" class="combat-ui__wrong-answer-text" style="display: none;"></div>
        </div>

        <!-- Answers Area -->
        <div id="combat-ui-answers" class="combat-ui__answers">
          <button class="combat-btn" data-index="0"></button>
          <button class="combat-btn" data-index="1"></button>
          <button class="combat-btn" data-index="2"></button>
          <button class="combat-btn" data-index="3"></button>
        </div>
      </div>

      <!-- Game Over Overlay -->
      <div id="combat-game-over" class="game-modal" style="display:none; background-color: #000000; z-index: 9999;">
        <div class="game-modal__box game-modal__box--gameover" style="border: none; box-shadow: none; background: transparent; text-align: center;">
          <h2 class="game-modal__title game-modal__title--danger" style="font-size: 80px; text-shadow: 0 0 20px #ff0000; margin-bottom: 20px;">You Lost</h2>
          <p class="game-modal__text">พลังของ Math Hunter หมดลง...</p>
          <button id="btn-combat-retry" class="game-btn game-btn--primary">ลองอีกครั้ง</button>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('combat-ui');

    // Bind Answer Buttons
    const buttons = document.querySelectorAll('.combat-btn');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (!this.state || this.state.isInputDisabled) return;
        if (!this.state.currentQuestion) return;
        
        const answer = this.state.currentQuestion.choices[index];
        EventBus.emit(EVENTS.ANSWER_SELECTED, answer);
      });
    });

    document.getElementById('btn-combat-retry')?.addEventListener('click', () => {
      document.getElementById('combat-game-over')!.style.display = 'none';
      EventBus.emit(EVENTS.RESTART_STAGE);
    });

    // Subscribe to EventBus
    EventBus.on(EVENTS.SHOW_COMBAT_UI, this.handleShow);
    EventBus.on(EVENTS.HIDE_COMBAT_UI, this.handleHide);
    EventBus.on(EVENTS.UPDATE_COMBAT_STATE, this.handleStateUpdate);
    EventBus.on(EVENTS.SHOW_GAME_OVER, this.handleGameOver);
  }

  unmount() {
    EventBus.off(EVENTS.SHOW_COMBAT_UI, this.handleShow);
    EventBus.off(EVENTS.HIDE_COMBAT_UI, this.handleHide);
    EventBus.off(EVENTS.UPDATE_COMBAT_STATE, this.handleStateUpdate);
    EventBus.off(EVENTS.SHOW_GAME_OVER, this.handleGameOver);

    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    
    const go = document.getElementById('combat-game-over');
    if (go) go.remove();
  }

  private handleShow(state?: CombatState) {
    if (this.element) {
      this.element.style.display = 'flex';
    }
    if (state) {
      this.handleStateUpdate(state);
    }
  }

  private handleHide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  private handleGameOver() {
    const go = document.getElementById('combat-game-over');
    if (go) go.style.display = 'flex';
  }

  private handleStateUpdate(state: CombatState) {
    this.state = state;
    
    // Update Player HP (Hearts)
    const phpEl = document.getElementById('combat-ui-player-hp');
    if (phpEl) {
      let hearts = '';
      for (let i = 0; i < state.playerMaxHp; i++) {
        hearts += i < state.playerHp ? '❤️' : '♡';
      }
      phpEl.innerHTML = hearts;
    }

    // Update Monster HP (Hearts)
    const mhpEl = document.getElementById('combat-ui-monster-hp');
    if (mhpEl) {
      let hearts = '';
      for (let i = 0; i < state.monsterMaxHp; i++) {
        hearts += i < state.monsterHp ? '♥' : '♡'; // simpler heart for monster
      }
      mhpEl.innerHTML = hearts;
    }

    // Update Monster Name
    const nameEl = document.getElementById('combat-ui-monster-name');
    if (nameEl) {
      nameEl.innerText = state.monsterName;
    }

    // Update Streak
    const streakEl = document.getElementById('combat-ui-streak');
    if (streakEl) {
      let streak = '';
      for (let i = 0; i < 3; i++) {
        streak += i < state.correctStreak ? '● ' : '○ ';
      }
      streakEl.innerText = streak.trim();
    }

    // Update Question
    const qEl = document.getElementById('combat-ui-question');
    const wEl = document.getElementById('combat-ui-wrong-answer');
    
    if (qEl && state.currentQuestion) {
      qEl.innerText = state.currentQuestion.question;
      
      // If there was a wrong answer, show what the correct answer was briefly
      if (state.correctAnswerWas !== null && wEl) {
        wEl.innerText = `คำตอบที่ถูกคือ: ${state.correctAnswerWas}`;
        wEl.style.display = 'block';
        qEl.style.display = 'none';
      } else if (wEl) {
        wEl.style.display = 'none';
        qEl.style.display = 'block';
      }
    }

    // Update Timer (Boss Only)
    const timerCont = document.getElementById('combat-ui-timer-container');
    const timerVal = document.getElementById('combat-ui-timer-value');
    const timerFill = document.getElementById('combat-ui-timer-bar-fill');

    if (timerCont && timerVal && timerFill) {
      if (state.isBoss && state.maxTime !== null && state.timeRemaining !== null && !state.isTimeUp) {
        timerCont.style.display = 'flex';
        timerVal.innerText = String(state.timeRemaining);
        
        const pct = (state.timeRemaining / state.maxTime) * 100;
        timerFill.style.width = `${pct}%`;

        if (state.timeRemaining <= 3) {
          timerVal.style.color = '#ff4444';
          timerFill.style.backgroundColor = '#ff4444';
          timerCont.classList.add('pulse-warning');
          
          // Optionally play a soft beep sound here if we had sound integration
        } else {
          timerVal.style.color = '#ffffff';
          timerFill.style.backgroundColor = '#4ade80';
          timerCont.classList.remove('pulse-warning');
        }
      } else {
        timerCont.style.display = 'none';
        timerCont.classList.remove('pulse-warning');
      }
    }

    // Update Buttons
    const buttons = document.querySelectorAll('.combat-btn');
    buttons.forEach((btn, index) => {
      const b = btn as HTMLButtonElement;
      if (state.currentQuestion && state.currentQuestion.choices[index] !== undefined) {
        b.innerText = String(state.currentQuestion.choices[index]);
        b.disabled = state.isInputDisabled;
      } else {
        b.innerText = '';
        b.disabled = true;
      }
    });
  }
}
