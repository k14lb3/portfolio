import { FC } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { startState, focusedState } from "@/recoil/atoms";
import { StartMenu } from "./start-menu";

export const Start: FC = () => {
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const resetFocusedAtom = useResetRecoilState(focusedState);

  return (
    <div
      className={`relative h-[3.3vh] aspect-[27/11] ${
        startAtom ? "bg-start-clicked" : "bg-start-default"
      } bg-cover bg-no-repeat`}
      onClick={() => setStartAtom(!startAtom)}
      onMouseDown={() => resetFocusedAtom()}
    >
      {startAtom && <StartMenu />}
    </div>
  );
};
