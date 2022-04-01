import { FC } from "react";
import { useRecoilState } from "recoil";
import { highlightState } from "@/recoil/atoms";

interface Icon {
  index: number;
  filename: string;
}

const icons: Icon[] = [
  {
    index: 1,
    filename: "recycle-bin",
  },
  {
    index: 2,
    filename: "projects",
  },
  {
    index: 3,
    filename: "resume",
  },
  {
    index: 4,
    filename: "minecraft",
  },
];

export const Icons: FC = () => {
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  return (
    <>
      {icons.map(({ index, filename }) => (
        <div
          key={filename}
          className="h-16 w-[6.375rem] mb-4"
          onClick={() => setHighlightAtom(index)}
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
    </>
  );
};
