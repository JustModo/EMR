import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function NoInternet({ style }) {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        zIndex: 3,
        right: 10,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>Offline</Text>
      <View
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name={"wifi-alert"} color={"white"} size={30} />
      </View>
    </View>
  );
}
