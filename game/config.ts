import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';

/**
 * Phaser Game Configuration File
 * 
 * This file contains the complete configurations for our Phaser 3 instance.
 * It specifies the rendering engine (Phaser.AUTO), canvas dimensions, scaling mode,
 * basic physics parameters, and registers all game scenes.
 * 
 * RESIZE layout:
 * - We utilize `Phaser.Scale.RESIZE` mode to support dynamic scaling.
 * - This scale mode auto-resizes the game canvas to fit the parent container dynamically.
 * - It works beautifully across Desktop, Mobile, and Tablet viewports.
 */
export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  parent: 'game-container', // Matches the ID of the div in GameCanvas
  backgroundColor: '#000000', // Deep black background for MODI RUNNER
  scale: {
    mode: Phaser.Scale.RESIZE, // Use Phaser Scale.RESIZE as requested
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the canvas within parent
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  // Register game scenes. BootScene runs first because it's first in the array.
  scene: [BootScene, MenuScene, GameScene, GameOverScene],
};
