// Lord Zero — Stage 1 apparition
// Recommended destination:
// public/assets/story/lord-zero/

this.load.spritesheet(
  "lord-zero-apparition",
  "/assets/story/lord-zero/lord_zero_apparition.png",
  { frameWidth: 512, frameHeight: 768 }
);

this.anims.create({
  key: "lord-zero-apparition",
  frames: this.anims.generateFrameNumbers("lord-zero-apparition", {
    start: 0,
    end: 7
  }),
  frameRate: 6,
  repeat: -1
});

// Example cutscene:
// const zero = this.add.sprite(x, y, "lord-zero-apparition");
// zero.setAlpha(0);
// zero.play("lord-zero-apparition");
// this.tweens.add({ targets: zero, alpha: 1, duration: 500 });
//
// Dialogue:
// "หนึ่งชิ้น...ไม่ได้เปลี่ยนอะไรหรอก"
//
// Then fade out:
// this.tweens.add({ targets: zero, alpha: 0, duration: 500 });
