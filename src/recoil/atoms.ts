import { WindowProps } from '@/components/window';
import { WindowTitle, Focusable, Highlight } from '@/utils/constants';
import { FC } from 'react';
import { atom } from 'recoil';

export const visitorIpState = atom<string>({
  key: 'visitorIpState',
  default: '',
});

export const visitorsState = atom<string[]>({
  key: 'visitorsState',
  default: [],
});

export const bootState = atom<boolean>({
  key: 'bootState',
  default: false,
});

export const focusState = atom<Focusable>({
  key: 'focusedWindow',
  default: 'desktop',
});

export const highlightState = atom<Highlight>({
  key: 'highlightState',
  default: {
    desktop: 1,
    'start-menu': 0,
    socials: 1,
  },
});

export const startState = atom<boolean>({
  key: 'startState',
  default: false,
});

export const windowsState = atom<
  { component: FC<Partial<WindowProps>>; props: WindowProps }[]
>({
  key: 'windowsState',
  default: [],
});

export const windowsPrecedenceState = atom<WindowTitle[]>({
  key: 'windowsPrecedenceState',
  default: [],
});
