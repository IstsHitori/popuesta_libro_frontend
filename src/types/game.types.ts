// Game Types - Representing multiplication as repeated addition and grouping

export interface MultiplicationProblem {
  id: string;
  result: number; // e.g., 24
  possibleGroupings: GroupingOption[]; // Different ways to form groups
  selectedGrouping: GroupingOption | null;
  isCompleted: boolean;
  story: string; // Story context for this problem
}

export interface GroupingOption {
  id: string;
  groupSize: number; // e.g., 6 (items per group)
  numberOfGroups: number; // e.g., 4 (total groups)
  description: string; // e.g., "4 grupos de 6 manzanas cada uno"
  visualItems: number[]; // Array representing the items to drag [6, 6, 6, 6]
}

export interface DraggableItem {
  id: string;
  value: number;
  isUsed: boolean;
  groupingId?: string; // Which grouping this item belongs to
}

export interface DropZone {
  id: string;
  problemId: string;
  groupingId: string;
  position: number; // Position in the group (0, 1, 2, etc.)
  acceptedValue: number | null;
}

export interface GameState {
  problems: MultiplicationProblem[];
  availableItems: DraggableItem[];
  currentProblemIndex: number;
  score: number;
  isLevelCompleted: boolean;
}

export type DragEndResult = {
  success: boolean;
  message?: string;
  completedProblem?: boolean;
  completedLevel?: boolean;
};
