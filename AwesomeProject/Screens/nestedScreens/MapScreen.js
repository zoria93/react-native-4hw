import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  console.log("route.params in map", route.params);

  useEffect(() => {
    if (route.params && route.params.coords) {
      (async () => {
        // let { status } = await Location.requestForegroundPermissionsAsync();
        // if (status !== "granted") {
        //   // console.log("Permission to access location was denied");
        //   // setErrorMsg("Permission to access location was denied");
        //   return;
        // }

        try {
          // let location = await Location.getCurrentPositionAsync({});
          // const coords = {
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // };
          const coords = await route.params.coords;
          setLocation(coords);
          setErrorMsg("");
          console.log("useEffect in map");
        } catch (error) {
          setErrorMsg("Error getting location");
          console.log(error);
        }
      })();
    }
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    alert(text);
  } else if (location) {
    text = JSON.stringify(location);
    alert(text);
  }

  return (
    <View style={styles.container}>
      {/* {errorMsg ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{text}</Text>
        </View> */}

      <MapView
        style={styles.mapStyle}
        initialRegion={{
          // ...coords,
          longitude: location?.longitude,
          latitude: location?.latitude,
          longitudeDelta: 0.0421,
          latitudeDelta: 0.0922,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title="I am here"
            coordinate={{
              longitude: location?.longitude,
              latitude: location?.latitude,
            }}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
