import './style.css';
import { MathHunterGame } from './game/Game';
import { MainMenuScene } from './game/ui/MainMenuScene';
import { GradeSelectionScene } from './game/ui/GradeSelectionScene';
import { SaveSystem } from './game/systems/SaveSystem';
import type { GradeLevel } from './game/ui/GradeSelectionScene';

import { CombatUI } from './game/ui/CombatUI';
import { DeveloperCredit } from './game/ui/DeveloperCredit';
import { DialogueUI } from './game/ui/DialogueUI';
import { StageClearUI } from './game/ui/StageClearUI';
import './style.css';

// Initialize Phaser Game
const game = new MathHunterGame();

// Systems
const saveSystem = new SaveSystem();

// Mount all UI components outside of Phaser canvas
const uiLayer = document.getElementById('ui-layer');
let combatUI: CombatUI;
let dialogueUI: DialogueUI;
let stageClearUI: StageClearUI;

if (uiLayer) {
  combatUI = new CombatUI();
  combatUI.mount();

  new DeveloperCredit();
  
  dialogueUI = new DialogueUI();
  dialogueUI.mount();
  
  stageClearUI = new StageClearUI();
  stageClearUI.mount();
}

// UI Scenes
const mainMenu = new MainMenuScene();
const gradeSelection = new GradeSelectionScene();

let currentGrade: GradeLevel = 3;

// ===========================
// NAVIGATION
// ===========================

function showMainMenu() {
  gradeSelection.unmount();
  combatUI.unmount();
  mainMenu.mount(
    () => showGradeSelection(),
    () => {
      const lastStage = saveSystem.loadProgress();
      console.log('เล่นต่อ → Stage', lastStage);
      startStage1();
    },
    () => {
      console.log('เลือกด่าน');
      startStage1();
    }
  );
}

function showGradeSelection() {
  mainMenu.unmount();
  combatUI.unmount();
  gradeSelection.mount(
    (grade: GradeLevel) => {
      currentGrade = grade;
      localStorage.setItem('math_hunter_grade', String(grade));
      startStage1();
    },
    () => showMainMenu()
  );
}

function startStage1() {
  gradeSelection.unmount();
  mainMenu.unmount();
  
  // Mount the Combat UI Overlay (it starts hidden until needed)
  combatUI.mount();
  dialogueUI.mount();
  stageClearUI.mount();

  // Start Phaser Stage1Scene
  const stage1 = game.scene.getScene('Stage1Scene') as import('./game/scenes/Stage1Scene').default;
  if (stage1 && !game.scene.isActive('Stage1Scene')) {
    game.scene.start('Stage1Scene', { grade: currentGrade });
  } else if (stage1 && game.scene.isActive('Stage1Scene')) {
    stage1.restartStage();
  }

  // Play BGM if not playing
  try {
    if (!game.sound.get('bgm')) {
      game.sound.play('bgm', { loop: true, volume: 0.5 });
    }
  } catch (e) {
    console.warn("Could not play BGM", e);
  }

  console.log(`Stage 1 started | Grade: ป.${currentGrade}`);
}

import { EventBus, EVENTS } from './game/EventBus';

EventBus.on(EVENTS.STAGE_CLEARED, (action: 'next' | 'select') => {
  const stage1 = game.scene.getScene('Stage1Scene') as import('./game/scenes/Stage1Scene').default;
  if (stage1) {
    stage1.scene.stop();
  }

  saveSystem.saveProgress(2); // Unlock Stage 2 (hypothetical)
  
  // Reset Stage Clear UI
  stageClearUI.unmount();
  
  if (action === 'select') {
    showMainMenu();
  } else {
    // For now, Next Stage just restarts Stage 1 as Stage 2 is not implemented
    startStage1();
  }
});

// Boot
showMainMenu();

console.log('MATH HUNTER initialized', game);
