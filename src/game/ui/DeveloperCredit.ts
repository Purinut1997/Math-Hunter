export class DeveloperCredit {
  private container: HTMLElement | null = null;

  constructor(parentSelector: string = '#ui-layer') {
    const parent = document.querySelector(parentSelector);
    if (!parent) {
      console.warn(`Parent ${parentSelector} not found for DeveloperCredit`);
      return;
    }

    this.container = document.createElement('div');
    this.container.className = 'developer-credit';
    
    const img = document.createElement('img');
    img.src = 'assets/branding/developed-by-purinut.png';
    img.alt = 'Developed by Purinut';
    
    this.container.appendChild(img);
    parent.appendChild(this.container);
  }

  show() {
    if (this.container) this.container.style.display = 'block';
  }

  hide() {
    if (this.container) this.container.style.display = 'none';
  }
}
