import Phaser from 'phaser';
import { preloadMaxSpritesheets, registerMaxAnimations } from '../entities/registerMaxAnimations';
import {
  STAGE2_ENCOUNTERS,
  STAGE2_FRAGMENT_PEDESTAL,
  STAGE2_PLAYER_START,
  STAGE2_ROUTE,
  STAGE2_SHRINE,
  isStage2Walkable,
} from '../data/Stage2Data';
import { MonsterSprite } from './MonsterSprite';
import { CombatManager } from '../systems/CombatManager';
import { EventBus, EVENTS } from '../EventBus';
import { QuestionGenerator } from '../systems/QuestionGenerator';

type Direction = 'up' | 'down' | 'left' | 'right';
type DialogueLine = { speaker?: string; text: string };

export default class Stage2Scene extends Phaser.Scene {
  private mapW = 0;
  private mapH = 0;
  private player!: Phaser.GameObjects.Sprite;
  private playerDir: Direction = 'right';
  private grade = 3;
  private movementLocked = false;
  private inCombat = false;
  private isIntroPlaying = false;
  private moveSpeed = 205;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<Direction, Phaser.Input.Keyboard.Key>;
  private joystickVec = { x: 0, y: 0 };
  private joystickPointer?: Phaser.Input.Pointer;
  private joystickThumb?: Phaser.GameObjects.Arc;
  private joystickBasePos = { x: 0, y: 0 };
  private combatManager!: CombatManager;
  private monsters: MonsterSprite[] = [];
  private currentMonsterIndex = 0;
  private shrineActivated = false;
  private hasSeenOpening = false;
  private hasSeenFirstCombat = false;
  private hasSeenBossWarning = false;
  private fragmentAvailable = false;
  private fragmentCollected = false;
  private fragmentSprite?: Phaser.GameObjects.Sprite;
  private shrineGlow?: Phaser.GameObjects.Arc;
  private mysteryOverlay?: Phaser.GameObjects.Rectangle;
  private dialogueCloseHandlers: Array<() => void> = [];
  private combatBg?: Phaser.GameObjects.Rectangle;
  private vsPlayer?: Phaser.GameObjects.Sprite;
  private vsMonster?: Phaser.GameObjects.Sprite;
  private debugMode = false;
  private debugGraphics?: Phaser.GameObjects.Graphics;
  private debugText?: Phaser.GameObjects.Text;

  constructor() {
    super('Stage2Scene');
  }

  init(data: { grade?: number }) {
    this.grade = data.grade || 3;
  }

  preload() {
    this.load.image('map2', 'assets/maps/stage2_vanishing_forest.png');
    preloadMaxSpritesheets(this);

    this.load.spritesheet('thief_rat_idle', 'assets/monsters/thief_rat/sheets_640/thief_rat_idle_640.png', { frameWidth: 640, frameHeight: 640 });
    this.load.spritesheet('thief_rat_attack', 'assets/monsters/thief_rat/sheets_640/thief_rat_attack_640.png', { frameWidth: 640, frameHeight: 640 });
    this.load.spritesheet('thief_rat_hit', 'assets/monsters/thief_rat/sheets_640/thief_rat_hit_640.png', { frameWidth: 640, frameHeight: 640 });
    this.load.spritesheet('thief_rat_death', 'assets/monsters/thief_rat/sheets_640/thief_rat_death_640.png', { frameWidth: 640, frameHeight: 640 });

    for (const action of ['idle', 'attack', 'hit', 'death']) {
      this.load.spritesheet(`add_beetle_${action}`, `assets/monsters/add_beetle/spritesheets/add_beetle_${action}.png`, { frameWidth: 256, frameHeight: 256 });
      this.load.spritesheet(`stone_golem_${action}`, `assets/monsters/stone_golem/spritesheets/stone_golem_${action}.png`, { frameWidth: 256, frameHeight: 256 });
      this.load.spritesheet(`thorn_beetle_${action}`, `assets/monsters/thorn_beetle/thorn_beetle_${action}.webp`, { frameWidth: 192, frameHeight: 192 });
      this.load.image(`vine_spider_${action}`, `assets/monsters/vine_spider/vine_spider_${action}.png`);
      this.load.spritesheet(`void_stag_${action}`, `assets/boss/void_stag/void_stag_${action}.webp`, { frameWidth: 171, frameHeight: 171 });
    }

    this.load.spritesheet('number_core_fragment_02_idle', 'assets/items/number_core_fragment_02/number_core_fragment_02_idle.webp', {
      frameWidth: 512,
      frameHeight: 512,
    });
  }

