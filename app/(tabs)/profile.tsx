import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/ui/CustomButton'
import { router } from 'expo-router'

const profile = () => {
  return (
    <View style={styles.container}>
      <CustomButton title='Logout' onPress={()=>router.replace('/(screens)/onboarding')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default profile