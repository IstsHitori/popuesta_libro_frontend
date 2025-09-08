import type { FortressProblem, FortressMatrix, FortressOption, MatrixCell } from '../types/fortress.types';

// Función para generar opciones mixtas (agrupamientos repetidos vs expresiones variadas)
export const generateMixedOptions = (target: number): FortressOption[] => {
  // Decidir el tipo de pregunta aleatoriamente
  const questionType = Math.random() < 0.5 ? 'all_repetitions' : 'mixed';
  
  if (questionType === 'all_repetitions') {
    // Todas las opciones son agrupamientos repetidos, pero solo una es correcta
    return generateAllRepetitionOptions(target);
  } else {
    // Mezcla: algunas repeticiones (una correcta) + algunas expresiones variadas
    return generateMixedRepetitionOptions(target);
  }
};

// Generar 5 opciones donde todas son agrupamientos repetidos
const generateAllRepetitionOptions = (target: number): FortressOption[] => {
  const options: FortressOption[] = [];
  
  // Buscar divisores del número objetivo
  const divisors = [];
  for (let i = 1; i <= target; i++) {
    if (target % i === 0 && (target / i) >= 2 && (target / i) <= 6) {
      divisors.push(i);
    }
  }
  
  // Si no hay suficientes divisores, agregar algunos que no den el resultado exacto
  const allOptions = [...divisors];
  
  // Agregar opciones incorrectas (números que repetidos no den el target)
  for (let num = 1; num <= 8; num++) {
    for (let count = 2; count <= 6; count++) {
      if (num * count !== target && !allOptions.includes(num)) {
        allOptions.push(num);
      }
    }
  }
  
  // Crear la opción correcta
  if (divisors.length > 0) {
    const correctDivisor = divisors[Math.floor(Math.random() * divisors.length)];
    const correctCount = target / correctDivisor;
    options.push({
      id: `correct_${target}`,
      expression: Array(correctCount).fill(correctDivisor).join(' + '),
      result: target,
      isCorrect: true
    });
  }
  
  // Crear opciones incorrectas (todas agrupamientos repetidos)
  const usedNumbers = new Set([divisors[0]]);
  while (options.length < 5) {
    const randomNum = Math.floor(Math.random() * 8) + 1;
    if (usedNumbers.has(randomNum)) continue;
    
    const randomCount = Math.floor(Math.random() * 4) + 2; // 2-5 repeticiones
    const result = randomNum * randomCount;
    
    if (result !== target) {
      options.push({
        id: `incorrect_${options.length}_${target}`,
        expression: Array(randomCount).fill(randomNum).join(' + '),
        result: result,
        isCorrect: false
      });
      usedNumbers.add(randomNum);
    }
  }
  
  // Mezclar opciones
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  return options;
};

// Generar opciones mixtas: algunas repeticiones + algunas variadas
const generateMixedRepetitionOptions = (target: number): FortressOption[] => {
  const options: FortressOption[] = [];
  
  // Buscar divisores para la opción correcta repetida
  const divisors = [];
  for (let i = 1; i <= target; i++) {
    if (target % i === 0 && (target / i) >= 2 && (target / i) <= 6) {
      divisors.push(i);
    }
  }
  
  // Crear la opción correcta (agrupamiento repetido)
  if (divisors.length > 0) {
    const correctDivisor = divisors[Math.floor(Math.random() * divisors.length)];
    const correctCount = target / correctDivisor;
    options.push({
      id: `correct_${target}`,
      expression: Array(correctCount).fill(correctDivisor).join(' + '),
      result: target,
      isCorrect: true
    });
  } else {
    // Si no hay divisores buenos, crear una opción variada correcta
    options.push({
      id: `correct_${target}`,
      expression: `${target - 1} + 1`,
      result: target,
      isCorrect: true
    });
  }
  
  // Agregar 2-3 opciones repetidas incorrectas
  const usedNumbers = new Set();
  for (let i = 0; i < 3 && options.length < 4; i++) {
    const randomNum = Math.floor(Math.random() * 8) + 1;
    if (usedNumbers.has(randomNum)) continue;
    
    const randomCount = Math.floor(Math.random() * 4) + 2;
    const result = randomNum * randomCount;
    
    if (result !== target) {
      options.push({
        id: `incorrect_rep_${i}_${target}`,
        expression: Array(randomCount).fill(randomNum).join(' + '),
        result: result,
        isCorrect: false
      });
      usedNumbers.add(randomNum);
    }
  }
  
  // Completar con opciones variadas incorrectas
  const incorrectTargets = [target - 2, target - 1, target + 1, target + 2].filter(r => r > 0);
  
  while (options.length < 5 && incorrectTargets.length > 0) {
    const wrongTarget = incorrectTargets.shift()!;
    const expressions = [
      `${wrongTarget - 1} + 1`,
      `${Math.floor(wrongTarget / 2)} + ${Math.ceil(wrongTarget / 2)}`,
      `${wrongTarget - 3} + 2 + 1`,
      `1 + 2 + ${wrongTarget - 3}`
    ];
    
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    options.push({
      id: `incorrect_var_${options.length}_${target}`,
      expression: randomExpression,
      result: wrongTarget,
      isCorrect: false
    });
  }
  
  // Mezclar opciones
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  return options;
};

// Función para generar opciones con números iguales solamente (mantener compatibilidad)
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
  
  // Definir un camino más interesante y serpenteante
  const pathCoordinates = [
    { row: 0, col: 0, value: 16 },   // Inicio - esquina superior izquierda
    { row: 0, col: 1, value: 12 },   // Derecha
    { row: 0, col: 2, value: 9 },    // Derecha
    { row: 0, col: 3, value: 15 },   // Derecha
    { row: 1, col: 3, value: 18 },   // Abajo
    { row: 2, col: 3, value: 21 },   // Abajo
    { row: 2, col: 4, value: 24 },   // Derecha
    { row: 2, col: 5, value: 20 },   // Derecha
    { row: 1, col: 5, value: 14 },   // Arriba (giro)
    { row: 0, col: 5, value: 10 },   // Arriba
    { row: 0, col: 6, value: 8 },    // Derecha
    { row: 1, col: 6, value: 6 },    // Abajo
    { row: 2, col: 6, value: 25 },   // Abajo
    { row: 3, col: 6, value: 22 },   // Abajo
    { row: 3, col: 5, value: 18 },   // Izquierda
    { row: 4, col: 5, value: 12 },   // Abajo
    { row: 4, col: 4, value: 16 },   // Izquierda
    { row: 5, col: 4, value: 9 },    // Abajo
    { row: 5, col: 3, value: 15 },   // Izquierda
    { row: 5, col: 2, value: 6 },    // Izquierda
    { row: 4, col: 2, value: 21 },   // Arriba
    { row: 3, col: 2, value: 8 },    // Arriba
    { row: 3, col: 1, value: 12 },   // Izquierda
    { row: 4, col: 1, value: 4 },    // Abajo
    { row: 5, col: 1, value: 10 },   // Abajo
    { row: 5, col: 0, value: 14 },   // Izquierda - llegada en esquina inferior izquierda
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
    title: 'El Acertijo de Caos',
    description: 'Derrota las trampas matemáticas de Caos encontrando la expresión correcta para cruzar el puente',
    matrix,
    currentTarget,
    options: generateMixedOptions(currentTarget),
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
