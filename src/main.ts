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
import { EventBus, EVENTS } from './game/EventBus';

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

let currentGrade: GradeLevel = saveSystem.loadGrade();
let audioSettings = saveSystem.loadAudioSettings();
let activeStage = 0;

function applyAudioSettings(settings = audioSettings) {
  audioSettings = settings;
  saveSystem.saveAudioSettings(settings.bgmVolume, settings.sfxVolume);
  game.sound.volume = settings.bgmVolume / 100;
}

function playBgmWhenReady() {
  const play = () => {
    if (game.cache.audio.exists('bgm') && !game.sound.get('bgm')) {
      game.sound.play('bgm', { loop: true, volume: 1 });
    }
  };

  if (game.cache.audio.exists('bgm')) play();
  else game.events.once('math-hunter:assets-ready', play);
}

// ===========================
// NAVIGATION
// ===========================

function showMainMenu() {
  gradeSelection.unmount();
  combatUI.unmount();
  mainMenu.mount(
    () => showGradeSelection(),
    () => {
      startStage(saveSystem.loadProgress());
    },
    (stage) => startStage(stage),
    audioSettings,
    applyAudioSettings,
  );
}

function showGradeSelection() {
  mainMenu.unmount();
  combatUI.unmount();
  gradeSelection.mount(
    (grade: GradeLevel) => {
      currentGrade = grade;
      saveSystem.saveGrade(grade);
      startStage1();
    },
    () => showMainMenu()
  );
}

function startStage(stage: number) {
  if (stage === 2) startStage2();
  else startStage1();
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
  applyAudioSettings();
  playBgmWhenReady();
  saveSystem.saveProgress(1);
  activeStage = 1;

  console.log(`Stage 1 started | Grade: ป.${currentGrade}`);
}

function startStage2() {
  gradeSelection.unmount();
  mainMenu.unmount();
  combatUI.mount();
  dialogueUI.mount();
  stageClearUI.mount();

  const stage1 = game.scene.getScene('Stage1Scene');
  if (stage1 && game.scene.isActive('Stage1Scene')) stage1.scene.stop();

  const stage2 = game.scene.getScene('Stage2Scene') as import('./game/scenes/Stage2Scene').default;
  if (stage2 && !game.scene.isActive('Stage2Scene')) game.scene.start('Stage2Scene', { grade: currentGrade });
  else if (stage2) stage2.restartStage();

  applyAudioSettings();
  playBgmWhenReady();
  saveSystem.saveProgress(2);
  activeStage = 2;
  console.log(`Stage 2 started | Grade: ป.${currentGrade}`);
}

type StageClearAction = 'next' | 'select';
type StageClearNavigation = { action: StageClearAction; stage: number };

EventBus.on(EVENTS.STAGE_CLEARED, (navigation: StageClearNavigation | StageClearAction) => {
  // Keep accepting the old string payload so a click during a hot reload is still safe.
  const action = typeof navigation === 'string' ? navigation : navigation.action;
  const clearedStage = typeof navigation === 'string' ? activeStage : navigation.stage;

  stageClearUI.unmount();

  if (action === 'next' && clearedStage === 1) {
    startStage2();
    return;
  }

  if (game.scene.isActive('Stage1Scene')) game.scene.stop('Stage1Scene');
  if (game.scene.isActive('Stage2Scene')) game.scene.stop('Stage2Scene');
  activeStage = 0;
  showMainMenu();
});

EventBus.on(EVENTS.SHOW_STAGE_CLEAR, (data?: { stage?: number }) => {
  if ((data?.stage ?? activeStage) === 1) saveSystem.saveProgress(2);
  else saveSystem.saveProgress(2);
});

// Boot
showMainMenu();
applyAudioSettings();

console.log('MATH HUNTER initialized', game);
