import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Pdf from "react-native-pdf";
import { useBookStore } from "@/services/bookStore";
import * as WebBrowser from 'expo-web-browser'
import CustomSafeAreaView from "@/components/ui/CustomSafeAreaView";
import { BASE_URL } from "@/services/config";

const bookdetails = () => {
  const route = useRoute();
  const Pdfref=useRef<Pdf>();
  const {myBooksProgress,addToMyBooksProgress,updateMybookProgress}=useBookStore()
  const [page, setpage] = useState(1)
  const [numOfPages,setNumofPages] = useState(1)
  const item:any = route.params;

  useEffect(() => {
    const bookprogress=myBooksProgress.find((b: any) => b.id === item.bookName && b)
    setpage(bookprogress?.page?bookprogress.page:1)
    setNumofPages(bookprogress?.numberOfPages?bookprogress.numberOfPages:1)
  }, []);

  return (
    <CustomSafeAreaView style={{flex:1}}>
      <Pdf
        //@ts-ignore
        ref={Pdfref}
        source={{uri:`${BASE_URL+item.pdf}`,cache:true}}
        trustAllCerts={false}
        page={page}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log("book loaded");
        }}
        onPageChanged={(page, numberOfPages) => {
          if(numOfPages==1){
            addToMyBooksProgress(item.bookName,numberOfPages)
            setNumofPages(numberOfPages)
          }
          updateMybookProgress(item.bookName,page)
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
