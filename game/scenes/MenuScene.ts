import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Render Title Text
    const titleText = this.add.text(width / 2, height / 3, 'ENDLESS RUNNER', {
      font: '48px Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6
    });
    titleText.setOrigin(0.5);

    // 2. Render Play Button / Start text
    const playButton = this.add.text(width / 2, height / 2 + 50, 'START GAME', {
      font: '32px Arial',
      color: '#00ff00',
      backgroundColor: '#222222',
      padding: { x: 20, y: 10 }
    });
    playButton.setOrigin(0.5);
    playButton.setInteractive({ useHandCursor: true });

    // 3. Simple Button Interactions
    playButton.on('pointerover', () => {
      playButton.setStyle({ color: '#ffffff', backgroundColor: '#333333' });
    });

    playButton.on('pointerout', () => {
      playButton.setStyle({ color: '#00ff00', backgroundColor: '#222222' });
    });

    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // 4. Instructions / High Score UI layout
    const instructionsText = this.add.text(width / 2, height - 80, 'Press SPACE to Jump / Use ARROWS to Move', {
      font: '16px Arial',
      color: '#aaaaaa'
    });
    instructionsText.setOrigin(0.5);
  }
}
