import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useBookStore } from "@/services/bookStore";
import { FlatList } from "react-native";
import SearchTile from "@/components/ui/SearchTile";

const explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const { books } = useBookStore();  

  useEffect(() => {
    // Filter myBooks based on searchValue
    if(searchValue.length==0){setSearchData([])}else{const filteredBooks = books.filter(book => 
      book.bookName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchData(filteredBooks);}
  }, [searchValue]); 

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar]}>
        <TextInput
          style={styles.input}
          placeholder="looking for something?"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <View style={styles.iconContainer}>
          <Ionicons name="search" size={RFValue(20)} color={"grey"} />
        </View>
      </View>
      <FlatList
        data={searchData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SearchTile item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{}}
      />
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
  searchBar: {
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 30,
    fontSize: 18,
    paddingHorizontal: 10,
    width: "90%",
  },
  iconContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(170,170,170,0.7)",
    padding: 6
  },
});
