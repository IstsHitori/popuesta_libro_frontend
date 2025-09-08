import { useState, useCallback, useMemo } from 'react';
import type { FortressGameState, FortressStats } from '../../types/fortress.types';
import { createFortressProblem, generateEqualNumberOptions, validateEqualNumbers, evaluateExpression } from '../../constants/fortress.config';
import { useCoinsStore } from '../../stores/coins.store';
import { useLevelCompletion } from '../../hooks/levels/useLevelCompletion';

export const useFortressGame = () => {
  const { addCoins, subtractCoins } = useCoinsStore();
  const { completeLevel } = useLevelCompletion();
  
  const [gameState, setGameState] = useState<FortressGameState>(() => {
    const initialProblem = createFortressProblem();
    return {
      currentProblemIndex: 0,
      isLevelCompleted: false,
      currentProblem: initialProblem
    };
  });

  const [stats, setStats] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    hintsRemaining: 3,
    coinsEarned: 0,
    coinsLost: 0
  });

  const gameStats: FortressStats = useMemo(() => {
    const totalSteps = gameState.currentProblem.matrix.totalSteps;
    const completedSteps = gameState.currentProblem.matrix.currentStep;
    const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
    const totalAnswers = stats.correctAnswers + stats.incorrectAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((stats.correctAnswers / totalAnswers) * 100) : 0;

    return {
      totalSteps,
      completedSteps,
      progressPercentage,
      correctAnswers: stats.correctAnswers,
      incorrectAnswers: stats.incorrectAnswers,
      accuracy,
      hintsRemaining: stats.hintsRemaining,
      coinsEarned: stats.coinsEarned,
      coinsLost: stats.coinsLost,
      currentProblem: gameState.currentProblem,
      isLevelCompleted: gameState.isLevelCompleted
    };
  }, [gameState, stats]);

  const advanceToNextStep = useCallback(() => {
    setGameState(prevState => {
      const currentMatrix = prevState.currentProblem.matrix;
      const nextStep = currentMatrix.currentStep + 1;
      
      // Verificar si hemos completado todos los pasos
      if (nextStep >= currentMatrix.totalSteps) {
        // Completar el nivel 4 y ganar recompensas
        completeLevel(4);
        
        return {
          ...prevState,
          isLevelCompleted: true
        };
      }

      // Actualizar la matriz para el siguiente paso
      const updatedGrid = currentMatrix.grid.map(row => 
        row.map(cell => ({
          ...cell,
          isCurrentPosition: false,
          isTarget: false,
          isCompleted: cell.isPath && 
            currentMatrix.path.findIndex(p => p.row === cell.row && p.col === cell.col) < nextStep
        }))
      );

      // Marcar la nueva posición actual
      const nextPosition = currentMatrix.path[nextStep];
      if (nextPosition) {
        updatedGrid[nextPosition.row][nextPosition.col].isCurrentPosition = true;
        updatedGrid[nextPosition.row][nextPosition.col].isTarget = true;
      }

      const updatedMatrix = {
        ...currentMatrix,
        grid: updatedGrid,
        currentStep: nextStep
      };

      const newTarget = nextPosition.value;
      const newOptions = generateEqualNumberOptions(newTarget);

      return {
        ...prevState,
        currentProblem: {
          ...prevState.currentProblem,
          matrix: updatedMatrix,
          currentTarget: newTarget,
          options: newOptions
        }
      };
    });
  }, [completeLevel]);

  const selectOption = useCallback((optionId: string) => {
    const selectedOption = gameState.currentProblem.options.find(opt => opt.id === optionId);
    
    if (!selectedOption) {
      return { success: false, message: 'Opción no encontrada' };
    }

    // Validar que la expresión use solo números iguales
    const hasEqualNumbers = validateEqualNumbers(selectedOption.expression);
    const calculatedResult = evaluateExpression(selectedOption.expression);
    const isCorrectResult = calculatedResult === gameState.currentProblem.currentTarget;

    if (!hasEqualNumbers) {
      // Penalizar por usar números diferentes
      subtractCoins(1);
      setStats(prev => ({
        ...prev,
        incorrectAnswers: prev.incorrectAnswers + 1,
        coinsLost: prev.coinsLost + 1
      }));
      
      return { 
        success: false, 
        message: '❌ ¡Error! Debes usar solo números iguales en la operación. Se descontó 1 moneda.' 
      };
    }

    if (!isCorrectResult) {
      // Respuesta incorrecta pero con números iguales
      subtractCoins(1);
      setStats(prev => ({
        ...prev,
        incorrectAnswers: prev.incorrectAnswers + 1,
        coinsLost: prev.coinsLost + 1
      }));
      
      return { 
        success: false, 
        message: `❌ Incorrecto. El resultado de ${selectedOption.expression} es ${calculatedResult}, pero necesitas ${gameState.currentProblem.currentTarget}. Se descontó 1 moneda.` 
      };
    }

    // Respuesta correcta
    addCoins(1);
    setStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + 1,
      coinsEarned: prev.coinsEarned + 1
    }));

    // Avanzar al siguiente paso
    advanceToNextStep();

    return { 
      success: true, 
      message: `🎯 ¡Correcto! ${selectedOption.expression} = ${gameState.currentProblem.currentTarget}. ¡Ganaste 1 moneda!` 
    };
  }, [gameState.currentProblem, addCoins, subtractCoins, advanceToNextStep]);

  const useHint = useCallback(() => {
    if (stats.hintsRemaining <= 0) {
      return 'No tienes pistas disponibles';
    }

    setStats(prev => ({
      ...prev,
      hintsRemaining: prev.hintsRemaining - 1
    }));

    const target = gameState.currentProblem.currentTarget;
    const correctOption = gameState.currentProblem.options.find(opt => opt.isCorrect);
    
    if (correctOption) {
      return `💡 Pista: Busca una operación que use números iguales y que sume exactamente ${target}. Ejemplo de formato correcto: ${correctOption.expression}`;
    }

    return `💡 Pista: Necesitas encontrar números iguales que sumados den ${target}`;
  }, [stats.hintsRemaining, gameState.currentProblem]);

  const resetProblem = useCallback(() => {
    const newProblem = createFortressProblem();
    setGameState({
      currentProblemIndex: 0,
      isLevelCompleted: false,
      currentProblem: newProblem
    });
    
    setStats({
      correctAnswers: 0,
      incorrectAnswers: 0,
      hintsRemaining: 3,
      coinsEarned: 0,
      coinsLost: 0
    });
  }, []);

  return {
    gameState,
    gameStats,
    selectOption,
    useHint,
    resetProblem
  };
};
