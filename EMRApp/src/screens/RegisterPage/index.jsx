import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Text, TouchableOpacity, View } from "react-native";
import { Image, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "@react-navigation/native";
import { handleLogin, handleRegister } from "./scripts/api";

export default function RegisterPage({ navigation }) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConPassword, setConPassword] = useState("");
  const [Adhar, setAdhar] = useState("");
  const { login } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isAPI, setisAPI] = useState(false);

  function validate() {
    if (!Username.trim() || !Password.trim()) {
      setModalText("Username or Password can't be Blank!");
      setModalVisible(true);
      return;
    }

    if (Password.trim() != ConPassword.trim()) {
      setModalText("Password Doesn't Match!");
      setModalVisible(true);
      return;
    }
    setisAPI(true);
    handleRegister(Username, Password, Adhar)
      .then((result) => {
        if (result === true) {
          console.log("Success");
          handleLogin(Username, Password)
            .then(() => {
              console.log("Success");
              login();
            })
            .catch(() => {
              console.log("Fail");
              setModalText("Incorrect Details!");
              setModalVisible(true);
              setisAPI(false);
            });
        } else {
          setModalText(result);
          setModalVisible(true);
          setisAPI(false);
        }
      })
      .catch((err) => {
        setModalText("Unexpected Error!");
        setModalVisible(true);
        setisAPI(false);
      });
  }

  useEffect(() => {
    async function clear() {
      const token = await AsyncStorage.getItem("TOKEN");
      console.log(token);
      if (token) {
        login();
      } else {
        setIsLoading(false);
      }
    }
    clear();
  }, []);

  return !isLoading ? (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "90%",
              height: "20%",
              justifyContent: "space-evenly",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
                lineHeight: 32,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {modalText}
            </Text>
            <TouchableOpacity
              style={{
                height: 50,
                width: "70%",
                backgroundColor: "black",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.text}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={require("../../../assets/yellow.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "blue",
        }}
      />
      <View
        style={{
          flex: 4,
          justifyContent: "flex-end",
          alignItems: "center",
          //   backgroundColor: "black",
        }}
      >
        <Image
          source={require("../../../assets/IDMLOGODARK.png")}
          style={styles.imagelogo}
        />
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: "flex-start",
          alignItems: "center",
          rowGap: 10,
          //   backgroundColor: "red",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={Username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Aadhar Number"
          value={Adhar}
          onChangeText={(text) => setAdhar(text)}
          textContentType="telephoneNumber"
          inputMode="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          value={ConPassword}
          onChangeText={(text) => setConPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "black",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => validate()}
          disabled={isAPI}
        >
          <Text style={styles.text}>{isAPI ? "..." : "Register"}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "blue",
        }}
      />
      <View
        style={{
          borderRadius: 5,
          paddingHorizontal: 10,
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 5,
        }}
      >
        <Link
          to={"/Login"}
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Login
        </Link>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image
        source={require("../../../assets/bg.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    flex: 1,
  },
  imagelogo: {
    width: "80%",
    height: 120,
    borderRadius: 20,
    marginBottom: 10,
  },
  container: {
    height: "100%",
  },
  input: {
    flex: 1,
    maxHeight: 40,
    width: "80%",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    lineHeight: 32,
  },
});
