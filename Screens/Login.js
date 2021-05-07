import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        navigation.replace("Home");
      } else {
        console.log("No User");
      }
    });
    return unsubscribe;
  }, []);

  const SignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        blurRadius={1}
        source={{ uri: "https://wallpaperaccess.com/full/3102346.jpg" }}
        style={styles.bgimage}
        mode="cover"
      >
        <Text style={styles.wel}>WELCOME TO CHAT APP</Text>
        <TextInput
          style={styles.inemail}
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inpass}
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={SignIn}
        />
        <View style={styles.login}>
          <TouchableOpacity onPress={SignIn} type="outline">
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
              {" "}
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bgimage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inemail: {
    width: "80%",
    maxWidth: 400,
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 15,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  inpass: {
    width: "80%",
    maxWidth: 400,
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 15,
    borderBottomWidth: 4,
    borderColor: "black",
    marginTop: 15,
    marginBottom: 250,
  },
  login: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 150,
    borderRadius: 20,
    borderBottomWidth: 4,
    borderBottomColor: "black",
  },
  signup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  wel: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 170,
  },
});
