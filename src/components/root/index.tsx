import { FC, useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import _ from "lodash";
import { desktopIcons } from "@/utils/constants";
import { options } from "@/components/taskbar/start-menu";
import { generateRandomNumber, launchFile } from "@/utils/helpers";
import {
  bootState,
  HighlightState,
  highlightState,
  desktopIconsRefState,
  startMenuOptionsRefState,
  startState,
  windowsState,
} from "@/recoil/atoms";
import Boot from "@/components/boot";
import About, { props } from "@/components/about";

export const handleArrowUpKeydown = (
  setHighlightAtom: SetterOrUpdater<HighlightState>,
  startAtom: boolean
): void =>
  setHighlightAtom((oldHighlightAtom) => {
    if (startAtom) {
      if (oldHighlightAtom.startMenu === 0 || oldHighlightAtom.startMenu === 1)
        return {
          ...oldHighlightAtom,
          startMenu: options.length,
        };

      return {
        ...oldHighlightAtom,
        startMenu: oldHighlightAtom.startMenu - 1,
      };
    }

    if (oldHighlightAtom.desktop === 0 || oldHighlightAtom.desktop === 1)
      return {
        ...oldHighlightAtom,
        desktop: desktopIcons.length,
      };

    return {
      ...oldHighlightAtom,
      desktop: oldHighlightAtom.desktop - 1,
    };
  });

export const handleArrowDownKeydown = (
  setHighlightAtom: SetterOrUpdater<HighlightState>,
  startAtom: boolean
): void => {
  setHighlightAtom((oldHighlightAtom) => {
    if (startAtom) {
      if (oldHighlightAtom.startMenu === options.length)
        return {
          ...oldHighlightAtom,
          startMenu: 1,
        };

      return {
        ...oldHighlightAtom,
        startMenu: oldHighlightAtom.startMenu + 1,
      };
    }

    if (oldHighlightAtom.desktop === desktopIcons.length)
      return {
        ...oldHighlightAtom,
        desktop: 1,
      };

    return {
      ...oldHighlightAtom,
      desktop: oldHighlightAtom.desktop + 1,
    };
  });
};

export const handleEnterKeyup = (
  highlightAtom: HighlightState,
  desktopIconsRefAtom: HTMLDivElement[],
  startAtom: boolean,
  startMenuOptionsRefAtom: HTMLDivElement[]
): void => {
  if (startAtom) {
    if (highlightAtom.startMenu === 0) return;

    return startMenuOptionsRefAtom[highlightAtom.startMenu - 1].click();
  }

  if (highlightAtom.desktop === 0) return;

  const dblclick = new MouseEvent("dblclick", {
    view: window,
    bubbles: true,
  });

  desktopIconsRefAtom[highlightAtom.desktop - 1].dispatchEvent(dblclick);
};

export const handleDefaultKeydown = (
  key: string,
  highlightAtom: HighlightState,
  setHighlightAtom: SetterOrUpdater<HighlightState>,
  startAtom: boolean
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

    setHighlightAtom((oldHighlightAtom) => ({
      ...oldHighlightAtom,
      startMenu: keyIndex,
    }));
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
      if (highlightAtom.desktop !== shortcutKey[0].index) {
        keyIndex = shortcutKey[0].index;
      } else {
        shortcutKey.forEach((key, i) => {
          if (highlightAtom.desktop === key.index) {
            keyIndex = shortcutKey[(i + 1) % shortcutKey.length].index;
          }
        });
      }
    } else {
      keyIndex = shortcutKey[0].index;
    }

    setHighlightAtom((oldHighlightAtom) => ({
      ...oldHighlightAtom,
      desktop: keyIndex,
    }));
  }
};

const Root: FC = ({ children }) => {
  const bootAtom = useRecoilValue(bootState);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const [windowsAtom, setWindowsAtom] = useRecoilState(windowsState);
  const desktopIconsRefAtom = useRecoilValue(desktopIconsRefState);
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const startMenuOptionsRefAtom = useRecoilValue(startMenuOptionsRefState);
  const [launching, setLaunching] = useState<boolean>(false);

  useEffect(() => {
    if (bootAtom) {
      setLaunching(true);

      const launchStartupWindows = setTimeout(() => {
        launchFile({ component: About, props: props }, setWindowsAtom);
        setLaunching(false);
      }, generateRandomNumber(1000, 2000));

      return () => clearTimeout(launchStartupWindows);
    }
  }, [bootAtom]);

  useEffect(() => {
    if (!startAtom) {
      setHighlightAtom((oldHighlightAtom) => ({
        ...oldHighlightAtom,
        startMenu: 0,
      }));
    }
  }, [startAtom]);

  useEffect(() => {
    const keydownEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleArrowUpKeydown(setHighlightAtom, startAtom);
          break;
        case "ArrowDown":
          handleArrowDownKeydown(setHighlightAtom, startAtom);
          break;
        default:
          handleDefaultKeydown(
            e.key,
            highlightAtom,
            setHighlightAtom,
            startAtom
          );
      }
    };

    const keyupEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          handleEnterKeyup(
            highlightAtom,
            desktopIconsRefAtom,
            startAtom,
            startMenuOptionsRefAtom
          );
          break;
        case "Escape":
          if (highlightAtom.desktop !== 0)
            return setHighlightAtom((oldHighlightAtom) => ({
              ...oldHighlightAtom,
              desktop: 0,
            }));
          if (startAtom) return setStartAtom(false);
          break;
        case " ":
          setStartAtom(!startAtom);
          break;
      }
    };

    window.addEventListener("keydown", keydownEvents);
    window.addEventListener("keyup", keyupEvents);

    return () => {
      window.removeEventListener("keydown", keydownEvents);
      window.removeEventListener("keyup", keyupEvents);
    };
  }, [highlightAtom, startAtom, startMenuOptionsRefAtom, windowsAtom]);

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
