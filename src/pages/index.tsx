import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSetRecoilState } from "recoil";
import { arrowUpHandler, arrowDownHandler } from "@/utils/helpers";
import { highlightState } from "@/recoil/atoms";
import Background from "@/components/background";
import Taskbar from "@/components/taskbar";
import { Icons } from "@/components/desktop";

const Desktop: NextPage = () => {
  const setHighlightAtom = useSetRecoilState(highlightState);

  useEffect(() => {
    const highlightIcon = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          arrowUpHandler(setHighlightAtom);
          break;
        case "ArrowDown":
          arrowDownHandler(setHighlightAtom);
          break;
      }
    };

    window.addEventListener("keydown", highlightIcon);

    return () => {
      window.removeEventListener("keydown", highlightIcon);
    };
  }, []);

  return (
    <Background>
      <Head>
        <title>Karl Ivan Alberto | Portfolio</title>
      </Head>
      <Icons />
      <Taskbar />
    </Background>
  );
};

export default Desktop;
