import { FC, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import { desktopIcons } from "@/utils/constants";
import {
  highlightState,
  desktopIconsRefState,
  windowsState,
} from "@/recoil/atoms";
import { launchFile } from "@/utils/helpers";
import Socials, { props } from "@/components/socials";

export const Icons: FC = () => {
  const iconsRef = useRef<any[]>([]);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setDesktopIconsRefAtom = useSetRecoilState(desktopIconsRefState);
  const setWindowsAtom = useSetRecoilState(windowsState);

  const iconsEvent: VoidFunction[] = [
    () => {},
    () => {},
    () => launchFile({ component: Socials, props: props }, setWindowsAtom),
    () => {
      anchorRef.current!.href = "/static/karlivan-alberto_resume.pdf";
      anchorRef.current!.download = "";
      anchorRef.current!.click();

      anchorRef.current!.removeAttribute("href");
      anchorRef.current!.removeAttribute("download");
    },
    () => {
      anchorRef.current!.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      anchorRef.current!.target = "_blank";
      anchorRef.current!.rel = "noopener noreferrer";
      anchorRef.current!.click();

      anchorRef.current!.removeAttribute("href");
      anchorRef.current!.removeAttribute("target");
      anchorRef.current!.removeAttribute("rel");
    },
  ];

  useEffect(() => {
    if (iconsRef.current) {
      const refs = _.cloneDeep(iconsRef);
      setDesktopIconsRefAtom(refs.current);
    }
  }, [iconsRef]);

  return (
    <>
      <a ref={anchorRef} />
      {desktopIcons.map(({ index, src, label }) => {
        return (
          <div
            ref={(el) => {
              iconsRef.current[index - 1] = el as HTMLDivElement;
            }}
            key={label}
            className="relative flex flex-col items-center mb-[2.3988vh]"
            onClick={() =>
              setHighlightAtom((currHighlight) => ({
                ...currHighlight,
                desktop: index,
              }))
            }
            onDoubleClick={() => {
              iconsEvent[index - 1]();
              setHighlightAtom((currHighlight) => ({
                ...currHighlight,
                desktop: 0,
              }));
            }}
          >
            <div className="relative h-[4.799vh] aspect-[1/1] mb-[0.8996vh]">
              <img className="h-full mx-auto" src={src} alt={label} />
              {highlightAtom.desktop === index && (
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
              className={`px-[0.2999vh] text-[2.1vh] text-white border-[0.1vh] border-dotted${
                highlightAtom.desktop === index
                  ? " bg-[#000180] border-[#ffff7f] "
                  : " bg-[#008080] border-[transparent]"
              }`}
            >
              {label}
            </div>
          </div>
        );
      })}
    </>
  );
};
