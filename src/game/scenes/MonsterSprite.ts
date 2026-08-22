import Phaser from 'phaser';
import type { EncounterConfig } from '../data/Stage1Data';

export class MonsterSprite extends Phaser.GameObjects.Sprite {
  public config: EncounterConfig;
  public currentHp: number;
  public isDead: boolean = false;
  
  constructor(scene: Phaser.Scene, x: number, y: number, config: EncounterConfig) {
    // Start with idle animation sprite sheet
    super(scene, x, y, `${config.monsterId}_idle`);
    this.config = config;
    this.currentHp = config.maxHp;
    
    scene.add.existing(this);
    
    this.setScale(config.scale);
    this.play(`${this.config.monsterId}-idle`);
  }

  facePlayer(playerX: number) {
    if (this.isDead) return;
    
    // Most sprites in this pack seem to face RIGHT by default.
    // If a sprite faces LEFT by default, add it to this array.
    const leftFacingMonsters: string[] = []; 
    const defaultFacesRight = !leftFacingMonsters.includes(this.config.monsterId);
    
    const playerIsOnRight = (playerX > this.x);

    if (defaultFacesRight) {
      // Default is RIGHT. If player is on right, no flip. If on left, flip.
      this.setFlipX(!playerIsOnRight);
    } else {
      // Default is LEFT. If player is on right, flip. If on left, no flip.
      this.setFlipX(playerIsOnRight);
    }
  }

  takeDamage(amount: number): boolean {
    if (this.isDead) return false;

    this.currentHp -= amount;
    if (this.currentHp <= 0) {
      this.currentHp = 0;
      this.die();
      return true; // killed
    } else {
      this.playHit();
      return false; // survived
    }
  }

  playAttack(onComplete?: () => void) {
    if (this.isDead) return;
    
    this.play(`${this.config.monsterId}-attack`);
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      if (!this.isDead) {
        this.play(`${this.config.monsterId}-idle`);
      }
      if (onComplete) onComplete();
    });
  }

  playHit() {
    if (this.isDead) return;
    
    this.play(`${this.config.monsterId}-hit`);
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      if (!this.isDead) {
        this.play(`${this.config.monsterId}-idle`);
      }
    });
  }

  private die() {
    this.isDead = true;
    this.play(`${this.config.monsterId}-death`);
    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      // Fade out and destroy
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          // Keep it on screen but invisible? Or destroy?
          // Destroy is safer, we'll recreate if stage restarts.
          this.destroy();
        }
      });
    });
  }
}
