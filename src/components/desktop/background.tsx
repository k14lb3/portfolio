import { FC, useState, useLayoutEffect } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export const Background: FC = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [aspectRatio, setAspectRatio] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (width) {
      if (width / height! >= 1.6) {
        setAspectRatio(true);
      } else {
        setAspectRatio(false);
      }
    }
  }, [width]);

  return (
    <div
      style={{ aspectRatio: aspectRatio ? "8/5" : "auto" }}
      className="relative h-full bg-[#008081] pt-[2vh] pb-12 mx-auto"
    >
      {children}
    </div>
  );
};
