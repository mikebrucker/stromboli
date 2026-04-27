import type { Language, UnitSystem, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useLanguageStore } from "./useLanguageStore";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateName: (name: string) => void;
  updatePreferredUnit: (unit: UnitSystem) => void;
  updatePreferredLanguage: (language: Language) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      updateName: name =>
        set(state => ({
          user: state.user ? { ...state.user, name } : null,
        })),
      updatePreferredUnit: preferredUnit =>
        set(state => ({
          user: state.user ? { ...state.user, preferredUnit } : null,
        })),
      updatePreferredLanguage: (language) => {
        set(state => ({
          user: state.user ? { ...state.user, preferredLanguage: language } : null,
        }));
        useLanguageStore.getState().setLanguage(language);
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
