import { useDraggable } from '@dnd-kit/core';
import type { MathOperation } from '../../../types/math-city.types';

interface DraggableOperationProps {
  operation: MathOperation;
  isOverlay?: boolean;
}

export default function DraggableOperation({ operation, isOverlay = false }: DraggableOperationProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: operation.id,
    disabled: operation.isUsed
  });

  if (operation.isUsed && !isOverlay) {
    return null; // Don't render used operations
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        px-4 py-3 rounded-lg border-2 min-w-[120px]
        flex items-center justify-center
        cursor-pointer transition-all duration-200
        ${isOverlay
          ? 'bg-amber-500 border-amber-400 text-white scale-110 shadow-2xl z-50'
          : isDragging
          ? 'opacity-50 scale-95'
          : operation.isUsed
          ? 'opacity-30 cursor-not-allowed bg-gray-500/20 border-gray-500/40'
          : 'bg-white/10 border-white/40 hover:bg-white/20 hover:border-amber-400 hover:scale-105'
        }
      `}
      style={{
        transform: isOverlay ? 'rotate(3deg)' : undefined
      }}
    >
      <div className="text-center">
        <div className={`
          text-lg font-bold
          ${isOverlay 
            ? 'text-white' 
            : operation.isUsed 
            ? 'text-gray-400' 
            : 'text-white'
          }
        `}>
          {operation.operation}
        </div>
      </div>
    </div>
  );
}
