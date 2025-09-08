import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EarnedGarment,
  EarnedCrystal,
  LevelReward,
} from "../types/earned-items.types";
import { useUserStore } from "./user.store";
import { PATH_CRYSTALS, PATH_GARMENTS } from "@/constants/earnedItems-images";

interface EarnedItemsStore {
  garments: EarnedGarment[];
  crystals: EarnedCrystal[];
  completedLevels: number[];
  shownModals: number[]; // Niveles para los cuales ya se mostró el modal
}

interface EarnedItemsActions {
  completeLevel: (level: number) => void;
  getAllEarnedGarments: () => EarnedGarment[];
  getAllEarnedCrystals: () => EarnedCrystal[];
  getEarnedItemsCount: () => { garments: number; crystals: number };
  isLevelCompleted: (level: number) => boolean;
  shouldShowModal: (level: number) => boolean;
  markModalAsShown: (level: number) => void;
  resetProgress: () => void;
}

// Configuración inicial de recompensas por nivel
const LEVEL_REWARDS: LevelReward[] = [
  {
    level: 1, // Bosque de la Ciencia
    garment: {
      id: "belt",
      name: "Cinturón del Bosque",
      image: PATH_GARMENTS.BELT,
      level: 1,
      isEarned: false,
    },
    crystal: {
      id: "red-crystal",
      name: "Cristal Rojo",
      image: PATH_CRYSTALS.RED_CRYSTAL,
      level: 1,
      color: "red",
      isEarned: false,
    },
  },
  {
    level: 2, // Centro de Tecnología
    garment: {
      id: "chest-protector",
      name: "Pechera Tecnológica",
      image: PATH_GARMENTS.CHEST_PROTECTOR,
      level: 2,
      isEarned: false,
    },
    crystal: {
      id: "yellow-crystal",
      name: "Cristal Amarillo",
      image: PATH_CRYSTALS.YELLOW_CRYSTAL,
      level: 2,
      color: "yellow",
      isEarned: false,
    },
  },
  {
    level: 3, // Ciudad Matemática
    garment: {
      id: "boots",
      name: "Botas de la Ciudad",
      image: PATH_GARMENTS.BOOTS,
      level: 3,
      isEarned: false,
    },
    crystal: {
      id: "gray-crystal",
      name: "Cristal Gris",
      image: PATH_CRYSTALS.GRAY_CRYSTAL,
      level: 3,
      color: "gray",
      isEarned: false,
    },
  },
  {
    level: 4, // Fortaleza de la Ingeniería
    garment: {
      id: "helmet",
      name: "Casco de la Fortaleza",
      image: PATH_GARMENTS.HELMET,
      level: 4,
      isEarned: false,
    },
    crystal: {
      id: "green-crystal",
      name: "Cristal Verde",
      image: PATH_CRYSTALS.GREEN_CRYSTAL,
      level: 4,
      color: "green",
      isEarned: false,
    },
  },
];

export const useEarnedItemsStore = create<
  EarnedItemsStore & EarnedItemsActions
>()(
  persist(
    (set, get) => ({
      // Estado inicial
      garments: LEVEL_REWARDS.map((reward) => ({ ...reward.garment })),
      crystals: LEVEL_REWARDS.map((reward) => ({ ...reward.crystal })),
      completedLevels: [],
      shownModals: [], // Array para trackear qué modales ya se mostraron

      // Marcar un nivel como completado y ganar sus recompensas
      completeLevel: (level: number) => {
        const currentState = get();

        // Evitar duplicados
        if (currentState.completedLevels.includes(level)) {
          return;
        }

        set((state) => ({
          completedLevels: [...state.completedLevels, level],
          garments: state.garments.map((garment) =>
            garment.level === level ? { ...garment, isEarned: true } : garment
          ),
          crystals: state.crystals.map((crystal) =>
            crystal.level === level ? { ...crystal, isEarned: true } : crystal
          ),
        }));

        // Actualizar el nivel del usuario si completó un nivel superior
        const userStore = useUserStore.getState();
        const currentUserLevel = userStore.userProfile?.level || 1;
        const nextLevel = level + 1;

        if (nextLevel > currentUserLevel && nextLevel <= 4) {
          userStore.setUserProfile({
            ...userStore.userProfile,
            level: nextLevel,
          });
        }
      },

      // Obtener todas las prendas ganadas
      getAllEarnedGarments: () => {
        return get().garments.filter((garment) => garment.isEarned);
      },

      // Obtener todos los cristales ganados
      getAllEarnedCrystals: () => {
        return get().crystals.filter((crystal) => crystal.isEarned);
      },

      // Obtener conteo de items ganados
      getEarnedItemsCount: () => {
        const state = get();
        return {
          garments: state.garments.filter((garment) => garment.isEarned).length,
          crystals: state.crystals.filter((crystal) => crystal.isEarned).length,
        };
      },

      // Verificar si un nivel está completado
      isLevelCompleted: (level: number) => {
        return get().completedLevels.includes(level);
      },

      // Verificar si se debe mostrar el modal (nivel completado pero modal no mostrado)
      shouldShowModal: (level: number) => {
        const state = get();
        return (
          state.completedLevels.includes(level) &&
          !state.shownModals.includes(level)
        );
      },

      // Marcar modal como mostrado
      markModalAsShown: (level: number) => {
        set((state) => ({
          ...state,
          shownModals: [...state.shownModals, level],
        }));
      },

      // Resetear todo el progreso (para testing)
      resetProgress: () => {
        set({
          garments: LEVEL_REWARDS.map((reward) => ({
            ...reward.garment,
            isEarned: false,
          })),
          crystals: LEVEL_REWARDS.map((reward) => ({
            ...reward.crystal,
            isEarned: false,
          })),
          completedLevels: [],
          shownModals: [],
        });
      },
    }),
    {
      name: "earned-items-storage", // Nombre para localStorage
    }
  )
);
