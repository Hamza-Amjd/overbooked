import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="wishlist" />
        <Stack.Screen name="mybooks" />
        <Stack.Screen name="readbook" />
        <Stack.Screen name="bookdetails" />
      </Stack>
  )
}

export default _layout;
