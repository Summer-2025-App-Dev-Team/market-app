import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }),
  {
    name: 'auth-storage', // name of item in localStorage
  }
));
export default useAuthStore;