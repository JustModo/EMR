import React, { useContext } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../../navigation/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notifs({ opacity }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    async function clear() {
      try {
        await AsyncStorage.removeItem("TOKEN");
        await AsyncStorage.removeItem("HID");
        await AsyncStorage.removeItem("CREDS");
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      } finally {
        logout();
      }
    }
    clear();
  };

  return (
    <View
      style={{
        height: 55,
        width: 55,
        borderRadius: 5,
        padding: 5,
        marginRight: 5,
        position: "absolute",
        opacity,
        right: 0,
        top: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons
          name={"logout"}
          color={"white"}
          size={30}
          style={{ width: "100%", height: "100%", borderRadius: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}
