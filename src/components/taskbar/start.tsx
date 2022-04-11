import { FC } from "react";
import { useRecoilState } from "recoil";
import { startState } from "@/recoil/atoms";
import { StartMenu } from "./start-menu";

export const Start: FC = () => {
  const [startAtom, setStartAtom] = useRecoilState(startState);

  return (
    <div
      className={`h-[3.3vh] aspect-[27/11] ${
        startAtom ? "bg-start-clicked" : "bg-start-default"
      } bg-cover bg-no-repeat active:bg-start-clicked`}
      onClick={() => setStartAtom(!startAtom)}
    >
      {startAtom && <StartMenu />}
    </div>
  );
};
