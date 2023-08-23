import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { postsScreenArr } from "../../data/posts";
import CustomImgBg from "../../components/CustomImgBg";
import photo from "../../assets/images/userPhoto.jpg";
import SvgComponentDel from "../../assets/images/add-1.svg";
import SvgComponent from "../../assets/images/add-2.svg";
import LogoutIcon from "../../assets/images/log-out.svg";
import { AuthContext } from "../../components/AuthProvider";
import ListItem from "../../components/ListItem";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(postsScreenArr);
  const [userPhoto, setUserPhoto] = useState(photo);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return (
    <>
      <View style={styles.mainContainer}>
        <CustomImgBg>
          <View style={styles.content}>
            <View style={styles.avatarWrapper}>
              {userPhoto && (
                <Image style={{ borderRadius: 16 }} source={userPhoto} />
              )}
              <Pressable
                onPressOut={
                  userPhoto
                    ? () => setUserPhoto(null)
                    : () => setUserPhoto(photo)
                }
              >
                {userPhoto ? (
                  <SvgComponentDel
                    style={{ position: "absolute", bottom: 9, right: -18 }}
                  />
                ) : (
                  <SvgComponent
                    style={{ position: "absolute", top: 75, right: -18 }}
                  />
                )}
              </Pressable>
            </View>
            <Pressable
              style={{ position: "absolute", top: 22, right: 16 }}
              onPressOut={() => {
                setIsAuth(false);
                navigation.navigate("Login");
              }}
            >
              <LogoutIcon />
            </Pressable>
            <Text style={styles.title}>Natali Romanova</Text>

            <View style={styles.listContainer}>
              <FlatList
                data={posts}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </CustomImgBg>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    // paddingBottom: 43,
    paddingBottom: 214,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    resizeMode: "cover",
    // marginTop: "-30%",
    marginTop: -110,
    marginLeft: "auto",
    marginRight: "auto",

    position: "relative",
  },

  title: {
    fontFamily: "Roboto_500Medium",
    color: "#212121",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    marginVertical: 33,
  },

  listContainer: {
    // flex: 1,
    flexGrow: 1,

    backgroundColor: "#FFFFFF",
    // backgroundColor: "#FFFFFF",
    // alignItems: "center",
  },
});
