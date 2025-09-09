import { create } from "zustand";

interface LevelStore {
  level: number;
}

interface LevelActions {
  setLevel: (level: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLevelStore = create<LevelStore & LevelActions>((set) => ({
  level: 1,
  setLevel: (level) => {
    set(() => ({ level }));
  },
}));
