import { WindowProps } from "@/components/window";
import { FC } from "react";
import { atom } from "recoil";

export const visitorIpState = atom({
  key: "visitorIpState",
  default: "" as string,
});

export const visitorsState = atom({
  key: "visitorsState",
  default: [] as string[],
});

export const bootState = atom({
  key: "bootState",
  default: false as boolean,
});

export const focusedState = atom({
  key: "focusedWindow",
  default: "desktop" as string,
});

export interface HighlightState {
  desktop: number;
  startMenu: number | number[];
  socials: number;
}

export const highlightState = atom({
  key: "highlightState",
  default: {
    desktop: 0,
    startMenu: 0,
    socials: 0,
  } as HighlightState,
});

export const startState = atom({
  key: "startState",
  default: false as boolean,
});

export const desktopIconsRefState = atom({
  key: "desktopIconsRefState",
  default: [] as HTMLDivElement[],
});

export const startMenuOptionsRefState = atom({
  key: "startMenuOptionsRefState",
  default: [] as (HTMLDivElement | [HTMLDivElement, HTMLDivElement[]])[],
});

export const windowsState = atom({
  key: "windowsState",
  default: [] as { component: FC<Partial<WindowProps>>; props: WindowProps }[],
});

export const topMostWindowState = atom({
  key: "topMostWindowState",
  default: "" as string,
});
