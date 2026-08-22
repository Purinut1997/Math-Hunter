// Stone Golem — Phaser sprite loading + animation setup
// Recommended destination:
// public/assets/monsters/stone-golem/

const stoneGolemSheets = [
  ["stone-golem-idle",   "stone_golem_idle.png"],
  ["stone-golem-attack", "stone_golem_attack.png"],
  ["stone-golem-hit",    "stone_golem_hit.png"],
  ["stone-golem-death",  "stone_golem_death.png"],
] as const;

for (const [key, file] of stoneGolemSheets) {
  this.load.spritesheet(
    key,
    `/assets/monsters/stone-golem/${file}`,
    { frameWidth: 256, frameHeight: 256 }
  );
}

this.anims.create({
  key: "stone-golem-idle",
  frames: this.anims.generateFrameNumbers("stone-golem-idle", { start: 0, end: 3 }),
  frameRate: 5,
  repeat: -1
});

this.anims.create({
  key: "stone-golem-attack",
  frames: this.anims.generateFrameNumbers("stone-golem-attack", { start: 0, end: 5 }),
  frameRate: 10,
  repeat: 0
});

this.anims.create({
  key: "stone-golem-hit",
  frames: this.anims.generateFrameNumbers("stone-golem-hit", { start: 0, end: 4 }),
  frameRate: 9,
  repeat: 0
});

this.anims.create({
  key: "stone-golem-death",
  frames: this.anims.generateFrameNumbers("stone-golem-death", { start: 0, end: 5 }),
  frameRate: 7,
  repeat: 0
});
