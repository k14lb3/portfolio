import { FC, RefObject } from "react";
import { SetterOrUpdater } from "recoil";
import { HighlightState } from "@/recoil/atoms";
import { WindowProps } from "@/components/window";
import { File } from "./constants";
import { indexOf } from "lodash";

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
    setFocusedAtom(window.props.title.toLowerCase());
    setTopMostWindowAtom!(window.props.title);
    return windows;
  }

  windowsAtom.set((currWindows) => [...currWindows, window]);
};

export const openLink = (
  anchorRef: RefObject<HTMLAnchorElement>,
  url: string
) => {
  anchorRef.current!.href = url;
  anchorRef.current!.target = "_blank";
  anchorRef.current!.rel = "noopener noreferrer";
  anchorRef.current!.click();

  anchorRef.current!.removeAttribute("href");
  anchorRef.current!.removeAttribute("target");
  anchorRef.current!.removeAttribute("rel");
};

export const handleDefaultKeydown = (
  e: KeyboardEvent,
  files: File[],
  focusedAtom: string,
  setHighlightAtom: SetterOrUpdater<HighlightState>,
  property: keyof HighlightState
) => {
  if (focusedAtom !== property) return;

  const keys = files.map(({ index, label }) => ({
    index: index,
    key: label[0].toLowerCase(),
  }));

  const key = keys.filter((key) => key.key === e.key.toLowerCase());

  if (key.length === 0) return;

  setHighlightAtom((currHighlight) => ({
    ...currHighlight,
    [property]:
      // Check if the key variable has more than one element or
      // the currently highlighted file with the given property
      // does not have the same index with the index of the
      // first element of the key variable
      key.length === 1 || currHighlight[property] !== 90 + key[0].index
        ? // If true, return the highlighted index of the first element
          90 + key[0].index
        : // Otherwise, get the element in the key variable with
          // the index of currently highlighted file
          90 +
          key[
            indexOf(key, {
              index: 90 + (currHighlight[property] as number),
              key: key[0].key,
            }) + 2
          ].index,
  }));
};
