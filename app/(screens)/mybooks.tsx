import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import Header from "@/components/ui/Header";
import { useBookStore } from "@/services/bookStore";
import MyBookCard from "@/components/home/MyBookCard";
import CustomText from "@/components/ui/CustomText";
import EmptyList from "@/components/books/EmptyList";
import { fetchMyBooks } from "@/services/api/bookService";
import { useAuthStore } from "@/services/authStore";

const mybooks = () => {
  const {user}=useAuthStore()
  const { myBooks } = useBookStore();
  useEffect(() => {
    fetchMyBooks(user?.id)
     .then((res) => {
        console.log(myBooks);
      })
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="My Books" />
      {myBooks.length == 0 ? (
        <EmptyList/>
      ) : (
        <FlatList
          data={myBooks}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <MyBookCard item={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </SafeAreaView>
  );
};

export default mybooks;

const styles = StyleSheet.create({});
