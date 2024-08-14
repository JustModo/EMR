import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function Card({ text, icon, image }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        height: 80,
        minWidth: "30%",
        margin: 5,
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
      }}
      onPress={() => navigation.navigate("Dashboard")}
    >
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <View>
          <MaterialIcons
            name={icon}
            color={"white"}
            size={40}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "white",
              lineHeight: 24,
              fontSize: 14,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
