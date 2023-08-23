import { useContext, useEffect, useState } from "react";
import { Button, View } from "react-native";
import UserInfo from "../../components/UserInfo";
import { postsScreenArr } from "../../data/posts";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ListItem from "../../components/ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../components/GlobalStateProvider";
import { useNavigation } from "@react-navigation/native";

export default function DefaultScreenPosts() {
  // const navigation = useNavigation();
  // const [coords, setCoords] = useState({});

  // console.log("routeParams", route.params);
  // if (route.params) {
  //   setCoords(route.params);
  // }
  const [posts, setPosts] = useState(postsScreenArr);
  const { isRefetchedPosts } = useContext(GlobalContext);
  // const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const storedPosts = await AsyncStorage.getItem("posts");
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        // setPosts(parsedPosts);
        // setPosts([]);
        setPosts([...postsScreenArr, ...parsedPosts]);
      }
    };

    getPosts();
  }, [isRefetchedPosts]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<UserInfo />}
        data={posts}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
});
