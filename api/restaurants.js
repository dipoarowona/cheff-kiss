// import * as firebase from "firebase";
// import "firebase/firestore";
require("firebase/firestore");
// import { Alert } from "react-native";
const firebase = require("firebase");

//render restaurants
const render_restaurants = async (query) => {
  try {
    const db = firebase.firestore();
    const restaurants = [];
    let data = undefined;
    if (!query) {
      data = await db.collection("Restaurants").get();
    } else {
      console.log(query);
      data = db.collection("Restaurants").where(query, "in", "name").get();
    }

    if (data.empty) {
      console.log("No matching documents.");
      return;
    }

    data.forEach(async (doc) => {
      restaurants.push({
        id: doc.id,
        name: doc.data().name,
        rating: doc.data().overallRate,
        image: doc.data().image_location,
      });
    });

    console.log("restaurants are fetched");
    return restaurants;
  } catch (err) {
    console.log("shit went wrong");
  }
};

module.exports = { render_restaurants };
