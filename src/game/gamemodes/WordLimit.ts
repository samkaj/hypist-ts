import Game from "../Game";
import type Word from "../Word";

export default class WordLimitGame {
  private game: Game;
  private wordcount: number;

  constructor(words: Array<Word>) {
    this.game = new Game(words);
    this.wordcount = this.game.words.length;
    this.setupGameOverHandler();
  }

  public getGame(): Game {
    return this.game;
  }

  public handleInput(key: string): void {
    if (this.isLastWord() && key === " ") {
      this.getGame().gameOver();
    }
    this.getGame().handleInput(key);
    if (this.isLastWord() && (this.getGame().getCurrentWord().isCorrect())) {
      this.getGame().gameOver();
    }
  }

  private setupGameOverHandler(): void {
    this.game.handleGameOver = () => {
      if (this.isLastWord() && this.game.getCurrentWord().isCorrect()) {
        this.game.gameOver();
      }
    };
  }

  private isLastWord(): boolean {
    return this.game.getIndex() === this.wordcount - 1;
  }
}
