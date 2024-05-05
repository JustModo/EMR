import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { getImage, getRecordData } from "./scripts/api";
import BackButton from "./components/BackButton";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageTab from "./components/ImageTab";
import DownloadButton from "./components/DownloadButton";
import { AuthContext } from "../../navigation/AuthContext";
import NoInternet from "./components/NoInternet";

export default function ContentPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { CID, Author, TimeVal, RecordName, Title, date } = route.params;
  const [cid, setCid] = useState(CID);
  const [ImageData, setImageData] = useState(null);
  const [TextData, setTextData] = useState([]);

  const { checkIsOnline, isOnline } = useContext(AuthContext);

  const handleClick = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getData = async () => {
      const status = await checkIsOnline();
      if (!status) return;
      const data = await getRecordData(CID);
      if (!data) return;
      // console.log(JSON.parse(data).text);
      // setTextData(JSON.parse(data).text);
      const path = JSON.parse(data).image;
      if (!path) return;
      await setImage(path);
    };
    getData();
  }, []);

  async function setImage(path) {
    const image = await getImage(path);
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(image);
  }

  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   if (Object.keys(JsonText).length === 0) return;
  //   Object.keys(JSON.parse(JsonText.text)).map((key) => {
  //     console.log(key);
  //     console.log(JSON.parse(JsonText.text)[key]);
  //   });
  // }, [JsonText]);

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
      <BackButton style={{ top: 40 }} handleClick={handleClick} />
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
        <ScrollView
          style={styles.content}
          contentContainerStyle={{
            paddingBottom: 80,
            rowGap: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          {/* {TextData &&
            TextData.map((obj, index) => (
              <View key={index}>
                {Object.entries(obj).map(([key, value]) => (
                  <Text key={key}>
                    Key: {key}, Value: {value}
                  </Text>
                ))}
              </View>
            ))} */}
        </ScrollView>
        <ImageTab handleClick={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        >
          {isOnline ? (
            !ImageData ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <Image
                source={{ uri: ImageData }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
                placeholder={"helo"}
                transition={1000}
              />
            )
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <MaterialIcons name={"wifi-alert"} color={"white"} size={50} />
              <Text
                style={{ fontWeight: "bold", fontSize: 30, color: "white" }}
              >
                Offline
              </Text>
            </View>
          )}
          <BackButton handleClick={() => setModalVisible(false)} />
          {isOnline && <DownloadButton handleClick={handleClick} />}
        </View>
      </Modal>
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    // height: "70%",
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
