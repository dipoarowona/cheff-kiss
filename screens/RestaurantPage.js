import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewCard from "../Components/ReviewCard";
import Star from "../Components/star";
import AddReviewModal from "../Components/AddReviewModal";
import { useEffect } from "react";
import { render_posts } from "../api/posts";

const RestaurantPage = ({ route, navigation }) => {
  const { name, image, rating } = route.params.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [review_data, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  var [isPress, setIsPress] = useState({
    recommended: true,
    top: false,
    critical: false,
  });

  const nav = (data) => {
    navigation.navigate("Review", { data, image, name });
  };
  const update_data = (data) => {
    const y = review_data.concat(data);
    setReviewData(y);
  };
  const fetch = async (filter) => {
    setLoading(true);
    const x = await render_posts("restaurant", name, filter);
    setReviewData(x);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <AddReviewModal
        visible={modalVisible}
        setModalVisible={setModalVisible}
        fetch={fetch}
        name={name}
        addData={update_data}
      />
      <View style={styles.addReviewView}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <MaterialIcons
            style={styles.addIcon}
            name="rate-review"
            size={60}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image style={styles.image} source={{ url: image }} />
        <Text style={styles.textHeader}>{name}</Text>
      </View>
      <View style={styles.ratingView}>
        <Text style={styles.rating}>{rating}</Text>
        <View style={styles.starView}>
          <Star rating={rating} />
        </View>
      </View>

      <View style={styles.reviewHeaderView}>
        <View style={styles.reviewHeaderSubView}>
          <TouchableOpacity
            onPress={() => {
              fetch();
              setIsPress({
                recommended: true,
                top: false,
                critical: false,
              });
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: isPress.recommended ? "black" : "grey",
              }}
            >
              Recommended
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              fetch("desc");
              setIsPress({
                recommended: false,
                top: true,
                critical: false,
              });
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: isPress.top ? "black" : "grey",
              }}
            >
              Top Rated
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              fetch("asc");
              setIsPress({
                recommended: false,
                top: false,
                critical: true,
              });
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: isPress.critical ? "black" : "grey",
              }}
            >
              Most Critical
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
    height: "100%",
  },
  card: {
    marginTop: 20,
    backgroundColor: "black",
    height: 160,
    width: "90%",
    margin: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.4,
    borderRadius: 12,
  },
  textHeader: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
  },
  ratingView: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    paddingTop: 10,
  },
  rating: {
    fontSize: 40,
    fontWeight: "700",
  },
  starView: {
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "space-between",
    alignSelf: "center",
    paddingTop: 30,
    paddingBottom: 15,
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

export default RestaurantPage;
