export class GameManager {
  private score: number = 0;
  private distance: number = 0;
  private gameSpeed: number = 300;
  private baseSpeed: number = 300;
  private speedIncrement: number = 10; // Speed increases as game progresses
  private isGameOver: boolean = false;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.score = 0;
    this.distance = 0;
    this.gameSpeed = this.baseSpeed;
    this.isGameOver = false;
  }

  public incrementScore(points: number): void {
    this.score += points;
  }

  public getScore(): number {
    return this.score;
  }

  public updateDistance(delta: number): void {
    if (this.isGameOver) return;
    
    // Distance increments based on speed and time
    this.distance += (this.gameSpeed * delta) / 1000;
    
    // Scale speed gently over distance
    this.gameSpeed = this.baseSpeed + Math.floor(this.distance / 100) * this.speedIncrement;
  }

  public getDistance(): number {
    return Math.floor(this.distance);
  }

  public getGameSpeed(): number {
    return this.gameSpeed;
  }

  public setGameOver(gameOver: boolean): void {
    this.isGameOver = gameOver;
  }

  public checkGameOver(): boolean {
    return this.isGameOver;
  }
}
