import {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  useRef,
  useEffect,
  useState,
} from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import { Coordinates } from "@/utils/constants";
import {
  startState,
  topMostWindowState,
  focusedState,
  windowsState,
} from "@/recoil/atoms";
import { useWindowDimensions, useMousePosition } from "@/hooks";
import { convertPxToVh } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { TitleBar } from "./title-bar";

export type WindowProps = Explorer | Properties;

interface WindowBase
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  minimize?: { visible: false } | { visible: true; disabled: boolean };
  maximize?: { visible: false } | { visible: true; disabled: boolean };
  initPos?: Coordinates;
}

interface Explorer extends WindowBase {
  type: "explorer";
  icon: "default" | { src: string };
}

interface Properties extends WindowBase {
  type: "properties";
  icon?: undefined;
}

const Window: FC<WindowProps> = ({
  title,
  type,
  icon,
  minimize,
  maximize,
  className,
  children,
  ...rest
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const mousePos = useMousePosition();
  const parentRef = useRef<HTMLDivElement>(null);
  const setStartAtom = useSetRecoilState(startState);
  const setWindowsAtom = useSetRecoilState(windowsState);
  const [topMostWindowAtom, setTopMostWindowAtom] =
    useRecoilState(topMostWindowState);
  const resetFocusedAtom = useResetRecoilState(focusedState);
  const setFocusedAtom = useSetRecoilState(focusedState);
  const [windowPos, setWindowPos] = useState<Coordinates>({
    x: -9999,
    y: -9999,
  });
  const [positioned, setPositioned] = useState<boolean>(false);
  const [initDragPos, setInitDragPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [draggerPos, setDraggerPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<boolean>(false);

  useEffect(() => {
    setTopMostWindowAtom(title);
    setFocusedAtom(title);
  }, []);

  useEffect(() => {
    if (parentRef && screenHeight) {
      const screenWidthRatioed = screenHeight! * 1.6;

      const small = screenWidth! <= screenWidthRatioed;

      const pos = {
        x: convertPxToVh(
          (small ? screenWidth : screenWidthRatioed)! / 2 -
            parentRef.current!.clientWidth / 2,
          screenHeight!
        ),
        y:
          convertPxToVh(
            screenHeight! / 2 - parentRef.current!.clientHeight / 2,
            screenHeight!
          ) - 4.5,
      };

      setWindowPos(pos);
      setDraggerPos(pos);
      setPositioned(true);
    }
  }, [parentRef, screenHeight]);

  useEffect(() => {
    if (drag) {
      setDraggerPos({
        x: convertPxToVh(mousePos.x, screenHeight!) - initDragPos.x,
        y: convertPxToVh(mousePos.y, screenHeight!) - initDragPos.y,
      });
    }
  }, [mousePos]);

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    setInitDragPos({
      x: convertPxToVh(
        mousePos.x - parentRef.current!.offsetLeft,
        screenHeight!
      ),
      y: convertPxToVh(
        mousePos.y - parentRef.current!.offsetTop,
        screenHeight!
      ),
    });

    setDrag(true);
  };

  const handleMouseUp = () => {
    setDrag(false);

    setWindowPos(draggerPos);
  };

  const closeWindow = () => {
    setWindowsAtom((oldWindowsAtom) =>
      oldWindowsAtom.filter(({ props }) => props.title !== title)
    );
    resetFocusedAtom();
  };

  return (
    <>
      <div
        ref={parentRef}
        style={{
          top: `${windowPos.y}vh`,
          left: `${windowPos.x}vh`,
        }}
        className={`absolute flex border-solid border-[0.1vh] border-t-[#DFDFDF] border-l-[#DFDFDF] border-black${
          topMostWindowAtom === title ? " z-[99]" : ""
        }${positioned ? "" : "invisible"}${className ? ` ${className}` : ""}`}
        onMouseDown={() => {
          setStartAtom(false);
          setTopMostWindowAtom(title);
          setFocusedAtom(title);
        }}
        {...rest}
      >
        <div className="h-full w-full border-solid border-[0.1vh] border-[#808080] border-t-white border-l-white">
          <div
            className={`flex flex-col h-full w-full bg-[#C0C0C0] ${
              type! === "explorer" ? "p-[0.3vh]" : "p-[0.15vh] "
            }`}
          >
            <TitleBar
              title={title}
              type={type}
              icon={icon}
              minimize={minimize}
              maximize={maximize}
              closeWindow={closeWindow}
              onMouseDown={handleMouseDown}
            />
            {type === "explorer" ? (
              <div className="h-full border-solid border-[0.1vh] border-white border-t-[#808080] border-l-[#808080] mt-[0.2999vh]">
                <div className="h-full py-[1.1994vh] px-[1.1994vh] bg-white border-solid border-[0.1vh] border-[#DFDFDF] border-t-black border-l-black">
                  {children}
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-grow p-[0.8996vh] pt-[1.1994vh]">
                <div className="flex-grow mb-[0.8996vh] border-solid border-[0.1vh] border-black border-t-white border-l-white">
                  <div className="h-full px-[1.1994vh] bg-[#C0C0C0] border-solid border-[0.1vh] border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]">
                    {children}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button autoFocus onClick={closeWindow}>
                    OK
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {drag && (
        <div
          style={{
            top: `${draggerPos.y}vh`,
            left: `${draggerPos.x}vh`,
            height: `${convertPxToVh(
              parentRef.current!.clientHeight,
              screenHeight!
            )}vh`,
            width: `${convertPxToVh(
              parentRef.current!.clientWidth,
              screenHeight!
            )}vh`,
          }}
          className="absolute border-dotted border-[0.1vh] border-[#FF7F7F] z-[999]"
          onMouseUp={handleMouseUp}
        >
          {type === "explorer" && (
            <div className="h-full border-dotted border-[0.1vh] border-[#FF7F7F]">
              <div className="h-full border-dotted border-[0.1vh] border-[#FF7F7F]">
                <div className="h-full border-dotted border-[0.1vh] border-[#FF7F7F]"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Window;
