import React from "react";
import { Image, View } from "react-native";

export default function Logo({ opacity }) {
  return (
    <View
      style={{
        height: 45,
        width: 45,
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
        position: "absolute",
        opacity,
        top: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../../../assets/IDMLOGOm.png")}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
    </View>
  );
}
