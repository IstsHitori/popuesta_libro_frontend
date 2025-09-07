import { useDroppable } from '@dnd-kit/core';
import type { DraggableNumber } from '../../../types/repeated-addition.types';
import DraggableNumberComponent from './DraggableNumberComponent';

interface NumbersPoolProps {
  numbers: DraggableNumber[];
  title?: string;
}

export default function NumbersPool({ numbers, title = "Números Disponibles" }: NumbersPoolProps) {
  const { setNodeRef } = useDroppable({
    id: 'numbers-pool',
  });

  const availableNumbers = numbers.filter(num => !num.isUsed);
  const usedNumbers = numbers.filter(num => num.isUsed);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        🔢 {title}
        <span className="text-sm text-white/60">
          ({availableNumbers.length} disponibles)
        </span>
      </h3>
      
      <div
        ref={setNodeRef}
        className="min-h-[80px] border-2 border-dashed border-white/30 rounded-lg p-4 bg-white/5"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {numbers.map((number) => (
            <DraggableNumberComponent
              key={number.id}
              number={number}
            />
          ))}
        </div>
        
        {numbers.length === 0 && (
          <div className="text-center text-white/50 py-4">
            🔧 No hay componentes disponibles en el laboratorio
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="mt-3 text-center">
        <p className="text-white/70 text-sm">
          🔧 Arrastra los componentes a los circuitos para programar la suma
        </p>
        {usedNumbers.length > 0 && (
          <p className="text-white/50 text-xs mt-1">
            💡 Puedes devolver componentes al laboratorio para reutilizarlos
          </p>
        )}
      </div>
    </div>
  );
}
