import { useAssets } from "expo-asset";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card({ name, title, hosp, image, click }) {
  const [ImageNum, setImageNum] = useState(image);

  const [assets, error] = useAssets([
    require("../../../../assets/doc1.png"),
    require("../../../../assets/doc2.png"),
    require("../../../../assets/doc3.png"),
    require("../../../../assets/doc4.png"),
  ]);

  return (
    <View
      style={{
        width: "100%",
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 2,
          backgroundColor: "pink",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          source={require("../../../../assets/bg.png")}
          style={{ width: "120%", height: "120%", position: "absolute" }}
          resizeMode="stretch"
        />
        <View
          style={{
            height: 120,
            width: 120,
            overflow: "hidden",
            borderRadius: 100,
          }}
        >
          {assets && (
            <Image
              source={{ uri: assets[ImageNum].localUri }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "#f8f8f6",
          height: "100%",
          padding: 10,
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.subtext}>{title}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              height: 30,
              backgroundColor: "black",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
            onPress={click}
          >
            <Text style={styles.text1}>Book an Appointment</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.subtext1}>{hosp}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    lineHeight: 20,
  },
  subtext: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "grey",
    lineHeight: 12,
  },
  subtext1: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "grey",
    lineHeight: 12,
  },
  text1: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
