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
  const { name, image } = route.params.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [review_data, setReviewData] = useState([]);
  const [overall_rating, setOverallRating] = useState(0);

  const nav = (data) => {
    navigation.navigate("Review", { data, image, name });
  };
  const update_data = (data) => {
    const y = review_data.concat(data);
    setReviewData(y);
  };
  const fetch = async () => {
    const x = await render_posts(name);
    return x;
  };
  useEffect(() => {
    fetch().then((data) => {
      setReviewData(data);
    });
    // review_data.map((element) => {
    //   x = x + element.rating;
    // });
    // setOverallRating((x / review_data.length).toFixed(1));
  }, []);

  return (
    <View style={styles.container}>
      <AddReviewModal
        visible={modalVisible}
        setModalVisible={setModalVisible}
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
        <Image style={styles.image} source={image} />
        <Text style={styles.textHeader}>{name}</Text>
      </View>
      <View style={styles.ratingView}>
        <Text style={styles.rating}>{overall_rating}</Text>
        <View style={styles.starView}>
          <Star rating={overall_rating} />
        </View>
      </View>

      <View style={styles.reviewHeaderView}>
        <View style={styles.reviewHeaderSubView}>
          <Text style={{ fontSize: 20 }}>Recommended</Text>
          <Text style={{ fontSize: 20, color: "grey" }}>Top Rated</Text>
          <Text style={{ fontSize: 20, color: "grey" }}>Most Critical</Text>
        </View>
      </View>

      {!review_data ? (
        <Text style={{ fontSize: 50, color: "grey" }}>NO DATA!</Text>
      ) : (
        <FlatList
          data={review_data}
          renderItem={({ item }) => <ReviewCard nav={nav} data={item} />}
          keyExtractor={(item) => item.id}
        />
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
