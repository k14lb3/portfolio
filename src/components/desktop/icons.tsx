import { FC } from "react";
import { useRecoilState } from "recoil";
import { highlightState } from "@/recoil/atoms";

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
  return (
    <div className="relative w-fit">
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
