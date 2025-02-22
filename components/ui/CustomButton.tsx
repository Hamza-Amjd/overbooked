import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics"


type customButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  isValid?: boolean;
  isLoading?: boolean;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  style?:any;
  height?: number;
};

const CustomButton = ({
  onPress,
  isValid=true,
  isLoading,
  title,
  icon,
  height,
  style,
  ...rest
}: customButtonProps) => {
  return (
    <TouchableOpacity
      disabled={!isValid}
      onPress={()=>{Haptics.impactAsync();onPress()}}
      style={[
        styles.registerBtn,
        isValid && { backgroundColor: Colors.primary },
        { height: height?height:45 },
        style
      ]}
      {...rest}
    >
      {icon?<Ionicons name={icon } size={20} color={'#fff'}/>:null}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: "white",
        }}
      >
        {isLoading ? <ActivityIndicator /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  registerBtn: {
    borderRadius: 16,
    backgroundColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row',
    gap:10,
    elevation:5
  },
});
