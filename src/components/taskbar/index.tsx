import { FC } from "react";
import { useResetRecoilState } from "recoil";
import { desktopIconHighlightState, focusedWindowState } from "@/recoil/atoms";
import { Start } from "./start";
import { Clock } from "./clock";

const Taskbar: FC = () => {
  const resetDesktopHighlightAtom = useResetRecoilState(
    desktopIconHighlightState
  );
  const resetFocusedWindowAtom = useResetRecoilState(focusedWindowState);

  return (
    <div
      className="absolute bottom-0 h-[4.5vh] w-full bg-[#C0C0C0] z-[999]"
      onMouseDown={() => resetDesktopHighlightAtom()}
    >
      <div className="bg-[#DFDFDF] h-[0.152vh] w-full" />
      <div className="bg-white h-[0.152vh] w-full" />
      <div className="flex items-center justify-between relative h-full w-full px-[0.2999vh]">
        <div
          className="absolute inset-0"
          onMouseDown={() => resetFocusedWindowAtom()}
        />
        <Start />
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;
