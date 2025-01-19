import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import BookCard from '@/components/home/BookCard'
import Header from '@/components/ui/Header'
import useWishListStore from '@/services/wishlistStore'
import CustomText from '@/components/ui/CustomText'
import EmptyList from '@/components/books/EmptyList'

const wishlist = () => {
    const {wishlist}=useWishListStore();
  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header title='Wishlist'/>
        {wishlist.length == 0 ? (
        <EmptyList/>
      ) : <FlatList
        data={wishlist}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookCard style={{marginHorizontal:10}} item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{paddingHorizontal:15, rowGap:10,}}
        numColumns={2}
      />}
    </SafeAreaView>
  )
}
wishlist
export default wishlist

const styles = StyleSheet.create({})