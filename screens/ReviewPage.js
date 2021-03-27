import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Star from "../Components/star";

const ReviewPage = ({ route, navigation }) => {
  const { id, location, date, review, rate } = route.params.data;

  const image = route.params.image;
  const name = route.params.name;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <Text style={styles.textHeader}>{name}</Text>
      </View>
      <View
        style={{
          width: "87%",
          alignSelf: "center",
        }}
      >
        <Text style={styles.username}>{id}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-around",
          alignSelf: "center",
        }}
      >
        <Text>{location}</Text>
        <Text>{date}</Text>
      </View>
      <View style={styles.ratingView}>
        <Text style={styles.rating}>{rate}</Text>
        <View style={styles.starView}>
          <Star rating={rate} />
        </View>
      </View>

      <Text style={styles.text}>{review}</Text>
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
  username: {
    fontSize: 30,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    paddingTop: 20,
    textAlign: "justify",
    width: "80%",
    alignSelf: "center",
  },
});

export default ReviewPage;
