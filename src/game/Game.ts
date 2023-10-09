import type Word from "./Word";

export default class Game {
  private words: Array<Word>;
  private index: number;

  constructor(words: Array<Word>) {
    this.words = words;
    this.index = 0;
    this.words[0].activate();
  }

  current() {
    return this.words[this.index];
  }

  prev() {
    if (this.index > 0) return this.words[this.index - 1];
    return this.words[0];
  }

  getWords() {
    return this.words;
  }

  handleInput(key: string) {
    switch (key) {
      case "Backspace":
        this.words[this.index].handleDeletion();
        this.index--;

        if (this.index < 0) {
          this.index = 0;
          this.words[this.index].activate();
        }

        break;
      case "Space":
        this.words[this.index].validate();
        this.index++;
        this.words[this.index].activate();
        break;
      default:
        this.words[this.index].handleInput(key);
    }
  }
}
