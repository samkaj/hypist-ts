export enum State {
  INACTIVE,
  ACTIVE,
  CORRECT,
  INCORRECT,
}

class Word {
  value: Array<Letter>;
  state: State;

  constructor(value: string) {
    this.value = value.split("").map((letter) => {
      return new Letter(letter);
    });
    this.state = State.INACTIVE;
  }

  public setState(state: State) {
    this.state = state;
  }
}

class Letter {
  value: string;
  state: State;

  constructor(value: string) {
    this.value = value;
    this.state = State.INACTIVE;
  }

  private setState(state: State) {
    this.state = state;
  }
}

export default Word;
