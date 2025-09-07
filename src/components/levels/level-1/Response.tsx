import { useDraggable } from "@dnd-kit/core";
import type { DraggableItem } from "../../../types/game.types";

interface DraggableItemProps {
  item: DraggableItem;
  isDisabled?: boolean;
}

export default function DraggableItemComponent({ 
  item, 
  isDisabled = false 
}: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled: isDisabled || item.isUsed,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;

  const baseClasses = `
    flex items-center justify-center
    w-12 h-12 sm:w-14 sm:h-14
    rounded-full
    text-white font-bold text-base sm:text-lg
    border-2 border-white/60
    shadow-lg
    transition-all duration-200
    cursor-grab active:cursor-grabbing
    select-none
  `;

  const stateClasses = item.isUsed 
    ? 'bg-gray-500/50 opacity-50 cursor-not-allowed' 
    : isDragging 
      ? 'bg-blue-600 scale-110 shadow-2xl' 
      : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${baseClasses} ${stateClasses}`}
      {...listeners}
      {...attributes}
    >
      {item.value}
    </div>
  );
}
