import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load branding or minimal assets here
    this.load.image('developer-credit', 'assets/branding/developed-by-purinut.png');
    this.load.audio('bgm', 'assets/audio/bgm.m4a');
  }

  create() {
    this.game.events.emit('math-hunter:assets-ready');
  }
}
