import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isLoggingIn: false,

  login: async (formData) => {
    set({ isLoggingIn: true });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      set({ user: res.data.user, isLoggingIn: false });
      console.log("Login success:", res.data);
    } catch (error) {
      set({ isLoggingIn: false });
      console.error("Login failed:", error.response?.data || error.message);
      // Optionally: set error message in state here
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      set({ user: null });
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  },
}));
