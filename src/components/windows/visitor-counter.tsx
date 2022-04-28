import { FC } from "react";
import { useRecoilValue } from "recoil";
import { visitorIpState, visitorsState } from "@/recoil/atoms";
import Window, { WindowProps } from "../window";
import { indexOf } from "lodash";

export const visitorCounterProps: WindowProps = {
  title: "visitor-counter",
  type: "properties",
  icon: "/static/images/icons/internet.png",
  minimize: { visible: false },
  maximize: { visible: false },
};

export const VisitorCounter: FC = () => {
  const visitorIpAtom = useRecoilValue(visitorIpState);
  const visitorsAtom = useRecoilValue(visitorsState);

  const indexToPlace = () => {
    const index = indexOf(visitorsAtom, visitorIpAtom) + 1;

    switch (index) {
      case 1:
        return "first";
      case 2:
        return "second";
      case 3:
        return "third";
      case 4:
        return "fourth";
      case 5:
        return "fifth";
      case 6:
        return "sixth";
      case 7:
        return "seventh";
      case 8:
        return "eight";
      case 9:
        return "ninth";
      default:
        return `${index}th`;
    }
  };

  return (
    <Window {...visitorCounterProps}>
      <div className="flex flex-col text-[1.75vh] py-[1.1994vh] ">
        <div className="mb-[2.3998vh]">
          Visitor count : {visitorsAtom.length}
        </div>
        <div>You are the {indexToPlace()} visitor!</div>
      </div>
    </Window>
  );
};
