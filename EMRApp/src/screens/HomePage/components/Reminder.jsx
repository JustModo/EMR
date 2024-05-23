import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Reminder() {
  return (
    <View
      style={{
        height: 180,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 5,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 24,
          fontWeight: "bold",
          color: "#868587",
          lineHeight: 32,
        }}
      >
        No Reminders...
      </Text>
      <TouchableOpacity>
        <MaterialIcons
          name={"calendar-plus"}
          color={"#868587"}
          size={40}
          style={{ alignSelf: "center", marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}
