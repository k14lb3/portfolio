import { FC, useEffect, useState } from "react";
import {
  serverTimestamp,
  query,
  collection,
  doc,
  onSnapshot,
  getDoc,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import _, { curry } from "lodash";
import { db } from "@/firebase";
import { desktopIcons } from "@/utils/constants";
import { options } from "@/components/taskbar/start-menu";
import { generateRandomNumber, launchFile } from "@/utils/helpers";
import {
  bootState,
  visitorIpState,
  visitorsState,
  highlightState,
  desktopIconsRefState,
  startMenuOptionsRefState,
  startState,
  windowsState,
  focusedState,
  topMostWindowState,
} from "@/recoil/atoms";
import Boot from "@/components/boot";
import { About, aboutProps } from "@/components/windows";

const Root: FC = ({ children }) => {
  const bootAtom = useRecoilValue(bootState);
  const setVisitorIpAtom = useSetRecoilState(visitorIpState);
  const setVisitorsAtom = useSetRecoilState(visitorsState);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const windowsAtom = useRecoilValue(windowsState);
  const focusedAtom = useRecoilValue(focusedState);
  const desktopIconsRefAtom = useRecoilValue(desktopIconsRefState);
  const [startAtom, setStartAtom] = useRecoilState(startState);
  const startMenuOptionsRefAtom = useRecoilValue(startMenuOptionsRefState);
  const [launching, setLaunching] = useState<boolean>(false);

  const handleArrowUpKeydown = () => {
    if (startAtom) {
      if (typeof highlightAtom.startMenu !== "number")
        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          startMenu: [
            (currHighlight.startMenu as number[])[0],
            (currHighlight.startMenu as number[])[1] - 1,
          ],
        }));

      if (highlightAtom.startMenu === 0 || highlightAtom.startMenu === 1)
        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          startMenu: options.length,
        }));

      return setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        startMenu: (currHighlight.startMenu as number) - 1,
      }));
    }

    if (focusedAtom === "desktop") {
      if (highlightAtom.desktop === 90)
        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          desktop: 90 + desktopIcons.length,
        }));

      if (highlightAtom.desktop === 1 || highlightAtom.desktop === 90 + 1)
        return;

      return setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        desktop:
          (highlightAtom.desktop < 90 ? 90 : 0) + currHighlight.desktop - 1,
      }));
    }
  };

  const handleArrowDownKeydown = () => {
    if (startAtom) {
      if (typeof highlightAtom.startMenu !== "number")
        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          startMenu: [
            (currHighlight.startMenu as number[])[0],
            (currHighlight.startMenu as number[])[1] + 1,
          ],
        }));

      if (highlightAtom.startMenu === options.length)
        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          startMenu: 1,
        }));

      return setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        startMenu: (currHighlight.startMenu as number) + 1,
      }));
    }

    if (focusedAtom === "desktop") {
      if (
        highlightAtom.desktop === desktopIcons.length ||
        highlightAtom.desktop === 90 + desktopIcons.length
      )
        return;

      return setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        desktop:
          (highlightAtom.desktop < 90 ? 90 : 0) + currHighlight.desktop + 1,
      }));
    }
  };

  const handleArrowRightKeydown = () =>
    setHighlightAtom((currHighlight) => {
      if (currHighlight.startMenu !== 1) return currHighlight;

      return {
        ...currHighlight,
        startMenu: [1, 1],
      };
    });

  const handleArrowLeftKeydown = () =>
    setHighlightAtom((currHighlight) => {
      if (typeof highlightAtom.startMenu === "number") return currHighlight;

      return {
        ...currHighlight,
        startMenu: (currHighlight.startMenu as number[])[0],
      };
    });

  const handleEnterKeyup = () => {
    if (startAtom) {
      if (highlightAtom.startMenu === 0) return;

      if (typeof highlightAtom.startMenu !== "number") {
        const index = highlightAtom.startMenu[0] - 1;
        const subIndex = highlightAtom.startMenu[1] - 1;

        return (
          (
            startMenuOptionsRefAtom[index] as [HTMLDivElement, HTMLDivElement[]]
          )[1][subIndex] as HTMLDivElement
        ).click();
      }

      return (
        startMenuOptionsRefAtom[
          (highlightAtom.startMenu as number) - 1
        ] as HTMLDivElement
      ).click();
    }

    if (highlightAtom.desktop === 0) return;

    const dblclick = new MouseEvent("dblclick", {
      view: window,
      bubbles: true,
    });

    desktopIconsRefAtom[highlightAtom.desktop - 1].dispatchEvent(dblclick);
  };

  const handleDefaultKeydown = (key: string) => {
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

      setHighlightAtom((currHighlight) => ({
        ...currHighlight,
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

      setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        desktop: keyIndex,
      }));
    }
  };

  useEffect(() => {
    const getIp = async () => {
      const data = await (
        await fetch("https://geolocation-db.com/json/")
      ).json();

      const ip = data["IPv4"];

      return ip;
    };

    const setVisitor = async () => {
      const ip = await getIp();

      setVisitorIpAtom(ip);

      const visitorDoc = await getDoc(doc(db, "visitors", ip));

      if (visitorDoc.exists()) return;

      await setDoc(doc(db, "visitors", ip), {
        timestamp: serverTimestamp(),
      });
    };

    setVisitor();
  }, []);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "visitors"), orderBy("timestamp")),
        (snapshot) => setVisitorsAtom(snapshot.docs.map((doc) => doc.id))
      ),
    []
  );

  useEffect(() => {
    if (bootAtom) {
      setLaunching(true);

      const launchStartupWindows = setTimeout(() => {
        // launchFile(
        //   { component: About, props: aboutProps },
        //   { get: () => windowsAtom, set: setWindowsAtom },
        //   setFocusedAtom,
        //   setTopMostWindowAtom
        // );
        setLaunching(false);
      }, generateRandomNumber(1000, 2000));

      return () => clearTimeout(launchStartupWindows);
    }
  }, [bootAtom]);

  useEffect(() => {
    if (!startAtom) {
      setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        startMenu: 0,
      }));
    }
  }, [startAtom]);

  useEffect(() => {
    const keydownEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleArrowUpKeydown();
          break;
        case "ArrowDown":
          handleArrowDownKeydown();
          break;
        case "ArrowRight":
          handleArrowRightKeydown();
          break;
        case "ArrowLeft":
          handleArrowLeftKeydown();
          break;
        default:
          handleDefaultKeydown(e.key);
      }
    };

    const keyupEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          handleEnterKeyup();
          break;
        case "Escape":
          if (highlightAtom.desktop !== 0)
            return setHighlightAtom((currHighlight) => ({
              ...currHighlight,
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
  }, [
    startAtom,
    startMenuOptionsRefAtom,
    highlightAtom,
    windowsAtom,
    focusedAtom,
  ]);

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
