import * as SQLite from "expo-sqlite";
import { checkConnection, getData } from "./api";

const db = SQLite.openDatabase("emr.db");

export const createTable = (tableName) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS USER_${tableName} (RID INTEGER PRIMARY KEY, CID INTEGER, date TEXT, author TEXT, recordtype TEXT, title TEXT);`,
      [],
      (_, result) => {
        console.log(`Table USER_${tableName} created successfully`);
      },
      (_, error) => {
        console.log(`Error creating table USER_${tableName}:`, error);
      }
    );
  });
};

export const getDataDB = (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM USER_${tableName};`,
        [],
        (_, result) => {
          const rows = result.rows._array;
          resolve(rows);
        },
        (_, error) => {
          console.log(`Error querying table USER_${tableName}:`, error);
          reject(error);
        }
      );
    });
  });
};

export const updateTable = async (HID) => {
  const data = await getData();
  if (!data) return;
  db.transaction((tx) => {
    data.forEach((item) => {
      const { CID, RID, author, date, recordtype, title } = item;
      tx.executeSql(
        `INSERT OR IGNORE INTO USER_${HID} (CID, RID, author, date, recordtype, title) VALUES (?, ?, ?, ?, ?, ?);`,
        [CID, RID, author, date, recordtype, title],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log("Data inserted successfully");
            return true;
          } else {
            console.log("Skipped inserting duplicate RID:", RID);
            return true;
          }
        },
        (_, error) => {
          console.log("Error inserting data:", error);
        }
      );
    });
  });
};
