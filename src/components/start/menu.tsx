import { FC } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { startState, startMenuOptionHighlightState } from "@/recoil/atoms";

interface Option {
  index: number;
  filename: string;
  event: () => void;
}

export const Menu: FC = () => {
  const setStartAtom = useSetRecoilState(startState);
  const [startMenuOptionHighlightAtom, setStartMenuOptionHighlightAtom] =
    useRecoilState(startMenuOptionHighlightState);

  const options: Option[] = [
    {
      index: 1,
      filename: "programs",
      event: () => {},
    },
    {
      index: 2,
      filename: "contact",
      event: () => {},
    },
    {
      index: 3,
      filename: "about",
      event: () => {},
    },
    {
      index: 4,
      filename: "shut-down",
      event: () => window.close(),
    },
  ];

  return (
    <div
      className="absolute bottom-[84%] flex flex-col items-end h-[10.75rem] w-[11.0625rem] bg-start-menu bg-cover pt-1 pr-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      {options.map(({ index, filename, event }) => {
        return (
          <div
            key={filename}
            className={`h-10 w-[9.3125rem] mb-[0.0625rem]${
              index === 3 ? " mt-0.5" : ""
            }`}
            onMouseEnter={() => setStartMenuOptionHighlightAtom(index)}
            onMouseOut={() => setStartMenuOptionHighlightAtom(0)}
            onClick={() => {
              event();
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
