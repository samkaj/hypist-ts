export enum State {
  INACTIVE,
  ACTIVE,
  CORRECT,
  INCORRECT,
  EXTRA,
}

export class Letter {
  value: string;
  state: State;

  constructor(value: string) {
    this.value = value;
    this.state = State.INACTIVE;
  }

  public setState(state: State): void {
    this.state = state;
  }
}

class Word {
  value: Array<Letter>;
  state: State;
  correct: string;
  input: string;
  index: number;
  extra: string;

  constructor(value: string) {
    this.value = value.split("").map((letter) => new Letter(letter)); 
    this.value.push(new Letter(" "));
    this.state = State.INACTIVE;
    this.index = 0;
    this.input = "";
    this.correct = value + " ";
    this.extra = "";
  }

  public activate(): void {
    if (this.value.length > 0) {
      this.setState(State.ACTIVE);
      this.value[this.index].setState(State.ACTIVE);
    }
  }

  public handleInput(input: string): void {
    this.pushInput(input);
    if (this.state == State.INACTIVE) this.activate();
    this.processCurrentInput(input);
  }

  public isInactive(): boolean {
    return this.value.every((val) => val.state === State.INACTIVE);
  }

  public isCorrect(): boolean {
    return this.input === this.correct;
  }

  public isCorrectSoFar(): boolean {
    if (this.input.length > this.correct.length) return false;
    for (let i = 0; i < this.input.length; i++) {
      if (this.input[i] !== this.correct[i]) return false;
    }
    return true;
  }

  public handleBackspace(): void {
    if (this.extra.length > 0) {
      this.extra = this.extra.slice(0, -1);
      return;
    }

    this.setCurrentLetterState(State.INACTIVE);
    this.popInput();
    if (this.index > 0) {
      this.index--;
      this.setCurrentLetterState(State.ACTIVE);
    } else if (this.index === 0){
      this.setCurrentLetterState(State.INACTIVE);
      this.setState(State.INACTIVE);
    }
    else {
      this.setState(State.INACTIVE);
    }
  }

  public validate(): void {
    const newState = this.isCorrect() ? State.CORRECT : State.INCORRECT;
    this.setState(newState);
    this.value.forEach((letter) => letter.setState(newState));
  }

  public getCurrentLetter(): Letter {
    return this.value[this.index];
  }

  private setPreviousLetterState(state: State): void {
    if (this.index <= 0) return;
    this.value[this.index - 1].setState(state);
  }

  private setCurrentLetterState(state: State): void {
    this.value[Math.max(this.index, 0)].setState(state);
  }

  private setNextLetterState(state: State): void {
    if (this.index < this.value.length - 1) {
      this.value[this.index + 1].setState(state);
    }
  }

  private popInput(): void {
    this.input = this.input.slice(0, -1);
  }

  pushInput(char: string): void {
    this.input += char;
  }

  private setState(state: State): void {
    this.state = state;
  }

  private processCurrentInput(input: string): void {
    if (this.input.length > this.correct.length) {
      this.extra += input;
      this.setState(State.INCORRECT);
      return;
    }

    const expectedLetter = this.getCurrentLetter().value;
    const currentState =
      expectedLetter === input ? State.CORRECT: State.INCORRECT;
    this.setCurrentLetterState(currentState);
    this.setNextLetterState(State.ACTIVE);

    if (expectedLetter !== input) this.setState(State.INCORRECT);
    if (this.index === this.value.length - 1) this.validate();
    else this.index++;

  }
}

export default Word;
