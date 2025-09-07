import { useDroppable } from '@dnd-kit/core';
import type { ResultZone } from '../../../types/math-city.types';

interface ResultDropZoneProps {
  resultZone: ResultZone;
}

export default function ResultDropZone({ resultZone }: ResultDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: resultZone.id,
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
      <h4 className="text-white font-bold text-center mb-4">
        🎯 Zona de Resultado
      </h4>
      
      <div className="text-center mb-4">
        <span className="text-white/70 text-sm">Arrastra la operación correcta aquí:</span>
      </div>
      
      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={`
          min-h-[100px] border-2 border-dashed rounded-lg p-4
          flex items-center justify-center
          transition-all duration-200
          ${isOver 
            ? 'border-amber-400 bg-amber-500/20 scale-105' 
            : resultZone.isHighlighted
            ? 'border-yellow-400 bg-yellow-500/20'
            : resultZone.currentOperation
            ? resultZone.isCorrect
              ? 'border-green-400 bg-green-500/20'
              : 'border-red-400 bg-red-500/20'
            : 'border-white/40 bg-white/5'
          }
        `}
      >
        {resultZone.currentOperation ? (
          <div className="text-center">
            <div className={`
              text-2xl font-bold mb-2
              ${resultZone.isCorrect 
                ? 'text-green-400' 
                : 'text-red-400'
              }
            `}>
              {resultZone.currentOperation.operation}
            </div>
            <div className={`
              text-lg
              ${resultZone.isCorrect 
                ? 'text-green-300' 
                : 'text-red-300'
              }
            `}>
              = {resultZone.currentOperation.result}
            </div>
            {resultZone.isCorrect && (
              <div className="text-green-300 text-sm mt-2 animate-pulse">
                ✅ ¡Operación Correcta!
              </div>
            )}
            {resultZone.isCorrect === false && (
              <div className="text-red-300 text-sm mt-2">
                ❌ Operación Incorrecta
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">📐</div>
            <div className="text-white/60 text-sm">
              Coloca la operación aquí
            </div>
            <div className="text-white/40 text-xs mt-1">
              Resultado esperado: {resultZone.targetResult}
            </div>
          </div>
        )}
      </div>
      
      {/* Expected result reminder */}
      <div className="mt-4 text-center">
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
          <span className="text-amber-300 text-sm">
            🎯 Resultado esperado: <span className="font-bold text-amber-200">{resultZone.targetResult}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
