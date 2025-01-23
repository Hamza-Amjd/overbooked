import { StyleSheet, Text, View, Animated, Image, Alert, Share} from 'react-native'
import React, { useEffect, useRef } from 'react'
import CustomText from '@/components/ui/CustomText';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { useRoute } from '@react-navigation/native';
import CustomIconButton from '@/components/ui/CustomIconButton';
import { router } from 'expo-router';
import BookmarkButton from '@/components/books/BookmarkButton';
import CustomButton from '@/components/ui/CustomButton';
import { BlurView } from 'expo-blur';
import { useBookStore } from '@/services/bookStore';
import { AntDesign } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/services/authStore';
import { BASE_URL } from '@/services/config';
import * as Linking from "expo-linking";

const bookdetails = () => {
  const route=useRoute()
  const item:any=route.params;
  const {myBooks}=useBookStore()
  const {user}=useAuthStore()
  const isMyBook=myBooks.some((book)=>book.bookID== item._id);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity of 0
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to full opacity
      duration: 1000, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleRequestBook=async()=>{
      try {
        const response = await fetch(`${BASE_URL}/library/requestBook/${item._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: user?.id
          })
        });
  
        const data = await response.json();
        if (!response.ok) {
          console.log(data.error || 'Failed to request book');
          Alert.alert(
            'Already Requested',
            'Please wait till your request is proceed',
            [{text: 'OK'}]
          )
        }else{
          Alert.alert(
      'Book Requested',
      'Please wait till your request is proceed',
      [{text: 'OK'}]
    )
        }
        
      } catch (error) {
        console.error('Error requesting book:', error);
      }
  }

  const handleShare = async () => {
    const redirectUrl=Linking.createURL('/(tabs)/', { scheme: "overbooked" });
    try {
      await Share.share({
        // message: `Check out this book: ${item.bookName} by ${item.author}`,
        message: redirectUrl,
      });
    } catch (error) {
      console.error('Error sharing book:', error);
    }
  }
  
  return (
    <View style={{flex:1}}>
      <View style={styles.header}>
        <CustomIconButton onPress={()=>router.back()} iconName='arrow-back'/>
          <View style={{flexDirection:'row',gap:20}}>
        <CustomIconButton onPress={handleShare} iconName='share-social'/>
      <BookmarkButton item={item} size={25} color={"white"}/>
          </View>
      </View>
    <ParallaxScrollView headerImage={
      <View style={{ width: "100%", height: 300 }}>
        <Image 
          source={{ uri: item?.cover }} 
          style={{ width: "100%", height: 300 }} 
        />
        <BlurView tint='dark' intensity={60}  style={StyleSheet.absoluteFill} />
      </View>
    }>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <Image source={{uri:item?.cover}} style={styles.img}/>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <CustomText fontFamily='Bold' variant='h2' >{item.bookName}</CustomText>
      <View style={styles.ratingContainer}>
          <AntDesign name="star" color={Colors.primary} size={RFValue(20)} />
          <CustomText fontFamily="Medium" variant="h6">{parseInt(item.rating).toFixed(1)}</CustomText>
        </View>
      </View>
      <CustomText  fontFamily='Medium' variant='h3'>{item.author} ({item.category})</CustomText>

      <CustomText style={{textAlign:'justify'}}>{item.description??"This gripping tale follows a group of strangers who find themselves trapped together in an isolated location after a mysterious event. As tensions rise and suspicions grow, they must navigate their own personal demons while trying to unravel the enigma of what brought them there. With each chapter, the story unravels a web of secrets, lies, and psychological twists, pushing the characters to their limits. Themes of survival, trust, and betrayal are explored, leaving readers questioning the nature of the human spirit."}</CustomText>
    </Animated.View>
    <View style={styles.container}>
      {isMyBook && <CustomText style={{color:Colors.success,textAlign:'center'}}>You Already own this book tap to read</CustomText>}
      <CustomButton icon={"book"}  title={isMyBook?"Read Book":"Request Book"} onPress={()=>{isMyBook?router.navigate({pathname:"/(screens)/readbook",params:item}):handleRequestBook()}} />
    </View>
    </ParallaxScrollView>
    </View>
    
    
  )
}

export default bookdetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top:-140
  },
  header: {
    position:'absolute',top:0,right:0,left:0,flexDirection:'row',padding:12,paddingTop:45,backgroundColor:'rgba(0,0,0,0.3)',zIndex:10,alignItems:'center',justifyContent:'space-between'
  },
  img: {
    width:170,borderRadius:20,height:270,alignSelf:'center',top:-20
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  ratingContainer: {
    flexDirection:'row',
    alignItems:'center',
    gap:5
  }
})