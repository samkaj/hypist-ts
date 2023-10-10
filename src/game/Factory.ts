import TimeLimitGame from "./gamemodes/TimeLimit";
import WordLimitGame from "./gamemodes/WordLimit";
import generateWords from "./utils/WordGenerator";

export const createTimeLimitGame = (
  duration: number,
  amount: number = 100
): TimeLimitGame => {
  return new TimeLimitGame(generateWords(amount), duration);
};

export const createWordLimitGame = (amount: number): WordLimitGame => {
  return new WordLimitGame(generateWords(amount));
};
