import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Star from "../Components/star";
import firebase from "firebase";
import { delete_post } from "../api/posts";

const ReviewPage = ({ route, navigation }) => {
  const {
    id,
    owner,
    owner_id,
    location,
    restaurant,
    date,
    review,
    rate,
  } = route.params.data;
  const name = route.params.name ? route.params.name : restaurant;
  return (
    <View style={styles.container}>
      {route.params.image === undefined ? (
        <View style={{ ...styles.card, height: 80, backgroundColor: "white" }}>
          <Text style={{ ...styles.textHeader, color: "#C94545" }}>{name}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Image style={styles.image} source={{ url: route.params.image }} />
          <Text style={styles.textHeader}>{name}</Text>
        </View>
      )}
      <View
        style={{
          width: "87%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", { owner_id, owner });
          }}
        >
          <Text style={styles.username}>{owner}</Text>
        </TouchableOpacity>
        {owner_id != firebase.auth().currentUser.uid ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              delete_post(id, name, rate);
              Alert.alert("POST HAS BEEN DELETED");
            }}
          >
            <AntDesign
              style={styles.username}
              name="delete"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
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
        <Text style={styles.rating}>{rate.toFixed(2)}</Text>
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
