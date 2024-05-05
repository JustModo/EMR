import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { getImage, getRecordData } from "./scripts/api";
import BackButton from "./components/BackButton";
import ImageTab from "./components/ImageTab";
import { AuthContext } from "../../navigation/AuthContext";
import NoInternet from "./components/NoInternet";
import ModalView from "./components/ModalView";

export default function ContentPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { CID, Author, TimeVal, RecordName, Title, date } = route.params;
  const [cid, setCid] = useState(CID);
  const [ImageData, setImageData] = useState(null);
  const [TextData, setTextData] = useState(null);
  const [UIElements, setUIElements] = useState(null);

  const { checkIsOnline, isOnline } = useContext(AuthContext);

  const handleClick = () => {
    navigation.goBack();
  };

  const saveData = () => {
    console.log("saved");
  };

  useEffect(() => {
    const getData = async () => {
      const status = await checkIsOnline();
      if (!status) return;

      const data = await getRecordData(CID);
      if (!data) return;
      setTextData(JSON.parse(data).text);

      const parsedData = JSON.parse(data);
      const path = parsedData.image;
      if (!path) return;
      await setImage(path);
    };

    getData();
  }, []);

  useEffect(() => {
    const updateUI = () => {
      if (!TextData) return;
      const data = JSON.parse(TextData);
      return data.map((entry, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            width: "100%",
            padding: 10,
            flexDirection: "column",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "black" }}>
            {entry.title}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>{entry.content}</Text>
        </View>
      ));
    };
    setUIElements(updateUI());
  }, [TextData]);

  async function setImage(path) {
    const image = await getImage(path);
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(image);
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        hidden={modalVisible}
        animated={true}
        hideTransitionAnimation="slide"
      />
      <Image
        source={require("../../../assets/bg.png")}
        style={styles.image}
        resizeMode="cover"
      />
      {!modalVisible && (
        <BackButton style={{ top: 40 }} handleClick={handleClick} />
      )}
      {!isOnline && <NoInternet style={{ top: 40 }} />}

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View style={styles.toptab}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                minWidth: "75%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {Title}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 10,
                color: "grey",
                maxWidth: "75%",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {Author}
            </Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 12, color: "grey" }}>
            {date}
          </Text>
        </View>
        {UIElements ? (
          <ScrollView
            style={styles.content}
            contentContainerStyle={{
              paddingBottom: 80,
              rowGap: 10,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>
              Report
            </Text>
            {UIElements}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
        <ImageTab handleClick={() => setModalVisible(true)} />
      </View>
      <ModalView
        modalVisible={modalVisible}
        isOnline={isOnline}
        ImageData={ImageData}
        goBack={() => setModalVisible(false)}
        saveData={saveData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
  },
  container: {
    height: "100%",
    paddingTop: 60,
  },
  content: {
    backgroundColor: "#ffffff",
  },
  toptab: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingTop: 40,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
