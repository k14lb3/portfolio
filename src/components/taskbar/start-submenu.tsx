import {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useEffect,
} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import _ from "lodash";
import { highlightState, focusedState, startState } from "@/recoil/atoms";
import { startMenuFiles } from "@/utils/constants";
import { Container } from "./start-menu";

interface StartSubmenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  index: number;
  event: ((() => void)[] | (() => void))[];
}

export const StartSubmenu: FC<StartSubmenuProps> = ({
  index,
  event,
  ...rest
}) => {
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const focusedAtom = useRecoilValue(focusedState);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setStartAtom = useSetRecoilState(startState);

  useEffect(() => {
    if (optionsRef.current) {
      const handleArrowUpKeydown = () => {
        if (focusedAtom !== "start-menu") return;

        if ((highlightAtom["start-menu"] as number[])[1] === 1) return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          "start-menu": [
            (currHighlight["start-menu"] as number[])[0],
            (currHighlight["start-menu"] as number[])[1] - 1,
          ],
        }));
      };

      const handleArrowDownKeydown = () => {
        if (focusedAtom !== "start-menu") return;

        if (
          (highlightAtom["start-menu"] as number[])[1] ===
          startMenuFiles[index - 1].nested!.length
        )
          return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          "start-menu": [
            (currHighlight["start-menu"] as number[])[0],
            (currHighlight["start-menu"] as number[])[1] + 1,
          ],
        }));
      };

      const handleArrowLeftKeydown = () => {
        if (focusedAtom !== "start-menu") return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          "start-menu": (currHighlight["start-menu"] as number[])[0],
        }));
      };

      const handleEnterKeyup = () => {
        if (focusedAtom !== "start-menu") return;

        return optionsRef.current[
          (highlightAtom["start-menu"] as number[])[1] - 1
        ].click();
      };

      const keydownEvents = (e: KeyboardEvent) => {
        switch (e.key) {
          case "ArrowUp":
            handleArrowUpKeydown();
            break;
          case "ArrowDown":
            handleArrowDownKeydown();
            break;
          case "ArrowLeft":
            handleArrowLeftKeydown();
            break;
        }
      };

      const keyupEvents = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Enter":
            handleEnterKeyup();
            break;
        }
      };

      window.addEventListener("keydown", keydownEvents);
      window.addEventListener("keyup", keyupEvents);

      return () => {
        window.removeEventListener("keydown", keydownEvents);
        window.removeEventListener("keyup", keyupEvents);
      };
    }
  }, [index, optionsRef, focusedAtom, highlightAtom, setHighlightAtom]);

  return (
    <Container {...rest}>
      <div className="my-[0.1499vh]">
        {startMenuFiles[index - 1].nested!.map(({ index, label, src }) => {
          const highlighted =
            (highlightAtom["start-menu"] as number[])[1] === index;

          return (
            <div
              key={src}
              ref={(el) =>
                (optionsRef.current[index - 1] = el as HTMLDivElement)
              }
              className={`flex items-center h-[2.999vh] aspect-[302/40] ${
                highlighted ? "bg-[#000080]" : ""
              }`}
              onMouseOver={() =>
                setHighlightAtom((currHighlight) => ({
                  ...currHighlight,
                  "start-menu": [1, index],
                }))
              }
              onClick={() => {
                (event as (() => void)[][])[0][index - 1]();
                setStartAtom(false);
              }}
            >
              <div className="h-[2.4vh] aspect-square mx-[0.8996vh]">
                <img className="h-full" src={src} alt={label} />
              </div>
              <div
                className={`h-full pt-[0.2998vh] text-[1.75vh] ${
                  highlighted ? "text-white" : ""
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default StartSubmenu;
