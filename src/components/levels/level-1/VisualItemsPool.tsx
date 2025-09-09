import { useState, useMemo } from "react";
import type { VisualItem, ItemType } from "../../../types/game.types";
import DraggableVisualItem from "./DraggableVisualItem";

interface VisualItemsPoolProps {
  items: VisualItem[];
  title?: string;
  currentProblemType?: string;
  onGenerateMore?: (itemType: ItemType, count: number) => void;
  isFloating?: boolean;
}

export default function VisualItemsPool({ 
  items, 
  title = "Objetos Disponibles",
  currentProblemType,
  onGenerateMore,
  isFloating = false
}: VisualItemsPoolProps) {
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({});
  const [isMinimized, setIsMinimized] = useState(false); // Don't start minimized to show all items
  const ITEMS_PER_TYPE_PREVIEW = isFloating ? 6 : 8; // Show more items when floating
  
  // Mostrar todos los elementos, pero los usados se verán visualmente diferentes
  const availableItems = useMemo(() => 
    items.filter(item => 
      !currentProblemType || item.type === currentProblemType
    ), [items, currentProblemType]
  );
  
  // Agrupar elementos por tipo, solo los no usados para visualización
  const itemsByType = useMemo(() => 
    availableItems.filter(item => !item.isUsed).reduce((acc, item) => {
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
    <div className={`
      ${isFloating 
        ? 'bg-black/95 backdrop-blur-lg border-2 border-white/40 p-3 shadow-2xl h-auto' 
        : 'bg-white/10 backdrop-blur-sm border border-white/20 p-4'
      } 
      rounded-xl transition-all duration-300 relative
      ${isMinimized && isFloating ? 'max-h-12 overflow-hidden' : ''}
    `}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-white font-semibold flex items-center gap-2 ${isFloating ? 'text-base' : 'text-lg'}`}>
          <span>🎒</span>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {isFloating && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/70 hover:text-white transition-colors text-sm"
              title={isMinimized ? "Expandir" : "Minimizar"}
            >
              {isMinimized ? '🔼' : '🔽'}
            </button>
          )}
          <div className={`text-white/60 ${isFloating ? 'text-xs' : 'text-sm'}`}>
            {availableItems.filter(item => !item.isUsed).length} disponible{availableItems.filter(item => !item.isUsed).length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      {(!isFloating || !isMinimized) && (
        <>
          {availableItems.filter(item => !item.isUsed).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(itemsByType).map(([type, typeItems]) => {
                const isExpanded = expandedTypes[type] || false;
                const itemsToShow = isExpanded ? typeItems : typeItems.slice(0, ITEMS_PER_TYPE_PREVIEW);
                const hasMore = typeItems.length > ITEMS_PER_TYPE_PREVIEW;
                
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`text-white/80 font-medium ${isFloating ? 'text-xs' : 'text-sm'}`}>
                        {getTypeDisplayName(type)} ({typeItems.length})
                      </div>
                      <div className="flex items-center gap-2">
                        {hasMore && (
                          <button
                            onClick={() => toggleExpanded(type)}
                            className={`text-blue-400 hover:text-blue-300 transition-colors ${isFloating ? 'text-xs' : 'text-xs'}`}
                          >
                            {isExpanded ? '🔼 Menos' : '🔽 Más'}
                          </button>
                        )}
                        {onGenerateMore && typeItems.length < 20 && (
                          <button
                            onClick={() => onGenerateMore(type as ItemType, 10)}
                            className={`text-green-400 hover:text-green-300 transition-colors ${isFloating ? 'text-xs' : 'text-xs'}`}
                          >
                            ➕ Generar más
                          </button>
                        )}
                      </div>
                    </div>
                    <div className={`flex flex-wrap gap-2 justify-center p-2 bg-white/5 rounded-lg border border-white/10 ${isFloating ? 'min-h-[50px]' : 'min-h-[60px]'}`}>
                      {itemsToShow.map((item) => (
                        <DraggableVisualItem 
                          key={item.id} 
                          item={item} 
                          isFloating={isFloating}
                        />
                      ))}
                      {!isExpanded && hasMore && (
                        <div className={`flex items-center justify-center text-white/50 bg-white/10 rounded-lg px-2 py-1 border border-white/20 ${isFloating ? 'text-xs' : 'text-xs'}`}>
                          +{typeItems.length - ITEMS_PER_TYPE_PREVIEW} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className={`mb-2 ${isFloating ? 'text-2xl' : 'text-4xl'}`}>🎯</div>
              <p className={`text-white/70 ${isFloating ? 'text-xs' : 'text-sm'}`}>
                {currentProblemType 
                  ? '¡Todos los objetos de este problema han sido utilizados!'
                  : '¡Todos los objetos han sido utilizados!'
                }
              </p>
              <p className={`text-white/50 mt-1 ${isFloating ? 'text-xs' : 'text-xs'}`}>
                Verifica que los grupos estén completos
              </p>
            </div>
          )}
        </>
      )}

      {/* Pool decorations - reduced for floating mode */}
      {!isFloating && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-30"></div>
          <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
        </div>
      )}
    </div>
  );
}
