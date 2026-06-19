/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtQWLIdVm1wXxx3_nLL5jmDDjl_MH-cPY",
  authDomain: "comp-2026-lucas-nguyen.firebaseapp.com",
  databaseURL: "https://comp-2026-lucas-nguyen-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comp-2026-lucas-nguyen",
  storageBucket: "comp-2026-lucas-nguyen.firebasestorage.app",
  messagingSenderId: "691283081178",
  appId: "1:691283081178:web:61c724a6e33d905fd7f2e3",
  measurementId: "G-JKFYTZL473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);