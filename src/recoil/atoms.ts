import { WindowProps } from "@/components/window";
import { FC } from "react";
import { atom } from "recoil";

export const visitorIpState = atom<string>({
  key: "visitorIpState",
  default: "",
});

export const visitorsState = atom<string[]>({
  key: "visitorsState",
  default: [],
});

export const bootState = atom<boolean>({
  key: "bootState",
  default: false,
});

export type FocusedState =
  | "desktop"
  | "about"
  | "socials"
  | "taskbar"
  | "start-menu"
  | "visitor-counter";

export const focusedState = atom<FocusedState>({
  key: "focusedWindow",
  default: "desktop",
});

export interface HighlightState {
  desktop: number;
  "start-menu": number | number[];
  socials: number;
}

export const highlightState = atom<HighlightState>({
  key: "highlightState",
  default: {
    desktop: 1,
    "start-menu": 0,
    socials: 1,
  },
});

export const startState = atom<boolean>({
  key: "startState",
  default: false,
});

export const windowsState = atom<
  { component: FC<Partial<WindowProps>>; props: WindowProps }[]
>({
  key: "windowsState",
  default: [],
});

export const windowsPrecedenceState = atom({
  key: "windowsPrecedenceState",
  default: "" as string,
});
