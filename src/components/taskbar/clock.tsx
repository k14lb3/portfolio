import { FC, useState, useEffect } from "react";

export const Clock: FC = () => {
  const [time, setTime] = useState<string>("");

  const setClock = () => {
    const date = new Date();

    setTime(
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  useEffect(() => {
    setClock();

    setInterval(() => setClock(), 60000);
  }, []);

  return (
    <div className="flex justify-center items-center h-[3.655vh] aspect-[17/6] border-solid border-[0.1vh] border-white border-t-[#808080] border-l-[#808080]">
      <time className="text-[1.5vh]">{time}</time>
    </div>
  );
};
