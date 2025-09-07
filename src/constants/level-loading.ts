// Configuraciones de pantallas de carga para cada nivel

export const LEVEL_LOADING_CONFIG = {
  level1: {
    levelNumber: 1,
    levelTitle: "El reto del mercado de café",
    backgroundImage: "/tomas/bosque_de_la_ciencia.webp",
    tip: "🌳 En este bosque mágico aprenderás que multiplicar es agrupar elementos iguales. ¡Arrastra los números para formar grupos perfectos!",
    duration: 3500
  },
  level2: {
    levelNumber: 2,
    levelTitle: "Centro de Tecnología",
    backgroundImage: "/tomas/centro_de_tecnologia.webp",
    tip: "⚡ En el centro tecnológico descubrirás patrones avanzados de multiplicación. ¡Cada engranaje tiene su función matemática!",
    duration: 3500
  },
  level3: {
    levelNumber: 3,
    levelTitle: "Fortaleza de la Ingeniería",
    backgroundImage: "/tomas/fortaleza-de-la-ingenieria.png",
    tip: "🏗️ Esta fortaleza requiere precisión matemática. Las estructuras se construyen con multiplicaciones exactas y cálculos perfectos.",
    duration: 3500
  },
  level4: {
    levelNumber: 4,
    levelTitle: "Templo de la Integración",
    backgroundImage: "/tomas/templo_de_la_integracion.webp",
    tip: "🔮 En el templo final integrarás todo tu conocimiento. Aquí dominarás las multiplicaciones más complejas del reino matemático.",
    duration: 3500
  }
} as const;

export type LevelKey = keyof typeof LEVEL_LOADING_CONFIG;
