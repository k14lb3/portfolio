import { atom } from "recoil";

export const startState = atom({
  key: "startState",
  default: false as boolean,
});
