import firebase from 'firebase/app'
// import 'firebase/auth'
import 'firebase/storage'
// import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD1XbNWfa5bADmLZHD2vTeyuzHufvb2yrE",
  authDomain: "just-go1.firebaseapp.com",
  projectId: "just-go1",
  storageBucket: "just-go1.appspot.com",
  messagingSenderId: "797719415578",
  appId: "1:797719415578:web:8a1abb34893d9be6993aa3"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
