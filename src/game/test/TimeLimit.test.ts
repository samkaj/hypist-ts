import { GameState } from "../Game";
import TimeLimitGame from "../gamemodes/TimeLimit";
import { createWords } from "./TestHelper";

jest.useFakeTimers();

describe("time limit", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("ends after timer is up", () => {
    const game: TimeLimitGame = new TimeLimitGame(
      createWords("hello world"),
      1
    );
    game.handleInput("h");
    jest.runAllTimers();
    expect(game.getGame().getGameState()).toBe(GameState.FINISHED);
  });

  it("never runs out of words", () => {
    const game: TimeLimitGame = new TimeLimitGame(
      createWords("hello world"),
      1
    );
    expect(game.getGame().getWords().length === 2);
    "hello".split("").forEach((c) => game.handleInput(c));
    game.handleInput(" ");
    game.handleInput(" ");
    game.handleInput(" ");
    game.handleInput(" ");
    expect(game.getGame().getWords().length === 6);
  });
});
