const { firebase } = require("./database");

const create_new_user = (user) => {
  firebase.database().ref("users/").push(user);
};
// create_new_user( { name: "Dipo", age: 12 });

const get_user_name = (id) => {
  firebase
    .database()
    .ref("users/" + id)
    .on("value", (snapshot) => {
      console.log(snapshot.val());
    });
};
// get_user_name("-MVKiMSmc67onOIhi4g7");

firebase
  .auth()
  .createUserWithEmailAndPassword("dipo@gmail.com", "password")
  .then((userCredential) => {
    var user = userCredential.user;
    firebase.database().ref("users/").push({ number: 226 });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
firebase
  .auth()
  .signOut()
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });
console.log("done");
