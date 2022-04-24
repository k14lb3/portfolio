import { NextPage } from "next";
import { useResetRecoilState } from "recoil";
import { startState } from "@/recoil/atoms";
import { Background, Icons, Windows } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const resetStartAtom = useResetRecoilState(startState);

  return (
    <Background>
      <div
        className="w-fit ml-[1.1994vh]"
        onClick={() => {
          resetStartAtom();
        }}
      >
        <Icons />
      </div>
      <Windows />
      <Taskbar />
    </Background>
  );
};

export default Desktop;
