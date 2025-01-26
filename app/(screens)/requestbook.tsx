import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
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
      <KeyboardAvoidingView behavior="position">
      <Header title="Request book" />
        <Image source={require('@/assets/images/book.jpg')} style={styles.logo}/>
      <CustomText fontFamily="Medium" variant="h5" style={styles.logotext}>
          Request any book and we'll make it available for you
        </CustomText>
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
    width: 220,
    height: 220,
    borderRadius: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 60,
  },
  logotext: { textAlign: "center",paddingBottom:20},
});
