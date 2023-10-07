import Word, { State } from "./Word";

describe("handle input", () => {
  it("constructor", () => {
    const word: Word = new Word("hello");
    expect(word.value.length).toEqual(5);
    expect(word.isInactive()).toBeTruthy();
  });

  it("handles correct input", () => {
    const word: Word = new Word("hello");
    word.handleInput("h");
    word.handleInput("e");
    word.handleInput("l");
    word.handleInput("l");
    word.handleInput("o");
    expect(word.state).toEqual(State.CORRECT);
  });

  it("handles incorrect input of right len", () => {
    const word: Word = new Word("hello");
    word.handleInput("h");
    word.handleInput("l");
    word.handleInput("e");
    word.handleInput("l");
    word.handleInput("o");
    expect(word.state).toEqual(State.INCORRECT);
  });

  it("handles correct input but too long", () => {
    const word: Word = new Word("hello");
    word.handleInput("h");
    word.handleInput("e");
    word.handleInput("l");
    word.handleInput("l");
    word.handleInput("o");
    word.handleInput("o");
    expect(word.state).toEqual(State.INCORRECT);
  });

  it("handles correct input but not done", () => {
    const word: Word = new Word("hello");
    word.handleInput("h");
    word.handleInput("e");
    word.handleInput("l");
    word.handleInput("l");
    expect(word.state).toEqual(State.ACTIVE);
  });

  it("handles incorrect input and not done", () => {
    const word: Word = new Word("hello");
    word.handleInput("a");
    word.handleInput("e");
    word.handleInput("l");
    word.handleInput("l");
    expect(word.state).toEqual(State.INCORRECT);
  });

  it("is case sensitive", () => {
    const word: Word = new Word("hello");
    word.handleInput("H");
    word.handleInput("e");
    word.handleInput("l");
    word.handleInput("l");
    word.handleInput("o");
    expect(word.state).toEqual(State.INCORRECT);

    const anotherWord: Word = new Word("Hello");
    anotherWord.handleInput("H");
    anotherWord.handleInput("e");
    anotherWord.handleInput("l");
    anotherWord.handleInput("l");
    anotherWord.handleInput("o");
    expect(anotherWord.state).toEqual(State.CORRECT);
  });

  it("accepts empty words", ()=> {
    const word: Word = new Word("");
    word.handleInput("a");
    expect(word.state).toEqual(State.INCORRECT);
  })
});

describe("handle deletion", () => {
  it("decrements index", () => {
    const word: Word = new Word("hello");
    word.handleInput("h");
    expect(word.index).toEqual(1);
    word.handleDeletion();
    expect(word.index).toEqual(0);
  });

  it("does not induce negative index", ()=>{
    const word: Word = new Word("hello");
    word.handleDeletion();
    expect(word.index).toEqual(0);
  });

  it("sets current to inactive and previous to active", () => {
    const word: Word = new Word("hello");
    word.handleInput("h");
    word.handleInput("e");
    word.handleDeletion();
    expect(word.getCurrentLetter().value).toEqual("e");
    expect(word.getCurrentLetter().state).toEqual(State.ACTIVE);
    expect(word.value[0].state).toEqual(State.CORRECT);
  });

  it("deactivates when whole word is deleted", ()=>{
    const word: Word = new Word("hello");
    word.handleInput("h");
    word.handleDeletion();
    word.handleDeletion();
    expect(word.state).toBe(State.INACTIVE);
  });
});
