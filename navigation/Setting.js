import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Switch,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../util/ThemeManager";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { HomeModuleContext } from "../Modules/HomeModule";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Setting = () => {
  const {
    theme,
    lightMode,
    toggleTheme,
    isTyping,
    toggleTyping,
    fontsize,
    handleFontsize,
    textLineHeight,
    handleTextLineHeight,
  } = useContext(ThemeContext);

  const { setScriptCode, setScripts, main1, setChoices } =
    useContext(HomeModuleContext);

  const navigation = useNavigation();
  const reset = async () => {
    const forprint = await useAsyncStorage("colletedME").getItem();
    console.log("endings:", JSON.stringify(forprint));
    if (forprint !== null) {
      console.log("endings:", JSON.stringify(forprint));
    }
    navigation.goBack();
    setScripts([...main1]);
    setScriptCode("A0");
    setChoices([]);
    // useAsyncStorage("savedChoices").removeItem();
  };

  const fontReset = () => {
    handleFontsize(18);
    handleTextLineHeight(34);
  };

  return (
    <View
      style={{
        ...styles[`box${theme}`],
      }}
    >
      <View
        style={{
          ...styles.container,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",

              marginHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 16, ...styles[`text${theme}`] }}>
              설정
            </Text>
          </View>

          <TouchableOpacity
            style={{
              position: "absolute",

              right: 20,
              top: -7,

              padding: 7,
            }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="x" size={18} color="#9b9b9b" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 35,
            }}
          >
            <View style={{ ...styles.title, height: windowHeight * 0.05 }}>
              <Text
                style={{
                  ...styles[`text${theme}`],
                  marginHorizontal: 30,
                  fontSize: 13,
                }}
              >
                화면 설정
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles[`button${theme}`],
                ...styles.button,
                height: windowHeight * 0.06,
              }}
              onPress={() => toggleTheme()}
            >
              <Text
                style={{
                  ...styles[`text${theme}`],
                }}
              >
                다크 모드
              </Text>
            </TouchableOpacity>
            {console.log("setting:", lightMode, theme)}
            <TouchableOpacity
              style={{
                ...styles[`button${theme}`],
                ...styles.button,
                height: windowHeight * 0.06,
              }}
              onPress={() => toggleTyping()}
            >
              <Text style={{ ...styles[`text${theme}`] }}>{`타이핑 효과 ${
                isTyping === 0 ? "off" : "on"
              }`}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                ...styles.title,
                height: windowHeight * 0.05,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...styles[`text${theme}`],
                  marginHorizontal: 30,
                  fontSize: 13,
                  flex: 4,
                }}
              >
                폰트 설정
              </Text>
              <TouchableOpacity
                style={{
                  ...styles[`button${theme}`],
                  marginRight: 30,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  paddingVertical: 4,
                }}
                onPress={() => fontReset()}
              >
                <Text
                  style={{
                    fontSize: 12,
                    ...styles[`text${theme}`],
                  }}
                >
                  초기화
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.sliderContainer,
                marginHorizontal: 28,
                marginBottom: 30,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    ...styles[`text${theme}`],
                    fontSize: 13,
                    marginVertical: 15,
                  }}
                >
                  줄 간격 {textLineHeight}
                </Text>
                <Text
                  style={{
                    ...styles[`text${theme}`],
                    fontSize: 13,
                    marginVertical: 15,
                  }}
                >
                  폰트 사이즈 {fontsize}px
                </Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Slider
                  onValueChange={(value) => handleTextLineHeight(value)}
                  minimumValue={34}
                  maximumValue={70}
                  value={textLineHeight}
                  style={{ flex: 1, marginVertical: 15 }}
                  step={2}
                />
                <Slider
                  onValueChange={(value) => handleFontsize(value)}
                  minimumValue={16}
                  maximumValue={30}
                  value={fontsize}
                  style={{ flex: 1, marginVertical: 15 }}
                  step={2}
                />
              </View>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                reset();
              }}
              style={{
                ...styles[`button${theme}`],
                ...styles.button,
                height: windowHeight * 0.06,
              }}
            >
              <Text style={{ ...styles[`text${theme}`] }}>
                처음으로 돌아가기
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 10, color: "red" }}>
              두 번 물어보지 않으니 신중하게 선택하세요
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxdark: {
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: 40,
    marginVertical: 80,
    borderRadius: 10,
  },
  boxlight: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 40,
    marginVertical: 80,
    borderRadius: 10,
  },
  title: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#d6d6d6",
    borderBottomColor: "#e5e5e5",
    marginBottom: 15,
  },
  buttondark: {
    backgroundColor: "#636363",
  },
  buttonlight: {
    backgroundColor: "#eaeaea",
  },
  button: {
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  container: {
    flex: 1,
  },
  textlight: {
    color: "black",
  },
  textdark: {
    color: "#E9E2E7",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Setting;
