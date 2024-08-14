import AsyncStorage from "@react-native-async-storage/async-storage";
// import { handleLogin } from "../../LoginPage/scripts/api";
const baseUrl = "https://emr.modo-dev.com";

export async function getData(logout) {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    console.log(token);
    const response = await fetch(`${baseUrl}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.status;
      throw new Error(errorMessage);
    }

    const responseBody = await response.json();
    // console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    if (error.message === "403" || error.message === "401") {
      await reLogin(logout);
    }
  }
}

async function reLogin(logout) {
  const creds = await AsyncStorage.getItem("CREDS");
  const parsedcreds = JSON.parse(creds);
  const status = await handleLogin(
    parsedcreds.username,
    parsedcreds.password,
    logout
  );
  status ? console.log("Relogged") : console.log("Failed");
}

export async function checkConnection() {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function handleLogin(username, password) {
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

    return true;
  } catch (error) {
    console.error(error);
    await AsyncStorage.removeItem("TOKEN");
    await AsyncStorage.removeItem("HID");
    await AsyncStorage.removeItem("CREDS");
    logout();
  }
}
