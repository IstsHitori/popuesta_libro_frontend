import { Link } from "react-router-dom";

interface GameStatsProps {
  totalProblems: number;
  completedProblems: number;
  progressPercentage: number;
  isLevelCompleted: boolean;
}

export default function GameStats({ 
  totalProblems, 
  completedProblems, 
  progressPercentage,
  isLevelCompleted 
}: GameStatsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3">
      <div className="flex items-center gap-3">
        <h3 className="text-white text-base font-semibold">
          Progreso del juego
        </h3>
        <span className="text-white/80 text-sm">
          {completedProblems}/{totalProblems}
        </span>
      </div>
      
      {/* Compact progress bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xs">
        <div className="flex-1 bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-white/80 text-sm min-w-[3rem]">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      {/* Level completion with next level button */}
      {isLevelCompleted && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-400 font-semibold">
            <span className="text-lg">🎉</span>
            <span className="text-sm">¡Nivel completado!</span>
          </div>
          <Link 
            to="/app/niveles/nivel-2" 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Siguiente Nivel →
          </Link>
        </div>
      )}
    </div>
  );
}
