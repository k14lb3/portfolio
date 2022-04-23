import { NextPage } from "next";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { highlightState, focusedState, startState } from "@/recoil/atoms";
import { Background, Icons, Windows } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const setHighlightAtom = useSetRecoilState(highlightState);
  const resetFocusedAtom = useResetRecoilState(focusedState);
  const resetStartAtom = useResetRecoilState(startState);

  return (
    <Background>
      <div
        className="absolute inset-0"
        onClick={() => {
          setHighlightAtom((currHighlight) => ({
            ...currHighlight,
            desktop: 0,
          }));
          resetFocusedAtom();
          resetStartAtom();
        }}
      />
      <div
        className="w-fit ml-[1.1994vh]"
        onClick={() => {
          resetStartAtom();
          resetFocusedAtom();
        }}
      >
        <Icons />
      </div>
      <Windows />
      <Taskbar />
    </Background>
  );
};

export default Desktop;
