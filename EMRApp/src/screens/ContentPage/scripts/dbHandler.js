import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("emr.db");

export const updateContentTable = async (data) => {
  if (!data) return;
  const HID = await AsyncStorage.getItem("HID");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const { CID, content } = data;
      tx.executeSql(
        `INSERT OR REPLACE INTO CONTENT_${HID} (CID, content) VALUES (?, ?);`,
        [CID, content],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log("Data inserted or replaced successfully");
            resolve(true);
          } else {
            console.log("Error inserting or replacing data");
            reject(false);
          }
        },
        (_, error) => {
          console.log("Error inserting data:", error);
        }
      );
    });
  });
};

export const updateImageinTable = async (data) => {
  if (!data) return;
  const HID = await AsyncStorage.getItem("HID");
  db.transaction((tx) => {
    const { CID, image } = data;
    tx.executeSql(
      `UPDATE CONTENT_${HID} SET image = ? WHERE CID = ?;`,
      [image, CID],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log("Image updated successfully");
          return true;
        } else {
          console.log("No rows affected, CID not found");
          return false;
        }
      },
      (_, error) => {
        console.log("Error updating image:", error);
        reject(error);
      }
    );
  });
};

export const getContentTable = async (CID) => {
  if (!CID) return;
  const HID = await AsyncStorage.getItem("HID");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT image, content FROM CONTENT_${HID} WHERE CID = ?;`,
        [CID],
        (_, resultSet) => {
          //   console.log(resultSet.rows);
          if (resultSet.rows.length > 0) {
            resolve(resultSet.rows._array[0]);
          } else {
            resolve({ content: null, image: null });
            console.log("No data found for CID: " + CID);
          }
        },
        (_, error) => {
          reject("Error executing SELECT query: " + error);
          console.error("Error executing SELECT query: " + error);
        }
      );
    });
  });
};
