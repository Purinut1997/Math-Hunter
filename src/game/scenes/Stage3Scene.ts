import Phaser from 'phaser';
import { preloadMaxSpritesheets, registerMaxAnimations } from '../entities/registerMaxAnimations';
import type { EncounterConfig } from '../data/Stage1Data';
import {
  STAGE3_FRAGMENT_PEDESTAL,
  STAGE3_MONSTER_NAMES,
  STAGE3_PLAYER_START,
  STAGE3_ROUTE,
  createStage3Encounters,
  isStage3Walkable,
} from '../data/Stage3Data';
import { CombatManager } from '../systems/CombatManager';
import { QuestionGenerator } from '../systems/QuestionGenerator';
import { EventBus, EVENTS } from '../EventBus';
import type { GameClearStats } from '../ui/EndCreditsUI';

type Direction = 'up' | 'down' | 'left' | 'right';
type DialogueLine = { speaker?: string; text: string };
type Stage3Enemy = {
  sprite: Phaser.GameObjects.Image;
  config: EncounterConfig;
  hp: number;
  dead: boolean;
};

export default class Stage3Scene extends Phaser.Scene {
  private mapW = 1817;
  private mapH = 866;
  private grade = 3;
  private player!: Phaser.GameObjects.Sprite;
  private playerDir: Direction = 'right';
  private moveSpeed = 205;
  private movementLocked = false;
  private inCombat = false;
  private isIntroPlaying = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<Direction, Phaser.Input.Keyboard.Key>;
  private joystickVec = { x: 0, y: 0 };
  private joystickPointer?: Phaser.Input.Pointer;
  private joystickThumb?: Phaser.GameObjects.Arc;
  private joystickBasePos = { x: 0, y: 0 };
  private combatManager!: CombatManager;
  private encounters: EncounterConfig[] = [];
  private enemies: Stage3Enemy[] = [];
  private currentEncounterIndex = 0;
  private hasSeenOpening = false;
  private hasSeenBossIntro = false;
  private finalSequenceStarted = false;
  private startTime = 0;
  private dialogueCloseHandlers: Array<() => void> = [];
  private combatBg?: Phaser.GameObjects.Rectangle;
  private vsPlayer?: Phaser.GameObjects.Sprite;
  private vsEnemy?: Phaser.GameObjects.Image;
  private debugMode = false;
  private debugGraphics?: Phaser.GameObjects.Graphics;
  private debugText?: Phaser.GameObjects.Text;

  constructor() {
    super('Stage3Scene');
  }

  init(data: { grade?: number }) {
    this.grade = data.grade || 3;
  }

  preload() {
    this.load.image('map3', 'assets/maps/stage3_citadel_of_zero.png');
    preloadMaxSpritesheets(this);
    for (const id of Object.keys(STAGE3_MONSTER_NAMES)) {
      this.load.image(`stage3_${id}`, `assets/monsters/stage3/${id}.png`);
    }
    this.load.spritesheet('number_core_fragment_03', 'assets/items/number_core_fragment_02/number_core_fragment_02_idle.webp', {
      frameWidth: 512,
      frameHeight: 512,
    });
  }

  create() {
    QuestionGenerator.resetRecentQuestions();
    this.removeEventBusListeners();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.handleSceneShutdown, this);
    this.startTime = Date.now();

    const map = this.add.image(0, 0, 'map3').setOrigin(0);
    this.mapW = map.width;
    this.mapH = map.height;
    this.physics.world.setBounds(0, 0, this.mapW, this.mapH);

    registerMaxAnimations(this);
    this.registerFragmentAnimation();
    this.createPlayer();
    this.createInput();

    this.combatManager = new CombatManager(this.grade, 'mixed');
    this.combatManager.resetRunStats();
    this.resetEncounterPool();
    this.createJoystick();
    this.createUIControls();
    this.createDebugLayer();

    EventBus.on(EVENTS.ANSWER_SELECTED, this.handleAnswerSelected, this);
    EventBus.on(EVENTS.COMBAT_TIMEOUT, this.handleCombatTimeout, this);
    EventBus.on(EVENTS.RESTART_STAGE, this.restartStage, this);

