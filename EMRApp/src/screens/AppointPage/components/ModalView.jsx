import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalView({ visible, onClose }) {
  const [appointmentSet, setAppointmentSet] = useState(false);

  const handleSetAppointment = async () => {
    console.log("Appointment set");
    setAppointmentSet(true);
    let data = await AsyncStorage.getItem("APPOINT"); // Get the existing array from AsyncStorage
    data = data != null ? JSON.parse(data) : []; // Parse the existing array or initialize a new one
    data.push(date.toDateString()); // Push the new appointment date into the array
    console.log(data);
    await AsyncStorage.setItem("APPOINT", JSON.stringify(data)); // Save the u

    setTimeout(() => {
      setAppointmentSet(false);
      onClose();
    }, 1500);
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // For iOS, set showPicker to false to close the picker automatically
    if (Platform.OS === "android") {
      hideDatePicker(); // Dismiss the picker manually
    }
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {appointmentSet ? (
            <View style={styles.tickContainer}>
              <MaterialIcons name={"check-bold"} color={"green"} size={40} />
              <Text style={styles.tickText}>Appointment Set!</Text>
            </View>
          ) : (
            <>
              <Text style={styles.title}>Book an Appointment?</Text>
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  onCancel={hideDatePicker}
                />
              )}
              <TouchableOpacity onPress={showDatePicker}>
                <Text
                  style={{
                    color: "grey",
                    textDecorationLine: "underline",
                    margin: 15,
                  }}
                >
                  Select Date
                </Text>
              </TouchableOpacity>
              <View style={{ margin: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Appointment on:</Text>
                <Text>{date.toDateString()}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSetAppointment}
              >
                <Text style={styles.buttonText}>Set Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    width: "90%",
    gap: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {},
  closeButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  tickContainer: {
    alignItems: "center",
  },
  tickText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
});
