import Game from "../Game";
import type Word from "../Word";
import Timer from "../utils/Timer";

export default class TimeLimitGame {
  private game: Game;
  private timer: Timer;

  constructor(words: Array<Word>, duration: number) {
    this.game = new Game(words, () => this.handleGameOver());
    this.timer = new Timer(duration, () => this.handleTimeUp());
  }

  getGame() {
    return this.game;
  }

  startGame() {
    this.game.startGame();
    this.timer.start();
  }

  stopGame() {
    this.game.reset();
    this.timer.stop();
  }

  handleTimeUp() {
    this.game.gameOver();
  }

  handleGameOver() {
    this.timer.stop();
  }

  handleInput(key: string) {
    if (this.getGame().isIdle()) {
      this.startGame();
    }
    this.game.handleInput(key);
    if (key === "Space") {
      this.game.pushRandomWord();
    }
  }

  getRemainingTime() {
    return this.timer.getRemainingTime();
  }
}
