import { Link } from "react-router-dom";
import { CIRCUIT_THEME } from "../../../constants/circuit-config";

interface CircuitStatsProps {
  totalProblems: number;
  completedProblems: number;
  progressPercentage: number;
  score: number;
  hintsRemaining: number;
  isLevelCompleted: boolean;
}

export default function CircuitStats({ 
  totalProblems, 
  completedProblems, 
  progressPercentage,
  score,
  hintsRemaining,
  isLevelCompleted 
}: CircuitStatsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      
      {/* Progress section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-white text-base font-semibold">
            ⚡ Progreso del Circuito
          </h3>
          <span className="text-white/80 text-sm">
            {completedProblems}/{totalProblems}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="w-32 bg-white/20 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                background: `linear-gradient(90deg, ${CIRCUIT_THEME.primaryColor}, ${CIRCUIT_THEME.accentColor})`
              }}
            />
          </div>
          <span className="text-white/80 text-sm min-w-[3rem]">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* Stats section */}
      <div className="flex items-center gap-6">
        {/* Score */}
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-sm">Puntos:</span>
          <span 
            className="text-lg font-bold"
            style={{ color: CIRCUIT_THEME.accentColor }}
          >
            {score}
          </span>
        </div>

        {/* Hints */}
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-sm">Pistas:</span>
          <span className="text-blue-400 font-semibold">
            💡 {hintsRemaining}
          </span>
        </div>
      </div>
      
      {/* Level completion */}
      {isLevelCompleted && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-400 font-semibold">
            <span className="text-lg">🎉</span>
            <span className="text-sm">¡Nivel completado!</span>
          </div>
          <Link 
            to="/app/niveles/nivel-3" 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Siguiente Nivel →
          </Link>
        </div>
      )}
    </div>
  );
}
