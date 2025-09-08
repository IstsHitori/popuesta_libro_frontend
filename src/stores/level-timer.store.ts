import { create } from 'zustand';

interface LevelTimerStore {
  currentLevelTime: number;
  setCurrentLevelTime: (time: number) => void;
  resetCurrentLevelTime: () => void;
}

export const useLevelTimerStore = create<LevelTimerStore>((set) => ({
  currentLevelTime: 0,
  setCurrentLevelTime: (time: number) => set({ currentLevelTime: time }),
  resetCurrentLevelTime: () => set({ currentLevelTime: 0 })
}));
