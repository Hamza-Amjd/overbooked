import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface authState {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
       user :  null,
      setUser : (user: any) => set({ user }),
      logout : () => set({ user: null}),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
