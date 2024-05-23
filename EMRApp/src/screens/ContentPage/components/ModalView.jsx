import React from "react";
import { ActivityIndicator, Image, Modal, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BackButton from "./BackButton";
import DownloadButton from "./DownloadButton";

export default function ModalView({
  modalVisible,
  isOnline,
  ImageData,
  goBack,
  saveData,
  isDownloaded,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={goBack}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        {isOnline || isDownloaded ? (
          !ImageData ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <Image
              source={{ uri: ImageData }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              placeholder={"helo"}
              transition={1000}
            />
          )
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <MaterialIcons name={"wifi-alert"} color={"white"} size={50} />
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>
              Offline
            </Text>
          </View>
        )}
        <BackButton style={{ top: 10 }} handleClick={goBack} />
        {isOnline || isDownloaded ? (
          <DownloadButton
            style={{ top: 10 }}
            handleClick={saveData}
            icon={isDownloaded}
          />
        ) : (
          <></>
        )}
      </View>
    </Modal>
  );
}
