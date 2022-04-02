import { FC } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { highlightState, startState } from "@/recoil/atoms";

interface Icon {
  index: number;
  filename: string;
  event: () => void;
}

const icons: Icon[] = [
  {
    index: 1,
    filename: "recycle-bin",
    event: () => {},
  },
  {
    index: 2,
    filename: "projects",
    event: () => {},
  },
  {
    index: 3,
    filename: "resume",
    event: () => {},
  },
  {
    index: 4,
    filename: "minecraft",
    event: () => {},
  },
];

export const Icons: FC = () => {
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setStartAtom = useSetRecoilState(startState);

  return (
    <div className="relative w-fit" onClick={() => setStartAtom(false)}>
      {icons.map(({ index, filename, event }) => (
        <div
          key={filename}
          className="h-16 w-[6.375rem] mb-4"
          onClick={() => setHighlightAtom(index)}
          onDoubleClick={() => {
            event();
            setHighlightAtom(0);
          }}
        >
          <img
            src={
              highlightAtom === index
                ? `/static/images/icons/highlighted/${filename}.png`
                : `/static/images/icons/${filename}.png`
            }
            alt={filename}
          />
        </div>
      ))}
    </div>
  );
};
