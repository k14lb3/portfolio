import { FC } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";
import { windowsState } from "@/recoil/atoms";

export const Windows: FC = () => {
  const windowsAtom = useRecoilValue(windowsState);

  return (
    <>
      {windowsAtom.map(({ component: Component }) => (
        <Component key={uuid()} />
      ))}
    </>
  );
};
