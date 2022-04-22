import { WindowProps } from "@/components/window";
import { FC } from "react";
import { atom } from "recoil";

export const bootState = atom({
  key: "bootState",
  default: false as boolean,
});

export const topMostWindowState = atom({
  key: "topMostWindowState",
  default: "" as string,
});

export const focusedState = atom({
  key: "focusedWindow",
  default: "" as string,
});

export const windowsState = atom({
  key: "windowsState",
  default: [] as { component: FC<Partial<WindowProps>>; props: WindowProps }[],
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
