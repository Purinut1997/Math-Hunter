interface Listener {
  fn: Function;
  context?: any;
  once?: boolean;
}

class GameEventEmitter {
  private events = new Map<string, Listener[]>();

  on(event: string, fn: Function, context?: any) {
    const list = this.events.get(event) ?? [];
    list.push({ fn, context, once: false });
    this.events.set(event, list);
    return this;
  }

  once(event: string, fn: Function, context?: any) {
    const list = this.events.get(event) ?? [];
    list.push({ fn, context, once: true });
    this.events.set(event, list);
    return this;
  }

  off(event: string, fn?: Function, context?: any, _once?: boolean) {
    if (!fn) {
      this.events.delete(event);
      return this;
    }
    const list = this.events.get(event);
    if (list) {
      const filtered = list.filter(l => {
        if (l.fn !== fn) return true;
        if (context !== undefined && l.context !== context) return true;
        return false;
      });
      this.events.set(event, filtered);
    }
    return this;
  }

  emit(event: string, ...args: any[]) {
    const list = this.events.get(event);
    if (list && list.length > 0) {
      const toCall = [...list];
      for (const listener of toCall) {
        listener.fn.apply(listener.context, args);
        if (listener.once) {
          this.off(event, listener.fn, listener.context);
        }
      }
      return true;
    }
    return false;
  }
}

export const EventBus = new GameEventEmitter();

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
  SHOW_GAME_CLEAR: 'show_game_clear',
  
  // From React -> Phaser
  ANSWER_SELECTED: 'answer_selected',
  RESTART_STAGE: 'restart_stage',
  COMBAT_TIMEOUT: 'combat_timeout',
  STAGE_CLEARED: 'stage_cleared',
  RETURN_MAIN_MENU: 'return_main_menu',
};
