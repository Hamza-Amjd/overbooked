import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomSafeAreaView from "@/components/ui/CustomSafeAreaView";
import Header from "@/components/ui/Header";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { requestBookService } from "@/services/api/bookService";
import { useAuthStore } from "@/services/authStore";
import { router } from "expo-router";
import CustomText from "@/components/ui/CustomText";
import { Colors } from "@/constants/Colors";

const requestbook = () => {
  const { user } = useAuthStore();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleRequestBook = async () => {
    if (name.trim() === "") {
      alert("Please enter the book name");
      return;
    }
    requestBookService(
      user?._id,
      user?.username,
      name,
      author,
      description
    ).then(() =>
      Alert.alert("Request Sent", "We will soon provide this book", [
        { text: "OK", onPress: () => router.back() },
      ])
    );
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <Header title="Request book" />
      <KeyboardAvoidingView behavior="position">
      <View style={styles.logo}>
        <CustomText fontFamily="Bold" variant="h5" style={styles.logotext}>
          Request
        </CustomText>
        <CustomText fontFamily="Bold" variant="h5" style={styles.logotext}>
          any book
        </CustomText>
        <CustomText fontFamily="Bold" variant="h5" style={styles.logotext}>
          and we'll make
        </CustomText>

        <CustomText fontFamily="Bold" variant="h5" style={styles.logotext}>
          it available
        </CustomText>
        <CustomText fontFamily="Bold" variant="h5" style={styles.logotext}>
          {" "}
          for you
        </CustomText>
      </View>
      <CustomInput
        onChangeText={(text) => setName(text)}
        label="Book Name"
        value={name}
        onPress={()=>setIsTouched(true)}
      />
      <CustomInput
        onChangeText={(text) => setAuthor(text)}
        label="Author Name"
        value={author}
      />
      <CustomInput
        onChangeText={(text) => setDescription(text)}
        label="Description"
        value={description}
        numberOfLines={1}
      />
      <CustomButton onPress={handleRequestBook} isValid={!isTouched || name.trim().length>0 || author.trim().length>0} title="Send Request" />
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default requestbook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  logo: {
    backgroundColor: Colors.primaryOpacity,
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 90,
  },
  logotext: { textAlign: "center", color: "white" },
});
