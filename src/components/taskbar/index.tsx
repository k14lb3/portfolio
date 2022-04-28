import { FC, useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  FocusedState,
  windowsState,
  focusedState,
  topMostWindowState,
  startState,
} from "@/recoil/atoms";
import { Start } from "./start";
import { Clock } from "./clock";

const Taskbar: FC = () => {
  const resetFocusedAtom = useResetRecoilState(focusedState);
  const [focusedAtom, setFocusedAtom] = useRecoilState(focusedState);
  const setStartAtom = useSetRecoilState(startState);
  const windowsAtom = useRecoilValue(windowsState);
  const setTopMostWindowAtom = useSetRecoilState(topMostWindowState);

  useEffect(() => {
    const keyupEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "x":
        case "x":
          setStartAtom(true);
          setFocusedAtom("start-menu");
          break;
        case "Escape":
          setStartAtom(false);
          break;
      }
    };

    window.addEventListener("keyup", keyupEvents);

    return () => {
      window.removeEventListener("keyup", keyupEvents);
    };
  }, [setFocusedAtom, setStartAtom]);

  return (
    <div
      className="absolute bottom-0 h-[4.5vh] w-full bg-[#C0C0C0] border-solid border-t-[0.1vh] border-[#DFDFDF] z-[999]"
      onMouseDown={() => setFocusedAtom("taskbar")}
    >
      <div className="h-full border-solid border-t-[0.1vh] border-white">
        <div className="flex items-center justify-between relative h-full w-full px-[0.2999vh]">
          <div
            className="absolute inset-0"
            onMouseDown={() => resetFocusedAtom()}
          />
          <Start />
          <div className="relative flex flex-grow items-center space-x-[0.4498vh] h-full mx-[0.5997vh]">
            {windowsAtom.map(
              ({ props }) =>
                props.type === "explorer" && (
                  <div
                    key={`${props.title}-task`}
                    className={`h-[3.3vh] aspect-[80/11] border-solid border-[0.1vh] ${
                      focusedAtom === props.title
                        ? "border-white border-t-black border-l-black"
                        : "border-black border-t-white border-l-white"
                    }`}
                    onClick={() => {
                      setFocusedAtom(props.title as FocusedState);
                      setTopMostWindowAtom(props.title);
                    }}
                  >
                    <div
                      className={`h-full border-solid border-[0.1vh] ${
                        focusedAtom === props.title
                          ? "pt-[0.1522vh] border-[#DFDFDF] border-t-[#808080] border-l-[#808080] bg-white"
                          : "border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]"
                      }`}
                    >
                      <div
                        className={`flex items-center h-full w-full px-[0.4498vh] ${
                          focusedAtom === props.title
                            ? "bg-checkered"
                            : "bg-[#C0C0C0]"
                        }`}
                      >
                        <div className="flex items-center h-[2.4vh] aspect-square">
                          <img
                            className="w-full"
                            src={
                              props.icon
                                ? props.icon
                                : "/static/images/icons/folder-opened.png"
                            }
                            alt={props.title}
                          />
                        </div>
                        <div
                          className={`h-full ml-[0.4498vh] text-[1.75vh] ${
                            focusedAtom === props.title
                              ? "font-bold"
                              : "pt-[0.2998vh] "
                          }`}
                        >
                          {props.title
                            .split("-")
                            .map(
                              (word) =>
                                word[0].toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
