import { Word } from "./Word";

export class Game {
  private startTimeMs: number = 0;
  private elapsedMs: number = 0;
  private wordIndex: number = 0;
  words: Word[];

  constructor() {
    this.words = getRandomWords()
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
    this.words = getRandomWords();
  }

  gameOver(): void {
    this.elapsedMs = Date.now() - this.startTimeMs;
    console.log(`The test took ${this.elapsedMs / 1000} s.`);
    this.reset();
  }
}

const getRandomWords = (): Word[] => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ").map((w) => new Word(w));
}
