import axios from "axios";
import { BASE_URL } from "../config";
import { useNotificationStore } from "../notificationStore";
import { useAuthStore } from "../authStore";

export const fetchUserNotifications =async (userId:any) => {
    try {
      const res=await axios.get(`${BASE_URL}/notifications/${userId}`)
      const {setNotifications}=useNotificationStore.getState();
      setNotifications(res.data)
    } catch (error) {
      console.log("fetching notifications error:", error);
    }
  };

  export const clearUserNotifications =async (userId:any) => {
    const {user} = useAuthStore.getState();
      try {
        await axios.post(`${BASE_URL}/notifications/${user?._id}/clear`)
        fetchUserNotifications(userId)
      } catch (error) {
        console.log("clear notifications error:", error);
      }
    };