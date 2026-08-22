import Phaser from 'phaser';

// Simple EventBus using Phaser's EventEmitter
export const EventBus = new Phaser.Events.EventEmitter();

export const EVENTS = {
  // From Phaser -> React
  SHOW_COMBAT_UI: 'show_combat_ui',
  HIDE_COMBAT_UI: 'hide_combat_ui',
  UPDATE_COMBAT_STATE: 'update_combat_state',
  // Dialogue & Story
  SHOW_DIALOGUE: 'show_dialogue',
  HIDE_DIALOGUE: 'hide_dialogue',
  DIALOGUE_LINE_CHANGED: 'dialogue_line_changed',
  DIALOGUE_CLOSED: 'dialogue_closed',
  SHOW_STAGE_CLEAR: 'show_stage_clear',
  SHOW_GAME_OVER: 'show_game_over',
  
  // From React -> Phaser
  ANSWER_SELECTED: 'answer_selected',
  RESTART_STAGE: 'restart_stage',
  COMBAT_TIMEOUT: 'combat_timeout',
  STAGE_CLEARED: 'stage_cleared',
};
