import type Word from "./Word";

export enum GameState {
  IDLE,
  RUNNING,
  FINISHED
}

export default class Game {
  private words: Array<Word>;
  private index: number;
  private gameState: GameState;

  constructor(words: Array<Word>) {
    this.words = words;
    this.index = 0;
    this.words[0].activate();
    this.gameState = GameState.IDLE;
  }

  getCurrentWord() {
    return this.words[this.index];
  }

  getWords() {
    return this.words;
  }

  handleInput(key: string) {
    switch (key) {
      case "Backspace":
        this.getCurrentWord().handleDeletion();
        this.index--;

        if (this.index < 0) {
          this.index = 0;
          this.words[this.index].activate();
        }

        break;
      case "Space":
        this.getCurrentWord().validate();
        this.index++;
        this.getCurrentWord().activate();
        break;
      default:
        this.getCurrentWord().handleInput(key);
    }
  }
}
