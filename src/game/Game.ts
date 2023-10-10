import type Word from "./Word";

export enum GameState {
  IDLE,
  RUNNING,
  FINISHED,
  STOPPED,
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

  getIndex() {
    return this.index;
  }

  gameOver() {
    this.gameState = GameState.FINISHED;
  }

  startGame() {
    this.gameState = GameState.RUNNING;
  }

  stopGame() {
    this.gameState = GameState.STOPPED;
  }

  getGameState() {
    return this.gameState;
  }

  private setGamemode(gamemode: Gamemode): void {
    this.gamemode = gamemode;
  }

  

  handleInput(key: string) {
    if (this.getGameState() === GameState.IDLE) {
      this.startGame();
    }
    switch (key) {
      case "Backspace":
        this.getCurrentWord().handleDeletion();
        this.index--;

        if (this.index < 0) {
          this.index = 0;
          this.words[this.index].activate();
        }

        break;
      case "Escape":
      case "Tab":
        this.stopGame();
      case "Space":
        this.getCurrentWord().validate();
        this.index++;
        if (this.index >= this.words.length - 1) {
          this.handleGameOver();
        }
        if (this.getCurrentWord()) {
          this.getCurrentWord().activate();
        }
        break;
      default:
        this.getCurrentWord().handleInput(key);
    }
  }
}
