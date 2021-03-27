// import * as firebase from "firebase";
// import "firebase/firestore";
require("firebase/firestore");
// import { Alert } from "react-native";
const firebase = require("firebase");

//create post
const post = async (info) => {
  try {
    const db = firebase.firestore();

    await db.collection("Posts").add({
      owner: firebase.auth().currentUser.uid,
      location: info.location,
      date: firebase.firestore.Timestamp.now(),
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

//render posts for restaurants
const render_posts = async (restaurant) => {
  try {
    const db = firebase.firestore();
    const data = await db
      .collection("Posts")
      .where("restaurant", "==", restaurant)
      .limit(3)
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
        date: doc.data().date.toDate().toLocaleString("en-US"),
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
