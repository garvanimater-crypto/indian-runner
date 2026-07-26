import Phaser from 'phaser';

/**
 * BootScene
 * 
 * This is the entry point scene for the Phaser game.
 * It displays a black background with the game title "MODI RUNNER" and a "Loading..." subtitle.
 * The scene automatically handles centering and scaling for desktop, mobile, and tablet.
 * Since there is no gameplay yet, it stays on this screen and doesn't transition.
 */
export class BootScene extends Phaser.Scene {
  private titleText!: Phaser.GameObjects.Text;
  private loadingText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'BootScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Black Background
    // Drawing a background rectangle ensures it remains solid black and covers the viewport.
    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

    // 2. Centered White Text: MODI RUNNER
    this.titleText = this.add.text(width / 2, height / 2 - 20, 'MODI RUNNER', {
      font: 'bold 48px monospace',
      color: '#ffffff',
      align: 'center'
    });
    this.titleText.setOrigin(0.5, 0.5);

    // 3. Small text below: Loading...
    this.loadingText = this.add.text(width / 2, height / 2 + 30, 'Loading...', {
      font: '18px monospace',
      color: '#aaaaaa',
      align: 'center'
    });
    this.loadingText.setOrigin(0.5, 0.5);

    // 4. Resize Listener
    // Register the resize event listener to keep text perfectly centered on any device
    this.scale.on('resize', this.handleResize, this);
  }

  /**
   * Automatically handles layout updates when the game canvas or window resizes.
   * This is critical for supporting desktop, mobile, and tablet form factors seamlessly.
   */
  private handleResize(gameSize: Phaser.Structs.Size): void {
    const width = gameSize.width;
    const height = gameSize.height;

    // Reposition the cameras viewport
    this.cameras.main.setSize(width, height);

    // Re-center our text objects
    if (this.titleText) {
      this.titleText.setPosition(width / 2, height / 2 - 20);
    }
    if (this.loadingText) {
      this.loadingText.setPosition(width / 2, height / 2 + 30);
    }
  }

  /**
   * Clean up event listeners when the scene is shut down or destroyed.
   */
  destroy(): void {
    this.scale.off('resize', this.handleResize, this);
  }
}
