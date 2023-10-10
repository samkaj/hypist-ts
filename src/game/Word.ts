export enum State {
  INACTIVE,
  ACTIVE,
  CORRECT,
  INCORRECT,
}

class Word {
  value: Array<Letter>;
  state: State;
  index: number;
  input: string;
  correct: string;

  constructor(value: string) {
    this.value = value.split("").map((letter) => new Letter(letter));
    this.state = State.INACTIVE;
    this.index = 0;
    this.input = "";
    this.correct = value;
  }

  public activate() {
    if (this.value.length > 0) {
      this.setState(State.ACTIVE);
      this.value[this.index].setState(State.ACTIVE);
    }
  }

  public handleInput(input: string) {
    this.pushInput(input);

    if (this.state == State.INACTIVE) {
      this.activate();
    }

    if (this.index >= this.value.length) {
      this.setState(State.INCORRECT);
      return;
    }

    const want = this.getCurrentLetter().value;
    this.setCurrentLetterState(
      want === input ? State.CORRECT : State.INCORRECT,
    );

    if (want !== input) {
      this.setState(State.INCORRECT);
    }

    const isLast = this.index === this.value.length - 1;
    this.index++;
    if (isLast) {
      this.validate();
      return;
    }

    this.setNextLetterState(State.ACTIVE);
  }

  public isInactive() {
    return this.value.every((val) => val.state === State.INACTIVE);
  }

  public isCorrect() {
    return this.input === this.correct;
  }

  public handleDeletion() {
    this.setCurrentLetterState(State.INACTIVE);
    this.index--;
    if (this.index >= 0) {
      this.setCurrentLetterState(State.ACTIVE);
      return;
    }
    this.index = 0;
    this.setCurrentLetterState(State.INACTIVE);
    this.setState(State.INACTIVE);
    this.popInput();
  }

  public validate() {
    const correct = this.value.map((s) => s.value).join("") === this.input;

    this.setState(correct ? State.CORRECT : State.INCORRECT);
  }

  public getCurrentLetter(): Letter {
    return this.value[this.index];
  }

  public getCorrect(): string {
    return this.correct;
  }

  private setCurrentLetterState(state: State) {
    this.value[this.index].setState(state);
  }

  private setNextLetterState(state: State) {
    if (this.index < this.value.length - 1) {
      this.value[this.index + 1].setState(state);
    }
  }

  private popInput() {
    if (this.input.length > 1) {
      this.input = this.input.slice(0, this.input.length - 2);
      return;
    }
    this.input = "";
  }

  private pushInput(char: string) {
    this.input += char;
  }

  private setState(state: State) {
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

  setState(state: State) {
    this.state = state;
  }
}

export default Word;
