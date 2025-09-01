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
  userProfile: {} as UserProfile,
  setUserProfile: (userProfile) => {
    set(() => ({ userProfile }));
  },
}));
