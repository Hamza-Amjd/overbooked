import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import AuthTextInput from "@/components/auth/AuthTextInput";
import CustomButton from "@/components/ui/CustomButton";
import Header from "@/components/ui/Header";
import CustomText from "@/components/ui/CustomText";
import { signUpWithCredentials } from "@/services/api/authService";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Please enter your first name"),
  last_name: Yup.string().required("Please enter your last_name"),
  username: Yup.string().required("Please enter a unique username"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Required"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password ? field.required("Required").oneOf([Yup.ref("password")],"Password did'nt match") : field
  ),
});

export default function RegisterationScreen() {

  const [loading, setLoading] = useState(false);
  const [obsecurePass, setobsecurePass] = useState(true);
  const [obsecureCpass, setobsecureCpass] = useState(true);


  return (
    <SafeAreaView style={{ flex: 1,paddingTop:40 }}>
      <Header />
      <View style={{paddingTop:30,alignItems:'center',justifyContent:'center'}}>
       
      <View style={styles.info}>
        <View style={styles.logoRow}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <CustomText style={{fontWeight:'800'}} variant="h3"  > OverBooked</CustomText>
        </View>
        <CustomText variant="h5" >Create a new account</CustomText>
      </View>
      
    <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => signUpWithCredentials(values)}
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
            <View style={{flexDirection:"row",width:'100%',gap:5}}>
              <AuthTextInput handleChange={handleChange} iconName={'account'} setFieldTouched={setFieldTouched} title="first_name" touched={touched.first_name} value={values.first_name} isPassword={false}  error={errors.first_name} autoCapitalize={"words"} placeholder="Enter first name" style={{flex:1}}/>
              <AuthTextInput handleChange={handleChange} setFieldTouched={setFieldTouched} title="last_name" touched={touched.last_name} value={values.last_name} isPassword={false}  error={errors.last_name} autoCapitalize={"words"} placeholder="Enter last name" style={{flex:1}}/>
            </View>
            <AuthTextInput handleChange={handleChange} iconName={'account'} setFieldTouched={setFieldTouched} title="username" touched={touched.username} value={values.username} isPassword={false}  error={errors.username} autoCapitalize={"words"} placeholder="Enter a valid username"/>
            <AuthTextInput handleChange={handleChange} iconName={'email'} setFieldTouched={setFieldTouched} title="email" touched={touched.email} value={values.email} isPassword={false} error={errors.email}/>
            <AuthTextInput handleChange={handleChange} iconName={'form-textbox-password'} setFieldTouched={setFieldTouched} title="password" touched={touched.password} value={values.password} isPassword={true} obsecurePass={obsecurePass} setobsecurePass={setobsecurePass} error={errors.password}/>
            <AuthTextInput handleChange={handleChange} iconName={'form-textbox-password'} setFieldTouched={setFieldTouched} title="confirmPassword" touched={touched.confirmPassword} value={values.confirmPassword} isPassword={true} obsecurePass={obsecureCpass} setobsecurePass={setobsecureCpass} error={errors.confirmPassword} placeholder="Confirm password"/>
            <CustomButton isValid={isValid} isLoading={loading} onPress={handleSubmit} title={"S I G N   U P"} height={50}/>
            <TouchableOpacity onPress={() => router.back()}>
              <Text
                style={{ textAlign: "center", marginTop: 15 }}
              >
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  info: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
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
});
