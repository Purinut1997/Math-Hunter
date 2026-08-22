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
          <h2 id="stage-clear-subtitle" class="stage-clear-subtitle">หมู่บ้านบวกไว</h2>
          
          <div class="stage-clear-stats">
            <div class="stage-clear-stat-item">
              <span class="stat-label">เศษแก่นพลัง</span>
              <span id="stage-clear-fragment" class="stat-value">◆ 1 / 3</span>
            </div>
          </div>
          
          <div id="stage-clear-message" class="stage-clear-message">
            หมู่บ้านปลอดภัยแล้ว!
          </div>

          <div class="stage-clear-buttons">
            <button id="btn-next-stage" class="game-btn game-btn--primary">ไปด่าน 2 · ป่าลบเลือน</button>
            <button id="btn-back-stage-select" class="game-btn game-btn--secondary">กลับหน้าเลือกด่าน</button>
          </div>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('stage-clear-ui');

    document.getElementById('btn-back-stage-select')?.addEventListener('click', () => {
      EventBus.emit(EVENTS.STAGE_CLEARED, 'select');
    });
    document.getElementById('btn-next-stage')?.addEventListener('click', () => {
      EventBus.emit(EVENTS.STAGE_CLEARED, 'next');
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

  private handleShow(data?: { stage?: number; title?: string; fragmentText?: string; message?: string }) {
    if (this.element) {
      this.element.style.display = 'flex';
      const stage = data?.stage ?? 1;
      const subtitle = document.getElementById('stage-clear-subtitle');
      const fragment = document.getElementById('stage-clear-fragment');
      const message = document.getElementById('stage-clear-message');
      const next = document.getElementById('btn-next-stage') as HTMLButtonElement | null;
      if (subtitle) subtitle.textContent = data?.title ?? 'หมู่บ้านบวกไว';
      if (fragment) fragment.textContent = data?.fragmentText ?? '◆ 1 / 3';
      if (message) message.textContent = data?.message ?? 'หมู่บ้านปลอดภัยแล้ว!';
      if (next) {
        next.disabled = stage >= 2;
        next.textContent = stage >= 2 ? '🔒 ด่านสุดท้าย · เร็ว ๆ นี้' : 'ไปด่าน 2 · ป่าลบเลือน';
      }
    }
  }
}
