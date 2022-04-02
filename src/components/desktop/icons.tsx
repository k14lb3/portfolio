import { FC, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { highlightState, startState } from "@/recoil/atoms";

interface Icon {
  index: number;
  filename: string;
  event: () => void;
}

export const Icons: FC = () => {
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setStartAtom = useSetRecoilState(startState);
  const resumeRef = useRef<HTMLAnchorElement | null>(null);

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
      event: () => resumeRef.current!.click(),
    },
    {
      index: 4,
      filename: "minecraft",
      event: () => {},
    },
  ];

  return (
    <>
      <a ref={resumeRef} href="/static/karlivan-alberto_resume.pdf" download />
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
    </>
  );
};
