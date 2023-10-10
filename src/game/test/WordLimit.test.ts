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
    game.handleInput("Space");
    expect(game.getGame().getGameState()).toBe(GameState.RUNNING);
    input2.forEach((c) => game.handleInput(c));
    expect(game.getGame().getGameState()).toBe(GameState.FINISHED);
  });
});
