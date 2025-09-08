import { useLevelTimer } from '@/hooks/ui/useLevelTimer';
import { useLevelTimerStore } from '@/stores/level-timer.store';
import { useEffect } from 'react';

interface LevelTimerProps {
  isActive: boolean;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

export default function LevelTimer({ isActive, onTimeUpdate, className = '' }: LevelTimerProps) {
  const { seconds, formattedTime, startTimer, stopTimer, resetTimer } = useLevelTimer();
  const { setCurrentLevelTime } = useLevelTimerStore();

  useEffect(() => {
    if (isActive) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isActive, startTimer, stopTimer]);

  useEffect(() => {
    setCurrentLevelTime(seconds);
    if (onTimeUpdate) {
      onTimeUpdate(seconds);
    }
  }, [seconds, onTimeUpdate, setCurrentLevelTime]);

  const resetTimerHandler = () => {
    resetTimer();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
        <span className="text-lg">⏱️</span>
        <div className="text-white font-mono font-bold text-lg">
          {formattedTime}
        </div>
      </div>
      {/* Botón de reset solo para debugging - se puede quitar en producción */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetTimerHandler}
          className="text-white/60 hover:text-white text-xs bg-red-500/20 px-2 py-1 rounded"
        >
          Reset
        </button>
      )}
    </div>
  );
}
