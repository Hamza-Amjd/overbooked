import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type customIconButtonProps = {
  onPress: () => void;
  iconName?:string;
  size?:number;
};

const CustomIconButton = ({
  onPress,
  iconName,
  size,
}: customIconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Ionicons name={iconName as any} size={size?size:25} color={'#fff'}/>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  registerBtn: {
    borderRadius: 16,
    backgroundColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row',
    gap:5,
    elevation:5
  },
});
