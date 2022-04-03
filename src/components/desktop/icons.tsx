import { FC, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { desktopIconHighlightState, startState } from "@/recoil/atoms";

interface Icon {
  index: number;
  filename: string;
}

export const icons: Icon[] = [
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
  const [desktopIconHighlightAtom, setDesktopIconHighlightAtom] =
    useRecoilState(desktopIconHighlightState);
  const setStartAtom = useSetRecoilState(startState);
  const resumeRef = useRef<HTMLAnchorElement | null>(null);

  const iconsEvent: VoidFunction[] = [
    () => {},
    () => {},
    () => resumeRef.current!.click(),
    () => {},
  ];

  return (
    <>
      <a ref={resumeRef} href="/static/karlivan-alberto_resume.pdf" download />
      <div className="relative w-fit" onClick={() => setStartAtom(false)}>
        {icons.map(({ index, filename }) => (
          <div
            key={filename}
            className="h-16 w-[6.375rem] mb-4"
            onClick={() => setDesktopIconHighlightAtom(index)}
            onDoubleClick={() => {
              iconsEvent[index - 1]();
              setDesktopIconHighlightAtom(0);
            }}
          >
            <img
              src={
                desktopIconHighlightAtom === index
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
