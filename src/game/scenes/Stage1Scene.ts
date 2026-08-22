import Phaser from 'phaser';
import { preloadMaxSpritesheets, registerMaxAnimations } from '../entities/registerMaxAnimations';
import {
  STAGE1_ARENAS,
  STAGE1_ENCOUNTERS,
  BOSS_ARENA,
  PLAYER_START,
  EXIT_PORTAL
} from '../data/Stage1Data';
import { isWalkable, WALKABLE_ZONES } from '../data/WalkabilityMap';
import { MonsterSprite } from './MonsterSprite';
import { CombatManager } from '../systems/CombatManager';
import { EventBus, EVENTS } from '../EventBus';

type DialogueLine = { speaker: string, text: string };

type Direction = 'up' | 'down' | 'left' | 'right';

export default class Stage1Scene extends Phaser.Scene {
  // Map
  private mapImage!: Phaser.GameObjects.Image;
  private mapW = 0;
  private mapH = 0;
  
  private lordZeroImage: Phaser.GameObjects.Image | null = null;

  // Player
  private player!: Phaser.GameObjects.Sprite;
  private playerDir: Direction = 'right';
  private movementLocked = false;
  private moveSpeed = 200; // px/sec

  // Input
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key };
  
  // Joystick (mobile)
  private joystickThumb?: Phaser.GameObjects.Arc;
  private joystickVec = { x: 0, y: 0 };
  private joystickPointer?: Phaser.Input.Pointer;
  private joystickBasePos = { x: 0, y: 0 };

  // Combat
  private grade: number = 3;
  private combatManager!: CombatManager;
  private monsters: MonsterSprite[] = [];
  private currentMonsterIndex: number = 0; // 0 to 9 for E01-E10, 10 for Boss, 11 for Portal

  // Progression & Combat
  public mapProgress = 0;
  // 0: Start -> A1
  // 1: A1 cleared -> A2
  // 2: A2 cleared -> A3
  // 3: A3 cleared -> A4
  // 4: A4 cleared -> A5
  // 5: A5 cleared -> BOSS
  // 6: BOSS cleared -> END
  
  private inCombat = false;
  private isIntroPlaying = false;
  private portalActive = false;
  
  // Narrative States
  private hasSeenOpening = false;
  private hasSeenFirstMonster = false;
  private hasSeenFirstMonsterCorrect = false;

  private hasSeenBeforeBoss = false;
  private hasSeenBossIntro = false;

  // Debug
  private debugMode = false;
  private debugGraphics?: Phaser.GameObjects.Graphics;
  private debugText?: Phaser.GameObjects.Text;

  // VS Screen
  private combatBg?: Phaser.GameObjects.Rectangle;
  private vsPlayer?: Phaser.GameObjects.Sprite;
  private vsMonster?: Phaser.GameObjects.Sprite;

  // Callbacks (set from outside)
  onEncounterTrigger?: (encounterId: string, onComplete: () => void) => void;
  onBossTrigger?: (onComplete: () => void) => void;
  onPortalEnter?: () => void;

  constructor() {
    super('Stage1Scene');
  }

  init(data: any) {
    this.grade = data.grade || 3;
  }

  preload() {
    this.load.image('map1', 'assets/maps/map1_v2.png');
    preloadMaxSpritesheets(this);
    
    // Normal monsters
    const monsterIds = ['number_slime', 'add_beetle', 'stone_golem'];
    const actions = ['idle', 'attack', 'hit', 'death'];
    
    for (const id of monsterIds) {
      for (const action of actions) {
        this.load.spritesheet(`${id}_${action}`, `assets/monsters/${id}/spritesheets/${id}_${action}.png`, {
          frameWidth: 256,
          frameHeight: 256
        });
      }
    }

    // Number Core Fragment
    this.load.spritesheet('number_core_fragment_01_idle', 'assets/monsters/number_core_fragment_01/sheets/number_core_fragment_01_idle.png', {
      frameWidth: 256,
      frameHeight: 256
    });

    // Lord Zero Silhouette
    this.load.image('lord_zero_silhouette', 'assets/boss/lord_zero/lord_zero_silhouette.png');

    // Preload Thief Rat
    this.load.spritesheet('thief_rat_idle', 'assets/monsters/thief_rat/sheets_640/thief_rat_idle_640.png', { frameWidth: 640, frameHeight: 640 });
    this.load.spritesheet('thief_rat_attack', 'assets/monsters/thief_rat/sheets_640/thief_rat_attack_640.png', { frameWidth: 640, frameHeight: 640 });
    this.load.spritesheet('thief_rat_hit', 'assets/monsters/thief_rat/sheets_640/thief_rat_hit_640.png', { frameWidth: 640, frameHeight: 640 });
    this.load.spritesheet('thief_rat_death', 'assets/monsters/thief_rat/sheets_640/thief_rat_death_640.png', { frameWidth: 640, frameHeight: 640 });

    // Preload King Slime Boss
    this.load.spritesheet('king_slime_idle', 'assets/boss/king_slime/sheets/king_slime_idle.png', { frameWidth: 362, frameHeight: 724 });
    this.load.spritesheet('king_slime_walk', 'assets/boss/king_slime/sheets/king_slime_walk.png', { frameWidth: 271, frameHeight: 724 });
    this.load.spritesheet('king_slime_attack', 'assets/boss/king_slime/sheets/king_slime_attack.png', { frameWidth: 271, frameHeight: 724 });
    this.load.spritesheet('king_slime_hit', 'assets/boss/king_slime/sheets/king_slime_hit.png', { frameWidth: 543, frameHeight: 724 });
    this.load.spritesheet('king_slime_death', 'assets/boss/king_slime/sheets/king_slime_death.png', { frameWidth: 362, frameHeight: 724 });
    this.load.spritesheet('king_slime_dash', 'assets/boss/king_slime/sheets/king_slime_dash.png', { frameWidth: 362, frameHeight: 724 });
  }

  create() {
    // --- Map ---
    this.mapImage = this.add.image(0, 0, 'map1').setOrigin(0, 0);
    this.mapW = this.mapImage.width;
    this.mapH = this.mapImage.height;

    this.physics.world.setBounds(0, 0, this.mapW, this.mapH);

    // --- Player ---
    const startX = PLAYER_START.nx * this.mapW;
    const startY = PLAYER_START.ny * this.mapH;
    this.player = this.add.sprite(startX, startY, 'max-idle-right').setDepth(10).setScale(0.14);
    this.physics.add.existing(this.player);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    // Adjusted hitbox for 256px v2 frame, keeping it at the feet
    body.setSize(100, 100);
    body.setOffset(78, 156); 

    registerMaxAnimations(this);
    this.registerMonsterAnimations();

    this.combatManager = new CombatManager(this.grade);
    this.spawnMonsters();

    // Event Listeners for React UI
    EventBus.on(EVENTS.ANSWER_SELECTED, this.handleAnswerSelected, this);
    EventBus.on(EVENTS.COMBAT_TIMEOUT, this.handleCombatTimeout, this);
    EventBus.on(EVENTS.RESTART_STAGE, this.restartStage, this);
    EventBus.on(EVENTS.DIALOGUE_LINE_CHANGED, this.handleDialogueLineChanged, this);

    // --- Camera ---
    this.cameras.main.setBounds(0, 0, this.mapW, this.mapH);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.0); // Changed to 1.0 to fit more map on screen

    // --- Input ---
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      up:    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down:  this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left:  this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F2).on('down', () => {
      this.debugMode = !this.debugMode;
    });

    this.createJoystick();

    // --- Debug graphics ---
    this.debugGraphics = this.add.graphics().setDepth(999);
    this.debugText = this.add.text(10, 10, '', {
      fontSize: '12px', color: '#00ff00',
      backgroundColor: 'rgba(0,0,0,0.7)', padding: { x: 6, y: 4 }
    }).setScrollFactor(0).setDepth(1000);

    this.createUIControls();
    
    // Play Opening Story
    this.playOpeningStory();

    this.player.play('max-idle-right');
  }

  private playOpeningStory() {
    if (this.hasSeenOpening) return;
    this.hasSeenOpening = true;
    this.movementLocked = true;
    
    EventBus.emit(EVENTS.SHOW_DIALOGUE, [
      { text: "โลก Numeria ดำรงอยู่ได้ด้วยพลังของตัวเลข" },
      { text: "แต่แก่นพลังตัวเลขได้แตกออกเป็นชิ้น ๆ" },
      { speaker: "Neo", text: "Max! ฉันตรวจพบพลังประหลาด\nมันมาจากเศษแก่นพลัง!" },
      { speaker: "Max", text: "งั้นเราไปดูกัน!" }
    ]);

    EventBus.once(EVENTS.DIALOGUE_CLOSED, () => {
      this.movementLocked = false;
    });
  }

  update(_time: number, dtMs: number) {
    this.handleMovement(dtMs / 1000);
    this.checkProgressionTriggers();
    this.updateDebugOverlay();
    
    // Make alive monsters face the player continuously
    if (!this.inCombat) {
      this.monsters.forEach(m => {
        if (!m.isDead) {
          m.facePlayer(this.player.x);
        }
      });
    }
  }

  private createUIControls() {
    const padding = 15;
    const btnHeight = 35;
    
    // Position from top right corner, moving left
    let currentX = this.cameras.main.width - padding;
    const y = padding;

    const createBtn = (label: string, color: number, width: number, onClick: () => void) => {
      currentX -= width;
      
      const bg = this.add.graphics()
        .setScrollFactor(0)
        .setDepth(2000)
        .fillStyle(color, 0.8)
        .fillRoundedRect(currentX, y, width, btnHeight, 6)
        .lineStyle(2, 0xffffff, 1)
        .strokeRoundedRect(currentX, y, width, btnHeight, 6);

      this.add.text(currentX + width/2, y + btnHeight/2, label, {
        fontSize: '14px', color: '#ffffff', fontStyle: 'bold', align: 'center'
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2001);

      const hitArea = new Phaser.Geom.Rectangle(currentX, y, width, btnHeight);
      bg.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
      
      bg.on('pointerover', () => bg.setAlpha(0.7));
      bg.on('pointerout', () => bg.setAlpha(1));
      bg.on('pointerdown', onClick);
      
      currentX -= 10; // spacing between buttons
    };

    // 1. Home
    createBtn('🏠 หน้าแรก', 0x475569, 100, () => {
      window.location.reload();
    });

    // 2. Reset Stage
    createBtn('🔄 เริ่มใหม่', 0xef4444, 90, () => {
      this.restartStage();
    });

    // 3. Vol Up
    createBtn('🔊 +', 0x2563eb, 50, () => {
      this.sound.volume = Math.min(1, this.sound.volume + 0.1);
    });

    // 4. Vol Down
    createBtn('🔉 -', 0x2563eb, 50, () => {
      this.sound.volume = Math.max(0, this.sound.volume - 0.1);
    });

    // 5. Mute
    createBtn('🔇 ปิด/เปิดเสียง', 0x2563eb, 120, () => {
      this.sound.mute = !this.sound.mute;
    });
  }

  private handleMovement(dt: number) {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.movementLocked) {
      body.setVelocity(0, 0);
      return;
    }

    let vx = 0;
    let vy = 0;

    // Keyboard
    if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -1;
    else if (this.cursors.right.isDown || this.wasd.right.isDown) vx = 1;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -1;
    else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = 1;

    // Joystick override
    if (this.joystickVec.x !== 0 || this.joystickVec.y !== 0) {
      vx = this.joystickVec.x;
      vy = this.joystickVec.y;
    }

    if (vx !== 0 && vy !== 0) {
      const len = Math.sqrt(vx * vx + vy * vy);
      vx /= len;
      vy /= len;
    }

    // Predict next physical center and bottom
    const nextBodyCenter = body.center.x + vx * this.moveSpeed * dt;
    const nextBodyBottom = body.bottom + vy * this.moveSpeed * dt;
    
    // Convert to normalized coordinates
    const nnx = nextBodyCenter / this.mapW;
    const nny = nextBodyBottom / this.mapH;
    
    const currentNx = body.center.x / this.mapW;
    const currentNy = body.bottom / this.mapH;
    
    // Collision checking against NavMesh & Dynamic Gates using the FEET (bottom center of hitbox)
    let canMoveX = isWalkable(nnx, currentNy) && !this.isGateBlocked(nnx, currentNy);
    let canMoveY = isWalkable(currentNx, nny) && !this.isGateBlocked(currentNx, nny);

    if (canMoveX) body.setVelocityX(vx * this.moveSpeed);
    else body.setVelocityX(0);

    if (canMoveY) body.setVelocityY(vy * this.moveSpeed);
    else body.setVelocityY(0);

    // Update animations based on actual velocity
    if (vx !== 0 || vy !== 0) {
      if (Math.abs(vx) > Math.abs(vy)) {
        this.playerDir = vx > 0 ? 'right' : 'left';
      } else {
        this.playerDir = vy > 0 ? 'down' : 'up';
      }
      const animKey = `max-walk-${this.playerDir}`;
      if (this.player.anims.currentAnim?.key !== animKey) {
        this.player.play(animKey);
      }
    } else {
      const animKey = `max-idle-${this.playerDir}`;
      if (this.player.anims.currentAnim?.key !== animKey) {
        this.player.play(animKey);
      }
    }

    // Flip sprite if facing left
    if (this.playerDir === 'left') {
      this.player.setFlipX(true);
    } else {
      this.player.setFlipX(false);
    }
  }

  private isGateBlocked(nx: number, ny: number): boolean {
    if (this.currentMonsterIndex < STAGE1_ENCOUNTERS.length) {
      const activeEncounter = STAGE1_ENCOUNTERS[this.currentMonsterIndex];
      const activeArena = activeEncounter.arenaId === 'BOSS_ARENA' 
        ? BOSS_ARENA 
        : STAGE1_ARENAS.find(a => a.id === activeEncounter.arenaId);
      
      if (activeArena) {
        if ('exitGate' in activeArena && this.rectIntersect(nx, ny, (activeArena as any).exitGate)) return true;
        if (this.inCombat && this.rectIntersect(nx, ny, activeArena.entranceGate)) return true;
      }
    }
    return false;
  }

  private rectIntersect(nx: number, ny: number, rect: {nx:number, ny:number, nw:number, nh:number}): boolean {
    return nx >= rect.nx && nx <= rect.nx + rect.nw && ny >= rect.ny && ny <= rect.ny + rect.nh;
  }

  private registerMonsterAnimations() {
    // Normal Monsters (except thief_rat which uses 640 pack)
    const monsters = ['number_slime', 'add_beetle', 'stone_golem'];
    for (const m of monsters) {
      this.anims.create({ key: `${m}-idle`, frames: this.anims.generateFrameNumbers(`${m}_idle`, { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
      this.anims.create({ key: `${m}-attack`, frames: this.anims.generateFrameNumbers(`${m}_attack`, { start: 0, end: 5 }), frameRate: 10, repeat: 0 });
      this.anims.create({ key: `${m}-hit`, frames: this.anims.generateFrameNumbers(`${m}_hit`, { start: 0, end: 4 }), frameRate: 9, repeat: 0 });
      this.anims.create({ key: `${m}-death`, frames: this.anims.generateFrameNumbers(`${m}_death`, { start: 0, end: 5 }), frameRate: 7, repeat: 0 });
    }

    // Number Core Fragment
    this.anims.create({ key: 'number_core_fragment_01-idle', frames: this.anims.generateFrameNumbers('number_core_fragment_01_idle', { start: 0, end: 7 }), frameRate: 8, repeat: -1 });

    // Thief Rat animations
    const trId = 'thief_rat';
    this.anims.create({ key: `${trId}-idle`, frames: this.anims.generateFrameNumbers(`${trId}_idle`, { start: 0, end: 5 }), frameRate: 6, repeat: -1 });
    this.anims.create({ key: `${trId}-attack`, frames: this.anims.generateFrameNumbers(`${trId}_attack`, { start: 0, end: 7 }), frameRate: 12, repeat: 0 });
    this.anims.create({ key: `${trId}-hit`, frames: this.anims.generateFrameNumbers(`${trId}_hit`, { start: 0, end: 3 }), frameRate: 12, repeat: 0 });
    this.anims.create({ key: `${trId}-death`, frames: this.anims.generateFrameNumbers(`${trId}_death`, { start: 0, end: 5 }), frameRate: 8, repeat: 0 });

    // Boss animations
    const bossId = 'king_slime';
    this.anims.create({ key: `${bossId}-idle`, frames: this.anims.generateFrameNumbers(`${bossId}_idle`, { start: 0, end: 5 }), frameRate: 6, repeat: -1 });
    this.anims.create({ key: `${bossId}-attack`, frames: this.anims.generateFrameNumbers(`${bossId}_attack`, { start: 0, end: 7 }), frameRate: 10, repeat: 0 });
    this.anims.create({ key: `${bossId}-hit`, frames: this.anims.generateFrameNumbers(`${bossId}_hit`, { start: 0, end: 3 }), frameRate: 12, repeat: 0 });
    this.anims.create({ key: `${bossId}-death`, frames: this.anims.generateFrameNumbers(`${bossId}_death`, { start: 0, end: 5 }), frameRate: 8, repeat: 0 });
  }

  private spawnMonsters() {
    // Clear old monsters
    this.monsters.forEach(m => m.destroy());
    this.monsters = [];

    for (const enc of STAGE1_ENCOUNTERS) {
      const m = new MonsterSprite(this, enc.nx * this.mapW, enc.ny * this.mapH, enc);
      this.monsters.push(m);
    }
  }

  private checkProgressionTriggers() {
    if (this.movementLocked || this.inCombat || this.isIntroPlaying) return;

    if (this.currentMonsterIndex < STAGE1_ENCOUNTERS.length) {
      const activeMonster = this.monsters[this.currentMonsterIndex];
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, activeMonster.x, activeMonster.y);
      
      const triggerRad = this.currentMonsterIndex === STAGE1_ENCOUNTERS.length - 1 ? BOSS_ARENA.triggerRadius : 80;
      
      if (this.currentMonsterIndex === STAGE1_ENCOUNTERS.length - 1 && !this.hasSeenBeforeBoss && dist < triggerRad + 250) {
        this.hasSeenBeforeBoss = true;
        this.movementLocked = true;
        (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
        this.player.play(`max-idle-${this.playerDir}`);
        
        EventBus.emit(EVENTS.SHOW_DIALOGUE, [
          { speaker: "Neo", text: "พลังของเศษแก่นอยู่ข้างหน้า" },
          { speaker: "Max", text: "งั้นก็เอามันกลับคืนมา!" }
        ]);
        
        EventBus.once(EVENTS.DIALOGUE_CLOSED, () => {
          this.movementLocked = false;
        });
      }

      if (dist < triggerRad) {
        if (this.currentMonsterIndex === STAGE1_ENCOUNTERS.length - 1) {
          this.playBossIntro(activeMonster);
        } else {
          this.startEncounterCombat(activeMonster);
        }
      }
    } else if (this.currentMonsterIndex === STAGE1_ENCOUNTERS.length && this.portalActive) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, EXIT_PORTAL.nx * this.mapW, EXIT_PORTAL.ny * this.mapH);
      if (dist < EXIT_PORTAL.radius) {
        this.movementLocked = true;
        this.player.play(`max-idle-${this.playerDir}`);
        if (this.onPortalEnter) this.onPortalEnter();
      }
    }
  }

  private playBossIntro(boss: MonsterSprite) {
    this.isIntroPlaying = true;
    this.movementLocked = true;
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    this.player.play(`max-idle-${this.playerDir}`);
    boss.facePlayer(this.player.x);

    // Pan camera to boss
    this.cameras.main.pan(boss.x, boss.y, 1000, 'Power2');

    // Show Title
    const titleText = this.add.text(boss.x, boss.y - 150, 'KING SLIME\nผู้กลืนกินพลังตัวเลข', {
      fontSize: '50px',
      color: '#ff0000',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#ffffff',
      strokeThickness: 6
    }).setOrigin(0.5).setDepth(2000).setAlpha(0);

    this.tweens.add({
      targets: titleText,
      alpha: 1,
      y: boss.y - 200,
      duration: 1000,
      ease: 'Power2',
      hold: 2000,
      yoyo: true,
      onComplete: () => {
        titleText.destroy();
        this.cameras.main.pan(this.player.x, this.player.y, 500, 'Power2', true, (_camera, progress) => {
          if (progress === 1) {
            this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
            this.isIntroPlaying = false;
            this.startEncounterCombat(boss);
          }
        });
      }
    });
  }

  private startEncounterCombat(monster: MonsterSprite) {
    if (this.currentMonsterIndex === 0 && !this.hasSeenFirstMonster) {
      this.hasSeenFirstMonster = true;
      this.movementLocked = true;
      EventBus.emit(EVENTS.SHOW_DIALOGUE, [
        { speaker: "Neo", text: "ตอบให้ถูก\nแล้วพลังของคำตอบจะกลายเป็นการโจมตี!" }
      ]);
      EventBus.once(EVENTS.DIALOGUE_CLOSED, () => {
        this.doStartEncounterCombat(monster);
      });
    } else {
      this.doStartEncounterCombat(monster);
    }
  }

  private doStartEncounterCombat(monster: MonsterSprite) {
    this.inCombat = true;
    this.movementLocked = true;
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);

    // Face player toward monster on map
    const dx = monster.x - this.player.x;
    const dy = monster.y - this.player.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      this.playerDir = dx > 0 ? 'right' : 'left';
    } else {
      this.playerDir = dy > 0 ? 'down' : 'up';
    }
    this.player.play(`max-idle-${this.playerDir}`);
    
    monster.facePlayer(this.player.x);

    // Create VS Screen in Phaser
    const cw = this.cameras.main.width;
    const ch = this.cameras.main.height;
    
    // Dark overlay
    this.combatBg = this.add.rectangle(cw/2, ch/2, cw * 2, ch * 2, 0x000000, 0.7)
      .setScrollFactor(0)
      .setDepth(2000);
      
    // VS Player (Left)
    this.vsPlayer = this.add.sprite(cw * 0.25, ch * 0.55, 'max-idle-right')
      .setScrollFactor(0)
      .setDepth(2001)
      .setScale(0.8);
    this.vsPlayer.play('max-idle-right');

    const vsMonsterScale = monster.config.monsterId === 'king_slime' ? 1 : 0.8;
    this.vsMonster = this.add.sprite(cw * 0.75, ch * 0.55, `${monster.config.monsterId}_idle`)
      .setScrollFactor(0)
      .setDepth(2001)
      .setScale(vsMonsterScale)
      .setFlipX(monster.config.monsterId !== 'king_slime'); 
    this.vsMonster.play(`${monster.config.monsterId}-idle`);

    if (monster.config.monsterId === 'king_slime' && !this.hasSeenBossIntro) {
      this.hasSeenBossIntro = true;
      EventBus.emit(EVENTS.SHOW_DIALOGUE, [
        { speaker: "Neo", text: "ระวัง!\nเจ้าตัวนี้ไม่เหมือนพวกก่อนหน้า" },
        { speaker: "Neo", text: "เรามีเวลาจำกัดในการหาคำตอบ!" }
      ]);
      EventBus.once(EVENTS.DIALOGUE_CLOSED, () => {
        this.triggerBossCombat(monster, cw, ch);
      });
    } else if (monster.config.monsterId === 'king_slime') {
      this.triggerBossCombat(monster, cw, ch);
    } else {
      EventBus.emit(EVENTS.SHOW_COMBAT_UI);
      this.combatManager.startEncounter(monster.config);
    }
  }

  private triggerBossCombat(monster: MonsterSprite, cw: number, ch: number) {
    EventBus.emit(EVENTS.SHOW_COMBAT_UI);
    const warning = this.add.text(cw/2, ch/2, 'WARNING!!!', {
      fontSize: '80px',
      color: '#ff0000',
      fontStyle: 'bold',
      stroke: '#ffffff',
      strokeThickness: 8
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2010).setAlpha(0);

    this.tweens.add({
      targets: warning,
      alpha: 1,
      scale: 1.2,
      duration: 300,
      ease: 'Back.easeOut',
      yoyo: true,
      hold: 800,
      onComplete: () => {
        warning.destroy();
        this.updateBossPhaseVisuals(monster.config.monsterId, monster.currentHp);
      }
    });

    this.combatManager.startEncounter(monster.config);
  }

  private updateBossPhaseVisuals(monsterId: string, hp: number) {
    if (monsterId !== 'king_slime' || !this.vsMonster) return;
    
    // Reset tints
    this.vsMonster.clearTint();

    if (hp === 2) {
      this.vsMonster.setTint(0xff9999); // Angry glow
    } else if (hp === 1) {
      this.vsMonster.setTint(0xff3333); // Desperate glow
    }
  }

  private handleCombatTimeout() {
    if (!this.inCombat || this.currentMonsterIndex >= STAGE1_ENCOUNTERS.length) return;
    
    const activeMonster = this.monsters[this.currentMonsterIndex];
    const vsP = this.vsPlayer!;
    const vsM = this.vsMonster!;

    this.showFloatingText(this.cameras.main.width/2, this.cameras.main.height/2 - 100, "TIME'S UP", '#ff0000', 80);

    activeMonster.playAttack();
    vsM.play(`${activeMonster.config.monsterId}-attack`);
    
    vsM.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      vsM.play(`${activeMonster.config.monsterId}-idle`);
      
      this.player.play(`max-hit-${this.playerDir}`);
      vsP.play('max-hit-right');
      this.showFloatingText(vsP.x, vsP.y - 150, '-1', '#ff0000');
      this.cameras.main.shake(300, 0.02);
      
      vsP.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.player.play(`max-idle-${this.playerDir}`);
        vsP.play('max-idle-right');
        
        this.time.delayedCall(1500, () => {
          this.combatManager.nextTurn();
        });
      });
    });
  }

  private handleAnswerSelected(answer: number | string) {
    if (!this.inCombat || this.currentMonsterIndex >= STAGE1_ENCOUNTERS.length) return;
    
    const activeMonster = this.monsters[this.currentMonsterIndex];
    const result = this.combatManager.handleAnswer(answer);
    
    const vsP = this.vsPlayer!;
    const vsM = this.vsMonster!;

    if (result === 'correct') {
      if (this.currentMonsterIndex === 0 && this.hasSeenFirstMonster && !this.hasSeenFirstMonsterCorrect) {
        this.hasSeenFirstMonsterCorrect = true;
        EventBus.emit(EVENTS.SHOW_DIALOGUE, [
          { speaker: "Neo", text: "เยี่ยม!\nคำตอบที่ถูกต้องคือพลังของเรา!" }
        ]);
      }

      this.player.play(`max-attack-${this.playerDir}`);
      vsP.play('max-attack-right');
      
      this.showFloatingText(vsP.x, vsP.y - 150, 'ATTACK!', '#3b82f6');
      
      vsP.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.player.play(`max-idle-${this.playerDir}`);
        vsP.play('max-idle-right');
        
        // Play hit on monster
        const killed = activeMonster.takeDamage(1);
        this.showFloatingText(vsM.x, vsM.y - 150, '-1', '#ff0000');
        vsM.play(`${activeMonster.config.monsterId}-hit`);
        
        vsM.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          if (killed) {
            vsM.play(`${activeMonster.config.monsterId}-death`);
            this.showFloatingText(this.cameras.main.width/2, this.cameras.main.height/2 - 100, 'Victory !!!', '#ffd700', 80);
            
            // Drop number core fragment if it's the boss
            if (activeMonster.config.monsterId === 'king_slime') {
              this.time.delayedCall(1000, () => {
                this.endVSCombat();
                this.combatManager.endEncounter();
                this.inCombat = false;
                this.movementLocked = true; // Lock player movement during loot drop
                activeMonster.destroy(); // Remove boss from map
                this.spawnBossLoot(activeMonster.x, activeMonster.y);
              });
            } else {
              this.time.delayedCall(1500, () => {
                this.endVSCombat();
                this.combatManager.endEncounter();
                this.inCombat = false;
                this.movementLocked = false;
                this.currentMonsterIndex++;
                if (this.currentMonsterIndex === STAGE1_ENCOUNTERS.length) {
                   this.portalActive = true;
                }
              });
            }
          } else {
            vsM.play(`${activeMonster.config.monsterId}-idle`);
            this.updateBossPhaseVisuals(activeMonster.config.monsterId, activeMonster.currentHp);
            this.time.delayedCall(500, () => {
              this.combatManager.nextTurn();
            });
          }
        });
      });
    } else {
      activeMonster.playAttack();
      vsM.play(`${activeMonster.config.monsterId}-attack`);
      this.showFloatingText(vsM.x, vsM.y - 150, 'ATTACK!', '#f87171');
      
      vsM.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        vsM.play(`${activeMonster.config.monsterId}-idle`);
        
        this.player.play(`max-hit-${this.playerDir}`);
        vsP.play('max-hit-right');
        this.showFloatingText(vsP.x, vsP.y - 150, '-1', '#ff0000');
        this.cameras.main.shake(200, 0.01);
        
        vsP.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.player.play(`max-idle-${this.playerDir}`);
          vsP.play('max-idle-right');
          
          this.time.delayedCall(1500, () => {
            this.combatManager.nextTurn();
          });
        });
      });
    }
  }
  
  private spawnBossLoot(x: number, y: number) {
    const loot = this.add.sprite(x, y, 'number_core_fragment_01_idle').setScale(0.5);
    loot.play('number_core_fragment_01-idle');
    this.tweens.add({
      targets: loot,
      y: y - 20,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.time.delayedCall(1000, () => {
      EventBus.emit(EVENTS.SHOW_DIALOGUE, [
        { speaker: "Neo", text: "นี่คือเศษแก่นพลังตัวเลขจริง ๆ" },
        { speaker: "Max", text: "ถ้ามันแตกออกเป็นหลายชิ้น..." },
        { speaker: "Neo", text: "เราต้องหาเศษที่เหลือ\nก่อน Numeria จะเสียสมดุลไปมากกว่านี้" },
        { speaker: "???", text: "หนึ่งชิ้น...\nไม่ได้เปลี่ยนอะไรหรอก" },
        { speaker: "Max", text: "นั่นใคร?" },
        { speaker: "Neo", text: "ฉันไม่รู้...\nแต่ดูเหมือนว่าเขากำลังจับตาดูเราอยู่" }
      ]);

      EventBus.once(EVENTS.DIALOGUE_CLOSED, () => {
        // Absorb the loot
        this.tweens.add({
          targets: loot,
          y: y - 50,
          alpha: 0,
          duration: 500,
          onComplete: () => {
            loot.destroy();
            this.movementLocked = false;
            this.currentMonsterIndex++;
            EventBus.emit(EVENTS.SHOW_STAGE_CLEAR);
          }
        });
      });
    });
  }

  private handleDialogueLineChanged(line: DialogueLine) {
    if (line.speaker === "???") {
      if (!this.lordZeroImage) {
        this.lordZeroImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'lord_zero_silhouette')
          .setScrollFactor(0)
          .setDepth(3000)
          .setAlpha(0)
          .setScale(1.2);
        
        this.tweens.add({ targets: this.lordZeroImage, alpha: 0.6, duration: 500 });
        this.cameras.main.shake(1000, 0.005);
      }
    } else {
      if (this.lordZeroImage) {
        this.tweens.add({ targets: this.lordZeroImage, alpha: 0, duration: 500, onComplete: () => {
          this.lordZeroImage?.destroy();
          this.lordZeroImage = null;
        }});
      }
    }
  }

  private endVSCombat() {
    if (this.combatBg) this.combatBg.destroy();
    if (this.vsPlayer) this.vsPlayer.destroy();
    if (this.vsMonster) this.vsMonster.destroy();
  }

  private showFloatingText(x: number, y: number, text: string, color: string, size: number = 40) {
    const t = this.add.text(x, y, text, {
      fontSize: `${size}px`,
      color: color,
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5).setScrollFactor(0).setDepth(2010);

    this.tweens.add({
      targets: t,
      y: y - 100,
      alpha: 0,
      duration: 1200,
      ease: 'Power2',
      onComplete: () => t.destroy()
    });
  }

  private updateDebugOverlay() {
    this.debugGraphics?.clear();
    
    if (!this.debugMode) {
      if (this.debugText) this.debugText.text = '';
      return;
    }

    // Draw Walkable NavMesh
    this.debugGraphics!.fillStyle(0x00ff00, 0.3);
    for (const z of WALKABLE_ZONES) {
      this.debugGraphics!.fillRect(z.x * this.mapW, z.y * this.mapH, z.w * this.mapW, z.h * this.mapH);
    }

    // Draw Triggers & Gates
    if (this.currentMonsterIndex < STAGE1_ENCOUNTERS.length) {
      const activeEncounter = STAGE1_ENCOUNTERS[this.currentMonsterIndex];
      const activeArena = activeEncounter.arenaId === 'BOSS_ARENA'
        ? BOSS_ARENA
        : STAGE1_ARENAS.find(a => a.id === activeEncounter.arenaId)!;
      
      const triggerRad = this.currentMonsterIndex === STAGE1_ENCOUNTERS.length - 1 ? BOSS_ARENA.triggerRadius : 80;
      this.debugGraphics!.lineStyle(2, 0xffff00, 1);
      this.debugGraphics!.strokeCircle(activeEncounter.nx * this.mapW, activeEncounter.ny * this.mapH, triggerRad);
      
      this.debugGraphics!.fillStyle(0xff0000, 0.5); 
      if (this.inCombat) {
        this.debugGraphics!.fillRect(activeArena.entranceGate.nx * this.mapW, activeArena.entranceGate.ny * this.mapH, activeArena.entranceGate.nw * this.mapW, activeArena.entranceGate.nh * this.mapH);
      }
      
      if ('exitGate' in activeArena) {
        const exitGate = (activeArena as any).exitGate;
        this.debugGraphics!.fillStyle(0xff00ff, 0.5); 
        this.debugGraphics!.fillRect(exitGate.nx * this.mapW, exitGate.ny * this.mapH, exitGate.nw * this.mapW, exitGate.nh * this.mapH);
      }
    }

    if (this.portalActive) {
      this.debugGraphics!.fillStyle(0x00ffff, 0.5);
      this.debugGraphics!.fillCircle(EXIT_PORTAL.nx * this.mapW, EXIT_PORTAL.ny * this.mapH, EXIT_PORTAL.radius);
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const feetNx = (body.center.x / this.mapW).toFixed(3);
    const feetNy = (body.bottom / this.mapH).toFixed(3);
    const walkable = isWalkable(body.center.x / this.mapW, body.bottom / this.mapH);

    this.debugText!.text = 
      `DEBUG MODE (F2 to toggle)\n` +
      `Player Sprite: ${Math.round(this.player.x)}, ${Math.round(this.player.y)}\n` +
      `Feet Norm: ${feetNx}, ${feetNy} | Walkable: ${walkable}\n` +
      `Progress: ${this.currentMonsterIndex}/${STAGE1_ENCOUNTERS.length}\n` +
      `InCombat: ${this.inCombat}\n` +
      `Target: ${this.currentMonsterIndex < STAGE1_ENCOUNTERS.length ? STAGE1_ENCOUNTERS[this.currentMonsterIndex].id : 'PORTAL'}`;
  }

  private createJoystick() {
    const baseRadius = 60;
    const thumbRadius = 30;

    // Fixed default position (bottom left)
    const defaultX = 120;
    const defaultY = this.cameras.main.height - 120;

    const joystickBase = this.add.arc(defaultX, defaultY, baseRadius, 0, 360, false, 0x000000, 0.4)
      .setScrollFactor(0).setDepth(2000).setStrokeStyle(4, 0xffffff, 0.5);
    
    this.joystickThumb = this.add.arc(defaultX, defaultY, thumbRadius, 0, 360, false, 0xffffff, 0.8)
      .setScrollFactor(0).setDepth(2001);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer) return;
      if (pointer.x > this.cameras.main.width / 2) return; // Only left side
      
      this.joystickPointer = pointer;
      
      // Dynamic recenter on touch
      this.joystickBasePos.x = pointer.x;
      this.joystickBasePos.y = pointer.y;
      
      joystickBase.setPosition(pointer.x, pointer.y);
      this.joystickThumb!.setPosition(pointer.x, pointer.y);
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer !== pointer) return;
      
      const dx = pointer.x - this.joystickBasePos.x;
      const dy = pointer.y - this.joystickBasePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0) {
        this.joystickVec.x = dx / dist;
        this.joystickVec.y = dy / dist;
      }

      const clampedDist = Math.min(dist, baseRadius);
      this.joystickThumb!.setPosition(
        this.joystickBasePos.x + this.joystickVec.x * clampedDist,
        this.joystickBasePos.y + this.joystickVec.y * clampedDist
      );
    });

    const resetJoystick = (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer === pointer) {
        this.joystickPointer = undefined;
        this.joystickVec.x = 0;
        this.joystickVec.y = 0;
        
        // Reset to default position
        joystickBase.setPosition(defaultX, defaultY);
        this.joystickThumb!.setPosition(defaultX, defaultY);
      }
    };

    this.input.on('pointerup', resetJoystick);
    this.input.on('pointerout', resetJoystick);
  }

  public restartStage() {
    this.currentMonsterIndex = 0;
    this.inCombat = false;
    this.portalActive = false;
    this.movementLocked = false;
    this.endVSCombat();
    this.player.setPosition(PLAYER_START.nx * this.mapW, PLAYER_START.ny * this.mapH);
    this.player.play('max-idle-right');
    
    // Reset monsters and combat manager
    this.combatManager.endEncounter();
    this.combatManager.resetPlayer();
    this.spawnMonsters();
  }

  destroy() {
    EventBus.off(EVENTS.ANSWER_SELECTED, this.handleAnswerSelected, this);
    EventBus.off(EVENTS.COMBAT_TIMEOUT, this.handleCombatTimeout, this);
    EventBus.off(EVENTS.RESTART_STAGE, this.restartStage, this);
    EventBus.off(EVENTS.DIALOGUE_LINE_CHANGED, this.handleDialogueLineChanged, this);
  }
}
