import { FC, useState, useEffect } from "react";

const Clock: FC = () => {
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
    <div className="h-6 w-[4.25rem] bg-taskbar-clock bg-no-repeat bg-cover text-center select-none">
      <time className="text-xs">{time}</time>
    </div>
  );
};

export default Clock;
