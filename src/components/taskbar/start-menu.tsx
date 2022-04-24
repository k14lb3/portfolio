import {
  Fragment,
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import {
  highlightState,
  startState,
  startMenuOptionsRefState,
  windowsState,
  focusedState,
  topMostWindowState,
} from "@/recoil/atoms";
import { launchFile } from "@/utils/helpers";
import { StartSubmenu } from "./start-submenu";
import { About, aboutProps } from "@/components/windows";
import { VisitorCounter, visitorCounterProps } from "@/components/windows";

interface Option {
  index: number;
  src: string;
  label: string;
  nested?: Option[];
}

export const options: Option[] = [
  {
    index: 1,
    src: "/static/images/icons/programs.png",
    label: "Programs",
    nested: [
      {
        index: 1,
        src: "/static/images/icons/internet.png",
        label: "Visitor Counter",
      },
      {
        index: 2,
        src: "/static/images/icons/calculator.png",
        label: "Calculator",
      },
    ],
  },
  {
    index: 2,
    src: "/static/images/icons/contact.png",
    label: "Contact",
  },
  {
    index: 3,
    src: "/static/images/icons/about.png",
    label: "About",
  },
  {
    index: 4,
    src: "/static/images/icons/shut-down.png",
    label: "Shut Down",
  },
];

export const Container: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...rest }) => (
  <div
    className={`absolute bg-[#C0C0C0] border-solid border-[0.1vh] border-black border-t-[#DFDFDF] border-l-[#DFDFDF] ${
      className ? ` ${className}` : ""
    }`}
    onClick={(e) => e.stopPropagation()}
    {...rest}
  >
    <div className="flex border-solid border-[0.1vh] border-[#808080] border-t-white border-l-white">
      <div className="flex bg-[#C0C0C0] p-[0.1499vh]">{children}</div>
    </div>
  </div>
);

