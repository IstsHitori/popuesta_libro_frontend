import type { MathCityStats } from '../../../types/math-city.types';

export default function MathCityStatsComponent({
  totalProblems,
  completedProblems,
  progressPercentage,
  hintsRemaining,
  isLevelCompleted
}: MathCityStats) {
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
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-amber-400">{Math.round(progressPercentage)}%</div>
            <div className="text-xs text-white/60">Progreso</div>
          </div>
        </div>

        {/* Hints */}
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{hintsRemaining}</div>
          <div className="text-xs text-white/60">Pistas</div>
        </div>

        {/* Level completion status */}
        {isLevelCompleted && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
            <span className="text-amber-400 text-lg">🎉</span>
            <span className="text-amber-300 font-semibold text-sm">¡Ciudad Matemática Completada!</span>
          </div>
        )}
      </div>
    </div>
  );
}
