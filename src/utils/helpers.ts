import { FC } from "react";
import { SetterOrUpdater } from "recoil";
import { WindowProps } from "@/components/window";

export const generateRandomNumber = (
  min: number = 0,
  max: number = 1
): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const convertPxToVh = (px: number, screenHeight: number) =>
  px * (100 / screenHeight);

export const convertVhtoPx = (vh: number, screenHeight: number) =>
  vh * (screenHeight / 100);

export const launchFile = (
  window: { component: FC<Partial<WindowProps>>; props: WindowProps },
  windowsAtom: {
    get: () => {
      component: FC<Partial<WindowProps>>;
      props: WindowProps;
    }[];
    set: SetterOrUpdater<
      {
        component: FC<Partial<WindowProps>>;
        props: WindowProps;
      }[]
    >;
  },
  setFocusedAtom: SetterOrUpdater<string>,
  setTopMostWindowAtom: SetterOrUpdater<string>
) => {
  const windows = windowsAtom.get();

  if (windows.length === 0) return windowsAtom.set([window]);

  if (windows.find(({ props }) => props.title === window.props.title)) {
    setFocusedAtom!(window.props.title);
    setTopMostWindowAtom!(window.props.title);
    return windows;
  }

  windowsAtom.set((currWindows) => [...currWindows, window]);
};
