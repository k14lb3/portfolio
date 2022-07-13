import {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  useRef,
  useEffect,
  useState,
} from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import _, { indexOf } from 'lodash';
import {
  Coordinates,
  WindowTitle,
  Focusable,
  Highlight,
} from '@/utils/constants';
import {
  startState,
  highlightState,
  focusState,
  windowsState,
  windowsPrecedenceState,
} from '@/recoil/atoms';
import { useWindowDimensions, useMousePosition } from '@/hooks';
import { convertPxToVh } from '@/utils/helpers';
import { Button } from '@/components/ui';
import { TitleBar } from './title-bar';
import { topMostWindowState } from '@/recoil/selectors';

export interface WindowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: Focusable;
  type: 'explorer' | 'properties';
  plain?: boolean;
  icon?: string;
  minimize: { visible: false } | { visible: true; disabled: boolean };
  maximize: { visible: false } | { visible: true; disabled: boolean };
  initPos?: Coordinates;
}

const Window: FC<WindowProps> = ({
  title,
  type,
  plain,
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
  const setHighlightAtom = useSetRecoilState(highlightState);
  const setWindowsAtom = useSetRecoilState(windowsState);
  const [windowsPrecedenceAtom, setWindowsPrecedenceAtom] = useRecoilState(
    windowsPrecedenceState,
  );
  const setTopMostWindowSelector = useSetRecoilState(topMostWindowState);
  const resetFocusAtom = useResetRecoilState(focusState);
  const setFocusAtom = useSetRecoilState(focusState);
  const [windowPos, setWindowPos] = useState<Coordinates>({
    x: -9999,
    y: -9999,
  });
  const [positioned, setPositioned] = useState<boolean>(false);
  const [initDragPos, setInitDragPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [draggerPos, setDraggerPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<boolean>(false);

  useEffect(() => {
    setFocusAtom(title);
    setTopMostWindowSelector(title as WindowTitle);
  }, [title, setFocusAtom, setTopMostWindowSelector]);

  useEffect(() => {
    if (parentRef && screenHeight) {
      const screenWidthRatioed = screenHeight! * 1.6;

      const small = screenWidth! <= screenWidthRatioed;

      const pos = {
        x: convertPxToVh(
          (small ? screenWidth : screenWidthRatioed)! / 2 -
            parentRef.current!.clientWidth / 2,
          screenHeight!,
        ),
        y:
          convertPxToVh(
            screenHeight! / 2 - parentRef.current!.clientHeight / 2,
            screenHeight!,
          ) - 4.5,
      };

      setWindowPos(pos);
      setDraggerPos(pos);
      setPositioned(true);
    }
  }, [parentRef, screenWidth, screenHeight]);

  useEffect(() => {
    if (drag) {
      setDraggerPos({
        x: convertPxToVh(mousePos.x, screenHeight!) - initDragPos.x,
        y: convertPxToVh(mousePos.y, screenHeight!) - initDragPos.y,
      });
    }
  }, [drag, initDragPos, mousePos, screenHeight]);

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    setInitDragPos({
      x: convertPxToVh(
        mousePos.x - parentRef.current!.offsetLeft,
        screenHeight!,
      ),
      y: convertPxToVh(
        mousePos.y - parentRef.current!.offsetTop,
        screenHeight!,
      ),
    });

    setDrag(true);
  };

  const handleMouseUp = () => {
    setDrag(false);

    setWindowPos(draggerPos);
  };

  const closeWindow = () => {
    setWindowsAtom((currHighlight) =>
      currHighlight.filter(({ props }) => props.title !== title),
    );

    resetFocusAtom();

    setWindowsPrecedenceAtom((currWindowsPrecedence) =>
      currWindowsPrecedence.filter((_title) => _title !== title),
    );

    if (type !== 'explorer') return;

    setHighlightAtom((currHighlight) => {
      const _title = title as keyof Highlight;

      return {
        ...currHighlight,
        [_title]:
          (currHighlight[_title] as number) -
          (currHighlight[_title] > 90 ? 90 : 0),
      };
    });
  };

  return (
    <>
      <div
        ref={parentRef}
        style={{
          top: `${windowPos.y}vh`,
          left: `${windowPos.x}vh`,
          zIndex: indexOf(windowsPrecedenceAtom, title) + 1,
        }}
        className={`absolute flex border-solid border-[0.1vh] border-t-alto border-l-alto border-black${
          positioned ? '' : 'invisible'
        }${className ? ` ${className}` : ''}`}
        onMouseDown={() => {
          setStartAtom(false);
          setTopMostWindowSelector(title as WindowTitle);
          setFocusAtom(title);
        }}
        {...rest}
      >
        <div className="h-full w-full border-solid border-[0.1vh] border-gray border-t-white border-l-white">
          <div
            className={`flex flex-col h-full w-full bg-silver ${
              type! === 'explorer' ? 'p-[0.3vh]' : 'p-[0.15vh] '
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
            {type === 'explorer' ? (
              <div className="h-full border-solid border-[0.1vh] border-white border-t-gray border-l-gray mt-[0.2999vh]">
                <div className="relative h-full py-[1.1994vh] px-[1.1994vh] bg-white border-solid border-[0.1vh] border-alto border-t-black border-l-black">
                  {children}
                </div>
              </div>
            ) : !plain ? (
              <div className="flex flex-col flex-grow p-[0.8996vh] pt-[1.1994vh]">
                <div className="flex-grow mb-[0.8996vh] border-solid border-[0.1vh] border-black border-t-white border-l-white">
                  <div className="relative h-full px-[1.1994vh] bg-silver border-solid border-[0.1vh] border-gray border-t-alto border-l-alto">
                    {children}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button autoFocus onClick={closeWindow}>
                    OK
                  </Button>
                </div>
              </div>
            ) : (
              <>{children}</>
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
              screenHeight!,
            )}vh`,
            width: `${convertPxToVh(
              parentRef.current!.clientWidth,
              screenHeight!,
            )}vh`,
          }}
          className="absolute border-dotted border-[0.1vh] border-pink z-[999]"
          onMouseUp={handleMouseUp}
        >
          {type === 'explorer' && (
            <div className="h-full border-dotted border-[0.1vh] border-pink">
              <div className="h-full border-dotted border-[0.1vh] border-pink">
                <div className="h-full border-dotted border-[0.1vh] border-pink"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Window;
