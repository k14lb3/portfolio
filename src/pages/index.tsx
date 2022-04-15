import { NextPage } from "next";
import { useSetRecoilState } from "recoil";
import { desktopIconHighlightState, startState } from "@/recoil/atoms";
import { Background, Icons, Windows } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const setDesktopIconHighlightAtom = useSetRecoilState(
    desktopIconHighlightState
  );
  const setStartAtom = useSetRecoilState(startState);

  return (
    <Background>
      <div
        className="absolute inset-0"
        onClick={() => {
          setDesktopIconHighlightAtom(0);
          setStartAtom(false);
        }}
      />
      <div className="w-fit ml-[1.1994vh]" onClick={() => setStartAtom(false)}>
        <Icons />
      </div>
      <Windows />
      <Taskbar />
    </Background>
  );
};

export default Desktop;
