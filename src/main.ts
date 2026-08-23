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
import { EndCreditsUI } from './game/ui/EndCreditsUI';
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
let endCreditsUI: EndCreditsUI;

if (uiLayer) {
  combatUI = new CombatUI();
  combatUI.mount();

  new DeveloperCredit();
  
  dialogueUI = new DialogueUI();
  dialogueUI.mount();
  
  stageClearUI = new StageClearUI();
  stageClearUI.mount();

  endCreditsUI = new EndCreditsUI();
  endCreditsUI.mount();
}

// UI Scenes
const mainMenu = new MainMenuScene();
const gradeSelection = new GradeSelectionScene();

let currentGrade: GradeLevel = saveSystem.loadGrade();
let audioSettings = saveSystem.loadAudioSettings();
let activeStage = 0;

// ===========================
// BGM SYSTEM
// ===========================
type BgmKey = 'BG' | 'The_Sun_Over_Numeria' | 'map2sound' | 'map3sound';
const BGM_KEYS: BgmKey[] = ['BG', 'The_Sun_Over_Numeria', 'map2sound', 'map3sound'];

let activeBgmSound: Phaser.Sound.BaseSound | null = null;
let activeBgmKey: BgmKey | null = null;

function doPlayBgm(track: BgmKey) {
  console.log(`[BGM] doPlayBgm called for: ${track}`);
  if (activeBgmKey === track && activeBgmSound && activeBgmSound.isPlaying) {
    console.log(`[BGM] Track ${track} is already playing.`);
    return;
  }

  if (activeBgmSound) {
    console.log(`[BGM] Stopping previous track: ${activeBgmKey}`);
    activeBgmSound.stop();
    activeBgmSound.destroy();
    activeBgmSound = null;
  }
  for (const k of BGM_KEYS) {
    game.sound.stopByKey(k);
  }

  const sndManager = game.sound as any;
  console.log(`[BGM] Adding new track: ${track}. AudioContext locked: ${sndManager.locked}, state: ${sndManager.context?.state}`);
  
  activeBgmSound = game.sound.add(track, { loop: true });
  activeBgmSound.play();
  activeBgmKey = track;
  applyAudioSettings();
}

function playBgmWhenReady(track: BgmKey) {
  const tryPlay = () => {
    doPlayBgm(track);
  };

  if (game.cache.audio.exists(track)) {
    tryPlay();
  } else {
    game.events.once('math-hunter:assets-ready', tryPlay);
  }
}

function applyAudioSettings(settings = audioSettings) {
  audioSettings = settings;
  saveSystem.saveAudioSettings(settings.bgmVolume, settings.sfxVolume);
  
  game.sound.volume = settings.bgmVolume / 100;
  console.log(`[BGM] applyAudioSettings: Global volume set to ${game.sound.volume}`);
  
  if (activeBgmSound && 'setVolume' in activeBgmSound) {
    (activeBgmSound as any).setVolume(settings.bgmVolume / 100);
    console.log(`[BGM] applyAudioSettings: Active track volume set to ${settings.bgmVolume / 100}`);
  }
}

// ===========================
// NAVIGATION
// ===========================

function showMainMenu() {
  gradeSelection.unmount();
  combatUI.unmount();
  playBgmWhenReady('BG');
  mainMenu.mount(
    () => showGradeSelection(),
    () => {
      startStage(saveSystem.loadProgress());
    },
    (stage) => startStage(stage),
    audioSettings,
    applyAudioSettings,
    saveSystem.loadProgress(),
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
  if (stage === 3) startStage3();
  else if (stage === 2) startStage2();
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

  playBgmWhenReady('The_Sun_Over_Numeria');
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

  playBgmWhenReady('map2sound');
  saveSystem.saveProgress(2);
  activeStage = 2;
  console.log(`Stage 2 started | Grade: ป.${currentGrade}`);
}

function startStage3() {
  gradeSelection.unmount();
  mainMenu.unmount();
  combatUI.mount();
  dialogueUI.mount();
  stageClearUI.mount();
  endCreditsUI.mount();

  if (game.scene.isActive('Stage1Scene')) game.scene.stop('Stage1Scene');
  if (game.scene.isActive('Stage2Scene')) game.scene.stop('Stage2Scene');

  const stage3 = game.scene.getScene('Stage3Scene') as import('./game/scenes/Stage3Scene').default;
  if (stage3 && !game.scene.isActive('Stage3Scene')) game.scene.start('Stage3Scene', { grade: currentGrade });
  else if (stage3) stage3.restartStage();

  playBgmWhenReady('map3sound');
  saveSystem.saveProgress(3);
  activeStage = 3;
  console.log(`Stage 3 started | Grade: ป.${currentGrade}`);
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
  if (action === 'next' && clearedStage === 2) {
    startStage3();
    return;
  }

  if (game.scene.isActive('Stage1Scene')) game.scene.stop('Stage1Scene');
  if (game.scene.isActive('Stage2Scene')) game.scene.stop('Stage2Scene');
  if (game.scene.isActive('Stage3Scene')) game.scene.stop('Stage3Scene');
  activeStage = 0;
  showMainMenu();
});

EventBus.on(EVENTS.SHOW_STAGE_CLEAR, (data?: { stage?: number }) => {
  const clearedStage = data?.stage ?? activeStage;
  saveSystem.saveProgress(Math.min(3, clearedStage + 1));
});

EventBus.on(EVENTS.RETURN_MAIN_MENU, () => {
  if (game.scene.isActive('Stage1Scene')) game.scene.stop('Stage1Scene');
  if (game.scene.isActive('Stage2Scene')) game.scene.stop('Stage2Scene');
  if (game.scene.isActive('Stage3Scene')) game.scene.stop('Stage3Scene');
  combatUI.unmount();
  dialogueUI.unmount();
  stageClearUI.unmount();
  endCreditsUI.unmount();
  activeStage = 0;
  showMainMenu();
  endCreditsUI.mount();
});

// Boot
saveSystem.saveProgress(1); // Reset progress on every fresh load
showMainMenu();

console.log('MATH HUNTER initialized', game);
