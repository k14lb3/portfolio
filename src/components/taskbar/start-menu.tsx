import { FC, Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import _ from "lodash";
import {
  startState,
  startMenuOptionsRefState,
  startMenuOptionHighlightState,
  windowsState,
} from "@/recoil/atoms";
import About from "@/components/about";

interface Option {
  index: number;
  src: string;
  label: string;
  nested?: boolean;
}

export const options: Option[] = [
  {
    index: 1,
    src: "/static/images/start/menu/options/programs.png",
    label: "Programs",
    nested: true,
  },
  {
    index: 2,
    src: "/static/images/start/menu/options/contact.png",
    label: "Contact",
  },
  {
    index: 3,
    src: "/static/images/start/menu/options/about.png",
    label: "About",
  },
  {
    index: 4,
    src: "/static/images/start/menu/options/shut-down.png",
    label: "Shut Down",
  },
];

export const StartMenu: FC = () => {
  const router = useRouter();
  const optionsRef = useRef<any[]>([]);
  const setStartMenuOptionsRefAtom = useSetRecoilState(
    startMenuOptionsRefState
  );
  const setStartAtom = useSetRecoilState(startState);
  const [startMenuOptionHighlightAtom, setStartMenuOptionHighlightAtom] =
    useRecoilState(startMenuOptionHighlightState);
  const setWindowsAtom = useSetRecoilState(windowsState);

  const optionsEvent = [
    () => {},
    () => {},
    () =>
      setWindowsAtom((oldWindowsAtom) => {
        if (oldWindowsAtom.find((window) => window.title === "About"))
          return oldWindowsAtom;

        return [...oldWindowsAtom, { component: About, title: "About" }];
      }),
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
    <div
      className="absolute bottom-[84%] bg-[#C0C0C0] border-solid border-[0.1vh] border-black border-t-[#DFDFDF] border-l-[#DFDFDF]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex border-solid border-[0.1vh] border-[#808080] border-t-white border-l-white">
        <div className="flex bg-[#DFDFDF] p-[0.1522vh]">
          <div className="relative h-full w-[3.198vh] bg-[#808080]">
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -rotate-90 text-white font-bold text-[2.25vh] whitespace-nowrap">
              hello world :3
            </div>
          </div>
          <div className="flex-col">
            {options.map(({ index, src, label, nested }) => {
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
                      startMenuOptionHighlightAtom === index
                        ? " bg-[#000180]"
                        : ""
                    }`}
                    onMouseEnter={() => setStartMenuOptionHighlightAtom(index)}
                    onMouseOut={() => setStartMenuOptionHighlightAtom(0)}
                    onClick={() => {
                      optionsEvent[index - 1]();
                      setStartAtom(false);
                    }}
                  >
                    <div className="h-[3.655vh] aspect-[1/1] mx-[1.522vh] pointer-events-none">
                      <img className="h-full" src={src} alt={label} />
                    </div>
                    <div
                      className={`text-[2.1vh]${
                        startMenuOptionHighlightAtom === index
                          ? " text-white"
                          : ""
                      } pointer-events-none`}
                    >
                      <span className="underline">{label[0]}</span>
                      {label.slice(1)}
                    </div>
                    {nested && (
                      <div className="w-full pointer-events-none">
                        <div
                          style={{
                            maskImage:
                              "url(/static/images/start/menu/arrow.png)",
                            WebkitMaskImage:
                              "url(/static/images/start/menu/arrow.png)",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskSize: "auto 1.067h",
                            WebkitMaskSize: "auto 1.067vh",
                          }}
                          className={`h-[1.067vh] aspect-[8/14] ml-auto mr-[0.9132vh] ${
                            startMenuOptionHighlightAtom === index
                              ? "bg-white"
                              : "bg-black"
                          } pointer-events-none`}
                        />
                      </div>
                    )}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
