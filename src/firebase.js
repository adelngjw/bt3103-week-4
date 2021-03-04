import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAwNLDjmVgiXtAT4E7eBB4qu0NSlmsEeDU",
    authDomain: "bt3103-week-6-d207f.firebaseapp.com",
    projectId: "bt3103-week-6-d207f",
    storageBucket: "bt3103-week-6-d207f.appspot.com",
    messagingSenderId: "53838246685",
    appId: "1:53838246685:web:a53afb7d945d001b6967f4",
    measurementId: "G-PNJLH0EFS7"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;