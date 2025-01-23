import axios from "axios";
import { BASE_URL} from "../config";
import { useBookStore } from "../bookStore";
import { useAuthStore } from "../authStore";
const {user}=useAuthStore.getState();

export const fetchAllBooks =async () => {
    try {
      const res=await axios.get(`${BASE_URL}/library`)
      const {setBooks}=useBookStore.getState();
      setBooks(res.data)
      return res.data;
    } catch (error) {
      console.log("fetching books error:", error);
    }
  };

  export const fetchMyBooks =async () => {
    try {
      const res=await axios.get(`${BASE_URL}/library/issued-books/${user?._id}`)
      const {setMyBooks}=useBookStore.getState();
      setMyBooks(res.data)
      return res.data;
    } catch (error) {
      console.log("fetching books error:", error);
    }
  };