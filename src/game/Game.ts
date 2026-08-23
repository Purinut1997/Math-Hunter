import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import Stage1Scene from './scenes/Stage1Scene';
import Stage2Scene from './scenes/Stage2Scene';
import Stage3Scene from './scenes/Stage3Scene';

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
  scene: [BootScene, Stage1Scene, Stage2Scene, Stage3Scene],
};

export class MathHunterGame extends Phaser.Game {
  constructor() {
    super(config);
  }
}
