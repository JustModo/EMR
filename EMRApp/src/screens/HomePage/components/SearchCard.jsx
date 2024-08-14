import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchCard({ opacity }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Call the onSearch prop with the searchQuery
    onSearch(searchQuery);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "90%",
        // borderRadius: 20,
        opacity,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: 5,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          //   backgroundColor: "red",
          flex: 1,
        }}
      >
        <Text style={styles.text}>Hello Name,</Text>
        <Text style={styles.subtext}>What are you looking for?</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-evenly",
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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <MaterialIcons name={"text-search"} color={"white"} size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    lineHeight: 30,
    textAlign: "center",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 2,
  },
  subtext: {
    fontFamily: "Roboto",
    fontSize: 22,
    color: "#333333",
    lineHeight: 28,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 2,
  },
});
