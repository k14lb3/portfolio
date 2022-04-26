import { FC, useRef } from "react";
import { useRecoilState } from "recoil";
import { socialsIcons } from "@/utils/constants";
import { highlightState, focusedState } from "@/recoil/atoms";
import Window, { WindowProps } from "@/components/window";
import { openLink } from "@/utils/helpers";

export const socialProps: WindowProps = {
  title: "Socials",
  type: "explorer",
  className: "aspect-[5/4]",
};

export const Socials: FC = () => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const [focusedAtom, setFocusedAtom] = useRecoilState(focusedState);

  const iconsEvent: (() => void)[] = [
    () => openLink(anchorRef, "https://github.com/k14lb3"),
    () => openLink(anchorRef, "https://www.linkedin.com/in/karlivanalberto/"),
    () => openLink(anchorRef, "https://twitter.com/k14lb3"),
  ];

  return (
    <Window {...socialProps}>
      <a ref={anchorRef} />
      <div
        className="absolute inset-0"
        onMouseDown={() => {
          if (focusedAtom === "socials" && highlightAtom.socials > 90)
            return setHighlightAtom((currHighlight) => ({
              ...currHighlight,
              socials: currHighlight.socials - 90,
            }));
        }}
      />
      <div className="flex space-x-[2.3988vh]">
        {socialsIcons.map(({ index, src, label }) => {
          const highlighted =
            focusedAtom === "socials" &&
            (highlightAtom.socials === index ||
              highlightAtom.socials === 90 + index);
          const focused =
            focusedAtom === "socials" && highlightAtom.socials > 90;

          return (
            <div
              key={label}
              className="relative flex flex-col items-center mb-[2.3988vh]"
              onClick={() => {
                setHighlightAtom((currHighlight) => ({
                  ...currHighlight,
                  socials: 90 + index,
                }));
              }}
              onDoubleClick={() => {
                iconsEvent[index - 1]();
                setHighlightAtom((currHighlight) => ({
                  ...currHighlight,
                  socials: 0,
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
                className={`px-[0.2999vh] text-[2.1vh] border-[0.1vh] border-dotted${
                  highlighted
                    ? ` border-black ${
                        focused ? "bg-[#000080] text-white" : ""
                      }`
                    : " bg-white border-[transparent] "
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};
