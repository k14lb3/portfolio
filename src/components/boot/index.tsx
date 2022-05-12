import { FC, useLayoutEffect, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import Typewriter from 'typewriter-effect';
import { useWindowDimensions } from '@/hooks';
import { generateRandomNumber } from '@/utils/helpers';
import { bootState } from '@/recoil/atoms';

const Boot: FC = () => {
  const { width, height } = useWindowDimensions();
  const setBootAtom = useSetRecoilState(bootState);
  const [aspectRatio, setAspectRatio] = useState<boolean>(false);
  const [cli, setCli] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>(' cursor-none');
  const [bgColor, setBgcolor] = useState<string>('bg-black');

  useLayoutEffect(() => {
    if (width) {
      if (width / height! >= 1.6) {
        setAspectRatio(true);
      } else {
        setAspectRatio(false);
      }
    }
  }, [width]);

  useEffect(() => {
    setTimeout(() => {
      setCli(true);

      setTimeout(() => {
        setCursor('');

        setTimeout(() => {
          setBgcolor('bg-[#008081]');

          setCursor(' cursor-progress');

          setTimeout(() => {
            setCursor(' cursor-wait');

            setTimeout(() => {
              setCursor(' cursor-progress');
            }, generateRandomNumber(250, 500));

            setTimeout(() => {
              setBootAtom(true);
            }, generateRandomNumber(1000, 2000));
          }, generateRandomNumber(1000, 2000));
        }, generateRandomNumber(1000, 2000));
      }, generateRandomNumber(1000, 2000));
    }, 3000);
  }, []);

  return (
    <div
      style={{ aspectRatio: aspectRatio ? '8/5' : 'auto' }}
      className={`fixed inset-0 h-full ${bgColor} pt-[4vh] px-[2vh] m-auto cursor-none`}
    >
      <div className={`fixed inset-0${cursor}`} />
      {cli ? (
        cursor === ' cursor-none' && (
          <code className="block text-white text-[2.5vh] font-bold animate-blink">
            _
          </code>
        )
      ) : aspectRatio ? (
        <Image
          priority
          src="/static/images/boot.png"
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <code className="block text-white text-[2.5vh] font-bold">
          <Typewriter
            options={{
              strings: ['Windows 95'],
              autoStart: true,
              cursor: '_',
              cursorClassName: 'animate-blink',
            }}
          />
        </code>
      )}
    </div>
  );
};

export default Boot;
