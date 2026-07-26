'use client';

import dynamic from 'next/dynamic';

/**
 * Dynamically import the core PhaserGame component with SSR disabled (ssr: false).
 * This guarantees that Phaser and all browser-only APIs (window, document, navigator)
 * are NEVER executed during server-side rendering (SSR), preventing deployment and build errors.
 * 
 * We show a clean black loading screen while the dynamic chunk loads.
 */
const PhaserGame = dynamic(() => import('./PhaserGame'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-black text-white font-mono">
      <div className="text-xl font-bold tracking-wider mb-2">MODI RUNNER</div>
      <div className="text-sm text-zinc-400 animate-pulse">Initializing Game Canvas...</div>
    </div>
  ),
});

/**
 * GameCanvas Component
 * 
 * A reusable React component that loads and mounts the Phaser game safely within
 * a Next.js environment. It wraps the dynamic client-only Phaser instance and
 * provides fallback loading UI during the dynamic chunk fetch.
 * 
 * This component is fully responsive and automatically handles different screen sizes.
 */
export default function GameCanvas() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black select-none">
      <PhaserGame />
    </main>
  );
}
