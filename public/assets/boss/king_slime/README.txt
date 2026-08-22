# King Slime Ready Pack

ชุดไฟล์ PNG โปร่งใสสำหรับใช้งานในเกม ประกอบด้วย:
- idle (6 เฟรม)
- walk (8 เฟรม)
- attack (8 เฟรม)
- hit (4 เฟรม)
- dash (6 เฟรม)
- death (6 เฟรม)
- vfx (10 เฟรม)

## โครงสร้างไฟล์
- `sheets/` = sprite strip ของแต่ละอนิเมชัน
- `frames/` = แยกเป็นเฟรม PNG รายภาพ
- `sprite_manifest.json` = ข้อมูลจำนวนเฟรม ขนาดไฟล์ fps และ loop
- `extras/` = atlas เดิม + ภาพอ้างอิงในเกม

## ข้อมูลแนะนำการใช้งาน
- ไฟล์ทุกชุดเป็น PNG RGBA โปร่งใส
- ขนาด sprite strip มาตรฐาน: 2172 x 724 px
- การแยกเฟรมใช้การแบ่งเท่า ๆ กันตามจำนวนเฟรมของแต่ละแอนิเมชัน
- เหมาะสำหรับนำเข้า Unity, Godot, GameMaker, Construct หรือเอนจินอื่น ๆ

## ค่าตั้งต้นแนะนำ
- idle: 6 fps, loop
- walk: 8 fps, loop
- attack: 10 fps, no loop
- hit: 12 fps, no loop
- dash: 12 fps, no loop
- death: 8 fps, no loop
- vfx: 12 fps, no loop

## หมายเหตุ
- หากต้องการความเป๊ะระดับ production สำหรับเกมจริง อาจต้อง trim / repack / ตั้ง pivot เพิ่มในเอนจิน
- ชุดนี้เตรียมโครงสร้างไฟล์ให้พร้อมใช้งานและแกะเฟรมให้แล้ว
