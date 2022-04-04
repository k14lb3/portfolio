import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  arrowUpHandler,
  arrowDownHandler,
  keydownEnterHandler,
  keydownDefaultHandler,
} from "@/utils/helpers";
import {
  desktopIconsRefState,
  desktopIconHighlightState,
  startState,
  startMenuOptionsRefState,
  startMenuOptionHighlightState,
} from "@/recoil/atoms";

const Root: FC = ({ children }) => {
  const desktopIconsRefAtom = useRecoilValue(desktopIconsRefState);
  const [desktopIconHighlightAtom, setDesktopIconHighlightAtom] =
    useRecoilState(desktopIconHighlightState);
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const startMenuOptionsRefAtom = useRecoilValue(startMenuOptionsRefState);
  const [startMenuOptionHighlightAtom, setStartMenuOptionHighlightAtom] =
    useRecoilState(startMenuOptionHighlightState);

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
            startMenuOptionHighlightAtom,
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

  return <>{children}</>;
};

export default Root;
