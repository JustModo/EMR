import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAssets } from "expo-asset";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ContentTab({
  bgval,
  icon,
  cid,
  rid,
  author,
  time,
  recordType,
  title,
  date,
}) {
  const navigation = useNavigation();
  const [Backdrop, setBackdrop] = useState(0);

  const [CID, setCID] = useState(cid);
  const [RID, setRID] = useState(rid);
  const [Author, setAuthor] = useState(author);
  const [TimeVal, setTimeVal] = useState(time);
  const [RecordName, setRecordName] = useState(recordType);
  const [Title, setTitle] = useState(title);

  const iconarr = ["test-tube", "medical-bag", "file"];

  useEffect(() => {
    bgval ? setBackdrop(bgval) : setBackdrop(0);
    icon = icon ? icon : 0;
  }, []);

  const [assets, error] = useAssets([
    require("../../../../assets/red.jpg"),
    require("../../../../assets/blue.jpg"),
    require("../../../../assets/yellow.jpg"),
  ]);

  const handleClick = () => {
    navigation.navigate("Content", {
      CID,
      Author,
      TimeVal,
      RecordName,
      Title,
      date,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      {assets && (
        <Image
          source={{ uri: assets[Backdrop].localUri }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginLeft: 10,
        }}
      >
        <MaterialIcons name={iconarr[icon]} color={"white"} size={40} />

        <View
          style={{
            marginLeft: 10,
            maxWidth: "65%",
          }}
        >
          <Text style={styles.heading} numberOfLines={1} ellipsizeMode="tail">
            {Title}
          </Text>
          <Text
            style={styles.subheading}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {Author}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
            marginRight: 20,
          }}
        >
          <Text style={styles.subheading}>{TimeVal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "95%",
    backgroundColor: "#f8f8f6",
    height: 60,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  heading: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    lineHeight: 20,
  },
  subheading: {
    fontFamily: "Roboto",
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    lineHeight: 16,
  },
});
