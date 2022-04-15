import { SetterOrUpdater } from "recoil";
import { options } from "@/components/taskbar/start-menu";
import { icons } from "@/components/desktop/icons";

export const generateRandomNumber = (
  min: number = 0,
  max: number = 1
): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const convertPxToVh = (px: number, screenHeight: number) =>
  px * (100 / screenHeight);

export const arrowUpHandler = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  startMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  if (startAtom) {
    startMenuOptionHighlightAtom((prevHighlight) => {
      if (prevHighlight === 0 || prevHighlight === 1) return 4;

      return --prevHighlight;
    });
  } else {
    setDesktopIconHighlightAtom((prevHighlight) => {
      if (prevHighlight === 0 || prevHighlight === 1) return 4;

      return --prevHighlight;
    });
  }
};

export const arrowDownHandler = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  startMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  if (startAtom) {
    startMenuOptionHighlightAtom((prevHighlight) => {
      if (prevHighlight === 4) return 1;

      return ++prevHighlight;
    });
  } else {
    setDesktopIconHighlightAtom((prevHighlight) => {
      if (prevHighlight === 4) return 1;

      return ++prevHighlight;
    });
  }
};

export const keydownEnterHandler = (
  desktopIconsRefAtom: HTMLDivElement[],
  desktopIconHighlightAtom: number,
  startAtom: boolean,
  startMenuOptionsRefAtom: HTMLDivElement[],
  startMenuOptionHighlightAtom: number
): void => {
  if (startAtom) {
    if (startMenuOptionHighlightAtom === 0) return;

    startMenuOptionsRefAtom[startMenuOptionHighlightAtom - 1].click();
  } else {
    if (desktopIconHighlightAtom === 0) return;

    const dblclick = new MouseEvent("dblclick", {
      view: window,
      bubbles: true,
    });

    desktopIconsRefAtom[desktopIconHighlightAtom - 1].dispatchEvent(dblclick);
  }
};

export const keydownDefaultHandler = (
  key: string,
  desktopIconHighlightAtom: number,
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  setStartMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  key = key.toLowerCase();

  if (startAtom) {
    let keyIndex: number = 0;

    const optionKeys = options.map(({ index, label }) => ({
      index: index,
      key: label[0].toLowerCase(),
    }));

    const optionKey = optionKeys.filter((optionKey) => optionKey.key === key);

    if (optionKey.length === 0) return;

    keyIndex = optionKey[0].index;

    setStartMenuOptionHighlightAtom(keyIndex);
  } else {
    let keyIndex: number = 0;

    const shortcutKeys = icons.map(({ index, label }) => ({
      index: index,
      key: label[0].toLowerCase(),
    }));

    const shortcutKey = shortcutKeys.filter(
      (shortcutKey) => shortcutKey.key === key
    );

    if (shortcutKey.length === 0) return;

    if (shortcutKey.length > 1) {
      if (desktopIconHighlightAtom !== shortcutKey[0].index) {
        keyIndex = shortcutKey[0].index;
      } else {
        shortcutKey.forEach((key, i) => {
          if (desktopIconHighlightAtom === key.index) {
            keyIndex = shortcutKey[(i + 1) % shortcutKey.length].index;
          }
        });
      }
    } else {
      keyIndex = shortcutKey[0].index;
    }

    setDesktopIconHighlightAtom(keyIndex);
  }
};
