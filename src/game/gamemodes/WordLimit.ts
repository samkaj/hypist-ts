import Game, { GameState } from "../Game";
import type Word from "../Word";
import { State } from "../Word";

export default class WordLimitGame {
  private wordcount: number;
  private game: Game;
  private lastWordHandled;

  constructor(words: Array<Word>) {
    this.game = new Game(words);
    this.wordcount = this.game.getWords().length;
    this.game.handleGameOver = () => {
      if (this.isLastWord() && this.game.getCurrentWord().isCorrect()) {
        this.game.gameOver();
      }
    }
    this.lastWordHandled = false;
  }

  getGame() {
    return this.game;
  }

  isLastWord() {
    return this.game.getIndex() === this.wordcount - 1;
  }

  handleInput(key: string): void {
    if (key === "Space" && this.lastWordHandled) {
      this.game.gameOver();
    }
    this.game.handleInput(key);
    this.game.handleGameOver();
    if (key === "Space" && this.isLastWord()) {
      this.lastWordHandled = true;
    }
  }
}
