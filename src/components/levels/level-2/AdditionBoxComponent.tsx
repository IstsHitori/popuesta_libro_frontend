import { useDroppable } from '@dnd-kit/core';
import type { AdditionBox } from '../../../types/repeated-addition.types';

interface AdditionBoxComponentProps {
  box: AdditionBox;
  targetResult: number;
  repetitions: number;
}

export default function AdditionBoxComponent({ box, targetResult, repetitions }: AdditionBoxComponentProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: box.id,
  });

  const isLastBox = box.position === repetitions - 1;

  return (
    <div className="flex items-center gap-2">
      {/* Addition Box */}
      <div
        ref={setNodeRef}
        className={`
          w-16 h-16 border-2 border-dashed rounded-lg
          flex items-center justify-center
          transition-all duration-200
          ${isOver 
            ? 'border-blue-400 bg-blue-500/20 scale-105' 
            : box.isHighlighted
            ? 'border-yellow-400 bg-yellow-500/20'
            : box.currentNumber !== null
            ? box.isCorrect
              ? 'border-green-400 bg-green-500/20'
              : 'border-red-400 bg-red-500/20'
            : 'border-white/40 bg-white/5'
          }
        `}
      >
        {box.currentNumber !== null ? (
          <span className={`
            text-2xl font-bold
            ${box.isCorrect 
              ? 'text-green-400' 
              : 'text-red-400'
            }
          `}>
            {box.currentNumber}
          </span>
        ) : (
          <span className="text-white/40 text-lg">?</span>
        )}
      </div>

      {/* Plus sign (except for the last box) */}
      {!isLastBox && (
        <span className="text-white text-xl font-bold">+</span>
      )}

      {/* Equals sign and result (only for the last box) */}
      {isLastBox && (
        <>
          <span className="text-white text-xl font-bold">=</span>
          <div className="w-16 h-16 border-2 border-white/40 rounded-lg flex items-center justify-center bg-white/10">
            <span className="text-white text-2xl font-bold">{targetResult}</span>
          </div>
        </>
      )}
    </div>
  );
}
