import type { RepeatedAdditionStats } from '../../../types/repeated-addition.types';

export default function RepeatedAdditionStats({
  totalProblems,
  completedProblems,
  progressPercentage,
  score,
  hintsRemaining,
  isLevelCompleted
}: RepeatedAdditionStats) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{completedProblems}</div>
            <div className="text-xs text-white/60">de {totalProblems}</div>
            <div className="text-xs text-white/60">Completados</div>
          </div>
          
          <div className="w-32 bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{Math.round(progressPercentage)}%</div>
            <div className="text-xs text-white/60">Progreso</div>
          </div>
        </div>

        {/* Score */}
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{score}</div>
          <div className="text-xs text-white/60">Puntos</div>
        </div>

        {/* Hints */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{hintsRemaining}</div>
          <div className="text-xs text-white/60">Pistas</div>
        </div>

        {/* Level completion status */}
        {isLevelCompleted && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
            <span className="text-green-400 text-lg">🎉</span>
            <span className="text-green-300 font-semibold text-sm">¡Nivel Completado!</span>
          </div>
        )}
      </div>
    </div>
  );
}
