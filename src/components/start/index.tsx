import { FC } from "react";
import { useRecoilState } from "recoil";
import { startState } from "@/recoil/atoms";
import { Menu } from "./menu";

const Start: FC = () => {
  const [startAtom, setStartAtom] = useRecoilState(startState);

  return (
    <div
      className={`h-6 w-[3.75rem] ${
        startAtom ? " bg-start-clicked" : " bg-start-default"
      } bg-cover`}
      onClick={() => setStartAtom(!startAtom)}
    >
      {startAtom && <Menu />}
    </div>
  );
};

export default Start;
