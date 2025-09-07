import { useDroppable } from "@dnd-kit/core";
import type { GroupingOption, VisualItem as VisualItemType } from "../../../types/game.types";
import VisualItem from "./VisualItem";

interface VisualGroupingZoneProps {
  grouping: GroupingOption;
  problemId: string;
  isCompleted: boolean;
}

export default function VisualGroupingZone({ 
  grouping, 
  problemId, 
  isCompleted 
}: VisualGroupingZoneProps) {
  
  return (
    <div className={`
      border-2 border-dashed rounded-lg p-4 transition-all
      ${isCompleted 
        ? 'border-green-400 bg-green-500/20' 
        : 'border-white/40 hover:border-yellow-400/60'
      }
    `}>
      <div className="text-center mb-3">
        <span className="text-white text-sm font-medium">
          {grouping.description}
        </span>
        <div className="text-white/70 text-xs mt-1">
          {grouping.numberOfGroups} × {grouping.groupSize} = {grouping.numberOfGroups * grouping.groupSize}
        </div>
      </div>
      
      {/* Groups visualization */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: grouping.numberOfGroups }, (_, groupIndex) => (
          <GroupContainer
            key={groupIndex}
            problemId={problemId}
            groupingId={grouping.id}
            groupIndex={groupIndex}
            groupSize={grouping.groupSize}
            placedItems={grouping.placedItems[groupIndex] || []}
          />
        ))}
      </div>
      
      {isCompleted && (
        <div className="text-center mt-3">
          <span className="text-green-400 text-sm font-semibold">
            ✅ ¡Correcto! {grouping.numberOfGroups} grupos de {grouping.groupSize}
          </span>
        </div>
      )}
    </div>
  );
}

interface GroupContainerProps {
  problemId: string;
  groupingId: string;
  groupIndex: number;
  groupSize: number;
  placedItems: VisualItemType[];
}

function GroupContainer({ 
  problemId, 
  groupingId, 
  groupIndex, 
  groupSize, 
  placedItems 
}: GroupContainerProps) {
  const dropZoneId = `${problemId}-${groupingId}-group-${groupIndex}`;
  const { isOver, setNodeRef } = useDroppable({
    id: dropZoneId,
  });

  const isComplete = placedItems.length === groupSize;
  const canAcceptMore = placedItems.length < groupSize;

  return (
    <div 
      ref={setNodeRef}
      className={`
        min-w-[120px] min-h-[100px] p-3 rounded-lg border-2 transition-all
        ${isComplete 
          ? 'border-green-400 bg-green-500/20' 
          : canAcceptMore
          ? isOver 
            ? 'border-yellow-400 bg-yellow-400/20 scale-105' 
            : 'border-white/40 bg-white/5'
          : 'border-gray-400 bg-gray-500/20'
        }
      `}
      style={{
        boxShadow: isOver && canAcceptMore ? '0 0 20px rgba(255, 193, 7, 0.5)' : 'none'
      }}
    >
      <div className="text-center mb-2">
        <span className="text-white/70 text-xs">
          Grupo {groupIndex + 1}
        </span>
        <div className="text-white/60 text-xs">
          {placedItems.length}/{groupSize}
        </div>
      </div>
      
      {/* Items grid */}
      <div className="grid grid-cols-3 gap-1 justify-items-center">
        {/* Show placed items */}
        {placedItems.map((item) => (
          <VisualItem 
            key={item.id} 
            type={item.type} 
            size="small" 
          />
        ))}
        
        {/* Show empty slots */}
        {Array.from({ length: groupSize - placedItems.length }, (_, index) => (
          <div 
            key={`empty-${index}`}
            className={`
              w-6 h-6 border border-dashed rounded border-white/30
              ${isOver && canAcceptMore ? 'border-yellow-400 bg-yellow-400/20' : ''}
            `}
          />
        ))}
      </div>
      
      {!canAcceptMore && !isComplete && (
        <div className="text-center mt-2">
          <span className="text-red-400 text-xs">Lleno</span>
        </div>
      )}
    </div>
  );
}
