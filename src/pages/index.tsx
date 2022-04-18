import { NextPage } from "next";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  desktopIconHighlightState,
  focusedWindowState,
  startState,
} from "@/recoil/atoms";
import { Background, Icons, Windows } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const setDesktopIconHighlightAtom = useSetRecoilState(
    desktopIconHighlightState
  );
  const resetFocusedWindowAtom = useResetRecoilState(focusedWindowState);
  const setStartAtom = useSetRecoilState(startState);

  return (
    <Background>
      <div
        className="absolute inset-0"
        onClick={() => {
          setDesktopIconHighlightAtom(0);
          resetFocusedWindowAtom();
          setStartAtom(false);
        }}
      />
      <div
        className="w-fit ml-[1.1994vh]"
        onClick={() => {
          setStartAtom(false);
          resetFocusedWindowAtom();
        }}
      >
        <Icons />
      </div>
      <Windows />
      <Taskbar
        onClick={() => {
          setDesktopIconHighlightAtom(0);
          resetFocusedWindowAtom()
        }}
      />
    </Background>
  );
};

export default Desktop;
