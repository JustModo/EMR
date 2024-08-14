import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://emr.modo-dev.com";

export async function getRecordData(CID) {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    // console.log(CID);
    const response = await fetch(`${baseUrl}/datareq`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CID: CID,
      }),
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

export async function getImage(path) {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    // console.log(path);
    const response = await fetch(`${baseUrl}/getimage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: path,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const responseBody = await response.blob();
    // console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    // reject("Failed");
  }
}

export async function downloadImage(path) {
  const token = await AsyncStorage.getItem("TOKEN");

  try {
    const response = await fetch(`${baseUrl}/download`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: path,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const imageBlob = await response.blob();

    return imageBlob;
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}
