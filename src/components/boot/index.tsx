import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { generateRandomNumber } from "@/utils/helpers";
import { bootState } from "@/recoil/atoms";

const Boot: FC = () => {
  const setBootAtom = useSetRecoilState(bootState);
  const [cli, setCli] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>(" cursor-default");
  const [bgColor, setBgcolor] = useState<string>("bg-black");

  useEffect(() => {
    setTimeout(() => {
      setCli(true);

      setTimeout(() => {
        setCursor("");

        setTimeout(() => {
          setBgcolor("bg-[#008081]");

          setCursor(" cursor-progress");

          setTimeout(() => {
            setCursor(" cursor-wait");

            setTimeout(() => {
              setCursor(" cursor-progress");
            }, generateRandomNumber(250, 500));

            setTimeout(() => {
              setBootAtom(true);
            }, generateRandomNumber(1000, 2000));
          }, generateRandomNumber(1000, 2000));
        }, generateRandomNumber(1000, 2000));
      }, generateRandomNumber(1000, 2000));
    }, 2000);
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full ${bgColor} p-4${cursor}`}>
      {cli ? (
        cursor === " cursor-default" && (
          <span className="text-white text-xl font-bold animate-blink">_</span>
        )
      ) : (
        <Image src="/static/images/boot.png" layout="fill" objectFit="cover" />
      )}
    </div>
  );
};

export default Boot;
