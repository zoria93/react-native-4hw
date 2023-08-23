import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraIcon from "../assets/images/camera_alt-black.svg";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function CameraComp({ setPhoto, shouldRestart, setShouldRestartCamera }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        setHasPermission(true);
      }
    })();
  }, []);

  useEffect(() => {
    // (async () => {
    if (shouldRestart && cameraRef.current) {
      cameraRef.current.resumePreview();
      setShouldRestartCamera(false);
    }
    // })();
  }, [shouldRestart]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: "center" }}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  // const cancelPreview = async () => {
  //   await cameraRef.current.resumePreview();
  //   setIsPreview(false);
  // };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          skipProcessing: true,
          fixOrientation: true,
        };

        // const { uri } = await cameraRef.takePictureAsync();
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;
        setPhoto(source);

        // if (source) {
        //   await cameraRef.current.pausePreview();
        //   setIsPreview(true);
        // }
        // await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAssetAsync(source);
        console.log("Picture saved successfully.", source);
        // cancelPreview();
      } catch (error) {
        console.error("Error while taking or saving picture:", error);
      }
    }
  };

  const renderCaptureControl = () => (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#d3d3d3" : "#FFFFFF",
          color: pressed ? "#FFFFFF" : "#BDBDBD",
        },
        styles.btn,
      ]}
      disabled={!isCameraReady}
      activeOpacity={0.7}
      onPress={takePhoto}
    >
      <FontAwesome name="camera" size={20} />
    </Pressable>
  );

  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          // ratio={ratio}
          // ratio={"9:16"}
          // pictureSize=""
          type={type}
          autoFocus
          // ref={setCameraRef}
          ref={cameraRef}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.log("camera error", error);
          }}
        >
          <View style={styles.photoView}>
            {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
            {renderCaptureControl()}
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
    position: "relative",
  },
  camera: {
    width: "100%",
    height: "100%",
    // aspectRatio: 3 / 4,
    justifyContent: "center",
    // borderRadius: 8,
    // overflow: "hidden",
    // aspectRatio: 3 / 4,
  },
  photoView: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },

  button: { alignSelf: "center" },

  btn: {
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
