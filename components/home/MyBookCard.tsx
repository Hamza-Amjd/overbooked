import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import CustomText from "../ui/CustomText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { screenWidth } from "@/constants/Sizes";
import { useBookStore } from "@/services/bookStore";
import CustomButton from "../ui/CustomButton";
import { returnBookService } from "@/services/api/bookService";
import { useAuthStore } from "@/services/authStore";
import * as Haptics from "expo-haptics";

const width = screenWidth - 52;
const MyBookCard = ({ item, style }: any) => {
  const { myBooksProgress } = useBookStore();
  const { user } = useAuthStore();

  const [progress, setProgress] = React.useState(0);
  const [currPage, setCurrPage] = React.useState(0);

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    const bookprogress = myBooksProgress.find(
      (b: any) => b.id === item.bookDetails.bookName && b
    );
    setCurrPage(bookprogress?.page ? bookprogress.page : 1);
    if (bookprogress?.page && bookprogress?.numberOfPages)
      setProgress(bookprogress.page / bookprogress.numberOfPages);
  });

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: width * progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handleReturnBook = () => {
    Alert.alert("Return Book", "Are you sure you want to return this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Return",
        onPress: () => returnBookService(user?._id, item.bookID),
        style: "default",
      },
    ]);
  };

  const handlePress = () => {
    router.navigate({
      pathname: "/(screens)/readbook",
      params: item.bookDetails,
    });
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.cardContainer, style]}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: item.bookDetails.cover }}
          style={styles.bookImage}
        />
        <View style={{ paddingLeft: 15 }}>
          <CustomText fontFamily="Medium" variant="h5">
            {item.bookDetails.bookName}
          </CustomText>
          <CustomText variant="h6">
            Author : {item.bookDetails.author}
          </CustomText>
          <CustomText variant="h6">{item.bookDetails.category}</CustomText>
          <CustomText variant="h6">Current page : {currPage}</CustomText>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" color={Colors.primary} size={RFValue(20)} />
            <CustomText fontFamily="Medium" variant="h6">
              {parseInt(item.bookDetails.rating).toFixed(1)}
            </CustomText>
          </View>
          <TouchableOpacity onPress={handleReturnBook} style={styles.returnBtn}>
            <Ionicons name="arrow-undo" size={RFValue(14)} />
            <CustomText fontFamily="Medium">ReturnBook</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Animated.View
          style={[
            styles.sliderBG,
            {
              backgroundColor: Colors.primary,
              width: animatedWidth,
              zIndex: 10,
            },
          ]}
        />
        <View style={styles.sliderBG} />
      </View>
      <Text style={styles.progressText}>{(progress * 100).toFixed(0)}%</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  returnBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    gap: 3,
  },
  sliderBG: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "lightgrey",
    position: "absolute",
    bottom: 1,
  },
  progressText: {
    position: "absolute",
    bottom: 30,
    right: 15,
    textAlign: "right",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 5,
  },
  bookImage: {
    width: "35%", 
    height: 180,
    resizeMode: "cover", // Keep the aspect ratio while resizing the image
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default MyBookCard;
