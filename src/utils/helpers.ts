import { SetterOrUpdater } from "recoil";

export const arrowUpHandler = (
  setHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean
) => {
  console.log(startAtom);
  if (startAtom) {
  } else {
    setHighlightAtom((prevHighlight) => {
      if (prevHighlight === null || prevHighlight === 1) {
        return 4;
      }

      return --prevHighlight;
    });
  }
};

export const arrowDownHandler = (
  setHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean
) => {
  console.log(startAtom);
  if (startAtom) {
  } else {
    setHighlightAtom((prevHighlight) => {
      if (prevHighlight === null || prevHighlight === 4) {
        return 1;
      }

      return ++prevHighlight;
    });
  }
};
