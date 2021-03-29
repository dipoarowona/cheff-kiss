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
      owner_id: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName,
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
const render_posts = async (query, value, filter) => {
  try {
    var data = undefined;
    const db = firebase.firestore();

    if (filter) {
      data = await db
        .collection("Posts")
        .where(query, "==", value)
        .orderBy("rate", filter)
        .get();
    } else {
      data = await db.collection("Posts").where(query, "==", value).get();
    }

    if (data.empty) {
      console.log("No matching documents.");
      return;
    }
    const posts = [];
    data.forEach((doc) => {
      posts.push({
        id: doc.id,
        owner_id: doc.data().owner_id,
        owner: doc.data().owner_name,
        review: doc.data().review,
        rate: doc.data().rate,
        date: doc.data().date.toDate().toLocaleString("en-US"),
        location: doc.data().location,
      });
    });

    console.log("posts for", value, "fetched");

    return posts;
  } catch (err) {
    console.log("shit went wrong" + err);
  }
};

//render posts profiles

module.exports = { render_posts, post };
