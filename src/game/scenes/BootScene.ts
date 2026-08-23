import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load branding or minimal assets here
    this.load.image('developer-credit', 'assets/branding/developed-by-purinut.png');
    this.load.audio('bgm', 'assets/audio/bgm.m4a');
    this.load.audio('map2sound', [
      'assets/audio/map2sound.mp3',
      'assets/audio/map2sound.m4a',
      'assets/audio/map2sound.ogg',
    ]);
    this.load.audio('map3sound', [
      'assets/audio/map3sound.mp3',
      'assets/audio/map3sound.m4a',
      'assets/audio/map3sound.ogg',
    ]);
  }

  create() {
    this.game.events.emit('math-hunter:assets-ready');
  }
}
