import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@/services/authStore'

const books = [
  { id: '1', title: 'Book One', author: 'Author One', image: 'https://example.com/book1.jpg' },
  { id: '2', title: 'Book Two', author: 'Author Two', image: 'https://example.com/book2.jpg' },
  // ... add more books as needed ...
]

const renderItem = ({ item }:any) => (
  <TouchableOpacity style={styles.bookItem}>
    <View style={styles.bookImage} >

    <Ionicons name='book' size={80} />
    </View>
    <Text style={styles.bookTitle}>{item.title}</Text>
    <Text style={styles.bookAuthor}>{item.author}</Text>
  </TouchableOpacity>
)

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingBottom: 20,
  },
  bookItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  bookImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    alignItems:'center',
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
})