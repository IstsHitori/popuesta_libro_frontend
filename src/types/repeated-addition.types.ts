export interface RepeatedAdditionProblem {
  id: string;
  title: string;
  description: string;
  targetResult: number;
  correctNumber: number; // El número que debe repetirse
  repetitions: number; // Cuántas veces se repite (número de cajas)
  availableNumbers: number[]; // Números disponibles para arrastrar (incluye distractores)
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  isCompleted: boolean;
}

export interface AdditionBox {
  id: string;
  position: number; // 0, 1, 2, etc.
  currentNumber: number | null;
  isHighlighted: boolean;
  isCorrect: boolean | null;
}

export interface DraggableNumber {
  id: string;
  value: number;
  isUsed: boolean;
  originalPosition: { x: number; y: number };
}

export interface RepeatedAdditionGameState {
  currentProblemIndex: number;
  problems: RepeatedAdditionProblem[];
  currentProblem: RepeatedAdditionProblem;
  additionBoxes: AdditionBox[];
  availableNumbers: DraggableNumber[];
  isCompleted: boolean;
  completedProblems: number;
  hintsUsed: number;
  maxHints: number;
  isLevelCompleted: boolean;
}

export interface AdditionDropResult {
  success: boolean;
  message?: string;
  isCorrectPlacement?: boolean;
  isCompletedProblem?: boolean;
  coinsEarned?: number;
  coinsLost?: number;
}

export interface RepeatedAdditionStats {
  totalProblems: number;
  completedProblems: number;
  progressPercentage: number;
  hintsRemaining: number;
  currentProblem: RepeatedAdditionProblem;
  isLevelCompleted: boolean;
}
