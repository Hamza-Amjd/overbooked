import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"  />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(screens)" />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
