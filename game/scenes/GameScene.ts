import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Setup Game Background (Layer 0)
    // 2. Setup Ground Platform (Layer 1)
    // 3. Setup Player Entity (Layer 2)
    // 4. Setup Obstacles & Coins Pools (Layer 3)
    // 5. Setup Collision handlers
    // 6. Setup UI Overlay / Score Board (Layer 4)

    const placeholderText = this.add.text(width / 2, height / 2, 'Game Scene - Endless Running Underway', {
      font: '24px Arial',
      color: '#ffffff'
    });
    placeholderText.setOrigin(0.5);

    // Mock key bind for Game Over transition testing
    this.input.keyboard?.once('keydown-G', () => {
      this.scene.start('GameOverScene', { score: 100 });
    });
  }

  update(time: number, delta: number): void {
    // Scroll background & ground layers
    // Update player state machines
    // Update and recycle obstacles/coins
    // Increment distance/score
  }
}
