// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  collection, addDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNsjHi0kMued3tPBGGXpQXtvzkRDyMDbQ",
  authDomain: "react-auth-ff308.firebaseapp.com",
  projectId: "react-auth-ff308",
  storageBucket: "react-auth-ff308.appspot.com",
  messagingSenderId: "866111043178",
  appId: "1:866111043178:web:5ea0808ac65765cb3cbc13",
  measurementId: "G-T6VLE44RMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);
