// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from   "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGc6J6-I2Yg7oQ6mreqDcBUzT-sH0bZTM",
  authDomain: "bt3103-project-cb36b.firebaseapp.com",
  projectId: "bt3103-project-cb36b",
  storageBucket: "bt3103-project-cb36b.appspot.com",
  messagingSenderId: "932977578520",
  appId: "1:932977578520:web:82a495bb026f918c16e96d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//create Users
const auth = getAuth(app);
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  //Signed in
  const user = userCredential.user;
})

// Sign-in Users
import {signInWithEmailAndPassword } from "firebase/auth";

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  //Signed in 
  const user = userCredential.user;
})

import {signOut } from "firebase/auth";

signOut(auth).then(() => {
  //Sign out successful.
})

export { auth }