import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqRwACxR2TdSa3wgTAth1q_9LW5SNlIsU",
  authDomain: "gr-financial.firebaseapp.com",
  projectId: "gr-financial",
  storageBucket: "gr-financial.appspot.com",
  messagingSenderId: "69393844214",
  appId: "1:69393844214:web:68d8bfb6b9894309d8b897",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
