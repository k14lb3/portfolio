import { FC, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import { desktopIcons } from "@/utils/constants";
import {
  highlightState,
  desktopIconsRefState,
  windowsState,
  focusedState,
  topMostWindowState,
} from "@/recoil/atoms";
import { launchFile, openLink } from "@/utils/helpers";
import { Socials, socialProps } from "@/components/windows";

export const Icons: FC = () => {
  const iconsRef = useRef<any[]>([]);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setDesktopIconsRefAtom = useSetRecoilState(desktopIconsRefState);
  const [windowsAtom, setWindowsAtom] = useRecoilState(windowsState);
  const [focusedAtom, setFocusedAtom] = useRecoilState(focusedState);
  const setTopMostWindowAtom = useSetRecoilState(topMostWindowState);

  const iconsEvent: VoidFunction[] = [
    () => {},
    () => {},
    () =>
      launchFile(
        { component: Socials, props: socialProps },
        { get: () => windowsAtom, set: setWindowsAtom },
        setFocusedAtom,
        setTopMostWindowAtom
      ),
    () => {
      anchorRef.current!.href = "/static/karlivan-alberto_resume.pdf";
      anchorRef.current!.download = "";
      anchorRef.current!.click();

      anchorRef.current!.removeAttribute("href");
      anchorRef.current!.removeAttribute("download");
    },
    () => openLink(anchorRef, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
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
        const highlighted =
          (highlightAtom.desktop === index ||
            highlightAtom.desktop === 90 + index) &&
          (focusedAtom === "icon" || focusedAtom === "desktop");
        const focused = focusedAtom === "icon";

        return (
          <div
            ref={(el) => {
              iconsRef.current[index - 1] = el as HTMLDivElement;
            }}
            key={label}
            className="relative flex flex-col items-center mb-[2.3988vh]"
            onClick={() => {
              setFocusedAtom("icon");
              setHighlightAtom((currHighlight) => ({
                ...currHighlight,
                desktop: 90 + index,
              }));
            }}
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
              {highlighted && (
                <div
                  style={{
                    maskImage: `url(${src})`,
                    WebkitMaskImage: `url(${src})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskSize: "4.799vh",
                    WebkitMaskSize: "4.799vh",
                  }}
                  className={`absolute inset-0 aspect-square opacity-70${
                    focused ? " bg-[#000080]" : ""
                  }`}
                />
              )}
            </div>
            <div
              className={`px-[0.2999vh] text-[2.1vh] text-white border-[0.1vh] border-dotted${
                highlighted
                  ? ` border-[#ffff7f] ${focused ? "bg-[#000080]" : ""}`
                  : " bg-[#008080] border-[transparent] "
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
