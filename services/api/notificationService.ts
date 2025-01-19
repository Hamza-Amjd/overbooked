import axios from "axios";
import { BASE_URL } from "../config";
import { useNotificationStore } from "../notificationStore";
import { useAuthStore } from "../authStore";

export const fetchUserNotifications =async () => {
    const {user}=useAuthStore.getState()
    try {
      const res=await axios.get(`${BASE_URL}/notifications/${user?._id}`)
      const {setNotifications}=useNotificationStore.getState();
      setNotifications(res.data)
    } catch (error) {
      console.log("fetching notifications error:", error);
    }
  };