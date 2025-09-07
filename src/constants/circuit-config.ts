import type { CircuitProblem } from "../types/circuit.types";

// Circuit problems for Level 2 - focused on multiplication tables 2, 3, 4, 5
export const CIRCUIT_PROBLEMS: CircuitProblem[] = [
  {
    id: "circuit-1",
    title: "Primera Conexión",
    description: "Conecta los cables para que la máquina produzca 6 unidades de energía",
    targetResult: 6,
    availableNumbers: [2, 3, 4],
    requiredOperator: '×',
    difficulty: 'easy',
    hint: "Piensa en 2 × 3 o 3 × 2. ¡Ambas dan el mismo resultado!",
    isCompleted: false
  },
  {
    id: "circuit-2", 
    title: "Energía Doble",
    description: "El generador necesita producir 8 unidades. ¿Puedes configurarlo?",
    targetResult: 8,
    availableNumbers: [2, 4, 6],
    requiredOperator: '×',
    difficulty: 'easy',
    hint: "¿Qué número multiplicado por 2 da 8?",
    isCompleted: false
  },
  {
    id: "circuit-3",
    title: "Triple Potencia", 
    description: "Esta máquina debe generar 12 unidades para activar el sistema",
    targetResult: 12,
    availableNumbers: [3, 4, 6],
    requiredOperator: '×',
    difficulty: 'easy',
    hint: "Hay dos maneras: 3 × 4 o 4 × 3. ¡Prueba ambas!",
    isCompleted: false
  },
  {
    id: "circuit-4",
    title: "Cuatro por Cuatro",
    description: "El reactor necesita exactamente 16 unidades de energía",
    targetResult: 16,
    availableNumbers: [4, 8, 2],
    requiredOperator: '×',
    difficulty: 'medium',
    hint: "4 × 4 = 16. ¿Puedes encontrar otra combinación?",
    isCompleted: false
  },
  {
    id: "circuit-5",
    title: "Multiplicador de Cinco",
    description: "Programa la máquina para producir 15 unidades usando el número 5",
    targetResult: 15,
    availableNumbers: [3, 5, 6],
    requiredOperator: '×',
    difficulty: 'medium',
    hint: "5 × 3 = 15. La tabla del 5 es muy útil!",
    isCompleted: false
  },
  {
    id: "circuit-6",
    title: "Desafío Final",
    description: "El sistema maestro requiere 20 unidades para activarse completamente",
    targetResult: 20,
    availableNumbers: [4, 5, 10],
    requiredOperator: '×',
    difficulty: 'hard',
    hint: "Piensa en las tablas del 4 y del 5. ¿Cuál te lleva a 20?",
    isCompleted: false
  }
];

// Circuit board layout configuration
export const CIRCUIT_BOARD_CONFIG = {
  width: 800,
  height: 600,
  inputSlots: [
    { id: 'input-1', position: { x: 100, y: 200 }, type: 'input' as const },
    { id: 'input-2', position: { x: 100, y: 300 }, type: 'input' as const }
  ],
  operatorSlot: {
    id: 'operator',
    position: { x: 350, y: 250 },
    type: 'operator' as const
  },
  resultSlot: {
    id: 'result',
    position: { x: 600, y: 250 },
    type: 'result' as const
  }
};

// Visual theme for circuit elements
export const CIRCUIT_THEME = {
  primaryColor: '#00f5ff',      // Cyan eléctrico
  secondaryColor: '#1e40af',    // Azul profundo  
  accentColor: '#fbbf24',       // Amarillo dorado
  wireColor: '#06b6d4',         // Cyan para cables
  sparkColor: '#f59e0b',        // Naranja para chispas
  backgroundGradient: 'from-slate-900 via-blue-900 to-slate-800',
  glowEffect: '0 0 20px rgba(0, 245, 255, 0.5)',
  pulseColor: '#10b981'         // Verde para éxito
};

// Animation configurations
export const CIRCUIT_ANIMATIONS = {
  wireConnection: {
    duration: 300,
    ease: 'ease-out'
  },
  componentDrop: {
    duration: 200,
    bounce: 'ease-out'
  },
  success: {
    duration: 800,
    pulseCount: 3
  },
  sparkEffect: {
    duration: 1000,
    particleCount: 12
  }
};
