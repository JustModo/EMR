import React from "react";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchBar({ handlePress }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        backgroundColor: "#f8f8f6",
        padding: 5,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          height: 40,
          maxWidth: "85%",
          borderRadius: 10,
          paddingHorizontal: 10,
          backgroundColor: "white",
        }}
        placeholder="Search..."
        // value={searchQuery}
        // onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={handlePress}>
        <MaterialIcons name={"text-search"} color={"black"} size={35} />
      </TouchableOpacity>
    </View>
  );
}
