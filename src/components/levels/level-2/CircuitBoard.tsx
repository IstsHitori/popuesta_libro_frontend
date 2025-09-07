import { useDroppable } from "@dnd-kit/core";
import type { CircuitBoard as CircuitBoardType, CircuitProblem, ComponentSlot } from "../../../types/circuit.types";
import { CIRCUIT_THEME, CIRCUIT_BOARD_CONFIG } from "../../../constants/circuit-config";
import DraggableComponent from "./DraggableComponent";

interface CircuitBoardProps {
  board: CircuitBoardType;
  currentProblem: CircuitProblem;
}

export default function CircuitBoard({ board, currentProblem }: CircuitBoardProps) {
  return (
    <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/20 p-6 min-h-[400px]">
      {/* Board title */}
      <div className="text-center mb-6">
        <h2 
          className="text-2xl font-bold mb-2"
          style={{ color: CIRCUIT_THEME.primaryColor }}
        >
          ⚡ {currentProblem.title}
        </h2>
        <div className="flex items-center justify-center gap-4 text-white/80">
          <span>Objetivo: {currentProblem.targetResult} unidades</span>
          <span>•</span>
          <span>Operación: Multiplicación (×)</span>
        </div>
      </div>

      {/* Circuit visualization area */}
      <div 
        className="relative mx-auto"
        style={{ 
          width: CIRCUIT_BOARD_CONFIG.width * 0.8, 
          height: CIRCUIT_BOARD_CONFIG.height * 0.6 
        }}
      >
        {/* Background grid effect */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Input slots */}
        {board.inputSlots.map((slot, index) => (
          <DropSlot 
            key={slot.id}
            slot={slot}
            position={{ 
              x: 60 + index * 120, 
              y: 100 
            }}
            label={`Número ${index + 1}`}
          />
        ))}

        {/* Operator display (fixed) */}
        <div 
          className="absolute flex flex-col items-center"
          style={{ 
            left: 320, 
            top: 100 
          }}
        >
          <div className="text-white/60 text-xs mb-2">Operador</div>
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-xl"
            style={{
              background: `linear-gradient(135deg, ${CIRCUIT_THEME.accentColor}, #f59e0b)`,
              border: `2px solid ${CIRCUIT_THEME.accentColor}`,
              boxShadow: `0 0 15px ${CIRCUIT_THEME.accentColor}50`,
              color: 'black'
            }}
          >
            {currentProblem.requiredOperator}
          </div>
        </div>

        {/* Result display (fixed) */}
        <div 
          className="absolute flex flex-col items-center"
          style={{ 
            left: 480, 
            top: 100 
          }}
        >
          <div className="text-white/60 text-xs mb-2">Resultado</div>
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-xl"
            style={{
              background: `linear-gradient(135deg, ${CIRCUIT_THEME.sparkColor}, #dc2626)`,
              border: `2px solid ${CIRCUIT_THEME.sparkColor}`,
              boxShadow: `0 0 15px ${CIRCUIT_THEME.sparkColor}50`,
              color: 'white'
            }}
          >
            {currentProblem.targetResult}
          </div>
        </div>

        {/* Circuit wires/connections */}
        <CircuitWires board={board} />

        {/* Success effect */}
        {board.isCompleted && <SuccessEffect />}
      </div>

      {/* Circuit status */}
      <div className="mt-6 text-center">
        {board.isCompleted ? (
          <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
            <span className="text-xl">⚡</span>
            <span>¡Circuito activado con éxito!</span>
            <span className="text-xl">⚡</span>
          </div>
        ) : (
          <div className="text-white/60">
            Arrastra los números a los espacios correspondientes para completar el circuito
          </div>
        )}
      </div>
    </div>
  );
}

// Drop slot component
interface DropSlotProps {
  slot: ComponentSlot;
  position: { x: number; y: number };
  label: string;
}

