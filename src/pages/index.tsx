import { NextPage } from "next";
import { useResetRecoilState } from "recoil";
import {
  desktopIconHighlightState,
  focusedState,
  startState,
} from "@/recoil/atoms";
import { Background, Icons, Windows } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const resetDesktopIconHighlightAtom = useResetRecoilState(
    desktopIconHighlightState
  );
  const resetFocusedAtom = useResetRecoilState(focusedState);
  const resetStartAtom = useResetRecoilState(startState);

  return (
    <Background>
      <div
        className="absolute inset-0"
        onClick={() => {
          resetDesktopIconHighlightAtom();
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
