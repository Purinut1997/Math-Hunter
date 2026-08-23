import Phaser from 'phaser';
import type { Difficulty, EncounterConfig } from './Stage1Data';

export type Stage3Point = { nx: number; ny: number };

export const STAGE3_PLAYER_START: Stage3Point = { nx: 0.075, ny: 0.77 };
export const STAGE3_FRAGMENT_PEDESTAL: Stage3Point = { nx: 0.865, ny: 0.14 };

export const STAGE3_ROUTE: Stage3Point[] = [
  STAGE3_PLAYER_START,
  { nx: 0.17, ny: 0.75 },
  { nx: 0.24, ny: 0.66 },
  { nx: 0.30, ny: 0.56 },
  { nx: 0.20, ny: 0.45 },
  { nx: 0.17, ny: 0.31 },
  { nx: 0.17, ny: 0.16 },
  { nx: 0.27, ny: 0.27 },
  { nx: 0.31, ny: 0.39 },
  { nx: 0.40, ny: 0.52 },
  { nx: 0.48, ny: 0.54 },
  { nx: 0.57, ny: 0.54 },
  { nx: 0.66, ny: 0.54 },
  { nx: 0.72, ny: 0.44 },
  { nx: 0.78, ny: 0.31 },
  { nx: 0.84, ny: 0.22 },
];

const ENCOUNTER_BASE: Array<Omit<EncounterConfig, 'maxHp'>> = [
  { id: 'E01', arenaId: 'HALL_OF_ERASED_NUMBERS', monsterId: 'null_wisp', difficulty: 'easy', nx: 0.17, ny: 0.75, scale: 0.28 },
  { id: 'E02', arenaId: 'SHATTERED_CIPHER_BRIDGE', monsterId: 'cipher_bat', difficulty: 'easy', nx: 0.17, ny: 0.16, scale: 0.3 },
  { id: 'E03', arenaId: 'DIVISION_FOUNDRY', monsterId: 'divide_golem', difficulty: 'normal', nx: 0.31, ny: 0.39, scale: 0.28 },
  { id: 'E04', arenaId: 'GLITCH_COURT', monsterId: 'glitch_knight', difficulty: 'normal', nx: 0.48, ny: 0.54, scale: 0.29 },
  { id: 'E05', arenaId: 'CORE_ANTECHAMBER', monsterId: 'core_warden', difficulty: 'hard', nx: 0.66, ny: 0.54, scale: 0.3 },
];

export function createStage3Encounters(): EncounterConfig[] {
  return [
    ...ENCOUNTER_BASE.map((encounter) => ({ ...encounter, maxHp: Phaser.Math.Between(1, 3) })),
    { id: 'BOSS', arenaId: 'ZERO_THRONE', monsterId: 'lord_zero', maxHp: 5, difficulty: 'hard' as Difficulty, nx: 0.84, ny: 0.22, scale: 0.42 },
  ];
}

function distanceToSegment(px: number, py: number, a: Stage3Point, b: Stage3Point) {
  const dx = b.nx - a.nx;
  const dy = b.ny - a.ny;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(px - a.nx, py - a.ny);
  const t = Math.max(0, Math.min(1, ((px - a.nx) * dx + (py - a.ny) * dy) / lengthSquared));
  return Math.hypot(px - (a.nx + t * dx), py - (a.ny + t * dy));
}

export function isStage3Walkable(nx: number, ny: number) {
  if (Math.hypot(nx - 0.84, ny - 0.22) <= 0.14) return true;
  for (let index = 0; index < STAGE3_ROUTE.length - 1; index += 1) {
    if (distanceToSegment(nx, ny, STAGE3_ROUTE[index], STAGE3_ROUTE[index + 1]) <= 0.055) return true;
  }
  return false;
}

export const STAGE3_MONSTER_NAMES: Record<string, string> = {
  null_wisp: 'NULL WISP',
  cipher_bat: 'CIPHER BAT',
  divide_golem: 'DIVIDE GOLEM',
  glitch_knight: 'GLITCH KNIGHT',
  core_warden: 'CORE WARDEN',
  lord_zero: 'LORD ZERO',
};
