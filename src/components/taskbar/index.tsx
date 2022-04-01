import { FC } from "react";

const Taskbar: FC = () => {
  return (
    <div className="absolute bottom-0 left-0 h-[30px] w-full bg-taskbar-base taskbar-border"></div>
  );
};

export default Taskbar;
