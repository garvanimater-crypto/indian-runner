import Phaser from 'phaser';

interface GameOverData {
  score?: number;
}

export class GameOverScene extends Phaser.Scene {
  private finalScore: number = 0;

  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data: GameOverData): void {
    this.finalScore = data.score || 0;
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 1. Render Game Over Title
    const gameOverText = this.add.text(width / 2, height / 3, 'GAME OVER', {
      font: '64px Arial',
      color: '#ff0000',
      stroke: '#000000',
      strokeThickness: 8
    });
    gameOverText.setOrigin(0.5);

    // 2. Render Score
    const scoreText = this.add.text(width / 2, height / 2, `Score: ${this.finalScore}`, {
      font: '32px Arial',
      color: '#ffffff'
    });
    scoreText.setOrigin(0.5);

    // 3. Restart Button
    const restartButton = this.add.text(width / 2 - 100, height / 2 + 100, 'RETRY', {
      font: '24px Arial',
      color: '#00ff00',
      backgroundColor: '#222222',
      padding: { x: 15, y: 10 }
    });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive({ useHandCursor: true });

    restartButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // 4. Back to Menu Button
    const menuButton = this.add.text(width / 2 + 100, height / 2 + 100, 'MENU', {
      font: '24px Arial',
      color: '#ffffff',
      backgroundColor: '#222222',
      padding: { x: 15, y: 10 }
    });
    menuButton.setOrigin(0.5);
    menuButton.setInteractive({ useHandCursor: true });

    menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
