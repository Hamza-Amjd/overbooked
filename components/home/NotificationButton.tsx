import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomText from "../ui/CustomText";
import { useNotificationStore } from "@/services/notificationStore";
import { Colors } from "@/constants/Colors";

const NotificationButton = ({icon}:any) => {
    const { unreadCount } = useNotificationStore();
  return (
      <TouchableOpacity onPress={()=>router.push('/(screens)/notifications')}>
        {icon?icon:<Feather name="bell" size={RFValue(22)} />}
      {unreadCount>0 && <View style={styles.countContainer}>
        <CustomText style={styles.countText}>{unreadCount}</CustomText>
      </View>}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countContainer:{
    width:20,height:20,
    borderRadius:20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -7,
    right: -7,

  },
  countText: {
    color:"#fff"
  }
});

export default NotificationButton;