function DropSlot({ slot, position, label }: DropSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: slot.id,
  });

  return (
    <div 
      className="absolute flex flex-col items-center"
      style={{ 
        left: position.x, 
        top: position.y 
      }}
    >
      <div className="text-white/60 text-xs mb-2">{label}</div>
      <div
        ref={setNodeRef}
        className={`
          w-20 h-20 rounded-xl border-2 border-dashed transition-all duration-200
          flex items-center justify-center relative overflow-hidden
          ${isOver 
            ? 'border-yellow-400 bg-yellow-400/20 scale-105' 
            : 'border-white/50 bg-white/10'
          }
        `}
        style={{
          boxShadow: isOver ? `0 0 20px ${CIRCUIT_THEME.accentColor}50` : 'none'
        }}
      >
        {slot.currentComponent ? (
          <div className="w-full h-full flex items-center justify-center">
            <DraggableComponent 
              component={slot.currentComponent} 
              allowRedrag={true} 
            />
          </div>
        ) : (
          <div className="text-white/40 text-2xl">
            {isOver ? '⚡' : '?'}
          </div>
        )}
      </div>
    </div>
  );
}

// Circuit wires visualization
function CircuitWires({ board }: { board: CircuitBoardType }) {
  const filledInputs = board.inputSlots.filter(slot => slot.currentComponent !== null);
  
  if (filledInputs.length === 0) return null;

  return (
    <svg 
      className="absolute inset-0 pointer-events-none"
      width="100%" 
      height="100%"
    >
      {/* Draw wires from inputs to operator - One per filled slot */}
      {filledInputs.map((slot) => {
        // Calculate exact coordinates based on slot index, not filled index
        const slotIndex = board.inputSlots.findIndex(s => s.id === slot.id);
        const startX = 100 + slotIndex * 120; // Use original slot position
        const startY = 140;
        const endX = 360;
        const endY = 140;
        
        return (
          <g key={`wire-${slot.id}`}>
            {/* Wire glow effect */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={CIRCUIT_THEME.wireColor}
              strokeWidth="6"
              opacity="0.3"
              filter="blur(2px)"
            />
            {/* Main wire */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={CIRCUIT_THEME.wireColor}
              strokeWidth="3"
              strokeDasharray={board.isCompleted ? "none" : "5,5"}
              className={board.isCompleted ? "animate-pulse" : ""}
            />
            {/* Animated energy particles */}
            {board.isCompleted && (
              <circle
                r="3"
                fill={CIRCUIT_THEME.sparkColor}
                className="animate-ping"
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path={`M${startX},${startY} L${endX},${endY}`}
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* Wire from operator to result - Only when both inputs are filled */}
      {filledInputs.length === 2 && (
        <g>
          <line
            x1={400} // Updated: Right edge of operator (360 + 40)
            y1={140} // Updated: Center Y
            x2={480} // Updated: Left edge of result
            y2={140} // Updated: Center Y
            stroke={CIRCUIT_THEME.wireColor}
            strokeWidth="6"
            opacity="0.3"
            filter="blur(2px)"
          />
          <line
            x1={400} // Updated: Right edge of operator
            y1={140} // Updated: Center Y
            x2={480} // Updated: Left edge of result
            y2={140} // Updated: Center Y
            stroke={CIRCUIT_THEME.wireColor}
            strokeWidth="3"
            strokeDasharray={board.isCompleted ? "none" : "5,5"}
            className={board.isCompleted ? "animate-pulse" : ""}
          />
          {board.isCompleted && (
            <circle
              r="4"
              fill={CIRCUIT_THEME.sparkColor}
              className="animate-ping"
            >
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path={`M400,140 L480,140`}
              />
            </circle>
          )}
        </g>
      )}
    </svg>
  );
}

// Success effect component
function SuccessEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Sparks effect */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-ping"
          style={{
            backgroundColor: CIRCUIT_THEME.sparkColor,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
      
      {/* Glow overlay */}
      <div 
        className="absolute inset-0 rounded-xl animate-pulse"
        style={{
          background: `radial-gradient(circle, ${CIRCUIT_THEME.primaryColor}10, transparent)`,
          boxShadow: `inset 0 0 50px ${CIRCUIT_THEME.primaryColor}30`
        }}
      />
    </div>
  );
}
