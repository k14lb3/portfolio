import { selector } from "recoil";
import { WindowTitle } from "@/utils/constants";
import { windowsPrecedenceState } from "./atoms";

export const topMostWindowState = selector<WindowTitle>({
  key: "topMostWindowState",
  get: ({ get }) => {
    const windowsPrecedenceAtom = get(windowsPrecedenceState);

    return windowsPrecedenceAtom[windowsPrecedenceAtom.length - 1];
  },
  set: ({ set }, title) =>
    set(windowsPrecedenceState, (currWindowsPrecedence) => {
      if (currWindowsPrecedence.find((_title) => _title === title))
        return [
          ...currWindowsPrecedence.filter((_title) => _title !== title),
          title,
        ] as WindowTitle[];

      return [...currWindowsPrecedence, title] as WindowTitle[];
    }),
});
