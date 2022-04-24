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
      <div className="grid grid-cols-2 p-[2.9985vh]">
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hi, I&apos;m a Software Developer
              based in the Philippines.
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
            <div className="ml-[2.3988vh]">
              <ul>
                <li>React.js</li>
                <li>Next.js</li>
                <li>Firebase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};
