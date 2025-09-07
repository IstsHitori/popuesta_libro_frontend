import { useState, useCallback } from 'react';
import type {
  RepeatedAdditionGameState,
  RepeatedAdditionProblem,
  AdditionBox,
  DraggableNumber,
  AdditionDropResult,
  RepeatedAdditionStats
} from '../../types/repeated-addition.types';
import { REPEATED_ADDITION_PROBLEMS, REPEATED_ADDITION_CONFIG } from '../../constants/repeated-addition.config';
import { useCoinsStore } from '../../stores/coins.store';

export function useRepeatedAdditionGame() {
  const { addCoins, subtractCoins } = useCoinsStore();

  const [gameState, setGameState] = useState<RepeatedAdditionGameState>(() => {
    const initialProblem = REPEATED_ADDITION_PROBLEMS[0];
    return {
      currentProblemIndex: 0,
      problems: [...REPEATED_ADDITION_PROBLEMS],
      currentProblem: initialProblem,
      additionBoxes: createAdditionBoxes(initialProblem),
      availableNumbers: createAvailableNumbers(initialProblem),
      isCompleted: false,
      completedProblems: 0,
      hintsUsed: 0,
      maxHints: REPEATED_ADDITION_CONFIG.maxHints,
      isLevelCompleted: false
    };
  });

  // Create addition boxes for the current problem
  function createAdditionBoxes(problem: RepeatedAdditionProblem): AdditionBox[] {
    return Array.from({ length: problem.repetitions }, (_, index) => ({
      id: `box-${index}`,
      position: index,
      currentNumber: null,
      isHighlighted: false,
      isCorrect: null
    }));
  }

  // Create draggable numbers for the current problem
  function createAvailableNumbers(problem: RepeatedAdditionProblem): DraggableNumber[] {
    return problem.availableNumbers.map((num, index) => ({
      id: `number-${num}-${index}`,
      value: num,
      isUsed: false,
      originalPosition: { x: 50 + index * 80, y: 500 }
    }));
  }

  // Handle dropping a number into a box
  const handleNumberDrop = useCallback((numberId: string, boxId: string): AdditionDropResult => {
    const number = gameState.availableNumbers.find(n => n.id === numberId);
    const boxIndex = parseInt(boxId.split('-')[1]);
    
    if (!number || boxIndex < 0 || boxIndex >= gameState.additionBoxes.length) {
      return { success: false, message: 'Movimiento inválido' };
    }

    const targetBox = gameState.additionBoxes[boxIndex];
    
    // Check if box is already occupied
    if (targetBox.currentNumber !== null) {
      return { success: false, message: 'Esta caja ya tiene un número' };
    }

    // Check if the number is the correct one
    const isCorrect = number.value === gameState.currentProblem.correctNumber;
    
    setGameState(prevState => {
      const newAvailableNumbers = prevState.availableNumbers.map(n =>
        n.id === numberId ? { ...n, isUsed: true } : n
      );

      const newBoxes = prevState.additionBoxes.map(box =>
        box.id === boxId 
          ? { ...box, currentNumber: number.value, isCorrect, isHighlighted: false }
          : box
      );

      // Check if problem is completed
      const allBoxesFilled = newBoxes.every(box => box.currentNumber !== null);
      const allCorrect = newBoxes.every(box => box.isCorrect === true);
      const problemCompleted = allBoxesFilled && allCorrect;

      let newCompletedProblems = prevState.completedProblems;

      if (problemCompleted) {
        newCompletedProblems += 1;
      }

      return {
        ...prevState,
        additionBoxes: newBoxes,
        availableNumbers: newAvailableNumbers,
        completedProblems: newCompletedProblems,
        isCompleted: problemCompleted
      };
    });

    // Handle coins
    if (isCorrect) {
      addCoins(REPEATED_ADDITION_CONFIG.coinsPerCorrectPlacement, 
        `Número correcto: ${number.value}`);
    } else {
      subtractCoins(Math.abs(REPEATED_ADDITION_CONFIG.coinsPerIncorrectPlacement), 
        `Número incorrecto: ${number.value} (esperado: ${gameState.currentProblem.correctNumber})`);
    }

    // Check if all boxes are filled and all correct
    const allFilled = gameState.additionBoxes.every((_, index) => 
      index === boxIndex || gameState.additionBoxes[index].currentNumber !== null
    );
    const allWillBeCorrect = gameState.additionBoxes.every((box, index) => 
      index === boxIndex ? isCorrect : box.isCorrect === true
    );

    const isProblemCompleted = allFilled && allWillBeCorrect;

    return {
      success: true,
      message: isCorrect ? '¡Correcto!' : `Incorrecto. Necesitas el ${gameState.currentProblem.correctNumber}`,
      isCorrectPlacement: isCorrect,
      isCompletedProblem: isProblemCompleted,
      coinsEarned: isCorrect ? REPEATED_ADDITION_CONFIG.coinsPerCorrectPlacement : 0,
      coinsLost: isCorrect ? 0 : Math.abs(REPEATED_ADDITION_CONFIG.coinsPerIncorrectPlacement)
    };
  }, [gameState, addCoins, subtractCoins]);

  // Remove number from box (return to pool)
  const handleNumberRemoval = useCallback((boxId: string): AdditionDropResult => {
    const boxIndex = parseInt(boxId.split('-')[1]);
    const targetBox = gameState.additionBoxes[boxIndex];
    
    if (targetBox.currentNumber === null) {
      return { success: false, message: 'La caja está vacía' };
    }

    setGameState(prevState => {
      const newBoxes = prevState.additionBoxes.map(box =>
        box.id === boxId 
          ? { ...box, currentNumber: null, isCorrect: null, isHighlighted: false }
          : box
      );

      // Find the number in available numbers and mark as not used
      const newAvailableNumbers = prevState.availableNumbers.map(n => {
        if (n.value === targetBox.currentNumber && n.isUsed) {
          return { ...n, isUsed: false };
        }
        return n;
      });

      return {
        ...prevState,
        additionBoxes: newBoxes,
        availableNumbers: newAvailableNumbers,
        isCompleted: false
      };
    });

    return { success: true, message: 'Número devuelto al pool' };
  }, [gameState]);

  // Go to next problem
  const nextProblem = useCallback(() => {
    if (gameState.currentProblemIndex < REPEATED_ADDITION_PROBLEMS.length - 1) {
      const nextIndex = gameState.currentProblemIndex + 1;
      const nextProblem = REPEATED_ADDITION_PROBLEMS[nextIndex];
      
      setGameState(prevState => ({
        ...prevState,
        currentProblemIndex: nextIndex,
        currentProblem: nextProblem,
        additionBoxes: createAdditionBoxes(nextProblem),
        availableNumbers: createAvailableNumbers(nextProblem),
        isCompleted: false
      }));
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
    
    // Calculate how many correct placements to subtract coins for
    const correctPlacements = gameState.additionBoxes.filter(box => box.isCorrect === true).length;
    
    // Subtract coins for each correct placement that will be reset
    if (correctPlacements > 0) {
      subtractCoins(
        correctPlacements * REPEATED_ADDITION_CONFIG.coinsPerCorrectPlacement, 
        `Reinicio del circuito: -${correctPlacements} monedas`
      );
    }
    
    setGameState(prevState => ({
      ...prevState,
      additionBoxes: createAdditionBoxes(currentProblem),
      availableNumbers: createAvailableNumbers(currentProblem),
      isCompleted: false
    }));
  }, [gameState.currentProblem, gameState.additionBoxes, subtractCoins]);

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
  const getGameStats = useCallback((): RepeatedAdditionStats => {
    return {
      totalProblems: REPEATED_ADDITION_PROBLEMS.length,
      completedProblems: gameState.completedProblems,
      progressPercentage: (gameState.completedProblems / REPEATED_ADDITION_PROBLEMS.length) * 100,
      hintsRemaining: gameState.maxHints - gameState.hintsUsed,
      currentProblem: gameState.currentProblem,
      isLevelCompleted: gameState.isLevelCompleted
    };
  }, [gameState]);

  return {
    gameState,
    gameStats: getGameStats(),
    handleNumberDrop,
    handleNumberRemoval,
    nextProblem,
    resetProblem,
    useHint
  };
}
