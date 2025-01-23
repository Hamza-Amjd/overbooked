import {
    View,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import Carousel from "react-native-reanimated-carousel";
  import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useBookStore } from "@/services/bookStore";
import MyBookCard from "./MyBookCard";
import { screenWidth } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

  
  const Collections = () => {
    const {myBooks}=useBookStore()
    const activeIndex = useSharedValue(0);
    return (
      <View style={{alignItems:"center",justifyContent:'center',paddingBottom:10}}>
        <Carousel
          width={screenWidth-20}
          height={screenWidth/1.6}
          pagingEnabled
          data={myBooks}
          onSnapToItem={(index) => {
            activeIndex.value = index;
          }}
          renderItem={({ item }: { item: any }) => (
            <MyBookCard item={item} />
          )}
        />
        {myBooks.length>1&&<View style={styles.pagination}>
          {myBooks.map((_, index) => (
            <AnimatedDot key={index} index={index} activeIndex={activeIndex} />
          ))}
        </View>}
      </View>
    );
  };
  //@ts-ignore
  const AnimatedDot = ({ index, activeIndex }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const isActive = index === activeIndex.value;
      return {
        width: withTiming(isActive ? 12 : 8, { duration: 200, easing: Easing.linear }),
        height: withTiming(isActive ? 12 : 8, { duration: 200, easing: Easing.linear }),
        backgroundColor: isActive ? Colors.primary : 'gray',
      };
    });
  
    return <Animated.View style={[styles.paginationDot, animatedStyle]} />;
  };
  
  const styles = StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height:30
    },
    paginationDot: {
      height: 8,
      marginHorizontal: 4,
      borderRadius:20
    },
  });
  
  export default Collections;
  