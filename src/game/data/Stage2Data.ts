import type { EncounterConfig } from './Stage1Data';

export const STAGE2_PLAYER_START = { nx: 0.105, ny: 0.155 };
export const STAGE2_SHRINE = { nx: 0.435, ny: 0.465, radius: 70 };
export const STAGE2_FRAGMENT_PEDESTAL = { nx: 0.855, ny: 0.825 };
export const STAGE2_EXIT_PORTAL = { nx: 0.94, ny: 0.84, radius: 65 };

export const STAGE2_ENCOUNTERS: EncounterConfig[] = [
  { id: 'E01', arenaId: 'STAGE2_ARENA_01', monsterId: 'thief_rat', maxHp: 1, difficulty: 'easy', nx: 0.285, ny: 0.16, scale: 0.15 },
  { id: 'E02', arenaId: 'STAGE2_ARENA_02', monsterId: 'thorn_beetle', maxHp: 1, difficulty: 'easy', nx: 0.435, ny: 0.215, scale: 0.48 },
  { id: 'E03', arenaId: 'STAGE2_ARENA_03', monsterId: 'add_beetle', maxHp: 2, difficulty: 'normal', nx: 0.27, ny: 0.59, scale: 0.42 },
  { id: 'E04', arenaId: 'STAGE2_ARENA_04', monsterId: 'vine_spider', maxHp: 2, difficulty: 'normal', nx: 0.235, ny: 0.755, scale: 0.19 },
  { id: 'E05', arenaId: 'STAGE2_ARENA_05', monsterId: 'stone_golem', maxHp: 3, difficulty: 'normal', nx: 0.39, ny: 0.79, scale: 0.48 },
  { id: 'BOSS', arenaId: 'STAGE2_BOSS_ARENA', monsterId: 'void_stag', maxHp: 5, difficulty: 'hard', nx: 0.825, ny: 0.63, scale: 0.7 },
];

type Point = { nx: number; ny: number };

// Center line of the single intended route. A distance check creates a soft
// walkable corridor that follows the painted road without invisible hard turns.
export const STAGE2_ROUTE: Point[] = [
  STAGE2_PLAYER_START,
  { nx: 0.19, ny: 0.17 },
  { nx: 0.29, ny: 0.16 },
  { nx: 0.37, ny: 0.18 },
  { nx: 0.44, ny: 0.22 },
  { nx: 0.45, ny: 0.34 },
  STAGE2_SHRINE,
  { nx: 0.36, ny: 0.54 },
  { nx: 0.27, ny: 0.59 },
  { nx: 0.23, ny: 0.68 },
  { nx: 0.24, ny: 0.76 },
  { nx: 0.39, ny: 0.79 },
  { nx: 0.52, ny: 0.76 },
  { nx: 0.59, ny: 0.68 },
  { nx: 0.66, ny: 0.61 },
  { nx: 0.75, ny: 0.61 },
  { nx: 0.83, ny: 0.63 },
  STAGE2_FRAGMENT_PEDESTAL,
  STAGE2_EXIT_PORTAL,
];

function distanceToSegment(px: number, py: number, a: Point, b: Point) {
  const dx = b.nx - a.nx;
  const dy = b.ny - a.ny;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.hypot(px - a.nx, py - a.ny);
  const t = Math.max(0, Math.min(1, ((px - a.nx) * dx + (py - a.ny) * dy) / lengthSquared));
  return Math.hypot(px - (a.nx + t * dx), py - (a.ny + t * dy));
}

export function isStage2Walkable(nx: number, ny: number) {
  if (Math.hypot(nx - 0.825, ny - 0.63) <= 0.115) return true;
  if (Math.hypot(nx - STAGE2_SHRINE.nx, ny - STAGE2_SHRINE.ny) <= 0.075) return true;
  for (let index = 0; index < STAGE2_ROUTE.length - 1; index += 1) {
    if (distanceToSegment(nx, ny, STAGE2_ROUTE[index], STAGE2_ROUTE[index + 1]) <= 0.055) return true;
  }
  return false;
}
