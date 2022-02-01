import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../util/ThemeManager";
import { Feather } from "@expo/vector-icons";
import { HomeModuleContext } from "../Modules/HomeModule";
import { FontAwesome } from "@expo/vector-icons";

const NativeStack = createNativeStackNavigator();
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const MainEndings = [
  { key: "End 1", title: "배드 엔딩: 죽음", code: "end1" },
  { key: "End 2", title: "노멀 엔딩: 나만 아니면 돼!", code: "end2" },
  { key: "End 3", title: "노멀 엔딩: 이어지는 일상", code: "end3" },
  { key: "End 4", title: "트루 엔딩: 살아가는 사람들", code: "end4" },
  { key: "End 5", title: "트루 엔딩: 살아남은 사람들", code: "end5" },
  { key: "End 6", title: "트루 엔딩: 살아 있을 사람들", code: "end6" },
];
const Epilogues = [
  { key: 0, title: "씻을 수 없는 오명", code: "ep1", conditional: ["ep1"] },
  { key: 1, title: "이세인의 동반자", code: "ep2", conditional: ["ep2"] },
  {
    key: 2,
    title: "안 사요 안 사",
    code: "ep3",
    conditional: ["ep3a", "ep3b"],
  },
];

const Journal = () => {
  const { endingCollection, epilList } = useContext(HomeModuleContext);
  const { theme, fontsize } = useContext(ThemeContext);
  const [main, setMain] = useState(true);
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles[`box${theme}`],
      }}
    >
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
              {console.log(epilList)}
              엔딩 수집
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
        <ScrollView>
          <View style={{ marginBottom: 80 }}>
            <View
              style={{
                ...styles[`mainEndingBar${theme}`],
                height: windowHeight * 0.05,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  ...styles[`textopp${theme}`],
                  marginHorizontal: 30,
                }}
              >
                메인 엔딩
              </Text>
            </View>
            <View style={styles.endingContainer}>
              {MainEndings.map((end) => (
                <View key={end.key} style={{ ...styles.endings }}>
                  {endingCollection.includes(end.code) ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Epiloguepage", {
                          title: end.title,
                          code: end.code,
                          type: "main",
                        });
                      }}
                    >
                      <View style={styles.mainEndingContainer}>
                        <Text style={{ ...styles[`text${theme}`] }}>
                          {end.key}
                        </Text>
                        <Text
                          style={{
                            ...styles.mainEndingTextContainer,
                            fontSize: 13,
                            ...styles[`text${theme}`],
                          }}
                        >
                          {end.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.mainEndingContainer}>
                      <Text
                        style={{ ...styles[`text${theme}`], color: "#D8D8D8" }}
                      >
                        {end.key}
                      </Text>
                      <FontAwesome
                        style={styles.mainEndingTextContainer}
                        name="lock"
                        size={18}
                        color="#D8D8D8"
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              ...styles[`scroll${theme}`],
              borderRadius: 20,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                height: windowHeight * 0.07,
                justifyContent: "center",

                borderBottomWidth: 1,
                borderBottomColor: "#d8d8d8",
              }}
            >
              <Text style={{ ...styles[`text${theme}`], marginHorizontal: 25 }}>
                에필로그
              </Text>
            </View>
            <View style={{ flex: 6 }}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {Epilogues.map((epil) =>
                  epil.conditional.some((v) => epilList.includes(v)) ? (
                    <TouchableOpacity
                      style={
                        epil.key === Epilogues.length - 1
                          ? styles.lastEpilogueContainer
                          : styles.epilogueContainer
                      }
                      key={epil.key}
                      onPress={() =>
                        navigation.navigate("Epiloguepage", {
                          title: epil.title,
                          code: epil.code,
                          type: "epil",
                        })
                      }
                    >
                      <Text style={{ ...styles[`text${theme}`] }}>
                        {epil.title}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={
                        epil.key === Epilogues.length - 1
                          ? styles.lastEpilogueContainer
                          : styles.epilogueContainer
                      }
                      key={epil.key}
                    >
                      <Text style={{ ...styles[`text${theme}`] }}>????</Text>
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
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
  textopplight: {
    color: "#E9E2E7",
  },
  textoppdark: {
    color: "black",
  },
  textlight: {
    color: "black",
  },
  textdark: {
    color: "#E9E2E7",
  },
  scrolllight: {
    backgroundColor: "#EAEAEA",
  },
  scrolldark: {
    backgroundColor: "#636363",
  },
  mainEndingBarlight: {
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    marginBottom: 12,
  },
  mainEndingBardark: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    marginBottom: 12,
  },
  endingContainer: {
    flex: 1,
    height: windowHeight * 0.3,
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
  },
  endings: {
    borderBottomWidth: 1,
    height: windowHeight * 0.06,
    borderColor: "#e5e5e5",

    justifyContent: "center",
  },
  mainEndingContainer: {
    marginHorizontal: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  mainEndingTextContainer: {
    marginHorizontal: 30,
  },
  epilogueContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  lastEpilogueContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.06,
  },
});

export default Journal;
