import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
// import CommentsScreen from "../nestedScreens/CommentsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import { Pressable } from "react-native";
import LogoutIcon from "../../assets/images/log-out.svg";
import { AuthContext } from "../../components/AuthProvider";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import BackIcon from "../../assets/images/arrow-left.svg";

const NestedStack = createStackNavigator();
const screenOptions = ({ navigation, route }) => ({
  title: "Публікації",
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
  // headerShadowVisible: false,

  // tabBarShowLabel: false,
  tabBarStyle: {
    display: "none,",
  },
  headerLeft: () => {
    return (
      <Pressable
        style={{ marginLeft: 16 }}
        onPress={() => {
          navigation.navigate("Posts");
        }}
      >
        <BackIcon />
      </Pressable>
    );
  },
});

const PostsScreen = ({ navigation }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  // const navigation = useNavigation();

  return (
    // <NestedScreen.Navigator
    //   initialRouteName="DefaultScreen"
    //   screenOptions={screenOptions}
    // >
    //   <NestedScreen.Screen
    //     name="Публікації"
    //     component={DefaultScreenPosts}
    //     options={{
    //       // headerShown: false,
    //       headerLeft: false,
    //       headerRight: () => {
    //         return (
    //           <Pressable
    //             style={{ marginRight: 16 }}
    //             onPressOut={() => {
    //               setIsAuth(false);
    //               navigation.navigate("Login");
    //             }}
    //           >
    //             <LogoutIcon />
    //           </Pressable>
    //         );
    //       },
    //     }}
    //   />
    //   <NestedScreen.Screen
    //     name="Maps"
    //     component={MapScreen}
    //     options={{
    //       headerTitle: "Карти",
    //       // tabBarLabel: "Карти",
    //       headerTitleAlign: "center",
    //       headerLeft: () => {
    //         return (
    //           <Pressable
    //             style={{ marginLeft: 16 }}
    //             onPress={() => {
    //               navigation.navigate("Публікації");
    //             }}
    //           >
    //             <BackIcon />
    //           </Pressable>
    //         );
    //       },
    //     }}
    //   />
    //   <NestedScreen.Screen
    //     name="Comments"
    //     component={CommentsScreen}
    //     options={{
    //       headerTitle: "Коментарі",
    //       // tabBarLabel: "Коментарі",
    //       headerTitleAlign: "center",
    //       // tabBarVisible: false,
    //       // tabBarStyle: {
    //       //   display: "none",
    //       // },
    //       // tabBarHideOnKeyboard: true,
    //     }}
    //   />
    // </NestedScreen.Navigator>
    <NestedStack.Navigator screenOptions={screenOptions}>
      <NestedStack.Screen
        name="Posts"
        component={DefaultScreenPosts}
        options={{
          headerLeft: false,
          headerRight: () => {
            return (
              <Pressable
                style={{ marginRight: 16 }}
                onPressOut={() => {
                  setIsAuth(false);
                  navigation.navigate("Login");
                }}
              >
                <LogoutIcon />
              </Pressable>
            );
          },
        }}
      />
      <NestedStack.Screen
        name="Maps"
        component={MapScreen}
        options={{
          headerTitle: "Карти",
          // tabBarLabel: "Карти",
          headerTitleAlign: "center",
          
        }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Коментарі",
          // tabBarLabel: "Коментарі",
          headerTitleAlign: "center",
          // tabBarVisible: false,
          // tabBarStyle: {
          //   display: "none",
          // },
          // tabBarHideOnKeyboard: true,
        }}
      />
    </NestedStack.Navigator>
  );
};

export default PostsScreen;
