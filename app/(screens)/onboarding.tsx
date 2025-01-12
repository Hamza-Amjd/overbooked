import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

import Animated, {
  FadeIn,
  FadeOut,
  BounceInRight,
  SlideOutLeft,
  BounceOutLeft,
  SlideInRight,
  runOnJS,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import onboarding1 from "@/assets/images/onboarding/onboarding1.png";import onboarding2 from "@/assets/images/onboarding/onboarding2.png";import onboarding3 from "@/assets/images/onboarding/onboarding3.png";
import { router } from "expo-router";
import CustomText from "@/components/ui/CustomText";

const onboardingSteps = [
  {
    id: 1,
    icon: onboarding1,
    description: "Dive into a world of books tailored to your taste.",
  },
  {
    id: 2,
    icon: onboarding2,
    description: "Enjoy your favorite stories on the go or at home.",
  },
  {
    id: 3,
    icon: onboarding3,
    description: "Save, organize, and revisit the books you love.",
  },
];

export default function onboarding() {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = async () => {
    await AsyncStorage.setItem("isFirstStart", "false");
    router.replace("/(auth)");
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(runOnJS(onContinue))
      .runOnJS(true),
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(runOnJS(onBack))
      .runOnJS(true)
  );

  return (
    <View style={styles.page}>
      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <TouchableOpacity style={styles.skipBtn} onPress={endOnboarding}>
            <CustomText variant="h5" style={styles.skipTxt}>
              Skip
            </CustomText>
          </TouchableOpacity>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Image source={data.icon} style={styles.image} />
          </Animated.View>

          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>

            <View style={{ paddingTop: 80 }}>
              {onboardingSteps[screenIndex].id == 3 ? (
                <TouchableOpacity
                  onPress={endOnboarding}
                  style={styles.endButton}
                >
                  <FontAwesome5 name="arrow-right" size={40} color={"white"} />
                </TouchableOpacity>
              ) : (
                <View style={styles.stepIndicatorContainer}>
                  {onboardingSteps.map((step, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.stepIndicator,
                          {
                            backgroundColor:
                              index === screenIndex ? Colors.primary : "grey",
                          },
                        ]}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContent: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    fontSize: 22,
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "Medium",
  },
  footer: {
    marginTop: 30,
  },
  skipBtn: { 
    position: "absolute",
    top: 60,
    right: 15
  },
  skipTxt: {
    textDecorationLine: "underline",
    color: Colors.grey
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  endButton: {
    width: 55,
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  // steps
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "gray",
  },
});
