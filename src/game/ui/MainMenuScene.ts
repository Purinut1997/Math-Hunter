export class MainMenuScene {
  private element: HTMLElement | null = null;

  mount(
    onStart: () => void,
    onContinue: () => void,
    onSelectStage: (stage: number) => void,
    audioSettings: { bgmVolume: number; sfxVolume: number },
    onAudioSettingsChange: (settings: { bgmVolume: number; sfxVolume: number }) => void,
  ) {
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
              <p><strong>⏱️ ศึกบอส:</strong> การต่อสู้กับบอสมีเวลาจำกัด ให้เลือกคำตอบก่อนหลอดเวลาหมด</p>
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
                <input id="settings-bgm-volume" type="range" min="0" max="100" value="${audioSettings.bgmVolume}" class="game-modal__slider"/>
              </label>
              <label class="game-modal__label">เสียงเอฟเฟกต์
                <input id="settings-sfx-volume" type="range" min="0" max="100" value="${audioSettings.sfxVolume}" class="game-modal__slider"/>
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
              <p style="margin-top: 10px; font-size: 0.9em;">ช่องทางติดต่อ<br/><a href="https://mediaplatform.pages.dev/" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">https://mediaplatform.pages.dev/</a></p>
            </div>
            <button id="btn-credits-close" class="game-btn game-btn--primary">ปิด</button>
          </div>
        </div>

        <!-- Stage Selection Modal -->
        <div id="stage-select-modal" class="game-modal" style="display:none">
          <div class="game-modal__box">
            <h2 class="game-modal__title">🗺️ เลือกด่าน</h2>
            <div class="game-modal__content stage-select-list">
              <button id="btn-stage-1" class="game-btn game-btn--primary">ด่าน 1 · หมู่บ้านบวกไว</button>
              <button id="btn-stage-2" class="game-btn game-btn--primary">ด่าน 2 · ป่าลบเลือน</button>
              <button class="game-btn game-btn--secondary" disabled>🔒 ด่าน 3 · ยังไม่เปิดเผย</button>
            </div>
            <button id="btn-stage-select-close" class="game-btn game-btn--secondary">ปิด</button>
          </div>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('main-menu');

    // Bind events
    document.getElementById('btn-start')?.addEventListener('click', onStart);
    document.getElementById('btn-continue')?.addEventListener('click', onContinue);
    document.getElementById('btn-select-stage')?.addEventListener('click', () => {
      const modal = document.getElementById('stage-select-modal');
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('btn-stage-1')?.addEventListener('click', () => onSelectStage(1));
    document.getElementById('btn-stage-2')?.addEventListener('click', () => onSelectStage(2));
    document.getElementById('btn-stage-select-close')?.addEventListener('click', () => {
      const modal = document.getElementById('stage-select-modal');
      if (modal) modal.style.display = 'none';
    });

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

    const bgmSlider = document.getElementById('settings-bgm-volume') as HTMLInputElement | null;
    const sfxSlider = document.getElementById('settings-sfx-volume') as HTMLInputElement | null;
    const updateAudioSettings = () => {
      onAudioSettingsChange({
        bgmVolume: Number(bgmSlider?.value ?? audioSettings.bgmVolume),
        sfxVolume: Number(sfxSlider?.value ?? audioSettings.sfxVolume),
      });
    };
    bgmSlider?.addEventListener('input', updateAudioSettings);
    sfxSlider?.addEventListener('input', updateAudioSettings);

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
    document.getElementById('stage-select-modal')?.addEventListener('click', (e) => {
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
