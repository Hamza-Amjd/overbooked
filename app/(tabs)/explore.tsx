import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const explore = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar]}>
        <TextInput
          style={styles.input}
          placeholder="looking for something?"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <View style={styles.iconContainer}>
          <Ionicons name="search" size={RFValue(20)} color={"grey"} />
        </View>
      </View>
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
  searchBar: {
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 30,
    fontSize: 18,
    paddingHorizontal: 10,
    width: "90%",
  },
  iconContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(170,170,170,0.7)",
    padding: 6
  },
});
