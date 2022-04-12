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
  src: string;
  label: string;
}

export const icons: Icon[] = [
  {
    index: 1,
    src: "/static/images/icons/recycle-bin.png",
    label: "Recycle Bin",
  },
  {
    index: 2,
    src: "/static/images/icons/projects.png",
    label: "Projects",
  },
  {
    index: 3,
    src: "/static/images/icons/resume.png",
    label: "Resume",
  },
  {
    index: 4,
    src: "/static/images/icons/minecraft.png",
    label: "Minecraft",
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
      <div className="w-fit ml-[1.1994vh]" onClick={() => setStartAtom(false)}>
        {icons.map(({ index, src, label }) => {
          return (
            <div
              ref={(el) => {
                iconsRef.current[index - 1] = el as HTMLDivElement;
              }}
              key={src}
              className="flex flex-col items-center mb-[2.3988vh]"
              onClick={() => setDesktopIconHighlightAtom(index)}
              onDoubleClick={() => {
                iconsEvent[index - 1]();
                setDesktopIconHighlightAtom(0);
              }}
            >
              <div className="relative h-[4.799vh] aspect-[1/1] mb-[0.8996vh]">
                <img className="h-full mx-auto" src={src} alt={label} />
                {desktopIconHighlightAtom === index && (
                  <div
                    style={{
                      maskImage: `url(${src})`,
                      WebkitMaskImage: `url(${src})`,
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskSize: "4.799vh",
                      WebkitMaskSize: "4.799vh",
                    }}
                    className="absolute inset-0 aspect-square bg-[#000180] opacity-70 "
                  />
                )}
              </div>
              <div
                className={`relative px-[0.6656vh] text-[2.1vh] text-white border-[0.1vh] border-dotted${
                  desktopIconHighlightAtom === index
                    ? " bg-[#000180] border-[#ffff7f] "
                    : "  border-[transparent]"
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
