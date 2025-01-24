import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuthStore } from "@/services/authStore";
import CustomText from "@/components/ui/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useBookStore } from "@/services/bookStore";
import useWishListStore from "@/services/wishlistStore";
import { useNotificationStore } from "@/services/notificationStore";
import NotificationButton from "@/components/home/NotificationButton";

const profile = () => {
  const { user, logout } = useAuthStore();
  const { clearBooks } = useBookStore();
  const { clearWishlist } = useWishListStore();
  const { clearNotifications } = useNotificationStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => {
          clearBooks();
          clearWishlist();
          clearNotifications();
          AsyncStorage.removeItem("accessToken");
          logout();
          router.replace("/(auth)");
        }, },
      ],
      { cancelable: true }
    );
  };

  const menu = [
    {
      name: "Wishlist",
      action: () => router.push("/(screens)/wishlist"),
      icon: <Ionicons name={"bookmark"} size={24} color="#36382E" />,
    },
    {
      name: "Notifications",
      action: () => router.push("/(screens)/notifications"),
      icon: <NotificationButton icon={<Ionicons name={"notifications"} size={24} color="#36382E"/>}/> ,
    },
    {
      name: "Request for new book",
      action: () => router.push("/(screens)/requestbook"),
      icon: <MaterialCommunityIcons name={"book-plus"} size={24} color="#36382E" />,
    },
    {
      name: "Privacy Policy",
      action: async() => await WebBrowser.openBrowserAsync("https://www.google.com"),
      icon: <Ionicons name={"shield-checkmark"} size={24} color="#36382E" />,
    },
    { name: "Logout", action: handleLogout, icon: <Ionicons name={"log-out"} size={24} color="#36382E" /> },
    // Add more buttons here as needed
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        {user?.picture ? (
          <Image source={{ uri: user?.picture }} style={styles.image} />
        ) : (
          <Image
            source={require("@/assets/images/default_user.jpg")}
            style={styles.image}
          />
        )}
        <CustomText fontFamily="Bold" variant="h4">
          {user?.username}
        </CustomText>
        <CustomText fontFamily="Regular" variant="h6">
          {user?.email}
        </CustomText>
      </View>
      {menu.map((button, index) => (
        <TouchableOpacity
          key={index}
          onPress={button.action}
          style={styles.button}
        >
          {button.icon}
          <CustomText fontFamily="Medium" variant="h6">
            {button.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 12,
    backgroundColor: Colors.background,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingTop: 50,
    paddingBottom: 80,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  button: {
    backgroundColor: "#f2f4f4",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    gap: 10,
    marginBottom: 10,
  },
});

export default profile;
