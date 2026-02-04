import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWERhOUvADg0Xodt-o6bsE92DNzUG21Ac",
  authDomain: "login-reactjs-d55b5.firebaseapp.com",
  projectId: "login-reactjs-d55b5",
  storageBucket: "login-reactjs-d55b5.firebasestorage.app",
  messagingSenderId: "682626089713",
  appId: "1:682626089713:web:be4e74a4bd70ca0bad5f50",
  measurementId: "G-0L0Y9CJQ3W"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
