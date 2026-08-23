export class MainMenuScene {
  private element: HTMLElement | null = null;

  mount(
    onStart: () => void,
    onContinue: () => void,
    onSelectStage: (stage: number) => void,
    audioSettings: { bgmVolume: number; sfxVolume: number },
    onAudioSettingsChange: (settings: { bgmVolume: number; sfxVolume: number }) => void,
    unlockedStage = 1,
  ) {
    // Remove any existing menu
    this.unmount();

    // Stage 2 was the final stage in older saves, so those players remain at
    // progress value 2 even after clearing it. Treat that value as Stage 3
    // access to migrate existing saves without asking players to replay.
    const isStage3Unlocked = unlockedStage >= 2;

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
              <button id="btn-story" class="game-btn game-btn--small">
                <span>✨ เนื้อเรื่อง</span>
              </button>
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

        <!-- Story Modal -->
        <div id="story-modal" class="game-modal" style="display:none">
          <div class="game-modal__box" style="max-width: 700px; max-height: 85vh; display: flex; flex-direction: column;">
            <h2 class="game-modal__title">✨ ปฐมบทแห่งอาร์คาเดีย</h2>
            <div class="game-modal__content" style="text-align: left; padding: 20px; font-size: 1.05rem; line-height: 1.7; overflow-y: auto;">
              <p>นานมาแล้ว ดินแดน <strong>อาร์คาเดีย</strong> เคยเป็นสถานที่ที่สงบสุข พลังแห่งความรู้ถูกเก็บรักษาไว้ใน <strong style="color: #60a5fa;">ศิลาศักดิ์สิทธิ์ทั้งหก</strong> ซึ่งช่วยปกป้องผู้คนจากความมืด</p>
              <br/>
              <p>แต่วันหนึ่ง พลังลึกลับจากหุบเขาต้องห้ามได้ตื่นขึ้น... เหล่ามอนสเตอร์บุกยึดเส้นทางสู่ศิลาศักดิ์สิทธิ์ทีละแห่ง และที่ปลายทางของดินแดน มีสิ่งมีชีวิตทรงพลังที่เรียกว่า <strong style="color: #fbbf24;">ราชันแห่งความมืด</strong> กำลังรวบรวมพลังเพื่อทำลายศิลาชิ้นสุดท้าย</p>
              <br/>
              <p>หากมันทำสำเร็จ ความมืดจะปกคลุมอาร์คาเดียตลอดไป...</p>
              <br/>
              <p>เหล่านักรบมากมายพยายามเดินทางเข้าไปหยุดยั้งมัน แต่ไม่มีใครสามารถผ่านบททดสอบทั้งห้าได้ จนกระทั่งวันนี้...</p>
              <br/>
              <p>นักเรียนผู้กล้าคนหนึ่งได้รับเลือกให้เป็นผู้พิทักษ์คนต่อไป และนักเรียนคนนั้นก็คือ... <strong>คุณ</strong></p>
              <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;"/>
              <p>ในเกมนี้ ผู้เล่นจะรับบทเป็น <strong>นักเรียนผู้พิทักษ์แห่งความรู้</strong> ผู้ต้องใช้ทั้งความคิด ความรวดเร็ว และทักษะทางคณิตศาสตร์ เพื่อฝ่าด่านและเอาชนะศัตรู</p>
              <br/>
              <p>เส้นทางเบื้องหน้ามีเพียงทางเดียว: มอนสเตอร์ตัวที่ 1 → 2 → 3 → 4 → 5 → <strong style="color: #ef4444;">BOSS</strong></p>
              <br/>
              <p>ในการเอาชนะศัตรูแต่ละตัว พลังเพียงอย่างเดียวไม่เพียงพอ นักเรียนจะต้อง <strong style="color: #4ade80;">ตอบคำถามและแก้โจทย์ให้ถูกต้อง</strong> เพื่อโจมตีศัตรูและเปิดเส้นทางต่อไป หากตอบผิด ศัตรูจะได้เปรียบ หากตอบถูก นักเรียนจะสามารถโจมตีและเดินหน้าต่อได้</p>
              <br/>
              <p>และเมื่อผ่านผู้พิทักษ์ทั้งห้า... การต่อสู้ครั้งสุดท้ายกับ BOSS จะเริ่มต้นขึ้น</p>
              <br/>
              <p style="text-align: center; font-size: 1.15rem; color: #fbbf24; margin-top: 15px;">ภารกิจของคุณคือ เอาชนะมอนสเตอร์ ฝ่าบททดสอบคณิตศาสตร์<br/>ไปให้ถึงปราสาทแห่งความมืด และโค่น BOSS เพื่อกอบกู้พลังแห่งความรู้กลับคืนมา</p>
            </div>
            <div style="padding: 15px;">
              <button id="btn-story-close" class="game-btn game-btn--primary">เริ่มการผจญภัย!</button>
            </div>
          </div>
        </div>

        <!-- Stage Selection Modal -->
        <div id="stage-select-modal" class="game-modal" style="display:none">
          <div class="game-modal__box">
            <h2 class="game-modal__title">🗺️ เลือกด่าน</h2>
            <div class="game-modal__content stage-select-list">
              <button id="btn-stage-1" class="game-btn game-btn--primary">ด่าน 1 · หมู่บ้านบวกไว</button>
              <button id="btn-stage-2" class="game-btn game-btn--primary" ${unlockedStage < 2 ? 'disabled' : ''}>${unlockedStage < 2 ? '🔒 ' : ''}ด่าน 2 · ป่าลบเลือน</button>
              <button id="btn-stage-3" class="game-btn game-btn--primary" ${!isStage3Unlocked ? 'disabled' : ''}>${!isStage3Unlocked ? '🔒 ' : ''}ด่าน 3 · ปราสาทแห่งศูนย์</button>
            </div>
            <button id="btn-stage-select-close" class="game-btn game-btn--secondary">ปิด</button>
            <div style="text-align: right; margin-top: 15px;">
              <button id="btn-secret-unlock" style="background:#222; color:#ccc; border:1px solid #555; padding:5px 10px; border-radius:4px; font-size:12px; cursor:pointer;">🔑 ปลดล็อก (Dev)</button>
            </div>
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
    document.getElementById('btn-stage-3')?.addEventListener('click', () => onSelectStage(3));
    
    const secretUnlockBtn = document.getElementById('btn-secret-unlock');
    secretUnlockBtn?.addEventListener('click', () => {
      // Create an inline input if it doesn't exist
      let container = document.getElementById('secret-input-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'secret-input-container';
        container.style.marginTop = '10px';
        container.style.display = 'flex';
        container.style.justifyContent = 'flex-end';
        container.style.gap = '5px';
        
        const input = document.createElement('input');
        input.type = 'password';
        input.id = 'secret-pwd';
        input.style.width = '60px';
        input.style.background = '#111';
        input.style.color = 'white';
        input.style.border = '1px solid #555';
        input.style.borderRadius = '4px';
        input.style.padding = '2px 4px';
        
        const btn = document.createElement('button');
        btn.innerText = 'OK';
        btn.style.background = '#333';
        btn.style.color = 'white';
        btn.style.border = '1px solid #555';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        
        btn.onclick = () => {
          if (input.value === '2540') {
            const btn2 = document.getElementById('btn-stage-2') as HTMLButtonElement;
            const btn3 = document.getElementById('btn-stage-3') as HTMLButtonElement;
            if (btn2) {
              btn2.disabled = false;
              btn2.innerText = 'ด่าน 2 · ป่าลบเลือน';
            }
            if (btn3) {
              btn3.disabled = false;
              btn3.innerText = 'ด่าน 3 · ปราสาทแห่งศูนย์';
            }
            container!.style.display = 'none';
          } else {
            alert('รหัสผิด!');
            container!.style.display = 'none';
          }
        };
        
        container.appendChild(input);
        container.appendChild(btn);
        secretUnlockBtn!.parentElement!.appendChild(container);
      } else {
        container.style.display = container.style.display === 'none' ? 'flex' : 'none';
      }
    });
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

    document.getElementById('btn-story')?.addEventListener('click', () => {
      const modal = document.getElementById('story-modal');
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('btn-story-close')?.addEventListener('click', () => {
      const modal = document.getElementById('story-modal');
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
    document.getElementById('story-modal')?.addEventListener('click', (e) => {
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
