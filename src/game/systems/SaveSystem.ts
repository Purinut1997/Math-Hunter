export class SaveSystem {
  // Methods for saving and loading progress (e.g. Current Stage, Settings)
  saveProgress(stage: number) {
    localStorage.setItem('math_hunter_stage', stage.toString());
  }

  loadProgress(): number {
    const stage = localStorage.getItem('math_hunter_stage');
    return stage ? parseInt(stage, 10) : 1;
  }
}
