import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as firebase from "firebase";

import ReviewCard from "../Components/ReviewCard";

import { logout } from "../api/user";
import { render_posts } from "../api/posts";
const Profile = ({ navigation, setSignedIn }) => {
  let currentUser = firebase.auth().currentUser;
  const [review_data, setReviewData] = useState([]);

  const nav = (data) => {
    navigation.navigate("Review", { data, image, name });
  };
  const fetch = async () => {
    const x = await render_posts("owner", currentUser.uid);
    setReviewData(x);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.settingsGear}>
        {/* GEAR NOT WORKING SO WE GOTTA FIX THAT */}
        <TouchableOpacity
          onPress={() => {
            logout();
            setSignedIn(false);
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRow}>
        <Image
          style={styles.profilePic}
          alt="profile-pic"
          source={require("../assets/bp.png")}
        />
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text>Reviews</Text>
          <Text>123</Text>
        </View>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text>Average Rating</Text>
          <Text>123</Text>
        </View>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text>Average Rating</Text>
          <Text>123</Text>
        </View>
      </View>
      <Text style={styles.username}>{currentUser.displayName}</Text>
      <View style={styles.bioEditView}>
        <Text>Bio</Text>
        <TouchableOpacity style={styles.editAccountBtn}>
          <Text>Edit Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewMediaHeader}>
        <TouchableOpacity>
          <Text>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Media</Text>
        </TouchableOpacity>
      </View>
      {!review_data ? (
        <Text style={{ fontSize: 50, color: "grey" }}>NO DATA!</Text>
      ) : (
        <FlatList
          data={review_data}
          renderItem={({ item }) => <ReviewCard nav={nav} data={{ ...item }} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles.addReviewView}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <FontAwesome
            style={styles.addIcon}
            name="home"
            size={60}
            color="#C94545"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
    height: "100%",
  },
  // settingsGear: {
  //   position: "absolute",
  //   right: 10,
  //   top: 3,
  // },
  headerRow: {
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    paddingHorizontal: "5%",
    paddingVertical: 15,
    fontWeight: "600",
  },
  bioEditView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
  },
  editAccountBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 11,
    backgroundColor: "#fff",
  },
  reviewMediaHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 30,
    borderBottomWidth: 2,
  },
  addReviewView: {
    position: "absolute",
    bottom: "3%",
    right: "7%",
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
  addIcon: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.0,
    elevation: 10,
  },
});

export default Profile;
