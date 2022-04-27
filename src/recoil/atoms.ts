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
  "start-menu": number | number[];
  socials: number;
}

export const highlightState = atom({
  key: "highlightState",
  default: {
    desktop: 1,
    "start-menu": 0,
    socials: 1,
  } as HighlightState,
});

export const startState = atom({
  key: "startState",
  default: false as boolean,
});

export const windowsState = atom({
  key: "windowsState",
  default: [] as { component: FC<Partial<WindowProps>>; props: WindowProps }[],
});

export const topMostWindowState = atom({
  key: "topMostWindowState",
  default: "" as string,
});
