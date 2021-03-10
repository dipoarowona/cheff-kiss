import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
//login
const login_user = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
};

//create new user
const create_new_user = async ({ name, email, password }) => {
  try {
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

module.exports = { create_new_user, login_user, logout };
