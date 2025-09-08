import type { UserProfile } from "@/types/user.type";
import { create } from "zustand/react";

export interface UserState {
  userProfile: UserProfile;
}

export interface UserActions {
  setUserProfile: (userProfile: UserProfile) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useUserStore = create<UserState & UserActions>((set, get) => ({
  userProfile: {
    id: 1,
    document: "test",
    name: "Usuario de Prueba",
    school: "Escuela de Prueba",
    gender: "Masculino",
    money: "0",
    level: 1, // Iniciar en nivel 1
  } as UserProfile,
  setUserProfile: (userProfile) => {
    set(() => ({ userProfile }));
  },
}));
