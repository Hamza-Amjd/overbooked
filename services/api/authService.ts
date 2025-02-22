import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { router } from "expo-router";
import { BASE_URL } from "../config";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../authStore";

GoogleSignin.configure({
    webClientId:"21860561742-noeidijnne7jpffh3jsti8vuedjmvs9q.apps.googleusercontent.com",
    forceCodeForRefreshToken: true,
    offlineAccess: false,
    iosClientId: "",
  });
  

  export const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const res = await GoogleSignin.signIn();
      const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
        id_token: res.data?.idToken,
      });
      const { access_token, user } = apiRes.data;
      await AsyncStorage.setItem("accessToken", "true");
      const { setUser } = useAuthStore.getState();
      setUser(user);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
    }
  }

  export const signInWithCredentials =async (values:any) => {
    try {
      const res=await axios.post(`${BASE_URL}/login`,{email:values.email,password:values.password})
      if (res.status === 200) {
        const { access_token, user } = res.data;
        await AsyncStorage.setItem("accessToken", "user");
        const { setUser } = useAuthStore.getState();
        setUser(user);
        router.replace('/(tabs)');
      } else {
        Alert.alert("Login failed","Please try again")
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login failed","Please try again")
    }
  };

  export const signUpWithCredentials =async (values:any) => {
    try {
      const res=await axios.post(`${BASE_URL}/register`,values);
      if (res.status === 201) {
        const { access_token, user } = res.data;
        await AsyncStorage.setItem("accessToken", "user");
        const { setUser } = useAuthStore.getState();
        setUser(user);
        router.replace('/(tabs)');
      } else {
        Alert.alert("Login failed","Please try again")
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login failed","Please try again")
    }
  };