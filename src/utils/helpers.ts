import { SetterOrUpdater } from "recoil";
import { options } from "@/components/taskbar/start-menu";
import { icons } from "@/components/desktop/icons";

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
  startMenuOptionHighlightAtom: number,
  setStartMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  if (startAtom) {
    let keyIndex: number = 0;

    const optionKeys = options.map(({ index, filename }) => ({
      index: index,
      key: filename[0],
    }));
    const optionKey = optionKeys.filter((optionKey) => optionKey.key === key);

    if (optionKey.length === 0) return;

    keyIndex = optionKey[0].index;

    setStartMenuOptionHighlightAtom(keyIndex);
  } else {
    let keyIndex: number = 0;

    const shortcutKeys = icons.map(({ index, filename }) => ({
      index: index,
      key: filename[0],
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
