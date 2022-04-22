import { FC } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  desktopIconHighlightState,
  windowsState,
  topMostWindowState,
  focusedState,
} from "@/recoil/atoms";
import { Start } from "./start";
import { Clock } from "./clock";

const Taskbar: FC = () => {
  const resetDesktopHighlightAtom = useResetRecoilState(
    desktopIconHighlightState
  );
  const resetFocusedAtom = useResetRecoilState(focusedState);
  const [focusedAtom, setFocusedAtom] =
    useRecoilState(focusedState);
  const setTopMostWindowAtom = useSetRecoilState(topMostWindowState);
  const windowsAtom = useRecoilValue(windowsState);

  return (
    <div
      className="absolute bottom-0 h-[4.5vh] w-full bg-[#C0C0C0] border-solid border-t-[0.1vh] border-[#DFDFDF] z-[999]"
      onMouseDown={() => resetDesktopHighlightAtom()}
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
                      setFocusedAtom(props.title);
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
                        <div className="h-[2.4vh] aspect-square">
                          <img
                            className="h-full"
                            src={
                              props.icon === "default"
                                ? "/static/images/icons/folder-opened.png"
                                : props.icon.src
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
                          {props.title}
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
