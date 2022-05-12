import { FC, useState, useLayoutEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { focusState, highlightState, startState } from '@/recoil/atoms';
import { useWindowDimensions } from '@/hooks';

export const Background: FC = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [aspectRatio, setAspectRatio] = useState<boolean>(true);
  const [highlightAtom, setHighlightAtom] = useRecoilState(highlightState);
  const resetFocusAtom = useResetRecoilState(focusState);
  const focusAtom = useRecoilValue(focusState);
  const resetStartAtom = useResetRecoilState(startState);

  useLayoutEffect(() => {
    if (width) {
      if (width / height! >= 1.6) {
        setAspectRatio(true);
      } else {
        setAspectRatio(false);
      }
    }
  }, [height, width]);

  return (
    <div
      style={{ aspectRatio: aspectRatio ? '8/5' : 'auto' }}
      className="relative h-full bg-[#008080] pt-[1.1994vh] pb-[4.4978vh] mx-auto overflow-hidden"
    >
      <div
        className="absolute inset-0"
        onClick={() => {
          resetStartAtom();

          if (focusAtom === 'desktop' && highlightAtom.desktop > 90)
            return setHighlightAtom((currHighlight) => ({
              ...currHighlight,
              desktop: currHighlight.desktop - 90,
            }));

          resetFocusAtom();
        }}
      />
      {children}
    </div>
  );
};
