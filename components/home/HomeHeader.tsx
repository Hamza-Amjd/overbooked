import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomText from "../ui/CustomText";
import { useAuthStore } from "@/services/authStore";
import NotificationButton from "./NotificationButton";

const HomeHeader = () => {
  const {user}=useAuthStore()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>router.push('/(screens)/mybooks')} >
      <Feather name="book-open" size={RFValue(20)}  color="black" />
      </TouchableOpacity>
      <NotificationButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
});

export default HomeHeader;
