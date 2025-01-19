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

type customButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  isValid?: boolean;
  isLoading?: boolean;
  title: string;
  icon?:any;
  height?: number;
};

const CustomButton = ({
  onPress,
  isValid=true,
  isLoading,
  title,
  icon,
  height,
  ...rest
}: customButtonProps) => {
  return (
    <TouchableOpacity
      disabled={!isValid}
      onPress={onPress}
      style={[
        styles.registerBtn,
        isValid && { backgroundColor: Colors.primary },
        { height: height?height:45 },
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
