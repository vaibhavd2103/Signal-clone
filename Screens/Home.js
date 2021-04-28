import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import CustomList from "../components/CustomList";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ width: 95, paddingLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar
              rounded
              source={{ uri: auth?.currentUser?.photoURL }}
              size={50}
            />
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 85,
            paddingRight: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camera" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <Ionicons name="create" size={28} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomList
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
