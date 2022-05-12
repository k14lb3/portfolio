import { FC, RefObject } from 'react';
import { SetterOrUpdater } from 'recoil';
import { WindowTitle, Focusable, Highlight } from '@/utils/constants';
import { WindowProps } from '@/components/window';
import { File } from './constants';
import { indexOf } from 'lodash';

export const generateRandomNumber = (
  min: number = 0,
  max: number = 1,
): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const convertPxToVh = (px: number, screenHeight: number) =>
  px * (100 / screenHeight);

export const convertVhtoPx = (vh: number, screenHeight: number) =>
  vh * (screenHeight / 100);

export const launchFile = (
  window: { component: FC<Partial<WindowProps>>; props: WindowProps },
  windowsAtom: {
    get: () => {
      component: FC<Partial<WindowProps>>;
      props: WindowProps;
    }[];
    set: SetterOrUpdater<
      {
        component: FC<Partial<WindowProps>>;
        props: WindowProps;
      }[]
    >;
  },
  setFocusAtom: SetterOrUpdater<Focusable>,
  setTopMostWindowSelector: SetterOrUpdater<WindowTitle>,
) => {
  const windows = windowsAtom.get();

  if (windows.length === 0) return windowsAtom.set([window]);

  if (windows.find(({ props }) => props.title === window.props.title)) {
    setFocusAtom(window.props.title as Focusable);
    setTopMostWindowSelector!(window.props.title as WindowTitle);
    return windows;
  }

  windowsAtom.set((currWindows) => [...currWindows, window]);
};

export const openLink = (
  anchorRef: RefObject<HTMLAnchorElement>,
  url: string,
) => {
  anchorRef.current!.href = url;
  anchorRef.current!.target = '_blank';
  anchorRef.current!.rel = 'noopener noreferrer';
  anchorRef.current!.click();

  anchorRef.current!.removeAttribute('href');
  anchorRef.current!.removeAttribute('target');
  anchorRef.current!.removeAttribute('rel');
};

export const handleDefaultKeydown = (
  e: KeyboardEvent,
  files: File[],
  focusAtom: Focusable,
  setHighlightAtom: SetterOrUpdater<Highlight>,
  property: keyof Highlight,
) => {
  if (focusAtom !== property) return;

  const keys = files.map(({ index, label }) => ({
    index: index,
    key: label[0].toLowerCase(),
  }));

  const key = keys.filter((key) => key.key === e.key.toLowerCase());

  if (key.length === 0) return;

  setHighlightAtom((currHighlight) => ({
    ...currHighlight,
    [property]:
      // Check if the key variable has more than one element or
      // the currently highlighted file with the given property
      // does not have the same index with the index of the
      // first element of the key variable
      key.length === 1 || currHighlight[property] !== 90 + key[0].index
        ? // If true, return the highlighted index of the first element
          90 + key[0].index
        : // Otherwise, get the element in the key variable with
          // the index of currently highlighted file
          90 +
          key[
            indexOf(key, {
              index: 90 + (currHighlight[property] as number),
              key: key[0].key,
            }) + 2
          ].index,
  }));
};
