import { Image, StyleSheet, Text, View } from "react-native";

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 60,
          height: 60,
          marginRight: 8,
        }}
        source={require("./../assets/images/userPhoto.jpg")}
        alt="UserImage"
      />
      <View>
        <Text style={styles.userName}>Natali Romanova</Text>
        <Text style={styles.userEmail}>email@example.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "auto",
    height: 60,
    marginVertical: 32,
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.80)",
  },
});
