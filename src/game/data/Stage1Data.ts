// Stage 1 Linear S-Shape Data

export interface ArenaConfig {
  id: string;
  // Normalized center positions (0.0 - 1.0)
  nx: number;
  ny: number;
  triggerRadius: number;
  
  // Gate coordinates (blocking rectangles)
  // Entrance gate (locks behind player when triggered)
  entranceGate: { nx: number, ny: number, nw: number, nh: number };
  // Exit gate (unlocks when arena cleared)
  exitGate: { nx: number, ny: number, nw: number, nh: number };
}

// Player start position (normalized)
export const PLAYER_START = { nx: 0.04, ny: 0.16 };

// Arenas are strictly sequential.
// Based on user provided percentages:
// A1: (32, 16)
// A2: (70, 16)
// A3: (69, 46)  -- note the curve down and left
// A4: (28, 46)
// A5: (25, 81)  -- note the curve down and right
export const STAGE1_ARENAS: ArenaConfig[] = [
  {
    id: 'ARENA_01',
    nx: 0.32, ny: 0.16, triggerRadius: 80,
    // Entrance on the left, Exit on the right
    entranceGate: { nx: 0.25, ny: 0.12, nw: 0.02, nh: 0.08 },
    exitGate:     { nx: 0.39, ny: 0.12, nw: 0.02, nh: 0.08 }
  },
  {
    id: 'ARENA_02',
    nx: 0.70, ny: 0.16, triggerRadius: 80,
    // Entrance on the left, Exit on the right (before the curve)
    entranceGate: { nx: 0.63, ny: 0.12, nw: 0.02, nh: 0.08 },
    exitGate:     { nx: 0.77, ny: 0.12, nw: 0.02, nh: 0.08 }
  },
  {
    id: 'ARENA_03',
    nx: 0.69, ny: 0.46, triggerRadius: 80,
    // Player comes from top/right, entering from right. Entrance is on the right, Exit on the left.
    entranceGate: { nx: 0.76, ny: 0.42, nw: 0.02, nh: 0.08 },
    exitGate:     { nx: 0.62, ny: 0.42, nw: 0.02, nh: 0.08 }
  },
  {
    id: 'ARENA_04',
    nx: 0.28, ny: 0.46, triggerRadius: 80,
    // Entrance on the right, Exit on the left (before the curve)
    entranceGate: { nx: 0.35, ny: 0.42, nw: 0.02, nh: 0.08 },
    exitGate:     { nx: 0.21, ny: 0.42, nw: 0.02, nh: 0.08 }
  },
  {
    id: 'ARENA_05',
    nx: 0.25, ny: 0.81, triggerRadius: 80,
    // Player comes from top/left, entering from left. Entrance is on the left, Exit on the right.
    entranceGate: { nx: 0.18, ny: 0.77, nw: 0.02, nh: 0.08 },
    exitGate:     { nx: 0.32, ny: 0.77, nw: 0.02, nh: 0.08 }
  }
];

// Boss Arena
export const BOSS_ARENA = {
  id: 'BOSS_ARENA',
  nx: 0.88, ny: 0.81, triggerRadius: 90,
  // Boss Gate locks behind player
  entranceGate: { nx: 0.79, ny: 0.77, nw: 0.02, nh: 0.08 },
};

export const EXIT_PORTAL = { nx: 0.95, ny: 0.81, radius: 60 };

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface EncounterConfig {
  id: string;
  arenaId: string;
  monsterId: string;
  maxHp: number;
  difficulty: Difficulty;
  nx: number;
  ny: number;
  scale: number; // to tweak visual size
}

// 5 Encounters (1 per Arena) + 1 Boss
export const STAGE1_ENCOUNTERS: EncounterConfig[] = [
  // ARENA 1
  { id: 'E01', arenaId: 'ARENA_01', monsterId: 'number_slime', maxHp: 1, difficulty: 'easy', nx: 0.32, ny: 0.16, scale: 0.4 },
  
  // ARENA 2
  { id: 'E02', arenaId: 'ARENA_02', monsterId: 'add_beetle', maxHp: 1, difficulty: 'easy', nx: 0.70, ny: 0.16, scale: 0.5 },

  // ARENA 3
  { id: 'E03', arenaId: 'ARENA_03', monsterId: 'number_slime', maxHp: 2, difficulty: 'easy', nx: 0.69, ny: 0.46, scale: 0.4 },

  // ARENA 4
  { id: 'E04', arenaId: 'ARENA_04', monsterId: 'thief_rat', maxHp: 2, difficulty: 'normal', nx: 0.28, ny: 0.46, scale: 0.25 },

  // ARENA 5
  { id: 'E05', arenaId: 'ARENA_05', monsterId: 'stone_golem', maxHp: 2, difficulty: 'normal', nx: 0.25, ny: 0.81, scale: 0.6 },

  // BOSS ARENA (Center 0.88, 0.81)
  { id: 'BOSS', arenaId: 'BOSS_ARENA', monsterId: 'king_slime', maxHp: 3, difficulty: 'hard', nx: 0.88, ny: 0.81, scale: 0.3 },
];
