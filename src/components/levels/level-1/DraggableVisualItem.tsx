import { useDraggable } from "@dnd-kit/core";
import { memo } from "react";
import type { VisualItem as VisualItemType } from "../../../types/game.types";
import VisualItem from "./VisualItem";

interface DraggableVisualItemProps {
  item: VisualItemType;
  isOverlay?: boolean;
}

const DraggableVisualItem = memo(function DraggableVisualItem({ 
  item, 
  isOverlay = false 
}: DraggableVisualItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled: item.isUsed,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        transition-transform duration-200 will-change-transform
        ${isDragging ? 'opacity-50 rotate-12 scale-110' : ''}
        ${item.isUsed ? 'opacity-30 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing hover:scale-105'}
        ${isOverlay ? 'rotate-12 scale-110' : ''}
      `}
    >
      <VisualItem 
        type={item.type} 
        size="medium"
        className={`
          ${isDragging ? 'shadow-2xl' : ''}
          ${isOverlay ? 'shadow-2xl opacity-90' : ''}
        `}
      />
    </div>
  );
});

export default DraggableVisualItem;
