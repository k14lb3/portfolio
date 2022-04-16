import { FC } from "react";
import { useRecoilValue } from "recoil";
import { windowsState } from "@/recoil/atoms";

export const Windows: FC = () => {
  const windowsAtom = useRecoilValue(windowsState);

  return (
    <>
      {windowsAtom.map((Window) => (
        <Window key={Window.name} />
      ))}
    </>
  );
};
