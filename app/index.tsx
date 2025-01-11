import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { router,Link } from 'expo-router'
import { Colors } from '@/constants/Colors'

const index = () => {
    useEffect(() => {
        setTimeout(() => {
            router.replace('/(screens)/onboarding')
        }, 3000);
    }, [])
     
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