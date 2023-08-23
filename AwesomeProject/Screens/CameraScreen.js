import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  // const [cameraRef, setCameraRef] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //   const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState("");
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  // useEffect(() => {
  //   console.log(type);
  // }, [type]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    // return <Text>No access to camera</Text>;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //   if (!permission.granted) {
  //     // Camera permissions are not granted yet
  //     return (
  //       <View style={styles.container}>
  //         <Text style={{ textAlign: "center" }}>
  //           We need your permission to show the camera
  //         </Text>
  //         <Button onPress={requestPermission} title="grant permission" />
  //       </View>
  //     );
  //   }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };

        // const { uri } = await cameraRef.takePictureAsync();
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;
        setPhoto(source);

        if (source) {
          await cameraRef.current.pausePreview();
          setIsPreview(true);
        }
        // await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAssetAsync(source);
        console.log("Picture saved successfully.", source);
      } catch (error) {
        console.error("Error while taking or saving picture:", error);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const renderCaptureControl = () => (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      disabled={!isCameraReady}
      onPress={takePhoto}
    >
      <View style={styles.takePhotoOut}>
        <View style={styles.takePhotoInner}></View>
      </View>
    </TouchableOpacity>
  );

  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <Camera
        style={styles.camera}
        // ratio="16:9"
        type={type}
        // ref={setCameraRef}
        ref={cameraRef}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}
      >
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            disabled={!isCameraReady}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Flip
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={takePhoto}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity> */}
        </View>
      </Camera>
      <View style={styles.container}>
        {isPreview && renderCancelPreviewButton()}
        {!isPreview && renderCaptureControl()}
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
// const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, aspectRatio: 3 / 4 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    aspectRatio: 3 / 4,
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  // takePhotoOut: {
  //   borderWidth: 2,
  //   borderColor: "white",
  //   height: 50,
  //   width: 50,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 50,
  // },

  // takePhotoInner: {
  //   borderWidth: 2,
  //   borderColor: "white",
  //   height: 40,
  //   width: 40,
  //   backgroundColor: "white",
  //   borderRadius: 50,
  // },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    // borderRadius: 5,
    // height: captureSize,
    // width: captureSize,
    height: 240,
    width: "100%",
    borderRadius: 8,
    // borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
