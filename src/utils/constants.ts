export interface Coordinates {
  x: number;
  y: number;
}

export type WindowTitle =
  | 'about'
  | 'socials'
  | 'visitor-counter'
  | 'calculator';

export type Focusable = 'desktop' | 'taskbar' | 'start-menu' | WindowTitle;

export interface Highlight {
  desktop: number;
  'start-menu': number | number[];
  socials: number;
}

export interface File {
  index: number;
  src: string;
  label: string;
  nested?: File[];
}

export const desktopFiles: File[] = [
  {
    index: 1,
    src: '/static/images/icons/recycle-bin.png',
    label: 'Recycle Bin',
  },
  {
    index: 2,
    src: '/static/images/icons/folder.png',
    label: 'Projects',
  },
  {
    index: 3,
    src: '/static/images/icons/folder.png',
    label: 'Socials',
  },
  {
    index: 4,
    src: '/static/images/icons/resume.png',
    label: 'Resume',
  },
  {
    index: 5,
    src: '/static/images/icons/minecraft.png',
    label: 'Minecraft',
  },
];

export const startMenuFiles: File[] = [
  {
    index: 1,
    src: '/static/images/icons/programs.png',
    label: 'Programs',
    nested: [
      {
        index: 1,
        src: '/static/images/icons/internet.png',
        label: 'Visitor Counter',
      },
      {
        index: 2,
        src: '/static/images/icons/calculator.png',
        label: 'Calculator',
      },
    ],
  },
  {
    index: 2,
    src: '/static/images/icons/contact.png',
    label: 'Contact',
  },
  {
    index: 3,
    src: '/static/images/icons/about.png',
    label: 'About',
  },
  {
    index: 4,
    src: '/static/images/icons/shut-down.png',
    label: 'Shut Down',
  },
];

export const socialsFiles: File[] = [
  {
    index: 1,
    src: '/static/images/icons/github.png',
    label: 'GitHub',
  },
  {
    index: 2,
    src: '/static/images/icons/linkedin.png',
    label: 'LinkedIn',
  },
  {
    index: 3,
    src: '/static/images/icons/twitter.png',
    label: 'Twitter',
  },
];
