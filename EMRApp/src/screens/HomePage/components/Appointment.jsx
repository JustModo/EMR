import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Appointment() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        height: 80,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate("Appoint")}
    >
      <Image
        source={require("../../../../assets/card3.png")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      <MaterialIcons
        name={"arrow-right-bold-circle"}
        color={"white"}
        size={40}
        style={{ alignSelf: "flex-end", marginRight: 10 }}
      />
    </TouchableOpacity>
  );
}
