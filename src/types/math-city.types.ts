export interface MathCityProblem {
  id: string;
  title: string;
  description: string;
  groups: MathGroup[];
  availableOperations: MathOperation[];
  correctOperation: string; // La operación correcta como string "2+2+2"
  targetResult: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  isCompleted: boolean;
}

export interface MathGroup {
  id: string;
  type: 'manzanas' | 'cristales' | 'semillas';
  emoji: '🍎' | '💎' | '🌱';
  itemsPerGroup: number;
  groupCount: number;
  totalItems: number;
  position: { x: number; y: number };
}

export interface MathOperation {
  id: string;
  operation: string; // "2+2+2", "3+3+3+3", etc.
  result: number;
  isUsed: boolean;
  isCorrect: boolean;
  originalPosition: { x: number; y: number };
}

export interface MathCityGameState {
  currentProblemIndex: number;
  problems: MathCityProblem[];
  currentProblem: MathCityProblem;
  selectedOperation: MathOperation | null;
  isCompleted: boolean;
  completedProblems: number;
  hintsUsed: number;
  maxHints: number;
  isLevelCompleted: boolean;
}

export interface MathCityDropResult {
  success: boolean;
  message?: string;
  isCorrectOperation?: boolean;
  isCompletedProblem?: boolean;
  coinsEarned?: number;
  coinsLost?: number;
}

export interface MathCityStats {
  totalProblems: number;
  completedProblems: number;
  progressPercentage: number;
  hintsRemaining: number;
  currentProblem: MathCityProblem;
  isLevelCompleted: boolean;
}

export interface ResultZone {
  id: string;
  targetResult: number;
  currentOperation: MathOperation | null;
  isHighlighted: boolean;
  isCorrect: boolean | null;
}
