import { focusState } from "@/recoil/atoms";
import { FC, useState, useEffect } from "react";
import { useResetRecoilState } from "recoil";

export const Clock: FC = () => {
  const [time, setTime] = useState<string>("");
  const resetFocusAtom = useResetRecoilState(focusState);

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
      className="relative flex justify-center items-center h-[3.3vh] aspect-[126/44] border-solid border-[0.1vh] border-white border-t-[#808080] border-l-[#808080]"
      onMouseDown={() => resetFocusAtom()}
    >
      <time className="text-[1.5vh]">{time}</time>
    </div>
  );
};
