import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import Stage1Scene from './scenes/Stage1Scene';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#0a192f',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, Stage1Scene],
};

export class MathHunterGame extends Phaser.Game {
  constructor() {
    super(config);
  }
}
