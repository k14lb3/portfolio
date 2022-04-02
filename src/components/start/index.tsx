import { FC } from "react";
import { useRecoilState } from "recoil";
import { startState } from "@/recoil/atoms";

const Start: FC = () => {
  const [startAtom, setStartAtom] = useRecoilState(startState);

  return (
    <div
      className={`h-6 w-[3.75rem] ${
        startAtom ? " bg-start-clicked" : " bg-start-default"
      } bg-cover`}
      onClick={() => setStartAtom(!startAtom)}
    />
  );
};

export default Start;
