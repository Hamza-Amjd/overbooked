import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { router,Link } from 'expo-router'
import { Colors } from '@/constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resetAndNavigate } from '@/utils/LibraryHelpers'

const index = () => {
  const tokenCheck = async () => {
        const isFirstStart = await AsyncStorage.getItem('isFirstStart');
        if (isFirstStart == null) {
          resetAndNavigate('/(screens)/onboarding');
          return false;
        }
        const accessToken = await AsyncStorage.getItem("accessToken") as string;
        if (accessToken) {   
          resetAndNavigate("/(tabs)");
          return true;
        }
        resetAndNavigate("/(auth)");
        return false;
  };
  useEffect(() => {
    const timeoutId=setTimeout(tokenCheck, 1000);
    return () => clearTimeout(timeoutId); 
  }, []);
     
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} size={"large"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default index