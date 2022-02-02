import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useContext } from "react";
import { Text, TouchableOpacity, View, Modal, StyleSheet } from "react-native";
import Home from "./Home";
import Setting from "./Setting";
import Journal from "./Journal";
import { NavigationContainer } from "@react-navigation/native";
import EpiloguePage from "./Epilogue";
import { ThemeContext, ThemeProvider } from "../util/ThemeManager";
import { FontAwesome } from "@expo/vector-icons";
import {
  textSize,
  textLineHeight,
  fontStyle,
  bgColorLight,
  bgColorDark,
  textColorLight,
  textColorDark,
} from "../variables";
import { HomeModuleProvider } from "../Modules/HomeModule";

const testHP = [1, 2, 3];

const NativeStack = createNativeStackNavigator();

//메인 페이지 구성
const Homepage = ({ navigation }) => {
  const { theme, hp } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles[`container${theme}`]}>
        {/* hp에 따른 하트 구현(미완성) */}
        <View style={{ flex: 1, marginHorizontal: 15, flexDirection: "row" }}>
          {testHP.map((key) => (
            <FontAwesome
              key={key}
              style={{ ...styles[`text${theme}`], marginHorizontal: 2 }}
              name="heart"
              size={14}
            />
          ))}
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 15,
          }}
        >
          {/* 저널 버튼 */}
          <TouchableOpacity onPress={() => navigation.navigate("Journalpage")}>
            <FontAwesome
              style={{ ...styles[`text${theme}`], padding: 7 }}
              name="bookmark"
              size={24}
            />
          </TouchableOpacity>
          {/* 설정 버튼 */}
          <TouchableOpacity onPress={() => navigation.navigate("Nextpage")}>
            <FontAwesome
              style={{ ...styles[`text${theme}`], padding: 7 }}
              name="gear"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Home />
    </View>
  );
};

const Journalpage = () => (
  <View style={{ flex: 1 }}>
    <Journal />
  </View>
);

const Nextpage = () => (
  <View style={{ flex: 1 }}>
    <Setting />
  </View>
);

const Epiloguepage = ({ route, navigation }) => (
  <View style={{ flex: 1 }}>
    {console.log(route.params)}
    <EpiloguePage
      code={route.params.code}
      title={route.params.title}
      type={route.params.type}
    />
  </View>
);

const OurRouter = () => (
  <ThemeProvider>
    <HomeModuleProvider>
      <NavigationContainer independent={true}>
        <NativeStack.Navigator screenOptions={{ headerShown: false }}>
          <NativeStack.Screen
            name="Homepage"
            component={Homepage}
          ></NativeStack.Screen>

          <NativeStack.Screen
            options={{ presentation: "transparentModal" }}
            name="Journalpage"
            component={Journalpage}
          ></NativeStack.Screen>
          <NativeStack.Screen
            options={{ presentation: "transparentModal" }}
            name="Nextpage"
            component={Nextpage}
          ></NativeStack.Screen>
          <NativeStack.Screen
            options={{
              presentation: "transparentModal",
              animation: "slide_from_right",
            }}
            name="Epiloguepage"
            component={Epiloguepage}
          ></NativeStack.Screen>
        </NativeStack.Navigator>
      </NavigationContainer>
    </HomeModuleProvider>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  containerdark: {
    paddingHorizontal: 10,
    backgroundColor: bgColorDark,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerlight: {
    paddingHorizontal: 10,
    backgroundColor: bgColorLight,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textdark: {
    color: textColorDark,
    fontFamily: fontStyle,
  },
  textlight: {
    color: textColorLight,
    fontFamily: fontStyle,
  },
});

export default OurRouter;
