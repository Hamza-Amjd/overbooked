import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface bookState {
  books: Record<string, any>[]; // Array of book
  myBooks: Record<string, any>[]; // Array of book
  setBooks:(books: any) => void;
  setMyBooks : (books: any) => void; // Method to set the myBooks list 
  addBook: (book: any) => void; // Method to add a book
  addToMyBooks: (book: any) => void; // Method to add a book to the myBooks list
  removeFromMyBooks: (book: any) => void; // Method to remove a book from the myBooks list
  updateMybookProgress: (id: string, progress: number,numberOfPages:number) => void; // Method to update the progress of a book in the myBooks list 
  clearBooks: () => void; // Method to clear the book list
}

export const useBookStore = create<bookState>()(
  persist(
    (set) => ({
      books: [], // Initialize with an empty array
      myBooks:[],
      setBooks : (data:any) => set({ books: data }),
      setMyBooks : (data:any) => set({ myBooks: data }),
      addBook: (book: any) => set((state) => ({ books: [...state.books, book] })), // Add a book to the list
      addToMyBooks: (book: any) => set((state) => {
        if (!state.myBooks.some((b: any) => b._id === book._id)) {
          return { myBooks: [...state.myBooks, book] };
        }
        return state;
      }),
      removeFromMyBooks: (book: any) => set((state) => ({ myBooks: state.myBooks.filter((b) => b.id!== book.id) })), // Remove a book from the myBooks list
      updateMybookProgress: (id: string, page: number,numberOfPages:number) => set((state) => ({ myBooks: state.myBooks.map((b) => b._id === id ? { ...b, page: page,numberOfPages:numberOfPages } : b) })),

      clearBooks: () => set({ books: [],myBooks:[] }), // Clear the book list
    }),
    {
      name: "book-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
