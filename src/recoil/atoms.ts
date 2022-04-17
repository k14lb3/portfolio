import { FC } from "react";
import { atom } from "recoil";
import { WindowProps } from "@/components/window";

export const bootState = atom({
  key: "bootState",
  default: false as boolean,
});

export const windowsState = atom({
  key: "windowsState",
  default: [] as FC<WindowProps>[],
});

export const windowsRefState = atom({
  key: "windowsRefState",
  default: [] as HTMLDivElement[],
});

export const desktopIconsRefState = atom({
  key: "desktopIconsRefState",
  default: [] as HTMLDivElement[],
});

export const startMenuOptionsRefState = atom({
  key: "startMenuOptionsRefState",
  default: [] as HTMLDivElement[],
});

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
