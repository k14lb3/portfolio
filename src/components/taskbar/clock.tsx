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
    <div className="flex justify-center items-center h-[3.6vh] aspect-[17/6] bg-taskbar-clock bg-cover bg-no-repeat select-none">
      <time className="text-[1.75vh]">{time}</time>
    </div>
  );
};
