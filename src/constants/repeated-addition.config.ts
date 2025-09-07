import type { RepeatedAdditionProblem } from '../types/repeated-addition.types';

export const REPEATED_ADDITION_PROBLEMS: RepeatedAdditionProblem[] = [
  {
    id: 'problem-1',
    title: 'Canastas de Huevos',
    description: 'Tomás tiene 3 canastas y en cada una coloca 2 huevos. ¿Cuántos huevos hay en total?',
    targetResult: 6,
    correctNumber: 2,
    repetitions: 3,
    availableNumbers: [2, 2, 2, 3, 1, 4], // 3 doses correctos + distractores
    difficulty: 'easy',
    hint: 'Coloca el número 2 en cada una de las 3 cajas para sumar 2+2+2=6',
    isCompleted: false
  },
  {
    id: 'problem-2',
    title: 'Flores del Jardín',
    description: 'En el jardín hay 4 macetas y en cada una crecen 3 flores. ¿Cuántas flores hay en total?',
    targetResult: 12,
    correctNumber: 3,
    repetitions: 4,
    availableNumbers: [3, 3, 3, 3, 2, 4, 6], // 4 treses correctos + distractores
    difficulty: 'easy',
    hint: 'Necesitas poner el 3 en las 4 cajas: 3+3+3+3=12',
    isCompleted: false
  },
  {
    id: 'problem-3',
    title: 'Libros en Estantes',
    description: 'La biblioteca tiene 5 estantes y en cada uno hay 2 libros. ¿Cuántos libros hay en total?',
    targetResult: 10,
    correctNumber: 2,
    repetitions: 5,
    availableNumbers: [2, 2, 2, 2, 2, 1, 3, 5], // 5 doses correctos + distractores
    difficulty: 'medium',
    hint: 'Usa el número 2 cinco veces: 2+2+2+2+2=10',
    isCompleted: false
  },
  {
    id: 'problem-4',
    title: 'Ruedas de Bicicletas',
    description: 'En el taller hay 3 bicicletas y cada una tiene 2 ruedas. ¿Cuántas ruedas hay en total?',
    targetResult: 6,
    correctNumber: 2,
    repetitions: 3,
    availableNumbers: [2, 2, 2, 1, 3, 6], // 3 doses correctos + distractores
    difficulty: 'easy',
    hint: 'Cada bicicleta tiene 2 ruedas, así que 2+2+2=6',
    isCompleted: false
  },
  {
    id: 'problem-5',
    title: 'Patas de Perros',
    description: 'En el parque hay 4 perros y cada uno tiene 4 patas. ¿Cuántas patas hay en total?',
    targetResult: 16,
    correctNumber: 4,
    repetitions: 4,
    availableNumbers: [4, 4, 4, 4, 2, 8, 1], // 4 cuatros correctos + distractores
    difficulty: 'medium',
    hint: 'Cada perro tiene 4 patas: 4+4+4+4=16',
    isCompleted: false
  },
  {
    id: 'problem-6',
    title: 'Dedos de las Manos',
    description: 'Tomás cuenta 6 manos y cada mano tiene 5 dedos. ¿Cuántos dedos hay en total?',
    targetResult: 30,
    correctNumber: 5,
    repetitions: 6,
    availableNumbers: [5, 5, 5, 5, 5, 5, 3, 6, 10], // 6 cincos correctos + distractores
    difficulty: 'hard',
    hint: 'Cada mano tiene 5 dedos: 5+5+5+5+5+5=30',
    isCompleted: false
  }
];

export const REPEATED_ADDITION_CONFIG = {
  maxHints: 3,
  pointsPerCorrectPlacement: 10,
  pointsPerCompletedProblem: 50,
  coinsPerCorrectPlacement: 1,
  coinsPerIncorrectPlacement: -1,
  animationDuration: 300,
  theme: {
    primary: '#3B82F6', // blue-500
    secondary: '#10B981', // green-500
    accent: '#F59E0B', // amber-500
    danger: '#EF4444', // red-500
    background: 'from-blue-900/20 via-green-900/20 to-purple-900/20'
  }
} as const;
