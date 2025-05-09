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
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import * as Haptics from "expo-haptics"


type customIconButtonProps = {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  size?: number;
};

const CustomIconButton = ({
  onPress,
  iconName,
  size,
}: customIconButtonProps) => {
  return (
    <TouchableOpacity
    onPress={()=>{Haptics.impactAsync();onPress()}}
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
