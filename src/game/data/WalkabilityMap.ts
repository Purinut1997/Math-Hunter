/**
 * Linear S-Shape Stage 1 Walkability Map
 * Based on: map1_linear.png
 * 
 * Strict NavMesh:
 * Only the road and arenas are walkable.
 * Forests, cliffs, rivers, and waterfalls are entirely blocked.
 */

export interface WalkRect {
  x: number; // normalized 0-1
  y: number;
  w: number;
  h: number;
  label?: string;
}

// All rectangles that player CAN walk on.
export const WALKABLE_ZONES: WalkRect[] = [
  // ==============================
  // TOP LANE (START -> A1 -> A2)
  // ==============================
  { x: 0.01, y: 0.11, w: 0.85, h: 0.15, label: 'top-lane' },
  
  // Arenas are wider circles
  { x: 0.27, y: 0.09, w: 0.12, h: 0.18, label: 'a1-arena' },
  { x: 0.65, y: 0.09, w: 0.12, h: 0.18, label: 'a2-arena' },

  // ==============================
  // RIGHT CURVE (A2 -> MID LANE)
  // 3 massive overlapping blocks
  // ==============================
  { x: 0.75, y: 0.11, w: 0.20, h: 0.16, label: 'r-curve-top' },
  { x: 0.82, y: 0.15, w: 0.14, h: 0.35, label: 'r-curve-vert' },
  { x: 0.75, y: 0.38, w: 0.20, h: 0.16, label: 'r-curve-bot' },

  // ==============================
  // MID LANE (A3 -> A4)
  // ==============================
  { x: 0.10, y: 0.40, w: 0.80, h: 0.15, label: 'mid-lane' }, 

  { x: 0.64, y: 0.38, w: 0.12, h: 0.18, label: 'a3-arena' },
  { x: 0.23, y: 0.38, w: 0.12, h: 0.18, label: 'a4-arena' },

  // ==============================
  // LEFT CURVE (A4 -> BOTTOM LANE)
  // 3 massive overlapping blocks
  // ==============================
  { x: 0.05, y: 0.38, w: 0.20, h: 0.18, label: 'l-curve-top' },
  { x: 0.04, y: 0.48, w: 0.15, h: 0.30, label: 'l-curve-vert' },
  { x: 0.05, y: 0.70, w: 0.20, h: 0.18, label: 'l-curve-bot' },

  // ==============================
  // BOTTOM LANE (A5 -> BOSS)
  // ==============================
  { x: 0.10, y: 0.72, w: 0.85, h: 0.15, label: 'bottom-lane' }, 

  { x: 0.20, y: 0.70, w: 0.12, h: 0.18, label: 'a5-arena' },
  { x: 0.80, y: 0.68, w: 0.16, h: 0.24, label: 'boss-arena' },
];

/**
 * Checks if the coordinates are within any walkable zone.
 */
export function isWalkable(nx: number, ny: number): boolean {
  return WALKABLE_ZONES.some(zone =>
    nx >= zone.x &&
    nx <= zone.x + zone.w &&
    ny >= zone.y &&
    ny <= zone.y + zone.h
  );
}

// Player hitbox size (normalized)
export const PLAYER_HITBOX_NW = 0.025;
export const PLAYER_HITBOX_NH = 0.015;
