import { FC, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import {
  startState,
  startMenuOptionsRefState,
  startMenuOptionHighlightState,
} from "@/recoil/atoms";

interface Option {
  index: number;
  filename: string;
}

export const options: Option[] = [
  {
    index: 1,
    filename: "programs",
  },
  {
    index: 2,
    filename: "contact",
  },
  {
    index: 3,
    filename: "about",
  },
  {
    index: 4,
    filename: "shut-down",
  },
];

export const StartMenu: FC = () => {
  const router = useRouter();
  const optionsRef = useRef<any[]>([]);
  const setStartMenuOptionsRefAtom = useSetRecoilState(
    startMenuOptionsRefState
  );
  const setStartAtom = useSetRecoilState(startState);
  const [startMenuOptionHighlightAtom, setStartMenuOptionHighlightAtom] =
    useRecoilState(startMenuOptionHighlightState);

  const optionsEvent = [
    () => {},
    () => {},
    () => {},
    () => {
      window.close();
      router.push("https://www.linkedin.com/in/karlivanalberto/");
    },
  ];

  useEffect(() => {
    if (optionsRef.current) {
      const refs = _.cloneDeep(optionsRef);
      setStartMenuOptionsRefAtom(refs.current);
    }
  }, [optionsRef]);

  return (
    <div
      className="absolute bottom-[84%] flex flex-col items-end h-[10.6875rem] w-[11.0625rem] bg-start-menu bg-cover pt-1 pr-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      {options.map(({ index, filename }) => {
        return (
          <div
            ref={(el) => {
              optionsRef.current[index - 1] = el as HTMLDivElement;
            }}
            key={filename}
            className={`h-10 w-[9.3125rem] ${
              index === 3 ? "mb-0.5": "mb-[0.0625rem]"
            }`}
            onMouseEnter={() => setStartMenuOptionHighlightAtom(index)}
            onMouseOut={() => setStartMenuOptionHighlightAtom(0)}
            onClick={() => {
              optionsEvent[index - 1]();
              setStartAtom(false);
            }}
          >
            <img
              src={
                startMenuOptionHighlightAtom === index
                  ? `/static/images/taskbar/start/menu/options/hover/${filename}.png`
                  : `/static/images/taskbar/start/menu/options/${filename}.png`
              }
              alt={filename}
            />
          </div>
        );
      })}
    </div>
  );
};
