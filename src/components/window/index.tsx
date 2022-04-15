import {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useEffect,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import { startState } from "@/recoil/atoms";
import { useWindowDimensions, useMousePosition } from "@/hooks";
import { convertPxToVh } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { TitleBar, TitleBarButton } from "./title-bar";

interface Props {
  title?: string;
  minimize?: TitleBarButton;
  maximize?: TitleBarButton;
  type?: "explorer" | "properties";
}

interface Coordinates {
  x: number;
  y: number;
}

const Window: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props
> = ({ title, minimize, maximize, type, className, children }) => {
  const { height: screenHeight } = useWindowDimensions();
  const parentRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();
  const setStartAtom = useSetRecoilState(startState);
  const [initPos, setInitPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [windowPos, setWindowPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [draggerPos, setDraggerPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<boolean>(false);

  useEffect(() => {
    if (drag) {
      setDraggerPos({
        x: convertPxToVh(mousePos.x, screenHeight!) - initPos.x,
        y: convertPxToVh(mousePos.y, screenHeight!) - initPos.y,
      });
    }
  }, [mousePos]);

  const handleMouseDown = () => {
    setInitPos({
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

  return (
    <>
      <div
        ref={parentRef}
        style={{ top: `${windowPos.y}vh`, left: `${windowPos.x}vh` }}
        className={`absolute flex border-solid border-[0.1vh] border-black border-t-[#DFDFDF] border-l-[#DFDFDF] ${
          className ? ` ${className}` : ""
        }`}
        onMouseDown={() => setStartAtom(false)}
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
                <div className="flex justify-end space-x-[0.5997vh] ml-auto">
                  <Button autoFocus>OK</Button>
                  <Button>Cancel</Button>
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
