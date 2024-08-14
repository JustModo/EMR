import React from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BackButton({ handleClick, style }) {
  return (
    <View
      style={{
        position: "absolute",
        minHeight: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3,
        left: 10,
        ...style,
      }}
    >
      <TouchableOpacity onPress={handleClick}>
        <MaterialIcons name={"arrow-left-thick"} color={"white"} size={30} />
      </TouchableOpacity>
    </View>
  );
}
