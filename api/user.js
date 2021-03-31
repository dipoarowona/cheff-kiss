import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
//login
const login_user = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert(err.message);
  }
};

//create new user
const create_new_user = async ({ name, email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({ displayName: name });
    const db = firebase.firestore();
    await db.collection("Users").doc(currentUser.uid).set({
      name,
      email,
      numberofReviews: 0,
      totalRating: 0,
    });
  } catch (err) {
    Alert.alert(err.message);
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

//account_data
const get_account_data = async (id) => {
  try {
    const db = firebase.firestore();
    const data = await db.collection("Users").doc(id).get();

    if (data.empty) {
      console.log("No matching documents.");
      return;
    }
    return {
      numberofReviews: data.data().numberofReviews,
      avgRating:
        data.data().numberofReviews > 0
          ? data.data().totalRatings / data.data().numberofReviews
          : 0,
    };
  } catch (err) {}
};

module.exports = { get_account_data, create_new_user, login_user, logout };
