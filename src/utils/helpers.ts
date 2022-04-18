export const generateRandomNumber = (
  min: number = 0,
  max: number = 1
): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const convertPxToVh = (px: number, screenHeight: number) =>
  px * (100 / screenHeight);

export const convertVhtoPx = (vh: number, screenHeight: number) =>
  vh * (screenHeight / 100);
