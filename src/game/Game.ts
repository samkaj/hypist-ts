import generateWords from "./WordGenerator";
import type { Word } from "./Word";

export class Game {
  private startTimeMs: number = 0;
  private elapsedMs: number = 0;
  private wordIndex: number = 0;
  private wordCount: number = 100;
  isStarted: boolean = false;
  words: Word[];

  constructor(wordCount: number) {
    this.wordCount = wordCount;
    this.words = generateWords(wordCount);
    this.words[0].activate();
  }

  start(): void {
    this.getCurrentWord().activate();
    this.startTimeMs = Date.now();
    this.isStarted = true;
  }

  handleWord(input: string): void {
    this.getCurrentWord().handleInput(input);
    if (input.endsWith(" ")) {
      this.nextWord();
    }
  }

  isFinished(): boolean {
    return this.words[this.words.length - 1].isHandled();
  }

  isLastWordAndCorrect(input: string): boolean {
    const isLastWord = this.wordIndex === this.words.length - 1;
    const isCorrect = this.words[this.wordIndex].value === input;
    return isLastWord && isCorrect;
  }

  getCurrentWord(): Word {
    return this.words[this.wordIndex];
  }

  nextWord(): void {
    if (this.words.length - 1 === this.wordIndex) {
      this.getCurrentWord();
      this.gameOver();
      return;
    }
    this.wordIndex++;
    this.getCurrentWord().activate();
  }

  getWpm(elapsedMs: number): number {
    const elapsedMins = elapsedMs / (1000 * 60);
    const correctAmount = this.words.filter((w) => w.isCorrect()).length;
    return correctAmount / elapsedMins;
  }

  reset(): void {
    this.startTimeMs = 0;
    this.wordIndex = 0;
    this.words = generateWords(this.wordCount);
    this.isStarted = false;
    this.getCurrentWord().activate();
  }

  gameOver(): void {
    this.elapsedMs = Date.now() - this.startTimeMs;
  }

  setWordCount(count: number) {
    this.wordCount = count;
  }
}
