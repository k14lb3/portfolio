import { FC, MutableRefObject, createRef } from "react";

interface Option {
  index: number;
  name: string;
  event: () => void;
}

const options: Option[] = [
  {
    index: 0,
    name: "programs",
    event: () => {},
  },
  {
    index: 1,
    name: "contact",
    event: () => {},
  },
  {
    index: 2,
    name: "about",
    event: () => {},
  },
  {
    index: 3,
    name: "shut-down",
    event: () => {},
  },
];

export const Menu: FC = () => {
  const optionsRef: MutableRefObject<HTMLImageElement | null>[] = [];

  const optionHoverIn = (index: number, name: string) => {
    optionsRef[
      index
    ].current!.src = `/static/images/taskbar/start/menu/options/hover/${name}.png`;
  };

  const optionHoverOut = (index: number, name: string) => {
    optionsRef[
      index
    ].current!.src = `/static/images/taskbar/start/menu/options/${name}.png`;
  };

  return (
    <div className="absolute bottom-[84%] flex flex-col items-end h-[10.75rem] w-[11.0625rem] bg-start-menu bg-cover pt-1 pr-0.5">
      {options.map(({ index, name, event }) => {
        optionsRef.push(createRef());

        return (
          <div
            key={name}
            className={`h-10 w-[9.3125rem] mb-[0.0625rem]${
              index === 3 ? " mt-0.5" : ""
            }`}
            onMouseEnter={() => optionHoverIn(index, name)}
            onMouseOut={() => optionHoverOut(index, name)}
            onClick={event}
          >
            <img
              ref={optionsRef[index]}
              src={`/static/images/taskbar/start/menu/options/${name}.png`}
              alt={name}
            />
          </div>
        );
      })}
    </div>
  );
};
