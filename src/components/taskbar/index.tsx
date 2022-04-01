import { FC, useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { highlightState, startState } from "@/recoil/atoms";
import Start from "./start";

const Taskbar: FC = () => {
  const setHighlightAtom = useSetRecoilState(highlightState);
  const [time, setTime] = useState<string>("");

  const setClock = () => {
    const date = new Date();

    setTime(
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  useEffect(() => {
    setClock();

    setInterval(() => setClock(), 60000);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 h-8 w-full bg-taskbar-base taskbar-border"
      onClick={() => setHighlightAtom(0)}
    >
      <div className="flex items-center justify-between relative h-full w-full pt-[2px] px-0.5">
        <Start />
        <div className="h-6 w-[4.25rem] bg-taskbar-clock bg-no-repeat bg-cover text-center">
          <time className="text-xs">{time}</time>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
