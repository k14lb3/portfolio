import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { WindowTitle, Focusable } from "@/utils/constants";
import { windowsState, focusState, startState } from "@/recoil/atoms";
import { topMostWindowState } from "@/recoil/selectors";
import { Start } from "./start";
import { Clock } from "./clock";

const Taskbar: FC = () => {
  const [focusAtom, setFocusAtom] = useRecoilState(focusState);
  const setStartAtom = useSetRecoilState(startState);
  const windowsAtom = useRecoilValue(windowsState);
  const setTopMostWindowSelector = useSetRecoilState(topMostWindowState);

  useEffect(() => {
    const keyupEvents = (e: KeyboardEvent) => {
      switch (e.key) {
        case "x":
        case "x":
          setStartAtom(true);
          setFocusAtom("start-menu");
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
  }, [setFocusAtom, setStartAtom]);

  return (
    <div className="absolute bottom-0 h-[4.5vh] w-full bg-[#C0C0C0] border-solid border-t-[0.1vh] border-[#DFDFDF] z-[999]">
      <div className="h-full border-solid border-t-[0.1vh] border-white">
        <div className="flex items-center justify-between relative h-full w-full px-[0.2999vh]">
          <div
            className="absolute inset-0"
            onMouseDown={() => setFocusAtom("taskbar")}
          />
          <Start />
          <div className="relative flex flex-grow items-center space-x-[0.4498vh] h-full mx-[0.5997vh]">
            <div
              className="absolute inset-0"
              onMouseDown={() => setFocusAtom("taskbar")}
            />
            {windowsAtom.map(({ props }) => {
              const focused = focusAtom === props.title;
              return (
                props.minimize.visible &&
                props.minimize.disabled === false && (
                  <div
                    key={`${props.title}-task`}
                    className={`relative h-[3.3vh] aspect-[80/11] border-solid border-[0.1vh] ${
                      focused
                        ? "border-white border-t-black border-l-black"
                        : "border-black border-t-white border-l-white"
                    }`}
                    onClick={() => {
                      if (focusAtom !== props.title) {
                        setFocusAtom(props.title as Focusable);
                        setTopMostWindowSelector(props.title as WindowTitle);

                        return;
                      }

                      setFocusAtom("taskbar");
                    }}
                  >
                    <div
                      className={`h-full border-solid border-[0.1vh] ${
                        focused
                          ? "pt-[0.1522vh] border-[#DFDFDF] border-t-[#808080] border-l-[#808080] bg-white"
                          : "border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]"
                      }`}
                    >
                      <div
                        className={`flex items-center h-full w-full px-[0.4498vh] ${
                          focused ? "bg-checkered" : "bg-[#C0C0C0]"
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
                            focused ? "font-bold" : "pt-[0.2998vh] "
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
              );
            })}
          </div>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
