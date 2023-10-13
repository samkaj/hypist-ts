import type Word from "./Word";
import { getRandomWord } from "./utils/WordGenerator";

export enum GameState {
  IDLE,
  RUNNING,
  FINISHED,
}

export default class Game {
  private words: Array<Word>;
  private index: number;
  private gameState: GameState;
  handleGameOver: () => void;

  constructor(words: Array<Word>, handleGameOver: () => void = () => {}) {
    this.words = words;
    this.index = 0;
    this.words[0].activate();
    this.gameState = GameState.IDLE;
    this.handleGameOver = handleGameOver;
  }

  getCurrentWord() {
    return this.words[this.index];
  }

  getWords() {
    return this.words;
  }

  getWordValues() {
    return this.getWords()
      .map((w) => w.correct)
      .join(" ");
  }

  getWordInput() {
    return this.getWords()
      .map((w) => w.input)
      .join(" ");
  }

  getIndex() {
    return this.index;
  }

  gameOver() {
    this.gameState = GameState.FINISHED;
  }

  reset() {
    this.gameState = GameState.IDLE;
  }

  startGame() {
    this.gameState = GameState.RUNNING;
  }

  getGameState() {
    return this.gameState;
  }

  pushRandomWord() {
    this.words.push(getRandomWord());
  }

  isIdle() {
    return this.gameState === GameState.IDLE;
  }

  handleInput(key: string) {
    if (this.isIdle()) {
      this.startGame();
    }
    switch (key) {
      case "Backspace":
        this.getCurrentWord().handleDeletion();
        if (this.getCurrentWord().isInactive()) {
          this.index--;
          if (this.index < 0) {
            this.index = 0;
          }
          this.getCurrentWord().activate();
        }
        break;
      case "Escape":
      case "Tab":
        this.reset();
        break;
      case " ":
        this.getCurrentWord().validate();
        this.index++;
        console.log(this.getCurrentWord());
        if (this.index >= this.words.length - 1) {
          this.handleGameOver();
        }
        if (this.getCurrentWord()) {
          this.getCurrentWord().activate();
        }
        break;
      case "Shift":
        break;
      default:
        if (key.length === 1) {
          this.getCurrentWord().handleInput(key);
        }
    }
  }
}
