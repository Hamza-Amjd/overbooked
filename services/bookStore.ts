import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface bookState {
  books: Record<string, any>[]; // Array of book
  myBooks: Record<string, any>[]; // Array of book
  myBooksProgress: any|[{id:string,page:number,numberOfPages:number}]; // Array of book
  setBooks:(books: any) => void;
  setMyBooks : (books: any) => void; // Method to set the myBooks list 
  addToMyBooksProgress: (id: string,numberOfPages:number) => void; // Method to add a book to the myBooks list
  updateMybookProgress: (id: string, progress: number) => void; // Method to update the progress of a book in the myBooks list 
  clearBooks: () => void; // Method to clear the book list
}

export const useBookStore = create<bookState>()(
  persist(
    (set) => ({
      books: [], // Initialize with an empty array
      myBooks:[],
      myBooksProgress:[],
      setBooks : (data:any) => set({ books: data }),
      setMyBooks : (data:any) => set({ myBooks: data }),
      addToMyBooksProgress: (id:string,numberOfPages:number) => set((state) => {
        if (!state.myBooksProgress.some((b: any) => b.id === id)) {
          return { myBooksProgress: [...state.myBooksProgress, {id:id,numberOfPages:numberOfPages}] };
        }
        return state;
      }),
      updateMybookProgress: (id: string, page: number) => set((state) => ({ myBooksProgress: state.myBooksProgress.map((b:any) => b.id === id ? { ...b, page: page} : b) })),

      clearBooks: () => set({ books: [],myBooks:[],myBooksProgress:[] }), // Clear the book list
    }),
    {
      name: "book-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
