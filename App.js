import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Screens/Login";
import Signup from "./Screens/SignUp";
import Home from "./Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar } from "react-native-elements";
import { auth } from "./firebase";
import { TouchableOpacity } from "react-native";
import AddChat from "./Screens/AddChat";
import ChatScreen from "./Screens/ChatScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator /*initialRouteName={"Home"}*/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Signal
              </Text>
            ),
          }}
        />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
