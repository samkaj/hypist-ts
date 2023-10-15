import type Word from "./Word";
import { getRandomWord } from "./utils/WordGenerator";

export enum GameState {
  IDLE,
  RUNNING,
  FINISHED,
}

export interface Game {
  game: BaseGame;
  handleInput(key: string): void;
}


export default class BaseGame {
  words: Array<Word>;
  handleGameOver: () => void;
  private index: number;
  private gameState: GameState;
  private input: string;

  constructor(words: Array<Word>, handleGameOver: () => void = () => {}) {
    this.words = words.length > 0 ? words : [getRandomWord()];
    this.index = 0;
    this.words[0].activate();
    this.gameState = GameState.IDLE;
    this.handleGameOver = handleGameOver;
    this.input = "";
  }

  public startGame(): void {
    this.gameState = GameState.RUNNING;
  }

  public reset(): void {
    this.gameState = GameState.IDLE;
  }

  public gameOver(): void {
    this.gameState = GameState.FINISHED;
  }

  public isIdle(): boolean {
    return this.gameState === GameState.IDLE;
  }

  public isOver(): boolean {
    return this.gameState === GameState.FINISHED;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public pushRandomWord(): void {
    this.words.push(getRandomWord());
  }

  public getWordValues(): string {
    return this.words.map((word) => word.correct).join(" ");
  }

  public getWordInput(): string {
    return this.input;
  }

  public getIndex(): number {
    return this.index;
  }

  getCurrentWord(): Word {
    return this.words[this.index] || this.words[this.words.length - 1];
  }

  public handleInput(key: string): void {
    if (this.isIdle()) {
      this.startGame();
    }

    switch (key) {
      case "Escape":
      case "Tab":
        this.reset();
        return;
      case "Backspace":
        this.handleBackspace();
        break;
      case " ":
        this.handleSpace();
        break;
      default:
        this.handleCharacterInput(key);
    }
  }

  private handleBackspace(): void {
    const currentWord = this.getCurrentWord();
    currentWord.handleBackspace();
    this.input = this.input.slice(0, -1);


    if (currentWord.isInactive()) {
      this.index = Math.max(this.index - 1, 0);
      this.getCurrentWord().activate();
    }
  }

  private handleSpace(): void {
    this.getCurrentWord().pushInput(" ");
    this.getCurrentWord().validate();
    this.index++;

    if (this.index >= this.words.length) {
      this.handleGameOver();
    } else {
      this.getCurrentWord().activate();
    }
  }

  private handleCharacterInput(key: string): void {
    if (key.length !== 1 || key === "Shift") return;

    this.input += key;
    this.getCurrentWord().handleInput(key);
  }
}
