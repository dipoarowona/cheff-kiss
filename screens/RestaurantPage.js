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
const RestaurantPage = ({ route, navigation }) => {
  const { name, image } = route.params.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [review_data, setReviewData] = useState([
    {
      id: 1,
      user: "Dipo Arowona",
      location: "Hamilton, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo posuere consectetur mi tristique luctus tristique tortor risus. Dignissim tortor facilisis quam dictum sed quisque tortor.",
      rating: 4.4,
    },
    {
      id: 2,
      user: "Billy Jimbo",
      location: "Toronto, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 4.0,
    },
    {
      id: 3,
      user: "Latifa Arowona",
      location: "Whitby, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 3.0,
    },
    {
      id: 4,
      user: "Debisi Ajibola",
      location: "Hamilton, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 3.0,
    },
    {
      id: 5,
      user: "Sarah King",
      location: "Hamilton, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 5.0,
    },
    {
      id: 6,
      user: "Lebron James",
      location: "Hamilton, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 3.0,
    },
    {
      id: 7,
      user: "Robert Downey Jr.",
      location: "Hamilton, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 4.5,
    },
    {
      id: 8,
      user: "Dipo Arwona",
      location: "Hamilton, Ontario",
      date: "March 1, 2021",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vestibulum id cras quisque curabitur nec et sodales felis. Eget commodo ",
      rating: 3.0,
    },
  ]);
  const [overall_rating, setOverallRating] = useState(0);

  const nav = (data) => {
    navigation.navigate("Review", { data, image, name });
  };
  const update_data = (data) => {
    const y = review_data.concat(data);
    console.log(data.id);
    setReviewData(y);
  };
  useEffect(() => {
    let x = 0;
    review_data.map((element) => {
      x = x + element.rating;
    });
    setOverallRating((x / review_data.length).toFixed(1));
  }, [review_data]);

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

      <FlatList
        data={review_data}
        renderItem={({ item }) => <ReviewCard nav={nav} data={item} />}
        keyExtractor={(item) => item.id}
      />
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
