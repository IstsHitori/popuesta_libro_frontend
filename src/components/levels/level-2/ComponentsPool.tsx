import { useDroppable } from "@dnd-kit/core";
import type { CircuitComponent } from "../../../types/circuit.types";
import DraggableComponent from "./DraggableComponent";
import { CIRCUIT_THEME } from "../../../constants/circuit-config";

interface ComponentsPoolProps {
  components: CircuitComponent[];
  title?: string;
}

export default function ComponentsPool({ 
  components, 
  title = "Componentes Disponibles" 
}: ComponentsPoolProps) {
  const availableComponents = components.filter(comp => !comp.isConnected);
  
  // Drop zone for returning components to pool
  const { isOver, setNodeRef } = useDroppable({
    id: 'components-pool',
  });
  
  return (
    <div 
      ref={setNodeRef}
      className={`
        bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 transition-all duration-200
        ${isOver ? 'border-green-400 bg-green-400/20 scale-[1.02]' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold flex items-center gap-2">
          <span>🔧</span>
          {title}
          {isOver && <span className="text-green-400 animate-pulse">← Soltar aquí</span>}
        </h3>
        <div className="text-white/60 text-sm">
          {availableComponents.length} disponible{availableComponents.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center min-h-[100px] items-center">
        {availableComponents.length > 0 ? (
          availableComponents.map((component) => (
            <DraggableComponent 
              key={component.id} 
              component={component} 
            />
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">⚡</div>
            <p className="text-white/70 text-sm">
              ¡Todos los componentes han sido conectados!
            </p>
            <p className="text-white/50 text-xs mt-1">
              Verifica que el circuito esté completo
            </p>
          </div>
        )}
      </div>

      {/* Pool decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        {/* Animated circuit lines */}
        <div 
          className="absolute top-0 left-0 w-full h-1 opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${CIRCUIT_THEME.primaryColor}, transparent)`,
            animation: 'pulse 2s infinite'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-full h-1 opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${CIRCUIT_THEME.accentColor}, transparent)`,
            animation: 'pulse 2s infinite reverse'
          }}
        />
      </div>
    </div>
  );
}
