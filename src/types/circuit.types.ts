// Types for Level 2: Circuit Constructor

export interface CircuitComponent {
  id: string;
  type: 'number' | 'operator' | 'result';
  value: number | string;
  position: { x: number; y: number };
  isConnected: boolean;
  connections: string[]; // IDs of connected components
}

export interface CircuitConnection {
  id: string;
  fromComponent: string;
  toComponent: string;
  isValid: boolean;
  path: { x1: number; y1: number; x2: number; y2: number };
}

export interface CircuitProblem {
  id: string;
  title: string;
  description: string;
  targetResult: number;
  availableNumbers: number[];
  requiredOperator: '×' | '÷';
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  isCompleted: boolean;
  solution?: {
    firstNumber: number;
    secondNumber: number;
    operator: string;
    result: number;
  };
}

export interface CircuitBoard {
  id: string;
  components: CircuitComponent[];
  connections: CircuitConnection[];
  inputSlots: ComponentSlot[];
  operatorSlot: ComponentSlot;
  resultSlot: ComponentSlot;
  isCompleted: boolean;
}

export interface ComponentSlot {
  id: string;
  type: 'input' | 'operator' | 'result';
  position: { x: number; y: number };
  acceptedType: 'number' | 'operator' | 'result';
  currentComponent: CircuitComponent | null;
  isHighlighted: boolean;
}

export interface CircuitGameState {
  currentProblemIndex: number;
  problems: CircuitProblem[];
  circuitBoard: CircuitBoard;
  availableComponents: CircuitComponent[];
  score: number;
  completedProblems: number;
  isLevelCompleted: boolean;
  timeSpent: number;
  hints: {
    used: number;
    available: number;
  };
}

export interface CircuitDragResult {
  success: boolean;
  message?: string;
  completedCircuit?: boolean;
  isCorrectSolution?: boolean;
}

// Circuit themes and visual styles
export interface CircuitTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  wireColor: string;
  sparkColor: string;
  backgroundGradient: string;
}
