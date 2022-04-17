import {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useEffect,
  useState,
} from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import { startState, windowsRefState, windowsState } from "@/recoil/atoms";
import { useWindowDimensions, useMousePosition } from "@/hooks";
import { convertPxToVh } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { TitleBar, TitleBarButton } from "./title-bar";

interface Coordinates {
  x: number;
  y: number;
}

export interface WindowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  minimize?: TitleBarButton;
  maximize?: TitleBarButton;
  type?: "explorer" | "properties";
  initPos?: Coordinates;
}

const Window: FC<WindowProps> = ({
  title,
  minimize,
  maximize,
  type,
  className,
  children,
  ...rest
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const mousePos = useMousePosition();
  const parentRef = useRef<HTMLDivElement>(null);
  const setStartAtom = useSetRecoilState(startState);
  const setWindowsAtom = useSetRecoilState(windowsState);
  const [windowsRefAtom, setWindowsRefAtom] = useRecoilState(windowsRefState);
  const [windowPos, setWindowPos] = useState<Coordinates>({
    x: -9999,
    y: -9999,
  });
  const [positioned, setPositioned] = useState<boolean>(false);
  const [initDragPos, setInitDragPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [draggerPos, setDraggerPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<boolean>(false);

  useEffect(() => {
    if (parentRef.current) {
      const ref = _.cloneDeep(parentRef).current as HTMLDivElement;

      setWindowsRefAtom((oldWindowsRefAtom) => [...oldWindowsRefAtom, ref]);

      return () =>
        setWindowsRefAtom((oldWindowsRefAtom) =>
          oldWindowsRefAtom.filter((window) => !_.isEqual(window, ref))
        );
    }
  }, [parentRef]);

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

  const handleMouseDown = () => {
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
      oldWindowsAtom.filter((window) => window.name !== title)
    );
  };

  return (
    <>
      <div
        ref={parentRef}
        style={{
          top: `${windowPos.y}vh`,
          left: `${windowPos.x}vh`,
        }}
        className={`absolute flex border-solid border-[0.1vh] border-black border-t-[#DFDFDF] border-l-[#DFDFDF] ${
          positioned ? "" : "invisible"
        }${className ? ` ${className}` : ""}`}
        onMouseDown={() => setStartAtom(false)}
        {...rest}
      >
        <div className="h-full w-full border-solid border-[0.1vh] border-[#808080] border-t-white border-l-white">
          <div
            className={`flex flex-col h-full w-full bg-[#C0C0C0] ${
              type! === "explorer" ? "p-[0.3vh]" : "p-[0.15vh] "
            }`}
          >
            <TitleBar
              title={
                title === "" ? type![0].toUpperCase() + type!.slice(1) : title
              }
              minimize={minimize}
              maximize={maximize}
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
          className="absolute border-dotted border-[0.1vh] border-[#FF7F7F]"
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

Window.defaultProps = {
  title: "",
  type: "explorer",
  minimize: { visible: true, disabled: false },
  maximize: { visible: true, disabled: false },
};

export default Window;
