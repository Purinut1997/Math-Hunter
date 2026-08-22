MAX — READY-TO-USE GAME ASSET PACK
=================================

Animations
- Idle   : 8 frames | 6 FPS  | Loop
- Walk   : 8 frames | 10 FPS | Loop
- Attack : 8 frames | 12 FPS | One-shot
- Hit    : 6 frames | 12 FPS | One-shot
- Death  : 8 frames | 8 FPS  | One-shot
- Dash   : 8 frames | 14 FPS | One-shot

Folders
1. source_sheets/
   Original generated transparent sprite strips.

2. frames_hd/
   Individual transparent PNG frames, tightly cropped.

3. frames_640/
   Ready-to-use game frames. Every frame is normalized to 640x640.

4. frames_640_alpha_safe/
   Same as frames_640, but very faint alpha has been cleaned up to reduce
   the “character looks too transparent” issue in some engines/shaders.

5. sheets_640/
   Equal-grid sprite sheets (640x640 per frame) for easy import.

6. metadata/
   JSON metadata + import guides for Unity, Godot, Phaser.

7. previews/
   GIF previews and a contact sheet.

Recommended Pivot
- X = 0.50
- Y ≈ 0.925 (bottom center near feet)

Notes
- Visual style: glossy chibi fantasy swordsman with blue scarf/cape and glowing sword.
- frames_640 are normalized so size and baseline are more consistent between actions.
- If the character looks washed out / semi-transparent in-game, prefer frames_640_alpha_safe.
