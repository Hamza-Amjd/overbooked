import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useRef } from 'react';
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import CustomText from "../ui/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { screenWidth } from "@/constants/Sizes";

const width=screenWidth-52
const MyBookCard = ({item,style}:any) => {
  const [progress, setProgress] = React.useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(item.page && item.numberOfPages)setProgress((item.page/item.numberOfPages));
  }, [item.page,item.numberOfPages]);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: width*progress,
      duration: 300, 
      useNativeDriver: false,
    }).start();
  }, [progress])

  const handlePress = () => {
    router.navigate({pathname:'/(screens)/readbook',params:item.bookDetails})
  }
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.cardContainer,style]}>
      <View style={{flexDirection:'row'}}> 
      <Image source={{ uri: item.bookDetails.cover }} style={styles.bookImage} />
      <View style={{paddingLeft:15}}>
      <CustomText fontFamily="Medium" variant="h5">{item.bookName}</CustomText>
      <CustomText  variant="h6">
        Author : {item.bookDetails.author}
      </CustomText>
      <CustomText variant="h6">
        {item.bookDetails.category}
      </CustomText>
      <CustomText >
        Current Page: {item.page?item.page:1}
      </CustomText>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" color={Colors.primary} size={RFValue(20)} />
          <CustomText fontFamily="Medium" variant="h6">{parseInt(item.bookDetails.rating).toFixed(1)}</CustomText>
        </View>
      </View>
      </View>
      <View>
        <Animated.View
          style={[
            styles.sliderBG,
            { backgroundColor: Colors.primary, width: animatedWidth, zIndex: 10 },
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
  sliderBG: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "lightgrey",
    position: "absolute",
    bottom:1
  },
  progressText: {
    position: "absolute",
    bottom: 30,
    right: 15,
    textAlign: "right",
    fontSize: 16,
  },
  ratingContainer:{
    flexDirection:'row',
    gap:5
  },
  bookImage: {
    width: "35%", // Full width of the card
    height: 180,
    resizeMode: "cover", // Keep the aspect ratio while resizing the image
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20
  },
});

export default MyBookCard;
