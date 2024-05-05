import React, { useState, useRef, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  PanResponder,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appointment from "./components/Appointment";
import Card from "./components/Card";
import { useAssets } from "expo-asset";
import Reminder from "./components/Reminder";
import Logo from "./components/Logo";
import ProfileCard from "./components/SearchCard";
import Notifs from "./components/Notifs";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage() {
  const [Aheight, setAheight] = useState(60);
  const [Scroll, setScroll] = useState(0);
  const [Opacity, setOpacity] = useState(0);
  const scrollViewRef = useRef(null);

  const [assets, error] = useAssets([
    require("../../../assets/red.jpg"),
    require("../../../assets/blue.jpg"),
    require("../../../assets/yellow.jpg"),
  ]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (Scroll != 0) return;
      const step = 1;
      const newValue = Math.max(0, Aheight + gesture.dy * step);
      const newValue1 = Math.max(0, Opacity + gesture.dy * 0.01);

      if (newValue > 200 || newValue < 60) return;
      setAheight(newValue);
      setOpacity(newValue1);
    },
    onPanResponderRelease: () => {
      if (Aheight > 150) {
        setAheight(200);
        setOpacity(1);
      } else {
        setAheight(60);
        setOpacity(0);
      }
    },
  });

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setScroll(y);
  };

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    async function clear() {
      await AsyncStorage.removeItem("TOKEN");
      await AsyncStorage.removeItem("HID");
      await AsyncStorage.removeItem("CREDS");
      logout();
    }
    clear();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />

      <Image
        source={require("../../../assets/bg.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <View
          style={(styles.tab, { height: Aheight })}
          {...panResponder.panHandlers}
        >
          <Logo opacity={1 - Opacity} />
          <Notifs opacity={1 - Opacity} click={handleLogout} />
          <ProfileCard opacity={Opacity} />
        </View>
        <View style={styles.toptab} {...panResponder.panHandlers}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "black",
              lineHeight: 32,
              textAlign: "center",
            }}
          >
            Home
          </Text>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={{
            paddingBottom: 80,
            rowGap: 20,
          }}
          scrollEnabled={Aheight <= 60}
          ref={scrollViewRef}
          onScroll={handleScroll}
          // {...panResponder.panHandlers}
        >
          <View style={styles.holder}>
            <Text style={styles.subheading}>Book an Appointment</Text>
            <Appointment />
          </View>
          <View style={styles.holder}>
            <Text style={styles.subheading}>Records</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              {assets && (
                <>
                  <Card
                    text={"Tests"}
                    icon={"test-tube"}
                    image={{ uri: assets[0].localUri }}
                  />
                  <Card
                    text={"Prescriptions"}
                    icon={"medical-bag"}
                    image={{ uri: assets[1].localUri }}
                  />
                  <Card
                    text={"Others"}
                    icon={"file"}
                    image={{ uri: assets[2].localUri }}
                  />
                </>
              )}
            </View>
          </View>
          <View style={styles.holder}>
            <Text style={styles.subheading}>Reminders</Text>
            <Reminder />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  content: {
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
  },
  toptab: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  holder: {
    backgroundColor: "#f8f8f6",
    borderRadius: 20,
    padding: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    paddingTop: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  subheading: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    lineHeight: 32,
    marginLeft: 10,
  },
  tab: {
    flexDirection: "column",
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
