import type { Word } from "./Word";

export class Game {
  private startTimeMs: number = 0;
  private elapsedMs: number = 0;
  private wordIndex: number = 0;
  words: Word[];

  constructor(words: Word[]) {
    this.words = words;
  }

  start(): void {
    this.startTimeMs = Date.now();
  }

  handleWord(input: string): void {
    this.getCurrentWord().handleInput(input);
    if (input.endsWith(" ")) {
      this.nextWord();
    }
  }

  getCurrentWord(): Word {
    return this.words[this.wordIndex];
  }

  nextWord(): void {
    if (this.words.length - 1 === this.wordIndex) {
      this.gameOver();
      return;
    }
    this.wordIndex++;
    this.getCurrentWord().activate();
  }

  reset(): void {
    this.startTimeMs = 0;
    this.wordIndex = 0;
  }

  gameOver(): void {
    this.elapsedMs = Date.now() - this.startTimeMs;
    console.log(`The test took ${this.elapsedMs / 1000} s.`);
    this.reset();
  }
}
