import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../ContentPage/components/BackButton";
import SearchBar from "../DashboardPage/components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import Card from "./components/Card";
import ModalView from "./components/ModalView";

export default function AppointPage() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <ModalView visible={modalVisible} onClose={closeModal} />

      <Image
        source={require("../../../assets/bg.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <BackButton style={{ top: 40 }} handleClick={() => navigation.goBack()} />
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View style={styles.toptab}>
          <SearchBar handlePress={() => {}} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{
            paddingBottom: 80,
            rowGap: 10,
            alignItems: "center",
            padding: 10,
          }}
        >
          <Card
            name={"Dr. Emily Patel"}
            title={"Neurology"}
            hosp={"Lakeside Regional Hospital"}
            image={3}
            click={() => openModal()}
          />
          <Card
            name={"Dr. Michael Chang"}
            title={"Pediatrics"}
            hosp={"Summit Medical Center"}
            image={0}
            click={() => openModal()}
          />
          <Card
            name={"Dr. David Nguyen"}
            title={"Orthopedic Surgery"}
            hosp={"Pinecrest Orthopedic Institute"}
            image={1}
            click={() => openModal()}
          />
          <Card
            name={"Dr. Sophia Rodriguez"}
            title={"Cardiology"}
            hosp={"Mercy General Hospital"}
            image={2}
            click={() => openModal()}
          />
        </ScrollView>
      </View>
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
    paddingTop: 30,

    height: "100%",
  },
  toptab: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    paddingTop: 40,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
