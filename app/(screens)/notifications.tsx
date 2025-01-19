import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import CustomText from "@/components/ui/CustomText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { fetchUserNotifications } from "@/services/api/notificationService";
import { useAuthStore } from "@/services/authStore";

const Page = () => {
  const [notifications, setNotifications] = useState();
  const {user}=useAuthStore()

  useEffect(() => {
    fetchUserNotifications(user?.id)
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" />
      {!notifications && (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-circle-sharp" size={RFValue(70)} color={'#36382E'}/>
          <CustomText variant="h6" style={{textAlign:'center'}}>No notifications found</CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap:20
  },
});
