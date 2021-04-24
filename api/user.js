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
      totalRatings: 0,
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

const delete_account = async () => {
  try {
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    db.collection("Posts")
      .where("owner_id", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        var batch = db.batch();

        querySnapshot.forEach(function (doc) {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(async function () {
        console.log("posts - deleted");
        await db.collection("Users").doc(currentUser.uid).delete();
        console.log("user db - deleted");
        await currentUser.delete();
        console.log("user acc - deleted");
      });
    // const user =
    // await currentUser.delete();

    // if (posts.empty && user.empty) {
    //   console.log("No matching documents.");
    //   return;
    // }
    console.log("everything was deleted properly");
  } catch (err) {
    console.log("errorrrrr", err);
  }
};

module.exports = {
  delete_account,
  get_account_data,
  create_new_user,
  login_user,
  logout,
};
