import { NextPage } from "next";
import Head from "next/head";
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
      <Head>
        <title>Karl Ivan Alberto | Portfolio</title>
      </Head>
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
