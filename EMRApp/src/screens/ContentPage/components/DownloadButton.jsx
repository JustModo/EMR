import React from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DownloadButton({ handleClick, style, icon }) {
  return (
    <View
      style={{
        position: "absolute",
        minHeight: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3,
        right: 10,
        ...style,
      }}
    >
      <TouchableOpacity onPress={handleClick} disabled={icon}>
        <MaterialIcons
          name={icon ? "check-bold" : "download"}
          color={"white"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
}
