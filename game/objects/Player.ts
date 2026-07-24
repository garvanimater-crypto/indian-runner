import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  private jumpForce: number = 400;
  private isGrounded: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    
    // Core Phaser 3 Setup
    scene.add.existing(this);
    // Optional: scene.physics.add.existing(this); to enable arcade physics
  }

  public jump(): void {
    if (this.isGrounded) {
      // Trigger jump velocity or animation
      this.isGrounded = false;
    }
  }

  public slide(): void {
    // Implement slide animation / hit-box shrinking
  }

  public setGrounded(grounded: boolean): void {
    this.isGrounded = grounded;
  }

  public checkGrounded(): boolean {
    return this.isGrounded;
  }

  public update(): void {
    // Implement frame-by-frame updates such as animation states or fall checks
  }
}
