import Phaser from 'phaser';

export class AssetManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Loads all images from the organized subfolders
   */
  public loadImages(): void {
    const imagesRoot = '/assets/images';

    // Player Assets
    this.scene.load.image('player', `${imagesRoot}/player/player.png`);

    // Background Assets
    this.scene.load.image('bg_sky', `${imagesRoot}/background/sky.png`);
    this.scene.load.image('bg_mountains', `${imagesRoot}/background/mountains.png`);
    this.scene.load.image('bg_foreground', `${imagesRoot}/background/foreground.png`);

    // Obstacle Assets
    this.scene.load.image('obstacle', `${imagesRoot}/obstacles/obstacle.png`);

    // Coins Assets
    this.scene.load.image('coin', `${imagesRoot}/coins/coin.png`);

    // UI Assets
    this.scene.load.image('button_play', `${imagesRoot}/ui/play.png`);
  }

  /**
   * Loads all sound effects and background music
   */
  public loadAudio(): void {
    const audioRoot = '/assets/audio';

    // Music Tracks
    this.scene.load.audio('bg_music', `${audioRoot}/music/main_theme.mp3`);

    // SFX Sounds
    this.scene.load.audio('sfx_jump', `${audioRoot}/sfx/jump.wav`);
    this.scene.load.audio('sfx_coin', `${audioRoot}/sfx/coin.wav`);
    this.scene.load.audio('sfx_crash', `${audioRoot}/sfx/crash.wav`);
  }
}
