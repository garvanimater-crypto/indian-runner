import Phaser from 'phaser';

export class Obstacle extends Phaser.GameObjects.Sprite {
  private speed: number = 300;

  constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string = 'obstacle') {
    super(scene, x, y, textureKey);
    scene.add.existing(this);
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public update(time: number, delta: number): void {
    // 1. Scroll left to simulate moving towards player
    this.x -= (this.speed * delta) / 1000;

    // 2. Add boundary check to automatically disable/recycle obstacle
    if (this.x < -100) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  public spawn(x: number, y: number): void {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
  }
}
