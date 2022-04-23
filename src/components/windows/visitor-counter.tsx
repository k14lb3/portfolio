import { FC } from "react";
import Window, { WindowProps } from "../window";

export const visitorCounterProps: WindowProps = {
  title: "Visitor Counter",
  type: "properties",
  icon: "/static/images/icons/internet.png",
  minimize: { visible: false },
  maximize: { visible: false },
};

export const VisitorCounter: FC = () => {
  return (
    <Window {...visitorCounterProps}>
      <div className="flex flex-col text-[1.75vh] py-[1.1994vh] ">
        <div className="mb-[2.3998vh]">Visitor count : 69</div>

        <div>You are the 69th visitor!</div>
      </div>
    </Window>
  );
};
