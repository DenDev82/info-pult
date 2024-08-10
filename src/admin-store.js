import { create } from "zustand";

export const useAdminStore = create((set) => ({
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  setAdmin: (isAdmin) => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    set({ isAdmin });
  },
}));
