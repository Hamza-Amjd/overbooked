import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";
import { useAuthStore } from "@/services/authStore";
import CustomText from "@/components/ui/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profile = () => {
  const { user, logout } = useAuthStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        {user?.picture ? (
          <Image source={{ uri: user?.picture }} style={styles.image} />
        ):(
          <Image source={require('@/assets/images/default_user.jpg')} style={styles.image} />
        )}
        <CustomText fontFamily="Bold" variant="h4">
          {user?.username}
        </CustomText>
        <CustomText fontFamily="Regular" variant="h6">
          {user?.email}
        </CustomText>
      </View>
      <CustomButton
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem('access_token');
          logout();
          router.replace("/(auth)");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingTop: 50,
  },
  image: { 
    height: 100,
    width: 100,
    borderRadius: 100
   },
});

export default profile;
