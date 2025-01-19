import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import useWishListStore from '@/services/wishlistStore'

const BookmarkButton = ({item,size,color="#000"}:any) => {
  const {wishlist,toggleWishlist}=useWishListStore()

  return (
    <TouchableOpacity style={styles.bookmarkBtn} onPress={()=>toggleWishlist(item)}>
        {wishlist.some((book)=>book._id== item._id)?<Ionicons
          name="bookmark"
          size={size?size:22}
          color={Colors.primary}
        />:
        <Ionicons
          name="bookmark-outline"
          size={size?size:22}
          color={color}
        />}
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    
  bookmarkBtn: {
  }
})

export default BookmarkButton;
