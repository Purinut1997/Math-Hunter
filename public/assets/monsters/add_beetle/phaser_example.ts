// Add Beetle - Phaser sprite loading + animations
// Recommended folder: public/assets/monsters/add-beetle/

const addBeetleSheets = [
  ["add-beetle-idle",   "add_beetle_idle.png"],
  ["add-beetle-attack", "add_beetle_attack.png"],
  ["add-beetle-hit",    "add_beetle_hit.png"],
  ["add-beetle-death",  "add_beetle_death.png"],
] as const;

for (const [key, file] of addBeetleSheets) {
  this.load.spritesheet(
    key,
    `/assets/monsters/add-beetle/${file}`,
    { frameWidth: 256, frameHeight: 256 }
  );
}

this.anims.create({
  key: "add-beetle-idle",
  frames: this.anims.generateFrameNumbers("add-beetle-idle", { start: 0, end: 3 }),
  frameRate: 6,
  repeat: -1
});

this.anims.create({
  key: "add-beetle-attack",
  frames: this.anims.generateFrameNumbers("add-beetle-attack", { start: 0, end: 5 }),
  frameRate: 11,
  repeat: 0
});

this.anims.create({
  key: "add-beetle-hit",
  frames: this.anims.generateFrameNumbers("add-beetle-hit", { start: 0, end: 4 }),
  frameRate: 10,
  repeat: 0
});

this.anims.create({
  key: "add-beetle-death",
  frames: this.anims.generateFrameNumbers("add-beetle-death", { start: 0, end: 5 }),
  frameRate: 8,
  repeat: 0
});
