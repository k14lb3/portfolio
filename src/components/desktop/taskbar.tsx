import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { highlightState } from "@/recoil/atoms";
import Start from "@/components/start";
import Clock from "@/components/clock";

export const Taskbar: FC = () => {
  const setHighlightAtom = useSetRecoilState(highlightState);

  return (
    <div
      className="absolute bottom-0 left-0 h-8 w-full bg-taskbar-base taskbar-border"
      onClick={() => setHighlightAtom(0)}
    >
      <div className="flex items-center justify-between relative h-full w-full pt-[2px] px-0.5">
        <Start />
        <Clock />
      </div>
    </div>
  );
};
