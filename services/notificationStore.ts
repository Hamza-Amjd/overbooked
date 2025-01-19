import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface notificationState {
  notifications: Record<string, any>[]; // Array of notifications
  setNotifications: (notifications:any)=>void; //
  clearNotifications: () => void; // Method to clear the notifications list
}

export const useNotificationStore = create<notificationState>()(
  persist(
    (set) => ({
      notifications: [], // Initialize with an empty array
      setNotifications: (notifications) => set({ notifications }), // Method to set the notifications list
      clearNotifications: () => set({ notifications: [] }), // Clear the notifications list
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
