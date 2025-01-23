import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from './CustomText';
import { router } from 'expo-router';

const SearchTile = ({ item, style }: any) => {
  return (
    <TouchableOpacity style={[styles.searchTile, style]} onPress={()=>router.navigate({pathname:'/(screens)/bookdetails',params:item})}>
      <Image source={{uri:item.cover}} style={styles.img}/>
      <View style={styles.tileContent}>
        <CustomText fontFamily='Medium'>{item.bookName}</CustomText>
        <CustomText>{item.author}</CustomText>
      </View>
    </TouchableOpacity>
  )
}

export default SearchTile

const styles = StyleSheet.create({
  img:{
    width: 30,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
  },
  searchTile: {
    padding: 5,
    flexDirection:'row',
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
  },
  tileContent: {
    // Additional styling for content can go here
  },
  title: {
    fontFamily: "Medium",
    fontSize: RFValue(16),
  },
  author: {
    fontFamily: "Regular",
    fontSize: RFValue(14),
  },
});