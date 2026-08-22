import { EventBus, EVENTS } from '../EventBus';

export interface DialogueLine {
  speaker?: string;
  text: string;
}

export class DialogueUI {
  private element: HTMLElement | null = null;
  private currentLines: DialogueLine[] = [];
  private currentLineIndex: number = 0;
  
  constructor() {
    this.handleShow = this.handleShow.bind(this);
  }

  mount() {
    this.unmount();

    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;

    const html = `
      <div id="dialogue-ui" class="dialogue-ui" style="display:none;">
        <div class="dialogue-box">
          <div id="dialogue-speaker" class="dialogue-speaker"></div>
          <div id="dialogue-text" class="dialogue-text"></div>
          <div class="dialogue-hint">คลิกเพื่อดำเนินการต่อ...</div>
        </div>
      </div>
    `;

    uiLayer.insertAdjacentHTML('beforeend', html);
    this.element = document.getElementById('dialogue-ui');

    // Bind click to advance
    this.element?.addEventListener('click', () => {
      this.advance();
    });

    EventBus.on(EVENTS.SHOW_DIALOGUE, this.handleShow);
  }

  unmount() {
    EventBus.off(EVENTS.SHOW_DIALOGUE, this.handleShow);

    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  private handleShow(lines: DialogueLine[]) {
    this.currentLines = lines;
    this.currentLineIndex = 0;
    
    if (this.element && this.currentLines.length > 0) {
      this.element.style.display = 'flex';
      this.renderCurrentLine();
    }
  }

  private advance() {
    this.currentLineIndex++;
    if (this.currentLineIndex >= this.currentLines.length) {
      this.close();
    } else {
      this.renderCurrentLine();
    }
  }

  private renderCurrentLine() {
    const line = this.currentLines[this.currentLineIndex];
    const speakerEl = document.getElementById('dialogue-speaker');
    const textEl = document.getElementById('dialogue-text');

    if (speakerEl) {
      if (line.speaker) {
        speakerEl.textContent = line.speaker;
        speakerEl.style.display = 'block';
      } else {
        speakerEl.style.display = 'none';
      }
    }

    if (textEl) {
      textEl.innerHTML = line.text.replace(/\n/g, '<br/>');
    }

    EventBus.emit(EVENTS.DIALOGUE_LINE_CHANGED, line);
  }

  private close() {
    if (this.element) {
      this.element.style.display = 'none';
    }
    EventBus.emit(EVENTS.DIALOGUE_CLOSED);
  }
}
