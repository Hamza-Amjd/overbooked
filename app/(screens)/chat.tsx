import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
  FadeInUp,
  SlideInLeft,
  SlideInRight
} from 'react-native-reanimated';
import axios from 'axios';
import { BASE_URL } from '@/services/config';
import { useBookStore } from '@/services/bookStore';
import CustomText from '@/components/ui/CustomText';

const { width, height } = Dimensions.get('window');

const chat = () => {
    const {books}=useBookStore()
  const [messages, setMessages] = useState<any>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = async () => {
      if (!inputText.trim()) return;
      
      // Add user message
      const newMessage = { id: Date.now(), text: inputText, isUser: true };
      setMessages((prev:any) => [...prev, newMessage]);
      setInputText('');
      setIsLoading(true);
    const response=await axios.post(`${BASE_URL}/library/chat`,{message:inputText,books}).then((res) =>{return res.data.response}).catch((err)=>console.log(err)).finally(()=>setIsLoading(false))
    if(response){
        // Add AI message
        const aiResponse = { id: Date.now() + 1, text: response, isUser: false };
        setMessages((prev:any)  => [...prev, aiResponse]);
    }
  };

  const LoadingIndicator = () => {
    const progress = useSharedValue(0);
    
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      true
    );

    const animatedDotStyle = (index:number) => useAnimatedStyle(() => {
      const translateY = progress.value * -4 * (index + 1);
      return {
        transform: [{ translateY: translateY }],
        opacity: 0.8 + (progress.value * 0.2)
      };
    });

    return (
      <Animated.View 
        style={[styles.loadingContainer, { padding: 16 }]}
        entering={FadeInUp.duration(500)}
      >
        <LinearGradient
          colors={['#7F5A83', '#5B4379', '#3A2C5A']}
          style={styles.loadingBubble}
        >
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  animatedDotStyle(i),
                  { marginHorizontal: 3 }
                ]}
              />
            ))}
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const MessageBubble = ({ item }:any) => {
    const enteringAnimation = item.isUser 
      ? SlideInRight.duration(500) 
      : SlideInLeft.duration(500);

    return (
      <Animated.View>
        <LinearGradient
          colors={item.isUser ? ['#7F5A83', '#5B4379'] : ['#3A2C5A', '#2A1E3F']}
          style={[
            styles.messageBubble,
            item.isUser ? styles.userBubble : styles.aiBubble
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  const StatusIndicator = ({ isLoading }:any) => {
    const statusProgress = useSharedValue(0);
    
    statusProgress.value = withTiming(isLoading ? 1 : 0, {
      duration: 500,
      easing: Easing.ease
    });

    const animatedStatusStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        statusProgress.value,
        [0, 1],
        ['#00FF00', '#FFD700']
      );
      
      return { backgroundColor };
    });

    return (
      <View style={styles.statusIndicator}>
        <Animated.View style={[styles.statusDot, animatedStatusStyle]} />
        <Text style={styles.statusText}>
          {isLoading ? 'Thinking...' : 'Online'}
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#1A1A1A', '#2A1E3F']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <StatusIndicator isLoading={isLoading} />
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageBubble item={item} />}
          contentContainerStyle={styles.messagesContainer}
          ListFooterComponent={()=>isLoading && <LoadingIndicator />}
          ListEmptyComponent={<View style={{height:height-200,alignSelf:'center',alignItems:'center',justifyContent:'center'}}><Image source={require('@/assets/images/aichat.png')} style={{width:300,height:200,resizeMode:'contain'}}/><CustomText fontFamily='Bold' style={{color:"white",textAlign:"center"}} variant='h5'>Hi there! I am Library AI chat bot. How can i help you?</CustomText></View>}
        />

        {/* Input Container */}
        <Animated.View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop:StatusBar.currentHeight
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
    marginVertical: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#FFF',
    fontSize: 16,
    marginRight: 12,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#7F5A83',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  loadingBubble: {
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginHorizontal: 3,
  },
});

export default chat;