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
    src: "/static/images/icons/projects.png",
    label: "Projects",
  },
  {
    index: 3,
    src: "/static/images/icons/resume.png",
    label: "Resume",
  },
  {
    index: 4,
    src: "/static/images/icons/minecraft.png",
    label: "Minecraft",
  },
];
