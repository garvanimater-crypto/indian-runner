# Phaser 3 Game Architecture

This directory contains the core Phaser 3 2D endless runner game module, integrated seamlessly with a Next.js frontend. The architecture is modular, decoupled, and fully typed using TypeScript to guarantee scalability, ease of debugging, and separation of concerns.

---

## Folder Structure

Below is the directory map of the game module:

```
game/
├── README.md               # Architecture documentation
├── scenes/                 # Game scenes controlling screen flow & lifecycle
│   ├── BootScene.ts        # Resource loading and screen setups
│   ├── MenuScene.ts        # Main menu overlay and interactions
│   ├── GameScene.ts        # Orchestrates the actual active game loop
│   └── GameOverScene.ts    # Game over display and replay transitions
├── objects/                # Standalone game objects/entities representing game elements
│   ├── Player.ts           # Player movement, jumps, and slides
│   ├── Obstacle.ts         # Avoidable blocks, hazards, and scrolling physics
│   ├── Ground.ts           # Scrolling ground level using TileSprites
│   ├── Background.ts       # Multilayer parallax scrolling background
│   └── Coin.ts             # Collectible items that award score
├── managers/               # Centralized game state managers
│   ├── GameManager.ts      # Active scores, speed scaling, state controls
│   ├── AssetManager.ts     # Sound, music, sprite and texture preload hooks
│   └── InputManager.ts     # Keyboard, mouse, and touch listener abstractions
├── utils/                  # [Reserved] General mathematical/gameplay helpers
└── types/                  # [Reserved] Game interface and type definitions

public/assets/              # Shared static binary game assets
├── images/
│   ├── player/             # Player sheets, sprites, and animation frames
│   ├── background/         # Parallax backdrop images
│   ├── obstacles/          # Obstacle sprites
│   ├── ui/                 # Buttons, menus, and layout boxes
│   └── coins/              # Gold coins and animations
└── audio/
    ├── music/              # Endless loops and menu soundtracks
    └── sfx/                # Sound effects (jump, crash, collect)
```

---

## File Profiles & Purpose

### 🎬 Scenes (`game/scenes/`)

#### 1. `BootScene.ts`
- **Purpose:** Initiates the game, initializes the progress bar visual loaders, and preloads assets into the Phaser asset cache via `AssetManager`.
- **Flow:** Triggers immediately when the game loads. Transitions to `MenuScene` as soon as all queued resources have completed loading.

#### 2. `MenuScene.ts`
- **Purpose:** Renders the main title menu UI. It configures user instruction displays, reads highest scores, and establishes buttons for starting.
- **Flow:** Renders title screen and play button. Click starts the core gameplay loop, shifting controls to `GameScene`.

#### 3. `GameScene.ts`
- **Purpose:** The gameplay coordinator. This is where background scroll rates, obstacle spawners, and player input bindings are established.
- **Flow:** Integrates physical updates, controls update events on every active entity, checks overlaps/collisions, and transitions to `GameOverScene` when a crash is detected.

#### 4. `GameOverScene.ts`
- **Purpose:** Displays final run metrics (e.g., scores, distance) and renders visual retry and exit menus.
- **Flow:** Displays retry options, allowing immediate re-entry into `GameScene` or returning to `MenuScene`.

---

### 👾 Game Objects (`game/objects/`)

#### 1. `Player.ts`
- **Purpose:** Represents the main runner sprite. Manages running states, jump/slide actions, and collision box shapes.

#### 2. `Obstacle.ts`
- **Purpose:** Individual hurdles or threats spawnable on-screen. Governs lateral movement towards the player and recycles itself off-screen to conserve memory.

#### 3. `Ground.ts`
- **Purpose:** Handles the physical ground platform layout. Implemented with `Phaser.GameObjects.TileSprite` to create an endless, seamless scrolling illusion.

#### 4. `Background.ts`
- **Purpose:** Handles high-quality parallax layering. It manages multiple backdrop textures that scroll at varying speed factors relative to the ground's scroll speed.

#### 5. `Coin.ts`
- **Purpose:** Spawnable, floating, collectible coins. They move in sync with the environment and trigger score increment callback functions upon overlap with the player.

---

### ⚙️ Managers (`game/managers/`)

#### 1. `GameManager.ts`
- **Purpose:** A pure, non-visual controller for running state values. Governs distance calculations, score accumulations, and speeds up the runner progressively over time.

#### 2. `AssetManager.ts`
- **Purpose:** Centralizes texture keys and binary directories. This ensures scene loaders are clean and that asset URL definitions are not duplicated.

#### 3. `InputManager.ts`
- **Purpose:** Normalizes hardware inputs (Keyboard cursor keys, spacebars, mouse clicks, and mobile screen touch taps) to logical actions like JUMP or SLIDE.

---

## System Architecture Flow

```
+--------------------------------------------------------+
|                      Next.js Frontend                  |
|  - React Game Canvas Mounting Container                |
+---------------------------+----------------------------+
                            |
                            v
+---------------------------+----------------------------+
|                      Phaser Game Config                |
|  - Canvas Dimensions, Scale Modes, Render Engine       |
+---------------------------+----------------------------+
                            |
                            v
+---------------------------+----------------------------+
|                       Scenes Flow                      |
| [BootScene] ----> [MenuScene] ----> [GameScene]        |
|                                        ^       |       |
|                                        |       v       |
|                                  [GameOverScene]       |
+--------------------------------------------------------+
                            |
                            | (During GameScene execution)
                            v
+---------------------------+----------------------------+
|                    GameScene Coordinations             |
|                                                        |
|   Inputs:    [InputManager]                            |
|                 | (emits)                              |
|                 v                                      |
|   Entities:  [Player] <--- [Ground] <--- [Background]  |
|                                                        |
|   Hazards:   [Obstacle Pools] + [Coin Pools]           |
|                                                        |
|   States:    [GameManager] (Track Score, Speed, Dist)  |
+--------------------------------------------------------+
```
