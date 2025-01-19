import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import { categoriesData } from '@/utils/healper';

const Categories = ({onChange}:{onChange:(item:string)=>void}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const renderItem = ({ item }:any) => (
    <TouchableOpacity 
        key={item}
      style={[styles.categoryItem, selectedCategory === item && styles.selectedCategory]} 
      onPress={() => {setSelectedCategory(item);onChange(item)}}
    >
      <Text style={[styles.categoryText, selectedCategory === item && {color:'#fff'}]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={categoriesData}
        renderItem={renderItem}
        keyExtractor={(item,index) => `${item+index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft:10}}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  categoryItem: {
    padding: 10,
    paddingHorizontal:20,
    margin: 3,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: '#000',
  },
})