import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import useCartStore from '@/services/cartStore'
import BookCard from '@/components/home/BookCard'
import Header from '@/components/ui/Header'

const bookmarks = () => {
    const {wishlist}=useCartStore();
  return (
    <SafeAreaView>
        <Header title='Bookmarks'/>
        <FlatList
        data={wishlist}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookCard style={{marginHorizontal:10}} item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{paddingHorizontal:15, rowGap:10,}}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

export default bookmarks

const styles = StyleSheet.create({})