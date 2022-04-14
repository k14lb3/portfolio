import { useEffect, useState } from "react";

export const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getMousePos = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });

    document.addEventListener("mousemove", getMousePos);
    return () => window.removeEventListener("mousemove", getMousePos);
  }, []);

  return mousePos;
};
