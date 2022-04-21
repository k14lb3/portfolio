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
  setWindowsAtom: SetterOrUpdater<
    {
      component: FC<Partial<WindowProps>>;
      props: WindowProps;
    }[]
  >
) =>
  setWindowsAtom((oldWindowsAtom) => {
    if (oldWindowsAtom.find(({ props }) => props.title === window.props.title))
      return oldWindowsAtom;

    return [...oldWindowsAtom, window];
  });
