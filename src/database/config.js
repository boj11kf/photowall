import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyD-s_PA2WOiFGtxulun5VVpqajCmokL0GQ",
  authDomain: "photowall-9c9ad.firebaseapp.com",
  databaseURL: "https://photowall-9c9ad-default-rtdb.firebaseio.com",
  projectId: "photowall-9c9ad",
  storageBucket: "photowall-9c9ad.appspot.com",
  messagingSenderId: "931488543717",
  appId: "1:931488543717:web:1790f532951404fdf8350c",
  measurementId: "G-3X669CZPM1",
};

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();

export { database };
