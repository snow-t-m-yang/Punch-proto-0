import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { GestureHandleRootView } from "react-native-gesture-handler";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const PlaceHolderImages = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickIamgeAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("No image is selected");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {};

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandleRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceHolderImages}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker
              imageSize={40}
              stickerSource={pickedEmoji}
            />
          ) : null}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton
                icon="refresh"
                label="Reset"
                onPress={onReset}
              />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickIamgeAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        <EmojiPicker
          isVisible={isModalVisible}
          onClose={onModalClose}
        >
          <EmojiList
            onSelect={setPickedEmoji}
            onCloseModal={onModalClose}
          />
        </EmojiPicker>
        <StatusBar style="auto" />
      </View>
    </GestureHandleRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },

  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
