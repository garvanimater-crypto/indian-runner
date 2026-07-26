import GameCanvas from "../components/GameCanvas";

/**
 * Next.js Home Page (/)
 * 
 * We have completely removed the default Next.js starter page and replaced it
 * with our reusable GameCanvas component. This is the entry point of the web application
 * which mounts our client-side Phaser 3 game engine.
 */
export default function Home() {
  return <GameCanvas />;
}
