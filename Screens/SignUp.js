import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        blurRadius={1.5}
        mode="cover"
        source={{
          uri:
            "https://cdn.dribbble.com/users/3835653/screenshots/11936591/human_4x.png",
        }}
        style={styles.image}
      >
        <TextInput
          placeholder="Username"
          style={styles.inputuser}
          type="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputemail}
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputpass}
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder="ImageUrl (optional)"
          style={styles.inputimage}
          type="ImageUrl"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
        <View style={styles.signup}>
          <TouchableOpacity onPress={register} type="outline">
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputemail: {
    maxWidth: 400,
    width: "70%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 15,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  inputuser: {
    maxWidth: 400,
    width: "70%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 10,
    marginTop: 50,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  inputpass: {
    maxWidth: 400,
    width: "70%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 15,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  inputimage: {
    maxWidth: 400,
    width: "70%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 15,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  signup: {
    marginTop: 170,
    backgroundColor: "#55DBFF",
    height: 50,
    width: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderColor: "black",
  },
});
