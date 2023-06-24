import { StyleSheet, Image } from "react-native";

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return (
    <Image
      source={imageSource}
      style={styles.Image}
    />
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
