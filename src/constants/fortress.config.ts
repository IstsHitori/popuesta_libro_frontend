import type { FortressProblem, FortressMatrix, FortressOption, MatrixCell } from '../types/fortress.types';

// Función para generar opciones con números iguales solamente
export const generateEqualNumberOptions = (target: number): FortressOption[] => {
  const options: FortressOption[] = [];
  
  // Buscar divisores del número objetivo para crear opciones válidas
  const divisors = [];
  for (let i = 1; i <= target; i++) {
    if (target % i === 0) {
      divisors.push(i);
    }
  }
  
  // Crear la opción correcta (primera opción válida encontrada)
  let correctOption: FortressOption | null = null;
  
  // Intentar crear opciones con números repetidos
  for (const divisor of divisors) {
    const count = target / divisor;
    if (count >= 2 && count <= 6) { // Entre 2 y 6 números iguales
      const expression = Array(count).fill(divisor).join(' + ');
      if (!correctOption) {
        correctOption = {
          id: `correct_${target}`,
          expression,
          result: target,
          isCorrect: true
        };
      }
    }
  }
  
  // Si no encontramos una opción válida, crear una por defecto
  if (!correctOption) {
    const half = Math.floor(target / 2);
    if (target % 2 === 0) {
      correctOption = {
        id: `correct_${target}`,
        expression: `${half} + ${half}`,
        result: target,
        isCorrect: true
      };
    } else {
      const third = Math.floor(target / 3);
      if (target % 3 === 0) {
        correctOption = {
          id: `correct_${target}`,
          expression: `${third} + ${third} + ${third}`,
          result: target,
          isCorrect: true
        };
      } else {
        correctOption = {
          id: `correct_${target}`,
          expression: `1 + 1 + ${target - 2}`,
          result: target,
          isCorrect: false
        };
      }
    }
  }
  
  options.push(correctOption);
  
  // Generar opciones incorrectas (números mixtos que den resultados diferentes)
  const incorrectResults = [target - 2, target - 1, target + 1, target + 2].filter(r => r > 0);
  
  for (let i = 0; i < 4 && i < incorrectResults.length; i++) {
    const wrongResult = incorrectResults[i];
    // Crear expresiones con números mixtos (incorrectas por diseño)
    const expressions = [
      `${Math.floor(wrongResult / 2)} + ${Math.ceil(wrongResult / 2)} + 1`,
      `${wrongResult - 3} + 2 + 1`,
      `${Math.floor(wrongResult / 3)} + ${Math.floor(wrongResult / 3)} + ${wrongResult - 2 * Math.floor(wrongResult / 3)}`,
      `1 + 2 + ${wrongResult - 3}`
    ];
    
    options.push({
      id: `incorrect_${i}_${target}`,
      expression: expressions[i % expressions.length],
      result: wrongResult,
      isCorrect: false
    });
  }
  
  // Mezclar las opciones pero mantener al menos una correcta
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, 5);
};

// Crear matriz con camino predefinido
export const createFortressMatrix = (): FortressMatrix => {
  const rows = 6;
  const cols = 8;
  
  // Definir el camino dorado manualmente
  const pathCoordinates = [
    { row: 0, col: 0, value: 16 },   // Inicio
    { row: 0, col: 1, value: 12 },
    { row: 1, col: 1, value: 9 },
    { row: 1, col: 2, value: 15 },
    { row: 1, col: 3, value: 18 },
    { row: 2, col: 3, value: 21 },
    { row: 2, col: 4, value: 24 },
    { row: 3, col: 4, value: 20 },
    { row: 3, col: 5, value: 14 },
    { row: 4, col: 5, value: 10 },
    { row: 4, col: 6, value: 8 },
    { row: 5, col: 6, value: 6 },
    { row: 5, col: 7, value: 4 }    // Final
  ];
  
  // Crear la matriz con números aleatorios
  const grid: MatrixCell[][] = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      grid[row][col] = {
        value: Math.floor(Math.random() * 50) + 1, // Números aleatorios del 1 al 50
        isPath: false,
        isCurrentPosition: false,
        isCompleted: false,
        isTarget: false,
        row,
        col
      };
    }
  }
  
  // Colocar los números del camino en sus posiciones
  pathCoordinates.forEach((pathPoint, index) => {
    const cell = grid[pathPoint.row][pathPoint.col];
    cell.value = pathPoint.value;
    cell.isPath = true;
    cell.isCurrentPosition = index === 0; // Solo el primer punto está activo inicialmente
    cell.isTarget = index === 0;
  });
  
  return {
    grid,
    path: pathCoordinates,
    currentStep: 0,
    totalSteps: pathCoordinates.length
  };
};

// Configuración del problema principal
export const createFortressProblem = (): FortressProblem => {
  const matrix = createFortressMatrix();
  const currentTarget = matrix.path[0].value; // Empezar con el primer valor del camino
  
  return {
    id: 'fortress_main',
    title: 'Entrada de la Fortaleza',
    description: 'Encuentra el camino correcto a través de la fortaleza resolviendo las operaciones',
    matrix,
    currentTarget,
    options: generateEqualNumberOptions(currentTarget),
    difficulty: 'medium'
  };
};

// Validar que una expresión use solo números iguales
export const validateEqualNumbers = (expression: string): boolean => {
  // Remover espacios y dividir por el operador +
  const numbers = expression.replace(/\s/g, '').split('+').map(n => parseInt(n));
  
  // Verificar que todos los números sean iguales
  const firstNumber = numbers[0];
  return numbers.every(num => num === firstNumber && !isNaN(num));
};

// Evaluar una expresión matemática simple
export const evaluateExpression = (expression: string): number => {
  try {
    // Solo permitir números, espacios y el operador +
    if (!/^[\d\s+]+$/.test(expression)) {
      return 0;
    }
    
    const numbers = expression.replace(/\s/g, '').split('+').map(n => parseInt(n));
    return numbers.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  } catch {
    return 0;
  }
};
