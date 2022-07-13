import { FC, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socialsFiles } from '@/utils/constants';
import { highlightState, focusState } from '@/recoil/atoms';
import Window, { WindowProps } from '@/components/window';
import { handleDefaultKeydown, openLink } from '@/utils/helpers';

export const socialProps: WindowProps = {
  title: 'socials',
  type: 'explorer',
  className: 'aspect-[5/4]',
  minimize: { visible: true, disabled: false },
  maximize: { visible: true, disabled: false },
};

export const Socials: FC = () => {
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const focusAtom = useRecoilValue(focusState);

  const iconsEvent: (() => void)[] = [
    () => openLink(anchorRef, 'https://github.com/k14lb3'),
    () => openLink(anchorRef, 'https://www.linkedin.com/in/karlivanalberto/'),
    () => openLink(anchorRef, 'https://twitter.com/k14lb3'),
  ];

  useEffect(() => {
    if (iconsRef.current) {
      const handleArrowRightKeydown = () => {
        if (focusAtom !== 'socials') return;

        if (
          highlightAtom.socials === socialsFiles.length ||
          highlightAtom.socials === 90 + socialsFiles.length
        )
          return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          socials:
            (highlightAtom.socials < 90 ? 90 : 0) + currHighlight.socials + 1,
        }));
      };

      const handleArrowLeftKeydown = () => {
        if (focusAtom !== 'socials') return;

        if (highlightAtom.socials === 1 || highlightAtom.socials === 90 + 1)
          return;

        return setHighlightAtom((currHighlight) => ({
          ...currHighlight,
          socials:
            (currHighlight.socials < 90 ? 90 : 0) + currHighlight.socials - 1,
        }));
      };

      const handleEnterKeyup = () => {
        if (focusAtom !== 'socials') return;

        const dblclick = new MouseEvent('dblclick', {
          view: window,
          bubbles: true,
        });

        (iconsRef.current as HTMLDivElement[])[
          (highlightAtom.socials < 90
            ? highlightAtom.socials
            : highlightAtom.socials - 90) - 1
        ].dispatchEvent(dblclick);
      };

      const keydownEvents = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowRight':
            handleArrowRightKeydown();
            break;
          case 'ArrowLeft':
            handleArrowLeftKeydown();
            break;
          default:
            handleDefaultKeydown(
              e,
              socialsFiles,
              focusAtom,
              setHighlightAtom,
              'socials',
            );
        }
      };

      const keyupEvents = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Enter':
            handleEnterKeyup();
            break;
        }
      };

      window.addEventListener('keydown', keydownEvents);
      window.addEventListener('keyup', keyupEvents);

      return () => {
        window.removeEventListener('keydown', keydownEvents);
        window.removeEventListener('keyup', keyupEvents);
      };
    }
  }, [iconsRef, focusAtom, highlightAtom.socials, setHighlightAtom]);

  return (
    <Window {...socialProps}>
      <a ref={anchorRef} />
      <div
        className="absolute inset-0"
        onMouseDown={() => {
          if (focusAtom === 'socials' && highlightAtom.socials > 90)
            return setHighlightAtom((currHighlight) => ({
              ...currHighlight,
              socials: currHighlight.socials - 90,
            }));
        }}
      />
      <div className="flex space-x-[2.3988vh]">
        {socialsFiles.map(({ index, src, label }) => {
          const highlighted =
            focusAtom === 'socials' &&
            (highlightAtom.socials === index ||
              highlightAtom.socials === 90 + index);
          const focused = focusAtom === 'socials' && highlightAtom.socials > 90;

          return (
            <div
              key={label}
              ref={(el) => {
                iconsRef.current[index - 1] = el as HTMLDivElement;
              }}
              className="relative flex flex-col items-center mb-[2.3988vh]"
              onClick={() => {
                setHighlightAtom((currHighlight) => ({
                  ...currHighlight,
                  socials: 90 + index,
                }));
              }}
              onDoubleClick={() => {
                iconsEvent[index - 1]();
              }}
            >
              <div className="relative h-[4.799vh] aspect-[1/1] mb-[0.8996vh]">
                <img className="h-full mx-auto" src={src} alt={label} />
                {highlighted && (
                  <div
                    style={{
                      maskImage: `url(${src})`,
                      WebkitMaskImage: `url(${src})`,
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskSize: '4.799vh',
                      WebkitMaskSize: '4.799vh',
                    }}
                    className={`absolute inset-0 aspect-square opacity-70${
                      focused ? ' bg-blue' : ''
                    }`}
                  />
                )}
              </div>
              <div
                className={`px-[0.2999vh] text-[2.1vh] border-[0.1vh] border-dotted${
                  highlighted
                    ? ` border-black ${
                        focused ? 'bg-blue text-white' : ''
                      }`
                    : ' bg-white border-[transparent] '
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};
