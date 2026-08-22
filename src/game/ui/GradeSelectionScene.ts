export type GradeLevel = 3 | 4 | 5 | 6;

export class GradeSelectionScene {
  private element: HTMLElement | null = null;

  mount(onGradeSelected: (grade: GradeLevel) => void, onBack: () => void) {
    this.unmount();

    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;

    const grades: { label: string; value: GradeLevel; desc: string }[] = [
      { label: 'ป.3', value: 3, desc: 'บวก ลบ ไม่เกิน 1,000' },
      { label: 'ป.4', value: 4, desc: 'บวก ลบ คูณ หารพื้นฐาน' },
      { label: 'ป.5', value: 5, desc: 'เศษส่วน ทศนิยม' },
      { label: 'ป.6', value: 6, desc: 'ร้อยละ อัตราส่วน' },
    ];

    const gradeButtons = grades.map(g => `
      <button 
        id="grade-btn-${g.value}" 
        class="grade-btn game-btn game-btn--grade" 
        data-grade="${g.value}"
        tabindex="0"
      >
        <span class="grade-btn__label">${g.label}</span>
        <span class="grade-btn__desc">${g.desc}</span>
      </button>
    `).join('');

    const html = `
      <div id="grade-selection" class="grade-selection">
        <!-- Background (same GIF) -->
        <div class="main-menu__bg">
          <img src="assets/backgrounds/opening_cinematic.gif"
               alt="Math Hunter Background" class="main-menu__bg-img"/>
        </div>

        <div class="grade-selection__ui">
          <!-- Panel -->
          <div class="grade-selection__panel ui-panel">
            <h2 class="grade-selection__title">เลือกระดับชั้น</h2>
            <p class="grade-selection__subtitle">เนื้อหาจะปรับตามระดับชั้นที่เลือก</p>

            <div class="grade-selection__grid">
              ${gradeButtons}
            </div>

            <button id="grade-back-btn" class="game-btn game-btn--back">
              ← ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('grade-selection');

    // Bind grade buttons
    grades.forEach(g => {
      const btn = document.getElementById(`grade-btn-${g.value}`);
      btn?.addEventListener('click', () => {
        // Save grade
        localStorage.setItem('math_hunter_grade', String(g.value));
        onGradeSelected(g.value);
      });
    });

    // Back button
    document.getElementById('grade-back-btn')?.addEventListener('click', onBack);

    // Keyboard: 3,4,5,6 keys
    this._keyHandler = (e: KeyboardEvent) => {
      const key = parseInt(e.key);
      if ([3, 4, 5, 6].includes(key)) {
        localStorage.setItem('math_hunter_grade', String(key));
        onGradeSelected(key as GradeLevel);
      }
      if (e.key === 'Escape' || e.key === 'Backspace') {
        onBack();
      }
    };
    window.addEventListener('keydown', this._keyHandler);
  }

  private _keyHandler: ((e: KeyboardEvent) => void) | null = null;

  unmount() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  }
}
