import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../ui/CustomText'

const EmptyList = () => {
  return (
    <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require("@/assets/images/empty.png")}
          />
          <CustomText variant="h5" fontFamily="Medium">
            No books found
          </CustomText>
        </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})