import { FC, useState, useLayoutEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { focusedState, highlightState, startState } from "@/recoil/atoms";
import { useWindowDimensions } from "@/hooks";

export const Background: FC = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [aspectRatio, setAspectRatio] = useState<boolean>(true);
  const resetFocusedAtom = useResetRecoilState(focusedState);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const [focusedAtom, setFocusedAtom] = useRecoilState(focusedState);
  const resetStartAtom = useResetRecoilState(startState);

  useLayoutEffect(() => {
    if (width) {
      if (width / height! >= 1.6) {
        setAspectRatio(true);
      } else {
        setAspectRatio(false);
      }
    }
  }, [width]);

  return (
    <div
      style={{ aspectRatio: aspectRatio ? "8/5" : "auto" }}
      className="relative h-full bg-[#008080] pt-[1.1994vh] pb-[4.4978vh] mx-auto overflow-hidden"
    >
      <div
        className="absolute inset-0"
        onClick={() => {
          resetStartAtom();

          if (highlightAtom.desktop > 90 && focusedAtom === "icon") {
            setHighlightAtom((currHighlight) => ({
              ...currHighlight,
              desktop: currHighlight.desktop - 90,
            }));
            resetFocusedAtom();

            return;
          }

          if (highlightAtom.desktop > 90) return setFocusedAtom("icon");

          resetFocusedAtom();
        }}
      />
      {children}
    </div>
  );
};
