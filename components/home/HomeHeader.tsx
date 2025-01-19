import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome6 name="bars-staggered" size={RFValue(20)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/(screens)/notifications')}>
        <Feather name="bell" size={RFValue(22)} />
      </TouchableOpacity>
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
