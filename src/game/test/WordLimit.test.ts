import { GameState } from "../Game";
import WordLimitGame from "../gamemodes/WordLimit";
import { createWords } from "./TestHelper";

describe("word limit", () => {
  it("ends game once all words are processed", () => {
    const game = new WordLimitGame(createWords("foo bar"));
    const input1 = "foo".split("");
    const input2 = "bar".split("");
    expect(game.getGame().getGameState()).toBe(GameState.IDLE);
    input1.forEach((c) => game.handleInput(c));
    game.handleInput(" ");
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
    input2.forEach((c) => game.handleInput(c));
    expect(game.getGame().getGameState()).toBe(GameState.FINISHED);
  });

  it("does not end if some words are unprocessed", () => {
    const game = new WordLimitGame(createWords("foo bar"));
    const input1 = "foo".split("");
    const input2 = "ba".split("");
    expect(game.getGame().getGameState()).toBe(GameState.IDLE);
    input1.forEach((c) => game.handleInput(c));
    game.handleInput(" ");
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
    input2.forEach((c) => game.handleInput(c));
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
  });

  it("does not end if last word is incorrect", () => {
    const game = new WordLimitGame(createWords("foo bar"));
    const input1 = "foo".split("");
    const input2 = "baz".split("");
    expect(game.getGame().getGameState()).toBe(GameState.IDLE);
    input1.forEach((c) => game.handleInput(c));
    game.handleInput(" ");
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
    input2.forEach((c) => game.handleInput(c));
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
  });

  it("ends if last word is incorrect and space is pressed", () => {
    const game = new WordLimitGame(createWords("foo bar"));
    const input1 = "foo".split("");
    const input2 = "baz".split("");
    expect(game.getGame().getGameState()).toBe(GameState.IDLE);
    input1.forEach((c) => game.handleInput(c));
    game.handleInput(" ");
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
    input2.forEach((c) => game.handleInput(c));
    game.handleInput(" ");
    expect(game.getGame().getGameState()).toBe(GameState.FINISHED);
  });
});
