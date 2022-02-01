import React, { useState, useEffect, useCallback } from "react";
import { Image, Pressable } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import TypeWriter from "react-native-typewriter";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./navigation/Home";
import OurRouter from "./navigation/Root";
import * as SplashScreen from "expo-splash-screen";
import {
  AsyncStorage,
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const startLoading = async () => {
    const savedChoices = await useAsyncStorage("savedChoices").getItem();
    console.log("선택 불러옴:", savedChoices);

    setReady(true);
  };
  const [ready, setReady] = useState(false);

  const onFinish = () => setReady(true);
  // const startLoading = async () => {
  //   const fonts = loadFonts([Ionicons.font]);
  //   const images = loadImages([]);
  //   await Promise.all([...fonts, ...images]);
  // };
  // if (!ready) {
  //   return (
  //     <AppLoading
  //       startAsync={startLoading}
  //       onFinish={onFinish}
  //       onError={console.error}
  //     />
  //   );
  // }
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        //await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();

    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1500);
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <OurRouter />
    </NavigationContainer>
  );
}
