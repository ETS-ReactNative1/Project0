import React, { useEffect, useState, useContext, useRef } from "react";
import { ScrollView, StyleSheet, Pressable, Text, View } from "react-native";
import TypeWriter from "react-native-typewriter";
import { ThemeContext, ThemeProvider } from "../util/ThemeManager";
import { HomeModuleContext, HomeModuleProvider } from "../Modules/HomeModule";
import { fontStyle, textColorLight, textColorDark } from "../variables";

const TypingText = ({ props, npc }) => {
  const {} = useContext(HomeModuleContext);
  const { theme, isTyping, fontsize, textLineHeight } =
    useContext(ThemeContext);
  return (
    <TypeWriter
      style={
        npc
          ? {
              lineHeight: textLineHeight,
              fontSize: fontsize - 1,
              ...styles[`text${theme}`],
            }
          : {
              lineHeight: textLineHeight,
              fontSize: fontsize,
              ...styles[`text${theme}`],
              marginVertical: 20,
            }
      }
      typing={isTyping}
    >
      {props}
    </TypeWriter>
  );
};

const NoTypingText = ({ props, npc }) => {
  const { setTyping } = useContext(HomeModuleContext);
  const { theme, isTyping, fontsize, textLineHeight } =
    useContext(ThemeContext);

  return (
    <TypeWriter
      style={
        npc
          ? {
              lineHeight: textLineHeight,
              fontSize: fontsize - 1,
              ...styles[`text${theme}`],
            }
          : {
              lineHeight: textLineHeight,
              fontSize: fontsize,
              ...styles[`text${theme}`],
              marginVertical: 20,
            }
      }
      typing={isTyping}
      onTypingEnd={setTyping(false)}
    >
      {props}
    </TypeWriter>
  );
};

export const NPCDialogText = (sel) => {
  const { theme, isTyping, fontsize } = useContext(ThemeContext);
  const { showingScript } = useContext(HomeModuleContext);
  return isTyping ? ( //타이핑 on
    <TypingText props={sel.props} npc={true} />
  ) : (
    //타이핑 off

    <NoTypingText props={sel.props} npc={true} />
  );
};

export const NPCNameText = (sel) => {
  const { theme, isTyping, fontsize } = useContext(ThemeContext);
  const { setTyping } = useContext(HomeModuleContext);
  return (
    <TypeWriter
      style={{
        fontSize: fontsize - 2,
        fontWeight: "bold",

        ...styles[`text${theme}`],
        color: "purple",
      }}
      typing={0}
      onTypingEnd={setTyping(false)}
    >
      {sel.props}
    </TypeWriter>
  );
};

export const DialogTypingText = (sel) => {
  const { theme, isTyping, fontsize } = useContext(ThemeContext);
  const { showingScript } = useContext(HomeModuleContext);
  return isTyping ? ( //타이핑 on
    <TypingText props={sel.props} npc={false} />
  ) : (
    //타이핑 off

    <NoTypingText props={sel.props} npc={false} />
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 28,

    borderRadius: 10,
  },
  npcTextContainer: {},

  textdark: {
    color: textColorDark,
    fontFamily: fontStyle,
  },
  textlight: {
    color: textColorLight,
    fontFamily: fontStyle,
  },
});
