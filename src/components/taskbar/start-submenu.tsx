import {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useEffect,
} from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  highlightState,
  startState,
  startMenuOptionsRefState,
} from "@/recoil/atoms";
import _ from "lodash";
import { Container, options } from "./start-menu";

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
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setStartAtom = useSetRecoilState(startState);
  const setStartMenuOptionsRefAtom = useSetRecoilState(
    startMenuOptionsRefState
  );

  useEffect(() => {
    if (optionsRef.current) {
      const refs = _.cloneDeep(optionsRef).current;

      setStartMenuOptionsRefAtom((currRefs) =>
        currRefs.map((option, i) => {
          if (index - 1 === i)
            return [option, refs] as [HTMLDivElement, HTMLDivElement[]];

          return option;
        })
      );

      return () =>
        setStartMenuOptionsRefAtom((currRefs) =>
          currRefs.map((option, i) => {
            if (index - 1 === i)
              return (option as HTMLDivElement[])[0] as HTMLDivElement;

            return option;
          })
        );
    }
  }, [optionsRef]);

  return (
    <Container {...rest}>
      <div className="my-[0.1499vh]">
        {options[0].nested!.map(({ index, label, src }) => {
          const highlighted =
            (highlightAtom.startMenu as number[])[1] === index;

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
                  startMenu: [1, index],
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
