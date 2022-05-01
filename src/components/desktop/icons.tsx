import { FC, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import { desktopFiles } from "@/utils/constants";
import {
  highlightState,
  windowsState,
  focusState,
  windowsPrecedenceState,
} from "@/recoil/atoms";
import { handleDefaultKeydown, launchFile, openLink } from "@/utils/helpers";
import { Socials, socialProps } from "@/components/windows";

export const Icons: FC = () => {
  const iconsRef = useRef<any[]>([]);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const [windowsAtom, setWindowsAtom] = useRecoilState(windowsState);
  const [focusAtom, setFocusAtom] = useRecoilState(focusState);
  const setWindowsPrecedenceAtom = useSetRecoilState(windowsPrecedenceState);

  const iconsEvent: VoidFunction[] = [
    () => {},
    () => {},
    () =>
      launchFile(
        { component: Socials, props: socialProps },
        { get: () => windowsAtom, set: setWindowsAtom },
        setFocusAtom,
        setWindowsPrecedenceAtom
      ),
    () => openLink(anchorRef, "/static/karlivan-alberto_resume.pdf"),
    () => openLink(anchorRef, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
  ];

  useEffect(() => {
    if (iconsRef.current) {
      const handleArrowUpKeydown = () => {
        if (focusAtom !== "desktop") return;

        if (highlightAtom.desktop === 90)
          return setHighlightAtom((currHighlight) => ({
            ...currHighlight,
            desktop: 90 + desktopFiles.length,
          }));

        if (highlightAtom.desktop === 1 || highlightAtom.desktop === 90 + 1)
          return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          desktop:
            (highlightAtom.desktop < 90 ? 90 : 0) + currHighlight.desktop - 1,
        }));
      };

      const handleArrowDownKeydown = () => {
        if (focusAtom !== "desktop") return;

        if (
          highlightAtom.desktop === desktopFiles.length ||
          highlightAtom.desktop === 90 + desktopFiles.length
        )
          return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          desktop:
            (highlightAtom.desktop < 90 ? 90 : 0) + currHighlight.desktop + 1,
        }));
      };

      const handleEnterKeyup = () => {
        if (focusAtom !== "desktop") return;

        const dblclick = new MouseEvent("dblclick", {
          view: window,
          bubbles: true,
        });

        (iconsRef.current as HTMLDivElement[])[
          (highlightAtom.desktop < 90
            ? highlightAtom.desktop
            : highlightAtom.desktop - 90) - 1
        ].dispatchEvent(dblclick);
      };

      const keydownEvents = (e: KeyboardEvent) => {
        switch (e.key) {
          case "ArrowUp":
            handleArrowUpKeydown();
            break;
          case "ArrowDown":
            handleArrowDownKeydown();
            break;
          default:
            handleDefaultKeydown(
              e,
              desktopFiles,
              focusAtom,
              setHighlightAtom,
              "desktop"
            );
        }
      };

      const keyupEvents = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Enter":
            handleEnterKeyup();
            break;
        }
      };

      window.addEventListener("keydown", keydownEvents);
      window.addEventListener("keyup", keyupEvents);

      return () => {
        window.removeEventListener("keydown", keydownEvents);
        window.removeEventListener("keyup", keyupEvents);
      };
    }
  }, [iconsRef, focusAtom, highlightAtom.desktop, setHighlightAtom]);

  return (
    <>
      <a ref={anchorRef} />
      {desktopFiles.map(({ index, src, label }) => {
        const highlighted =
          focusAtom === "desktop" &&
          (highlightAtom.desktop === index ||
            highlightAtom.desktop === 90 + index);
        const focused = focusAtom === "desktop" && highlightAtom.desktop > 90;

        return (
          <div
            key={label}
            ref={(el) => {
              iconsRef.current[index - 1] = el as HTMLDivElement;
            }}
            className="relative flex flex-col items-center mb-[2.3988vh]"
            onClick={() => {
              setFocusAtom("desktop");
              setHighlightAtom((currHighlight) => ({
                ...currHighlight,
                desktop: 90 + index,
              }));
            }}
            onDoubleClick={() => {
              iconsEvent[index - 1]();
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
