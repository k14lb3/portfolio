import { SetterOrUpdater } from "recoil";

export const arrowUpHandler = (setHighlightAtom : SetterOrUpdater<number>) => {
  setHighlightAtom((prevHighlight) => {
    if (prevHighlight === null || prevHighlight === 1) {
      return 4;
    }

		return --prevHighlight
  });
};

export const arrowDownHandler = (setHighlightAtom : SetterOrUpdater<number>) => {
  setHighlightAtom((prevHighlight) => {

    if (prevHighlight === null || prevHighlight === 4) {
      return 1;
    }
		
		
		return ++prevHighlight

  });
};
