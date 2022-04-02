import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRecoilState, useSetRecoilState } from "recoil";
import { arrowUpHandler, arrowDownHandler } from "@/utils/helpers";
import { highlightState, startState } from "@/recoil/atoms";
import Background from "@/components/background";
import { Icons, Taskbar } from "@/components/desktop";

const Desktop: NextPage = () => {
  const setHighlightAtom = useSetRecoilState(highlightState);
  const [startAtom, setStartAtom] = useRecoilState(startState);

  useEffect(() => {
    const highlightIcon = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          arrowUpHandler(setHighlightAtom, startAtom);
          break;
        case "ArrowDown":
          arrowDownHandler(setHighlightAtom, startAtom);
          break;
      }
    };

    window.addEventListener("keydown", highlightIcon);

    return () => {
      window.removeEventListener("keydown", highlightIcon);
    };
  }, [startAtom]);

  return (
    <Background>
      <Head>
        <title>Karl Ivan Alberto | Portfolio</title>
      </Head>
      <div
        className="absolute inset-0"
        onClick={() => {
          setHighlightAtom(0);
          setStartAtom(false);
        }}
      />
      <Icons />
      <Taskbar />
    </Background>
  );
};

export default Desktop;
