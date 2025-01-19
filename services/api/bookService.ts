import axios from "axios";
import { BASE_URL} from "../config";
import { useBookStore } from "../bookStore";

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