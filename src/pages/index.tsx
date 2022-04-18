import { NextPage } from "next";
import { useResetRecoilState } from "recoil";
import {
  desktopIconHighlightState,
  focusedWindowState,
  startState,
} from "@/recoil/atoms";
import { Background, Icons, Windows } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const resetDesktopIconHighlightAtom = useResetRecoilState(
    desktopIconHighlightState
  );
  const resetFocusedWindowAtom = useResetRecoilState(focusedWindowState);
  const resetStartAtom = useResetRecoilState(startState);

  return (
    <Background>
      <div
        className="absolute inset-0"
        onClick={() => {
          resetDesktopIconHighlightAtom();
          resetFocusedWindowAtom();
          resetStartAtom();
        }}
      />
      <div
        className="w-fit ml-[1.1994vh]"
        onClick={() => {
          resetStartAtom();
          resetFocusedWindowAtom();
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
