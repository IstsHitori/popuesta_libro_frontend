import { useDroppable } from '@dnd-kit/core';
import type { MathOperation } from '../../../types/math-city.types';
import DraggableOperation from './DraggableOperation';

interface OperationsPoolProps {
  operations: MathOperation[];
  title?: string;
}

export default function OperationsPool({ operations, title = "Operaciones Disponibles" }: OperationsPoolProps) {
  const { setNodeRef } = useDroppable({
    id: 'operations-pool',
  });

  const availableOperations = operations.filter(op => !op.isUsed);
  const usedOperations = operations.filter(op => op.isUsed);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        🧮 {title}
        <span className="text-sm text-white/60">
          ({availableOperations.length} disponibles)
        </span>
      </h3>
      
      <div
        ref={setNodeRef}
        className="min-h-[100px] border-2 border-dashed border-white/30 rounded-lg p-4 bg-white/5"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {operations.map((operation) => (
            <DraggableOperation
              key={operation.id}
              operation={operation}
            />
          ))}
        </div>
        
        {operations.length === 0 && (
          <div className="text-center text-white/50 py-4">
            📐 No hay operaciones disponibles
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="mt-3 text-center">
        <p className="text-white/70 text-sm">
          🎯 Arrastra la operación que representa los grupos mostrados
        </p>
        {usedOperations.length > 0 && (
          <p className="text-white/50 text-xs mt-1">
            💡 Puedes devolver operaciones aquí para reutilizarlas
          </p>
        )}
      </div>
    </div>
  );
}
