import { NextPage } from "next";
import { useSetRecoilState } from "recoil";
import { desktopIconHighlightState, startState } from "@/recoil/atoms";
import { Background, Icons } from "@/components/desktop";
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
      <Icons />
      <Taskbar />
    </Background>
  );
};

export default Desktop;
