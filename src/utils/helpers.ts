import { SetterOrUpdater } from "recoil";

export const arrowUpHandler = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  startMenuOptionHighlightAtom: SetterOrUpdater<number>
) => {
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
) => {
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
