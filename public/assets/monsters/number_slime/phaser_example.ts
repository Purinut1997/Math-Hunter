// Number Slime - Phaser animation setup
// Place spritesheets in: public/assets/monsters/number-slime/

this.load.spritesheet("number-slime-idle",
  "/assets/monsters/number-slime/number_slime_idle.png",
  { frameWidth: 256, frameHeight: 256 });

this.load.spritesheet("number-slime-attack",
  "/assets/monsters/number-slime/number_slime_attack.png",
  { frameWidth: 256, frameHeight: 256 });

this.load.spritesheet("number-slime-hit",
  "/assets/monsters/number-slime/number_slime_hit.png",
  { frameWidth: 256, frameHeight: 256 });

this.load.spritesheet("number-slime-death",
  "/assets/monsters/number-slime/number_slime_death.png",
  { frameWidth: 256, frameHeight: 256 });

this.anims.create({
  key: "number-slime-idle",
  frames: this.anims.generateFrameNumbers("number-slime-idle", { start: 0, end: 3 }),
  frameRate: 6,
  repeat: -1
});

this.anims.create({
  key: "number-slime-attack",
  frames: this.anims.generateFrameNumbers("number-slime-attack", { start: 0, end: 5 }),
  frameRate: 11,
  repeat: 0
});

this.anims.create({
  key: "number-slime-hit",
  frames: this.anims.generateFrameNumbers("number-slime-hit", { start: 0, end: 4 }),
  frameRate: 10,
  repeat: 0
});

this.anims.create({
  key: "number-slime-death",
  frames: this.anims.generateFrameNumbers("number-slime-death", { start: 0, end: 5 }),
  frameRate: 8,
  repeat: 0
});