  create() {
    QuestionGenerator.resetRecentQuestions();
    this.removeEventBusListeners();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.handleSceneShutdown, this);

    const map = this.add.image(0, 0, 'map2').setOrigin(0);
    this.mapW = map.width;
    this.mapH = map.height;
    this.physics.world.setBounds(0, 0, this.mapW, this.mapH);

    this.prepareVineSpiderFrames();
    registerMaxAnimations(this);
    this.registerMonsterAnimations();

    this.player = this.add.sprite(
      STAGE2_PLAYER_START.nx * this.mapW,
      STAGE2_PLAYER_START.ny * this.mapH,
      'max-idle',
    ).setDepth(20).setScale(0.14);
    this.physics.add.existing(this.player);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true).setSize(180, 180).setOffset(230, 400);
    this.player.play('max-idle-right');

    this.cameras.main.setBounds(0, 0, this.mapW, this.mapH);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F2).on('down', () => {
      this.debugMode = !this.debugMode;
    });

    this.combatManager = new CombatManager(this.grade, 'subtraction');
    this.spawnMonsters();
    this.createShrineEffects();
    this.createJoystick();
    this.createUIControls();
    this.debugGraphics = this.add.graphics().setDepth(999);
    this.debugText = this.add.text(10, 10, '', {
      fontSize: '12px', color: '#00ff00', backgroundColor: 'rgba(0,0,0,0.7)', padding: { x: 6, y: 4 },
    }).setScrollFactor(0).setDepth(1000);

    EventBus.on(EVENTS.ANSWER_SELECTED, this.handleAnswerSelected, this);
    EventBus.on(EVENTS.COMBAT_TIMEOUT, this.handleCombatTimeout, this);
    EventBus.on(EVENTS.RESTART_STAGE, this.restartStage, this);
    EventBus.on(EVENTS.DIALOGUE_LINE_CHANGED, this.handleDialogueLineChanged, this);

    this.playOpeningStory();
  }

  update(_time: number, dtMs: number) {
    this.handleMovement(dtMs / 1000);
    this.checkProgressionTriggers();
    this.updateDebugOverlay();
    if (!this.inCombat) {
      this.monsters.forEach(monster => monster.active && !monster.isDead && monster.facePlayer(this.player.x));
    }
  }

  private playOpeningStory() {
    if (this.hasSeenOpening) return;
    this.hasSeenOpening = true;
    this.movementLocked = true;
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { speaker: 'Neo', text: 'เข้าสู่ป่าลบเลือนแล้ว\nสัญญาณของเศษแก่นชิ้นที่สองอยู่ลึกเข้าไป' },
      { speaker: 'Max', text: 'ยิ่งเดินเข้าไป... ตัวเลขรอบตัวเหมือนกำลังหายไป' },
      { speaker: 'Neo', text: 'รักษาสติไว้ ด่านนี้พลังของเราเกิดจากการลบ!' },
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

    const currentNx = body.center.x / this.mapW;
    const currentNy = body.bottom / this.mapH;
    const nextNx = (body.center.x + vx * this.moveSpeed * dt) / this.mapW;
    const nextNy = (body.bottom + vy * this.moveSpeed * dt) / this.mapH;
    body.setVelocityX(isStage2Walkable(nextNx, currentNy) ? vx * this.moveSpeed : 0);
    body.setVelocityY(isStage2Walkable(currentNx, nextNy) ? vy * this.moveSpeed : 0);

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

  private checkProgressionTriggers() {
    if (this.movementLocked || this.inCombat || this.isIntroPlaying) return;

    if (this.currentMonsterIndex === 2 && !this.shrineActivated) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        STAGE2_SHRINE.nx * this.mapW,
        STAGE2_SHRINE.ny * this.mapH,
      );
      if (distance < STAGE2_SHRINE.radius) this.activateShrine();
      return;
    }

    if (this.currentMonsterIndex < STAGE2_ENCOUNTERS.length) {
      const activeMonster = this.monsters[this.currentMonsterIndex];
      if (!activeMonster?.active) return;
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, activeMonster.x, activeMonster.y);
      const isBoss = activeMonster.config.monsterId === 'void_stag';
      if (isBoss && !this.hasSeenBossWarning && distance < 270) {
        this.hasSeenBossWarning = true;
        this.movementLocked = true;
        EventBus.emit(EVENTS.SHOW_DIALOGUE, [
          { speaker: 'Neo', text: 'ประตูผนึกเปิดแล้ว... พลังด้านหน้ารุนแรงมาก' },
          { speaker: 'Max', text: 'เศษแก่นชิ้นที่สองต้องอยู่ข้างในแน่' },
        ] satisfies DialogueLine[]);
        this.onceDialogueClosed(() => { this.movementLocked = false; });
        return;
      }
      if (distance < (isBoss ? 105 : 82)) {
        if (isBoss) this.playBossIntro(activeMonster);
        else this.startEncounterCombat(activeMonster);
      }
      return;
    }

    if (this.fragmentAvailable && !this.fragmentCollected) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.fragmentSprite!.x, this.fragmentSprite!.y);
      if (distance < 85) this.collectFragment();
    }
  }

  private activateShrine() {
    this.movementLocked = true;
    this.shrineGlow?.setFillStyle(0x64ffda, 0.35);
    this.cameras.main.flash(700, 80, 220, 210);
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { speaker: 'Neo', text: 'ศาลเจ้าโบราณตอบสนองแล้ว... มีข้อความถูกบันทึกไว้' },
      { text: 'แก่นพลังตัวเลขแตกออกเป็น 3 ชิ้น' },
      { text: 'ชิ้นแรก — ถูกพบที่หมู่บ้านบวกไว' },
      { text: 'ชิ้นที่สอง — หลับใหลอยู่ในป่าลบเลือน' },
      { text: 'ชิ้นสุดท้าย — ตำแหน่งยังไม่ปรากฏ' },
      { speaker: '???', text: 'รู้จำนวนชิ้นแล้วอย่างไร...\nพวกเจ้าจะไม่มีวันรวบรวมมันได้ครบ' },
      { speaker: 'Max', text: 'ใครน่ะ! ออกมาเดี๋ยวนี้!' },
      { speaker: 'Neo', text: 'สัญญาณหายไปแล้ว... แต่ต้นทางอยู่ลึกเข้าไปในป่า' },
    ] satisfies DialogueLine[]);
    this.onceDialogueClosed(() => {
      this.shrineActivated = true;
      this.movementLocked = false;
    });
  }

  private playBossIntro(boss: MonsterSprite) {
    this.isIntroPlaying = true;
    this.movementLocked = true;
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    this.cameras.main.stopFollow();
    this.cameras.main.pan(boss.x, boss.y, 650, 'Power2');
    const title = this.add.text(boss.x, boss.y - 115, 'VOID STAG\nผู้พิทักษ์แห่งความว่างเปล่า', {
      fontSize: '42px', color: '#d8b4fe', fontStyle: 'bold', align: 'center',
      stroke: '#160b2e', strokeThickness: 8,
    }).setOrigin(0.5).setDepth(3000).setAlpha(0);
    this.tweens.add({
      targets: title,
      alpha: 1,
      y: boss.y - 150,
      duration: 650,
      hold: 1900,
      yoyo: true,
      onComplete: () => {
        title.destroy();
        this.cameras.main.pan(this.player.x, this.player.y, 450, 'Power2', true, (_camera, progress) => {
          if (progress === 1) {
            this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
            this.isIntroPlaying = false;
            this.startEncounterCombat(boss);
          }
        });
      },
    });
  }

  private startEncounterCombat(monster: MonsterSprite) {
    if (!this.hasSeenFirstCombat) {
      this.hasSeenFirstCombat = true;
      this.movementLocked = true;
      EventBus.emit(EVENTS.SHOW_DIALOGUE, [
        { speaker: 'Neo', text: 'ใช้การลบทำให้ค่าของศัตรูลดลงจนเหลือศูนย์!' },
      ] satisfies DialogueLine[]);
      this.onceDialogueClosed(() => this.openCombat(monster));
      return;
    }
    this.openCombat(monster);
  }

  private openCombat(monster: MonsterSprite) {
    this.inCombat = true;
    this.movementLocked = true;
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    const cw = this.cameras.main.width;
    const ch = this.cameras.main.height;
    this.combatBg = this.add.rectangle(cw / 2, ch / 2, cw * 2, ch * 2, 0x05010d, 0.82).setScrollFactor(0).setDepth(2000);
    this.vsPlayer = this.add.sprite(cw * 0.25, ch * 0.55, 'max-idle').setScrollFactor(0).setDepth(2001).setScale(0.32);
    this.vsPlayer.play('max-idle-right');
    const scale: Record<string, number> = { thief_rat: 0.42, thorn_beetle: 1.15, add_beetle: 0.82, vine_spider: 0.52, stone_golem: 0.9, void_stag: 2.1 };
    this.vsMonster = this.add.sprite(cw * 0.75, ch * 0.55, `${monster.config.monsterId}_idle`)
      .setScrollFactor(0).setDepth(2001).setScale(scale[monster.config.monsterId] || 0.8).setFlipX(true);
    this.vsMonster.play(`${monster.config.monsterId}-idle`);
    EventBus.emit(EVENTS.SHOW_COMBAT_UI);
    this.combatManager.startEncounter(monster.config);
  }

  private handleAnswerSelected(answer: number | string) {
    if (!this.inCombat || this.currentMonsterIndex >= STAGE2_ENCOUNTERS.length) return;
    const monster = this.monsters[this.currentMonsterIndex];
    const result = this.combatManager.handleAnswer(answer);
    if (result === 'correct') this.playCorrectTurn(monster);
    else this.playWrongTurn(monster, false);
  }

  private handleCombatTimeout() {
    if (!this.inCombat || this.currentMonsterIndex >= STAGE2_ENCOUNTERS.length) return;
    this.showFloatingText(this.cameras.main.width / 2, 110, 'หมดเวลา!', '#f87171', 54);
    this.playWrongTurn(this.monsters[this.currentMonsterIndex], true);
  }

  private playCorrectTurn(monster: MonsterSprite) {
    const vsPlayer = this.vsPlayer!;
    const vsMonster = this.vsMonster!;
    vsPlayer.play('max-attack-right');
    this.player.play(`max-attack-${this.playerDir}`);
    this.showFloatingText(vsPlayer.x, vsPlayer.y - 130, 'ลบพลัง!', '#60a5fa');
    vsPlayer.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      vsPlayer.play('max-idle-right');
      this.player.play(`max-idle-${this.playerDir}`);
      const killed = monster.takeDamage(1);
      vsMonster.play(`${monster.config.monsterId}-hit`);
      this.showFloatingText(vsMonster.x, vsMonster.y - 130, '-1', '#f87171');
      vsMonster.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        if (!killed) {
          vsMonster.play(`${monster.config.monsterId}-idle`);
          if (monster.config.monsterId === 'void_stag') {
            const ratio = monster.currentHp / monster.config.maxHp;
            if (ratio <= 0.4) vsMonster.setTint(0xc084fc);
            else if (ratio <= 0.7) vsMonster.setTint(0xe9d5ff);
          }
          this.time.delayedCall(400, () => this.combatManager.nextTurn());
          return;
        }
        vsMonster.play(`${monster.config.monsterId}-death`);
        this.showFloatingText(this.cameras.main.width / 2, 105, 'ชนะแล้ว!', '#fde047', 58);
        this.time.delayedCall(1100, () => this.finishEncounter(monster));
      });
    });
  }

  private playWrongTurn(monster: MonsterSprite, timedOut: boolean) {
    const vsPlayer = this.vsPlayer!;
    const vsMonster = this.vsMonster!;
    vsMonster.play(`${monster.config.monsterId}-attack`);
    monster.playAttack();
    if (!timedOut) this.showFloatingText(vsMonster.x, vsMonster.y - 130, 'โจมตี!', '#fb7185');
    vsMonster.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      vsMonster.play(`${monster.config.monsterId}-idle`);
      vsPlayer.play('max-hit-right');
      this.player.play(`max-hit-${this.playerDir}`);
      this.cameras.main.shake(220, 0.012);
      this.showFloatingText(vsPlayer.x, vsPlayer.y - 130, '-1', '#ef4444');
      vsPlayer.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        vsPlayer.play('max-idle-right');
        this.player.play(`max-idle-${this.playerDir}`);
        this.time.delayedCall(750, () => this.combatManager.nextTurn());
      });
    });
  }

  private finishEncounter(monster: MonsterSprite) {
    const wasBoss = monster.config.monsterId === 'void_stag';
    this.endVSCombat();
    this.combatManager.endEncounter();
    this.inCombat = false;
    this.currentMonsterIndex += 1;
    this.movementLocked = false;
    if (wasBoss) this.revealFragment();
  }

  private revealFragment() {
    this.fragmentAvailable = true;
    this.movementLocked = true;
    const x = STAGE2_FRAGMENT_PEDESTAL.nx * this.mapW;
    const y = STAGE2_FRAGMENT_PEDESTAL.ny * this.mapH;
    this.fragmentSprite = this.add.sprite(x, y, 'number_core_fragment_02_idle').setDepth(25).setScale(0.32);
    this.fragmentSprite.play('number-core-fragment-02-idle');
    this.tweens.add({ targets: this.fragmentSprite, y: y - 20, duration: 950, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { speaker: 'Neo', text: 'Void Stag สลายไปแล้ว! สัญญาณเศษแก่นปรากฏที่แท่นด้านล่าง' },
    ] satisfies DialogueLine[]);
    this.onceDialogueClosed(() => { this.movementLocked = false; });
  }

  private collectFragment() {
    this.fragmentCollected = true;
    this.fragmentAvailable = false;
    this.movementLocked = true;
    this.tweens.add({ targets: this.fragmentSprite, alpha: 0, y: this.fragmentSprite!.y - 70, duration: 700 });
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { speaker: 'Max', text: 'ได้มาแล้ว... เศษแก่นพลังชิ้นที่สอง!' },
      { speaker: 'Neo', text: 'ตอนนี้เรามี 2 จาก 3 ชิ้น แต่ชิ้นสุดท้ายกำลังส่งคลื่นพลังผิดปกติ' },
      { speaker: '???', text: 'ยิ่งเข้าใกล้ความจริง... สิ่งที่ต้องสูญเสียก็ยิ่งมากขึ้น' },
      { speaker: 'Max', text: 'ครั้งหน้า เราจะตามหาต้นตอของเสียงนั้นให้เจอ' },
      { text: 'เส้นทางสู่ด่านสุดท้ายได้เปิดออกแล้ว...' },
    ] satisfies DialogueLine[]);
    this.onceDialogueClosed(() => {
      this.fragmentSprite?.destroy();
      EventBus.emit(EVENTS.SHOW_STAGE_CLEAR, {
        stage: 2,
        title: 'ป่าลบเลือน',
        fragmentText: '◆ 2 / 3',
        message: 'เศษแก่นชิ้นที่สองกลับคืนมาแล้ว!',
      });
    });
  }

  private prepareVineSpiderFrames() {
    for (const action of ['idle', 'attack', 'hit', 'death']) {
      const texture = this.textures.get(`vine_spider_${action}`);
      if (texture.has('0')) continue;
      const xEdges = [0, 444, 887, 1331, 1774];
      const yEdges = [0, 444, 887];
      let frame = 0;
      for (let row = 0; row < 2; row += 1) {
        for (let column = 0; column < 4; column += 1) {
          texture.add(String(frame), 0, xEdges[column], yEdges[row], xEdges[column + 1] - xEdges[column], yEdges[row + 1] - yEdges[row]);
          frame += 1;
        }
      }
    }
  }

  private registerMonsterAnimations() {
    const create = (key: string, texture: string, end: number, frameRate: number, repeat = 0) => {
      if (this.anims.exists(key)) this.anims.remove(key);
      const frames = texture.startsWith('vine_spider_')
        ? Array.from({ length: end + 1 }, (_, index) => ({ key: texture, frame: String(index) }))
        : this.anims.generateFrameNumbers(texture, { start: 0, end });
      this.anims.create({ key, frames, frameRate, repeat });
    };
    const configs: Record<string, { idle: number; attack: number; hit: number; death: number }> = {
      thief_rat: { idle: 5, attack: 7, hit: 3, death: 5 },
      add_beetle: { idle: 3, attack: 5, hit: 4, death: 5 },
      stone_golem: { idle: 3, attack: 5, hit: 4, death: 5 },
      thorn_beetle: { idle: 7, attack: 7, hit: 7, death: 7 },
      vine_spider: { idle: 7, attack: 7, hit: 7, death: 7 },
      void_stag: { idle: 7, attack: 7, hit: 7, death: 7 },
    };
    for (const [id, frames] of Object.entries(configs)) {
      create(`${id}-idle`, `${id}_idle`, frames.idle, 7, -1);
      create(`${id}-attack`, `${id}_attack`, frames.attack, 11);
      create(`${id}-hit`, `${id}_hit`, frames.hit, 10);
      create(`${id}-death`, `${id}_death`, frames.death, 8);
    }
    create('number-core-fragment-02-idle', 'number_core_fragment_02_idle', 7, 8, -1);
  }

  private spawnMonsters() {
    this.monsters.forEach(monster => monster.destroy());
    this.monsters = STAGE2_ENCOUNTERS.map(config => new MonsterSprite(this, config.nx * this.mapW, config.ny * this.mapH, config));
  }

  private createShrineEffects() {
    const x = STAGE2_SHRINE.nx * this.mapW;
    const y = STAGE2_SHRINE.ny * this.mapH;
    this.shrineGlow = this.add.circle(x, y, 42, 0x38bdf8, 0.16).setDepth(5).setStrokeStyle(3, 0x67e8f9, 0.55);
    this.tweens.add({ targets: this.shrineGlow, scale: 1.3, alpha: 0.35, duration: 1200, yoyo: true, repeat: -1 });
  }

  private createUIControls() {
    const padding = 15;
    const btnHeight = 35;
    let currentX = this.cameras.main.width - padding;
    const y = padding;

    const createBtn = (label: string, color: number, width: number, onClick: () => void) => {
      currentX -= width;
      const bg = this.add.graphics().setScrollFactor(0).setDepth(2000)
        .fillStyle(color, 0.8).fillRoundedRect(currentX, y, width, btnHeight, 6)
        .lineStyle(2, 0xffffff, 1).strokeRoundedRect(currentX, y, width, btnHeight, 6);
      this.add.text(currentX + width / 2, y + btnHeight / 2, label, {
        fontSize: '14px', color: '#ffffff', fontStyle: 'bold', align: 'center',
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);
      bg.setInteractive(new Phaser.Geom.Rectangle(currentX, y, width, btnHeight), Phaser.Geom.Rectangle.Contains);
      bg.on('pointerover', () => bg.setAlpha(0.7));
      bg.on('pointerout', () => bg.setAlpha(1));
      bg.on('pointerdown', onClick);
      currentX -= 10;
    };

    createBtn('🏠 หน้าแรก', 0x475569, 100, () => window.location.reload());
    createBtn('↩ กลับจุดเริ่ม', 0xd97706, 120, () => this.returnPlayerToStart());
    createBtn('🔊 +', 0x2563eb, 50, () => { this.sound.volume = Math.min(1, this.sound.volume + 0.1); });
    createBtn('🔉 -', 0x2563eb, 50, () => { this.sound.volume = Math.max(0, this.sound.volume - 0.1); });
    createBtn('🔇 ปิด/เปิดเสียง', 0x2563eb, 120, () => { this.sound.mute = !this.sound.mute; });
  }

  private updateDebugOverlay() {
    this.debugGraphics?.clear();
    if (!this.debugMode) {
      if (this.debugText) this.debugText.text = '';
      return;
    }

    const graphics = this.debugGraphics!;
    const corridorWidth = Math.max(70, this.mapH * 0.11);
    graphics.lineStyle(corridorWidth, 0x00ff00, 0.28);
    graphics.beginPath();
    graphics.moveTo(STAGE2_ROUTE[0].nx * this.mapW, STAGE2_ROUTE[0].ny * this.mapH);
    for (let index = 1; index < STAGE2_ROUTE.length; index += 1) {
      graphics.lineTo(STAGE2_ROUTE[index].nx * this.mapW, STAGE2_ROUTE[index].ny * this.mapH);
    }
    graphics.strokePath();

    graphics.fillStyle(0x00ff00, 0.22);
    graphics.fillCircle(STAGE2_SHRINE.nx * this.mapW, STAGE2_SHRINE.ny * this.mapH, STAGE2_SHRINE.radius);
    graphics.fillCircle(0.825 * this.mapW, 0.63 * this.mapH, this.mapH * 0.115);

    if (this.currentMonsterIndex < STAGE2_ENCOUNTERS.length) {
      const target = STAGE2_ENCOUNTERS[this.currentMonsterIndex];
      graphics.lineStyle(3, 0xffff00, 1);
      graphics.strokeCircle(target.nx * this.mapW, target.ny * this.mapH, target.monsterId === 'void_stag' ? 105 : 82);
    }

    if (this.currentMonsterIndex === 2 && !this.shrineActivated) {
      graphics.lineStyle(3, 0x38bdf8, 1);
      graphics.strokeCircle(STAGE2_SHRINE.nx * this.mapW, STAGE2_SHRINE.ny * this.mapH, STAGE2_SHRINE.radius);
    }
    if (this.fragmentAvailable) {
      graphics.fillStyle(0x00ffff, 0.45);
      graphics.fillCircle(STAGE2_FRAGMENT_PEDESTAL.nx * this.mapW, STAGE2_FRAGMENT_PEDESTAL.ny * this.mapH, 65);
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const feetNx = body.center.x / this.mapW;
    const feetNy = body.bottom / this.mapH;
    const target = this.currentMonsterIndex === 2 && !this.shrineActivated
      ? 'ANCIENT SHRINE'
      : this.currentMonsterIndex < STAGE2_ENCOUNTERS.length
        ? STAGE2_ENCOUNTERS[this.currentMonsterIndex].id
        : this.fragmentAvailable ? 'FRAGMENT 02' : 'COMPLETE';
    this.debugText!.text =
      `DEBUG MODE (F2 to toggle)\n` +
      `Map: ${this.mapW} x ${this.mapH}\n` +
      `Player Sprite: ${Math.round(this.player.x)}, ${Math.round(this.player.y)}\n` +
      `Feet Norm: ${feetNx.toFixed(3)}, ${feetNy.toFixed(3)} | Walkable: ${isStage2Walkable(feetNx, feetNy)}\n` +
      `Progress: ${this.currentMonsterIndex}/${STAGE2_ENCOUNTERS.length}\n` +
      `InCombat: ${this.inCombat}\n` +
      `Target: ${target}`;
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

  private handleDialogueLineChanged(line: DialogueLine) {
    if (line.speaker === '???') {
      if (!this.mysteryOverlay) {
        this.mysteryOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x19052f, 0.22)
          .setScrollFactor(0).setDepth(2500);
        this.cameras.main.shake(700, 0.004);
      }
    } else if (this.mysteryOverlay) {
      this.mysteryOverlay.destroy();
      this.mysteryOverlay = undefined;
    }
  }

  private showFloatingText(x: number, y: number, text: string, color: string, size = 40) {
    const label = this.add.text(x, y, text, { fontSize: `${size}px`, color, fontStyle: 'bold', stroke: '#000', strokeThickness: 6 })
      .setOrigin(0.5).setScrollFactor(0).setDepth(2600);
    this.tweens.add({ targets: label, y: y - 55, alpha: 0, duration: 1000, onComplete: () => label.destroy() });
  }

  private endVSCombat() {
    this.combatBg?.destroy();
    this.vsPlayer?.destroy();
    this.vsMonster?.destroy();
    this.combatBg = undefined;
    this.vsPlayer = undefined;
    this.vsMonster = undefined;
  }

  public restartStage() {
    QuestionGenerator.resetRecentQuestions();
    this.time.removeAllEvents();
    this.tweens.killAll();
    this.clearDialogueCloseHandlers();
    EventBus.emit(EVENTS.HIDE_DIALOGUE);
    EventBus.emit(EVENTS.HIDE_COMBAT_UI);
    this.currentMonsterIndex = 0;
    this.shrineActivated = false;
    this.hasSeenBossWarning = false;
    this.fragmentAvailable = false;
    this.fragmentCollected = false;
    this.inCombat = false;
    this.isIntroPlaying = false;
    this.movementLocked = false;
    this.fragmentSprite?.destroy();
    this.fragmentSprite = undefined;
    this.endVSCombat();
    this.combatManager.endEncounter();
    this.combatManager.resetPlayer();
    this.spawnMonsters();
    const x = STAGE2_PLAYER_START.nx * this.mapW;
    const y = STAGE2_PLAYER_START.ny * this.mapH;
    (this.player.body as Phaser.Physics.Arcade.Body).reset(x, y);
    this.player.play('max-idle-right');
  }

  private returnPlayerToStart() {
    if (!this.player.active || this.inCombat || this.isIntroPlaying) return;
    const x = STAGE2_PLAYER_START.nx * this.mapW;
    const y = STAGE2_PLAYER_START.ny * this.mapH;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.reset(x, y);
    body.setVelocity(0, 0);
    this.joystickPointer = undefined;
    this.joystickVec = { x: 0, y: 0 };
    this.playerDir = 'right';
    this.player.play('max-idle-right');
    this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'กลับสู่จุดเริ่มต้นแล้ว', '#64ffda', 30);
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
    EventBus.off(EVENTS.DIALOGUE_LINE_CHANGED, this.handleDialogueLineChanged, this);
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
