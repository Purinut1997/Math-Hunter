import { defineConfig } from 'vite';
import { cpSync, mkdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const runtimeAssets = [
  'favicon.svg',
  'assets/audio',
  'assets/backgrounds/opening_cinematic.gif',
  'assets/branding',
  'assets/maps/map1_v2.png',
  'assets/maps/stage2_vanishing_forest.png',
  'assets/maps/stage3_citadel_of_zero.png',
  'assets/data/stage2_questions.md',
  'assets/data/stage3_questions.md',
  'assets/player/max_idle_640.png',
  'assets/player/max_walk_640.png',
  'assets/player/max_attack_640.png',
  'assets/player/max_hit_640.png',
  'assets/player/max_death_640.png',
  'assets/player/max_dash_640.png',
  'assets/monsters/number_slime/spritesheets',
  'assets/monsters/add_beetle/spritesheets',
  'assets/monsters/stone_golem/spritesheets',
  'assets/monsters/thief_rat/sheets_640',
  'assets/monsters/thorn_beetle',
  'assets/monsters/vine_spider',
  'assets/monsters/stage3',
  'assets/monsters/number_core_fragment_01/sheets',
  'assets/items/number_core_fragment_02',
  'assets/boss/king_slime/sheets',
  'assets/boss/void_stag',
  'assets/boss/lord_zero/lord_zero_silhouette.png',
];

function copyRuntimeAssets() {
  return {
    name: 'copy-runtime-assets',
    apply: 'build' as const,
    writeBundle() {
      for (const relativePath of runtimeAssets) {
        const source = resolve('public', relativePath);
        const target = resolve('dist', relativePath);
        mkdirSync(dirname(target), { recursive: true });
        cpSync(source, target, { recursive: statSync(source).isDirectory() });
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  publicDir: command === 'serve' ? 'public' : false,
  plugins: [copyRuntimeAssets()],
  server: {},
}));
