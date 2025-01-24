import {
  Alert,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/ui/Header";
import CustomText from "@/components/ui/CustomText";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import {
  clearUserNotifications,
  fetchUserNotifications,
} from "@/services/api/notificationService";
import { useNotificationStore } from "@/services/notificationStore";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

const Page = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { notifications } = useNotificationStore();

  const handleClearNotifications = () => {
    Alert.alert(
      "Mark All as read?",
      "Are you sure you want to mark all notifications as read?",
      [
        {
          text: "Yes",
          onPress: () => {
            clearUserNotifications();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={[styles.notificationContainer,{backgroundColor:item.read?"#fff":"#e7e7e7"} ]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText variant="h6" fontFamily="Medium">
            {item.type.replace("_", " ")}
          </CustomText>
          {!item.read && (
            <CustomText style={{ color: Colors.primary, right: 30 }}>
              New
            </CustomText>
          )}
        </View>
        <CustomText>{item.message}</CustomText>
        <View style={styles.iconContainer}>
          <Ionicons
            name="calendar-outline"
            size={RFValue(20)}
            color="#707070"
          />
          <CustomText style={{ marginLeft: 5 }}>
            {new Date(item.createdAt).toLocaleString()}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        headerRight={
          <TouchableOpacity onPress={() => handleClearNotifications()}>
            <FontAwesome6 name="bars-staggered" size={22} />
          </TouchableOpacity>
        }
      />
      {!notifications && (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-circle-sharp"
            size={RFValue(70)}
            color={"#36382E"}
          />
          <CustomText variant="h6" style={{ textAlign: "center" }}>
            No notifications found
          </CustomText>
        </View>
      )}
      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchUserNotifications()}
          />
        }
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 10, rowGap: 5 }}
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
    gap: 20,
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
