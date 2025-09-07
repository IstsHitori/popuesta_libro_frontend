import { useDroppable } from "@dnd-kit/core";
import type { MultiplicationProblem, GroupingOption, DraggableItem } from "../../../types/game.types";

interface MultiplicationProblemComponentProps {
  problem: MultiplicationProblem;
  usedItemsForProblem: DraggableItem[];
}

export default function MultiplicationProblemComponent({ 
  problem, 
  usedItemsForProblem 
}: MultiplicationProblemComponentProps) {
  
  if (problem.isCompleted && problem.selectedGrouping) {
    return <CompletedProblem problem={problem} />;
  }

  return (
    <div className="bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm p-4 min-h-[200px]">
      {/* Problem header */}
      <div className="text-center mb-4">
        <h3 className="text-white text-lg font-bold mb-2">
          Resultado: {problem.result}
        </h3>
        <p className="text-white/80 text-sm mb-3">
          {problem.story}
        </p>
        <p className="text-green-400 text-sm font-semibold">
          ¡Forma grupos iguales arrastrando los números!
        </p>
      </div>

      {/* Grouping options */}
      <div className="space-y-3">
        {problem.possibleGroupings.map((grouping) => (
          <GroupingZone 
            key={grouping.id}
            grouping={grouping}
            problemId={problem.id}
            usedItems={usedItemsForProblem.filter(item => item.groupingId === grouping.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface GroupingZoneProps {
  grouping: GroupingOption;
  problemId: string;
  usedItems: DraggableItem[];
}

function GroupingZone({ grouping, problemId, usedItems }: GroupingZoneProps) {
  const isCompleted = usedItems.length === grouping.numberOfGroups;
  
  return (
    <div className={`
      border-2 border-dashed rounded-lg p-3 transition-all
      ${isCompleted 
        ? 'border-green-400 bg-green-500/20' 
        : 'border-white/40 hover:border-yellow-400/60'
      }
    `}>
      <div className="text-center mb-2">
        <span className="text-white text-sm font-medium">
          {grouping.description}
        </span>
        <div className="text-white/70 text-xs mt-1">
          {grouping.numberOfGroups} × {grouping.groupSize} = {grouping.numberOfGroups * grouping.groupSize}
        </div>
      </div>
      
      {/* Drop zones for each group */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: grouping.numberOfGroups }, (_, index) => (
          <GroupDropZone
            key={index}
            id={`${problemId}-${grouping.id}-position-${index}`}
            grouping={grouping}
            position={index}
            hasItem={index < usedItems.length}
            isCompleted={isCompleted}
          />
        ))}
      </div>
      
      {isCompleted && (
        <div className="text-center mt-2">
          <span className="text-green-400 text-sm font-semibold">
            ✅ ¡Correcto! {grouping.numberOfGroups} grupos de {grouping.groupSize}
          </span>
        </div>
      )}
    </div>
  );
}

interface GroupDropZoneProps {
  id: string;
  grouping: GroupingOption;
  position: number;
  hasItem: boolean;
  isCompleted: boolean;
}

function GroupDropZone({ id, grouping, hasItem, isCompleted }: GroupDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  
  const baseClasses = `
    flex items-center justify-center
    w-12 h-12 rounded-lg border-2 border-dashed
    font-bold text-sm transition-all duration-200
  `;
  
  const stateClasses = hasItem
    ? isCompleted
      ? 'bg-green-500 border-green-400 text-white'
      : 'bg-blue-500 border-blue-400 text-white'
    : isOver
      ? 'bg-yellow-400/30 border-yellow-400 text-white scale-105'
      : 'bg-white/10 border-white/40 text-white/60';
  
  return (
    <div ref={setNodeRef} className={`${baseClasses} ${stateClasses}`}>
      {hasItem ? grouping.groupSize : '?'}
    </div>
  );
}

function CompletedProblem({ problem }: { problem: MultiplicationProblem }) {
  const grouping = problem.selectedGrouping!;
  
  return (
    <div className="bg-green-500/20 rounded-xl border-2 border-green-400 p-4 min-h-[200px] flex flex-col justify-center">
      <div className="text-center">
        <h3 className="text-green-400 text-lg font-bold mb-2">
          ¡Problema Completado! 🎉
        </h3>
        <div className="text-white text-base mb-3">
          Resultado: {problem.result}
        </div>
        <div className="text-green-300 text-sm mb-4">
          {grouping.description}
        </div>
        
        {/* Visual representation */}
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {grouping.visualItems.map((value, index) => (
            <div key={index} className="bg-green-500 text-white w-10 h-10 rounded flex items-center justify-center text-sm font-bold">
              {value}
            </div>
          ))}
        </div>
        
        <div className="text-white/90 text-sm">
          {grouping.numberOfGroups} × {grouping.groupSize} = {problem.result}
        </div>
        <div className="text-white/70 text-xs mt-1">
          {grouping.visualItems.map(v => v).join(' + ')} = {problem.result}
        </div>
      </div>
    </div>
  );
}
