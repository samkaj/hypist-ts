import Game, { GameState } from "../Game";
import Word, { State } from "../Word";
import { createWords } from "./TestHelper";

describe("game logic", () => {
  it("handles letter input", () => {
    const words: Array<Word> = createWords("hello");
    const game: Game = new Game(words);
    expect(game.getCurrentWord().state).toEqual(State.ACTIVE);
    game.handleInput("h");
    expect(game.getCurrentWord().value[0].state).toEqual(State.CORRECT);
    game.handleInput("e");
    game.handleInput("l");
    game.handleInput("l");
    game.handleInput("o");
    expect(game.getCurrentWord().value[4].state).toEqual(State.CORRECT);
    expect(game.getCurrentWord().state).toEqual(State.CORRECT);
  });

  it("handles letter deletions", () => {
    const words: Array<Word> = createWords("hello");
    const game: Game = new Game(words);
    game.handleInput("h");
    expect(game.getCurrentWord().value[0].state).toEqual(State.CORRECT);
    game.handleInput("Backspace");
    expect(game.getCurrentWord().value[0].state).toEqual(State.ACTIVE);
    expect(game.getCurrentWord().value[1].state).toEqual(State.INACTIVE);
  });

  it("handles backspace edge case", () => {
    const words: Array<Word> = createWords("hello");
    const game: Game = new Game(words);
    game.handleInput("Backspace");
    game.handleInput("Backspace");
    game.handleInput("Backspace");
    expect(game.getCurrentWord().value[0].state).toEqual(State.ACTIVE);
  });

  it("handles multiple words", () => {
    const words: Array<Word> = createWords("hello hello");
    const game: Game = new Game(words);
    const input = "hello".split("");
    input.forEach((c) => game.handleInput(c));
    game.handleInput("Space");
    input.forEach((c) => game.handleInput(c));
    game.getWords().forEach((w) => expect(w.state).toBe(State.CORRECT));
  });

  it("stops game", () => {
    const words: Array<Word> = createWords("hello hello");
    const game: Game = new Game(words);
    game.handleInput("h");
    expect(game.getGameState()).toBe(GameState.RUNNING);
    game.handleInput("Escape");
    expect(game.getGameState()).toBe(GameState.IDLE);
    game.handleInput("h");
    expect(game.getGameState()).toBe(GameState.RUNNING);
    game.handleInput("Tab");
    expect(game.getGameState()).toBe(GameState.IDLE);
    game.handleInput("h");
    expect(game.getGameState()).toBe(GameState.RUNNING);
  });
});
