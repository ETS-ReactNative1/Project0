import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  console.log(isDark);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="TV" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
