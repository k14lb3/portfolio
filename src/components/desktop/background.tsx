import { FC } from "react";

export const Background: FC = ({ children }) => {
  return (
    <div className="relative h-full aspect-[8/5] bg-[#008081] pt-[2vh] pb-12 mx-auto">
      {children}
    </div>
  );
};
