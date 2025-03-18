import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import CustomText from "../ui/CustomText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import BookmarkButton from "../books/BookmarkButton";

const { width } = Dimensions.get("window"); // Get the screen width

const BookCard = ({ item,style }: any) => {
  return (
    <TouchableOpacity style={[styles.bookItem,style]} onPress={()=>router.navigate({pathname:'/(screens)/bookdetails',params:item})}>
      <View style={styles.bookmarkBtn}>

      <BookmarkButton item={item}/>
      </View>
      <View style={styles.bookImage}>
        <Image source={{ uri: item.cover }} style={styles.bookImage} onError={(err)=>console.log(err)}/>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" color={Colors.primary} size={RFValue(15)} />
          <CustomText fontFamily="Medium">{parseInt(item.rating).toFixed(1)}</CustomText>
        </View>
      </View>

      <CustomText fontFamily="Medium">{item.bookName}</CustomText>
      <CustomText fontFamily="Regular" style={{}}>
        {item.author}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    width: width * 0.4,
  },
  bookImage: {
    width: "100%", // Full width of the card
    height: 230,
    resizeMode: "cover", // Keep the aspect ratio while resizing the image
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 5,
    borderTopLeftRadius: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  
  bookmarkBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    zIndex: 100, // Make sure it's above the image
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default BookCard;
