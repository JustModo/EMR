import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ModalView({ visible, onClose }) {
  const [appointmentSet, setAppointmentSet] = useState(false);

  const handleSetAppointment = () => {
    console.log("Appointment set");
    setAppointmentSet(true);

    setTimeout(() => {
      setAppointmentSet(false);
      onClose();
    }, 1500);
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
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
