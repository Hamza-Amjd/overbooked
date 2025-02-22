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

  export const fetchMyBooks =async (userId:any) => {
    try {
      const res=await axios.get(`${BASE_URL}/library/issued-books/${userId}`)
      const {setMyBooks}=useBookStore.getState();
      setMyBooks(res.data)
      return res.data;
    } catch (error) {
      console.log("fetching books error:", error);
    }
  };

  export const requestBookService =async (userId:any,userName:any, bookName:string, author:string,description:string) => {
    try {
      await axios.post(`${BASE_URL}/library/request-new-book`,{userId,userName,bookName,author,description})
    } catch (error) {
      console.log("request book error:", error);
    }
  };
  
  export const returnBookService =async (userID:any,bookID:any) => {
    try {
      await axios.post(`${BASE_URL}/library/returnBook`,{userID,bookID})
      fetchMyBooks(userID)
    } catch (error) {
      console.log("request book error:", error);
    }
  };