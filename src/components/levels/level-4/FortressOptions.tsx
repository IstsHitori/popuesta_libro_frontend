import type { FortressOption } from '../../../types/fortress.types';

interface FortressOptionsProps {
  options: FortressOption[];
  currentTarget: number;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export default function FortressOptions({ 
  options, 
  currentTarget, 
  onSelectOption, 
  disabled = false 
}: FortressOptionsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-2">⚔️ Opciones de Batalla</h3>
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
          <p className="text-orange-300 text-sm font-medium mb-1">Objetivo Actual:</p>
          <p className="text-3xl font-bold text-orange-400">{currentTarget}</p>
          <p className="text-orange-300 text-xs mt-1">
            Encuentra la operación que dé este resultado
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-white/90 text-sm text-center">
          🛡️ <strong>Recuerda:</strong> Solo puedes usar números iguales en la operación
        </p>
      </div>
      
      {/* Opciones en layout horizontal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            disabled={disabled}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 font-semibold text-center
              ${disabled
                ? 'bg-gray-500/50 border-gray-400 text-gray-300 cursor-not-allowed'
                : 'bg-amber-600/80 hover:bg-amber-500 border-amber-400 text-white hover:border-amber-300 hover:shadow-lg hover:scale-105 active:scale-95'
              }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="w-8 h-8 bg-amber-800 text-amber-200 rounded-full flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <div className="text-sm">
                {option.expression}
              </div>
              <div className="text-amber-200 text-xs">
                = {option.result}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-xs text-center">
          💰 <strong>Respuesta correcta:</strong> +1 moneda | 
          ❌ <strong>Respuesta incorrecta:</strong> -1 moneda
        </p>
      </div>
    </div>
  );
}
