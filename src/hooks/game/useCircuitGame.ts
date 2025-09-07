import { useState, useCallback } from 'react';
import type {
  CircuitGameState,
  CircuitBoard as CircuitBoardType,
  CircuitComponent,
  CircuitDragResult,
  ComponentSlot
} from '../../types/circuit.types';
import { CIRCUIT_PROBLEMS, CIRCUIT_BOARD_CONFIG } from '../../constants/circuit-config';

export function useCircuitGame() {
  // Initialize game state
  const [gameState, setGameState] = useState<CircuitGameState>(() => {
    const initialProblem = CIRCUIT_PROBLEMS[0];
    return {
      currentProblemIndex: 0,
      problems: CIRCUIT_PROBLEMS.map(problem => ({ ...problem, isCompleted: false })),
      circuitBoard: createCircuitBoard(initialProblem),
      availableComponents: createAvailableComponents(initialProblem),
      score: 0,
      completedProblems: 0,
      timeSpent: 0, // Add missing timeSpent property
      hints: {
        used: 0,
        available: 3
      },
      isLevelCompleted: false
    };
  });

  // Create circuit board for a given problem
  function createCircuitBoard(problem: typeof CIRCUIT_PROBLEMS[0]): CircuitBoardType {
    const slots: ComponentSlot[] = [
      {
        ...CIRCUIT_BOARD_CONFIG.inputSlots[0],
        acceptedType: 'number' as const,
        currentComponent: null,
        isHighlighted: false
      },
      {
        ...CIRCUIT_BOARD_CONFIG.inputSlots[1],
        acceptedType: 'number' as const,
        currentComponent: null,
        isHighlighted: false
      },
      {
        ...CIRCUIT_BOARD_CONFIG.operatorSlot,
        acceptedType: 'operator' as const,
        currentComponent: {
          id: 'fixed-operator',
          type: 'operator' as const,
          value: problem.requiredOperator,
          position: CIRCUIT_BOARD_CONFIG.operatorSlot.position,
          isConnected: false,
          connections: []
        },
        isHighlighted: false
      },
      {
        ...CIRCUIT_BOARD_CONFIG.resultSlot,
        acceptedType: 'result' as const,
        currentComponent: {
          id: 'fixed-result',
          type: 'result' as const,
          value: problem.targetResult,
          position: CIRCUIT_BOARD_CONFIG.resultSlot.position,
          isConnected: false,
          connections: []
        },
        isHighlighted: false
      }
    ];

    return {
      id: `board-${problem.id}`,
      components: slots.map(slot => slot.currentComponent).filter(Boolean) as CircuitComponent[],
      connections: [],
      inputSlots: slots.filter(slot => slot.type === 'input'),
      operatorSlot: slots.find(slot => slot.type === 'operator')!,
      resultSlot: slots.find(slot => slot.type === 'result')!,
      isCompleted: false
    };
  }

  // Create available components for dragging
  function createAvailableComponents(problem: typeof CIRCUIT_PROBLEMS[0]): CircuitComponent[] {
    return problem.availableNumbers.map((num, index) => ({
      id: `number-${num}-${index}`,
      type: 'number' as const,
      value: num,
      position: { x: 50 + index * 80, y: 450 },
      isConnected: false,
      connections: []
    }));
  }

  // Check if the circuit is correctly completed
  const checkCircuitCompletion = useCallback((state: CircuitGameState): CircuitDragResult => {
    const board = state.circuitBoard;
    const currentProblem = state.problems[state.currentProblemIndex];
    
    // Check if both input slots are filled
    const filledInputs = board.inputSlots.filter(slot => slot.currentComponent !== null);
    if (filledInputs.length !== 2) {
      return { success: false, completedCircuit: false };
    }

    // Get the values
    const num1 = filledInputs[0].currentComponent!.value as number;
    const num2 = filledInputs[1].currentComponent!.value as number;
    const result = num1 * num2;

    // Check if the result matches the target
    const isCorrect = result === currentProblem.targetResult;
    
    return {
      success: true,
      completedCircuit: isCorrect,
      isCorrectSolution: isCorrect,
      message: isCorrect 
        ? `¡Perfecto! ${num1} × ${num2} = ${result}` 
        : `Casi... ${num1} × ${num2} = ${result}, pero necesitas ${currentProblem.targetResult}`
    };
  }, []);

  // Handle placing a component from available pool to a slot
  const handleComponentPlacement = useCallback((
    componentId: string,
    targetSlotId: string
  ): CircuitDragResult => {
    const component = gameState.availableComponents.find(c => c.id === componentId);
    if (!component) {
      return { success: false, message: 'Componente no encontrado' };
    }

    setGameState(prevState => {
      const newState = { ...prevState };
      const board = { ...newState.circuitBoard };
      
      // Find the target slot
      const targetSlot = [...board.inputSlots, board.operatorSlot, board.resultSlot]
        .find(slot => slot.id === targetSlotId);
      
      if (!targetSlot) {
        return prevState;
      }

      // Check if slot accepts this component type
      if (targetSlot.acceptedType !== component.type) {
        return prevState;
      }

      // If slot already has a component, return it to available pool
      if (targetSlot.currentComponent && targetSlot.type === 'input') {
        const existingComponent = targetSlot.currentComponent;
        const returnedComponent = {
          ...existingComponent,
          position: { x: 50 + newState.availableComponents.length * 80, y: 450 },
          isConnected: false
        };
        newState.availableComponents.push(returnedComponent);
      }

      // Update the slot with the component
      if (targetSlot.type === 'input') {
        const slotIndex = board.inputSlots.findIndex(s => s.id === targetSlotId);
        if (slotIndex !== -1) {
          board.inputSlots[slotIndex] = {
            ...board.inputSlots[slotIndex],
            currentComponent: {
              ...component,
              position: targetSlot.position,
              isConnected: true
            }
          };
        }
      }

      // Remove component from available components
      newState.availableComponents = newState.availableComponents.filter(
        c => c.id !== componentId
      );

      // Add component to board
      board.components = board.components.filter(c => c.id !== componentId);
      board.components.push({
        ...component,
        position: targetSlot.position,
        isConnected: true
      });

      newState.circuitBoard = board;

      // Check if circuit is complete
      const result = checkCircuitCompletion(newState);
      if (result.completedCircuit) {
        newState.score += 100;
        newState.completedProblems += 1;
        
        // Mark current problem as completed
        const currentProblem = newState.problems[newState.currentProblemIndex];
        if (currentProblem) {
          currentProblem.isCompleted = true;
          
          // Set solution
          const inputComponents = board.inputSlots
            .map(slot => slot.currentComponent)
            .filter(Boolean) as CircuitComponent[];
          
          if (inputComponents.length === 2) {
            currentProblem.solution = {
              firstNumber: inputComponents[0].value as number,
              secondNumber: inputComponents[1].value as number,
              operator: '×',
              result: currentProblem.targetResult
            };
          }
        }
        
        board.isCompleted = true;
        
        // Check if level is completed
        if (newState.completedProblems >= newState.problems.length) {
          newState.isLevelCompleted = true;
        }
      }

      return newState;
    });

    return { success: true };
  }, [gameState, checkCircuitCompletion]);

  // Handle component removal from slot (return to available pool)
  const handleComponentRemoval = useCallback((
    componentId: string
  ): CircuitDragResult => {
    setGameState(prevState => {
      const newState = { ...prevState };
      const board = { ...newState.circuitBoard };
      
      // Find which slot contains this component
      const sourceSlotIndex = board.inputSlots.findIndex(
        slot => slot.currentComponent?.id === componentId
      );
      
      if (sourceSlotIndex === -1) {
        return prevState; // Component not found in any slot
      }
      
      const sourceSlot = board.inputSlots[sourceSlotIndex];
      const componentToRemove = sourceSlot.currentComponent!;
      
      // Clear the source slot
      board.inputSlots[sourceSlotIndex] = {
        ...sourceSlot,
        currentComponent: null
      };
      
      // Return component to available pool (reset to original state)
      const returnedComponent = {
        ...componentToRemove,
        position: { x: 50 + newState.availableComponents.length * 80, y: 450 },
        isConnected: false
      };
      
      newState.availableComponents.push(returnedComponent);
      
      // Remove from board components
      board.components = board.components.filter(c => c.id !== componentId);
      
      // Reset completion status
      board.isCompleted = false;
      
      newState.circuitBoard = board;
      return newState;
    });
    
    return { success: true, message: 'Componente removido del circuito' };
  }, []);

  // Handle dropping a component onto a slot or removing it
  const handleComponentDrop = useCallback((
    componentId: string,
    targetSlotId: string
  ): CircuitDragResult => {
    
    // Check if we're dragging FROM a slot (for movement between slots)
    const sourceSlotIndex = gameState.circuitBoard.inputSlots.findIndex(
      slot => slot.currentComponent?.id === componentId
    );
    
    if (sourceSlotIndex >= 0) {
      // Component is being moved from one slot to another
      const sourceComponent = gameState.circuitBoard.inputSlots[sourceSlotIndex].currentComponent!;
      
      setGameState(prevState => {
        const newState = { ...prevState };
        const board = { ...newState.circuitBoard };
        
        // Find target slot
        const targetSlot = board.inputSlots.find(slot => slot.id === targetSlotId);
        if (!targetSlot) {
          return prevState;
        }
        
        // Check if target slot accepts this type
        if (targetSlot.acceptedType !== sourceComponent.type) {
          return prevState;
        }
        
        // Clear source slot
        board.inputSlots[sourceSlotIndex] = {
          ...board.inputSlots[sourceSlotIndex],
          currentComponent: null
        };
        
        // If target slot has a component, return it to available pool
        if (targetSlot.currentComponent) {
          const displaced = {
            ...targetSlot.currentComponent,
            position: { x: 50 + newState.availableComponents.length * 80, y: 450 },
            isConnected: false
          };
          newState.availableComponents.push(displaced);
        }
        
        // Place component in target slot
        const targetSlotIndex = board.inputSlots.findIndex(s => s.id === targetSlotId);
        board.inputSlots[targetSlotIndex] = {
          ...board.inputSlots[targetSlotIndex],
          currentComponent: {
            ...sourceComponent,
            position: targetSlot.position,
            isConnected: true
          }
        };
        
        // Update board components
        board.components = board.components.filter(c => c.id !== componentId);
        board.components.push({
          ...sourceComponent,
          position: targetSlot.position,
          isConnected: true
        });
        
        // Reset completion status
        board.isCompleted = false;
        newState.circuitBoard = board;
        
        // Check if circuit is complete
        const completionResult = (() => {
          const filledInputs = board.inputSlots.filter(slot => slot.currentComponent !== null);
          if (filledInputs.length !== 2) {
            return { success: false, completedCircuit: false };
          }
          
          const num1 = filledInputs[0].currentComponent!.value as number;
          const num2 = filledInputs[1].currentComponent!.value as number;
          const result = num1 * num2;
          const currentProblem = newState.problems[newState.currentProblemIndex];
          const isCorrect = result === currentProblem.targetResult;
          
          return {
            success: true,
            completedCircuit: isCorrect,
            isCorrectSolution: isCorrect,
            message: isCorrect 
              ? `¡Perfecto! ${num1} × ${num2} = ${result}` 
              : `Casi... ${num1} × ${num2} = ${result}, pero necesitas ${currentProblem.targetResult}`
          };
        })();
        
        if (completionResult.completedCircuit) {
          newState.score += 100;
          newState.completedProblems += 1;
          board.isCompleted = true;
          
          if (newState.completedProblems >= newState.problems.length) {
            newState.isLevelCompleted = true;
          }
        }
        
        return newState;
      });
      
      return { success: true, message: 'Componente movido' };
    } else {
      // Handle component placement from available pool
      return handleComponentPlacement(componentId, targetSlotId);
    }
  }, [gameState, handleComponentPlacement]);

  // Move to next problem
  const nextProblem = useCallback(() => {
    setGameState(prevState => {
      if (prevState.currentProblemIndex < prevState.problems.length - 1) {
        const nextIndex = prevState.currentProblemIndex + 1;
        const nextProb = prevState.problems[nextIndex];
        
        return {
          ...prevState,
          currentProblemIndex: nextIndex,
          circuitBoard: createCircuitBoard(nextProb),
          availableComponents: createAvailableComponents(nextProb)
        };
      }
      return prevState;
    });
  }, []);

  // Use a hint action
  const triggerHint = useCallback(() => {
    setGameState(prevState => {
      if (prevState.hints.available > 0) {
        return {
          ...prevState,
          hints: {
            used: prevState.hints.used + 1,
            available: prevState.hints.available - 1
          }
        };
      }
      return prevState;
    });
  }, []);

  // Reset current problem
  const resetProblem = useCallback(() => {
    setGameState(prevState => {
      const currentProblem = prevState.problems[prevState.currentProblemIndex];
      return {
        ...prevState,
        circuitBoard: createCircuitBoard(currentProblem),
        availableComponents: createAvailableComponents(currentProblem)
      };
    });
  }, []);

  // Computed game stats for easy access
  const gameStats = {
    totalProblems: gameState.problems.length,
    completedProblems: gameState.completedProblems,
    progressPercentage: Math.round((gameState.completedProblems / gameState.problems.length) * 100),
    score: gameState.score,
    hintsRemaining: gameState.hints.available,
    currentProblem: gameState.problems[gameState.currentProblemIndex],
    isLevelCompleted: gameState.isLevelCompleted
  };

  return {
    gameState,
    gameStats,
    handleComponentDrop,
    handleComponentRemoval,
    nextProblem,
    triggerHint,
    resetProblem,
    checkCircuitCompletion
  };
}
