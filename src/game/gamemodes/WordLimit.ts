import Game, { GameState } from "../Game";
import type Word from "../Word";

export default class WordLimitGame {
  private wordcount: number;
  private game: Game;

  constructor(words: Array<Word>) {
    this.game = new Game(words);
    this.wordcount = this.game.getWords().length;
  }

  getGame() {
    return this.game;
  }

  handleInput(key: string): void {
    if (this.game.getIndex() === this.wordcount - 1) {
      this.game.gameOver();
    }
    if (this.game.getGameState() === GameState.IDLE) {
      this.game.startGame();
    }
    this.game.handleInput(key);
  }
}
