import { atom } from "recoil";

export const startState = atom({
  key: "startState",
  default: false as boolean,
});

export const desktopIconHighlightState = atom({
  key: "desktopIconHighlightState",
  default: 0 as number,
});

export const startMenuOptionHighlightState = atom({
  key: "startMenuOptionHighlightState",
  default: 0 as number,
});
