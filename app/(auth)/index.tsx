import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import { router} from "expo-router";
import AuthTextInput from "@/components/auth/AuthTextInput";
import CustomButton from "@/components/ui/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "@/components/ui/CustomText";
import Header from "@/components/ui/Header";
import { signInWithGoogle } from "@/services/api/authService";
import { StatusBar } from "expo-status-bar";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Required"),
});


export default function index() {
  const [isLoading, setIsLoading] = useState(false);
  const [obsecurePass, setobsecurePass] = useState(true);
  

  useEffect(() => {
    const checkFirstStart = async () => {
    try {
      const isFirstStart = await AsyncStorage.getItem('isFirstStart');
      if (isFirstStart === null) {
        // First time opening app
        await AsyncStorage.setItem('isFirstStart', 'false');
        router.replace('/onboarding');
      }
    } catch (error) {
      console.error('Error checking first start:', error);
    }
  };
  checkFirstStart();
  }, []);

  const handleLogin =async (values: any) => {
    try {
      const response = await fetch('http://192.168.0.109:5000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(data)
      } else {
        Alert.alert("Login failed","Please try again")
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login failed","Please try again")
    }
    // router.replace('/(tabs)')
  };


  return (
    <ImageBackground source={require('@/assets/images/onboarding/background.png')} style={{flex:1}}>
      <StatusBar translucent backgroundColor="transparent"/>
      <View style={styles.container}>
      <Header onBackPress={() => router.replace("/(tabs)")} color="#fff"/>
      <View style={styles.info}>
        <View style={styles.logoRow}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <CustomText style={{fontWeight:'800',color:'#fff'}} variant="h3" > OverBooked</CustomText>
        </View>
        <CustomText style={styles.text} variant="h5" >Log in to your account</CustomText>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          touched,
          setFieldTouched,
          errors,
          isValid,
        }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <AuthTextInput
              handleChange={handleChange}
              iconName={"email"}
              setFieldTouched={setFieldTouched}
              title="email"
              touched={touched.email}
              autoComplete={"email"}
              value={values.email}
              isPassword={false}
              error={errors.email}
            />
            <AuthTextInput
              handleChange={handleChange}
              iconName={"form-textbox-password"}
              setFieldTouched={setFieldTouched}
              title="password"
              touched={touched.password}
              autoComplete={"password"}
              value={values.password}
              isPassword={true}
              obsecurePass={obsecurePass}
              setobsecurePass={setobsecurePass}
              error={errors.password}
            />
            <CustomButton
              isLoading={isLoading}
              isValid={isValid}
              onPress={handleSubmit}
              title="S I G N   I N"
              height={50}
            />
            <TouchableOpacity
              onPress={()=>{signInWithGoogle()}}
              style={styles.googleBtn}
            >
              <Image
                source={require("@/assets/images/google.png")}
                style={{ height: 25, width: 25 }}
              />
              <Text
                style={styles.btnTxt}
              >
                Sign In with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <CustomText
                style={{ textAlign: "center", marginTop: 15,color: "white"}}
              >
                Don't have an account? Sign up
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor:'rgba(0,0,0,0.6)'
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 70,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  text:{
    color:'#fff'
  },
  btnTxt:{
    fontWeight: "700",
    fontSize: 16,
    color: Colors.primary,
  },
  googleBtn: {
    height: 50,
    borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    gap:5
  },
  link:{
    marginBottom: 10,
    color:"blue",
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign: "right",
    paddingRight:5
  }
});
