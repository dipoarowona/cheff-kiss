const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyA_JLmfCPHq-aTWctXydb7lVACn48aSfds",
  authDomain: "cheff-kiss.firebaseapp.com",
  databaseURL: "https://cheff-kiss-default-rtdb.firebaseio.com",
  projectId: "cheff-kiss",
  storageBucket: "cheff-kiss.appspot.com",
};

firebase.initializeApp(firebaseConfig);

module.exports = { firebase };