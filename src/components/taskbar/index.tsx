import { FC, HTMLAttributes, DetailedHTMLProps } from "react";
import { Start } from "./start";
import { Clock } from "./clock";

const Taskbar: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ ...rest }) => {
  return (
    <div
      className="absolute bottom-0 h-[4.5vh] w-full bg-[#C0C0C0] z-[999]"
      {...rest}
    >
      <div className="bg-[#DFDFDF] h-[0.152vh] w-full" />
      <div className="bg-white h-[0.152vh] w-full" />
      <div className="flex items-center justify-between relative h-full w-full px-[0.2999vh]">
        <Start />
        <Clock />
      </div>
    </div>
  );
};

export default Taskbar;
