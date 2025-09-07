import { useState, useCallback, useMemo } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import type { 
  MultiplicationProblem, 
  DraggableItem, 
  GameState, 
  DragEndResult,
  GroupingOption
} from '../../types/game.types';

// Following SOLID principles: Single Responsibility Principle
// This hook only manages game state and logic for multiplication as repeated addition
export const useMultiplicationGame = () => {
  
  // Game configuration - Problems that teach multiplication as repeated addition
  const PROBLEMS_CONFIG = useMemo(() => [
    {
      result: 24,
      story: "En el bosque hay 24 manzanas mágicas. Ari debe organizarlas en grupos iguales para entender cómo 6×4 = 6+6+6+6 = 24",
      groupings: [
        { groupSize: 6, numberOfGroups: 4, description: "4 grupos de 6 manzanas" },
        { groupSize: 4, numberOfGroups: 6, description: "6 grupos de 4 manzanas" },
        { groupSize: 8, numberOfGroups: 3, description: "3 grupos de 8 manzanas" },
      ]
    },
    {
      result: 18,
      story: "Tika encuentra 18 cristales brillantes. Debe agruparlos para mostrar que 3×6 = 3+3+3+3+3+3 = 18",
      groupings: [
        { groupSize: 3, numberOfGroups: 6, description: "6 grupos de 3 cristales" },
        { groupSize: 6, numberOfGroups: 3, description: "3 grupos de 6 cristales" },
        { groupSize: 9, numberOfGroups: 2, description: "2 grupos de 9 cristales" },
      ]
    },
    {
      result: 20,
      story: "Caós ha esparcido 20 semillas. Ari debe organizarlas para demostrar que 5×4 = 5+5+5+5 = 20",
      groupings: [
        { groupSize: 5, numberOfGroups: 4, description: "4 grupos de 5 semillas" },
        { groupSize: 4, numberOfGroups: 5, description: "5 grupos de 4 semillas" },
        { groupSize: 10, numberOfGroups: 2, description: "2 grupos de 10 semillas" },
      ]
    }
  ], []);

  // Generate initial game state
  const generateInitialState = useCallback((): GameState => {
    const problems: MultiplicationProblem[] = PROBLEMS_CONFIG.map((config, index) => {
      const groupingOptions: GroupingOption[] = config.groupings.map((grouping, gIndex) => ({
        id: `grouping-${index}-${gIndex}`,
        groupSize: grouping.groupSize,
        numberOfGroups: grouping.numberOfGroups,
        description: grouping.description,
        visualItems: Array(grouping.numberOfGroups).fill(grouping.groupSize),
      }));

      return {
        id: `problem-${index + 1}`,
        result: config.result,
        possibleGroupings: groupingOptions,
        selectedGrouping: null,
        isCompleted: false,
        story: config.story,
      };
    });

    // Generate available items for dragging - Calculate required quantities
    const requiredValues = new Map<number, number>();
    
    problems.forEach(problem => {
      problem.possibleGroupings.forEach(grouping => {
        const currentCount = requiredValues.get(grouping.groupSize) || 0;
        // Each grouping needs enough items to fill all groups
        requiredValues.set(grouping.groupSize, Math.max(currentCount, grouping.numberOfGroups));
      });
    });

    // Add some distractors with lower quantities
    [1, 2, 7, 11, 12, 15].forEach(val => {
      if (!requiredValues.has(val)) {
        requiredValues.set(val, 2); // Only 2 distractors each
      }
    });
    
    // Generate items with correct quantities
    const availableItems: DraggableItem[] = [];
    let itemIndex = 0;
    
    requiredValues.forEach((quantity, value) => {
      for (let i = 0; i < quantity; i++) {
        availableItems.push({
          id: `item-${itemIndex}`,
          value,
          isUsed: false,
        });
        itemIndex++;
      }
    });
    
    // Shuffle the items for random display
    availableItems.sort(() => Math.random() - 0.5);

    return {
      problems,
      availableItems,
      currentProblemIndex: 0,
      score: 0,
      isLevelCompleted: false,
    };
  }, [PROBLEMS_CONFIG]);

  const [gameState, setGameState] = useState<GameState>(generateInitialState);

  // Check if a grouping is valid for a problem
  const isValidGrouping = useCallback((
    problemId: string, 
    groupingId: string,
    droppedValues: number[]
  ): boolean => {
    const problem = gameState.problems.find(p => p.id === problemId);
    if (!problem) return false;

    const grouping = problem.possibleGroupings.find(g => g.id === groupingId);
    if (!grouping) return false;

    // Check if all values match the expected pattern
    const expectedValues = grouping.visualItems;
    if (droppedValues.length !== expectedValues.length) return false;

    // All dropped values should match the group size
    return droppedValues.every(value => value === grouping.groupSize);
  }, [gameState.problems]);

  // Handle drag end event - Clean Code: clear method responsibility
  const handleDragEnd = useCallback((event: DragEndEvent): DragEndResult => {
    const { active, over } = event;
    
    if (!over || !active) {
      return { success: false, message: 'Intento de arrastre inválido' };
    }

    const draggedItemId = active.id as string;
    const dropZoneId = over.id as string;
    
    // Parse drop zone ID: format "problem-1-grouping-0-1-position-0"
    const dropZoneParts = dropZoneId.split('-');
    
    if (dropZoneParts.length !== 7) {
      return { success: false, message: `Formato de zona inválido` };
    }

    const problemId = `${dropZoneParts[0]}-${dropZoneParts[1]}`;
    const groupingId = `${dropZoneParts[2]}-${dropZoneParts[3]}-${dropZoneParts[4]}`;
    
    const draggedItem = gameState.availableItems.find(item => item.id === draggedItemId);
    if (!draggedItem || draggedItem.isUsed) {
      return { success: false, message: 'Elemento no disponible' };
    }

    const problem = gameState.problems.find(p => p.id === problemId);
    const grouping = problem?.possibleGroupings.find(g => g.id === groupingId);
    
    if (!problem || !grouping) {
      return { success: false, message: 'Problema o agrupación no encontrada' };
    }

    // Check if the dropped value matches the expected group size
    if (draggedItem.value !== grouping.groupSize) {
      return { success: false, message: `Este grupo necesita elementos de valor ${grouping.groupSize}` };
    }

    // Update game state
    const completionResult = { problemCompleted: false, levelCompleted: false };
    
    setGameState(prevState => {
      const newState = { ...prevState };
      
      // Mark item as used and assign to grouping
      newState.availableItems = prevState.availableItems.map(item =>
        item.id === draggedItemId 
          ? { ...item, isUsed: true, groupingId }
          : item
      );
      
      // Check if this grouping is now complete
      const usedItemsForGrouping = newState.availableItems.filter(
        item => item.groupingId === groupingId
      );
      
      const isGroupingComplete = usedItemsForGrouping.length === grouping.numberOfGroups;
      
      if (isGroupingComplete) {
        // Mark problem as completed with this grouping
        newState.problems = prevState.problems.map(p => 
          p.id === problemId 
            ? { ...p, selectedGrouping: grouping, isCompleted: true }
            : p
        );
        
        // Update score and check if level is completed
        newState.score += 1;
        newState.isLevelCompleted = newState.problems.every(p => p.isCompleted);
        
        // Set completion flags for return message
        completionResult.problemCompleted = true;
        completionResult.levelCompleted = newState.isLevelCompleted;
      }
      
      return newState;
    });

    // Check completion status for return message after state update
    const usedItemsCount = gameState.availableItems.filter(item => item.groupingId === groupingId).length + 1;

    if (completionResult.problemCompleted) {
      return { 
        success: true, 
        message: '¡Excelente! Has completado este agrupamiento correctamente', 
        completedProblem: true,
        completedLevel: completionResult.levelCompleted
      };
    }

    return { 
      success: true, 
      message: `¡Bien! Necesitas ${grouping.numberOfGroups - usedItemsCount} grupos más` 
    };
  }, [gameState.availableItems, gameState.problems]);

  // Reset game function
  const resetGame = useCallback(() => {
    setGameState(generateInitialState());
  }, [generateInitialState]);

  // Memoized values for performance optimization
  const gameStats = useMemo(() => {
    const completedProblems = gameState.problems.filter(p => p.isCompleted).length;
    const totalProblems = gameState.problems.length;
    
    return {
      totalProblems,
      completedProblems,
      currentProblem: gameState.problems[gameState.currentProblemIndex] || null,
      availableItemsCount: gameState.availableItems.filter(item => !item.isUsed).length,
      progressPercentage: totalProblems > 0 ? (completedProblems / totalProblems) * 100 : 0,
    };
  }, [gameState]);

  return {
    gameState,
    gameStats,
    handleDragEnd,
    resetGame,
    isValidGrouping,
  };
};
