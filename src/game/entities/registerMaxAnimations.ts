import Phaser from 'phaser';

/**
 * MAX — 6 Sprite Sheets, 640px cells in a single horizontal row.
 * Source: max_ready_pack
 *
 * Spritesheet format:
 *   frameWidth: 640, frameHeight: 640
 *   Single row for each action (side profile).
 *   We map all 4 directions (up/down/left/right) to the same frames, 
 *   and let the scene handle flipX for left.
 */

const FRAME = { frameWidth: 640, frameHeight: 640 };

export function preloadMaxSpritesheets(scene: Phaser.Scene) {
  scene.load.spritesheet('max-idle',   'assets/player/max_idle_640.png',   FRAME);
  scene.load.spritesheet('max-walk',   'assets/player/max_walk_640.png',   FRAME);
  scene.load.spritesheet('max-attack', 'assets/player/max_attack_640.png', FRAME);
  scene.load.spritesheet('max-hit',    'assets/player/max_hit_640.png',    FRAME);
  scene.load.spritesheet('max-death',  'assets/player/max_death_640.png',  FRAME);
  scene.load.spritesheet('max-dash',   'assets/player/max_dash_640.png',   FRAME);
}

export function registerMaxAnimations(scene: Phaser.Scene) {
  const dirs = ['down', 'left', 'right', 'up'] as const;

  const configs = [
    { action: 'idle',   key: 'max-idle',   frames: 8, fps: 7,  repeat: -1 },
    { action: 'walk',   key: 'max-walk',   frames: 8, fps: 10, repeat: -1 },
    { action: 'attack', key: 'max-attack', frames: 8, fps: 12, repeat: 0  },
    { action: 'hit',    key: 'max-hit',    frames: 6, fps: 10, repeat: 0  },
    { action: 'death',  key: 'max-death',  frames: 8, fps: 8,  repeat: 0  },
    { action: 'dash',   key: 'max-dash',   frames: 8, fps: 15, repeat: 0  },
  ] as const;

  for (const cfg of configs) {
    dirs.forEach((dir) => {
      const animKey = `max-${cfg.action}-${dir}`;
      if (scene.anims.exists(animKey)) {
        scene.anims.remove(animKey);
      }
      scene.anims.create({
        key: animKey,
        frames: scene.anims.generateFrameNumbers(cfg.key, { start: 0, end: cfg.frames - 1 }),
        frameRate: cfg.fps,
        repeat: cfg.repeat,
      });
    });
  }
}
