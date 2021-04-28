import React, { useLayoutEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import {
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            size={40}
            source={{
              uri:
                "https://p7.hiclipart.com/preview/7/618/505/avatar-icon-fashion-men-vector-avatar.jpg",
            }}
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),

      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 15 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="leftcircle" color="white" size={25} />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 90,
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 15,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>{/* chats */}</ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Enter message"
                value={input}
                style={styles.inmsg}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={26} color="dodgerblue" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 15,
  },
  inmsg: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    color: "black",
    borderRadius: 30,
    backgroundColor: "#edeef7",
  },
});
