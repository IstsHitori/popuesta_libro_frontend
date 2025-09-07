import type { DraggableItem } from "../../../types/game.types";
import DraggableItemComponent from "./Response";

interface ItemsPoolProps {
  items: DraggableItem[];
  title?: string;
}

export default function ItemsPool({ items, title = "Números disponibles" }: ItemsPoolProps) {
  const availableItems = items.filter(item => !item.isUsed);
  
  return (
    <div className="p-4">
      <h3 className="text-white text-center text-base font-semibold mb-4">
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {availableItems.map((item) => (
          <DraggableItemComponent 
            key={item.id} 
            item={item} 
          />
        ))}
      </div>
      
      {availableItems.length === 0 && (
        <p className="text-white/70 text-sm mt-3 text-center">
          ¡Todos los números han sido utilizados!
        </p>
      )}
    </div>
  );
}
