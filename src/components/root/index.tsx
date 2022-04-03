import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  arrowUpHandler,
  arrowDownHandler,
  keydownDefaultHandler,
} from "@/utils/helpers";
import {
  desktopIconHighlightState,
  startState,
  startMenuOptionHighlightState,
} from "@/recoil/atoms";

const Root: FC = ({ children }) => {
  const [desktopIconHighlightAtom, setDesktopIconHighlightAtom] =
    useRecoilState(desktopIconHighlightState);
  const startAtom = useRecoilValue(startState);
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
        default:
          keydownDefaultHandler(
            e.key,
            desktopIconHighlightAtom,
            setDesktopIconHighlightAtom,
            startAtom
          );
      }
    };

    window.addEventListener("keydown", keydownEvents);

    return () => {
      window.removeEventListener("keydown", keydownEvents);
    };
  }, [startAtom, desktopIconHighlightAtom]);

  useEffect(() => {
    if (!startAtom) {
      setStartMenuOptionHighlightAtom(0);
    }
  }, [startAtom]);
	
  return <>{children}</>;
};

export default Root;
