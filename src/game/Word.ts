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

  constructor(value: string) {
    this.value = value.split("").map((letter) => new Letter(letter));
    this.state = State.INACTIVE;
    this.index = 0;
  }

  public setState(state: State) {
    this.state = state;
  }

  public activate() {
    this.setState(State.ACTIVE);
  }

  public handleInput(input: string) {
    this.index++;
    if (this.index >= this.value.length) {
      this.setState(State.INCORRECT);
      return;
    }

    const want = this.getCurrentLetter().value;
    this.setCurrentLetterState(
      want === input ? State.CORRECT : State.INCORRECT
    );

    const isLast = this.index === this.value.length - 1;
    if (isLast) {
      this.validate();
      return;
    }

    this.setNextLetterState(State.ACTIVE);
  }

  public isInactive() {
    return this.value.every((val) => val.state === State.INACTIVE);
  }

  public handleDeletion() {
    this.setCurrentLetterState(State.INACTIVE);
    this.index--;
    if (this.index >= 0) {
      this.setCurrentLetterState(State.ACTIVE);
      return;
    }
    this.setCurrentLetterState(State.INACTIVE);
    this.index = 0;
  }

  public validate() {
    const isCorrect = this.value.every(
      (letter) => letter.state === State.CORRECT
    );
    this.setState(isCorrect ? State.CORRECT : State.INCORRECT);
  }

  private getCurrentLetter(): Letter {
    return this.value[this.index];
  }

  private setCurrentLetterState(state: State) {
    this.value[this.index].setState(state);
  }

  private setNextLetterState(state: State) {
    if (this.index < this.value.length - 1) {
      this.value[this.index + 1].setState(state);
    }
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
