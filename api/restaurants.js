// import * as firebase from "firebase";
// import "firebase/firestore";
require("firebase/firestore");
// import { Alert } from "react-native";
const firebase = require("firebase");

//render restaurants
const render_restaurants = async (filter) => {
  try {
    const db = firebase.firestore();
    const data = await db
      .collection("Restaurant")
      .where("restaurant", "==", restaurant)
      .limit(5)
      .get();
    if (data.empty) {
      console.log("No matching documents.");
      return;
    }
    const posts = [];
    data.forEach((doc) => {
      const x = db.collection("Users").doc(doc.data().owner);
      console.log(x.name);
      posts.push({
        id: doc.id,
        // owner: x.data().name,
        review: doc.data().review,
        rate: doc.data().rate,
        date: doc.data().date.toString(),
        location: doc.data().location,
      });
    });

    console.log("posts for", restaurant, "fetched");

    return posts;
  } catch (err) {
    console.log("shit went wrong");
  }
};

//render posts profiles

module.exports = { render_posts, post };
