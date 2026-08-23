import Phaser from 'phaser';
import type { Difficulty, EncounterConfig } from './Stage1Data';

export type Stage3Point = { nx: number; ny: number };

const MAP_WIDTH = 1817;
const MAP_HEIGHT = 866;
const WALKWAY_HALF_WIDTH = 38;
const point = (x: number, y: number): Stage3Point => ({ nx: x / MAP_WIDTH, ny: y / MAP_HEIGHT });

export const STAGE3_PLAYER_START: Stage3Point = point(160, 675);
export const STAGE3_FRAGMENT_PEDESTAL: Stage3Point = point(1580, 115);

export const STAGE3_ROUTE: Stage3Point[] = [
  point(160, 705),
  point(260, 700),
  point(360, 685),
  point(440, 660),
  point(515, 650),
  point(555, 600),
  point(595, 545),
  point(635, 495),
  point(675, 445),
  point(760, 430),
  point(850, 422),
  point(930, 418),
  point(1000, 410),
  point(1040, 360),
  point(1075, 300),
  point(1120, 220),
  point(1200, 245),
  point(1285, 275),
  point(1360, 305),
  point(1435, 315),
  point(1475, 270),
  point(1515, 215),
  point(1550, 160),
  point(1580, 115),
];

const ENCOUNTER_BASE: Array<Omit<EncounterConfig, 'maxHp'>> = [
  { id: 'E01', arenaId: 'HALL_OF_ERASED_NUMBERS', monsterId: 'null_wisp', difficulty: 'easy', ...point(515, 650), scale: 0.28 },
  { id: 'E02', arenaId: 'SHATTERED_CIPHER_BRIDGE', monsterId: 'cipher_bat', difficulty: 'easy', ...point(675, 445), scale: 0.3 },
  { id: 'E03', arenaId: 'DIVISION_FOUNDRY', monsterId: 'divide_golem', difficulty: 'normal', ...point(1000, 410), scale: 0.28 },
  { id: 'E04', arenaId: 'GLITCH_COURT', monsterId: 'glitch_knight', difficulty: 'normal', ...point(1120, 220), scale: 0.29 },
  { id: 'E05', arenaId: 'CORE_ANTECHAMBER', monsterId: 'core_warden', difficulty: 'hard', ...point(1435, 315), scale: 0.3 },
];

export function createStage3Encounters(): EncounterConfig[] {
  return [
    ...ENCOUNTER_BASE.map((encounter) => ({ ...encounter, maxHp: Phaser.Math.Between(1, 3) })),
    { id: 'BOSS', arenaId: 'ZERO_THRONE', monsterId: 'lord_zero', maxHp: 5, difficulty: 'hard' as Difficulty, ...point(1580, 115), scale: 0.42 },
  ];
}

function distanceToSegment(px: number, py: number, a: Stage3Point, b: Stage3Point) {
  const ax = a.nx * MAP_WIDTH;
  const ay = a.ny * MAP_HEIGHT;
  const bx = b.nx * MAP_WIDTH;
  const by = b.ny * MAP_HEIGHT;
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function isStage3Walkable(nx: number, ny: number) {
  const px = nx * MAP_WIDTH;
  const py = ny * MAP_HEIGHT;
  const arenas = [
    { x: 515, y: 650, radius: 92 },
    { x: 675, y: 445, radius: 88 },
    { x: 1000, y: 410, radius: 88 },
    { x: 1120, y: 220, radius: 88 },
    { x: 1435, y: 315, radius: 88 },
    { x: 1580, y: 115, radius: 135 },
  ];
  if (arenas.some(arena => Math.hypot(px - arena.x, py - arena.y) <= arena.radius)) return true;
  for (let index = 0; index < STAGE3_ROUTE.length - 1; index += 1) {
    if (distanceToSegment(px, py, STAGE3_ROUTE[index], STAGE3_ROUTE[index + 1]) <= WALKWAY_HALF_WIDTH) return true;
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
