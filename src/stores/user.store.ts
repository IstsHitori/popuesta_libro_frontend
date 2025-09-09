import type { UserProfile } from "@/types/user.type";
import { create } from "zustand/react";

export interface UserState {
  userProfile: UserProfile;
}

export interface UserActions {
  setUserProfile: (userProfile: UserProfile) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useUserStore = create<UserState & UserActions>((set) => ({
  userProfile: {
    id: 1,
    document: "test",
    name: "Usuario de Prueba",
    school: "Escuela de Prueba",
    gender: "Masculino",
    money: "0",
    level: 1, // Iniciar en nivel 1
    items: [
      // Datos de prueba - reemplaza con datos reales de la API
      {
        id: 1,
        name: "Cinturón del Bosque",
        item_type: "garment"
      },
      {
        id: 2,
        name: "Cristal Rojo",
        item_type: "crystal"
      }
    ]
  } as UserProfile,
  setUserProfile: (userProfile) => {
    set(() => ({ userProfile }));
  },
}));
