import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomList = ({ id, chatName, enterChat }) => {
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    
      const unsubscribe = db
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setChatMessage(snapshot.docs.map((doc) => doc.data()))
        );
      return unsubscribe;
    
  });

  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessage?.[0]?.photoURL ||
            "https://p7.hiclipart.com/preview/7/618/505/avatar-icon-fashion-men-vector-avatar.jpg",
        }}
        size={50}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessage?.[0]?.displayName}: {chatMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomList;

const styles = StyleSheet.create({});