    this.playOpeningStory();
  }

  update(_time: number, dtMs: number) {
    this.handleMovement(dtMs / 1000);
    this.checkEncounterTrigger();
    this.updateDebugOverlay();
    if (!this.inCombat) {
      for (const enemy of this.enemies) {
        if (!enemy.dead) enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);
      }
    }
  }

  private createPlayer() {
    const x = STAGE3_PLAYER_START.nx * this.mapW;
    const y = STAGE3_PLAYER_START.ny * this.mapH;
    this.player = this.add.sprite(x, y, 'max-idle').setDepth(30).setScale(0.14);
    this.physics.add.existing(this.player);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true).setSize(180, 180).setOffset(230, 400);
    this.player.play('max-idle-right');
    this.cameras.main.setBounds(0, 0, this.mapW, this.mapH);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);
  }

  private createInput() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F2).on('down', () => {
      this.toggleDebugMode();
    });
  }

  private toggleDebugMode() {
    this.debugMode = !this.debugMode;
    if (this.debugMode) {
      this.cameras.main.stopFollow();
      this.cameras.main.setZoom(Math.min(this.cameras.main.width / this.mapW, this.cameras.main.height / this.mapH));
      this.cameras.main.centerOn(this.mapW / 2, this.mapH / 2);
    } else {
      this.cameras.main.setZoom(1);
      this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }
  }

  private playOpeningStory() {
    if (this.hasSeenOpening) return;
    this.hasSeenOpening = true;
    this.movementLocked = true;
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { speaker: 'Neo', text: 'Fragment ทั้งสองกำลังชี้ไปยังภูเขาสีดำ... ปราสาทแห่งศูนย์ปรากฏแล้ว' },
      { text: 'ตัวเลข 1 2 3 4 5 6 7 8 9 แตกเป็นเศษแสง ก่อนเปลี่ยนเป็น 0' },
      { speaker: 'Neo', text: 'สัญญาณของ Fragment ชิ้นสุดท้ายอยู่ที่ใจกลางปราสาท... แต่พลังมันผิดปกติมาก' },
      { speaker: '???', text: 'ในที่สุด... เจ้าก็นำ Fragment อีกสองชิ้นมาหาข้า' },
      { speaker: 'Max', text: 'นายเป็นใคร!?' },
      { speaker: '???', text: 'จงมาถึงบัลลังก์ของข้า แล้วเจ้าจะได้รู้ว่าทำไม Numeria ต้องกลับสู่ศูนย์' },
    ] satisfies DialogueLine[]);
    this.onceDialogueClosed(() => { this.movementLocked = false; });
  }

  private handleMovement(dt: number) {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.movementLocked) {
      body.setVelocity(0, 0);
      return;
    }
    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -1;
    else if (this.cursors.right.isDown || this.wasd.right.isDown) vx = 1;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -1;
    else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = 1;
    if (this.joystickVec.x || this.joystickVec.y) ({ x: vx, y: vy } = this.joystickVec);
    if (vx && vy) {
      const length = Math.hypot(vx, vy);
      vx /= length;
      vy /= length;
    }
    const nx = body.center.x / this.mapW;
    const ny = body.bottom / this.mapH;
    const nextNx = (body.center.x + vx * this.moveSpeed * dt) / this.mapW;
    const nextNy = (body.bottom + vy * this.moveSpeed * dt) / this.mapH;
    body.setVelocityX(isStage3Walkable(nextNx, ny) ? vx * this.moveSpeed : 0);
    body.setVelocityY(isStage3Walkable(nx, nextNy) ? vy * this.moveSpeed : 0);
    if (vx || vy) {
      this.playerDir = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 'right' : 'left') : (vy > 0 ? 'down' : 'up');
      const key = `max-walk-${this.playerDir}`;
      if (this.player.anims.currentAnim?.key !== key) this.player.play(key);
    } else {
      const key = `max-idle-${this.playerDir}`;
      if (this.player.anims.currentAnim?.key !== key) this.player.play(key);
    }
    this.player.setFlipX(this.playerDir === 'left');
  }

  private checkEncounterTrigger() {
    if (this.movementLocked || this.inCombat || this.isIntroPlaying || this.finalSequenceStarted) return;
    const enemy = this.enemies[this.currentEncounterIndex];
    if (!enemy || enemy.dead) return;
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.sprite.x, enemy.sprite.y);
    const isBoss = enemy.config.monsterId === 'lord_zero';
    if (isBoss && !this.hasSeenBossIntro && distance < 260) {
      this.playBossIntro(enemy);
      return;
    }
    if (distance < (isBoss ? 120 : 88)) this.openCombat(enemy);
  }

  private playBossIntro(enemy: Stage3Enemy) {
    this.hasSeenBossIntro = true;
    this.isIntroPlaying = true;
    this.movementLocked = true;
    this.cameras.main.stopFollow();
    this.cameras.main.pan(enemy.sprite.x, enemy.sprite.y, 700, 'Power2');
    const title = this.add.text(enemy.sprite.x, enemy.sprite.y - 150, 'LORD ZERO\nราชาแห่งความว่างเปล่า', {
      fontSize: '46px', color: '#e9d5ff', fontStyle: 'bold', align: 'center', stroke: '#090014', strokeThickness: 9,
    }).setOrigin(0.5).setDepth(3000).setAlpha(0);
    this.tweens.add({
      targets: title, alpha: 1, y: enemy.sprite.y - 185, duration: 650, hold: 1800, yoyo: true,
      onComplete: () => {
        title.destroy();
        EventBus.emit(EVENTS.SHOW_DIALOGUE, [
          { speaker: 'Lord Zero', text: 'โลกที่เต็มไปด้วยความผิดพลาด ไม่สมควรมีตัวเลขใดนอกจากศูนย์' },
          { speaker: 'Max', text: 'ความผิดพลาดไม่ใช่จุดจบ เราเรียนรู้และแก้ไขมันได้!' },
          { speaker: 'Neo', text: 'กำแพง Zero Barrier มี 5 ชั้น ทำลายมันด้วยคำตอบทั้งห้า!' },
        ] satisfies DialogueLine[]);
        this.onceDialogueClosed(() => {
          this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
          this.isIntroPlaying = false;
          this.openCombat(enemy);
        });
      },
    });
  }

  private openCombat(enemy: Stage3Enemy) {
    this.inCombat = true;
    this.movementLocked = true;
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.combatBg = this.add.rectangle(width / 2, height / 2, width * 2, height * 2, 0x05010d, 0.84).setScrollFactor(0).setDepth(2000);
    this.vsPlayer = this.add.sprite(width * 0.24, height * 0.53, 'max-idle').setScrollFactor(0).setDepth(2001).setScale(0.32);
    this.vsPlayer.play('max-idle-right');
    this.vsEnemy = this.add.image(width * 0.75, height * 0.51, `stage3_${enemy.config.monsterId}`)
      .setScrollFactor(0).setDepth(2001).setScale(enemy.config.monsterId === 'lord_zero' ? 0.75 : 0.62).setFlipX(true);
    this.tweens.add({ targets: this.vsEnemy, y: this.vsEnemy.y - 12, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    EventBus.emit(EVENTS.SHOW_COMBAT_UI);
    this.combatManager.startEncounter(enemy.config);
  }

  private handleAnswerSelected(answer: number | string) {
    if (!this.inCombat) return;
    const enemy = this.enemies[this.currentEncounterIndex];
    if (!enemy) return;
    const result = this.combatManager.handleAnswer(answer);
    if (result === 'correct') this.playCorrectTurn(enemy);
    else this.playWrongTurn(false);
  }

  private handleCombatTimeout() {
    if (!this.inCombat) return;
    this.showFloatingText(this.cameras.main.width / 2, 110, 'หมดเวลา!', '#f87171', 52);
    this.playWrongTurn(true);
  }

  private playCorrectTurn(enemy: Stage3Enemy) {
    this.vsPlayer?.play('max-attack-right');
    this.player.play(`max-attack-${this.playerDir}`);
    this.showFloatingText(this.cameras.main.width * 0.72, 150, 'CORRECT!  -1', '#64ffda', 46);
    this.tweens.add({
      targets: this.vsEnemy, x: this.vsEnemy!.x + 22, alpha: 0.35, duration: 100, yoyo: true, repeat: 2,
      onComplete: () => {
        enemy.hp -= 1;
        if (enemy.config.monsterId === 'lord_zero') this.showBossPhase(enemy.hp);
        if (enemy.hp <= 0) this.defeatEnemy(enemy);
        else {
          this.vsPlayer?.play('max-idle-right');
          this.player.play(`max-idle-${this.playerDir}`);
          this.time.delayedCall(450, () => this.combatManager.nextTurn());
        }
      },
    });
  }

  private playWrongTurn(timedOut: boolean) {
    if (!timedOut) this.showFloatingText(this.cameras.main.width * 0.25, 155, 'พลังชีวิต -1', '#fb7185', 42);
    this.cameras.main.shake(220, 0.012);
    this.player.setTint(0xff7777);
    this.vsPlayer?.setTint(0xff7777);
    this.time.delayedCall(500, () => {
      this.player.clearTint();
      this.vsPlayer?.clearTint();
      this.combatManager.nextTurn();
    });
  }

  private showBossPhase(hp: number) {
    const labels: Record<number, string> = {
      4: 'ZERO BARRIER',
      3: 'BARRIER BREAK',
      2: 'NUMBER COLLAPSE',
      1: 'LORD ZERO OVERLOAD',
      0: 'FINAL CALCULATION',
    };
    this.showFloatingText(this.cameras.main.width / 2, 105, labels[hp] || '', hp === 0 ? '#fde047' : '#c084fc', 48);
    if (hp <= 2) this.vsEnemy?.setTint(0xd8b4fe);
  }

  private defeatEnemy(enemy: Stage3Enemy) {
    enemy.dead = true;
    if (this.vsEnemy) {
      this.tweens.killTweensOf(this.vsEnemy);
      this.tweens.add({ targets: this.vsEnemy, alpha: 0, scale: 1.2, duration: 700 });
    }
    this.tweens.add({ targets: enemy.sprite, alpha: 0, scale: enemy.sprite.scale * 1.3, duration: 700 });
    this.showFloatingText(this.cameras.main.width / 2, 105, enemy.config.monsterId === 'lord_zero' ? 'FINAL STRIKE!' : 'ชนะแล้ว!', '#fde047', 56);
    this.time.delayedCall(900, () => {
      this.endVSCombat();
      this.combatManager.endEncounter();
      this.inCombat = false;
      this.currentEncounterIndex += 1;
      if (enemy.config.monsterId === 'lord_zero') this.playFinalSequence();
      else {
        this.movementLocked = false;
        const next = this.encounters[this.currentEncounterIndex];
        if (next) this.showFloatingText(this.cameras.main.width / 2, 100, `${next.id} เปิดแล้ว`, '#64ffda', 30);
      }
    });
  }

  private playFinalSequence() {
    this.finalSequenceStarted = true;
    this.movementLocked = true;
    const x = STAGE3_FRAGMENT_PEDESTAL.nx * this.mapW;
    const y = STAGE3_FRAGMENT_PEDESTAL.ny * this.mapH;
    const fragment = this.add.sprite(x, y, 'number_core_fragment_03').setDepth(40).setScale(0.28).setTint(0xfde68a);
    fragment.play('number-core-fragment-03-idle');
    this.tweens.add({ targets: fragment, y: y - 35, scale: 0.38, duration: 1000, yoyo: true, repeat: 1, ease: 'Sine.easeInOut' });
    this.cameras.main.flash(1100, 210, 185, 255);
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { text: 'Fragment ชิ้นที่สามหลุดออกจากร่าง Lord Zero และรวมเข้ากับอีกสองชิ้น' },
      { text: 'NUMBER CORE COMPLETE — 3 / 3 FRAGMENTS RESTORED' },
      { speaker: 'Neo', text: 'Number Core เสถียรแล้ว... Numeria กลับมาแล้ว' },
      { speaker: 'Lord Zero', text: 'ทำไมโลกที่เต็มไปด้วยความผิดพลาดถึงควรได้รับการปกป้อง?' },
      { speaker: 'Max', text: 'เพราะเราผิดได้ แล้วเรียนรู้เพื่อทำให้ถูกในครั้งต่อไป' },
    ] satisfies DialogueLine[]);
    this.onceDialogueClosed(() => {
      fragment.destroy();
      const run = this.combatManager.getRunStats();
      const used = QuestionGenerator.getUsedQuestionCount();
      const elapsed = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));
      const accuracyBonus = Math.max(0, run.correctAnswers * 250 - run.wrongAnswers * 75);
      const stats: GameClearStats = {
        grade: this.grade,
        correctAnswers: run.correctAnswers,
        wrongAnswers: run.wrongAnswers,
        bestStreak: run.bestStreak,
        questionsUsed: used,
        clearTimeSeconds: elapsed,
        totalScore: 3000 + accuracyBonus + run.bestStreak * 100,
      };
      EventBus.emit(EVENTS.SHOW_GAME_CLEAR, stats);
    });
  }

  private resetEncounterPool() {
    this.enemies.forEach(enemy => enemy.sprite.destroy());
    this.encounters = createStage3Encounters();
    this.enemies = this.encounters.map(config => {
      const sprite = this.add.image(config.nx * this.mapW, config.ny * this.mapH, `stage3_${config.monsterId}`)
        .setDepth(20).setScale(config.scale);
      this.tweens.add({ targets: sprite, y: sprite.y - 10, duration: 1000 + Math.random() * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      return { sprite, config, hp: config.maxHp, dead: false };
    });
  }

  private registerFragmentAnimation() {
    if (this.anims.exists('number-core-fragment-03-idle')) this.anims.remove('number-core-fragment-03-idle');
    this.anims.create({
      key: 'number-core-fragment-03-idle',
      frames: this.anims.generateFrameNumbers('number_core_fragment_03', { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  private createUIControls() {
    const padding = 15;
    const height = 35;
    let x = this.cameras.main.width - padding;
    const createButton = (label: string, color: number, width: number, onClick: () => void) => {
      x -= width;
      const bg = this.add.graphics().setScrollFactor(0).setDepth(2100)
        .fillStyle(color, 0.85).fillRoundedRect(x, padding, width, height, 6)
        .lineStyle(2, 0xffffff, 1).strokeRoundedRect(x, padding, width, height, 6);
      this.add.text(x + width / 2, padding + height / 2, label, { fontSize: '14px', color: '#fff', fontStyle: 'bold' })
        .setOrigin(0.5).setScrollFactor(0).setDepth(2101);
      bg.setInteractive(new Phaser.Geom.Rectangle(x, padding, width, height), Phaser.Geom.Rectangle.Contains).on('pointerdown', onClick);
      x -= 10;
    };
    createButton('🏠 หน้าแรก', 0x475569, 100, () => EventBus.emit(EVENTS.RETURN_MAIN_MENU));
    createButton('↩ กลับจุดเริ่ม', 0xd97706, 120, () => this.returnPlayerToStart());
    createButton('🔊 +', 0x2563eb, 50, () => { this.sound.volume = Math.min(1, this.sound.volume + 0.1); });
    createButton('🔉 -', 0x2563eb, 50, () => { this.sound.volume = Math.max(0, this.sound.volume - 0.1); });
    createButton('🔇 ปิด/เปิดเสียง', 0x2563eb, 120, () => { this.sound.mute = !this.sound.mute; });
  }

  private createDebugLayer() {
    this.debugGraphics = this.add.graphics().setDepth(1800);
    this.debugText = this.add.text(10, 10, '', {
      fontSize: '12px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.82)', padding: { x: 8, y: 6 },
    }).setScrollFactor(0).setDepth(1900);
  }

  private updateDebugOverlay() {
    this.debugGraphics?.clear();
    if (!this.debugMode) {
      if (this.debugText) this.debugText.text = '';
      this.children.list.forEach(child => {
        if (child.name?.startsWith('debug-label-')) (child as Phaser.GameObjects.Text).setVisible(false);
      });
      return;
    }
    const graphics = this.debugGraphics!;
    graphics.fillStyle(0xff0000, 0.12).fillRect(0, 0, this.mapW, this.mapH);
    graphics.lineStyle(Math.max(72, this.mapH * 0.11), 0x00ff00, 0.32).beginPath();
    graphics.moveTo(STAGE3_ROUTE[0].nx * this.mapW, STAGE3_ROUTE[0].ny * this.mapH);
    for (let index = 1; index < STAGE3_ROUTE.length; index += 1) {
      graphics.lineTo(STAGE3_ROUTE[index].nx * this.mapW, STAGE3_ROUTE[index].ny * this.mapH);
    }
    graphics.strokePath();
    for (let index = 0; index < this.encounters.length; index += 1) {
      const encounter = this.encounters[index];
      graphics.lineStyle(3, 0xa855f7, 0.95).strokeCircle(encounter.nx * this.mapW, encounter.ny * this.mapH, encounter.monsterId === 'lord_zero' ? 120 : 78);
      this.addDebugLabel(`${encounter.id} — ${STAGE3_MONSTER_NAMES[encounter.monsterId]}`, encounter.nx * this.mapW, encounter.ny * this.mapH - 75);
    }
    const next = this.encounters[this.currentEncounterIndex];
    if (next) graphics.lineStyle(6, 0xf97316, 1).strokeCircle(next.nx * this.mapW, next.ny * this.mapH, next.monsterId === 'lord_zero' ? 130 : 88);
    graphics.fillStyle(0x2563eb, 1).fillCircle(this.player.x, this.player.y, 12);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const nx = body.center.x / this.mapW;
    const ny = body.bottom / this.mapH;
    this.debugText!.text =
      `DEBUG PATH MODE [F2]\n` +
      `MAP: ${this.mapW} × ${this.mapH}\n` +
      `PLAYER WORLD: ${Math.round(this.player.x)}, ${Math.round(this.player.y)}\n` +
      `PLAYER GRID: ${(nx * 100).toFixed(1)}, ${(ny * 100).toFixed(1)}\n` +
      `CURRENT ENCOUNTER: ${next?.id ?? 'COMPLETE'}\n` +
      `NEXT ENCOUNTER: ${next?.monsterId === 'lord_zero' ? 'BOSS' : next?.id ?? '-'}\n` +
      `CURRENT GATE: ${this.inCombat ? 'LOCKED' : 'OPEN'}\n` +
      `BOSS GATE: ${this.currentEncounterIndex >= 5 ? 'OPEN' : 'LOCKED'}\n` +
      `SELECTED GRADE: P${this.grade}\n` +
      `USED QUESTIONS: ${QuestionGenerator.getUsedQuestionCount()}\n` +
      `WALKABLE: ${isStage3Walkable(nx, ny)}`;
  }

  private addDebugLabel(text: string, x: number, y: number) {
    const key = `debug-label-${text}`;
    let label = this.children.getByName(key) as Phaser.GameObjects.Text | null;
    if (!label) {
      label = this.add.text(x, y, text, { fontSize: '12px', color: '#e9d5ff', backgroundColor: 'rgba(20,0,35,0.75)' })
        .setOrigin(0.5).setDepth(1850).setName(key);
    }
    label.setVisible(this.debugMode);
  }

  private createJoystick() {
    const defaultX = 112;
    const defaultY = this.cameras.main.height - 112;
    const base = this.add.circle(defaultX, defaultY, 58, 0x000000, 0.35).setScrollFactor(0).setDepth(2100).setStrokeStyle(3, 0xffffff, 0.45);
    this.joystickThumb = this.add.circle(defaultX, defaultY, 28, 0xffffff, 0.72).setScrollFactor(0).setDepth(2101);
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer || pointer.x > this.cameras.main.width / 2) return;
      this.joystickPointer = pointer;
      this.joystickBasePos = { x: pointer.x, y: pointer.y };
      base.setPosition(pointer.x, pointer.y);
      this.joystickThumb!.setPosition(pointer.x, pointer.y);
    });
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer !== this.joystickPointer) return;
      const dx = pointer.x - this.joystickBasePos.x;
      const dy = pointer.y - this.joystickBasePos.y;
      const distance = Math.hypot(dx, dy);
      if (distance) this.joystickVec = { x: dx / distance, y: dy / distance };
      const clamped = Math.min(distance, 58);
      this.joystickThumb!.setPosition(this.joystickBasePos.x + this.joystickVec.x * clamped, this.joystickBasePos.y + this.joystickVec.y * clamped);
    });
    const reset = (pointer: Phaser.Input.Pointer) => {
      if (pointer !== this.joystickPointer) return;
      this.joystickPointer = undefined;
      this.joystickVec = { x: 0, y: 0 };
      base.setPosition(defaultX, defaultY);
      this.joystickThumb!.setPosition(defaultX, defaultY);
    };
    this.input.on('pointerup', reset);
    this.input.on('pointerout', reset);
  }

  public restartStage() {
    QuestionGenerator.resetRecentQuestions();
    this.time.removeAllEvents();
    this.tweens.killAll();
    this.clearDialogueCloseHandlers();
    EventBus.emit(EVENTS.HIDE_DIALOGUE);
    EventBus.emit(EVENTS.HIDE_COMBAT_UI);
    this.currentEncounterIndex = 0;
    this.inCombat = false;
    this.isIntroPlaying = false;
    this.hasSeenBossIntro = false;
    this.finalSequenceStarted = false;
    this.movementLocked = false;
    this.startTime = Date.now();
    this.endVSCombat();
    this.combatManager.endEncounter();
    this.combatManager.resetRunStats();
    this.resetEncounterPool();
    this.returnPlayerToStart();
  }

  private returnPlayerToStart() {
    if (!this.player.active || this.inCombat || this.isIntroPlaying) return;
    const x = STAGE3_PLAYER_START.nx * this.mapW;
    const y = STAGE3_PLAYER_START.ny * this.mapH;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.reset(x, y);
    body.setVelocity(0, 0);
    this.playerDir = 'right';
    this.player.play('max-idle-right');
    this.joystickPointer = undefined;
    this.joystickVec = { x: 0, y: 0 };
    this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'กลับสู่จุดเริ่มต้นแล้ว', '#64ffda', 30);
  }

  private showFloatingText(x: number, y: number, text: string, color: string, size = 40) {
    if (!text) return;
    const label = this.add.text(x, y, text, { fontSize: `${size}px`, color, fontStyle: 'bold', stroke: '#000', strokeThickness: 7 })
      .setOrigin(0.5).setScrollFactor(0).setDepth(3000);
    this.tweens.add({ targets: label, y: y - 50, alpha: 0, duration: 1100, onComplete: () => label.destroy() });
  }

  private endVSCombat() {
    if (this.vsEnemy) this.tweens.killTweensOf(this.vsEnemy);
    this.combatBg?.destroy();
    this.vsPlayer?.destroy();
    this.vsEnemy?.destroy();
    this.combatBg = undefined;
    this.vsPlayer = undefined;
    this.vsEnemy = undefined;
  }

  private onceDialogueClosed(handler: () => void) {
    const wrapped = () => {
      this.dialogueCloseHandlers = this.dialogueCloseHandlers.filter(item => item !== wrapped);
      handler();
    };
    this.dialogueCloseHandlers.push(wrapped);
    EventBus.once(EVENTS.DIALOGUE_CLOSED, wrapped, this);
  }

  private clearDialogueCloseHandlers() {
    this.dialogueCloseHandlers.forEach(handler => EventBus.off(EVENTS.DIALOGUE_CLOSED, handler, this));
    this.dialogueCloseHandlers = [];
  }

  private removeEventBusListeners() {
    EventBus.off(EVENTS.ANSWER_SELECTED, this.handleAnswerSelected, this);
    EventBus.off(EVENTS.COMBAT_TIMEOUT, this.handleCombatTimeout, this);
    EventBus.off(EVENTS.RESTART_STAGE, this.restartStage, this);
    this.clearDialogueCloseHandlers();
  }

  private handleSceneShutdown() {
    this.removeEventBusListeners();
    this.combatManager?.endEncounter();
    this.endVSCombat();
    EventBus.emit(EVENTS.HIDE_DIALOGUE);
    EventBus.emit(EVENTS.HIDE_COMBAT_UI);
  }
}