export const StartMenu: FC = () => {
  const router = useRouter();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const nestRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const setStartMenuOptionsRefAtom = useSetRecoilState(
    startMenuOptionsRefState
  );
  const setStartAtom = useSetRecoilState(startState);
  const [windowsAtom, setWindowsAtom] = useRecoilState(windowsState);
  const setFocusedAtom = useSetRecoilState(focusedState);
  const setTopMostWindowAtom = useSetRecoilState(topMostWindowState);

  const optionsEvent = [
    [
      () =>
        launchFile(
          { component: VisitorCounter, props: visitorCounterProps },
          { get: () => windowsAtom, set: setWindowsAtom },
          setFocusedAtom,
          setTopMostWindowAtom
        ),
      () => {
        anchorRef.current!.href =
          "https://www.google.com/search?q=calculator&rlz=1C1NHXL_enAE736AE739&ei=COxkYq6xC6eMr7wP9NmgkAQ&ved=0ahUKEwiu1b-Uh6z3AhUnxosBHfQsCEIQ4dUDCA4&uact=5&oq=calculator&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAELEDEEMyBwgAELEDEEMyBwgAELEDEEMyBAgAEEMyBAgAEEMyBwgAELEDEEMyBwgAELEDEEMyCwgAEIAEELEDEIMBMgcIABCxAxBDMggIABCxAxCDAToFCAAQkQI6CAgAEIAEELEDOgUIABCABDoKCC4QxwEQ0QMQQzoOCC4QgAQQsQMQxwEQ0QM6EQguEIAEELEDEIMBEMcBEKMCOg0ILhCxAxDHARDRAxBDSgQIQRgASgQIRhgAUABYtBFgrhJoAHABeACAAZYBiAHWCZIBAzIuOZgBAKABAcABAQ&sclient=gws-wiz";
        anchorRef.current!.target = "_blank";
        anchorRef.current!.rel = "noopener noreferrer";
        anchorRef.current!.click();

        anchorRef.current!.removeAttribute("href");
        anchorRef.current!.removeAttribute("target");
        anchorRef.current!.removeAttribute("rel");
      },
    ],
    () => {},
    () =>
      launchFile(
        { component: About, props: aboutProps },
        { get: () => windowsAtom, set: setWindowsAtom },
        setFocusedAtom,
        setTopMostWindowAtom
      ),
    () => {
      window.close();
      router.push("https://www.linkedin.com/in/karlivanalberto/");
    },
  ];

  useEffect(() => {
    if (optionsRef.current) {
      const refs = _.cloneDeep(optionsRef);
      setStartMenuOptionsRefAtom(refs.current);
    }
  }, [optionsRef]);

  return (
    <Container className="left-[-2%] bottom-[107%]">
      <a ref={anchorRef} />
      <div className="relative h-full w-[3.198vh] bg-[#808080]">
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -rotate-90 text-white font-bold text-[2.25vh] whitespace-nowrap">
          hello world :3
        </div>
      </div>
      <div className="flex-col">
        {options.map(({ index, src, label, nested }) => {
          const highlighted =
            typeof highlightAtom.startMenu === "number"
              ? highlightAtom.startMenu === index
              : (highlightAtom.startMenu as number[])[0] === index;

          return (
            <Fragment key={src}>
              {label === "Shut Down" && (
                <div className="relative mt-[0.3044vh] mb-[0.761vh] border-solid border-[0.1vh] border-t-[#808080] border-b-white  " />
              )}
              <div
                ref={(el) => {
                  optionsRef.current[index - 1] = el as HTMLDivElement;
                }}
                className={`flex h-[4.873vh] aspect-[274/64] items-center${
                  highlighted ? " bg-[#000080]" : ""
                }`}
                onMouseOver={() => {
                  if (nested && typeof highlightAtom.startMenu !== "number")
                    return;

                  setHighlightAtom((currHighlight) => ({
                    ...currHighlight,
                    startMenu: index,
                  }));
                }}
                onMouseLeave={() => {
                  if (!nested) return;

                  if (typeof highlightAtom.startMenu !== "number") {
                    setHighlightAtom((currHighlight) => ({
                      ...currHighlight,
                      startMenu: (
                        currHighlight.startMenu as number[]
                      )[0] as number,
                    }));
                  }

                  clearTimeout(nestRef.current!);
                }}
                onMouseEnter={() => {
                  if (nested && typeof highlightAtom.startMenu === "number") {
                    nestRef.current = setTimeout(
                      () =>
                        setHighlightAtom((currHighlight) => ({
                          ...currHighlight,
                          startMenu: [currHighlight.startMenu as number, 0],
                        })),
                      500
                    );
                  }
                }}
                onClick={() => {
                  if (nested) return;

                  (optionsEvent[index - 1] as VoidFunction)();
                  setStartAtom(false);
                }}
              >
                {nested && !(typeof highlightAtom.startMenu === "number") && (
                  <StartSubmenu
                    index={index}
                    event={optionsEvent}
                    className="top-[-1%] left-[96.5%] text-[1.75vh]"
                  />
                )}
                <div className="h-[3.655vh] aspect-[1/1] mx-[1.522vh] pointer-events-none">
                  <img className="h-full" src={src} alt={label} />
                </div>
                <div
                  className={`text-[2.1vh]${
                    highlighted ? " text-white" : ""
                  } pointer-events-none`}
                >
                  <span className="underline">{label[0]}</span>
                  {label.slice(1)}
                </div>
                {nested && (
                  <div className="w-full pointer-events-none">
                    <div
                      style={{
                        maskImage: "url(/static/images/start/menu/arrow.png)",
                        WebkitMaskImage:
                          "url(/static/images/start/menu/arrow.png)",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskSize: "auto 1.067h",
                        WebkitMaskSize: "auto 1.067vh",
                      }}
                      className={`h-[1.067vh] aspect-[8/14] ml-auto mr-[0.9132vh] ${
                        highlighted ? "bg-white" : "bg-black"
                      } pointer-events-none`}
                    />
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </Container>
  );
};
