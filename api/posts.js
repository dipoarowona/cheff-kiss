import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

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
const create_new_user = async ({ name, email, password }) => {
  try {
    const db = firebase.firestore();
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({ displayName: name });
  } catch (err) {
    Alert.alert("There is something wrong(cnu)!!!!", err.message);
  }
};

//logout user
const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
};

module.exports = { create_new_user, post, logout };
