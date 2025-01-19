import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomSafeAreaView = ({children,style}:{children:React.ReactNode,style?:any}) => {
  return (
    <SafeAreaView style={[styles.container,style]}>
      {children}
    </SafeAreaView>
  )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS=="android"?StatusBar.currentHeight:0,
    }
})