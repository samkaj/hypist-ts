import BaseGame, { type Game } from "../Game";
import type Word from "../Word";

export default class WordLimitGame implements Game {
  game: BaseGame;
  private wordcount: number;

  constructor(words: Array<Word>) {
    this.game = new BaseGame(words);
    this.wordcount = this.game.words.length;
    this.setupGameOverHandler();
  }

  public getGame(): BaseGame {
    return this.game;
  }

  public handleInput(key: string): void {
    if (this.isLastWord() && (this.inputMatchesWord(key) || key === " ")) {
      this.getGame().gameOver();
    }
    this.getGame().handleInput(key);
    if (this.isLastWord() && this.getGame().getCurrentWord().isCorrect()) {
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

  private inputMatchesWord(key: string): boolean {
    const correct = this.game.getCurrentWord().correct;
    const isLast =
      this.game.getCurrentWord().input.length === correct.length - 2;
    return isLast && key === correct[correct.length - 2];
  }

  private isLastWord(): boolean {
    return this.game.getIndex() === this.wordcount - 1;
  }
}
