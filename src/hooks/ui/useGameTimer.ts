import { useState, useEffect } from 'react';

interface UseGameTimerReturn {
  totalSeconds: number;
  formattedTotalTime: string;
  addLevelTime: (levelSeconds: number) => void;
  resetGameTimer: () => void;
}

export const useGameTimer = (): UseGameTimerReturn => {
  const [totalSeconds, setTotalSeconds] = useState(() => {
    // Recuperar tiempo total del localStorage si existe
    const savedTime = localStorage.getItem('game-total-time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  useEffect(() => {
    // Guardar tiempo total en localStorage
    localStorage.setItem('game-total-time', totalSeconds.toString());
  }, [totalSeconds]);

  const addLevelTime = (levelSeconds: number) => {
    setTotalSeconds(prev => prev + levelSeconds);
  };

  const resetGameTimer = () => {
    setTotalSeconds(0);
    localStorage.removeItem('game-total-time');
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    totalSeconds,
    formattedTotalTime: formatTime(totalSeconds),
    addLevelTime,
    resetGameTimer
  };
};
