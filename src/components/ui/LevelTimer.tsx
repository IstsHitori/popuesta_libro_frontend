import { useLevelTimer } from '@/hooks/ui/useLevelTimer';
import { useLevelTimerStore } from '@/stores/level-timer.store';
import { useEffect } from 'react';

interface LevelTimerProps {
  isActive: boolean;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

export default function LevelTimer({ isActive, onTimeUpdate, className = '' }: LevelTimerProps) {
  const { seconds, formattedTime, startTimer, stopTimer } = useLevelTimer();
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

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
        <span className="text-lg">⏱️</span>
        <div className="text-white font-mono font-bold text-lg">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
