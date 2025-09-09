import type { MathGroup } from '../../../types/math-city.types';

interface FilledGroupDisplayProps {
  group: MathGroup;
}

export default function FilledGroupDisplay({ group }: FilledGroupDisplayProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
      <h4 className="text-white font-bold text-center mb-4 capitalize">
        {group.type} en la Ciudad Matemática
      </h4>
      
      {/* Groups container */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Array.from({ length: group.groupCount }, (_, groupIndex) => (
          <div 
            key={`group-${groupIndex}`}
            className="bg-white/5 border border-white/30 rounded-lg p-3 min-w-[100px]"
          >
            <div className="text-center mb-2">
              <span className="text-white/70 text-xs">Grupo {groupIndex + 1}</span>
            </div>
            
            {/* Items in this group */}
            <div className="flex flex-wrap gap-1 justify-center">
              {Array.from({ length: group.itemsPerGroup }, (_, itemIndex) => (
                <div 
                  key={`item-${groupIndex}-${itemIndex}`}
                  className="w-8 h-8 flex items-center justify-center rounded bg-white/10 border border-white/20"
                >
                  <span className="text-lg">{group.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="mt-6 text-center">
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
          <p className="text-amber-300 text-sm">
            <span className="font-bold">{group.groupCount} grupos</span> × <span className="font-bold">{group.itemsPerGroup} {group.type}</span> = <span className="font-bold text-amber-200">{group.totalItems} {group.type} en total</span>
          </p>
        </div>
      </div>
    </div>
  );
}
