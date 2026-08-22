THIEF_RAT — READY-TO-USE GAME ASSET PACK
===========================================

Animations
- Idle   : 6 frames | 6 FPS  | Loop
- Walk   : 8 frames | 10 FPS | Loop
- Attack : 8 frames | 12 FPS | One-shot
- Hit    : 4 frames | 12 FPS | One-shot
- Death  : 6 frames | 8 FPS  | One-shot
- Dash   : 6 frames | 14 FPS | One-shot

Folders
1. source_sheets/
   ไฟล์ต้นฉบับความละเอียดเต็มจากการสร้างภาพ

2. frames_hd/
   แยกเป็น PNG โปร่งใสรายเฟรมแบบ crop ตามตัวละคร/เอฟเฟกต์
   เก็บรายละเอียดต้นฉบับมากที่สุด

3. frames_640/
   เวอร์ชันพร้อมใช้ในเกม ทุกเฟรมเป็น 640x640 เท่ากัน
   จัดตำแหน่งตัวละครให้อยู่ฐานเดียวกันและ normalize ขนาดให้ใกล้เคียงกัน

4. frames_640_alpha_safe/
   เหมือน frames_640 แต่ล้าง alpha ที่จางมากและเพิ่มความทึบของขอบ
   ใช้กรณีเอนจิน/Shader ทำให้ตัวละครดูใสเกินไป

5. sheets_640/
   Sprite Sheet ที่แบ่งช่องแน่นอน 640x640
   เหมาะกับ Unity / Godot / Phaser / Construct / GameMaker

6. metadata/
   JSON + คู่มือตั้งค่า Unity, Godot, Phaser

7. previews/
   GIF สำหรับดู animation และ contact sheet

Recommended pivot
- X = 0.50
- Y ≈ 0.92 (Bottom Center ใกล้เท้า)

หมายเหตุ
- ภาพต้นทางเป็น artwork HD ไม่ใช่ pixel art
- เวอร์ชัน 640 ถูก normalize เพื่อแก้ปัญหาขนาดตัวละครกระโดดระหว่าง Idle/Walk/Attack
- หากในเกมตัวละครดูโปร่งเกินไป ให้ใช้ frames_640_alpha_safe
