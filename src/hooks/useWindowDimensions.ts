import { useLayoutEffect, useState } from "react";

interface WindowDimensions {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    const resize = (): void => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    resize();

    window.addEventListener("resize", resize);
    return (): void => window.removeEventListener("resize", resize);
  }, []);

  return windowDimensions;
};
