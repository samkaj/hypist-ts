import BaseGame, { type Game } from "../Game";
import type Word from "../Word";
import Timer from "../utils/Timer";

export default class TimeLimitGame implements Game {
  game: BaseGame;
  private timer: Timer;

  constructor(words: Array<Word>, duration: number) {
    this.game = new BaseGame(words, () => this.handleGameOver());
    this.timer = new Timer(duration, () => this.handleTimeUp());
  }

  public getGame() {
    return this.game;
  }

  public startGame(): void {
    this.game.startGame();
    this.timer.start();
  }

  public stopGame(): void {
    this.game.reset();
    this.timer.stop();
  }

  public handleInput(key: string): void {
    if (this.game.isIdle()) this.startGame();
    this.game.handleInput(key);
    if (key === " ") this.game.pushRandomWord();
  }

  public getRemainingTime(): number {
    return this.timer.getRemainingTime();
  }

  private handleTimeUp(): void {
    this.game.gameOver();
  }

  private handleGameOver(): void {
    this.timer.stop();
  }
}
