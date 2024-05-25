import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function Reminder() {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();
  // Function to fetch appointments from AsyncStorage
  const getAppointments = async () => {
    try {
      const data = await AsyncStorage.getItem("APPOINT");
      if (data) {
        setAppointments(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error retrieving appointments:", error);
    }
  };

  // Function to remove appointment by date
  const removeAppointment = async (appointment) => {
    try {
      const filteredAppointments = appointments.filter(
        (date) => date !== appointment
      );
      setAppointments(filteredAppointments);
      await AsyncStorage.setItem(
        "APPOINT",
        JSON.stringify(filteredAppointments)
      );
    } catch (error) {
      console.error("Error removing appointment:", error);
    }
  };

  // Hook to fetch appointments when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getAppointments();
    }, [])
  );

  // Render appointments or "No Reminders..." text based on the appointments state
  const renderAppointments = () => {
    const reversedAppointments = [...appointments].reverse(); // Reverse the order of appointments
    if (reversedAppointments.length === 0) {
      return (
        <View style={styles.reminderContainer}>
          <Text style={styles.noRemindersText}>No Reminders...</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Appoint")}
          >
            <MaterialIcons
              name={"calendar-plus"}
              color={"#868587"}
              size={40}
              style={{ alignSelf: "center", marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.scrollContainer}>
          {reversedAppointments.map((appointment, index) => (
            <View style={styles.appointmentItem}>
              <Text style={styles.appointmentText}>{appointment}</Text>
              <TouchableOpacity
                key={index}
                onPress={() => removeAppointment(appointment)}
              >
                <MaterialIcons
                  name={"trash-can"}
                  color={"#868587"}
                  size={20}
                  style={{ alignSelf: "center", marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  return <View style={{ flex: 1 }}>{renderAppointments()}</View>;
}

const styles = StyleSheet.create({
  reminderContainer: {
    height: 180,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  noRemindersText: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
    color: "#868587",
    lineHeight: 32,
  },
  addButton: {
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  appointmentItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appointmentText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#868587",
  },
});
