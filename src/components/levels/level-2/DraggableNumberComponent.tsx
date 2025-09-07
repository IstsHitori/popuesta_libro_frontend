import { useDraggable } from '@dnd-kit/core';
import type { DraggableNumber } from '../../../types/repeated-addition.types';

interface DraggableNumberProps {
  number: DraggableNumber;
  isOverlay?: boolean;
}

export default function DraggableNumberComponent({ number, isOverlay = false }: DraggableNumberProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: number.id,
    disabled: number.isUsed
  });

  if (number.isUsed && !isOverlay) {
    return null; // Don't render used numbers
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        w-14 h-14 rounded-lg border-2
        flex items-center justify-center
        cursor-pointer transition-all duration-200
        ${isOverlay
          ? 'bg-blue-500 border-blue-400 text-white scale-110 shadow-2xl z-50'
          : isDragging
          ? 'opacity-50 scale-95'
          : number.isUsed
          ? 'opacity-30 cursor-not-allowed bg-gray-500/20 border-gray-500/40'
          : 'bg-white/10 border-white/40 hover:bg-white/20 hover:border-white/60 hover:scale-105'
        }
      `}
      style={{
        transform: isOverlay ? 'rotate(5deg)' : undefined
      }}
    >
      <span className={`
        text-xl font-bold
        ${isOverlay 
          ? 'text-white' 
          : number.isUsed 
          ? 'text-gray-400' 
          : 'text-white'
        }
      `}>
        {number.value}
      </span>
    </div>
  );
}
