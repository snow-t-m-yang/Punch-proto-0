import { StyleSheet, Image } from "react-native";

const ImageViewer = ({ placeholderImageSource }) => {
  return (
    <Image
      source={placeholderImageSource}
      styles={styles.Image}
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
