import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface notificationState {
  notifications: Record<string, any>[]; // Array of notifications
  unreadCount: number; // Number of unread notifications
  setNotifications: (notifications:any)=>void; //
  clearNotifications: () => void; // Method to clear the notifications list
}

export const useNotificationStore = create<notificationState>()(
  persist(
    (set) => ({
      notifications: [], // Initialize with an empty array
      unreadCount: 0, // Initialize with 0
      setNotifications: (notifications) => set({ notifications,unreadCount: notifications.filter((notification:any) => !notification.read).length  }), // Method to set the notifications list
      clearNotifications: () => set({ notifications: [],unreadCount:0 }), // Clear the notifications list
    }),
    {
      name: "notification-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
