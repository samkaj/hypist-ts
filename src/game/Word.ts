export enum Status {
  Inactive,
  Active,
  Correct,
  Incorrect,
}

export class Word {
  readonly value: string;
  status: Status = Status.Inactive;

  constructor(value: string) {
    this.value = value;
  }

  /*
   * When the word is active in the typing test, the status is set to active.
   */
  activate(): void {
    this.status = Status.Active;
  }

  handleInput(input: string): void {
    if (input.endsWith(" ")) {
      this.validate(input);
      return;
    }
    if (!this.value.startsWith(input.trim())) {
      this.status = Status.Incorrect;
      return;
    }
    this.status = Status.Active;
  }

  /*
   * When the user is done writing the word, the input is validated against the
   * actual value, updating the status accordingly.
   */
  validate(input: string): void {
    if (input.trim() === this.value) {
      this.status = Status.Correct;
      return;
    }
    this.status = Status.Incorrect;
  }

  isCorrect(): boolean {
    return this.status === Status.Correct;
  }

  isHandled(): boolean {
    return this.status === Status.Correct || this.status === Status.Incorrect;
  }
}
