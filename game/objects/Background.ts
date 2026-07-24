import Phaser from 'phaser';

export class Background extends Phaser.GameObjects.Container {
  private layers: Phaser.GameObjects.TileSprite[] = [];
  private scrollFactors: number[] = [0.1, 0.3, 0.5]; // For parallax effect depth

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);

    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;

    // Pre-scaffold parallax layers (e.g. sky, mountains, trees)
    const layerKeys = ['bg_sky', 'bg_mountains', 'bg_foreground'];
    
    layerKeys.forEach((key, index) => {
      const tileSprite = scene.add.tileSprite(
        width / 2,
        height / 2,
        width,
        height,
        key
      );
      this.layers.push(tileSprite);
      this.add(tileSprite);
    });
  }

  public update(baseSpeed: number, delta: number): void {
    // Scroll each layer based on its parallax depth factor
    this.layers.forEach((layer, index) => {
      const factor = this.scrollFactors[index] || 1;
      layer.tilePositionX += ((baseSpeed * factor) * delta) / 1000;
    });
  }
}
