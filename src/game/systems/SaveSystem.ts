export class SaveSystem {
  private static readonly STAGE_KEY = 'math_hunter_stage';
  private static readonly GRADE_KEY = 'math_hunter_grade';
  private static readonly BGM_VOLUME_KEY = 'math_hunter_bgm_volume';
  private static readonly SFX_VOLUME_KEY = 'math_hunter_sfx_volume';

  saveProgress(stage: number) {
    localStorage.setItem(SaveSystem.STAGE_KEY, String(Math.max(1, Math.floor(stage))));
  }

  loadProgress(): number {
    return this.loadNumber(SaveSystem.STAGE_KEY, 1, 1, Number.MAX_SAFE_INTEGER);
  }

  saveGrade(grade: number) {
    localStorage.setItem(SaveSystem.GRADE_KEY, String(grade));
  }

  loadGrade(): 3 | 4 | 5 | 6 {
    return this.loadNumber(SaveSystem.GRADE_KEY, 3, 3, 6) as 3 | 4 | 5 | 6;
  }

  saveAudioSettings(bgmVolume: number, sfxVolume: number) {
    localStorage.setItem(SaveSystem.BGM_VOLUME_KEY, String(this.clampVolume(bgmVolume)));
    localStorage.setItem(SaveSystem.SFX_VOLUME_KEY, String(this.clampVolume(sfxVolume)));
  }

  loadAudioSettings() {
    return {
      bgmVolume: this.loadNumber(SaveSystem.BGM_VOLUME_KEY, 50, 0, 100),
      sfxVolume: this.loadNumber(SaveSystem.SFX_VOLUME_KEY, 100, 0, 100),
    };
  }

  private clampVolume(value: number) {
    return Math.min(100, Math.max(0, Math.round(value)));
  }

  private loadNumber(key: string, fallback: number, min: number, max: number) {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;

    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
  }
}
