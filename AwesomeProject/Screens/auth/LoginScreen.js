import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../components/AuthProvider";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const navigation = useNavigation();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const reset = () => {
    setEmail("");
    setPassword("");
    setIsHiddenPassword(true);
  };

  const onPressWithoutFeedback = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert("Fill in all the fields!");
      return;
    }
    Alert.alert("Login form data: ", `email: ${email}, password: ${password}`);
    console.log("Login form data: ", `email: ${email}, password: ${password}`);
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    setIsAuth(true);
    navigation.navigate("Home", { screen: "DefaultScreenPosts" });
    reset();
  };

  const togglePassword = () => {
    setIsHiddenPassword((prev) => !prev);
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={onPressWithoutFeedback}
      >
        <ImageBackground
          source={require("../../assets/images/bg-image.png")}
          style={styles.image}
          resizeMode="cover"
        >
          <TouchableWithoutFeedback onPress={onPressWithoutFeedback}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShownKeyboard ? -238 : 0,
              }}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <Text style={styles.title}>Увійти</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor={"#BDBDBD"}
                  name="email"
                  value={email}
                  onChangeText={emailHandler}
                  onFocus={() => setIsShownKeyboard(true)}
                />
                <View style={{ position: "relative", width: "100%" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      marginTop: 16,
                    }}
                    placeholder="Пароль"
                    placeholderTextColor={"#BDBDBD"}
                    name="password"
                    value={password}
                    onChangeText={passwordHandler}
                    secureTextEntry={isHiddenPassword}
                    onFocus={() => setIsShownKeyboard(true)}
                  />
                  <Pressable
                    onPress={togglePassword}
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1B4371",
                        fontSize: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}
                    >
                      {" "}
                      {isHiddenPassword ? "Показати" : "Сховати"}
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#c75502" : "#FF6C00",
                    },
                    styles.btn,
                  ]}
                  onPress={onLogin}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </Pressable>
                <TouchableOpacity>
                  <Text style={styles.linkTitle}>
                    {" "}
                    Немає акаунту?{" "}
                    <Text
                      style={styles.linkUnderlined}
                      onPress={() => navigation.navigate("Registration")}
                    >
                      Зареєструватися
                    </Text>
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    paddingBottom: 8,
    paddingHorizontal: 16,
  },

  title: {
    fontFamily: "Roboto_500Medium",
    color: "#212121",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.3,
    textAlign: "center",
    marginVertical: 33,
  },

  input: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,

    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
    backgroundColor: "#F6F6F6",

    height: 50,

    color: "#212121",
    padding: 16,
  },

  btn: {
    alignItems: "center",
    maxWidth: "100%",
    paddingVertical: 16,

    fontSize: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#ffffff",

    fontFamily: "Roboto_400Regular",
    fontSize: 16,

    fontWeight: 400,
    lineHeight: 19,
  },

  linkTitle: {
    textAlign: "center",
    color: "#1b4371",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 132,
  },
  linkUnderlined: {
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#1b4371",
  },
});
