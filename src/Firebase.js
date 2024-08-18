import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBngiE15wFI0A_UfJaFd0b4r6fSMStxlUc",
  authDomain: "react-authentication-2fdff.firebaseapp.com",
  projectId: "react-authentication-2fdff",
  storageBucket: "react-authentication-2fdff.appspot.com",
  messagingSenderId: "1007977737982",
  appId: "1:1007977737982:web:4c160af776dfcf6a427faf",
  measurementId: "G-PJPND6W4BJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
