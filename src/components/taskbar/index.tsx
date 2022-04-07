import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { desktopIconHighlightState } from "@/recoil/atoms";
import { Start } from "./start";
import { Clock } from "./clock";

const Taskbar: FC = () => {
  const setDesktopIconHighlightAtom = useSetRecoilState(
    desktopIconHighlightState
  );

  return (
    <div
      className="absolute bottom-0 h-[4.5vh] w-full bg-[#C0C0C0]"
      onClick={() => setDesktopIconHighlightAtom(0)}
    >
      <div className="bg-[#DFDFDF] h-[0.152vh] w-full" />
      <div className="bg-white h-[0.152vh] w-full" />
      <div className="flex items-center justify-between relative h-full w-full px-[0.2999vh]">
        <Start />
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;
