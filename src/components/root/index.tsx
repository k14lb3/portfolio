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
import _ from "lodash";
import { db } from "@/firebase";
import { generateRandomNumber, launchFile } from "@/utils/helpers";
import {
  bootState,
  visitorIpState,
  visitorsState,
  highlightState,
  startState,
  windowsState,
  focusState,
  windowsPrecedenceState,
} from "@/recoil/atoms";
import Boot from "@/components/boot";
import { About, aboutProps } from "@/components/windows";

const Root: FC = ({ children }) => {
  const bootAtom = useRecoilValue(bootState);
  const setVisitorIpAtom = useSetRecoilState(visitorIpState);
  const setVisitorsAtom = useSetRecoilState(visitorsState);
  const setHighlightAtom = useSetRecoilState(highlightState);
  const setFocusAtom = useSetRecoilState(focusState);
  const startAtom = useRecoilValue(startState);
  const [windowsAtom, setWindowsAtom] = useRecoilState(windowsState);
  const setWindowsPrecedence = useSetRecoilState(windowsPrecedenceState);
  const [launching, setLaunching] = useState<boolean>(false);

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
  }, [setVisitorIpAtom]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "visitors"), orderBy("timestamp")),
        (snapshot) => setVisitorsAtom(snapshot.docs.map((doc) => doc.id))
      ),
    [setVisitorIpAtom, setVisitorsAtom]
  );

  useEffect(() => {
    if (bootAtom) {
      setLaunching(true);

      const launchStartupWindows = setTimeout(() => {
        launchFile(
          { component: About, props: aboutProps },
          { get: () => windowsAtom, set: setWindowsAtom },
          setFocusAtom,
          setWindowsPrecedence
        );
        setLaunching(false);
      }, generateRandomNumber(1000, 2000));

      return () => clearTimeout(launchStartupWindows);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootAtom]);

  useEffect(() => {
    if (!startAtom) {
      setHighlightAtom((currHighlight) => ({
        ...currHighlight,
        "start-menu": 0,
      }));
    }
  }, [startAtom, setHighlightAtom]);

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
