import Phaser from 'phaser';

export class Coin extends Phaser.GameObjects.Sprite {
  private speed: number = 300;
  private value: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'coin');
    scene.add.existing(this);
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public getValue(): number {
    return this.value;
  }

  public update(time: number, delta: number): void {
    // 1. Move left with standard scene speed
    this.x -= (this.speed * delta) / 1000;

    // 2. Automatically disable/recycle once offscreen
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

  public collect(): number {
    this.setActive(false);
    this.setVisible(false);
    // Return coin points/score worth
    return this.value;
  }
}
