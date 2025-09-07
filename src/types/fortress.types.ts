export interface MatrixCell {
  value: number;
  isPath: boolean;
  isCurrentPosition: boolean;
  isCompleted: boolean;
  isTarget: boolean;
  row: number;
  col: number;
}

export interface FortressMatrix {
  grid: MatrixCell[][];
  path: { row: number; col: number; value: number }[];
  currentStep: number;
  totalSteps: number;
}

export interface FortressOption {
  id: string;
  expression: string;
  result: number;
  isCorrect: boolean;
}

export interface FortressProblem {
  id: string;
  title: string;
  description: string;
  matrix: FortressMatrix;
  currentTarget: number;
  options: FortressOption[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FortressGameState {
  currentProblemIndex: number;
  isLevelCompleted: boolean;
  currentProblem: FortressProblem;
}

export interface FortressStats {
  totalSteps: number;
  completedSteps: number;
  progressPercentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  hintsRemaining: number;
  coinsEarned: number;
  coinsLost: number;
  currentProblem: FortressProblem;
  isLevelCompleted: boolean;
}
