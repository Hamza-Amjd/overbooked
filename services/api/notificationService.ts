import axios from "axios";
import { BASE_URL } from "../config";
import { useNotificationStore } from "../notificationStore";
import { useAuthStore } from "../authStore";

export const fetchUserNotifications =async (userId:any) => {
    try {
      const res=await axios.get(`${BASE_URL}/notifications/${userId}`)
      const {setNotifications}=useNotificationStore.getState();
      console.log("Notifications :",res.data)
      setNotifications(res.data)
    } catch (error) {
      console.log("fetching notifications error:", error);
    }
  };