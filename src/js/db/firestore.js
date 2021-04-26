import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBUI_2xGigmpRMpszD1BpF8xhoIN-p6YY4",
  authDomain: "electron-chat-database.firebaseapp.com",
  projectId: "electron-chat-database",
  storageBucket: "electron-chat-database.appspot.com",
  messagingSenderId: "411028351440",
  appId: "1:411028351440:web:d80e863b91c72b6548b1d5",
  measurementId: "G-J7Z13BVHEL",
};

const db = firebase.initializeApp(config).firestore();
export default db;
