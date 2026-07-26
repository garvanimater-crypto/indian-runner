'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { phaserConfig } from '../game/config';

/**
 * PhaserGame Component
 * 
 * This component handles the actual instantiation and cleanup of the Phaser game instance.
 * It runs strictly on the client-side (denoted by 'use client').
 * It initializes Phaser using the config and hooks it up to the 'game-container' div.
 * 
 * We use a React useRef to keep track of the Phaser game instance and ensure it is
 * properly cleaned up/destroyed when the component unmounts, preventing memory leaks
 * and duplicate canvases.
 */
export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') return;

    // Prevent double-initialization in React Strict Mode (common during dev-mode HMR)
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(phaserConfig);
    }

    // Clean up Phaser game instance on component unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  // Return a div container with full width and height, and background color matching the game config
  return (
    <div 
      id="game-container" 
      className="w-full h-full bg-black"
    />
  );
}
