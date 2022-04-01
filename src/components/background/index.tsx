import { FC } from "react";

const Background: FC = ({ children }) => {
  return <div className="relative h-full w-full bg-[#008081]">{children}</div>;
};

export default Background;
