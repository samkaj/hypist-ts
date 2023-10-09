import Word from "../Word";

export const createWords = (sentence: string): Array<Word> => {
  return sentence.split(" ").map((s) => new Word(s));
};
