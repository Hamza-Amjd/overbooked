import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import Pdf from "react-native-pdf";
import { useBookStore } from "@/services/bookStore";
import * as WebBrowser from 'expo-web-browser'
import CustomSafeAreaView from "@/components/ui/CustomSafeAreaView";
import { BASE_URL } from "@/services/config";

const bookdetails = () => {
  const route = useRoute();
  const {addToMyBooks,updateMybookProgress}=useBookStore()
  const item:any = route.params;  
  
  return (
    <CustomSafeAreaView style={{flex:1}}>
      <Pdf
        source={{uri:`${BASE_URL+item?.pdf}`,cache:true}}
        trustAllCerts={false}
        page={item.page?parseInt(item.page):0}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log("book loaded");
        }}
        onPageChanged={(page, numberOfPages) => {
          updateMybookProgress(item._id,page,numberOfPages);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          WebBrowser.openBrowserAsync(uri)
        }}
        renderActivityIndicator={()=><ActivityIndicator size={'large'}/>}
        style={styles.pdf}
      />
    </CustomSafeAreaView>
  );
};
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default bookdetails;
