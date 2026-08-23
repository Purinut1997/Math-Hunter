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
const BGM_KEYS = ['bgm', 'map2sound', 'map3sound'] as const;
type BgmKey = typeof BGM_KEYS[number];
let requestedBgm: BgmKey | null = null;

function applyAudioSettings(settings = audioSettings) {
  audioSettings = settings;
  saveSystem.saveAudioSettings(settings.bgmVolume, settings.sfxVolume);
  game.sound.volume = settings.bgmVolume / 100;
}

function playBgmWhenReady(track: BgmKey) {
  requestedBgm = track;

  const play = () => {
    if (requestedBgm !== track || !game.cache.audio.exists(track)) return;

    const startTrack = () => {
      if (requestedBgm !== track) return;

      for (const otherTrack of BGM_KEYS) {
        if (otherTrack !== track) game.sound.stopByKey(otherTrack);
      }

      const currentTrack = game.sound.get(track);
      if (!currentTrack) {
        game.sound.play(track, { loop: true, volume: 1 });
      } else if (!currentTrack.isPlaying) {
        currentTrack.play({ loop: true, volume: 1 });
      }
    };

    const soundManager = game.sound as unknown as { context?: AudioContext };
    const audioContext = soundManager.context;
    if (audioContext && audioContext.state !== 'running') {
      void audioContext.resume()
        .then(startTrack)
        .catch(() => game.sound.once('unlocked', startTrack));
    } else {
      startTrack();
    }
  };

  if (game.cache.audio.exists(track)) play();
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

  // Play BGM if not playing
  applyAudioSettings();
  playBgmWhenReady('bgm');
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

  applyAudioSettings();
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
showMainMenu();
applyAudioSettings();

console.log('MATH HUNTER initialized', game);
