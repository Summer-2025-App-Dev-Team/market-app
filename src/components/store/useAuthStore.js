import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user, rememberMe = true) => {
        set({ user });
        if (!rememberMe) {
          // Remove the user from the local storage if the user does not want to be remembered
          localStorage.removeItem("auth-storage");
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // name of item in localStorage
      skipHydration: true,
    }
  )
);

export default useAuthStore;