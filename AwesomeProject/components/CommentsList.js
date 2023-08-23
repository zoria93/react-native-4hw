import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";

const CommentsList = ({ item }) => {
  const isChangedPosition = item?.userAvatar === 20;
    console.log("isChangedPosition", isChangedPosition);
//   console.log("item", item?.userAvatar);
  return (
    <View
      style={{
        // flexDirection: "row",
        flexDirection: isChangedPosition ? "row-reverse" : "row",
        maxWidth: "100%",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <Image
        source={item.userAvatar}
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
          backgroundColor: "#fff",
        }}
      />
      <View style={styles.commentWrapper}>
        <Text style={styles.comment}>{item.text}</Text>
        <Text style={styles.date}>
          {item.date} | {item.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CommentsList;
