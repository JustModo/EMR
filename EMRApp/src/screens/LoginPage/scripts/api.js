import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTable } from "../../DashboardPage/scripts/dbHandler";
const baseUrl = "https://emr.modo-dev.com";

export async function handleLogin(username, password) {
  const credentials = {
    username,
    password,
  };

  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const responseBody = await response.text();
    const token = JSON.parse(responseBody).token;
    const HID = JSON.parse(responseBody).HID;
    await AsyncStorage.setItem("TOKEN", token);
    await AsyncStorage.setItem("HID", HID);
    await AsyncStorage.setItem("CREDS", JSON.stringify(credentials));
    createTable(HID);
    return true;
  } catch (error) {
    console.error(error);
    reject("Failed");
  }
}
