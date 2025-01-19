import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fetchAllBooks } from "@/services/api/bookService";
import { useBookStore } from "@/services/bookStore";
import CustomText from "@/components/ui/CustomText";
import HomeHeader from "@/components/home/HomeHeader";
import BookCard from "@/components/home/BookCard";
import Categories from "@/components/home/Categories";
import MyBookCard from "@/components/home/MyBookCard";
import CustomSafeAreaView from "@/components/ui/CustomSafeAreaView";
import { screenWidth } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import MyBooksCarousel from "@/components/home/MyBooksCarousel";

const home = () => {
  const ListRef = useRef<any>();
  const { books, myBooks } = useBookStore();
  const [data, setData] = useState(books);
  const [newBooks, setNewBooks] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchAllBooks().then((res)=>{setData(res);setNewBooks(res.slice(4,res.length))}).finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (category: any) => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    if (category == "All") {
      setData(books);
    } else {
      setData(books.filter((book) => book.category === category));
    }
  };
  return (
    <CustomSafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAllBooks} />
        }
      >
        {<View style={styles.padding}>
          <CustomText fontFamily="Bold" variant="h1" >
            Welcome to OverBooked
          </CustomText>
          <CustomText fontFamily="Regular" variant="h6">
            Discover and read books
          </CustomText>
        </View>}
          {myBooks.length>0 &&<MyBooksCarousel/>}
        <Categories onChange={handleCategoryChange} />
        <FlatList
          ref={ListRef}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <BookCard item={item} />}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              {loading ? (
                <ActivityIndicator size={"large"} />
              ) : (
                <CustomText fontFamily="Medium" variant="h6">
                  Nothing Found
                </CustomText>
              )}
            </View>
          )}
          contentContainerStyle={styles.list}
        />
        
        <CustomText fontFamily="Bold" variant="h1" style={styles.padding}>For You</CustomText>
        <FlatList
        scrollEnabled={false}
        data={newBooks}
        renderItem={({ item }) => <BookCard item={item} style={{marginHorizontal:15}}/>}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.foryoulist}
      />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF3F0",
    paddingBottom: 100,
  },
  list: {
    padding: 10,
    gap: 10,
  },
  padding: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    height: 250,
    alignItems: "center",
    width: screenWidth,
    justifyContent: "center",
  },
  foryoulist:{justifyContent:'space-evenly',width:screenWidth,alignItems:'center'}
});

export default home;
