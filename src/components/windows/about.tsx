import { FC } from "react";
import Image from "next/image";
import Window, { WindowProps } from "@/components/window";

export const aboutProps: WindowProps = {
  className: "h-[64.47vh] aspect-[205/214]",
  title: "About",
  type: "properties",
  icon: "/static/images/icons/about.png",
  minimize: { visible: false },
  maximize: { visible: false },
};

export const About: FC = () => {
  return (
    <Window {...aboutProps}>
      <div className="flex flex-col h-full p-[2.9985vh]">
        <div className="grid grid-cols-2">
          <div className="relative h-[17.993vh] aspect-square bg-[#DFDFDF] rounded-full overflow-hidden">
            <Image
              priority
              src="/static/images/me.jpg"
              layout="fill"
              alt="Karl Ivan Alberto"
            />
          </div>
          <div className="flex flex-col space-y-[2.3988vh] text-[2vh]">
            <div>
              <p className="text-justify">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello, I&apos;m a Software
                Developer based in the Philippines.
              </p>
            </div>
            <div>
              <div>Name:</div>
              <div className="ml-[2.3988vh]">
                <p>Karl Ivan Alberto</p>
              </div>
            </div>
            <div>
              <div>Tech Stack:</div>
              <div className="ml-[2.3988vh] w-fit">
                <ul>
                  <li className="hover:text-[#000080] hover:underline">
                    <a
                      href="https://reactjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React
                    </a>
                  </li>
                  <li className="hover:text-[#000080] hover:underline">
                    <a
                      href="https://nextjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Next.js
                    </a>
                  </li>
                  <li className="hover:text-[#000080] hover:underline">
                    <a
                      href="https://firebase.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Firebase
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-center flex-grow">
          <div className="">
            <p className="text-[2vh]">
              &quot;Hard workers who do things they like are unstoppable.&quot;
              <br />
              {"- "}
              <a
                className="hover:text-[#000080] hover:underline"
                href="https://myanimelist.net/anime/46352/Blue_Period"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blue Period
              </a>
            </p>
          </div>
        </div>
      </div>
    </Window>
  );
};
