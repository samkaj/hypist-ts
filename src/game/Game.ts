import type Word from "./Word";


/*
 * Base class for a game.
 * */
class Game {
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
}

