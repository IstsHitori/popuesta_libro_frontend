import type { FortressMatrix } from '../../../types/fortress.types';

interface FortressMatrixProps {
  matrix: FortressMatrix;
}

export default function FortressMatrixComponent({ matrix }: FortressMatrixProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Mapa de la Fortaleza</h3>
        <div className="text-sm text-white/70">
          Progreso del Camino: {matrix.currentStep + 1} / {matrix.totalSteps}
        </div>
      </div>
      
      <div className="grid grid-cols-8 gap-1 p-4 bg-amber-900/20 rounded-xl border-2 border-amber-500/30">
        {matrix.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all duration-300
                ${cell.isPath 
                  ? cell.isCurrentPosition
                    ? 'bg-yellow-400 text-yellow-900 border-yellow-600 shadow-lg animate-pulse scale-110' // Posición actual
                    : cell.isCompleted
                    ? 'bg-green-400 text-green-900 border-green-600 shadow-md' // Completado
                    : 'bg-amber-300 text-amber-900 border-amber-500 shadow-sm' // Camino disponible
                  : 'bg-gray-600 text-gray-300 border-gray-500' // No es parte del camino
                }
              `}
            >
              {cell.value}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded border border-yellow-600"></div>
            <span className="text-white/90">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded border border-green-600"></div>
            <span className="text-white/90">Visitado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-300 rounded border border-amber-500"></div>
            <span className="text-white/90">Camino</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
            <span className="text-white/90">Muro</span>
          </div>
        </div>
        
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg px-3 py-1">
          <span className="text-amber-300 font-bold">
            {Math.round((matrix.currentStep / matrix.totalSteps) * 100)}% Completado
          </span>
        </div>
      </div>
    </div>
  );
}
