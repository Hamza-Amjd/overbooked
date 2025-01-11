import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import CustomText from "./CustomText";

const Header = ({
  title,
  color,
  headerRight,
  onBackPress=()=>router.back(),
  showBackButton=true,
  style
}: {
  title?: string;
  color?: string;
  headerRight?: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: ()=>void;
  style?:any;
}) => {
  return (
    <View style={[styles.bar,style]}>
      <View style={{ flexDirection: "row", gap: 15 ,alignItems:'center'}}>
        {showBackButton && <TouchableOpacity
          onPress={onBackPress}
        >
          <Ionicons name="arrow-back" size={30} color={color?color:Colors.text}/>
        </TouchableOpacity>}
        {title && <CustomText variant="h5" style={[styles.title,{color:color?color:Colors.text}]}>{title}</CustomText>}
      </View>
      {headerRight && headerRight}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  bar: {
    padding: 12,
    paddingTop:10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    lineHeight:28,
    fontWeight: "bold",
    textTransform:"capitalize"
  },
});
