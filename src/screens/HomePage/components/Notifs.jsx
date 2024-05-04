import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Notifs({ opacity, click }) {
  return (
    <View
      style={{
        height: 55,
        width: 55,
        borderRadius: 5,
        padding: 5,
        marginRight: 5,
        position: "absolute",
        opacity,
        right: 0,
        top: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={click}>
        <MaterialIcons
          name={"logout"}
          color={"white"}
          size={30}
          style={{ width: "100%", height: "100%", borderRadius: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}
