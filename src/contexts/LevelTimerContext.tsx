import { createContext, useContext, ReactNode } from 'react';

interface LevelTimerContextType {
  levelTime: number;
}

const LevelTimerContext = createContext<LevelTimerContextType | undefined>(undefined);

interface LevelTimerProviderProps {
  children: ReactNode;
  levelTime: number;
}

export function LevelTimerProvider({ children, levelTime }: LevelTimerProviderProps) {
  return (
    <LevelTimerContext.Provider value={{ levelTime }}>
      {children}
    </LevelTimerContext.Provider>
  );
}

export function useLevelTimerContext() {
  const context = useContext(LevelTimerContext);
  if (context === undefined) {
    throw new Error('useLevelTimerContext must be used within a LevelTimerProvider');
  }
  return context;
}
