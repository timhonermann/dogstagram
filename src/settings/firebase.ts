import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACjs1obcB7QfVnYN9uid76zur8ZJz3Krc",
  authDomain: "weblab-dogstagram.firebaseapp.com",
  projectId: "weblab-dogstagram",
  storageBucket: "weblab-dogstagram.appspot.com",
  messagingSenderId: "350466434836",
  appId: "1:350466434836:web:40d12b5ce71e3f279b4401"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");

export { db, auth, usersCollection, postsCollection, commentsCollection };
