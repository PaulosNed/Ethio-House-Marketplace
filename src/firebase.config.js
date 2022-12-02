// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADj4aRIDEsckfXGAXyRg7s7eSH9gFJ0tk",
  authDomain: "ethio-house-market-app.firebaseapp.com",
  projectId: "ethio-house-market-app",
  storageBucket: "ethio-house-market-app.appspot.com",
  messagingSenderId: "140676730920",
  appId: "1:140676730920:web:91cdbabbd1cc4ac330a51d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()