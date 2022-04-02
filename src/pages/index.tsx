import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRecoilState, useSetRecoilState } from "recoil";
import { arrowUpHandler, arrowDownHandler } from "@/utils/helpers";
import {
  desktopIconHighlightState,
  startState,
  startMenuOptionHighlightState,
} from "@/recoil/atoms";
import { Background, Icons } from "@/components/desktop";
import Taskbar from "@/components/taskbar";

const Desktop: NextPage = () => {
  const setDesktopIconHighlightAtom = useSetRecoilState(
    desktopIconHighlightState
  );
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const setStartMenuOptionHighlightAtom = useSetRecoilState(
    startMenuOptionHighlightState
  );

  useEffect(() => {
    const keydownEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          arrowUpHandler(
            setDesktopIconHighlightAtom,
            startAtom,
            setStartMenuOptionHighlightAtom
          );
          break;
        case "ArrowDown":
          arrowDownHandler(
            setDesktopIconHighlightAtom,
            startAtom,
            setStartMenuOptionHighlightAtom
          );
          break;
      }
    };

    window.addEventListener("keydown", keydownEvents);

    return () => {
      window.removeEventListener("keydown", keydownEvents);
    };
  }, [startAtom]);

  useEffect(() => {
    if (!startAtom) {
      setStartMenuOptionHighlightAtom(0);
    }
  }, [startAtom]);

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
