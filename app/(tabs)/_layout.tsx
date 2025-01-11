import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/tabbar/HapticTab';
import TabBarBackground from '@/components/tabbar/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarHideOnKeyboard:true,
        tabBarShowLabel:false,
        tabBarStyle: Platform.select({
          // Apply a blur effect on Android to show the tab bar background
          android: {
            // Apply a blur effect on Android to show the tab bar background
            blurRadius: 10,
            tintColor: 'transparent',
            elevation:0,
            position: 'absolute',
          },
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color,focused }) => <Ionicons size={28} name={focused?"home":"home-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color,focused }) => <Ionicons size={28} name={focused?"search":"search-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color,focused }) => <Ionicons size={28} name={focused?"person-circle":"person-circle"} color={color} />,
        }}
      />
    </Tabs>
  );
}
