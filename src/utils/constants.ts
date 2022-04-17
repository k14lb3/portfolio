export interface Coordinates {
  x: number;
  y: number;
}

export interface Icon {
  index: number;
  src: string;
  label: string;
}

export const desktopIcons: Icon[] = [
  {
    index: 1,
    src: "/static/images/icons/recycle-bin.png",
    label: "Recycle Bin",
  },
  {
    index: 2,
    src: "/static/images/icons/folder.png",
    label: "Projects",
  },
  {
    index: 3,
    src: "/static/images/icons/folder.png",
    label: "Socials",
  },
  {
    index: 4,
    src: "/static/images/icons/resume.png",
    label: "Resume",
  },
  {
    index: 5,
    src: "/static/images/icons/minecraft.png",
    label: "Minecraft",
  },
];

export const socialsIcons: Icon[] = [
  {
    index: 1,
    src: "/static/images/icons/github.png",
    label: "GitHub",
  },
  {
    index: 2,
    src: "/static/images/icons/linkedin.png",
    label: "LinkedIn",
  },
  {
    index: 3,
    src: "/static/images/icons/twitter.png",
    label: "Twitter",
  },
];
