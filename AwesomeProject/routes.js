import React from "react";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import HomeScreen from "./Screens/mainScreen/HomeScreen";
import { BottomTabNavigator } from "./components/BottomTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";
import MapScreen from "./Screens/nestedScreens/MapScreen";
import { Pressable } from "react-native";
import BackIcon from "./assets/images/arrow-left.svg";

const MainStack = createStackNavigator();

// export const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <MainStack.Navigator
//         initialRouteName="Registration"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <MainStack.Screen name="Registration" component={RegistrationScreen} />

//         <MainStack.Screen name="Login" component={LoginScreen} />
//         <MainStack.Screen name="Home" component={HomeScreen} />
//         {/* <MainStack.Screen
//           name="Comments"
//           component={CommentsScreen}
//           options={{
//             headerTitle: "Коментарі",
//             // tabBarLabel: "Коментарі",
//             headerTitleAlign: "center",
//           }}
//         /> */}
//       </MainStack.Navigator>
//     );
//   }
//   return (
//     <MainStack.Navigator
//       screenOptions={
//         {
//           // headerShown: false, додати хед
//         }
//       }
//     >
//       <MainStack.Screen name="Home" component={HomeScreen} />
//     </MainStack.Navigator>
//   );
// };

const screenOptions = ({ navigation, route }) => ({
  headerShown: true,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "Roboto_500Medium",
    fontStyle: "normal",
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  headerStyle: {
    height: 88,
    borderBottomWidth: 1,
    boxShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)",
    // backdropFilter: "blur(13.591408729553223px)",
  },
  tabBarShowLabel: false,
  // headerShadowVisible: false,
  tabBarStyle: {
    height: 71,
    paddingTop: 17,
    paddingBottom: 30,
    paddingHorizontal: 90,
    boxShadow: " 0px -0.5px 0px 0px rgba(0, 0, 0, 0.30)",
    backdropFilter: "blur(13.591408729553223px)",
    borderTopWidth: 1,
  },
  headerLeft: () => {
    return (
      <Pressable
        style={{ marginLeft: 16 }}
        onPress={() => {
          navigation.navigate("Home");
          // navigation.goBack();
          // console.log("back in main routes");
        }}
      >
        <BackIcon />
      </Pressable>
    );
  },
});

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen name="Home" component={HomeScreen} />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerRight: null,
        }}
      />

      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerRight: null,
        }}
      />
    </MainStack.Navigator>
  );
};
