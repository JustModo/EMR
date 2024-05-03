import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = "https://emr.modo-dev.com";

export async function getData() {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    // console.log(token);
    const response = await fetch(`${baseUrl}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const responseBody = await response.json();
    // console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    // reject("Failed");
  }
}
