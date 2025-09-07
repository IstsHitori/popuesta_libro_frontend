import { useDraggable } from "@dnd-kit/core";
import type { CircuitComponent } from "../../../types/circuit.types";
import { CIRCUIT_THEME } from "../../../constants/circuit-config";

interface DraggableComponentProps {
  component: CircuitComponent;
  isOverlay?: boolean;
  allowRedrag?: boolean; // New prop to allow re-dragging from slots
}

export default function DraggableComponent({ 
  component, 
  isOverlay = false,
  allowRedrag = false 
}: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    disabled: component.isConnected && !allowRedrag, // Allow redrag when specified
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;

  const getComponentStyles = () => {
    switch (component.type) {
      case 'number':
        return {
          background: `linear-gradient(135deg, ${CIRCUIT_THEME.primaryColor}, ${CIRCUIT_THEME.secondaryColor})`,
          border: `2px solid ${CIRCUIT_THEME.primaryColor}`,
          boxShadow: `0 0 15px ${CIRCUIT_THEME.primaryColor}50`,
          color: 'white'
        };
      case 'operator':
        return {
          background: `linear-gradient(135deg, ${CIRCUIT_THEME.accentColor}, #f59e0b)`,
          border: `2px solid ${CIRCUIT_THEME.accentColor}`,
          boxShadow: `0 0 15px ${CIRCUIT_THEME.accentColor}50`,
          color: 'black'
        };
      case 'result':
        return {
          background: `linear-gradient(135deg, ${CIRCUIT_THEME.sparkColor}, #dc2626)`,
          border: `2px solid ${CIRCUIT_THEME.sparkColor}`,
          boxShadow: `0 0 15px ${CIRCUIT_THEME.sparkColor}50`,
          color: 'white'
        };
      default:
        return {};
    }
  };

  const getComponentIcon = () => {
    switch (component.type) {
      case 'number':
        return '🔢';
      case 'operator':
        return '⚡';
      case 'result':
        return '🎯';
      default:
        return '🔧';
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        relative flex flex-col items-center justify-center
        w-16 h-16 sm:w-20 sm:h-20
        rounded-xl
        font-bold text-lg sm:text-xl
        cursor-grab active:cursor-grabbing
        transition-all duration-200
        ${isDragging || isOverlay ? 'scale-110 rotate-3' : 'hover:scale-105'}
        ${component.isConnected ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{ ...style, ...getComponentStyles() }}
    >
      {/* Component icon */}
      <div className="text-xs mb-1">
        {getComponentIcon()}
      </div>
      
      {/* Component value */}
      <div className="font-bold">
        {component.value}
      </div>

      {/* Glow effect when dragging */}
      {(isDragging || isOverlay) && (
        <div 
          className="absolute inset-0 rounded-xl animate-pulse"
          style={{
            background: `radial-gradient(circle, ${CIRCUIT_THEME.primaryColor}20, transparent)`,
            filter: 'blur(8px)'
          }}
        />
      )}

      {/* Connected indicator */}
      {component.isConnected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );
}
