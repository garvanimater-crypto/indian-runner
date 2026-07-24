import Phaser from 'phaser';

export class InputManager {
  private scene: Phaser.Scene;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumpKey?: Phaser.Input.Keyboard.Key;

  private onJumpCallback?: () => void;
  private onSlideCallback?: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.setupInputs();
  }

  private setupInputs(): void {
    // 1. Setup keyboard keys if keyboard support is enabled
    if (this.scene.input.keyboard) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.jumpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // Listen for Space/Up arrow for jump
      this.jumpKey.on('down', () => this.triggerJump());
      this.cursors.up.on('down', () => this.triggerJump());

      // Listen for Down arrow for slide
      this.cursors.down.on('down', () => this.triggerSlide());
    }

    // 2. Setup mobile touch/mouse click events
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Tap/click left side of screen to slide, right to jump, or simple logic:
      if (pointer.x > this.scene.cameras.main.width / 2) {
        this.triggerJump();
      } else {
        this.triggerSlide();
      }
    });
  }

  public registerJumpAction(callback: () => void): void {
    this.onJumpCallback = callback;
  }

  public registerSlideAction(callback: () => void): void {
    this.onSlideCallback = callback;
  }

  private triggerJump(): void {
    if (this.onJumpCallback) {
      this.onJumpCallback();
    }
  }

  private triggerSlide(): void {
    if (this.onSlideCallback) {
      this.onSlideCallback();
    }
  }

  public cleanup(): void {
    // Detach inputs during scene transitions
    if (this.jumpKey) {
      this.jumpKey.off('down');
    }
    if (this.cursors) {
      this.cursors.up.off('down');
      this.cursors.down.off('down');
    }
    this.scene.input.off('pointerdown');
  }
}
