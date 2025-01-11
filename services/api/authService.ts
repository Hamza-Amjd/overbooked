import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React from "react";

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
      console.log(res);
      // const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
      //   id_token: res.data?.idToken,
      // });
      // setUser(user);
      // router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error.response.status);
      if (error.response.status == 400) {
        router.push("/(auth)/register");
      }
    }
  }
  
export const signUpWithGoogle = async (data: any) => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const res = await GoogleSignin.signIn();
    //   const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
    //     id_token: res.data?.idToken,
    //     ...data,
    //   });
    //   const { tokens, user } = apiRes.data;
      router.push("/(tabs)");
    } catch (error: any) {
      console.log("SignUP Error", error.response.status);
    }
  };