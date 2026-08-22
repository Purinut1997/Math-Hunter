export class MainMenuScene {
  private element: HTMLElement | null = null;

  mount(onStart: () => void, onContinue: () => void, onSelectStage: () => void) {
    // Remove any existing menu
    this.unmount();

    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;

    const html = `
      <div id="main-menu" class="main-menu">
        <!-- Animated Background -->
        <div class="main-menu__bg">
          <img src="assets/backgrounds/opening_cinematic.gif" 
               alt="Math Hunter Background" class="main-menu__bg-img"/>
        </div>

        <!-- UI Layer -->
        <div class="main-menu__ui">
          <!-- Logo + Buttons panel (left side) -->
          <div class="main-menu__panel">
            <div class="main-menu__logo-wrap">
              <img src="assets/branding/logo.png" alt="Math Hunter" class="main-menu__logo" onerror="this.style.display='none'; document.getElementById('main-menu-title').style.display='block'"/>
              <div id="main-menu-title" class="main-menu__title-fallback" style="display:none">
                <h1 class="main-menu__title">MATH HUNTER</h1>
                <p class="main-menu__subtitle">ศึกพิชิตแก่นพลังตัวเลข</p>
              </div>
            </div>

            <!-- Primary Buttons -->
            <div class="main-menu__buttons">
              <button id="btn-start" class="game-btn game-btn--primary">
                <span class="game-btn__icon">⚔️</span>
                <span>เริ่มผจญภัย</span>
              </button>
              <button id="btn-continue" class="game-btn game-btn--secondary">
                <span class="game-btn__icon">▶</span>
                <span>เล่นต่อ</span>
              </button>
              <button id="btn-select-stage" class="game-btn game-btn--secondary">
                <span class="game-btn__icon">🗺️</span>
                <span>เลือกด่าน</span>
              </button>
            </div>

            <!-- Secondary Buttons -->
            <div class="main-menu__buttons-secondary">
              <button id="btn-tutorial" class="game-btn game-btn--small">
                <span>📖 คู่มือ</span>
              </button>
              <button id="btn-settings" class="game-btn game-btn--small">
                <span>⚙️ ตั้งค่า</span>
              </button>
              <button id="btn-credits" class="game-btn game-btn--small">
                <span>📜 เครดิต</span>
              </button>
            </div>
          </div>

          <!-- Developer Credit (bottom-left) -->
          <div class="main-menu__credit">
            <img src="assets/branding/developed-by-purinut.png" alt="Developed by Purinut"/>
          </div>
        </div>

        <!-- Tutorial Modal -->
        <div id="tutorial-modal" class="game-modal" style="display:none">
          <div class="game-modal__box" style="max-width: 600px;">
            <h2 class="game-modal__title">📖 คู่มือการเล่น</h2>
            <div class="game-modal__content" style="text-align: left; padding: 20px; font-size: 1.1rem; line-height: 1.6;">
              <p><strong>🕹️ การควบคุม (PC):</strong> ใช้ปุ่ม <code>W</code> <code>A</code> <code>S</code> <code>D</code> หรือปุ่มลูกศร เพื่อเดิน</p>
              <p><strong>📱 การควบคุม (มือถือ):</strong> สัมผัสที่ครึ่งซ้ายของหน้าจอเพื่อใช้ Virtual Joystick บังคับตัวละคร</p>
              <br/>
              <p><strong>⚔️ การต่อสู้:</strong> เดินไปชนมอนสเตอร์เพื่อเข้าฉากต่อสู้ ระบบจะมีโจทย์คณิตศาสตร์ให้คิดเลข</p>
              <p><strong>⏱️ เวลาจำกัด:</strong> รีบเลือกคำตอบที่ถูกต้องก่อนที่เวลาจะหมด (ดูจากหลอดเวลา)</p>
              <p><strong>❤️ พลังชีวิต:</strong> หากตอบผิดหรือหมดเวลา พลังชีวิตจะลดลง หากหมดเกมจะจบลงทันที</p>
            </div>
            <button id="btn-tutorial-close" class="game-btn game-btn--primary">เข้าใจแล้ว!</button>
          </div>
        </div>

        <!-- Settings Modal -->
        <div id="settings-modal" class="game-modal" style="display:none">
          <div class="game-modal__box">
            <h2 class="game-modal__title">⚙️ ตั้งค่า</h2>
            <div class="game-modal__content">
              <label class="game-modal__label">เสียงเพลง
                <input type="range" min="0" max="100" value="80" class="game-modal__slider"/>
              </label>
              <label class="game-modal__label">เสียงเอฟเฟกต์
                <input type="range" min="0" max="100" value="100" class="game-modal__slider"/>
              </label>
            </div>
            <button id="btn-settings-close" class="game-btn game-btn--primary">ปิด</button>
          </div>
        </div>

        <!-- Credits Modal -->
        <div id="credits-modal" class="game-modal" style="display:none">
          <div class="game-modal__box">
            <h2 class="game-modal__title">📜 เครดิต</h2>
            <div class="game-modal__content game-modal__credits">
              <img src="assets/branding/developed-by-purinut.png" alt="Developed by Purinut" class="credits-badge"/>
              <p>เกมนี้สร้างสรรค์โดย<br/><strong style="font-size: 1.2em; color: #fbbf24;">นายภูริณัฐ กุลัพบุรี</strong></p>
              <p style="margin-top: 10px; font-size: 0.9em;">ช่องทางติดต่อ<br/><a href="https://mediaplatform.pages.dev/" target="_blank" style="color: #60a5fa; text-decoration: underline;">https://mediaplatform.pages.dev/</a></p>
              <p class="credits-tech" style="margin-top: 15px;">Engine: Phaser 3 · TypeScript · Vite</p>
            </div>
            <button id="btn-credits-close" class="game-btn game-btn--primary">ปิด</button>
          </div>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('main-menu');

    // Bind events
    document.getElementById('btn-start')?.addEventListener('click', onStart);
    document.getElementById('btn-continue')?.addEventListener('click', onContinue);
    document.getElementById('btn-select-stage')?.addEventListener('click', onSelectStage);

    document.getElementById('btn-tutorial')?.addEventListener('click', () => {
      const modal = document.getElementById('tutorial-modal');
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('btn-tutorial-close')?.addEventListener('click', () => {
      const modal = document.getElementById('tutorial-modal');
      if (modal) modal.style.display = 'none';
    });

    document.getElementById('btn-settings')?.addEventListener('click', () => {
      const modal = document.getElementById('settings-modal');
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('btn-settings-close')?.addEventListener('click', () => {
      const modal = document.getElementById('settings-modal');
      if (modal) modal.style.display = 'none';
    });

    document.getElementById('btn-credits')?.addEventListener('click', () => {
      const modal = document.getElementById('credits-modal');
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('btn-credits-close')?.addEventListener('click', () => {
      const modal = document.getElementById('credits-modal');
      if (modal) modal.style.display = 'none';
    });

    // Close modal on backdrop click
    document.getElementById('settings-modal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) (e.currentTarget as HTMLElement).style.display = 'none';
    });
    document.getElementById('credits-modal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) (e.currentTarget as HTMLElement).style.display = 'none';
    });
  }

  unmount() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
