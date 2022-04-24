import { FC } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { startState, focusedState } from "@/recoil/atoms";
import { StartMenu } from "./start-menu";

export const Start: FC = () => {
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const resetFocusedAtom = useResetRecoilState(focusedState);
  return (
    <div
      className={`relative h-[3.3vh] aspect-[27/11] border-solid border-[0.1vh] ${
        startAtom
          ? "border-white border-t-black border-l-black"
          : "border-black border-t-white border-l-white"
      }`}
      onClick={() => setStartAtom(!startAtom)}
      onMouseDown={() => resetFocusedAtom()}
    >
      {startAtom && <StartMenu />}
      <div
        className={`h-full border-solid border-[0.1vh] ${
          startAtom
            ? "border-[#DFDFDF] border-t-[#808080] border-l-[#808080]"
            : "border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]"
        }`}
      >
        <div
          className={`flex items-center h-full w-full p-[0.2999vh] bg-[#C0C0C0] ${
            startAtom ? "pt-[0.4498vh] pl-[0.4498vh]" : ""
          }`}
        >
          <div className="flex items-center h-[2.4vh] aspect-square text-center">
            <img
              className="w-full"
              src="/static/images/icons/win95.png"
              alt="Start Icon"
            />
          </div>
          <div className="h-full ml-[0.4498vh] mb-[0.8996vh] text-[1.75vh] font-bold">
            Start
          </div>
        </div>
      </div>
    </div>
  );
};
