import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerStyle: { backgroundColor: "#008891" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputchatname}
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity disabled={!input} onPress={createChat}>
        <View style={styles.createchat}>
          <Text style={{ fontWeight: "700", fontSize: 20, color: "white" }}>
            Create Chat
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputchatname: {
    width: "80%",
    maxWidth: 400,
    height: 50,
    backgroundColor: "white",
    paddingLeft: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  createchat: {
    backgroundColor: "#008891",
    height: 50,
    width: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
