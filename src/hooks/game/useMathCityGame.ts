import { useState, useCallback } from 'react';
import type {
  MathCityGameState,
  MathCityDropResult,
  MathCityStats,
  ResultZone
} from '../../types/math-city.types';
import { MATH_CITY_PROBLEMS, MATH_CITY_CONFIG } from '../../constants/math-city.config';
import { useCoinsStore } from '../../stores/coins.store';

export function useMathCityGame() {
  const { addCoins, subtractCoins } = useCoinsStore();

  const [gameState, setGameState] = useState<MathCityGameState>(() => {
    const initialProblem = MATH_CITY_PROBLEMS[0];
    return {
      currentProblemIndex: 0,
      problems: [...MATH_CITY_PROBLEMS],
      currentProblem: initialProblem,
      selectedOperation: null,
      isCompleted: false,
      completedProblems: 0,
      hintsUsed: 0,
      maxHints: MATH_CITY_CONFIG.maxHints,
      isLevelCompleted: false
    };
  });

  const [resultZone, setResultZone] = useState<ResultZone>(() => ({
    id: 'result-zone',
    targetResult: MATH_CITY_PROBLEMS[0].targetResult,
    currentOperation: null,
    isHighlighted: false,
    isCorrect: null
  }));

  // Handle dropping an operation into the result zone
  const handleOperationDrop = useCallback((operationId: string): MathCityDropResult => {
    const operation = gameState.currentProblem.availableOperations.find(op => op.id === operationId);
    
    if (!operation) {
      return { success: false, message: 'Operación no encontrada' };
    }

    // Check if the operation is correct
    const isCorrect = operation.operation === gameState.currentProblem.correctOperation;
    
    setGameState(prevState => {
      const newAvailableOperations = prevState.currentProblem.availableOperations.map(op =>
        op.id === operationId ? { ...op, isUsed: true } : op
      );

      const updatedProblem = {
        ...prevState.currentProblem,
        availableOperations: newAvailableOperations,
        isCompleted: isCorrect
      };

      let newCompletedProblems = prevState.completedProblems;
      if (isCorrect) {
        newCompletedProblems += 1;
      }

      return {
        ...prevState,
        currentProblem: updatedProblem,
        selectedOperation: operation,
        isCompleted: isCorrect,
        completedProblems: newCompletedProblems
      };
    });

    setResultZone(prev => ({
      ...prev,
      currentOperation: operation,
      isCorrect,
      isHighlighted: false
    }));

    // Handle coins
    if (isCorrect) {
      addCoins(MATH_CITY_CONFIG.coinsPerCorrectOperation, 
        `Operación correcta: ${operation.operation} = ${operation.result}`);
    } else {
      subtractCoins(Math.abs(MATH_CITY_CONFIG.coinsPerIncorrectOperation), 
        `Operación incorrecta: ${operation.operation} (esperado: ${gameState.currentProblem.correctOperation})`);
    }

    return {
      success: true,
      message: isCorrect 
        ? `¡Correcto! ${operation.operation} = ${operation.result}` 
        : `Incorrecto. La operación correcta es ${gameState.currentProblem.correctOperation}`,
      isCorrectOperation: isCorrect,
      isCompletedProblem: isCorrect,
      coinsEarned: isCorrect ? MATH_CITY_CONFIG.coinsPerCorrectOperation : 0,
      coinsLost: isCorrect ? 0 : Math.abs(MATH_CITY_CONFIG.coinsPerIncorrectOperation)
    };
  }, [gameState, addCoins, subtractCoins]);

  // Remove operation from result zone (return to pool)
  const handleOperationRemoval = useCallback((): MathCityDropResult => {
    if (!resultZone.currentOperation) {
      return { success: false, message: 'No hay operación para remover' };
    }

    const operationId = resultZone.currentOperation.id;

    setGameState(prevState => {
      const newAvailableOperations = prevState.currentProblem.availableOperations.map(op =>
        op.id === operationId ? { ...op, isUsed: false } : op
      );

      const updatedProblem = {
        ...prevState.currentProblem,
        availableOperations: newAvailableOperations,
        isCompleted: false
      };

      return {
        ...prevState,
        currentProblem: updatedProblem,
        selectedOperation: null,
        isCompleted: false
      };
    });

    setResultZone(prev => ({
      ...prev,
      currentOperation: null,
      isCorrect: null,
      isHighlighted: false
    }));

    return { success: true, message: 'Operación devuelta al pool' };
  }, [resultZone.currentOperation]);

  // Go to next problem
  const nextProblem = useCallback(() => {
    if (gameState.currentProblemIndex < MATH_CITY_PROBLEMS.length - 1) {
      const nextIndex = gameState.currentProblemIndex + 1;
      const nextProblem = MATH_CITY_PROBLEMS[nextIndex];
      
      setGameState(prevState => ({
        ...prevState,
        currentProblemIndex: nextIndex,
        currentProblem: nextProblem,
        selectedOperation: null,
        isCompleted: false
      }));

      setResultZone({
        id: 'result-zone',
        targetResult: nextProblem.targetResult,
        currentOperation: null,
        isHighlighted: false,
        isCorrect: null
      });
    } else {
      // Level completed
      setGameState(prevState => ({
        ...prevState,
        isLevelCompleted: true
      }));
    }
  }, [gameState.currentProblemIndex]);

  // Reset current problem
  const resetProblem = useCallback(() => {
    const currentProblem = gameState.currentProblem;
    
    // If there's a correct operation placed, subtract coins when resetting
    if (resultZone.currentOperation && resultZone.isCorrect) {
      subtractCoins(
        MATH_CITY_CONFIG.coinsPerCorrectOperation, 
        `Reinicio del problema: -${MATH_CITY_CONFIG.coinsPerCorrectOperation} monedas`
      );
    }
    
    setGameState(prevState => ({
      ...prevState,
      currentProblem: {
        ...currentProblem,
        availableOperations: currentProblem.availableOperations.map(op => ({
          ...op,
          isUsed: false
        })),
        isCompleted: false
      },
      selectedOperation: null,
      isCompleted: false
    }));

    setResultZone(prev => ({
      ...prev,
      currentOperation: null,
      isCorrect: null,
      isHighlighted: false
    }));
  }, [gameState.currentProblem, resultZone.currentOperation, resultZone.isCorrect, subtractCoins]);

  // Use hint
  const useHint = useCallback(() => {
    if (gameState.hintsUsed < gameState.maxHints) {
      setGameState(prevState => ({
        ...prevState,
        hintsUsed: prevState.hintsUsed + 1
      }));
      return true;
    }
    return false;
  }, [gameState.hintsUsed, gameState.maxHints]);

  // Get game statistics
  const getGameStats = useCallback((): MathCityStats => {
    return {
      totalProblems: MATH_CITY_PROBLEMS.length,
      completedProblems: gameState.completedProblems,
      progressPercentage: (gameState.completedProblems / MATH_CITY_PROBLEMS.length) * 100,
      hintsRemaining: gameState.maxHints - gameState.hintsUsed,
      currentProblem: gameState.currentProblem,
      isLevelCompleted: gameState.isLevelCompleted
    };
  }, [gameState]);

  return {
    gameState,
    resultZone,
    gameStats: getGameStats(),
    handleOperationDrop,
    handleOperationRemoval,
    nextProblem,
    resetProblem,
    useHint: useHint
  };
}
