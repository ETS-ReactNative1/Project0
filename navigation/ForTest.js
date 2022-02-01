import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";

const ForTest = () => {
  return (
    <View style={{ flex: 10, backgroundColor: "yellow" }}>
      <View>
        <Text>테스트</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1D",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#232323",
    margin: 15,
    justifyContent: "center",
  },
  systemText: {
    color: "red",
  },
  dialogText: {
    color: "#C2CBD1",
  },
  textContainer: {
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  optionContainer: {
    height: 70,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  optionBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#FBF7DC",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  optionText: {
    textAlignVertical: "center",
    flex: 1,
    color: "black",
  },
});

export default ForTest;
