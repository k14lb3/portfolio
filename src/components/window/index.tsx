import { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { TitleBar, TitleBarButton } from "./title-bar";
import { Button } from "@/components/ui";

interface Props {
  title?: string;
  minimize?: TitleBarButton;
  maximize?: TitleBarButton;
  type?: "explorer" | "properties";
}

const Window: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props
> = ({ title, minimize, maximize, type, className, children }) => {
  return (
    <div
      className={`h-fit w-fit border-solid border-[0.1vh] border-black border-t-[#DFDFDF] border-l-[#DFDFDF] ${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="border-solid border-[0.1vh] border-[#808080] border-t-white border-l-white">
        <div
          className={`bg-[#C0C0C0] ${
            type! === "explorer" ? "p-[0.3vh]" : "p-[0.15vh] "
          }`}
        >
          <TitleBar
            title={
              title === "" ? type![0].toUpperCase() + type!.slice(1) : title
            }
            minimize={minimize}
            maximize={maximize}
          />
          {type === "explorer" ? (
            <div className="border-solid border-[0.1vh] border-white border-t-[#808080] border-l-[#808080] mt-[0.2999vh]">
              <div className="py-[1.1994vh] px-[1.1994vh] bg-white border-solid border-[0.1vh] border-[#DFDFDF] border-t-black border-l-black">
                {children}
              </div>
            </div>
          ) : (
            <div className="p-[0.8996vh] pt-[1.1994vh]">
              <div className="mb-[0.8996vh] border-solid border-[0.1vh] border-black border-t-white border-l-white">
                <div className="px-[1.1994vh] bg-[#C0C0C0] border-solid border-[0.1vh] border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]">
                  {children}
                </div>
              </div>
              <div className="flex justify-end space-x-[0.5997vh] ml-auto">
                <Button autoFocus>OK</Button>
                <Button>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Window.defaultProps = {
  title: "",
  type: "explorer",
  minimize: { visible: true, disabled: false },
  maximize: { visible: true, disabled: false },
};

export default Window;
