import { useState, useMemo } from "react";
import type { VisualItem, ItemType } from "../../../types/game.types";
import DraggableVisualItem from "./DraggableVisualItem";

interface VisualItemsPoolProps {
  items: VisualItem[];
  title?: string;
  currentProblemType?: string;
  onGenerateMore?: (itemType: ItemType, count: number) => void;
}

export default function VisualItemsPool({ 
  items, 
  title = "Objetos Disponibles",
  currentProblemType,
  onGenerateMore 
}: VisualItemsPoolProps) {
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({});
  const ITEMS_PER_TYPE_PREVIEW = 8; // Show only 8 items initially per type
  
  // Filter items to show only those for the current problem
  const availableItems = useMemo(() => 
    items.filter(item => 
      !item.isUsed && (!currentProblemType || item.type === currentProblemType)
    ), [items, currentProblemType]
  );
  
  // Group items by type for better visualization
  const itemsByType = useMemo(() => 
    availableItems.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, VisualItem[]>), [availableItems]
  );

  const toggleExpanded = (type: string) => {
    setExpandedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'apple': return '🍎 Manzanas';
      case 'crystal': return '💎 Cristales';
      case 'seed': return '🌱 Semillas';
      default: return type;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold flex items-center gap-2">
          <span>🎒</span>
          {title}
        </h3>
        <div className="text-white/60 text-sm">
          {availableItems.length} disponible{availableItems.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {availableItems.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(itemsByType).map(([type, typeItems]) => {
            const isExpanded = expandedTypes[type] || false;
            const itemsToShow = isExpanded ? typeItems : typeItems.slice(0, ITEMS_PER_TYPE_PREVIEW);
            const hasMore = typeItems.length > ITEMS_PER_TYPE_PREVIEW;
            
            return (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-white/80 text-sm font-medium">
                    {getTypeDisplayName(type)} ({typeItems.length})
                  </div>
                  <div className="flex items-center gap-2">
                    {hasMore && (
                      <button
                        onClick={() => toggleExpanded(type)}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {isExpanded ? '🔼 Menos' : '🔽 Más'}
                      </button>
                    )}
                    {onGenerateMore && typeItems.length < 20 && (
                      <button
                        onClick={() => onGenerateMore(type as ItemType, 10)}
                        className="text-xs text-green-400 hover:text-green-300 transition-colors"
                      >
                        ➕ Generar más
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center min-h-[60px] p-2 bg-white/5 rounded-lg border border-white/10">
                  {itemsToShow.map((item) => (
                    <DraggableVisualItem 
                      key={item.id} 
                      item={item} 
                    />
                  ))}
                  {!isExpanded && hasMore && (
                    <div className="flex items-center justify-center text-white/50 text-xs bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                      +{typeItems.length - ITEMS_PER_TYPE_PREVIEW} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-white/70 text-sm">
            {currentProblemType 
              ? '¡Todos los objetos de este problema han sido utilizados!'
              : '¡Todos los objetos han sido utilizados!'
            }
          </p>
          <p className="text-white/50 text-xs mt-1">
            Verifica que los grupos estén completos
          </p>
        </div>
      )}

      {/* Pool decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      </div>
    </div>
  );
}
