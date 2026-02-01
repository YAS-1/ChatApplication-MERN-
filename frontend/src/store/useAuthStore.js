import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useAuthStore = create((set) => ({
    // current states
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatignProfile: false,
    isCheckingAuth: true,

    //function to check the auth state
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            // set the auth user
            set({ authUser: res.data});
        } catch (error) {
            console.log("Error checking auth", error);
            set({ authUser: null }); // set the auth user to null
        } finally {
            set({ isCheckingAuth: false }); // set the isCheckingAuth to false when complete
        }
    },

    //function to signup
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            
        } catch (error) {
            
        }
    }
}));