import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {ToastAndroid} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage";


interface wishlistStore {
  wishlist: any[];
  clearWishlist: () => void;
  toggleWishlist:(item: any) => void;
}

const useWishListStore = create(
  persist<wishlistStore>(
    (set, get) => ({
      wishlist:[],
      clearWishlist: () => set({wishlist:[]}),
      toggleWishlist: (item: any) => {
        const wishlist = get().wishlist; // all the items already in cart
        const isExisting = wishlist.find(
          (wishlistitem) => wishlistitem?._id === item._id
        );

        if (isExisting) {
          const newWishlist = get().wishlist.filter(
            (wishlistItem) => wishlistItem._id !== item._id
          );
          set({ wishlist: newWishlist });
          return ToastAndroid.showWithGravity(
            "Item removed from wishlist",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }

        set({ wishlist: [...wishlist, item] });
        ToastAndroid.showWithGravity(
          "Item added to wishlist",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useWishListStore;