import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import Share from "react-native-share";

const ShareImage = () => {
  // create a ref
  const viewRef = useRef();
  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Image Download Permission",
          message: "Your permission is required to save images to your device",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        "",
        "Your permission is required to save images to your device",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      // handle error as you please
      console.log("err", err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.8,
      });

      if (Platform.OS === "android") {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, "photo");
      if (image) {
        Alert.alert(
          "",
          "Image saved successfully.",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.8,
      });
      console.log("uri", uri);
      const shareResponse = await Share.open({ url: uri });
      console.log("shareResponse", shareResponse);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <View style={styles.savedComponent} ref={viewRef}>
              <Text style={styles.text}> Component to be saved </Text>
              <Image
                source={{
                  uri:
                    "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=75&w=126",
                }}
                style={styles.image}
              />
              <Text style={styles.text}>Some random text saved</Text>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={shareImage}>
                <Text>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={downloadImage}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  body: {
    marginTop: 100,
    alignItems: "center",
  },
  savedComponent: {
    backgroundColor: "white",
    marginBottom: 30,
  },
  text: {
    textAlign: "center",
  },
  image: {
    width: 252,
    height: 150,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 5,
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "75%",
  },
  button: {
    backgroundColor: "#ad4fcc",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 5,
  },
});

export default ShareImage;
