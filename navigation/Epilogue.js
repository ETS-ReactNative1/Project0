import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppLoading from "expo-app-loading";
import { bgColor } from "../variables";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext, ThemeProvider } from "../util/ThemeManager";
import { HomeModuleContext, HomeModuleProvider } from "../Modules/HomeModule";
import { fontStyle } from "../variables";
import { Feather } from "@expo/vector-icons";

const NativeStack = createNativeStackNavigator();
const mainEndingList = require("../JSON/MainEnding.json");
const epilogueList = require("../JSON/Epilogue.json");

const EpiloguePage = ({ code, title, type }) => {
  const { theme, fontsize, textLineHeight } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [script, setScript] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    type === "main" ? setScript(mainEndingList[0]) : setScript(epilogueList[0]);
    setReady(true);
  }, []);

  return (
    <View style={styles[`box${theme}`]}>
      {ready ? (
        <View style={styles.container}>
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
                {title}
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
          <View style={{ ...styles.scrollContainer, flex: 1 }}>
            <View
              style={{
                marginVertical: 20,
                marginHorizontal: 28,

                flex: 1,
              }}
            >
              <ScrollView style={{}}>
                {script[code].map((txt) =>
                  typeof txt.text !== "string" ? null : (
                    <Text
                      style={{
                        ...styles[`text${theme}`],
                        marginVertical: 7,
                        fontSize: fontsize - 2,
                        lineHeight: textLineHeight - 7,
                      }}
                    >
                      {txt.text}
                    </Text>
                  )
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxdark: {
    flex: 1,
    backgroundColor: "#353535",
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

  container: {
    flex: 1,
  },
  textdark: {
    color: "#E9E2E7",
    fontFamily: fontStyle,
  },
  textlight: {
    color: "black",

    fontFamily: fontStyle,
  },
  scrollContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
  },
});

export default EpiloguePage;
