import { create } from "zustand";

interface AuthState {
  authToken: string;
}

interface AuthActions {
  setAuthToken: (authToken: string) => void;
  clearAuthToken: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  resetToken: "",
  authToken: localStorage.getItem("authToken") || "",
  setAuthToken: (authToken) => {
    set(() => ({ authToken }));
    localStorage.setItem("authToken", authToken);
  },
  clearAuthToken: () => {
    localStorage.removeItem("authToken");
    set(() => ({ authToken: "" }));
  },
}));
