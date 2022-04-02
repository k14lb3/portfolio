import { FC } from "react";

export const Background: FC = ({ children }) => {
  return (
    <div className="relative h-full w-full bg-[#008081] pt-4 pb-12">
      {children}
    </div>
  );
};
