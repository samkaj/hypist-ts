export enum Gamemode {
  Timed,
  Words,
}

export type User = {
  name: string;
  email: string;
};

export type Settings = {
  gamemode: Gamemode;
  amount: number;
  duration: number;
};
