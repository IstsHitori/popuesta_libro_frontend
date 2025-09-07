import type { RepeatedAdditionProblem } from '../types/repeated-addition.types';

export const REPEATED_ADDITION_PROBLEMS: RepeatedAdditionProblem[] = [
  {
    id: 'problem-1',
    title: 'Circuito de LEDs',
    description: 'Tomás programa 3 filas de LEDs y cada fila necesita 2 componentes. ¿Cuántos componentes necesita en total?',
    targetResult: 6,
    correctNumber: 2,
    repetitions: 3,
    availableNumbers: [2, 2, 2, 3, 1, 4], // 3 doses correctos + distractores
    difficulty: 'easy',
    hint: 'Programa el circuito: coloca el componente 2 en cada una de las 3 conexiones para obtener 2+2+2=6',
    isCompleted: false
  },
  {
    id: 'problem-2',
    title: 'Sensores Robóticos',
    description: 'El robot tiene 4 extremidades y cada una lleva 3 sensores. ¿Cuántos sensores instalar en total?',
    targetResult: 12,
    correctNumber: 3,
    repetitions: 4,
    availableNumbers: [3, 3, 3, 3, 2, 4, 6], // 4 treses correctos + distractores
    difficulty: 'easy',
    hint: 'Sistema de sensores: programa 3 sensores en las 4 extremidades: 3+3+3+3=12',
    isCompleted: false
  },
  {
    id: 'problem-3',
    title: 'Servidores de Datos',
    description: 'El centro de datos tiene 5 racks y cada rack procesa 2 terabytes. ¿Cuántos terabytes en total?',
    targetResult: 10,
    correctNumber: 2,
    repetitions: 5,
    availableNumbers: [2, 2, 2, 2, 2, 1, 3, 5], // 5 doses correctos + distractores
    difficulty: 'medium',
    hint: 'Capacidad del sistema: configura 2 terabytes en los 5 racks: 2+2+2+2+2=10',
    isCompleted: false
  },
  {
    id: 'problem-4',
    title: 'Drones de Vigilancia',
    description: 'La estación controla 3 drones y cada uno tiene 2 cámaras. ¿Cuántas cámaras monitorean?',
    targetResult: 6,
    correctNumber: 2,
    repetitions: 3,
    availableNumbers: [2, 2, 2, 1, 3, 6], // 3 doses correctos + distractores
    difficulty: 'easy',
    hint: 'Red de vigilancia: instala 2 cámaras en los 3 drones: 2+2+2=6',
    isCompleted: false
  },
  {
    id: 'problem-5',
    title: 'Motores Cuadcopter',
    description: 'En el laboratorio hay 4 cuadcópteros y cada uno tiene 4 motores. ¿Cuántos motores en total?',
    targetResult: 16,
    correctNumber: 4,
    repetitions: 4,
    availableNumbers: [4, 4, 4, 4, 2, 8, 1], // 4 cuatros correctos + distractores
    difficulty: 'medium',
    hint: 'Sistema de vuelo: programa 4 motores en los 4 cuadcópteros: 4+4+4+4=16',
    isCompleted: false
  },
  {
    id: 'problem-6',
    title: 'Microprocesadores',
    description: 'El supercomputador tiene 6 módulos y cada módulo lleva 5 microprocesadores. ¿Cuántos chips total?',
    targetResult: 30,
    correctNumber: 5,
    repetitions: 6,
    availableNumbers: [5, 5, 5, 5, 5, 5, 3, 6, 10], // 6 cincos correctos + distractores
    difficulty: 'hard',
    hint: 'Arquitectura del sistema: instala 5 microprocesadores en los 6 módulos: 5+5+5+5+5+5=30',
    isCompleted: false
  }
];

export const REPEATED_ADDITION_CONFIG = {
  maxHints: 3,
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
