// import * as firebase from "firebase";
// import "firebase/firestore";
require("firebase/firestore");
// import { Alert } from "react-native";
const firebase = require("firebase");

//post
const post = async (info) => {
  try {
    const db = firebase.firestore();

    await db.collection("Posts").add({
      owner: db.collection("users").doc(firebase.auth().currentUser.uid),
      location: info.location,
      date: info.date,
      rate: info.rating,
      review: info.review,
      restaurant: info.name,
    });

    console.log("post made - successful");
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
    console.log("post made - failed");
  }
};

//create new user
const render_posts = async (restaurant) => {
  try {
    const db = firebase.firestore();
    const data = await db
      .collection("Posts")
      .where("restaurant", "==", restaurant)
      .limit(4)
      .get();
    if (data.empty) {
      console.log("No matching documents.");
      return;
    }
    const posts = [];
    data.forEach((doc) => {
      posts.push({
        id: doc.id,
        review: doc.data().review,
        rate: doc.data().rate,
        date: doc.data().date,
        location: doc.data().location,
      });
    });

    console.log("posts for", restaurant, "fetched");

    return posts;
  } catch (err) {
    console.log("shit went wrong");
  }
};

module.exports = { render_posts, post };
