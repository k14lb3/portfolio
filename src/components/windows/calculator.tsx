import {
  FC,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useState,
  useRef,
} from "react";
import Window, { WindowProps } from "@/components/window";
import { InputText } from "@/components/ui";
import { isNaN } from "lodash";

const Button: FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { label: string }
> = ({ className, label, ...rest }) => {
  return (
    <button
      tabIndex={-1}
      className={`group block h-[4.2vh] aspect-[9/7]
					border-solid border-[0.1vh] outline-none
					border-black border-t-white border-l-white 
					active:border-white active:border-t-black 
					active:border-l-black text-[1.75vh] font-bold${
            className ? ` ${className}` : ""
          }`}
      {...rest}
    >
      <div
        className="h-full border-solid border-[0.1vh]
            border-[#808080] border-t-[#DFDFDF] border-l-[#DFDFDF]
						group-active:border-[#DFDFDF] group-active:border-t-[#808080]
						group-active:border-l-[#808080]
        }"
      >
        <div
          className="flex items-center justify-center h-full pb-[0.2999vh] bg-[#C0C0C0] border-solid 
              border-[0.1vh] border-[#C0C0C0] group-active:border-[#C0C0C0] group-active:pt-[0.4498vh] group-active:pl-[0.15vh]"
        >
          {label}
        </div>
      </div>
    </button>
  );
};

export const calculatorProps: WindowProps = {
  className: "h-[36.73vh] aspect-[552/490]",
  title: "calculator",
  type: "properties",
  plain: true,
  icon: "/static/images/icons/calculator.png",
  minimize: { visible: true, disabled: false },
  maximize: { visible: true, disabled: true },
};

export const Calculator: FC = () => {
  const [value, setValue] = useState<string>("0.");
  const [operator, setOperator] = useState<{
    symbol: string;
    accumulator: number;
    next: number;
  }>({
    symbol: "",
    accumulator: 0,
    next: 0,
  });
  const [decimal, setDecimal] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [willClear, setWillClear] = useState<boolean>(false);

  const deleteFunctions = (label: string): boolean => {
    if (label === "back") {
      setValue((currValue) => {
        if (currValue.length === 2) return "0.";
        if (currValue[currValue.length - 1] === ".")
          return currValue.slice(0, -2) + ".";
        return currValue.slice(0, -1);
      });

      return true;
    }

    if (label === "ce") {
      setValue("0.");
      setDecimal(false);
      return true;
    }

    if (label === "c") {
      setValue("0.");
      setOperator({
        symbol: "",
        accumulator: 0,
        next: 0,
      });
      setDecimal(false);
      setWillClear(false);
      return true;
    }

    return false;
  };

  const memoryFunctions = (label: string): boolean => {
    if (label === "mc" || label === "mr" || label === "ms" || label === "m+") {
      setWillClear(false);

      if (label === "mc") {
        setMemory(0);
        setDecimal(false);
      } else if (label === "mr") {
        setValue(memory + ".");
      } else if (label === "ms") {
        setMemory(parseInt(value));
      } else if (label === "m+") {
        setMemory((currMemory) => parseInt(value) + currMemory);
      }

      return true;
    }

    return false;
  };

  const operatorFunctions = (label: string) => {
    if (
      label === "/" ||
      label === "*" ||
      label === "-" ||
      label === "+" ||
      label === "=" ||
      label === "sqrt" ||
      label === "%" ||
      label === "1/x"
    ) {
      setWillClear(true);

      if (label === "sqrt") return true;

      if (label === "%") return true;

      if (label === "1/x") {
        setValue((currValue) => {
          const value = parseFloat(currValue);

          if (value === 0) return "Cannot divide by zero.";

          const answer = 1 / value;

          return Number.isInteger(answer) ? answer + "." : answer.toString();
        });

        return true;
      }
      if (label === "=") {
        let foo = operator.next === 0;

        console.log("foo", foo);

        if (foo)
          setOperator((currOperator) => ({
            ...currOperator,
            next: parseInt(value),
          }));

        let answer = eval(
          `${
            operator.accumulator +
            operator.symbol +
            (foo ? value : operator.next)
          }`
        );

        setOperator((currOperator) => ({
          ...currOperator,
          accumulator: answer,
        }));

        setValue(Number.isInteger(answer) ? answer + "." : answer);

        return true;
      }

      setOperator({
        symbol: label,
        accumulator: parseFloat(value),
        next: 0,
      });

      return true;
    }

    return false;
  };

  const numberFunctions = (label: string) => {
    if (!isNaN(parseInt(label))) {
      if (decimal) {
        setValue((currValue) => {
          if (willClear) {
            setWillClear(false);
            return "0." + label;
          }

          return currValue + label;
        });

        return true;
      }

      setValue((currValue) => {
        if (currValue === "0." || willClear) {
          if (willClear) setWillClear(false);

          return label + ".";
        }
        return currValue.slice(0, -1) + label + ".";
      });

      return true;
    }

    if (label === "+/-")
      return setValue((currValue) =>
        currValue[0] !== "-" ? "-" + currValue : currValue.slice(1)
      );

    if (label === ".") return setDecimal(true);

    return false;
  };

  const click = (label: string) => {
    if (deleteFunctions(label)) return;

    if (memoryFunctions(label)) return;

    if (operatorFunctions(label)) return;

    if (numberFunctions(label)) return;
  };

  return (
    <Window {...calculatorProps}>
      <div className="flex flex-col h-full px-[1.7991vh] py-[1.9490vh]">
        <InputText
          className="text-right cursor-default caret-transparent pointer-events-none"
          value={value}
          readOnly
        />
        <div className="flex my-[0.8995vh] justify-between">
          <div
            className="group block h-[3.898vh] aspect-[18/13]
					border-solid border-[0.1vh] bg-[#C0C0C0] outline-none
					border-white border-t-[#808080] border-l-[#808080]"
          >
            <div
              className="h-full pt-[0.5997vh] border-solid border-[0.1vh]
            border-[#DFDFDF] border-t-black border-l-black text-center"
            >
              {memory !== 0 && "M"}
            </div>
          </div>
          <div className="flex space-x-[0.5997vh] text-[#800000]">
            <Button
              className="aspect-[7/4]"
              label="Back"
              onClick={() => click("back")}
            />
            <Button
              className="aspect-[7/4]"
              label="CE"
              onClick={() => click("ce")}
            />
            <Button
              className="aspect-[7/4]"
              label="C"
              onClick={() => click("c")}
            />
          </div>
        </div>
        <div className="flex space-x-[2.3988vh]">
          <div className="grid grid-rows-4 gap-y-[0.8995vh] text-[#ff0000]">
            <Button label="MC" onClick={() => click("mc")} />
            <Button label="MR" onClick={() => click("mr")} />
            <Button label="MS" onClick={() => click("ms")} />
            <Button label="M+" onClick={() => click("m+")} />
          </div>
          <div className="flex space-x-[0.5997vh]">
            <div className="grid grid-cols-3 gap-y-[0.8995vh] gap-x-[0.5997vh] text-[#0000ff]">
              <Button label="7" onClick={() => click("7")} />
              <Button label="8" onClick={() => click("8")} />
              <Button label="9" onClick={() => click("9")} />
              <Button label="4" onClick={() => click("4")} />
              <Button label="5" onClick={() => click("5")} />
              <Button label="6" onClick={() => click("6")} />
              <Button label="1" onClick={() => click("1")} />
              <Button label="2" onClick={() => click("2")} />
              <Button label="3" onClick={() => click("3")} />
              <Button label="0" onClick={() => click("0")} />
              <Button label="+/-" onClick={() => click("+/-")} />
              <Button label="." onClick={() => click(".")} />
            </div>
            <div className="flex space-x-[0.5997vh]">
              <div className="space-y-[0.8995vh] text-[#ff0000]">
                <Button label="/" onClick={() => click("/")} />
                <Button label="*" onClick={() => click("*")} />
                <Button label="-" onClick={() => click("-")} />
                <Button label="+" onClick={() => click("+")} />
              </div>
              <div className="space-y-[0.8995vh] text-[#0000ff]">
                <Button label="sqrt" onClick={() => click("sqrt")} />
                <Button label="%" onClick={() => click("%")} />
                <Button label="1/x" onClick={() => click("1/x")} />
                <Button
                  className="text-[#ff0000]"
                  label="="
                  onClick={() => click("=")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};
