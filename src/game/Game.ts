import type Word from "./Word";

export default class Game {
  private words: Array<Word>;
  private index: number;

  constructor(words: Array<Word>) {
    this.words = words;
    this.index = 0;
  }

  current() {
    return this.words[this.index];
  }

  next(): Word | null {
    this.index++;
    if (this.index < this.words.length) {
      return this.words[this.index];
    }
    return null;
  }

  handleInput(keycode: string) {
    switch (keycode) {
      case "Backspace":
        this.words[this.index].handleDeletion();
        if (this.current().isInactive()) {
          this.index--;
        }

        if (this.index < 0) {
          this.index = 0;
          this.words[this.index].activate();
        }
      case "Space":
        this.words[this.index].validate();
        this.index++;
      default:
        this.words[this.index];
    }
  }
}
