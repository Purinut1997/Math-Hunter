// Number Core Fragment #1 — Phaser setup
// Recommended folder:
// public/assets/items/number-core-fragment-01/

this.load.spritesheet(
  "fragment-01-idle",
  "/assets/items/number-core-fragment-01/number_core_fragment_01_idle.png",
  { frameWidth: 256, frameHeight: 256 }
);

this.anims.create({
  key: "fragment-01-idle",
  frames: this.anims.generateFrameNumbers("fragment-01-idle", {
    start: 0,
    end: 7
  }),
  frameRate: 8,
  repeat: -1
});

// Example:
// const fragment = this.add.sprite(x, y, "fragment-01-idle");
// fragment.play("fragment-01-idle");
