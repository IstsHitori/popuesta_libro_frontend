import type { AdditionBox } from '../../../types/repeated-addition.types';

interface TechCircuitProps {
  boxes: AdditionBox[];
  targetResult: number;
  isCompleted: boolean;
}

export default function TechCircuit({ boxes, targetResult, isCompleted }: TechCircuitProps) {
  const correctBoxes = boxes.filter(box => box.isCorrect === true).length;
  const totalBoxes = boxes.length;
  const progressPercentage = (correctBoxes / totalBoxes) * 100;

  return (
    <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4 mt-4">
      <h4 className="text-cyan-400 font-bold text-center mb-3 flex items-center justify-center gap-2">
        <span className="text-lg">⚡</span>
        Circuito Tecnológico de Suma
        <span className="text-lg">⚡</span>
      </h4>
      
      {/* Circuit visualization */}
      <div className="relative bg-black/40 rounded-lg p-4 border border-gray-600">
        {/* Power source */}
        <div className="flex items-center justify-center mb-4">
          <div className={`
            w-12 h-8 rounded border-2 flex items-center justify-center text-xs font-bold
            ${isCompleted 
              ? 'border-green-400 bg-green-500/20 text-green-400 animate-pulse' 
              : 'border-gray-500 bg-gray-800/50 text-gray-400'
            }
          `}>
            {isCompleted ? 'ON' : 'OFF'}
          </div>
        </div>

        {/* Circuit lines */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Array.from({ length: totalBoxes + 1 }, (_, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Circuit node */}
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                transition-all duration-300
                ${index < correctBoxes 
                  ? 'border-cyan-400 bg-cyan-500/30 shadow-lg shadow-cyan-500/50' 
                  : index === correctBoxes && correctBoxes > 0
                  ? 'border-yellow-400 bg-yellow-500/30 animate-pulse'
                  : 'border-gray-500 bg-gray-800/50'
                }
              `}>
                {index < correctBoxes && (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                )}
              </div>
              
              {/* Connection line to next node */}
              {index < totalBoxes && (
                <div className={`
                  w-8 h-0.5 mt-2 transition-all duration-300
                  ${index < correctBoxes 
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-sm shadow-cyan-400' 
                    : 'bg-gray-600'
                  }
                `} />
              )}
              
              {/* Result indicator at the end */}
              {index === totalBoxes && isCompleted && (
                <div className="mt-2 text-green-400 text-xs font-bold animate-bounce">
                  = {targetResult}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className={`
              h-2 rounded-full transition-all duration-500
              ${isCompleted 
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 animate-pulse' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }
            `}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Status display */}
        <div className="text-center">
          <div className="text-cyan-300 text-sm">
            Energía del Circuito: {correctBoxes}/{totalBoxes} conexiones
          </div>
          {isCompleted && (
            <div className="text-green-400 text-sm font-bold mt-1 animate-pulse">
              🎯 ¡Circuito Activado! Resultado: {targetResult}
            </div>
          )}
        </div>
      </div>

      {/* Technical readout */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-black/30 rounded p-2 border border-gray-600">
          <div className="text-gray-400">Estado:</div>
          <div className={isCompleted ? 'text-green-400' : 'text-yellow-400'}>
            {isCompleted ? 'OPERATIVO' : 'CARGANDO...'}
          </div>
        </div>
        <div className="bg-black/30 rounded p-2 border border-gray-600">
          <div className="text-gray-400">Voltaje:</div>
          <div className="text-cyan-400">
            {Math.round(progressPercentage)}%
          </div>
        </div>
      </div>
    </div>
  );
}
