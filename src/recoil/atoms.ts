import { atom } from "recoil";

export const startState = atom({
  key: "startState",
  default: false as boolean,
});

export const highlightState = atom({
  key: "highlightState",
  default: 0 as number,
});
