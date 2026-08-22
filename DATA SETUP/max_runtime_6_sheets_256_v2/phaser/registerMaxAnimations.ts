// MAX — 6 Separate 256x256 Sprite Sheets
// Copy spritesheets into: public/assets/player/max/

const MAX_FRAME = { frameWidth: 256, frameHeight: 256 };

this.load.spritesheet("max-idle",   "/assets/player/max/max_idle_256.png",   MAX_FRAME);
this.load.spritesheet("max-walk",   "/assets/player/max/max_walk_256.png",   MAX_FRAME);
this.load.spritesheet("max-attack", "/assets/player/max/max_attack_256.png", MAX_FRAME);
this.load.spritesheet("max-hit",    "/assets/player/max/max_hit_256.png",    MAX_FRAME);
this.load.spritesheet("max-death",  "/assets/player/max/max_death_256.png",  MAX_FRAME);
this.load.spritesheet("max-dash",   "/assets/player/max/max_dash_256.png",   MAX_FRAME);

// Row order for every sheet:
// 0 = down, 1 = left, 2 = right, 3 = up

const DIRS = ["down", "left", "right", "up"] as const;
const ANIMS = {
  idle:   { frames: 8, fps: 7,  repeat: -1 },
  walk:   { frames: 8, fps: 10, repeat: -1 },
  attack: { frames: 8, fps: 12, repeat: 0 },
  hit:    { frames: 6, fps: 10, repeat: 0 },
  death:  { frames: 8, fps: 8,  repeat: 0 },
  dash:   { frames: 8, fps: 15, repeat: 0 },
} as const;

for (const [action, cfg] of Object.entries(ANIMS)) {
  DIRS.forEach((dir, row) => {
    const start = row * cfg.frames;
    const end = start + cfg.frames - 1;

    this.anims.create({
      key: `max-${action}-${dir}`,
      frames: this.anims.generateFrameNumbers(`max-${action}`, { start, end }),
      frameRate: cfg.fps,
      repeat: cfg.repeat,
    });
  });
}

// Recommended in-map display:
// player.setDisplaySize(80, 104);
// Adjust only after comparing against the actual Stage 1 map.
