import { FC, useEffect, useState } from "react";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import _ from "lodash";
import { desktopIcons } from "@/utils/constants";
import { options } from "@/components/taskbar/start-menu";
import { generateRandomNumber } from "@/utils/helpers";
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

export const handleArrowUp = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  startMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  if (startAtom) {
    startMenuOptionHighlightAtom((prevHighlight) => {
      if (prevHighlight === 0 || prevHighlight === 1) return options.length;

      return --prevHighlight;
    });
  } else {
    setDesktopIconHighlightAtom((prevHighlight) => {
      if (prevHighlight === 0 || prevHighlight === 1) return desktopIcons.length;

      return --prevHighlight;
    });
  }
};

export const handleArrowDown = (
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  startMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  if (startAtom) {
    startMenuOptionHighlightAtom((prevHighlight) => {
      if (prevHighlight === options.length) return 1;

      return ++prevHighlight;
    });
  } else {
    setDesktopIconHighlightAtom((prevHighlight) => {
      if (prevHighlight === desktopIcons.length) return 1;

      return ++prevHighlight;
    });
  }
};

export const handleKeydown = (
  desktopIconsRefAtom: HTMLDivElement[],
  desktopIconHighlightAtom: number,
  startAtom: boolean,
  startMenuOptionsRefAtom: HTMLDivElement[],
  startMenuOptionHighlightAtom: number
): void => {
  if (startAtom) {
    if (startMenuOptionHighlightAtom === 0) return;

    startMenuOptionsRefAtom[startMenuOptionHighlightAtom - 1].click();
  } else {
    if (desktopIconHighlightAtom === 0) return;

    const dblclick = new MouseEvent("dblclick", {
      view: window,
      bubbles: true,
    });

    desktopIconsRefAtom[desktopIconHighlightAtom - 1].dispatchEvent(dblclick);
  }
};

export const handleDefaultKeydown = (
  key: string,
  desktopIconHighlightAtom: number,
  setDesktopIconHighlightAtom: SetterOrUpdater<number>,
  startAtom: boolean,
  setStartMenuOptionHighlightAtom: SetterOrUpdater<number>
): void => {
  key = key.toLowerCase();

  if (startAtom) {
    let keyIndex: number = 0;

    const optionKeys = options.map(({ index, label }) => ({
      index: index,
      key: label[0].toLowerCase(),
    }));

    const optionKey = optionKeys.filter((optionKey) => optionKey.key === key);

    if (optionKey.length === 0) return;

    keyIndex = optionKey[0].index;

    setStartMenuOptionHighlightAtom(keyIndex);
  } else {
    let keyIndex: number = 0;

    const shortcutKeys = desktopIcons.map(({ index, label }) => ({
      index: index,
      key: label[0].toLowerCase(),
    }));

    const shortcutKey = shortcutKeys.filter(
      (shortcutKey) => shortcutKey.key === key
    );

    if (shortcutKey.length === 0) return;

    if (shortcutKey.length > 1) {
      if (desktopIconHighlightAtom !== shortcutKey[0].index) {
        keyIndex = shortcutKey[0].index;
      } else {
        shortcutKey.forEach((key, i) => {
          if (desktopIconHighlightAtom === key.index) {
            keyIndex = shortcutKey[(i + 1) % shortcutKey.length].index;
          }
        });
      }
    } else {
      keyIndex = shortcutKey[0].index;
    }

    setDesktopIconHighlightAtom(keyIndex);
  }
};

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

  useEffect(() => {
    if (bootAtom) {
      setLaunching(true);

      const launchStartupWindows = setTimeout(() => {
        setWindowsAtom((oldWindowsAtom) => [
          ..._.cloneDeep(oldWindowsAtom),
          About,
        ]);
        setLaunching(false);
      }, generateRandomNumber(1000, 2000));

      return () => clearTimeout(launchStartupWindows);
    }
  }, [bootAtom]);

  useEffect(() => {
    const keydownEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleArrowUp(
            setDesktopIconHighlightAtom,
            startAtom,
            setStartMenuOptionHighlightAtom
          );
          break;
        case "ArrowDown":
          handleArrowDown(
            setDesktopIconHighlightAtom,
            startAtom,
            setStartMenuOptionHighlightAtom
          );
          break;
        case "Enter":
          handleKeydown(
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
          handleDefaultKeydown(
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
