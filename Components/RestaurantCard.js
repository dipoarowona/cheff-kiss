import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Star from "./star";
const RestaurantCard = (props) => {
  const { name, image, rating } = props.info;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => props.redirect(props.info)}
      >
        <Image style={styles.image} source={image} />
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>{name}</Text>
          <View style={{ width: "30%", flexDirection: "row" }}>
            <Star rating={rating} size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    height: 120,
    width: "90%",
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 2,
  },
  bottomContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 15,
  },
});

export default RestaurantCard;
