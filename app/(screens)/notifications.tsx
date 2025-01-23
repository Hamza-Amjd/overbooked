import { RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import CustomText from "@/components/ui/CustomText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { fetchUserNotifications } from "@/services/api/notificationService";
import { useAuthStore } from "@/services/authStore";
import { useNotificationStore } from "@/services/notificationStore";
import { FlatList } from "react-native-gesture-handler";
import CustomIconButton from "@/components/ui/CustomIconButton";

const Page = () => {
  const [refreshing, setRefreshing] = useState(false)
  const {notifications}=useNotificationStore();
  const {user}=useAuthStore()

  useEffect(() => {
    fetchUserNotifications()
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
      <FlatList
         data={notifications}
         showsVerticalScrollIndicator={false}
         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchUserNotifications()} />}
         renderItem={({ item }) => 
           <View style={styles.notificationContainer}>
             <CustomText variant="h6" fontFamily="Medium">{item.type.replace("_"," ")}</CustomText>
             <CustomText >{item.message}</CustomText>
             <View style={styles.iconContainer}>
               <Ionicons name="calendar-outline" size={RFValue(20)} color="#707070" />
               <CustomText  style={{ marginLeft: 5 }}>{new Date(item.createdAt).toLocaleString()}</CustomText>
             </View>
           </View>}
         keyExtractor={(item) => item._id}
         contentContainerStyle={{ padding: 10,rowGap: 5 }}
      />
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
  notificationContainer: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
