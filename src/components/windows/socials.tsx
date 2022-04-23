import { FC } from "react";
import { socialsIcons } from "@/utils/constants";
import Window, { WindowProps } from "@/components/window";

export const socialProps: WindowProps = {
  title: "Socials",
  type: "explorer",
  className: "aspect-[5/4]",
};

export const Socials: FC = () => {
  return (
    <Window {...socialProps}>
      <div className="flex space-x-[2.3988vh]">
        {socialsIcons.map(({ src, label }) => {
          return (
            <div
              key={label}
              className="relative flex flex-col items-center mb-[2.3988vh]"
            >
              <div className="relative h-[4.799vh] aspect-[1/1] mb-[0.8996vh]">
                <img className="h-full mx-auto" src={src} alt={label} />
              </div>
              <div className="px-[0.2999vh] text-[2.1vh] border-[0.1vh] border-dotted border-white">
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};
