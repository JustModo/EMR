import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ImageTab({ handleClick }) {
  return (
    <TouchableOpacity
      style={{
        minWidth: "100%",
        backgroundColor: "#f8f8f6",
        height: 60,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {
          width: 2,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={handleClick}
    >
      <View>
        <MaterialIcons name={"image"} color={"#ababaa"} size={40} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", color: "#777777" }}>
          View Document
        </Text>
      </View>
    </TouchableOpacity>
  );
}
