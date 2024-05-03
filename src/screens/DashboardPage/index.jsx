import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentTab from "./components/ContentTab";
import SearchBar from "./components/SearchBar";
import { StatusBar } from "expo-status-bar";
import { formatDate, formatTime } from "./scripts/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataDB, updateTable } from "./scripts/dbHandler";

export default function DashboardPage() {
  const [UI, setUI] = useState([]);
  const [HID, setHID] = useState("");

  async function handleClick() {
    //   // const data = await getData();
    //   await updateTable(HID, display);
    //   display();
  }

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    const refresh = async () => {
      try {
        const data = await getDataDB(HID);
        console.log(data);
        if (data) {
          displayUI(data);
        } else {
          console.log("No data received from DB");
        }
      } catch (error) {
        console.error("Error while displaying data:", error);
      } finally {
        setRefreshing(false);
      }
    };
  };

  const display = async (HID) => {
    try {
      const data = await getDataDB(HID);
      console.log(data);
      if (data) {
        displayUI(data);
      } else {
        console.log("No data received from DB");
      }
    } catch (error) {
      console.error("Error while displaying data:", error);
    }
  };

  const displayUI = (data) => {
    if (!data) return;
    const groupedData = data.reduce((acc, obj) => {
      const date = obj.date.split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({ ...obj });

      return acc;
    }, {});
    // console.log(groupedData);
    setUI(groupedData);
  };

  useEffect(() => {
    async function start() {
      const HID = await AsyncStorage.getItem("HID");
      setHID(HID);
      await display(HID);
      await updateTable(HID);
      await display(HID);
    }
    start();
  }, []);

  const getTabDesign = (data) => {
    if (data === "Test") {
      return 0;
    } else if (data === "Prescription") {
      return 1;
    } else return 2;
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#2bf598" auto />

      <View style={styles.container}>
        <Image
          source={require("../../../assets/bg.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.toptab}>
          <SearchBar handlePress={handleClick} />
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={{
            paddingBottom: 80,
            rowGap: 10,
            alignItems: "center",
            padding: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {UI &&
            Object.entries(UI)
              .reverse()
              .map(([date, entries]) => (
                <View
                  key={date}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{formatDate(date)}</Text>
                  {entries
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .reverse()
                    .map((entry) => (
                      <View
                        key={entry.RID}
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          marginVertical: 5,
                        }}
                      >
                        <ContentTab
                          bgval={getTabDesign(entry.recordtype)}
                          icon={getTabDesign(entry.recordtype)}
                          cid={entry.CID}
                          rid={entry.RID}
                          author={entry.author}
                          recordType={entry.recordtype}
                          time={formatTime(entry.date)}
                        />
                      </View>
                    ))}
                </View>
              ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
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
  },
});
