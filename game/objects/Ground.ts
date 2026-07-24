import Phaser from 'phaser';

export class Ground extends Phaser.GameObjects.TileSprite {
  private scrollSpeed: number = 300;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    // TileSprite supports scrolling textures seamlessly in Phaser 3
    super(scene, x, y, width, height, 'ground');
    scene.add.existing(this);
  }

  public setScrollSpeed(speed: number): void {
    this.scrollSpeed = speed;
  }

  public update(time: number, delta: number): void {
    // Shift texture offset continuously to simulate forward progression
    this.tilePositionX += (this.scrollSpeed * delta) / 1000;
  }
}
