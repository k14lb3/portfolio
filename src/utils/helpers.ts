import { SetterOrUpdater } from "recoil";

export const arrowUpHandler = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean
) => {
  console.log(startAtom);
  if (startAtom) {
  } else {
    setDesktopIconHighlightAtom((prevHighlight) => {
      if (prevHighlight === null || prevHighlight === 1) {
        return 4;
      }

      return --prevHighlight;
    });
  }
};

export const arrowDownHandler = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean
) => {
  console.log(startAtom);
  if (startAtom) {
  } else {
    setDesktopIconHighlightAtom((prevHighlight) => {
      if (prevHighlight === null || prevHighlight === 4) {
        return 1;
      }

      return ++prevHighlight;
    });
  }
};
