import { useState, useCallback, useMemo } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import type { 
  MultiplicationProblem, 
  VisualItem, 
  GameState, 
  DragEndResult,
  GroupingOption,
  ItemType
} from '../../types/game.types';
import { useCoinsStore } from '../../stores/coins.store';
import { useEarnedItemsStore } from '../../stores/earned-items.store';

// Hook for visual multiplication game with objects instead of numbers
export const useVisualMultiplicationGame = () => {
  const { addCoins, subtractCoins } = useCoinsStore();
  const { completeLevel } = useEarnedItemsStore();
  
  // Game configuration - Problems that teach multiplication through visual grouping
  const PROBLEMS_CONFIG = useMemo(() => [
    {
      result: 24,
      itemType: 'apple' as ItemType,
      story: "En el bosque hay 24 manzanas mágicas. Ari debe organizarlas en grupos iguales para entender cómo formar 24 manzanas",
      groupings: [
        { groupSize: 6, numberOfGroups: 4, description: "4 grupos de 6 manzanas cada uno" },
        { groupSize: 4, numberOfGroups: 6, description: "6 grupos de 4 manzanas cada uno" },
        { groupSize: 8, numberOfGroups: 3, description: "3 grupos de 8 manzanas cada uno" },
      ]
    },
    {
      result: 18,
      itemType: 'crystal' as ItemType,
      story: "Tika encuentra 18 cristales brillantes. Debe agruparlos para mostrar diferentes formas de organizarlos",
      groupings: [
        { groupSize: 3, numberOfGroups: 6, description: "6 grupos de 3 cristales cada uno" },
        { groupSize: 6, numberOfGroups: 3, description: "3 grupos de 6 cristales cada uno" },
        { groupSize: 9, numberOfGroups: 2, description: "2 grupos de 9 cristales cada uno" },
      ]
    },
    {
      result: 20,
      itemType: 'seed' as ItemType,
      story: "Caós ha esparcido 20 semillas. Ari debe organizarlas para demostrar el orden en el caos",
      groupings: [
        { groupSize: 5, numberOfGroups: 4, description: "4 grupos de 5 semillas cada uno" },
        { groupSize: 4, numberOfGroups: 5, description: "5 grupos de 4 semillas cada uno" },
        { groupSize: 10, numberOfGroups: 2, description: "2 grupos de 10 semillas cada uno" },
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
        placedItems: Array(grouping.numberOfGroups).fill(null).map(() => []), // Initialize empty groups
      }));

      return {
        id: `problem-${index + 1}`,
        result: config.result,
        itemType: config.itemType,
        possibleGroupings: groupingOptions,
        selectedGrouping: null,
        isCompleted: false,
        story: config.story,
      };
    });

    // Generate available visual items for dragging
    const availableItems: VisualItem[] = [];
    let itemIndex = 0;
    
    // For each problem, generate enough items to fill ALL grouping options
    problems.forEach(problem => {
      // Calculate total items needed for all possible groupings combined
      const totalItemsForAllGroupings = problem.possibleGroupings.reduce((total, grouping) => {
        return total + (grouping.groupSize * grouping.numberOfGroups);
      }, 0);
      
      // Generate ALL the items needed (not just initial count)
      for (let i = 0; i < totalItemsForAllGroupings; i++) {
        availableItems.push({
          id: `visual-item-${problem.itemType}-${itemIndex}`,
          type: problem.itemType,
          isUsed: false,
        });
        itemIndex++;
      }
    });

    // Shuffle the items for random display
    for (let i = availableItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
    }

    return {
      problems,
      availableItems,
      currentProblemIndex: 0,
      score: 0,
      isLevelCompleted: false,
    };
  }, [PROBLEMS_CONFIG]);

  // Initialize state
  const [gameState, setGameState] = useState<GameState>(() => generateInitialState());

  // Check if a grouping is correctly completed
  const isGroupingCompleted = useCallback((grouping: GroupingOption): boolean => {
    // Check if all groups have the correct number of items
    if (grouping.placedItems.length !== grouping.numberOfGroups) {
      return false;
    }
    
    return grouping.placedItems.every(group => group.length === grouping.groupSize);
  }, []);

  // Handle drag end event
  const handleDragEnd = useCallback((event: DragEndEvent): DragEndResult => {
    const { active, over } = event;
    
    if (!over || !active) {
      return { success: false, message: 'Intento de arrastre inválido' };
    }

    const draggedItemId = active.id as string;
    const dropZoneId = over.id as string;
    
    // Parse drop zone ID: format "problem-1-grouping-0-0-group-0"
    const dropZoneParts = dropZoneId.split('-');
    
    if (dropZoneParts.length !== 7) {
      return { success: false, message: 'Zona de destino inválida' };
    }

    const problemId = `${dropZoneParts[0]}-${dropZoneParts[1]}`;
    const groupingId = `${dropZoneParts[2]}-${dropZoneParts[3]}-${dropZoneParts[4]}`;
    const groupIndex = parseInt(dropZoneParts[6]);
    
    const draggedItem = gameState.availableItems.find(item => item.id === draggedItemId);
    if (!draggedItem || draggedItem.isUsed) {
      return { success: false, message: 'Elemento no disponible' };
    }

    const problem = gameState.problems.find(p => p.id === problemId);
    const grouping = problem?.possibleGroupings.find(g => g.id === groupingId);
    
    if (!problem || !grouping) {
      return { success: false, message: 'Problema o agrupación no encontrada' };
    }

    // Check if the item type matches the problem's item type and handle coins
    if (draggedItem.type !== problem.itemType) {
      // ❌ INCORRECT PLACEMENT: Subtract coins
      subtractCoins(1, `Colocación incorrecta: ${draggedItem.type} en problema de ${problem.itemType}`);
      const itemName = problem.itemType === 'apple' ? 'manzanas 🍎' : problem.itemType === 'crystal' ? 'cristales 💎' : 'semillas 🌱';
      const draggedItemName = draggedItem.type === 'apple' ? 'manzanas 🍎' : draggedItem.type === 'crystal' ? 'cristales 💎' : 'semillas 🌱';
      return { 
        success: false, 
        message: `❌ -1 🪙 Solo puedes colocar ${itemName} en este problema, no ${draggedItemName}`
      };
    }

    // ✅ CORRECT PLACEMENT: Add coins
    addCoins(1, `Colocación correcta: ${draggedItem.type} en lugar correcto`);

    // Check if this group already has enough items
    if (grouping.placedItems[groupIndex]?.length >= grouping.groupSize) {
      return { 
        success: false, 
        message: `Este grupo ya tiene ${grouping.groupSize} elementos`
      };
    }

    // Update game state
    const completionResult = { problemCompleted: false, levelCompleted: false };
    
    setGameState(prevState => {
      const newState = { ...prevState };
      
      // Mark item as used and place it in the group
      newState.availableItems = prevState.availableItems.map(item =>
        item.id === draggedItemId 
          ? { 
              ...item, 
              isUsed: true, 
              groupingId,
              position: { group: groupIndex, slot: grouping.placedItems[groupIndex].length }
            }
          : item
      );
      
      // Update the grouping's placed items
      newState.problems = prevState.problems.map(p => {
        if (p.id === problemId) {
          const updatedGroupings = p.possibleGroupings.map(g => {
            if (g.id === groupingId) {
              const newPlacedItems = [...g.placedItems];
              newPlacedItems[groupIndex] = [...newPlacedItems[groupIndex], draggedItem];
              return { ...g, placedItems: newPlacedItems };
            }
            return g;
          });
          
          // Check if ALL groupings for this problem are complete
          const allGroupingsComplete = updatedGroupings.every(grouping => 
            isGroupingCompleted(grouping)
          );
          
          if (allGroupingsComplete) {
            completionResult.problemCompleted = true;
            return { 
              ...p, 
              possibleGroupings: updatedGroupings,
              isCompleted: true 
            };
          }
          
          return { ...p, possibleGroupings: updatedGroupings };
        }
        return p;
      });
      
      // Update score and check if level is completed
      if (completionResult.problemCompleted) {
        newState.score += 100;
        newState.isLevelCompleted = newState.problems.every(p => p.isCompleted);
        completionResult.levelCompleted = newState.isLevelCompleted;
        
        // Si se completó el nivel, otorgar recompensas del nivel 1
        if (newState.isLevelCompleted) {
          completeLevel(1);
        }
      }
      
      return newState;
    });

    if (completionResult.problemCompleted) {
      const calculation = `${grouping.numberOfGroups} × ${grouping.groupSize} = ${grouping.numberOfGroups * grouping.groupSize}`;
      return { 
        success: true, 
        message: `¡Excelente! Has formado ${grouping.description}. ${calculation}`, 
        completedProblem: true,
        completedLevel: completionResult.levelCompleted
      };
    }

    const currentGroupItems = grouping.placedItems[groupIndex].length + 1;
    const remainingInGroup = grouping.groupSize - currentGroupItems;
    
    return { 
      success: true, 
      message: remainingInGroup > 0 
        ? `¡Bien! Necesitas ${remainingInGroup} elementos más en este grupo`
        : '¡Grupo completo! Continúa con los otros grupos'
    };
  }, [gameState, isGroupingCompleted, addCoins, subtractCoins, completeLevel]);

  // Reset game function
  const resetGame = useCallback(() => {
    setGameState(generateInitialState());
  }, [generateInitialState]);

  // Computed game statistics
  const gameStats = useMemo(() => {
    const completedProblems = gameState.problems.filter(p => p.isCompleted).length;
    const totalProblems = gameState.problems.length;
    const currentProblem = gameState.problems[gameState.currentProblemIndex] || null;
    
    return {
      totalProblems,
      completedProblems,
      currentProblem,
      availableItemsCount: gameState.availableItems.filter(item => !item.isUsed).length,
      progressPercentage: totalProblems > 0 ? (completedProblems / totalProblems) * 100 : 0,
      score: gameState.score,
      isLevelCompleted: gameState.isLevelCompleted,
    };
  }, [gameState]);

  return {
    gameState,
    gameStats,
    handleDragEnd,
    resetGame,
  };
};
