import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const ReviewCard = (props) => {
  const { user, location, date, review, rating } = props.data;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => props.nav(props.data)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.name}>{user}</Text>
          <Text style={styles.subtitle}>
            {rating.toFixed(1)} | {location} | {date}
          </Text>
          <Text style={styles.review}>{review}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.0,

    elevation: 10,
  },
  card: {
    paddingVertical: 10,
    width: "90%",
    margin: 10,
    backgroundColor: "#C94545",
    borderRadius: 12,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    color: "white",

    fontWeight: "700",
  },
  subtitle: {
    color: "white",
    fontSize: 13,
    paddingTop: 5,
  },
  review: {
    fontSize: 13,
    color: "white",
    paddingTop: 5,
  },
  cardContent: {
    width: "95%",
  },
});

export default ReviewCard;
