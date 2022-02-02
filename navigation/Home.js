import React, { useEffect, useState, useContext, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import TypeWriter from "react-native-typewriter";
import { ThemeContext, ThemeProvider } from "../util/ThemeManager";
import { HomeModuleContext, scriptList } from "../Modules/HomeModule";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Loading from "./Loading";

import {
  fontStyle,
  bgColorLight,
  bgColorDark,
  textColorLight,
  textColorDark,
} from "../variables";
import {
  NPCDialogText,
  NPCNameText,
  DialogTypingText,
} from "../Modules/HomeVariables";

const Home = () => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [start, setStart] = useState(false);

  const scrollViewRef = useRef();

  const { theme, isTyping, fontsize, textLineHeight } =
    useContext(ThemeContext);
  const {
    addSubEvent,

    setScriptCode,
    eventScript,

    nextScript,

    pressable,
    setPressable,
    choices,
    setChoices,
    setEndingCollection,
    setScripts,
    endingCollection,
    getNextScript,

    showingScript,
    scripts,
    epilList,
    setEpilList,
    typing,
    setTyping,
    SubEvent1,
    randomPick,
    setFirstScreen,
  } = useContext(HomeModuleContext);

  const scriptList = [
    "subnav1",
    "subnav2",
    "main1",
    "main2",
    "main3",
    "main4",
    "with1",
    "with2",
    "out1",
    "out2",
  ];
  const [lastChoice, setLastChoice] = useState("A0");
  useEffect(async () => {
    //이전에 선택했던 선택지들 값을 불러옴.(미구현)
    // const savedChoices = await useAsyncStorage("savedChoices").getItem();
    // console.log("savedChoices", savedChoices);

    //이전에 수집한 엔딩 목록을 불러옴
    const ME = await useAsyncStorage("collectedME").getItem();
    const EP = await useAsyncStorage("collectedEP").getItem();
    console.log(ME, EP);
    if (ME !== null) {
      setEndingCollection(JSON.parse(ME));
      console.log(endingCollection);
    }

    if (EP !== null) {
      console.log(epilList);
      setEpilList(JSON.parse(EP));
    }

    //종료 전에 가지고 있던 랜덤 서브이벤트 목록을 불러옴(미구현)
    // const aSubEvent1 = await useAsyncStorage("SubEvent1").getItem();
    // const aSubEvent2 = await useAsyncStorage("SubEvent2").getItem();
    //종료 전 가지고 있던 서브이벤트 카운터를 불러옴(미구현)
    // const aEventCounter = await useAsyncStorage("eventCounter").getItem();

    //저장된 선택지값이 있다면 state에 저장하고 마지막으로 한 선택지 스크립트로 화면을 구성(미구현)
    // if (savedChoices !== "[]") {
    //   setChoices(JSON.parse(savedChoices));
    //   const forCheck = [...JSON.parse(savedChoices)].reverse();
    //   for (var i = 0; i < forCheck.length; i++) {
    //     console.log(forCheck[i]);
    //     if (scriptList.includes(forCheck[i])) {
    //       console.log("catch", forCheck[i]);
    //       setLastChoice(forCheck[i]);
    //       // setFirstScreen(forCheck[i])
    //       break;
    //     } else {
    //       console.log("lastchoice:", forCheck[0]);
    //       setLastChoice(forCheck[0]);
    //       //setFirstScreen(forCheck[0])
    //     }
    //   }

    //   console.log("forCheck", forCheck);
    // }

    //서브이벤트를 랜덤으로 구성
    addSubEvent();

    //touch to start blink 애니메이션
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const [showText, setShowText] = useState(true);

  // useEffect(() => {
  //   console.log(choices);
  //   if (choices.includes("main1")) {
  //엔딩을 보고 처음 화면으로 돌아왔을 경우 asyncstorage에 저장된 선택지와 서브이벤트 리스트를 초기화(미구현)
  //     setChoices([]);
  //     useAsyncStorage("savedChoices").removeItem();
  //     useAsyncStorage("SubEvent1").removeItem();
  //     useAsyncStorage("SubEvent2").removeItem();
  //   } else {
  //     try {
  //       useAsyncStorage("savedChoices").setItem(JSON.stringify(choices));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }, [choices]);
  // const magicFunc = () => {

  return start ? (
    <View style={styles[`container${theme}`]}>
      <View
        style={{
          ...styles.innerContainer,
        }}
      >
        <Pressable
          disabled={pressable}
          onPress={() => {
            if (typing === true) {
              setTyping(false);
            } else {
              if ((eventScript[nextScript] === eventScript[-1]) === false) {
                setTyping(true);
                getNextScript();
              } else {
                setPressable(false);
              }
            }
          }}
          style={{ flex: 1, marginBottom: 40 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {Object.keys(showingScript).map((key) => (
              <View key={key}>
                {showingScript[key].option ? (
                  <View style={styles.optionBox}>
                    {/* //선택지 */}
                    {showingScript[key].text.map((sel) => (
                      <View key={sel.code} style={styles.optionContainer}>
                        {!["subnav1", "subnav2", "subnav3"].includes(
                          sel.code
                        ) && choices.includes(sel.code) ? null : (
                          <Pressable
                            onPress={() => {
                              setScriptCode(sel.code);

                              setChoices([...choices, sel.code]);
                              console.log(choices);
                            }}
                          >
                            {showingScript[key].condition === undefined ? (
                              //그냥 출력
                              <Text
                                style={{
                                  ...styles[`text${theme}`],
                                  lineHeight: textLineHeight,
                                  fontSize: fontsize - 1,
                                }}
                              >
                                {sel.print}
                              </Text>
                            ) : choices.includes(sel.conditionalCode) ? (
                              //조건부 출력
                              <Text
                                style={{
                                  ...styles[`text${theme}`],
                                  lineHeight: textLineHeight,
                                  fontSize: fontsize,
                                }}
                              >
                                {sel.print}
                              </Text>
                            ) : null}
                          </Pressable>
                        )}
                      </View>
                    ))}
                  </View>
                ) : //선택지 아님
                typing === true && nextScript - 1 == key ? (
                  //타이핑
                  <View>
                    {showingScript[key].condition === undefined ? (
                      //그냥 출력
                      <View style={styles.textContainer}>
                        {
                          {
                            npcDialog: (
                              <NPCDialogText props={showingScript[key].text} />
                            ),
                            npcName: (
                              <NPCNameText props={showingScript[key].text} />
                            ),
                            dialog: (
                              <DialogTypingText
                                props={showingScript[key].text}
                              />
                            ),
                          }[showingScript[key].textStyle]
                        }
                      </View>
                    ) : (
                      //조건부 출력
                      showingScript[key].text.map((txt) =>
                        choices.includes(txt.code) ? (
                          <View key={txt} style={styles.textContainer}>
                            {
                              {
                                npcDialog: <NPCDialogText props={txt.print} />,
                                npcName: <NPCNameText props={txt.print} />,
                                dialog: <DialogTypingText props={txt.print} />,
                              }[showingScript[key].textStyle]
                            }
                          </View>
                        ) : null
                      )
                    )}
                  </View>
                ) : (
                  //현재 사용하고 있는 typewriter 모듈의 한계로 두번째 클릭 시에 typewriter 컴포넌트를 view로 대체해서 rerender함.

                  <View>
                    {showingScript[key].condition === undefined ? (
                      //그냥 출력
                      <View style={styles.textContainer}>
                        {
                          {
                            npcDialog: (
                              <Text
                                style={{
                                  ...styles[`text${theme}`],
                                  lineHeight: textLineHeight,
                                  fontSize: fontsize - 1,
                                  marginBottom: 5,
                                }}
                              >
                                {showingScript[key].text}
                              </Text>
                            ),
                            npcName: (
                              <Text
                                style={{
                                  ...styles[`text${theme}`],
                                  lineHeight: textLineHeight,
                                  fontSize: fontsize - 1,
                                  fontWeight: "bold",
                                  marginTop: 20,
                                  marginBottom: 5,
                                }}
                              >
                                {showingScript[key].text}
                              </Text>
                            ),
                            dialog: (
                              <Text
                                style={{
                                  ...styles[`text${theme}`],
                                  lineHeight: textLineHeight,
                                  fontSize: fontsize,
                                  marginTop: 10,
                                }}
                              >
                                {showingScript[key].text}
                              </Text>
                            ),
                          }[showingScript[key].textStyle]
                        }
                      </View>
                    ) : (
                      //조건부 출력
                      showingScript[key].text.map((txt) =>
                        choices.includes(txt.code) ? (
                          <View key={txt.code} style={styles.textContainer}>
                            {
                              {
                                npcDialog: (
                                  <Text
                                    style={{
                                      ...styles[`text${theme}`],
                                      lineHeight: textLineHeight,
                                      fontSize: fontsize - 1,
                                    }}
                                  >
                                    {txt.print}
                                  </Text>
                                ),
                                npcName: (
                                  <Text
                                    style={{
                                      ...styles[`text${theme}`],
                                      lineHeight: textLineHeight,

                                      fontSize: fontsize - 1,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {txt.print}
                                  </Text>
                                ),
                                dialog: (
                                  <Text
                                    style={{
                                      ...styles[`text${theme}`],
                                      lineHeight: textLineHeight,
                                      fontSize: fontsize,
                                      marginTop: 20,
                                    }}
                                  >
                                    {txt.print}
                                  </Text>
                                ),
                              }[showingScript[key].textStyle]
                            }
                          </View>
                        ) : null
                      )
                    )}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </Pressable>
      </View>
    </View>
  ) : (
    //touch to start 화면
    <Pressable
      onPress={() => {
        setStart(true);
      }}
    >
      <View
        style={{
          ...styles.main,
          height: windowHeight,
          width: windowWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ resizeMode: "contain", height: windowHeight }}
          source={require("../img/main.png")}
        />
        <Image
          style={{
            transform: [{ scale: 0.7 }],
            position: "absolute",
            bottom: 140,
            opacity: showText ? 0 : 100,
          }}
          source={require("../img/touchtostart.png")}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerdark: {
    backgroundColor: bgColorDark,

    flex: 10,
  },
  containerlight: {
    backgroundColor: bgColorLight,

    flex: 10,
  },

  innerContainer: {
    flex: 1,

    justifyContent: "center",
  },
  systemText: {
    color: "red",
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 28,
    marginVertical: 5,
    borderRadius: 10,
  },
  npcTextContainer: {
    backgroundColor: "blue",
  },
  textdark: {
    color: textColorDark,
    fontFamily: fontStyle,
  },
  textlight: {
    color: textColorLight,
    fontFamily: fontStyle,
  },
  optionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 28,
    marginVertical: 7,
  },
  optionBox: {
    marginVertical: 20,
  },

  optionText: {
    textAlignVertical: "center",
    flex: 1,
    color: "black",
  },
  loading: {
    backgroundColor: "#5b5b5b",
  },
});

export default Home;
