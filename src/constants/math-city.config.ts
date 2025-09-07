import type { MathCityProblem } from '../types/math-city.types';

export const MATH_CITY_PROBLEMS: MathCityProblem[] = [
  {
    id: 'problem-1',
    title: 'Mercado de Manzanas',
    description: 'En el mercado hay 3 puestos, cada uno con 2 manzanas. ¿Cuál es la operación correcta?',
    groups: [
      {
        id: 'group-manzanas-1',
        type: 'manzanas',
        emoji: '🍎',
        itemsPerGroup: 2,
        groupCount: 3,
        totalItems: 6,
        position: { x: 100, y: 200 }
      }
    ],
    availableOperations: [
      { id: 'op-1', operation: '2+2+2', result: 6, isUsed: false, isCorrect: true, originalPosition: { x: 50, y: 400 } },
      { id: 'op-2', operation: '3+3', result: 6, isUsed: false, isCorrect: false, originalPosition: { x: 150, y: 400 } },
      { id: 'op-3', operation: '1+1+1+1+1+1', result: 6, isUsed: false, isCorrect: false, originalPosition: { x: 250, y: 400 } },
      { id: 'op-4', operation: '4+2', result: 6, isUsed: false, isCorrect: false, originalPosition: { x: 350, y: 400 } }
    ],
    correctOperation: '2+2+2',
    targetResult: 6,
    difficulty: 'easy',
    hint: 'Cuenta cuántas manzanas hay en cada puesto y suma: 2+2+2',
    isCompleted: false
  },
  {
    id: 'problem-2',
    title: 'Cristales Mágicos',
    description: 'La joyería tiene 4 vitrinas, cada una con 3 cristales mágicos. ¿Cuál operación representa esto?',
    groups: [
      {
        id: 'group-cristales-1',
        type: 'cristales',
        emoji: '💎',
        itemsPerGroup: 3,
        groupCount: 4,
        totalItems: 12,
        position: { x: 100, y: 200 }
      }
    ],
    availableOperations: [
      { id: 'op-1', operation: '3+3+3+3', result: 12, isUsed: false, isCorrect: true, originalPosition: { x: 50, y: 400 } },
      { id: 'op-2', operation: '4+4+4', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 150, y: 400 } },
      { id: 'op-3', operation: '6+6', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 250, y: 400 } },
      { id: 'op-4', operation: '2+2+2+2+2+2', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 350, y: 400 } }
    ],
    correctOperation: '3+3+3+3',
    targetResult: 12,
    difficulty: 'easy',
    hint: 'Observa las 4 vitrinas con 3 cristales cada una: 3+3+3+3',
    isCompleted: false
  },
  {
    id: 'problem-3',
    title: 'Jardín de Semillas',
    description: 'El jardín botánico tiene 5 macetas, cada una con 2 semillas plantadas. ¿Qué operación lo describe?',
    groups: [
      {
        id: 'group-semillas-1',
        type: 'semillas',
        emoji: '🌱',
        itemsPerGroup: 2,
        groupCount: 5,
        totalItems: 10,
        position: { x: 100, y: 200 }
      }
    ],
    availableOperations: [
      { id: 'op-1', operation: '2+2+2+2+2', result: 10, isUsed: false, isCorrect: true, originalPosition: { x: 50, y: 400 } },
      { id: 'op-2', operation: '5+5', result: 10, isUsed: false, isCorrect: false, originalPosition: { x: 150, y: 400 } },
      { id: 'op-3', operation: '3+3+3+1', result: 10, isUsed: false, isCorrect: false, originalPosition: { x: 250, y: 400 } },
      { id: 'op-4', operation: '4+4+2', result: 10, isUsed: false, isCorrect: false, originalPosition: { x: 350, y: 400 } }
    ],
    correctOperation: '2+2+2+2+2',
    targetResult: 10,
    difficulty: 'medium',
    hint: 'Cuenta las 5 macetas con 2 semillas en cada una: 2+2+2+2+2',
    isCompleted: false
  },
  {
    id: 'problem-4',
    title: 'Banco de Cristales',
    description: 'En el banco hay 3 cofres, cada uno guarda 4 cristales valiosos. ¿Cuál es la suma correcta?',
    groups: [
      {
        id: 'group-cristales-2',
        type: 'cristales',
        emoji: '💎',
        itemsPerGroup: 4,
        groupCount: 3,
        totalItems: 12,
        position: { x: 100, y: 200 }
      }
    ],
    availableOperations: [
      { id: 'op-1', operation: '4+4+4', result: 12, isUsed: false, isCorrect: true, originalPosition: { x: 50, y: 400 } },
      { id: 'op-2', operation: '3+3+3+3', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 150, y: 400 } },
      { id: 'op-3', operation: '6+6', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 250, y: 400 } },
      { id: 'op-4', operation: '2+2+2+2+2+2', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 350, y: 400 } }
    ],
    correctOperation: '4+4+4',
    targetResult: 12,
    difficulty: 'medium',
    hint: 'Los 3 cofres tienen 4 cristales cada uno: 4+4+4',
    isCompleted: false
  },
  {
    id: 'problem-5',
    title: 'Huerto de Manzanas',
    description: 'El huerto tiene 4 árboles, cada árbol da 3 manzanas maduras. ¿Cómo se calcula el total?',
    groups: [
      {
        id: 'group-manzanas-2',
        type: 'manzanas',
        emoji: '🍎',
        itemsPerGroup: 3,
        groupCount: 4,
        totalItems: 12,
        position: { x: 100, y: 200 }
      }
    ],
    availableOperations: [
      { id: 'op-1', operation: '3+3+3+3', result: 12, isUsed: false, isCorrect: true, originalPosition: { x: 50, y: 400 } },
      { id: 'op-2', operation: '4+4+4', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 150, y: 400 } },
      { id: 'op-3', operation: '6+6', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 250, y: 400 } },
      { id: 'op-4', operation: '2+2+2+2+2+2', result: 12, isUsed: false, isCorrect: false, originalPosition: { x: 350, y: 400 } }
    ],
    correctOperation: '3+3+3+3',
    targetResult: 12,
    difficulty: 'medium',
    hint: 'Cada uno de los 4 árboles da 3 manzanas: 3+3+3+3',
    isCompleted: false
  },
  {
    id: 'problem-6',
    title: 'Vivero de Semillas',
    description: 'El vivero tiene 6 contenedores, cada uno con 5 semillas especiales. ¿Qué operación es correcta?',
    groups: [
      {
        id: 'group-semillas-2',
        type: 'semillas',
        emoji: '🌱',
        itemsPerGroup: 5,
        groupCount: 6,
        totalItems: 30,
        position: { x: 100, y: 200 }
      }
    ],
    availableOperations: [
      { id: 'op-1', operation: '5+5+5+5+5+5', result: 30, isUsed: false, isCorrect: true, originalPosition: { x: 50, y: 400 } },
      { id: 'op-2', operation: '6+6+6+6+6', result: 30, isUsed: false, isCorrect: false, originalPosition: { x: 150, y: 400 } },
      { id: 'op-3', operation: '10+10+10', result: 30, isUsed: false, isCorrect: false, originalPosition: { x: 250, y: 400 } },
      { id: 'op-4', operation: '15+15', result: 30, isUsed: false, isCorrect: false, originalPosition: { x: 350, y: 400 } }
    ],
    correctOperation: '5+5+5+5+5+5',
    targetResult: 30,
    difficulty: 'hard',
    hint: 'Los 6 contenedores con 5 semillas cada uno: 5+5+5+5+5+5',
    isCompleted: false
  }
];

export const MATH_CITY_CONFIG = {
  maxHints: 3,
  coinsPerCorrectOperation: 2,
  coinsPerIncorrectOperation: -1,
  animationDuration: 400,
  theme: {
    primary: '#8B5CF6', // purple-500
    secondary: '#10B981', // green-500
    accent: '#F59E0B', // amber-500
    danger: '#EF4444', // red-500
    background: 'from-purple-900/20 via-pink-900/20 to-blue-900/20'
  }
} as const;
