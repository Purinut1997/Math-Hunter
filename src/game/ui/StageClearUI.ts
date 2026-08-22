import { EventBus, EVENTS } from '../EventBus';

export class StageClearUI {
  private element: HTMLElement | null = null;
  
  constructor() {
    this.handleShow = this.handleShow.bind(this);
  }

  mount() {
    this.unmount();

    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;

    const html = `
      <div id="stage-clear-ui" class="stage-clear-ui" style="display:none;">
        <div class="stage-clear-box">
          <h1 class="stage-clear-title">STAGE CLEAR</h1>
          <h2 class="stage-clear-subtitle">หมู่บ้านบวกไว</h2>
          
          <div class="stage-clear-stats">
            <div class="stage-clear-stat-item">
              <span class="stat-label">เศษแก่นพลัง</span>
              <span class="stat-value">◆ 1 / 10</span>
            </div>
          </div>
          
          <div class="stage-clear-message">
            หมู่บ้านปลอดภัยแล้ว!
          </div>

          <div class="stage-clear-buttons">
            <button id="btn-next-stage" class="game-btn game-btn--primary">ด่านถัดไป</button>
            <button id="btn-back-stage-select" class="game-btn game-btn--secondary">กลับหน้าเลือกด่าน</button>
          </div>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('stage-clear-ui');

    document.getElementById('btn-next-stage')?.addEventListener('click', () => {
      // In the future, this would load Stage 2
      // For now, just fire STAGE_CLEARED to let main.ts handle it
      EventBus.emit(EVENTS.STAGE_CLEARED, 'next');
    });

    document.getElementById('btn-back-stage-select')?.addEventListener('click', () => {
      EventBus.emit(EVENTS.STAGE_CLEARED, 'select');
    });

    EventBus.on(EVENTS.SHOW_STAGE_CLEAR, this.handleShow);
  }

  unmount() {
    EventBus.off(EVENTS.SHOW_STAGE_CLEAR, this.handleShow);

    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  private handleShow() {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }
}
