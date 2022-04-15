import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import _ from "lodash";
import {
  arrowUpHandler,
  arrowDownHandler,
  keydownEnterHandler,
  keydownDefaultHandler,
  generateRandomNumber,
} from "@/utils/helpers";
import {
  bootState,
  windowsState,
  desktopIconsRefState,
  desktopIconHighlightState,
  startState,
  startMenuOptionsRefState,
  startMenuOptionHighlightState,
} from "@/recoil/atoms";
import Boot from "@/components/boot";
import About from "@/components/about";

const Root: FC = ({ children }) => {
  const bootAtom = useRecoilValue(bootState);
  const setWindowsAtom = useSetRecoilState(windowsState);
  const desktopIconsRefAtom = useRecoilValue(desktopIconsRefState);
  const [desktopIconHighlightAtom, setDesktopIconHighlightAtom] =
    useRecoilState(desktopIconHighlightState);
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const startMenuOptionsRefAtom = useRecoilValue(startMenuOptionsRefState);
  const [startMenuOptionHighlightAtom, setStartMenuOptionHighlightAtom] =
    useRecoilState(startMenuOptionHighlightState);
  const [launching, setLaunching] = useState<boolean>(false);

  const launchStartupWindows = () =>
    setWindowsAtom((oldWindowsAtom) => [..._.cloneDeep(oldWindowsAtom), About]);

  useEffect(() => {
    if (bootAtom) {
      setLaunching(true);
      setTimeout(() => {
        launchStartupWindows();
        setLaunching(false);
      }, generateRandomNumber(1000, 2000));
    }
  }, [bootAtom]);

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
        case "Enter":
          keydownEnterHandler(
            desktopIconsRefAtom,
            desktopIconHighlightAtom,
            startAtom,
            startMenuOptionsRefAtom,
            startMenuOptionHighlightAtom
          );
          break;
        case "Escape":
          if (desktopIconHighlightAtom !== 0)
            return setDesktopIconHighlightAtom(0);
          if (startAtom) return setStartAtom(false);
          break;
        case " ":
          setStartAtom(!startAtom);
          break;
        default:
          keydownDefaultHandler(
            e.key,
            desktopIconHighlightAtom,
            setDesktopIconHighlightAtom,
            startAtom,
            setStartMenuOptionHighlightAtom
          );
      }
    };

    window.addEventListener("keydown", keydownEvents);

    return () => {
      window.removeEventListener("keydown", keydownEvents);
    };
  }, [desktopIconHighlightAtom, startAtom, startMenuOptionHighlightAtom]);

  useEffect(() => {
    if (!startAtom) {
      setStartMenuOptionHighlightAtom(0);
    }
  }, [startAtom]);

  return bootAtom ? (
    <>
      {children}
      {launching && <div className="fixed inset-0 cursor-wait" />}
    </>
  ) : (
    <Boot />
  );
};

export default Root;
