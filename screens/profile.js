import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as firebase from "firebase";

import ReviewCard from "../Components/ReviewCard";

import { logout } from "../api/user";
import { render_posts } from "../api/posts";
import { get_account_data } from "../api/user";

const Profile = ({ route, navigation, setSignedIn }) => {
  let currentUser = firebase.auth().currentUser;
  const id = route.params ? route.params.owner_id : currentUser.uid;
  const username = route.params ? route.params.owner : currentUser.displayName;

  const [review_data, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [avgRating, setAvgRating] = useState(undefined);
  const [totalReviews, setTotalReviews] = useState(undefined);
  const [isPress, setIsPress] = useState({
    reviews: true,
    media: false,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const nav = (data) => {
    navigation.navigate("Review", { data });
  };
  const fetch = async () => {
    setLoading(true);
    const x = await render_posts("owner_id", id);
    const y = await get_account_data(id);
    console.log(y.avgRating);
    setAvgRating(y.avgRating);
    setTotalReviews(y.numberofReviews);
    setReviewData(x);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {route.params ? (
          <></>
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: "5%",
              top: "1%",
              zIndex: 10,
            }}
            onPress={() => {
              logout();
              setSignedIn(false);
            }}
          >
            <FontAwesome name="gear" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View style={styles.headerRow}>
          <Image
            style={styles.profilePic}
            alt="profile-pic"
            source={require("../assets/bp.png")}
          />
          <View
            style={{
              flexDirection: "row",
              width: "80%",

              justifyContent: "space-around",
            }}
          >
            <View style={{ alignSelf: "center", alignItems: "center" }}>
              <Text>Reviews</Text>
              <Text>{totalReviews >= 0 ? totalReviews : ""}</Text>
            </View>
            <View style={{ alignSelf: "center", alignItems: "center" }}>
              <Text>Average Rating</Text>
              <Text>{avgRating >= 0 ? avgRating : ""}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.bioEditView}>
          <Text>Bio</Text>
          {route.params ? (
            <></>
          ) : (
            <TouchableOpacity style={styles.editAccountBtn}>
              <Text>Edit Account</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.reviewHeaderView}>
          <View style={styles.reviewHeaderSubView}>
            <TouchableOpacity
              onPress={() => {
                setIsPress({
                  reviews: true,
                  media: false,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: isPress.reviews ? "black" : "grey",
                }}
              >
                Reviews
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsPress({
                  reviews: false,
                  media: true,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: isPress.media ? "black" : "grey",
                }}
              >
                Media
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 50, color: "grey", textAlign: "center" }}>
              LOADING....
            </Text>
          </View>
        ) : (
          <>
            {!review_data ? (
              <View style={{ width: "100%" }}>
                <Text
                  style={{ fontSize: 50, color: "grey", textAlign: "center" }}
                >
                  NO DATA!
                </Text>
              </View>
            ) : (
              <FlatList
                data={review_data}
                renderItem={({ item }) => (
                  <ReviewCard nav={nav} data={{ ...item }} />
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </>
        )}
      </ScrollView>
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
  headerRow: {
    flexDirection: "row",
    paddingTop: 15,
    // justifyContent: "space-between",
    width: "90%",
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
  reviewHeaderView: {
    width: "100%",
    backgroundColor: "#E2E2E2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.0,
    elevation: 24,
  },
  reviewHeaderSubView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    paddingTop: 30,
    paddingBottom: 15,
  },
});

export default Profile;
