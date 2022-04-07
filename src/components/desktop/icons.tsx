import { FC, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import {
  desktopIconsRefState,
  desktopIconHighlightState,
  startState,
} from "@/recoil/atoms";

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
  const iconsRef = useRef<any[]>([]);
  const setDesktopIconsRefAtom = useSetRecoilState(desktopIconsRefState);
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

  useEffect(() => {
    if (iconsRef.current) {
      const refs = _.cloneDeep(iconsRef);
      setDesktopIconsRefAtom(refs.current);
    }
  }, [iconsRef]);

  return (
    <>
      <a ref={resumeRef} href="/static/karlivan-alberto_resume.pdf" download />
      <div className="relative w-fit" onClick={() => setStartAtom(false)}>
        {icons.map(({ index, filename }) => {
          return (
            <div
              ref={(el) => {
                iconsRef.current[index - 1] = el as HTMLDivElement;
              }}
              key={filename}
              className="h-[9.446vh] mb-[2.3988vh] select-none"
              onClick={() => setDesktopIconHighlightAtom(index)}
              onDoubleClick={() => {
                iconsEvent[index - 1]();
                setDesktopIconHighlightAtom(0);
              }}
            >
              <img
                className="block h-[9.446vh] mt-auto"
                src={
                  desktopIconHighlightAtom === index
                    ? `/static/images/icons/highlighted/${filename}.png`
                    : `/static/images/icons/${filename}.png`
                }
                alt={filename}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
