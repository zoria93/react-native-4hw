import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { commentPostArr } from "../../data/posts";
import ArrowIcon from "../../assets/images/arrow-up.svg";
import CommentsList from "../../components/CommentsList";

const CommentsScreen = () => {
  const [posts, setPosts] = useState(commentPostArr);
  const [comment, setComment] = useState("");
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const commentHandler = (comment) => setComment(comment);
  const onPressWithoutFeedback = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const onSend = () => {
    if (!comment.trim()) {
      Alert.alert(`Коментар не може бути пустий!`);
      return;
    }
    Alert.alert(`Коментар успішно надіслано!`);
    console.log(comment);
    setComment("");
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={{ ...styles.container, backgroundColor: "#FFFFFF" }}>
      <View style={styles.imgWrapper}>
        <Image
          // source={{ uri: photo }}
          source={require("../../assets/images/sunset.jpg")}
          style={styles.img}
        />
      </View>
      <FlatList
        data={posts.commentsTexts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentsList item={item} />}
      />
      <TouchableWithoutFeedback onPress={onPressWithoutFeedback}>
        <View
          style={{
            position: "relative",
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={100}
            // style={{ flex: 1 }}
          >
            <TextInput
              value={comment}
              style={styles.input}
              onFocus={() => setIsShownKeyboard(true)}
              onChangeText={commentHandler}
              placeholder="Коментувати..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
            />
            <View>
              <TouchableOpacity style={styles.iconContainer} onPress={onSend}>
                <ArrowIcon />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    maxWidth: "100%",

    // alignItems: "center",
  },
  imgWrapper: {
    marginVertical: 32,
  },
  img: {
    resizeMode: "cover",
    borderRadius: 8,
    alignSelf: "center",
    width: "100%",

    height: 240,
  },
  commentWrapper: {
    padding: 16,
    marginBottom: 24,
    width: "55%",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    flexGrow: 1,
    backgroundColor: "#00000008",
  },
  comment: {
    maxWidth: "100%",
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    lineHeight: 18,
  },
  date: {
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 7,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 16,
    height: 50,
    marginBottom: 16,
  },
  iconContainer: {
    position: "absolute",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    // top: -46,
    // left: 30,
    bottom: 24,
    right: 8,
  },
});

export default CommentsScreen;
